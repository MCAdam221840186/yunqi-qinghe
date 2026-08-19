export type SiteSectionId = "about" | "team-diaries" | "diaries";

export interface SiteSection {
  id: SiteSectionId;
  href: string;
  label: string;
  description: string;
}

export const siteSections: readonly SiteSection[] = [
  {
    id: "about",
    href: "/about/",
    label: "团队介绍",
    description: "认识云启青禾，以及一起参与这段支教旅程的人。",
  },
  {
    id: "team-diaries",
    href: "/team-diaries/",
    label: "团队日志",
    description: "阅读支教路上的行动记录与团队思考。",
  },
  {
    id: "diaries",
    href: "/diaries/",
    label: "成长日志",
    description: "查看经过匿名处理的孩子成长片段。",
  },
];
