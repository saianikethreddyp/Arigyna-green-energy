const productionSiteUrl = "https://www.arignyagreenenergy.com";
const configuredSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() ?? productionSiteUrl;

function normalizeSiteUrl(value: string | undefined) {
  if (!value) {
    return undefined;
  }

  try {
    const url = new URL(value);

    if (url.protocol !== "https:") {
      return undefined;
    }

    url.pathname = "";
    url.search = "";
    url.hash = "";

    return url.toString().replace(/\/$/, "");
  } catch {
    return undefined;
  }
}

/**
 * The public HTTPS domain is intentionally configured per deployment. Avoid
 * hard-coding a preview URL, which would create incorrect canonical URLs.
 */
export const siteUrl = normalizeSiteUrl(configuredSiteUrl);

export function absoluteUrl(path = "/") {
  return siteUrl ? new URL(path, `${siteUrl}/`).toString() : undefined;
}
