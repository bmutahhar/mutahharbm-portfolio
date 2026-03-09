import { env } from "../env";

const trimTrailingSlash = (url: string) => url.replace(/\/+$/, "");

const withProtocol = (url: string) => {
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  return `https://${url}`;
};

const getSiteUrl = () => {
  const configuredUrl = env.NEXT_PUBLIC_SITE_URL ?? env.SITE_URL;

  if (configuredUrl) {
    return trimTrailingSlash(withProtocol(configuredUrl));
  }

  const vercelUrl = env.VERCEL_PROJECT_PRODUCTION_URL ?? env.VERCEL_URL;

  if (vercelUrl) {
    return trimTrailingSlash(withProtocol(vercelUrl));
  }

  return "http://localhost:3000";
};

export const siteUrl = getSiteUrl();
