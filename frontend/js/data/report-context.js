/**
 * What a report is made for: the realm whose data it is about, the moment it is made (widgets call it "now") and its
 * time frame. The widgets read it when they fetch their data, and the page tells them to refresh when it changes.
 */

export const ReportContext = {
  /** The realm of OpenRemote that the report is about; undefined when the page does not name one. */
  realm: undefined,

  /** Milliseconds since the epoch. */
  asOf: Date.now(),

  /** The time frame of the report: { id, label, start: Date, end: Date }, or undefined when none is set. */
  period: undefined,

  now() {
    return new Date(this.asOf);
  },
};
