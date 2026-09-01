/**
 * Canonical site configuration.
 * Single source of truth for `layout.tsx` metadata, `sitemap.ts` and `robots.ts`
 * so the absolute URL is never duplicated across generators.
 */

/** Absolute origin. Overridable per-environment for preview deploys. */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://acostamatt.dev";

export const SITE_NAME = "Matias Acosta — Portfolio";

export const SITE_TITLE = "Matias Acosta | Full Stack Developer & Consultor ERP / IoT";

export const SITE_DESCRIPTION =
  "Desarrollo Full Stack, ecosistemas ERP (Odoo 18/19 & AFIP/ARCA) y telemetría IIoT. Tech Lead Full Stack & Consultor ERP / IoT en Cooperativa Tera, Rosario, Argentina.";

export const SITE_DESCRIPTION_SHORT =
  "Desarrollo Full Stack, ecosistemas ERP (Odoo 18/19 & AFIP/ARCA) y telemetría IIoT en tiempo real.";

/** Primary locale plus the locales the client-side i18n toggle serves on the same URL. */
export const SITE_LOCALE = "es_AR";
export const SITE_LOCALE_ALTERNATE = ["en_US"];

/** Builds an absolute URL from a root-relative path. */
export function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString();
}
