import type { StaticImageData } from "next/image";
import { growthCardImageAssets } from "@/content/growth-card-assets.generated";
import {
  growthChildren,
  growthDiaries,
} from "@/content/growth-records.generated";
import teamDiariesJson from "@/content/team-diaries.json";
import teamMembersJson from "@/content/team-members.json";

export interface GrowthHighlight {
  readonly diarySlug: string;
  readonly title: string;
  readonly note: string;
  readonly quote?: string;
}

export interface ChildRecord {
  readonly slug: string;
  readonly displayName: string;
  readonly className: string;
  readonly story: {
    readonly summary: string;
    readonly featuredDiarySlug: string;
    readonly highlights: readonly GrowthHighlight[];
  };
}

export interface StructuredDiaryFields {
  readonly learned: string;
  readonly happiest: string;
  readonly message: string;
  readonly comment: string;
}

export type DiaryDateConfidence = "exact" | "uncertain" | "missing";
export type DiarySourceKind = "standard" | "freeform";

interface DiaryRecordBase {
  readonly slug: string;
  readonly childSlug: string;
  readonly title: string;
  readonly imageId: string;
  readonly dateLabel: string;
  readonly recordedOn: string | null;
  readonly dateConfidence: DiaryDateConfidence;
  readonly sessionOrder: number;
  readonly themes: readonly string[];
  readonly transcriptionNotes: readonly string[];
  readonly sourceKind: DiarySourceKind;
}

export interface PlainDiaryRecord extends DiaryRecordBase {
  readonly kind: "plain";
  readonly sourceKind: "freeform";
  readonly body: string;
}

export interface StructuredDiaryRecord extends DiaryRecordBase {
  readonly kind: "structured";
  readonly sourceKind: "standard";
  readonly fields: StructuredDiaryFields;
}

export type DiaryRecord = PlainDiaryRecord | StructuredDiaryRecord;

export interface GrowthCardAsset {
  readonly full: StaticImageData;
  readonly thumbnail: StaticImageData;
}

export interface TeamMemberRecord {
  readonly name: string;
  readonly role: string;
  readonly description: string;
}

export interface TeamDiaryRecord {
  readonly date: string;
  readonly title: string;
  readonly markdown: string;
  readonly updatedAt: string;
}

export interface ContentStats {
  readonly children: number;
  readonly diaries: number;
  readonly growthCardAssets: number;
  readonly classes: number;
  readonly teamMembers: number;
  readonly teamDiaries: number;
}

type UnknownRecord = Record<string, unknown>;

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const CHILD_SLUG_PATTERN = /^student-\d{3}$/;
const DIARY_SLUG_PATTERN = /^student-\d{3}-session-\d{2}-[a-z]$/;
const IMAGE_ID_PATTERN = /^growth-card-\d{3}$/;
const ISO_DAY_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const EXPECTED_GROWTH_CHILD_COUNT = 40;
const EXPECTED_GROWTH_CARD_COUNT = 157;
const EXPECTED_CLASS_COUNT = 6;

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readRecord(value: unknown, label: string): UnknownRecord {
  if (!isRecord(value)) {
    throw new Error(`${label} 必须是对象`);
  }
  return value;
}

function readString(
  value: unknown,
  label: string,
  options: { allowEmpty?: boolean } = {},
): string {
  if (typeof value !== "string" || (!options.allowEmpty && value.trim() === "")) {
    throw new Error(`${label} 必须是${options.allowEmpty ? "" : "非空"}字符串`);
  }
  return value;
}

function readOptionalString(value: unknown, label: string): string | undefined {
  if (value === undefined) return undefined;
  return readString(value, label);
}

function readSlug(value: unknown, label: string): string {
  const slug = readString(value, label);
  if (!SLUG_PATTERN.test(slug)) {
    throw new Error(`${label} 不是有效的 slug：${slug}`);
  }
  return slug;
}

function readIsoDate(value: unknown, label: string): string {
  const iso = readString(value, label);
  if (!Number.isFinite(Date.parse(iso))) {
    throw new Error(`${label} 不是有效的 ISO 日期：${iso}`);
  }
  return iso;
}

function readRecordedOn(value: unknown, label: string): string | null {
  if (value === null) return null;
  const isoDay = readString(value, label);
  if (!ISO_DAY_PATTERN.test(isoDay) || !Number.isFinite(Date.parse(isoDay))) {
    throw new Error(`${label} 不是有效的 YYYY-MM-DD 日期：${isoDay}`);
  }
  return isoDay;
}

function readPositiveInteger(value: unknown, label: string): number {
  if (!Number.isInteger(value) || Number(value) < 1) {
    throw new Error(`${label} 必须是正整数`);
  }
  return Number(value);
}

