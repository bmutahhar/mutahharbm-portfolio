const trimTrailingSlash = (url: string) => url.replace(/\/+$/, "");

const withProtocol = (url: string) => {
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  return `https://${url}`;
};

const getSiteUrl = () => {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL;

  if (configuredUrl) {
    return trimTrailingSlash(withProtocol(configuredUrl));
  }

  const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;

  if (vercelUrl) {
    return trimTrailingSlash(withProtocol(vercelUrl));
  }

  return "http://localhost:3000";
};

export const siteUrl = getSiteUrl();
