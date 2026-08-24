import activityData from "@/content/reading-activities.json";
import bookData from "@/content/reading-books.json";
import resourceData from "@/content/reading-resources.json";
import {
  gradeBands,
  readingCategories,
  type ReadingActivity,
  type ReadingBook,
  type ReadingCategory,
  type ReadingContentStatus,
  type ReadingGradeBand,
  type ReadingResource,
} from "@/lib/reading-types";

function isGradeBand(value: string): value is ReadingGradeBand {
  return gradeBands.some((gradeBand) => gradeBand === value);
}

function isCategory(value: string): value is ReadingCategory {
  return readingCategories.some((category) => category === value);
}

function asStatus(value: string): ReadingContentStatus {
  if (value !== "active" && value !== "paused") {
    throw new Error(`阅读内容状态无效：${value}`);
  }

  return value;
}

interface RawReadingResource {
  readonly id: string;
  readonly name: string;
  readonly kind: string;
  readonly summary: string;
  readonly url: string;
  readonly accessNote: string;
  readonly serviceModes: readonly string[];
  readonly lastCheckedOn: string;
  readonly status: string;
}

interface RawReadingActivity {
  readonly id: string;
  readonly title: string;
  readonly publishedOn: string;
  readonly summary: string;
  readonly region: string;
  readonly sourceName: string;
  readonly sourceUrl: string;
  readonly lastCheckedOn: string;
  readonly status: string;
}

const rawResourceData = resourceData as unknown as readonly RawReadingResource[];
const rawActivityData = activityData as unknown as readonly RawReadingActivity[];

export const readingBooks: readonly ReadingBook[] = Object.freeze(
  bookData.map((book) => {
    if (!isGradeBand(book.gradeBand)) {
      throw new Error(`书目年级段无效：${book.id}`);
    }
    if (!isCategory(book.category)) {
      throw new Error(`书目类别无效：${book.id}`);
    }

    return Object.freeze({
      id: book.id,
      gradeBand: book.gradeBand,
      category: book.category,
      order: book.order,
      title: book.title,
      ...(book.creditLine ? { creditLine: book.creditLine } : {}),
      ...(book.note ? { note: book.note } : {}),
    });
  }),
);

export const readingResources: readonly ReadingResource[] = Object.freeze(
  rawResourceData.map((resource) =>
    Object.freeze({
      id: resource.id,
      name: resource.name,
      kind: resource.kind,
      summary: resource.summary,
      url: resource.url,
      accessNote: resource.accessNote,
      serviceModes: Object.freeze([...resource.serviceModes]),
      lastCheckedOn: resource.lastCheckedOn,
      status: asStatus(resource.status),
    }),
  ),
);

export const readingActivities: readonly ReadingActivity[] = Object.freeze(
  rawActivityData
    .map((activity) =>
      Object.freeze({
        id: activity.id,
        title: activity.title,
        publishedOn: activity.publishedOn,
        summary: activity.summary,
        region: activity.region,
        sourceName: activity.sourceName,
        sourceUrl: activity.sourceUrl,
        lastCheckedOn: activity.lastCheckedOn,
        status: asStatus(activity.status),
      }),
    )
    .sort(
      (left, right) =>
        Date.parse(right.publishedOn) - Date.parse(left.publishedOn),
    ),
);

export function formatReadingDate(value: string): string {
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Shanghai",
  }).format(new Date(`${value}T00:00:00+08:00`));
}