function readArray<T>(
  value: unknown,
  label: string,
  parseItem: (item: unknown, itemLabel: string) => T,
): readonly T[] {
  if (!Array.isArray(value)) {
    throw new Error(`${label} 必须是数组`);
  }
  return Object.freeze(
    value.map((item, index) => parseItem(item, `${label}[${index}]`)),
  );
}

function readStringArray(value: unknown, label: string): readonly string[] {
  const values = readArray(value, label, (item, itemLabel) =>
    readString(item, itemLabel),
  );
  if (new Set(values).size !== values.length) {
    throw new Error(`${label} 中存在重复主题`);
  }
  return values;
}

function readHighlight(item: unknown, label: string): GrowthHighlight {
  const record = readRecord(item, label);
  return Object.freeze({
    diarySlug: readSlug(record.diarySlug, `${label}.diarySlug`),
    title: readString(record.title, `${label}.title`),
    note: readString(record.note, `${label}.note`),
    quote: readOptionalString(record.quote, `${label}.quote`),
  });
}

function readChild(item: unknown, label: string): ChildRecord {
  const record = readRecord(item, label);
  const story = readRecord(record.story, `${label}.story`);
  const highlights = readArray(
    story.highlights,
    `${label}.story.highlights`,
    readHighlight,
  );
  if (highlights.length === 0 || highlights.length > 3) {
    throw new Error(`${label}.story.highlights 必须包含 1 至 3 个成长节点`);
  }

  return Object.freeze({
    slug: readSlug(record.slug, `${label}.slug`),
    displayName: readString(record.displayName, `${label}.displayName`),
    className: readString(record.className, `${label}.className`),
    story: Object.freeze({
      summary: readString(story.summary, `${label}.story.summary`),
      featuredDiarySlug: readSlug(
        story.featuredDiarySlug,
        `${label}.story.featuredDiarySlug`,
      ),
      highlights,
    }),
  });
}

function readStructuredDiaryFields(
  value: unknown,
  label: string,
): StructuredDiaryFields {
  const record = readRecord(value, label);
  return Object.freeze({
    learned: readString(record.learned, `${label}.learned`, { allowEmpty: true }),
    happiest: readString(record.happiest, `${label}.happiest`, {
      allowEmpty: true,
    }),
    message: readString(record.message, `${label}.message`, { allowEmpty: true }),
    comment: readString(record.comment, `${label}.comment`, { allowEmpty: true }),
  });
}

function readDiary(item: unknown, label: string): DiaryRecord {
  const record = readRecord(item, label);
  const base = {
    slug: readSlug(record.slug, `${label}.slug`),
    childSlug: readSlug(record.childSlug, `${label}.childSlug`),
    title: readString(record.title, `${label}.title`),
    imageId: readSlug(record.imageId, `${label}.imageId`),
    dateLabel: readString(record.dateLabel, `${label}.dateLabel`),
    recordedOn: readRecordedOn(record.recordedOn, `${label}.recordedOn`),
    sessionOrder: readPositiveInteger(
      record.sessionOrder,
      `${label}.sessionOrder`,
    ),
    themes: readStringArray(record.themes, `${label}.themes`),
    transcriptionNotes:
      record.transcriptionNotes === undefined
        ? Object.freeze([])
        : readStringArray(
            record.transcriptionNotes,
            `${label}.transcriptionNotes`,
          ),
  } as const;

  if (
    record.dateConfidence !== "exact" &&
    record.dateConfidence !== "uncertain" &&
    record.dateConfidence !== "missing"
  ) {
    throw new Error(
      `${label}.dateConfidence 必须是 exact、uncertain 或 missing`,
    );
  }

  if (record.kind === "plain" && record.sourceKind === "freeform") {
    return Object.freeze({
      ...base,
      dateConfidence: record.dateConfidence,
      sourceKind: "freeform",
      kind: "plain",
      body: readString(record.body, `${label}.body`, { allowEmpty: true }),
    });
  }

  if (record.kind === "structured" && record.sourceKind === "standard") {
    return Object.freeze({
      ...base,
      dateConfidence: record.dateConfidence,
      sourceKind: "standard",
      kind: "structured",
      fields: readStructuredDiaryFields(record.fields, `${label}.fields`),
    });
  }

  throw new Error(`${label} 的 kind 与 sourceKind 组合不受支持`);
}

function readTeamMember(item: unknown, label: string): TeamMemberRecord {
  const record = readRecord(item, label);
  return Object.freeze({
    name: readString(record.name, `${label}.name`),
    role: readString(record.role, `${label}.role`, { allowEmpty: true }),
    description: readString(record.description, `${label}.description`, {
      allowEmpty: true,
    }),
  });
}

