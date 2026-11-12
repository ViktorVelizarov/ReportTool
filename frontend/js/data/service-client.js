/**
 * The calls of the page to the report service, which serves the page and so is at the same address. The service answers
 * with JSON, and with {"error": "..."} and a status when it cannot.
 */

export const ServiceClient = {
  /** The function that makes the calls, with the signature of fetch. The tests replace it. */
  fetch: (...args) => globalThis.fetch(...args),

  /** The JSON that the service answers to a GET; parameters that are undefined are left out. */
  async getJson(path, params = {}) {
    return (await call(addressOf(path, params))).json();
  },

  /**
   * The JSON that the service answers to a call with a JSON body, such as a POST that adds something or a PUT that
   * replaces it; parameters that are undefined are left out.
   */
  async sendJson(method, path, body, params = {}) {
    return (await call(addressOf(path, params), jsonRequest(method, body))).json();
  },

  /** Makes a call that is answered without a body, such as a DELETE; parameters that are undefined are left out. */
  async send(method, path, params = {}) {
    await call(addressOf(path, params), { method });
  },

  /** The file (a Blob) that the service makes of a report that is posted to it as JSON. */
  async postForFile(path, body) {
    return (await call(path, jsonRequest('POST', body))).blob();
  },
};

/** The address of a call: the path, with the parameters that are not undefined as its query. */
function addressOf(path, params) {
  const query = new URLSearchParams(Object.entries(params).filter(([, value]) => value !== undefined)).toString();
  return query ? `${path}?${query}` : path;
}

const jsonRequest = (method, body) => ({
  method,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
});

/** The answer of the service. It is an error when the service cannot be reached or does not answer with a success. */
async function call(address, init) {
  let response;
  try {
    response = await ServiceClient.fetch(address, init);
  } catch {
    throw new Error('The report service cannot be reached');
  }
  if (!response.ok) throw await refusal(response);
  return response;
}

/** The error for an answer that is not a success: it has the message of the service, and the status. */
async function refusal(response) {
  const body = await response.json().catch(() => undefined);
  const error = new Error(body?.error ?? `The report service answered ${response.status}`);
  error.status = response.status;
  return error;
}
