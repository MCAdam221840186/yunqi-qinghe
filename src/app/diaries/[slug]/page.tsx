import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  diaries,
  getDiaryAuthor,
  getDiaryBySlug,
  getDiaryPreview,
} from "@/lib/content";
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
      title: "日记未找到",
      robots: { index: false, follow: false },
      openGraph: { images: [] },
      twitter: { images: [] },
    };
  }

  const child = getDiaryAuthor(diary);
  const title = diary.title;
  const description = `${child.displayName}：${getDiaryPreview(diary, 100)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: diary.date,
      authors: [child.displayName],
      images: [],
    },
    twitter: {
      card: "summary",
      title,
      description,
      images: [],
    },
  };
}

export default async function DiaryDetailPage({ params }: DiaryPageProps) {
  const { slug } = await params;
  const diary = getDiaryBySlug(slug);

  if (!diary) notFound();

  return <DiaryDetailView diary={diary} child={getDiaryAuthor(diary)} />;
}