function readTeamDiary(item: unknown, label: string): TeamDiaryRecord {
  const record = readRecord(item, label);
  return Object.freeze({
    date: readIsoDate(record.date, `${label}.date`),
    title: readString(record.title, `${label}.title`, { allowEmpty: true }),
    markdown: readString(record.markdown, `${label}.markdown`),
    updatedAt: readIsoDate(record.updatedAt, `${label}.updatedAt`),
  });
}

export const children = readArray(growthChildren, "growthChildren", readChild);
export const diaries = readArray(growthDiaries, "growthDiaries", readDiary);
export const teamMembers = readArray(
  teamMembersJson,
  "teamMembers",
  readTeamMember,
);
export const teamDiaries = Object.freeze(
  [...readArray(teamDiariesJson, "teamDiaries", readTeamDiary)].sort(
    (left, right) =>
      Date.parse(left.date) - Date.parse(right.date) ||
      left.updatedAt.localeCompare(right.updatedAt),
  ),
);

export const growthCardAssets: Readonly<Record<string, GrowthCardAsset>> =
  Object.freeze(
    Object.fromEntries(
      Object.entries(growthCardImageAssets).map(([imageId, asset]) => [
        imageId,
        Object.freeze({ full: asset.full, thumbnail: asset.thumb }),
      ]),
    ),
  );

const childrenBySlug = new Map(children.map((child) => [child.slug, child]));
const diariesBySlug = new Map(diaries.map((diary) => [diary.slug, diary]));

function assertUniqueValues<T>(
  records: readonly T[],
  label: string,
  getValue: (record: T) => string,
): void {
  const seen = new Set<string>();
  for (const record of records) {
    const value = getValue(record);
    if (seen.has(value)) {
      throw new Error(`${label} 中存在重复值：${value}`);
    }
    seen.add(value);
  }
}

function validateGrowthStory(child: ChildRecord): void {
  const featured = diariesBySlug.get(child.story.featuredDiarySlug);
  if (!featured || featured.childSlug !== child.slug) {
    throw new Error(
      `${child.slug} 的代表卡 ${child.story.featuredDiarySlug} 不属于该儿童`,
    );
  }

  const featuredHighlight = child.story.highlights.find(
    (highlight) => highlight.diarySlug === child.story.featuredDiarySlug,
  );
  if (!featuredHighlight?.quote) {
    throw new Error(
      `${child.slug} 的代表卡必须同时作为成长节点并提供可回溯的孩子原话`,
    );
  }

  assertUniqueValues(
    child.story.highlights,
    `${child.slug}.story.highlights.diarySlug`,
    (highlight) => highlight.diarySlug,
  );
  for (const highlight of child.story.highlights) {
    const diary = diariesBySlug.get(highlight.diarySlug);
    if (!diary || diary.childSlug !== child.slug) {
      throw new Error(
        `${child.slug} 的成长节点 ${highlight.diarySlug} 不属于该儿童`,
      );
    }
    if (highlight.quote) {
      const transcript = getDiaryTranscript(diary).replace(/\s+/g, "");
      const quote = highlight.quote.replace(/\s+/g, "");
      if (!transcript.includes(quote)) {
        throw new Error(
          `${child.slug} 的成长节点原话无法回溯到 ${highlight.diarySlug}`,
        );
      }
    }
  }
}

function getDiaryTranscript(diary: DiaryRecord): string {
  return diary.kind === "plain"
    ? diary.body
    : [
        diary.fields.learned,
        diary.fields.happiest,
        diary.fields.message,
        diary.fields.comment,
      ].join("\n");
}

function validateAsset(imageId: string, asset: GrowthCardAsset): void {
  for (const [variant, image] of [
    ["full", asset.full],
    ["thumbnail", asset.thumbnail],
  ] as const) {
    if (
      !image ||
      typeof image.src !== "string" ||
      image.width < 1 ||
      image.height < 1
    ) {
      throw new Error(`图片 ${imageId}.${variant} 不是有效的静态图片`);
    }
  }
}

