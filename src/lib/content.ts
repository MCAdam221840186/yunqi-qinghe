import childrenJson from "@/content/children.json";
import diariesJson from "@/content/diaries.json";
import teamDiariesJson from "@/content/team-diaries.json";
import teamMembersJson from "@/content/team-members.json";

export interface ChildRecord {
  readonly slug: string;
  readonly displayName: string;
}

export interface StructuredDiaryFields {
  readonly learned: string;
  readonly happiest: string;
  readonly message: string;
  readonly comment: string;
}

interface DiaryRecordBase {
  readonly slug: string;
  readonly childSlug: string;
  readonly title: string;
  readonly date: string;
}

export interface PlainDiaryRecord extends DiaryRecordBase {
  readonly kind: "plain";
  readonly body: string;
}

export interface StructuredDiaryRecord extends DiaryRecordBase {
  readonly kind: "structured";
  readonly fields: StructuredDiaryFields;
}

export type DiaryRecord = PlainDiaryRecord | StructuredDiaryRecord;

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
  readonly teamMembers: number;
  readonly teamDiaries: number;
}

type UnknownRecord = Record<string, unknown>;

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

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

function readStructuredDiaryFields(
  value: unknown,
  label: string,
): StructuredDiaryFields {
  const record = readRecord(value, label);
  return Object.freeze({
    learned: readString(record.learned, `${label}.learned`, { allowEmpty: true }),
    happiest: readString(record.happiest, `${label}.happiest`, { allowEmpty: true }),
    message: readString(record.message, `${label}.message`, { allowEmpty: true }),
    comment: readString(record.comment, `${label}.comment`, { allowEmpty: true }),
  });
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

function readChild(item: unknown, label: string): ChildRecord {
  const record = readRecord(item, label);
  return Object.freeze({
    slug: readSlug(record.slug, `${label}.slug`),
    displayName: readString(record.displayName, `${label}.displayName`),
  });
}

function readDiary(item: unknown, label: string): DiaryRecord {
  const record = readRecord(item, label);
  const slug = readSlug(record.slug, `${label}.slug`);
  const childSlug = readSlug(record.childSlug, `${label}.childSlug`);
  const title = readString(record.title, `${label}.title`);
  const date = readIsoDate(record.date, `${label}.date`);

  if (record.kind === "plain") {
    return Object.freeze({
      slug,
      childSlug,
      title,
      date,
      kind: "plain",
      body: readString(record.body, `${label}.body`, { allowEmpty: true }),
    });
  }

  if (record.kind === "structured") {
    return Object.freeze({
      slug,
      childSlug,
      title,
      date,
      kind: "structured",
      fields: readStructuredDiaryFields(record.fields, `${label}.fields`),
    });
  }

  throw new Error(`${label}.kind 必须是 plain 或 structured`);
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

export const children = readArray(childrenJson, "children", readChild);
export const diaries = readArray(diariesJson, "diaries", readDiary);
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

export function validateContent(): ContentStats {
  assertUniqueValues(children, "children.slug", (child) => child.slug);
  assertUniqueValues(diaries, "diaries.slug", (diary) => diary.slug);
  assertUniqueValues(teamMembers, "teamMembers.name", (member) => member.name);

  for (const diary of diaries) {
    if (!childrenBySlug.has(diary.childSlug)) {
      throw new Error(
        `日记 ${diary.slug} 引用了不存在的小朋友 ${diary.childSlug}`,
      );
    }
  }

  return Object.freeze({
    children: children.length,
    diaries: diaries.length,
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

export function sortDiariesNewestFirst(
  records: readonly DiaryRecord[],
): DiaryRecord[] {
  return [...records].sort(
    (left, right) =>
      Date.parse(right.date) - Date.parse(left.date) ||
      left.slug.localeCompare(right.slug),
  );
}

export function getDiariesForChild(childSlug: string): DiaryRecord[] {
  return sortDiariesNewestFirst(
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
  return getDiariesForChild(childSlug)[0];
}

export interface DiaryDateRange {
  readonly earliest: string;
  readonly latest: string;
}

export function getDiaryDateRange(
  childSlug?: string,
): DiaryDateRange | undefined {
  const records = childSlug
    ? diaries.filter((diary) => diary.childSlug === childSlug)
    : diaries;
  if (records.length === 0) return undefined;

  const ordered = [...records].sort(
    (left, right) => Date.parse(left.date) - Date.parse(right.date),
  );
  return Object.freeze({
    earliest: ordered[0].date,
    latest: ordered[ordered.length - 1].date,
  });
}

export interface AdjacentDiaries {
  readonly previous: DiaryRecord | undefined;
  readonly next: DiaryRecord | undefined;
}

export function getAdjacentDiaries(diary: DiaryRecord): AdjacentDiaries {
  const ordered = [...diaries]
    .filter((candidate) => candidate.childSlug === diary.childSlug)
    .sort(
      (left, right) =>
        Date.parse(left.date) - Date.parse(right.date) ||
        left.slug.localeCompare(right.slug),
    );
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
    throw new Error(`日记 ${diary.slug} 缺少对应的小朋友`);
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
