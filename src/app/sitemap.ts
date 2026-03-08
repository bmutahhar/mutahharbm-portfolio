import type { MetadataRoute } from "next";
import { siteUrl } from "./site-config";

const sitemap = (): MetadataRoute.Sitemap => [
  {
    url: siteUrl,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 1,
  },
];

export default sitemap;