export function validateContent(): ContentStats {
  assertUniqueValues(children, "children.slug", (child) => child.slug);
  assertUniqueValues(
    children,
    "children.displayName+className",
    (child) => `${child.displayName}::${child.className}`,
  );
  assertUniqueValues(diaries, "diaries.slug", (diary) => diary.slug);
  assertUniqueValues(diaries, "diaries.imageId", (diary) => diary.imageId);
  assertUniqueValues(teamMembers, "teamMembers.name", (member) => member.name);

  if (children.length !== EXPECTED_GROWTH_CHILD_COUNT) {
    throw new Error(
      `儿童数量应为 ${EXPECTED_GROWTH_CHILD_COUNT}，当前为 ${children.length}`,
    );
  }

  if (diaries.length !== EXPECTED_GROWTH_CARD_COUNT) {
    throw new Error(
      `成长卡数量应为 ${EXPECTED_GROWTH_CARD_COUNT}，当前为 ${diaries.length}`,
    );
  }

  const assetIds = Object.keys(growthCardAssets);
  if (assetIds.length !== EXPECTED_GROWTH_CARD_COUNT) {
    throw new Error(
      `成长卡图片数量应为 ${EXPECTED_GROWTH_CARD_COUNT}，当前为 ${assetIds.length}`,
    );
  }

  for (const diary of diaries) {
    const slugMatch = DIARY_SLUG_PATTERN.exec(diary.slug);
    if (!slugMatch) {
      throw new Error(`成长卡 ${diary.slug} 未使用稳定的场次 slug`);
    }
    if (!diary.slug.startsWith(`${diary.childSlug}-session-`)) {
      throw new Error(`成长卡 ${diary.slug} 与儿童 ${diary.childSlug} 的 slug 不一致`);
    }
    if (diary.sessionOrder > 4) {
      throw new Error(`成长卡 ${diary.slug} 的 sessionOrder 超出 1 至 4`);
    }
    const slugSessionOrder = Number(
      diary.slug.match(/-session-(\d{2})-/)?.[1],
    );
    if (slugSessionOrder !== diary.sessionOrder) {
      throw new Error(`成长卡 ${diary.slug} 的 slug 与 sessionOrder 不一致`);
    }
    if (!IMAGE_ID_PATTERN.test(diary.imageId)) {
      throw new Error(`成长卡 ${diary.slug} 的 imageId 格式无效`);
    }
    if (diary.themes.length === 0) {
      throw new Error(`成长卡 ${diary.slug} 至少需要一个内容主题`);
    }
    if (diary.dateConfidence === "exact" && diary.recordedOn === null) {
      throw new Error(`成长卡 ${diary.slug} 标记为准确日期但没有 recordedOn`);
    }
    if (diary.dateConfidence === "missing" && diary.recordedOn !== null) {
      throw new Error(`成长卡 ${diary.slug} 标记为缺失日期但仍填写 recordedOn`);
    }
    if (!childrenBySlug.has(diary.childSlug)) {
      throw new Error(
        `成长卡 ${diary.slug} 引用了不存在的儿童 ${diary.childSlug}`,
      );
    }
    if (!growthCardAssets[diary.imageId]) {
      throw new Error(`成长卡 ${diary.slug} 缺少图片 ${diary.imageId}`);
    }
  }

  for (const imageId of assetIds) {
    validateAsset(imageId, growthCardAssets[imageId]);
    if (!diaries.some((diary) => diary.imageId === imageId)) {
      throw new Error(`图片 ${imageId} 没有对应的成长卡记录`);
    }
  }

  for (const child of children) {
    if (!CHILD_SLUG_PATTERN.test(child.slug)) {
      throw new Error(`儿童 ${child.slug} 未使用稳定的技术 slug`);
    }
    const childDiaries = diaries.filter((diary) => diary.childSlug === child.slug);
    if (childDiaries.length === 0) {
      throw new Error(`${child.slug} 没有成长卡记录`);
    }
    validateGrowthStory(child);
  }

  const classCount = new Set(children.map((child) => child.className)).size;
  if (classCount !== EXPECTED_CLASS_COUNT) {
    throw new Error(`班级数量应为 ${EXPECTED_CLASS_COUNT}，当前为 ${classCount}`);
  }

  return Object.freeze({
    children: children.length,
    diaries: diaries.length,
    growthCardAssets: assetIds.length,
    classes: classCount,
    teamMembers: teamMembers.length,
    teamDiaries: teamDiaries.length,
  });
}

export const contentStats = validateContent();

export function getChildBySlug(slug: string): ChildRecord | undefined {
  return childrenBySlug.get(slug);
}

export function getDiaryBySlug(slug: string): DiaryRecord | undefined {
  return diariesBySlug.get(slug);
}

export function getGrowthCardAsset(imageId: string): GrowthCardAsset {
  const asset = growthCardAssets[imageId];
  if (!asset) throw new Error(`找不到成长卡图片：${imageId}`);
  return asset;
}

