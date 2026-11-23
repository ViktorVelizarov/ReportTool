import assert from 'node:assert/strict';
import { beforeEach, test } from 'node:test';

import { AiService } from '../js/data/ai-service.js';
import { ServiceClient } from '../js/data/service-client.js';
import { AI_STATUS, installFakeService, writtenText } from './helpers/service.js';

const PROMPT = { system: 'The rules.', user: 'The figures.', descriptions: 3 };

let calls;

/** Runs work with the service answering every call as answer(path, init) does, and puts the fake back after it. */
async function withService(answer, work) {
  const { fetch } = ServiceClient;
  ServiceClient.fetch = answer;
  try {
    await work();
  } finally {
    ServiceClient.fetch = fetch;
  }
}

beforeEach(async () => {
  calls = installFakeService();
  AiService.status = { available: false };
});

test('there is no AI text until the service has said that a model is set up', async () => {
  assert.deepEqual(AiService.status, { available: false });

  await AiService.loadStatus();

  assert.deepEqual(calls, ['/ai/status']);
  assert.deepEqual(AiService.status, AI_STATUS);
  assert.equal(AiService.status.model, 'writer-1');
  assert.equal(AiService.status.host, 'ai.example.org');
});

test('there is no AI text when the service has no model, or cannot say', async () => {
  const error = console.error;
  console.error = () => {};
  try {
    const answers = [
      async () => ({ ok: true, status: 200, json: async () => ({ available: false }) }),
      async () => ({ ok: true, status: 200, json: async () => ({ model: 'writer-1' }) }),
      async () => ({ ok: true, status: 200, json: async () => null }),
      async () => ({ ok: false, status: 404, json: async () => ({ error: 'not found' }) }), // an older service
      async () => { throw new TypeError('Failed to fetch'); },
    ];
    for (const answer of answers) {
      AiService.status = AI_STATUS;
      await withService(answer, () => AiService.loadStatus());

      assert.deepEqual(AiService.status, { available: false });
    }
  } finally {
    console.error = error;
  }
});

test('the prompt is posted to the service, which gives the text that the model wrote', async () => {
  await AiService.loadStatus();
  const sent = [];

  await withService(async (path, init) => {
    sent.push({ path, method: init.method, headers: init.headers, body: JSON.parse(init.body) });
    return { ok: true, status: 200, json: async () => writtenText(3) };
  }, async () => {
    assert.deepEqual(await AiService.write({ ...PROMPT, more: 'left out' }), writtenText(3));
  });

  assert.deepEqual(sent, [{
    path: '/ai/text', method: 'POST', headers: { 'Content-Type': 'application/json' }, body: PROMPT,
  }]);
});

test('the fake service writes as many descriptions as the prompt asks for', async () => {
  await AiService.loadStatus();

  const text = await AiService.write({ ...PROMPT, descriptions: 2 });

  assert.deepEqual(text.descriptions, ['Description 1.', 'Description 2.']);
  assert.deepEqual(calls, ['/ai/status', 'POST /ai/text']);
});

test('the reason that the text could not be written is the message of the service', async () => {
  await AiService.loadStatus();
  const refusal = { ok: false, status: 504, json: async () => ({ error: 'the AI did not answer within 30 seconds' }) };

  await withService(async () => refusal, () =>
    assert.rejects(AiService.write(PROMPT),
      error => error.message === 'the AI did not answer within 30 seconds' && error.status === 504));
  await withService(async () => { throw new TypeError('Failed to fetch'); }, () =>
    assert.rejects(AiService.write(PROMPT), /^Error: The report service cannot be reached$/));
});

test('the page waits five seconds longer for the text than the service waits for the model', async () => {
  const timeouts = [];
  const { timeout } = AbortSignal;
  AbortSignal.timeout = ms => {
    timeouts.push(ms);
    return timeout.call(AbortSignal, ms);
  };
  try {
    await AiService.loadStatus();
    await AiService.write(PROMPT);
    AiService.status = { ...AI_STATUS, timeoutSeconds: 90 };
    await AiService.write(PROMPT);
  } finally {
    AbortSignal.timeout = timeout;
  }

  assert.deepEqual(timeouts, [35_000, 95_000]);
});
