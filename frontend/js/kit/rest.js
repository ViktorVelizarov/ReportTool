/**
 * @openremote/rest for the components of OpenRemote (vendor/or-mwc.js), to which the import map of the page points:
 * the one thing that they ask of it, whether an error is one of axios, the library that the manager's REST client is
 * made with. The calls that the page makes to the manager (js/kit/core.js) fail with such errors. Ported from
 * axios (lib/helpers/isAxiosError.js), MIT license, Copyright (c) 2014-present Matt Zabriskie & Collaborators.
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

export const isAxiosError = payload => typeof payload === 'object' && payload !== null && payload.isAxiosError === true;
