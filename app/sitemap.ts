import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://the-eco-guy.github.io").replace(/\/$/, "");
  return [
    {
      url: `${base}/`,
      lastModified: new Date("2026-10-04"),
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];
}
