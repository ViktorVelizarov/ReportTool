/**
 * The saved reports of the realm of the report, which the report service keeps: the list of them, and the calls to open
 * one, to save a new one, to save an old one again and to remove one. A report is saved with its name, its time frame,
 * its template, the answers to the questions for the AI and its schedule. The time frame is relative (the last 30 days,
 * say), not two dates, so a report that is opened later is made for the days before that day.
 */

import { PERIODS } from '../model/periods.js';
import { ReportContext } from './report-context.js';
import { ServiceClient } from './service-client.js';

const realm = () => ({ realm: ReportContext.realm });

const text = value => (typeof value === 'string' ? value : '');

const isObject = value => typeof value === 'object' && value !== null && !Array.isArray(value);

/**
 * The saved report as the page uses it: what the service gave, with what a report that was saved by another version
 * of the page may lack filled in. A report that the page cannot show, for example one in a time frame it does not
 * know, is an error.
 */
function savedReport(json) {
  const showable = typeof json?.id === 'string' && typeof json.name === 'string'
    && PERIODS.some(period => period.id === json.periodId) && Array.isArray(json.template?.widgets);
  if (!showable) throw new Error('The saved report is not valid');
  return {
    id: json.id,
    name: json.name,
    periodId: json.periodId,
    template: json.template,
    instructions: { subject: text(json.instructions?.subject), focus: text(json.instructions?.focus) },
    schedule: isObject(json.schedule) ? json.schedule : null,
  };
}

export const SavedReports = {
  /** The saved reports of the realm by name, each as { id, name, updatedAt }. */
  list: () => ServiceClient.getJson('/reports', realm()),

  /** The saved report with the id: { id, name, periodId, template, instructions, schedule }. */
  async open(id) {
    return savedReport(await ServiceClient.getJson(`/reports/${encodeURIComponent(id)}`, realm()));
  },

  /** Saves the report (see reportOf in state.js) as a new one; gives its { id, name, updatedAt }. */
  add: report => ServiceClient.sendJson('POST', '/reports', report, realm()),

  /** Saves the report over the saved report with the id, under the name it has now; gives { id, name, updatedAt }. */
  replace: (id, report) => ServiceClient.sendJson('PUT', `/reports/${encodeURIComponent(id)}`, report, realm()),

  /** Removes the saved report with the id from the service, which then does not have it any more. */
  remove: id => ServiceClient.send('DELETE', `/reports/${encodeURIComponent(id)}`, realm()),
};
