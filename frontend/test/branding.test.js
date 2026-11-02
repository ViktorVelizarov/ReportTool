import assert from 'node:assert/strict';
import { beforeEach, test } from 'node:test';

import { Branding, loadBranding } from '../js/data/branding.js';
import { ReportContext } from '../js/data/report-context.js';
import { ServiceClient } from '../js/data/service-client.js';
import { BRANDING, installFakeService, REALM } from './helpers/service.js';

/** A stand-in for the root element of the page that records the properties set on it. */
function rootElement() {
  const properties = {};
  return { properties, style: { setProperty: (name, value) => { properties[name] = value; } } };
}

let calls;

beforeEach(() => {
  calls = installFakeService();
  ReportContext.realm = REALM;
  Branding.logo = undefined;
});

test('the look of the realm of the report is asked from the service', async () => {
  await loadBranding(rootElement());

  assert.deepEqual(calls, ['/branding?realm=manufacturer']);
});

test('a report that names no realm asks for the look without one', async () => {
  ReportContext.realm = undefined;

  await loadBranding(rootElement());

  assert.deepEqual(calls, ['/branding']);
});

test('the primary colour goes on the root, with what the theme derives from it, and the logo is kept', async () => {
  const root = rootElement();

  await loadBranding(root);

  assert.equal(root.properties['--or-color-primary'], BRANDING.primaryColour);
  assert.equal(root.properties['--or-color-text-primary'], BRANDING.primaryColour);
  assert.match(root.properties['--or-color-primary-50pct'], /^hsl\(from var\(--or-color-primary\) h s l \/ /);
  assert.match(root.properties['--or-color-primary-10pct'], /^hsl\(from var\(--or-color-primary\) h s l \/ /);
  assert.equal(Branding.logo, BRANDING.logo);
});

test('a realm without a colour or a logo changes nothing', async () => {
  ServiceClient.fetch = async () => ({ ok: true, status: 200, json: async () => ({}) });
  Branding.logo = 'https://localhost/images/from-before.svg';
  const root = rootElement();

  await loadBranding(root);

  assert.deepEqual(root.properties, {});
  assert.equal(Branding.logo, undefined);
});

test('the page keeps the look of OpenRemote when the service cannot say', async () => {
  const failure = { error: 'OpenRemote request failed' };
  ServiceClient.fetch = async () => ({ ok: false, status: 502, json: async () => failure });
  const root = rootElement();
  const logged = [];
  const { error } = console;
  console.error = (...args) => logged.push(args);
  try {
    await loadBranding(root);
  } finally {
    console.error = error;
  }

  assert.deepEqual(root.properties, {});
  assert.equal(Branding.logo, undefined);
  assert.equal(logged.length, 1);
  assert.equal(logged[0][0].message, 'OpenRemote request failed');
});
