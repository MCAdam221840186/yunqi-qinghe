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

export default function sitemap(): MetadataRoute.Sitemap {
  const latestDiaryDate = latestDate(diaries.map((diary) => diary.date));
  const latestTeamDate = latestDate(
    teamDiaries.map((diary) => diary.updatedAt),
  );
  const latestSiteDate = latestDate(
    [
      latestDiaryDate?.toISOString(),
      latestTeamDate?.toISOString(),
    ].filter((value): value is string => Boolean(value)),
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
      lastModified: latestDiaryDate,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...children.map((child) => {
      const childDiaries = diaries.filter(
        (diary) => diary.childSlug === child.slug,
      );
      return {
        url: absoluteUrl(`/children/${child.slug}/`),
        lastModified: latestDate(childDiaries.map((diary) => diary.date)),
        changeFrequency: "monthly" as const,
        priority: 0.75,
      };
    }),
    ...diaries.map((diary) => ({
      url: absoluteUrl(`/diaries/${diary.slug}/`),
      lastModified: new Date(diary.date),
      changeFrequency: "yearly" as const,
      priority: 0.65,
    })),
    {
      url: absoluteUrl("/team-diaries/"),
      lastModified: latestTeamDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: absoluteUrl("/about/"),
      changeFrequency: "yearly",
      priority: 0.6,
    },
  ];
}
