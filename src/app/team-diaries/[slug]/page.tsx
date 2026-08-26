import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAdjacentTeamDiaries,
  getTeamDiaryBySlug,
  getTeamDiaryImages,
  teamDiaries,
} from "@/lib/content";
import {
  absoluteUrl,
  createBreadcrumbJsonLd,
  createPageMetadata,
  serializeJsonLd,
  siteConfig,
} from "@/lib/site";
import TeamDiaryDetailView from "./TeamDiaryDetailView";

type TeamDiaryPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

function getSiteRelativeAssetPath(src: string): string {
  const siteBasePath = new URL(absoluteUrl("/")).pathname.replace(/\/+$/u, "");

  return siteBasePath && src.startsWith(`${siteBasePath}/`)
    ? src.slice(siteBasePath.length)
    : src;
}

export function generateStaticParams() {
  return teamDiaries.map((diary) => ({ slug: diary.slug }));
}

export async function generateMetadata({
  params,
}: TeamDiaryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const diary = getTeamDiaryBySlug(slug);

  if (!diary) {
    return {
      title: "团队日志未找到",
      robots: { index: false, follow: false },
      openGraph: { images: [] },
      twitter: { images: [] },
    };
  }

  const images = getTeamDiaryImages(diary);
  const leadImage = images[0];

  return createPageMetadata({
    title: diary.title,
    description: diary.summary,
    path: `/team-diaries/${diary.slug}/`,
    type: "article",
    publishedTime: diary.publishedOn,
    modifiedTime: diary.updatedOn ?? diary.publishedOn,
    authors: [diary.author],
    tags: diary.tags,
    socialImagePath: leadImage
      ? getSiteRelativeAssetPath(leadImage.full.src)
      : undefined,
    socialImageAlt: leadImage?.alt,
    socialImageWidth: leadImage?.full.width,
    socialImageHeight: leadImage?.full.height,
  });
}

export default async function TeamDiaryDetailPage({
  params,
}: TeamDiaryPageProps) {
  const { slug } = await params;
  const diary = getTeamDiaryBySlug(slug);

  if (!diary) notFound();

  const path = `/team-diaries/${diary.slug}/`;
  const images = getTeamDiaryImages(diary);
  const breadcrumbs = createBreadcrumbJsonLd([
    { name: "首页", path: "/" },
    { name: "团队日志", path: "/team-diaries/" },
    { name: diary.title, path },
  ]);
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: diary.title,
    description: diary.summary,
    image: images.map((image) =>
      absoluteUrl(getSiteRelativeAssetPath(image.full.src)),
    ),
    datePublished: diary.publishedOn,
    dateModified: diary.updatedOn ?? diary.publishedOn,
    author: {
      "@type": "Organization",
      name: diary.author,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: absoluteUrl("/"),
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl(path),
    },
    inLanguage: siteConfig.language,
    keywords: diary.tags,
    isBasedOn: diary.sourceUrl,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(article) }}
      />
      <TeamDiaryDetailView
        diary={diary}
        images={images}
        adjacent={getAdjacentTeamDiaries(diary)}
      />
    </>
  );
}
