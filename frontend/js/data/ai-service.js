/**
 * The AI text of the report service: whether a model is set up to write the text of a report, and the call that has it
 * written. The page makes the prompt (model/prompt.js); the service adds the key, sends the prompt to the model and
 * checks the shape of the answer.
 */

import { ServiceClient } from './service-client.js';

const NOT_SET_UP = Object.freeze({ available: false });

/**
 * How much longer the page waits for the text than the service waits for the model, so that it is the service that
 * ends the wait, with its own message.
 */
const PATIENCE_MS = 5000;

export const AiService = {
  /**
   * Whether the service can have text written, and by which model: { available: false }, or { available: true, model,
   * host, timeoutSeconds } with the name of the model, the host that the prompt is sent to and how long the service
   * waits for the model. Not available until loadStatus has read it.
   */
  status: NOT_SET_UP,

  /** Reads the status from the service. The page has no AI text when the service cannot say. */
  async loadStatus() {
    try {
      const status = await ServiceClient.getJson('/ai/status');
      AiService.status = status?.available === true ? status : NOT_SET_UP;
    } catch (error) {
      console.error(error);
      AiService.status = NOT_SET_UP;
    }
  },

  /**
   * Has the model write the text for a prompt: system and user are the two messages of the prompt (see promptMessages
   * in model/prompt.js) and descriptions is the number of widget descriptions that the answer must have. Gives
   * { introduction, findings, descriptions: [text], conclusion }. When the text cannot be written the error has the
   * reason as its message, as the service gives it.
   */
  write({ system, user, descriptions }) {
    const waitMs = AiService.status.timeoutSeconds * 1000 + PATIENCE_MS;
    return ServiceClient.sendJson('POST', '/ai/text', { system, user, descriptions }, {}, waitMs);
  },
};
