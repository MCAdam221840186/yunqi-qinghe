import { existsSync, readFileSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const contentRoot = join(projectRoot, "src", "content");
const pdfPath = join(
  projectRoot,
  "public",
  "downloads",
  "shuangbai-primary-school-graded-reading-list.pdf",
);
const previewPath = join(
  projectRoot,
  "src",
  "assets",
  "reading",
  "booklist-page-1.webp",
);
const sharedActivitySourceUrl =
  "https://www.cxshb.gov.cn/info/40237/170521.htm";
const sharedActivitySourceIds = [
  "sb-reading-20240927-red-publications-exhibit",
  "sb-reading-20240927-memorial-reading",
];

const gradeBands = ["grade-1-2", "grade-3-4", "grade-5-6"];
const expectedGradeCounts = {
  "grade-1-2": 25,
  "grade-3-4": 38,
  "grade-5-6": 47,
};
const categories = [
  "story",
  "red",
  "picture",
  "science",
  "classic",
  "featured",
];
const validStatuses = ["active", "paused"];
const errors = [];

function readJson(name) {
  const path = join(contentRoot, name);
  try {
    return JSON.parse(readFileSync(path, "utf8"));
  } catch (error) {
    errors.push(`${name} 无法解析：${error.message}`);
    return [];
  }
}

function checkNonEmptyString(value, label) {
  if (typeof value !== "string" || value.trim().length === 0) {
    errors.push(`${label} 必须是非空字符串`);
  }
}

function checkId(id, label, ids) {
  checkNonEmptyString(id, `${label}.id`);
  if (typeof id === "string" && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id)) {
    errors.push(`${label}.id 不是合法 kebab-case：${id}`);
  }
  if (ids.has(id)) {
    errors.push(`${label}.id 重复：${id}`);
  }
  ids.add(id);
}

function checkIsoDate(value, label) {
  const parsed = new Date(`${value}T00:00:00Z`);
  if (
    typeof value !== "string" ||
    !/^\d{4}-\d{2}-\d{2}$/.test(value) ||
    Number.isNaN(parsed.getTime()) ||
    parsed.toISOString().slice(0, 10) !== value
  ) {
    errors.push(`${label} 不是有效 ISO 日期：${value}`);
  }
}

function checkHttpsUrl(value, label, urls, allowReviewedDuplicate = false) {
  try {
    const url = new URL(value);
    if (url.protocol !== "https:") {
      errors.push(`${label} 必须使用 HTTPS：${value}`);
    }
  } catch {
    errors.push(`${label} 不是有效 URL：${value}`);
  }
  if (urls.has(value) && !allowReviewedDuplicate) {
    errors.push(`${label} 与其他内容重复：${value}`);
  }
  urls.add(value);
}

const books = readJson("reading-books.json");
const resources = readJson("reading-resources.json");
const activities = readJson("reading-activities.json");
const allIds = new Set();
const allExternalUrls = new Set();

if (!Array.isArray(books)) errors.push("reading-books.json 顶层必须是数组");
if (books.length !== 110) {
  errors.push(`书目总数应为 110，实际为 ${books.length}`);
}

for (const [index, book] of books.entries()) {
  const label = `书目第 ${index + 1} 条`;
  checkId(book.id, label, allIds);
  if (!gradeBands.includes(book.gradeBand)) {
    errors.push(`${label}.gradeBand 无效：${book.gradeBand}`);
  }
  if (!categories.includes(book.category)) {
    errors.push(`${label}.category 无效：${book.category}`);
  }
  if (!Number.isInteger(book.order) || book.order < 1) {
    errors.push(`${label}.order 必须是正整数`);
  }
  checkNonEmptyString(book.title, `${label}.title`);
  if (book.creditLine !== undefined) {
    checkNonEmptyString(book.creditLine, `${label}.creditLine`);
  }
  if (book.note !== undefined) {
    checkNonEmptyString(book.note, `${label}.note`);
  }
}

