/**
 * How the realm of the report looks, as the manager shows the realm: its primary colour and its logo. The report
 * service reads them from the manager's configuration. A realm that sets none looks like OpenRemote, in the colours
 * of the theme (vendor/or-theme.css).
 */

import { ReportContext } from './report-context.js';
import { ServiceClient } from './service-client.js';

export const Branding = {
  /** The address of the logo of the realm; undefined when it has none. */
  logo: undefined,
};

/** The properties of the theme that follow the primary colour, set as the manager sets them for a realm (or-app). */
function primaryColourProperties(colour) {
  return {
    '--or-color-primary': colour,
    '--or-color-primary-50pct': 'hsl(from var(--or-color-primary) h s l / 0.76)',
    '--or-color-primary-10pct': 'hsl(from var(--or-color-primary) h s l / 0.13)',
    '--or-color-text-primary': colour,
  };
}

/**
 * Reads the branding of the realm of the report and puts it on the page: the colour on root, which the whole theme
 * follows, and the logo in Branding for the cover. The page keeps the look of OpenRemote when the service cannot say.
 */
export async function loadBranding(root = document.documentElement) {
  try {
    const { primaryColour, logo } = await ServiceClient.getJson('/branding', { realm: ReportContext.realm });
    Branding.logo = logo;
    if (primaryColour) {
      for (const [name, value] of Object.entries(primaryColourProperties(primaryColour))) {
        root.style.setProperty(name, value);
      }
    }
  } catch (error) {
    console.error(error);
  }
}
