import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  diaries,
  getDiaryAuthor,
  getDiaryBySlug,
  getAdjacentDiaries,
  getDiaryPreview,
} from "@/lib/content";
import {
  createBreadcrumbJsonLd,
  createPageMetadata,
  serializeJsonLd,
} from "@/lib/site";
import DiaryDetailView from "./DiaryDetailView";

type DiaryPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return diaries.map((diary) => ({ slug: diary.slug }));
}

export async function generateMetadata({
  params,
}: DiaryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const diary = getDiaryBySlug(slug);

  if (!diary) {
    return {
      title: "成长记录未找到",
      robots: { index: false, follow: false },
      openGraph: { images: [] },
      twitter: { images: [] },
    };
  }

  const child = getDiaryAuthor(diary);
  const title = diary.title;
  const description = `${child.displayName}：${getDiaryPreview(diary, 100)}`;

  return createPageMetadata({
    title,
    description,
    path: `/diaries/${diary.slug}/`,
    type: "article",
    publishedTime: diary.recordedOn ?? undefined,
    authors: [child.displayName],
  });
}

export default async function DiaryDetailPage({ params }: DiaryPageProps) {
  const { slug } = await params;
  const diary = getDiaryBySlug(slug);

  if (!diary) notFound();
  const child = getDiaryAuthor(diary);
  const breadcrumbs = createBreadcrumbJsonLd([
    { name: "首页", path: "/" },
    { name: "成长日志", path: "/diaries/" },
    { name: child.displayName, path: `/children/${child.slug}/` },
    { name: diary.title, path: `/diaries/${diary.slug}/` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbs) }}
      />
      <DiaryDetailView
        diary={diary}
        child={child}
        adjacent={getAdjacentDiaries(diary)}
      />
    </>
  );
}
