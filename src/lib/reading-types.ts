export const gradeBands = ["grade-1-2", "grade-3-4", "grade-5-6"] as const;

export type ReadingGradeBand = (typeof gradeBands)[number];

export const readingCategories = [
  "story",
  "red",
  "picture",
  "science",
  "classic",
  "featured",
] as const;

export type ReadingCategory = (typeof readingCategories)[number];

export type ReadingContentStatus = "active" | "paused";

export interface ReadingBook {
  readonly id: string;
  readonly gradeBand: ReadingGradeBand;
  readonly category: ReadingCategory;
  readonly order: number;
  readonly title: string;
  readonly creditLine?: string;
  readonly note?: string;
}

export interface ReadingResource {
  readonly id: string;
  readonly name: string;
  readonly kind: string;
  readonly summary: string;
  readonly url: string;
  readonly accessNote: string;
  readonly serviceModes: readonly string[];
  readonly lastCheckedOn: string;
  readonly status: ReadingContentStatus;
}

export interface ReadingActivity {
  readonly id: string;
  readonly title: string;
  readonly publishedOn: string;
  readonly summary: string;
  readonly region: string;
  readonly sourceName: string;
  readonly sourceUrl: string;
  readonly lastCheckedOn: string;
  readonly status: ReadingContentStatus;
}

export const gradeBandLabels: Readonly<Record<ReadingGradeBand, string>> = {
  "grade-1-2": "一、二年级",
  "grade-3-4": "三、四年级",
  "grade-5-6": "五、六年级",
};

export const categoryLabels: Readonly<Record<ReadingCategory, string>> = {
  story: "故事类",
  red: "红色类",
  picture: "绘本类",
  science: "科普类",
  classic: "名著类",
  featured: "特色类",
};
