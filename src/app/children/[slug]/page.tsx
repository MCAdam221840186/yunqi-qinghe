import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  children,
  getChildBySlug,
  getDiariesForChild,
} from "@/lib/content";
import ChildDiaryListView from "./ChildDiaryListView";

type ChildPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return children.map((child) => ({ slug: child.slug }));
}

export async function generateMetadata({
  params,
}: ChildPageProps): Promise<Metadata> {
  const { slug } = await params;
  const child = getChildBySlug(slug);

  if (!child) {
    return {
      title: "成长日记未找到",
      robots: { index: false, follow: false },
      openGraph: { images: [] },
      twitter: { images: [] },
    };
  }

  const count = getDiariesForChild(child.slug).length;
  const title = `${child.displayName} 的成长日记`;
  const description = `浏览 ${child.displayName} 的 ${count} 篇成长日记。`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
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

export default async function ChildDiaryListPage({ params }: ChildPageProps) {
  const { slug } = await params;
  const child = getChildBySlug(slug);

  if (!child) notFound();

  return (
    <ChildDiaryListView
      child={child}
      diaries={getDiariesForChild(child.slug)}
    />
  );
}
