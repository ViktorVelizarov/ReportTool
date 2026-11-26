/**
 * The calls of the page to the report service, which serves the page and so is at the same address. The service answers
 * with JSON, and with {"error": "..."} and a status when it cannot.
 */

export const ServiceClient = {
  /** The function that makes the calls, with the signature of fetch. The tests replace it. */
  fetch: (...args) => globalThis.fetch(...args),

  /** The JSON that the service answers to a GET; parameters that are undefined are left out. */
  async getJson(path, params = {}) {
    const query = new URLSearchParams(Object.entries(params).filter(([, value]) => value !== undefined)).toString();
    let response;
    try {
      response = await this.fetch(query ? `${path}?${query}` : path);
    } catch {
      throw new Error('The report service cannot be reached');
    }
    if (!response.ok) throw await refusal(response);
    return response.json();
  },
};

/** The error for an answer that is not a success: it has the message of the service, and the status. */
async function refusal(response) {
  const body = await response.json().catch(() => undefined);
  const error = new Error(body?.error ?? `The report service answered ${response.status}`);
  error.status = response.status;
  return error;
}
