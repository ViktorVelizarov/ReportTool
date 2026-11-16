/*
 * Which time a widget shows. In Insights every chart has a time window of its own ("this day", "last 7 days", ...). In
 * a report the charts can follow the time frame of the report instead; that is the default, and the widget setting
 * followReportPeriod switches it off. The KPI of OpenRemote has no time frame to give it: it shows the period before
 * now.
 */

import { ReportContext } from '../../data/report-context.js';
import {
  addToDate, getDefaultTimePrefixOptions, getDefaultTimeWindowOptions, getTimeSelectionDates,
} from '../../data/time-window.js';

const KPI_PERIOD_UNITS = { hour: 'hours', day: 'days', week: 'weeks', month: 'months', year: 'years' };

/** Splits a key such as "last7Days" into its prefix ("last") and window key ("7Days"); the first ones when unknown. */
export function splitPresetKey(key, prefixes, windows = getDefaultTimeWindowOptions()) {
  const prefix = prefixes.find(candidate => key?.startsWith(candidate)) ?? prefixes[0];
  const windowKey = key?.slice(prefix.length);
  return { prefix, windowKey: windows.has(windowKey) ? windowKey : [...windows.keys()][0] };
}

/**
 * [start, end] as dates: the time frame of the report when the widget follows it (the config says followReportPeriod,
 * which is so unless it is switched off), otherwise undefined. The context has the period of the report and the moment
 * it is made for; it is the one of the page unless given.
 */
export function followedTimeframe({ followReportPeriod }, context = ReportContext) {
  const { period } = context;
  return followReportPeriod !== false && period ? [period.start, period.end] : undefined;
}

/** [from, to] in milliseconds for a widget: the time frame of the report, or the window of the widget itself. */
function widgetRange({ followReportPeriod, prefix, windowKey, windows }, context = ReportContext) {
  const followed = followedTimeframe({ followReportPeriod }, context);
  if (followed) return followed.map(date => date.getTime());
  return getTimeSelectionDates(prefix, windowKey, context.now(), windows).map(date => date.getTime());
}

/**
 * [from, to] in milliseconds of the time that a widget of the type shows with its config, or undefined for a widget
 * that has no time, such as the table, which shows the current values.
 */
export function configRange(widgetTypeId, config, context = ReportContext) {
  const { followReportPeriod } = config;
  switch (widgetTypeId) {
    case 'linechart': {
      const { prefix, windowKey } = splitPresetKey(config.defaultTimePresetKey, getDefaultTimePrefixOptions());
      return widgetRange({ followReportPeriod, prefix, windowKey }, context);
    }
    case 'barchart':
      return widgetRange({
        followReportPeriod, prefix: config.defaultTimePrefixKey, windowKey: config.defaultTimeWindowKey,
      }, context);
    case 'kpi': { // the period before now, as in OpenRemote: it does not follow the report
      const now = context.now();
      return [addToDate(now, KPI_PERIOD_UNITS[config.period] ?? 'days', -1).getTime(), now.getTime()];
    }
    default:
      return undefined;
  }
}