for (const gradeBand of gradeBands) {
  const gradeBooks = books.filter((book) => book.gradeBand === gradeBand);
  if (gradeBooks.length !== expectedGradeCounts[gradeBand]) {
    errors.push(
      `${gradeBand} 应有 ${expectedGradeCounts[gradeBand]} 条，实际为 ${gradeBooks.length}`,
    );
  }
  const orders = gradeBooks.map((book) => book.order).sort((a, b) => a - b);
  const expectedOrders = Array.from(
    { length: expectedGradeCounts[gradeBand] },
    (_, index) => index + 1,
  );
  if (orders.join(",") !== expectedOrders.join(",")) {
    errors.push(`${gradeBand} 的 order 必须从 1 连续排列`);
  }
}

if (!Array.isArray(resources)) {
  errors.push("reading-resources.json 顶层必须是数组");
} else if (resources.length < 8 || resources.length > 12) {
  errors.push(`阅读资源首发应为 8 至 12 条，实际为 ${resources.length}`);
}

for (const [index, resource] of resources.entries()) {
  const label = `阅读资源第 ${index + 1} 条`;
  checkId(resource.id, label, allIds);
  for (const field of ["name", "kind", "summary", "accessNote"]) {
    checkNonEmptyString(resource[field], `${label}.${field}`);
  }
  if (
    !Array.isArray(resource.serviceModes) ||
    resource.serviceModes.length === 0 ||
    resource.serviceModes.some(
      (mode) => typeof mode !== "string" || mode.trim().length === 0,
    )
  ) {
    errors.push(`${label}.serviceModes 必须是非空字符串数组`);
  }
  if (
    Array.isArray(resource.serviceModes) &&
    !resource.serviceModes.some((mode) => mode.startsWith("适合："))
  ) {
    errors.push(`${label}.serviceModes 必须明确适用对象`);
  }
  if (
    typeof resource.accessNote === "string" &&
    !resource.accessNote.startsWith("注册：")
  ) {
    errors.push(`${label}.accessNote 必须明确注册条件`);
  }
  checkHttpsUrl(resource.url, `${label}.url`, allExternalUrls);
  checkIsoDate(resource.lastCheckedOn, `${label}.lastCheckedOn`);
  if (!validStatuses.includes(resource.status)) {
    errors.push(`${label}.status 无效：${resource.status}`);
  }
}

if (!Array.isArray(activities)) {
  errors.push("reading-activities.json 顶层必须是数组");
} else if (activities.length < 6 || activities.length > 10) {
  errors.push(`阅读活动首发应为 6 至 10 条，实际为 ${activities.length}`);
}

for (const [index, activity] of activities.entries()) {
  const label = `阅读活动第 ${index + 1} 条`;
  checkId(activity.id, label, allIds);
  for (const field of ["title", "summary", "region", "sourceName"]) {
    checkNonEmptyString(activity[field], `${label}.${field}`);
  }
  checkIsoDate(activity.publishedOn, `${label}.publishedOn`);
  checkIsoDate(activity.lastCheckedOn, `${label}.lastCheckedOn`);
  const reviewedSharedSource =
    activity.sourceUrl === sharedActivitySourceUrl &&
    sharedActivitySourceIds.includes(activity.id);
  checkHttpsUrl(
    activity.sourceUrl,
    `${label}.sourceUrl`,
    allExternalUrls,
    reviewedSharedSource,
  );
  if (!validStatuses.includes(activity.status)) {
    errors.push(`${label}.status 无效：${activity.status}`);
  }
}

const actualSharedSourceIds = activities
  .filter((activity) => activity.sourceUrl === sharedActivitySourceUrl)
  .map((activity) => activity.id)
  .sort();
if (
  actualSharedSourceIds.join(",") !== [...sharedActivitySourceIds].sort().join(",")
) {
  errors.push("活动同源例外必须严格对应已审查的两项 2024 年图书馆活动");
}

if (!existsSync(pdfPath)) {
  errors.push("公开下载 PDF 不存在");
} else if (statSync(pdfPath).size === 0) {
  errors.push("公开下载 PDF 为空文件");
}

if (!existsSync(previewPath)) {
  errors.push("书单首页 WebP 预览不存在");
} else if (statSync(previewPath).size === 0) {
  errors.push("书单首页 WebP 预览为空文件");
}

if (errors.length > 0) {
  console.error("阅读内容校验失败：");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(
  `阅读内容校验通过：${books.length} 条书目，${resources.length} 条资源，${activities.length} 条活动。`,
);
