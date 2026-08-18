import type { Metadata } from "next";

const DEFAULT_SITE_URL = "http://localhost:3000";

function normalizeSiteUrl(value: string): string {
  return value.trim().replace(/\/+$/, "") || DEFAULT_SITE_URL;
}

export const siteUrl = normalizeSiteUrl(
  process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL,
);

export const siteConfig = Object.freeze({
  name: "云启青禾",
  description: "记录每一株幼苗的成长故事",
  locale: "zh_CN",
  language: "zh-CN",
  socialImagePath: "/og-v2.jpg",
  socialImageAlt: "一本空白成长日记与向光生长的绿色幼苗",
});

export function absoluteUrl(path = "/"): string {
  const normalizedPath = path === "/" ? "" : path.replace(/^\/+/, "");
  return new URL(normalizedPath, `${siteUrl}/`).toString();
}

export interface PageMetadataOptions {
  readonly title: string;
  readonly description: string;
  readonly path: string;
  readonly type?: "website" | "article";
  readonly publishedTime?: string;
  readonly authors?: readonly string[];
}

export function createPageMetadata({
  title,
  description,
  path,
  type = "website",
  publishedTime,
  authors = [],
}: PageMetadataOptions): Metadata {
  const canonical = absoluteUrl(path);
  const socialImage = {
    url: absoluteUrl(siteConfig.socialImagePath),
    width: 1200,
    height: 630,
    alt: siteConfig.socialImageAlt,
  };
  const openGraph =
    type === "article"
      ? {
          title,
          description,
          type: "article" as const,
          locale: siteConfig.locale,
          url: canonical,
          siteName: siteConfig.name,
          publishedTime,
          authors: [...authors],
          images: [socialImage],
        }
      : {
          title,
          description,
          type: "website" as const,
          locale: siteConfig.locale,
          url: canonical,
          siteName: siteConfig.name,
          images: [socialImage],
        };

  return {
    title,
    description,
    alternates: { canonical },
    openGraph,
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImage.url],
    },
  };
}

export interface BreadcrumbItem {
  readonly name: string;
  readonly path: string;
}

export function createWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: absoluteUrl("/"),
    description: siteConfig.description,
    inLanguage: siteConfig.language,
  };
}

export function createBreadcrumbJsonLd(items: readonly BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