export function getGrowthCardImageAlt(
  displayName: string,
  diary: DiaryRecord,
  subject = "成长记录原卡",
): string {
  if (diary.dateConfidence === "missing") {
    return `${displayName}填写的${subject}，原卡日期未填写`;
  }

  return `${displayName}在${diary.dateLabel}填写的${subject}`;
}

export function sortDiariesChronologically(
  records: readonly DiaryRecord[],
): DiaryRecord[] {
  return [...records].sort(
    (left, right) =>
      left.sessionOrder - right.sessionOrder ||
      (left.recordedOn ?? "").localeCompare(right.recordedOn ?? "") ||
      left.slug.localeCompare(right.slug),
  );
}

export function sortDiariesNewestFirst(
  records: readonly DiaryRecord[],
): DiaryRecord[] {
  return sortDiariesChronologically(records).reverse();
}

export function getDiariesForChild(childSlug: string): DiaryRecord[] {
  return sortDiariesChronologically(
    diaries.filter((diary) => diary.childSlug === childSlug),
  );
}

export function getDiaryCountForChild(childSlug: string): number {
  return diaries.reduce(
    (count, diary) => count + Number(diary.childSlug === childSlug),
    0,
  );
}

export function getLatestDiaries(limit = 3): DiaryRecord[] {
  if (!Number.isInteger(limit) || limit < 0) {
    throw new Error("limit 必须是非负整数");
  }
  return sortDiariesNewestFirst(diaries).slice(0, limit);
}

export function getLatestDiaryForChild(
  childSlug: string,
): DiaryRecord | undefined {
  return sortDiariesNewestFirst(
    diaries.filter((diary) => diary.childSlug === childSlug),
  )[0];
}

export interface DiaryDateRange {
  readonly earliestLabel: string;
  readonly latestLabel: string;
}

export function getDiaryDateRange(
  childSlug?: string,
): DiaryDateRange | undefined {
  const records = childSlug
    ? diaries.filter((diary) => diary.childSlug === childSlug)
    : diaries;
  if (records.length === 0) return undefined;

  const recordsWithDateLabels = records.filter(
    (diary) => diary.dateConfidence !== "missing",
  );
  const ordered = sortDiariesChronologically(
    recordsWithDateLabels.length > 0 ? recordsWithDateLabels : records,
  );
  return Object.freeze({
    earliestLabel: ordered[0].dateLabel,
    latestLabel: ordered[ordered.length - 1].dateLabel,
  });
}

export interface AdjacentDiaries {
  readonly previous: DiaryRecord | undefined;
  readonly next: DiaryRecord | undefined;
}

export function getAdjacentDiaries(diary: DiaryRecord): AdjacentDiaries {
  const ordered = getDiariesForChild(diary.childSlug);
  const index = ordered.findIndex((candidate) => candidate.slug === diary.slug);

  if (index < 0) {
    return Object.freeze({ previous: undefined, next: undefined });
  }

  return Object.freeze({
    previous: index > 0 ? ordered[index - 1] : undefined,
    next: index < ordered.length - 1 ? ordered[index + 1] : undefined,
  });
}

export function getDiaryAuthor(diary: DiaryRecord): ChildRecord {
  const child = getChildBySlug(diary.childSlug);
  if (!child) {
    throw new Error(`成长卡 ${diary.slug} 缺少对应儿童`);
  }
  return child;
}

export function getDiaryPreview(
  diary: DiaryRecord,
  maximumLength = 90,
): string {
  const plainText =
    diary.kind === "plain"
      ? diary.body
      : diary.fields.learned ||
        diary.fields.happiest ||
        diary.fields.message ||
        diary.fields.comment;
  const normalized = plainText.replace(/\s+/g, " ").trim();
  if (normalized.length <= maximumLength) return normalized;
  return `${normalized.slice(0, Math.max(0, maximumLength - 1))}…`;
}

export function getFeaturedDiaryForChild(child: ChildRecord): DiaryRecord {
  const diary = getDiaryBySlug(child.story.featuredDiarySlug);
  if (!diary) {
    throw new Error(`${child.slug} 缺少代表成长卡`);
  }
  return diary;
}

export function getChildrenGroupedByClass(): ReadonlyArray<{
  readonly className: string;
  readonly children: readonly ChildRecord[];
}> {
  const groups = new Map<string, ChildRecord[]>();
  for (const child of children) {
    const group = groups.get(child.className) ?? [];
    group.push(child);
    groups.set(child.className, group);
  }

  return [...groups.entries()]
    .sort(([left], [right]) => left.localeCompare(right, "zh-CN"))
    .map(([className, groupChildren]) => ({
      className,
      children: [...groupChildren].sort((left, right) =>
        left.displayName.localeCompare(right.displayName, "zh-CN"),
      ),
    }));
}
