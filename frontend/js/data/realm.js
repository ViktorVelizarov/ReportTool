/**
 * The realm a report is about, read from the address of the page. The manager opens a global service at /{realm} for a
 * super user and at /?realm={realm} for any other user, so both are read; a realm in the query wins.
 */

const REALM = /^[A-Za-z0-9_-]+$/;

/** The realm that the address names, or undefined when it names none: the service then reads its own realm. */
export function realmOf({ pathname, search }) {
  const named = new URLSearchParams(search).get('realm');
  if (named) return REALM.test(named) ? named : undefined;
  const [, segment, ...rest] = pathname.split('/');
  return rest.length === 0 && REALM.test(segment ?? '') ? segment : undefined;
}
