import type { MetadataRoute } from "next";
import { children, diaries, teamDiaries } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

function latestDate(values: readonly string[]): Date | undefined {
  if (values.length === 0) return undefined;
  return new Date(
    values.reduce((latest, value) =>
      Date.parse(value) > Date.parse(latest) ? value : latest,
    ),
  );
}

function recordedDates(
  records: readonly { readonly recordedOn: string | null }[],
): string[] {
  return records
    .map((record) => record.recordedOn)
    .filter((value): value is string => value !== null);
}

export default function sitemap(): MetadataRoute.Sitemap {
  const latestGrowthDate = latestDate(recordedDates(diaries));
  const latestTeamDate = latestDate(
    teamDiaries.map((diary) => diary.updatedAt),
  );
  const latestSiteDate = latestDate(
    [latestGrowthDate?.toISOString(), latestTeamDate?.toISOString()].filter(
      (value): value is string => Boolean(value),
    ),
  );

  return [
    {
      url: absoluteUrl("/"),
      lastModified: latestSiteDate,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: absoluteUrl("/diaries/"),
      lastModified: latestGrowthDate,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    ...children.map((child) => {
      const childDiaries = diaries.filter(
        (diary) => diary.childSlug === child.slug,
      );
      return {
        url: absoluteUrl(`/children/${child.slug}/`),
        lastModified: latestDate(recordedDates(childDiaries)),
        changeFrequency: "monthly" as const,
        priority: 0.5,
      };
    }),
    ...diaries.map((diary) => ({
      url: absoluteUrl(`/diaries/${diary.slug}/`),
      lastModified: diary.recordedOn
        ? new Date(diary.recordedOn)
        : undefined,
      changeFrequency: "yearly" as const,
      priority: 0.4,
    })),
    {
      url: absoluteUrl("/team-diaries/"),
      lastModified: latestTeamDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/works/"),
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: absoluteUrl("/about/"),
      changeFrequency: "yearly",
      priority: 0.9,
    },
  ];
}
