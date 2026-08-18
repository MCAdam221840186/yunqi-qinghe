import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  children,
  getChildBySlug,
  getDiaryDateRange,
  getDiariesForChild,
} from "@/lib/content";
import {
  createBreadcrumbJsonLd,
  createPageMetadata,
  serializeJsonLd,
} from "@/lib/site";
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

  return createPageMetadata({
    title,
    description,
    path: `/children/${child.slug}/`,
  });
}

export default async function ChildDiaryListPage({ params }: ChildPageProps) {
  const { slug } = await params;
  const child = getChildBySlug(slug);

  if (!child) notFound();

  const breadcrumbs = createBreadcrumbJsonLd([
    { name: "首页", path: "/" },
    { name: "成长日志", path: "/diaries/" },
    { name: child.displayName, path: `/children/${child.slug}/` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbs) }}
      />
      <ChildDiaryListView
        child={child}
        diaries={getDiariesForChild(child.slug)}
        dateRange={getDiaryDateRange(child.slug)}
      />
    </>
  );
}
