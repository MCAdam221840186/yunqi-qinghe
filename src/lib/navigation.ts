export type SiteSectionId =
  | "about"
  | "team-diaries"
  | "reading"
  | "diaries"
  | "works";

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
    description: "阅读孩子们真实、完整且可回溯的成长记录。",
  },
  {
    id: "works",
    href: "/works/",
    label: "创作展",
    description: "走进孩子们用色彩、纸页与自然材料展开的创作。",
  },
  {
    id: "reading",
    href: "/reading/",
    label: "阅读共建",
    description: "按年级选书，连接合法阅读资源，看见双柏的阅读行动。",
  },
];
