import { createHash } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const EXPECTED_IMAGE_COUNTS = Object.freeze([9, 8, 10, 9, 11, 8, 7, 8]);
const EXPECTED_DIARY_COUNT = EXPECTED_IMAGE_COUNTS.length;
const EXPECTED_IMAGE_COUNT = EXPECTED_IMAGE_COUNTS.reduce(
  (sum, count) => sum + count,
  0,
);
const DIARY_SUMMARIES = Object.freeze([
  "跨越千里抵达双柏，从开营致辞、自我介绍到破冰游戏与班级公约，师生在第一天由陌生走向熟悉。",
  "非遗风筝、AI科普、钢琴与名著阅读依次走进课堂，第一天正式课程在好奇、糖果与双向温暖中展开。",
  "诗歌、仿蜡染、普法、树叶拼贴与成长记录卡，让孩子们在文学、艺术和法律的边界里自由探索。",
  "合唱、魔方、速叠杯与趣味运动会装满一天，孩子们的歌声、专注与奔跑把支教日常变成鲜活的快乐。",
  "民族文化、科学实验、南大校史与绘本制作连接山野和远方，孩子们在好奇与互助中看见更大的世界。",
  "笔墨、情绪表达与电影光影组成三门特色课，在传统文化、温柔陪伴和远方梦想之间点亮夏日。",
  "志愿者分组走进孩子们家中调研阅读情况，从一本本热爱的书里看见青山之外辽阔的精神世界。",
  "结营寄语、纪念视频、奖状与拥抱把一周旅程定格，告别不是终点，山与山会在更远的路上相逢。",
]);
const THUMB_MAX_EDGE = 640;
const MAX_DOWNLOAD_BYTES = 50 * 1024 * 1024;
const DOWNLOAD_CONCURRENCY = 4;
const CHECK_CONCURRENCY = 8;
const SHA256_PATTERN = /^[a-f0-9]{64}$/;
const NOTE_ID_PATTERN = /^[a-f0-9]{24}$/;
const DAY_SLUG_PATTERN = /^day-(0[1-8])$/;
const IMAGE_ID_PATTERN = /^day-(0[1-8])-(0[1-9]|1[01])$/;
const RETAINED_WEBP_CHUNKS = new Set([
  "VP8X",
  "VP8 ",
  "VP8L",
  "ALPH",
  "ICCP",
  "ANIM",
  "ANMF",
]);
const IMAGE_PAYLOAD_CHUNKS = new Set([
  "VP8 ",
  "VP8L",
  "ALPH",
  "ANIM",
  "ANMF",
]);
const FORBIDDEN_REPOSITORY_FRAGMENTS = [
  ["xhs", "cdn"].join(""),
  ["sns", "-webpic"].join(""),
  ["xs", "ec"].join(""),
  ["share", "RedId"].join(""),
  ["share", "_id="].join(""),
  ["share", "_channel="].join(""),
  ["share", "_from_user_hidden"].join(""),
  ["author", "_share="].join(""),
  ["app", "_platform="].join(""),
  ["app", "_version="].join(""),
  ["app", "time="].join(""),
  ["xhs", "share"].join(""),
  ["wechat", "Wid"].join(""),
  ["wechat", "Origin"].join(""),
];
const SKIPPED_REPOSITORY_DIRECTORIES = new Set([
  ".git",
  ".next",
  ".turbo",
  "build",
  "coverage",
  "node_modules",
  "out",
]);
const REPOSITORY_TEXT_EXTENSIONS = new Set([
  "",
  ".css",
  ".html",
  ".js",
  ".json",
  ".jsx",
  ".md",
  ".mjs",
  ".mts",
  ".svg",
  ".ts",
  ".tsx",
  ".txt",
  ".xml",
  ".yaml",
  ".yml",
]);

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(SCRIPT_DIR, "..");
const CAPTURE_PATHS = [
  path.resolve(REPO_ROOT, "..", "team-diary-capture-day01-03.json"),
  path.resolve(REPO_ROOT, "..", "team-diary-capture-day04-06.json"),
  path.resolve(REPO_ROOT, "..", "team-diary-capture-day07-08.json"),
];
const TEMPORARY_SOURCE_ROOTS = Object.freeze([
  {
    firstDay: 1,
    lastDay: 3,
    root: path.resolve(REPO_ROOT, "..", ".tmp-team-diary-day01-03"),
  },
  {
    firstDay: 4,
    lastDay: 6,
    root: path.resolve(REPO_ROOT, "..", ".tmp-team-diary-day04-06"),
  },
  {
    firstDay: 7,
    lastDay: 8,
    root: path.resolve(REPO_ROOT, "..", ".tmp-team-diary-day07-08"),
  },
]);
const OUTPUT_ROOT = path.join(REPO_ROOT, "src", "assets", "team-diaries");
const MANIFEST_PATH = path.join(SCRIPT_DIR, "team-diaries-manifest.json");
const REGISTRY_PATH = path.join(
  REPO_ROOT,
  "src",
  "content",
  "team-diary-assets.generated.ts",
);
const CONTENT_PATH = path.join(REPO_ROOT, "src", "content", "team-diaries.json");
const BUILD_OUTPUT_ROOT = path.join(REPO_ROOT, "out");
const RUN_ID = `${process.pid}-${Date.now()}`;

sharp.cache({ files: 0, items: 64, memory: 64 });

function fail(message) {
  throw new Error(message);
}

function isRecord(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function requireString(value, label) {
  if (typeof value !== "string" || value.trim() === "") {
    fail(`${label} must be a non-empty string`);
  }
  return value;
}

function optionalString(value, label) {
  if (value === undefined || value === null || value === "") return null;
  if (typeof value !== "string") fail(`${label} must be a string or null`);
  return value;
}

function requirePositiveInteger(value, label) {
  if (!Number.isInteger(value) || value <= 0) {
    fail(`${label} must be a positive integer`);
  }
  return value;
}

function relativeFromRepo(target) {
  return path.relative(REPO_ROOT, target).split(path.sep).join("/");
}

function normalizeForComparison(value) {
  const resolved = path.resolve(value);
  return process.platform === "win32" ? resolved.toLowerCase() : resolved;
}

function assertPathInside(root, target, label) {
  const relative = path.relative(root, target);
  if (relative === "" || (!relative.startsWith("..") && !path.isAbsolute(relative))) {
    return;
  }
  fail(`${label} resolves outside ${root}: ${target}`);
}

function daySlug(dayNumber) {
  return `day-${String(dayNumber).padStart(2, "0")}`;
}

function imageId(dayNumber, order) {
  return `${daySlug(dayNumber)}-${String(order).padStart(2, "0")}`;
}

function sha256(buffer) {
  return createHash("sha256").update(buffer).digest("hex");
}

function firstDefined(...values) {
  return values.find((value) => value !== undefined && value !== null);
}

function requireTimestamp(value, fallbackEpochMs, label) {
  if (typeof value === "string" && Number.isFinite(Date.parse(value))) {
    return value;
  }
  if (Number.isFinite(fallbackEpochMs)) {
    return new Date(fallbackEpochMs).toISOString();
  }
  fail(`${label} must be an ISO date string or have a valid epoch fallback`);
}

function requireStringArray(value, label) {
  if (!Array.isArray(value)) fail(`${label} must be an array`);
  const strings = value.map((item, index) =>
    requireString(item, `${label}[${index}]`),
  );
  if (new Set(strings).size !== strings.length) {
    fail(`${label} must not contain duplicates`);
  }
  return Object.freeze(strings);
}

function unwrapCapture(raw, capturePath) {
  if (Array.isArray(raw)) return raw;
  if (!isRecord(raw)) fail(`${capturePath} must contain an object or array`);
  for (const key of ["notes", "diaries", "entries", "records", "items"]) {
    if (Array.isArray(raw[key])) return raw[key];
  }
  fail(`${capturePath} must contain a notes array (or a supported equivalent)`);
}

function canonicalNoteUrl(value, noteId, label) {
  const rawUrl = requireString(value, label);
  let parsed;
  try {
    parsed = new URL(rawUrl);
  } catch {
    fail(`${label} must be an absolute URL`);
  }
  if (
    parsed.protocol !== "https:" ||
    parsed.hostname !== "www.xiaohongshu.com" ||
    parsed.pathname !== `/explore/${noteId}` ||
    parsed.search !== "" ||
    parsed.hash !== ""
  ) {
    fail(`${label} must be the query-free canonical note URL for ${noteId}`);
  }
  return parsed.href;
}

function normalizeCaptureImage(rawImage, index, note, label) {
  if (!isRecord(rawImage)) fail(`${label} must be an object`);
  const order = firstDefined(rawImage.order, index + 1);
  requirePositiveInteger(order, `${label}.order`);
  if (order !== index + 1) {
    fail(`${label}.order must be ${index + 1}; capture array order cannot drift`);
  }

  const expectedId = imageId(note.dayNumber, order);
  const declaredId = firstDefined(rawImage.id, rawImage.imageId, expectedId);
  if (declaredId !== expectedId) {
    fail(`${label}.id must be ${expectedId}`);
  }

  const sourceWidth = requirePositiveInteger(
    firstDefined(rawImage.sourceWidth, rawImage.width),
    `${label}.sourceWidth`,
  );
  const sourceHeight = requirePositiveInteger(
    firstDefined(rawImage.sourceHeight, rawImage.height),
    `${label}.sourceHeight`,
  );
  const sourceFileId = optionalString(
    firstDefined(rawImage.fileId, rawImage.sourceFileId),
    `${label}.fileId`,
  );
  const downloadUrl = requireString(
    firstDefined(rawImage.cdnUrl, rawImage.url, rawImage.urlDefault),
    `${label}.cdnUrl`,
  );
  let parsedDownloadUrl;
  try {
    parsedDownloadUrl = new URL(downloadUrl);
  } catch {
    fail(`${label}.cdnUrl must be an absolute URL`);
  }
  const expectedHostSuffix = `.${["xhs", "cdn"].join("")}.com`;
  if (
    parsedDownloadUrl.protocol !== "https:" ||
    !parsedDownloadUrl.hostname.endsWith(expectedHostSuffix)
  ) {
    fail(`${label}.cdnUrl must be an HTTPS image host URL from the captured page`);
  }

  const outputDirectory = path.join(OUTPUT_ROOT, note.slug);
  const fullPath = path.join(outputDirectory, `${expectedId}.webp`);
  const thumbnailPath = path.join(outputDirectory, `${expectedId}-thumb.webp`);
  assertPathInside(OUTPUT_ROOT, fullPath, `${label} full output`);
  assertPathInside(OUTPUT_ROOT, thumbnailPath, `${label} thumbnail output`);

  return Object.freeze({
    id: expectedId,
    dayNumber: note.dayNumber,
    diarySlug: note.slug,
    order,
    sourceFileId,
    sourceWidth,
    sourceHeight,
    alt: requireString(rawImage.alt, `${label}.alt`),
    downloadUrl: parsedDownloadUrl.href,
    fullPath,
    thumbnailPath,
  });
}

function normalizeCaptureNote(rawNote, index, capturePath) {
  const label = `${path.basename(capturePath)} note[${index}]`;
  if (!isRecord(rawNote)) fail(`${label} must be an object`);
  const dayNumber = requirePositiveInteger(
    firstDefined(rawNote.day, rawNote.dayNumber),
    `${label}.dayNumber`,
  );
  if (dayNumber > EXPECTED_DIARY_COUNT) {
    fail(`${label}.dayNumber must be between 1 and ${EXPECTED_DIARY_COUNT}`);
  }
  const slug = daySlug(dayNumber);
  if (rawNote.slug !== undefined && rawNote.slug !== slug) {
    fail(`${label}.slug must be ${slug}`);
  }
  const noteId = requireString(rawNote.noteId, `${label}.noteId`);
  if (!NOTE_ID_PATTERN.test(noteId)) fail(`${label}.noteId has an invalid format`);

  const note = {
    dayNumber,
    slug,
    noteId,
    title: requireString(rawNote.title, `${label}.title`),
    author: requireString(rawNote.author, `${label}.author`),
    body: requireString(rawNote.body, `${label}.body`).replaceAll(
      "[举手R]",
      "🙋",
    ),
    tags: requireStringArray(
      firstDefined(rawNote.hashtags, rawNote.tags),
      `${label}.hashtags`,
    ),
    publishedOn: requireTimestamp(
      firstDefined(rawNote.publishedAt, rawNote.publishedOn),
      rawNote.publishedAtEpochMs,
      `${label}.publishedAt`,
    ),
    updatedOn: requireTimestamp(
      firstDefined(rawNote.updatedAt, rawNote.updatedOn, rawNote.publishedAt),
      firstDefined(rawNote.updatedAtEpochMs, rawNote.publishedAtEpochMs),
      `${label}.updatedAt`,
    ),
    canonicalUrl: canonicalNoteUrl(
      firstDefined(rawNote.canonicalUrl, rawNote.sourceUrl),
      noteId,
      `${label}.canonicalUrl`,
    ),
    rawDescription: optionalString(
      firstDefined(rawNote.rawDescription, rawNote.rawDesc),
      `${label}.rawDescription`,
    ),
    location: optionalString(
      firstDefined(
        rawNote.displayedLocation,
        rawNote.location,
        isRecord(rawNote.pageDisplay) ? rawNote.pageDisplay.location : undefined,
      ),
      `${label}.location`,
    ),
  };
  if (note.author !== "NJU 云启青禾") {
    fail(`${label}.author must be NJU 云启青禾`);
  }
  if (Date.parse(note.updatedOn) < Date.parse(note.publishedOn)) {
    fail(`${label}.updatedAt must not precede publishedAt`);
  }
  if (!Array.isArray(rawNote.images)) fail(`${label}.images must be an array`);
  note.images = rawNote.images.map((image, imageIndex) =>
    normalizeCaptureImage(image, imageIndex, note, `${label}.images[${imageIndex}]`),
  );
  return Object.freeze(note);
}

function assertUnique(items, label, getValue) {
  const seen = new Map();
  for (const [index, item] of items.entries()) {
    const value = getValue(item);
    if (seen.has(value)) {
      fail(`${label} is duplicated at indexes ${seen.get(value)} and ${index}: ${value}`);
    }
    seen.set(value, index);
  }
}

function validateNormalizedCaptures(notes) {
  if (notes.length !== EXPECTED_DIARY_COUNT) {
    fail(`captures must contain exactly ${EXPECTED_DIARY_COUNT} notes; found ${notes.length}`);
  }
  notes.sort((left, right) => left.dayNumber - right.dayNumber);
  for (const [index, note] of notes.entries()) {
    const expectedDay = index + 1;
    if (note.dayNumber !== expectedDay) {
      fail(`capture day sequence must be 1..8; expected day ${expectedDay}`);
    }
    const expectedCount = EXPECTED_IMAGE_COUNTS[index];
    if (note.images.length !== expectedCount) {
      fail(`${note.slug} must contain ${expectedCount} images; found ${note.images.length}`);
    }
  }
  const images = notes.flatMap((note) => note.images);
  if (images.length !== EXPECTED_IMAGE_COUNT) {
    fail(`captures must contain exactly ${EXPECTED_IMAGE_COUNT} images`);
  }
  assertUnique(notes, "noteId", (note) => note.noteId);
  assertUnique(notes, "diary slug", (note) => note.slug);
  assertUnique(images, "image id", (image) => image.id);
  assertUnique(images, "source file id", (image) => image.sourceFileId ?? image.id);
  assertUnique(images, "download URL", (image) => image.downloadUrl);
  return Object.freeze({
    notes: Object.freeze(notes),
    images: Object.freeze(images),
  });
}

async function readCaptures() {
  const notes = [];
  for (const capturePath of CAPTURE_PATHS) {
    let raw;
    try {
      raw = JSON.parse(await fs.readFile(capturePath, "utf8"));
    } catch (error) {
      fail(`Unable to read capture ${capturePath}: ${error.message}`);
    }
    notes.push(
      ...unwrapCapture(raw, capturePath).map((note, index) =>
        normalizeCaptureNote(note, index, capturePath),
      ),
    );
  }
  return validateNormalizedCaptures(notes);
}

function parseWebpContainer(buffer, label) {
  if (!Buffer.isBuffer(buffer) || buffer.length < 12) {
    fail(`${label} is too small to be a WebP RIFF container`);
  }
  if (
    buffer.toString("ascii", 0, 4) !== "RIFF" ||
    buffer.toString("ascii", 8, 12) !== "WEBP"
  ) {
    fail(`${label} is not a WebP RIFF container`);
  }
  const declaredLength = buffer.readUInt32LE(4) + 8;
  if (declaredLength !== buffer.length) {
    fail(
      `${label} RIFF size is ${declaredLength} bytes but the file is ${buffer.length} bytes`,
    );
  }

  const chunks = [];
  let offset = 12;
  while (offset < buffer.length) {
    if (offset + 8 > buffer.length) {
      fail(`${label} has a truncated WebP chunk header`);
    }
    const type = buffer.toString("ascii", offset, offset + 4);
    const size = buffer.readUInt32LE(offset + 4);
    const paddedSize = size + (size % 2);
    const end = offset + 8 + paddedSize;
    if (end > buffer.length) {
      fail(`${label} has a truncated ${JSON.stringify(type)} WebP chunk`);
    }
    chunks.push(
      Object.freeze({
        type,
        size,
        raw: buffer.subarray(offset, end),
      }),
    );
    offset = end;
  }
  return chunks;
}

function imagePayloadSha256(chunks, label) {
  const imageChunks = chunks.filter((chunk) =>
    IMAGE_PAYLOAD_CHUNKS.has(chunk.type),
  );
  if (
    !imageChunks.some(
      (chunk) =>
        chunk.type === "VP8 " ||
        chunk.type === "VP8L" ||
        chunk.type === "ANMF",
    )
  ) {
    fail(`${label} has no compressed WebP image payload chunk`);
  }
  const hash = createHash("sha256");
  for (const chunk of imageChunks) hash.update(chunk.raw);
  return hash.digest("hex");
}

function sanitizeWebpContainer(sourceBuffer, label) {
  const chunks = parseWebpContainer(sourceBuffer, label);
  const payloadSha256 = imagePayloadSha256(chunks, label);
  const retained = [];
  for (const chunk of chunks) {
    if (!RETAINED_WEBP_CHUNKS.has(chunk.type)) continue;
    if (chunk.type !== "VP8X") {
      retained.push(chunk.raw);
      continue;
    }
    if (chunk.size < 10) fail(`${label} has an invalid VP8X chunk`);
    const sanitizedVp8x = Buffer.from(chunk.raw);
    sanitizedVp8x[8] &= ~0x0c;
    retained.push(sanitizedVp8x);
  }

  const header = Buffer.from(sourceBuffer.subarray(0, 12));
  const sanitized = Buffer.concat([header, ...retained]);
  sanitized.writeUInt32LE(sanitized.length - 8, 4);
  const sanitizedChunks = parseWebpContainer(sanitized, `${label} sanitized output`);
  if (imagePayloadSha256(sanitizedChunks, `${label} sanitized output`) !== payloadSha256) {
    fail(`${label} image payload changed while removing metadata chunks`);
  }
  return Object.freeze({
    buffer: sanitized,
    sourceResponseSha256: sha256(sourceBuffer),
    imagePayloadSha256: payloadSha256,
  });
}

function hasSensitiveMetadata(metadata) {
  return Boolean(
    metadata.exif ||
      metadata.xmp ||
      metadata.iptc ||
      metadata.tifftagPhotoshop ||
      metadata.orientation,
  );
}

function assertNoSensitiveMetadata(metadata, label) {
  if (hasSensitiveMetadata(metadata)) {
    fail(`${label} contains EXIF, XMP, IPTC, orientation, or Photoshop metadata`);
  }
}

function assertWebpMetadata(metadata, label) {
  if (metadata.format !== "webp") fail(`${label} must be WebP`);
  if (!metadata.width || !metadata.height) fail(`${label} has no dimensions`);
  assertNoSensitiveMetadata(metadata, label);
}

function assertCapturedAspectRatio(image, metadata) {
  const capturedRatio = image.sourceWidth / image.sourceHeight;
  const downloadedRatio = metadata.width / metadata.height;
  const relativeDifference = Math.abs(capturedRatio - downloadedRatio) / capturedRatio;
  if (relativeDifference > 0.01) {
    fail(
      `${image.id} downloaded aspect ratio ${metadata.width}x${metadata.height} does not match captured source dimensions ${image.sourceWidth}x${image.sourceHeight}`,
    );
  }
  if (
    metadata.width > image.sourceWidth ||
    metadata.height > image.sourceHeight
  ) {
    fail(
      `${image.id} downloaded dimensions ${metadata.width}x${metadata.height} exceed captured source dimensions ${image.sourceWidth}x${image.sourceHeight}`,
    );
  }
}

function temporaryPathFor(outputPath) {
  return `${outputPath}.tmp-${RUN_ID}`;
}

async function replaceFile(temporaryPath, outputPath) {
  try {
    await fs.rename(temporaryPath, outputPath);
  } catch (error) {
    if (error.code !== "EEXIST" && error.code !== "EPERM") throw error;
    await fs.rm(outputPath, { force: true });
    await fs.rename(temporaryPath, outputPath);
  }
}

async function writeBufferToTemporaryFile(outputPath, contents) {
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  const temporaryPath = temporaryPathFor(outputPath);
  await fs.rm(temporaryPath, { force: true });
  await fs.writeFile(temporaryPath, contents);
  return temporaryPath;
}

async function writeTextAtomically(outputPath, contents) {
  const temporaryPath = await writeBufferToTemporaryFile(
    outputPath,
    Buffer.from(contents, "utf8"),
  );
  try {
    await replaceFile(temporaryPath, outputPath);
  } finally {
    await fs.rm(temporaryPath, { force: true });
  }
}

async function delay(milliseconds) {
  await new Promise((resolve) => setTimeout(resolve, milliseconds));
}

function temporarySourcePath(image) {
  const sourceRoot = TEMPORARY_SOURCE_ROOTS.find(
    ({ firstDay, lastDay }) =>
      image.dayNumber >= firstDay && image.dayNumber <= lastDay,
  );
  if (!sourceRoot) fail(`No temporary source root is configured for ${image.id}`);
  return path.join(
    sourceRoot.root,
    `day${String(image.dayNumber).padStart(2, "0")}-${String(image.order).padStart(2, "0")}.webp`,
  );
}

async function readTemporarySource(image) {
  const sourcePath = temporarySourcePath(image);
  let buffer;
  try {
    buffer = await fs.readFile(sourcePath);
  } catch (error) {
    if (error.code === "ENOENT") return null;
    fail(`${image.id} temporary source could not be read: ${error.message}`);
  }
  if (buffer.length === 0 || buffer.length > MAX_DOWNLOAD_BYTES) {
    fail(`${image.id} temporary source has an invalid size of ${buffer.length} bytes`);
  }
  return buffer;
}

async function checkTemporarySourceTraceability(image) {
  const sourceBuffer = await readTemporarySource(image);
  if (!sourceBuffer) return;
  if (sha256(sourceBuffer) !== image.sourceResponseSha256) {
    fail(`${image.id} temporary source response SHA-256 changed`);
  }
  const sanitized = sanitizeWebpContainer(
    sourceBuffer,
    `${image.id} temporary source response`,
  );
  if (sanitized.imagePayloadSha256 !== image.imagePayloadSha256) {
    fail(`${image.id} temporary source image payload SHA-256 changed`);
  }
  if (sha256(sanitized.buffer) !== image.fullSha256) {
    fail(`${image.id} committed full image is not the sanitized source response`);
  }
}

async function downloadImage(image) {
  let lastError;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const response = await fetch(image.downloadUrl, {
        redirect: "follow",
        signal: AbortSignal.timeout(45_000),
        headers: {
          accept: "image/webp,image/*;q=0.9,*/*;q=0.8",
          referer: "https://www.xiaohongshu.com/",
          "user-agent": "Mozilla/5.0 team-diary-static-asset-pipeline",
        },
      });
      if (!response.ok) {
        fail(`${image.id} download returned HTTP ${response.status}`);
      }
      const declaredLength = Number(response.headers.get("content-length"));
      if (Number.isFinite(declaredLength) && declaredLength > MAX_DOWNLOAD_BYTES) {
        fail(`${image.id} exceeds the ${MAX_DOWNLOAD_BYTES} byte download limit`);
      }
      const buffer = Buffer.from(await response.arrayBuffer());
      if (buffer.length === 0 || buffer.length > MAX_DOWNLOAD_BYTES) {
        fail(`${image.id} has an invalid downloaded size of ${buffer.length} bytes`);
      }
      return buffer;
    } catch (error) {
      lastError = error;
      if (attempt < 3) await delay(250 * attempt);
    }
  }
  fail(`${image.id} could not be downloaded after 3 attempts: ${lastError.message}`);
}

async function sourceImageBuffer(image) {
  return (await readTemporarySource(image)) ?? downloadImage(image);
}

async function prepareImage(image) {
  const sourceResponseBuffer = await sourceImageBuffer(image);
  const sanitizedSource = sanitizeWebpContainer(
    sourceResponseBuffer,
    `${image.id} source response`,
  );
  const fullBuffer = sanitizedSource.buffer;
  const fullMetadata = await sharp(fullBuffer, { failOn: "error" }).metadata();
  assertWebpMetadata(fullMetadata, `${image.id} downloaded full image`);
  assertCapturedAspectRatio(image, fullMetadata);

  const thumbnailBuffer = await sharp(fullBuffer, { failOn: "error" })
    .resize({
      width: THUMB_MAX_EDGE,
      height: THUMB_MAX_EDGE,
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({ effort: 5, quality: 84, smartSubsample: true })
    .toBuffer();
  const thumbnailMetadata = await sharp(thumbnailBuffer, {
    failOn: "error",
  }).metadata();
  assertWebpMetadata(thumbnailMetadata, `${image.id} thumbnail`);
  const expectedLongestEdge = Math.min(
    THUMB_MAX_EDGE,
    Math.max(fullMetadata.width, fullMetadata.height),
  );
  if (
    Math.abs(
      Math.max(thumbnailMetadata.width, thumbnailMetadata.height) -
        expectedLongestEdge,
    ) > 1
  ) {
    fail(`${image.id} thumbnail does not have the expected longest edge`);
  }

  let fullTemporaryPath;
  let thumbnailTemporaryPath;
  try {
    fullTemporaryPath = await writeBufferToTemporaryFile(
      image.fullPath,
      fullBuffer,
    );
    thumbnailTemporaryPath = await writeBufferToTemporaryFile(
      image.thumbnailPath,
      thumbnailBuffer,
    );
  } catch (error) {
    await Promise.all(
      [fullTemporaryPath, thumbnailTemporaryPath]
        .filter(Boolean)
        .map((temporaryPath) => fs.rm(temporaryPath, { force: true })),
    );
    throw error;
  }

  return Object.freeze({
    ...image,
    fullTemporaryPath,
    thumbnailTemporaryPath,
    fullWidth: fullMetadata.width,
    fullHeight: fullMetadata.height,
    thumbnailWidth: thumbnailMetadata.width,
    thumbnailHeight: thumbnailMetadata.height,
    sourceResponseSha256: sanitizedSource.sourceResponseSha256,
    imagePayloadSha256: sanitizedSource.imagePayloadSha256,
    fullSha256: sha256(fullBuffer),
    thumbnailSha256: sha256(thumbnailBuffer),
  });
}

async function cleanupTemporaryFiles(preparedImages) {
  await Promise.all(
    preparedImages.flatMap((image) =>
      [image.fullTemporaryPath, image.thumbnailTemporaryPath]
        .filter(Boolean)
        .map((temporaryPath) => fs.rm(temporaryPath, { force: true })),
    ),
  );
}

async function promotePreparedImages(preparedImages) {
  for (const image of preparedImages) {
    await replaceFile(image.fullTemporaryPath, image.fullPath);
    await replaceFile(image.thumbnailTemporaryPath, image.thumbnailPath);
  }
}

async function mapWithConcurrency(items, concurrency, operation) {
  const results = new Array(items.length);
  let nextIndex = 0;
  async function worker() {
    while (nextIndex < items.length) {
      const index = nextIndex;
      nextIndex += 1;
      results[index] = await operation(items[index], index, items.length);
    }
  }
  const workerResults = await Promise.allSettled(
    Array.from({ length: Math.min(concurrency, items.length) }, () => worker()),
  );
  const failure = workerResults.find((result) => result.status === "rejected");
  if (failure?.status === "rejected") throw failure.reason;
  return results;
}

function contentFromCaptures(captures) {
  return captures.notes.map((note) => {
    const hasMeaningfulUpdate =
      Date.parse(note.updatedOn) - Date.parse(note.publishedOn) > 60_000;
    return {
      slug: note.slug,
      dayNumber: note.dayNumber,
      publishedOn: note.publishedOn,
      ...(hasMeaningfulUpdate ? { updatedOn: note.updatedOn } : {}),
      ...(note.location ? { location: note.location } : {}),
      author: note.author,
      title: note.title,
      summary: DIARY_SUMMARIES[note.dayNumber - 1],
      markdown: note.body,
      tags: [...note.tags],
      sourceUrl: note.canonicalUrl,
      images: note.images.map((image) => ({ id: image.id, alt: image.alt })),
    };
  });
}

function manifestFromCaptures(captures, preparedImages, contentSha256) {
  const preparedById = new Map(preparedImages.map((image) => [image.id, image]));
  return {
    version: 1,
    diaryCount: EXPECTED_DIARY_COUNT,
    imageCount: EXPECTED_IMAGE_COUNT,
    thumbnailMaxEdge: THUMB_MAX_EDGE,
    contentSha256,
    diaries: captures.notes.map((note) => ({
      slug: note.slug,
      dayNumber: note.dayNumber,
      noteId: note.noteId,
      canonicalUrl: note.canonicalUrl,
      imageCount: note.images.length,
    })),
    images: captures.images.map((image) => {
      const prepared = preparedById.get(image.id);
      if (!prepared) fail(`prepared image is missing for ${image.id}`);
      return {
        id: image.id,
        diarySlug: image.diarySlug,
        dayNumber: image.dayNumber,
        order: image.order,
        sourceFileId: image.sourceFileId,
        sourceWidth: image.sourceWidth,
        sourceHeight: image.sourceHeight,
        fullWidth: prepared.fullWidth,
        fullHeight: prepared.fullHeight,
        thumbnailWidth: prepared.thumbnailWidth,
        thumbnailHeight: prepared.thumbnailHeight,
        fullPath: relativeFromRepo(image.fullPath),
        thumbnailPath: relativeFromRepo(image.thumbnailPath),
        sourceResponseSha256: prepared.sourceResponseSha256,
        imagePayloadSha256: prepared.imagePayloadSha256,
        fullSha256: prepared.fullSha256,
        thumbnailSha256: prepared.thumbnailSha256,
        alt: image.alt,
      };
    }),
  };
}

function registrySource(images) {
  const imports = [];
  const records = [];
  const ids = [];
  for (const [index, image] of images.entries()) {
    const importStem = `teamDiaryAsset${String(index + 1).padStart(2, "0")}`;
    imports.push(
      `import ${importStem}Full from ${JSON.stringify(`@/${image.fullPath.replace(/^src\//, "")}`)};`,
    );
    imports.push(
      `import ${importStem}Thumbnail from ${JSON.stringify(`@/${image.thumbnailPath.replace(/^src\//, "")}`)};`,
    );
    records.push(
      `  ${JSON.stringify(image.id)}: { full: ${importStem}Full, thumbnail: ${importStem}Thumbnail },`,
    );
    ids.push(JSON.stringify(image.id));
  }
  return [
    "// Generated by scripts/process-team-diaries.mjs. Do not edit by hand.",
    'import type { StaticImageData } from "next/image";',
    "",
    ...imports,
    "",
    `export type TeamDiaryImageId = ${ids.join(" | ")};`,
    "",
    "export interface TeamDiaryImageAsset {",
    "  readonly full: StaticImageData;",
    "  readonly thumbnail: StaticImageData;",
    "}",
    "",
    "export const teamDiaryImageAssets = {",
    ...records,
    "} as const satisfies Record<TeamDiaryImageId, TeamDiaryImageAsset>;",
    "",
  ].join("\n");
}

function assertGeneratedTextIsPrivateSafe(contents, label) {
  const lower = contents.toLowerCase();
  for (const fragment of FORBIDDEN_REPOSITORY_FRAGMENTS) {
    if (lower.includes(fragment.toLowerCase())) {
      fail(`${label} contains a forbidden captured-share fragment`);
    }
  }
  if (/\bcdnUrl\b/i.test(contents) || /token/i.test(contents)) {
    fail(`${label} must not contain download URLs or tokens`);
  }
}

async function walkFiles(root, skippedDirectoryNames = new Set()) {
  const files = [];
  async function visit(directory) {
    const entries = await fs.readdir(directory, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory() && skippedDirectoryNames.has(entry.name)) continue;
      const entryPath = path.join(directory, entry.name);
      if (entry.isDirectory()) {
        await visit(entryPath);
      } else if (entry.isFile()) {
        files.push(entryPath);
      }
    }
  }
  try {
    await visit(root);
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
  return files;
}

async function outputFiles() {
  return walkFiles(OUTPUT_ROOT);
}

async function removeOrphanOutputs(images) {
  const expected = new Set(
    images
      .flatMap((image) => [image.fullPath, image.thumbnailPath])
      .map(normalizeForComparison),
  );
  for (const file of await outputFiles()) {
    assertPathInside(OUTPUT_ROOT, file, "generated team diary output");
    if (!expected.has(normalizeForComparison(file))) await fs.rm(file);
  }
}

function validateManifestImage(rawImage, index) {
  const label = `manifest.images[${index}]`;
  if (!isRecord(rawImage)) fail(`${label} must be an object`);
  const dayNumber = requirePositiveInteger(rawImage.dayNumber, `${label}.dayNumber`);
  const order = requirePositiveInteger(rawImage.order, `${label}.order`);
  const expectedSlug = daySlug(dayNumber);
  const expectedId = imageId(dayNumber, order);
  if (rawImage.diarySlug !== expectedSlug || !DAY_SLUG_PATTERN.test(rawImage.diarySlug)) {
    fail(`${label}.diarySlug must be ${expectedSlug}`);
  }
  if (rawImage.id !== expectedId || !IMAGE_ID_PATTERN.test(rawImage.id)) {
    fail(`${label}.id must be ${expectedId}`);
  }
  for (const key of [
    "sourceWidth",
    "sourceHeight",
    "fullWidth",
    "fullHeight",
    "thumbnailWidth",
    "thumbnailHeight",
  ]) {
    requirePositiveInteger(rawImage[key], `${label}.${key}`);
  }
  for (const key of [
    "sourceResponseSha256",
    "imagePayloadSha256",
    "fullSha256",
    "thumbnailSha256",
  ]) {
    if (typeof rawImage[key] !== "string" || !SHA256_PATTERN.test(rawImage[key])) {
      fail(`${label}.${key} must be a lowercase SHA-256 digest`);
    }
  }
  requireString(rawImage.alt, `${label}.alt`);
  optionalString(rawImage.sourceFileId, `${label}.sourceFileId`);

  const expectedFullRelativePath = `src/assets/team-diaries/${expectedSlug}/${expectedId}.webp`;
  const expectedThumbnailRelativePath = `src/assets/team-diaries/${expectedSlug}/${expectedId}-thumb.webp`;
  if (rawImage.fullPath !== expectedFullRelativePath) {
    fail(`${label}.fullPath must be ${expectedFullRelativePath}`);
  }
  if (rawImage.thumbnailPath !== expectedThumbnailRelativePath) {
    fail(`${label}.thumbnailPath must be ${expectedThumbnailRelativePath}`);
  }
  const fullPath = path.resolve(REPO_ROOT, rawImage.fullPath);
  const thumbnailPath = path.resolve(REPO_ROOT, rawImage.thumbnailPath);
  assertPathInside(OUTPUT_ROOT, fullPath, `${label}.fullPath`);
  assertPathInside(OUTPUT_ROOT, thumbnailPath, `${label}.thumbnailPath`);

  return Object.freeze({ ...rawImage, fullPath, thumbnailPath });
}

function validateManifest(raw) {
  if (!isRecord(raw) || raw.version !== 1) {
    fail("team-diaries-manifest.json must use version 1");
  }
  if (
    raw.diaryCount !== EXPECTED_DIARY_COUNT ||
    raw.imageCount !== EXPECTED_IMAGE_COUNT ||
    raw.thumbnailMaxEdge !== THUMB_MAX_EDGE
  ) {
    fail("manifest counts or thumbnailMaxEdge do not match the fixed publication contract");
  }
  if (
    typeof raw.contentSha256 !== "string" ||
    !SHA256_PATTERN.test(raw.contentSha256)
  ) {
    fail("manifest.contentSha256 must be a lowercase SHA-256 digest");
  }
  if (!Array.isArray(raw.diaries) || raw.diaries.length !== EXPECTED_DIARY_COUNT) {
    fail(`manifest.diaries must contain exactly ${EXPECTED_DIARY_COUNT} entries`);
  }
  if (!Array.isArray(raw.images) || raw.images.length !== EXPECTED_IMAGE_COUNT) {
    fail(`manifest.images must contain exactly ${EXPECTED_IMAGE_COUNT} entries`);
  }

  const diaries = raw.diaries.map((diary, index) => {
    const label = `manifest.diaries[${index}]`;
    if (!isRecord(diary)) fail(`${label} must be an object`);
    const expectedDay = index + 1;
    const expectedSlug = daySlug(expectedDay);
    if (diary.dayNumber !== expectedDay || diary.slug !== expectedSlug) {
      fail(`${label} must describe ${expectedSlug}`);
    }
    const noteId = requireString(diary.noteId, `${label}.noteId`);
    if (!NOTE_ID_PATTERN.test(noteId)) fail(`${label}.noteId has an invalid format`);
    canonicalNoteUrl(diary.canonicalUrl, noteId, `${label}.canonicalUrl`);
    if (diary.imageCount !== EXPECTED_IMAGE_COUNTS[index]) {
      fail(`${label}.imageCount must be ${EXPECTED_IMAGE_COUNTS[index]}`);
    }
    return Object.freeze({ ...diary });
  });
  const images = raw.images.map(validateManifestImage);
  for (const [dayIndex, expectedCount] of EXPECTED_IMAGE_COUNTS.entries()) {
    const dayNumber = dayIndex + 1;
    const dayImages = images.filter((image) => image.dayNumber === dayNumber);
    if (dayImages.length !== expectedCount) {
      fail(`${daySlug(dayNumber)} manifest image count must be ${expectedCount}`);
    }
    dayImages.forEach((image, index) => {
      if (image.order !== index + 1) {
        fail(`${image.id} is out of manifest order`);
      }
    });
  }
  assertUnique(diaries, "manifest noteId", (diary) => diary.noteId);
  assertUnique(images, "manifest image id", (image) => image.id);
  assertUnique(images, "manifest full path", (image) => normalizeForComparison(image.fullPath));
  assertUnique(
    images,
    "manifest thumbnail path",
    (image) => normalizeForComparison(image.thumbnailPath),
  );
  return Object.freeze({
    contentSha256: raw.contentSha256,
    diaries: Object.freeze(diaries),
    images: Object.freeze(images),
  });
}

async function readManifest() {
  let text;
  try {
    text = await fs.readFile(MANIFEST_PATH, "utf8");
  } catch (error) {
    fail(`Unable to read ${MANIFEST_PATH}: ${error.message}`);
  }
  assertGeneratedTextIsPrivateSafe(text, "team diary manifest");
  let raw;
  try {
    raw = JSON.parse(text);
  } catch (error) {
    fail(`Unable to parse ${MANIFEST_PATH}: ${error.message}`);
  }
  return validateManifest(raw);
}

async function checkImageOutput(image, outputPath, expectedHash, kind) {
  let buffer;
  try {
    buffer = await fs.readFile(outputPath);
  } catch (error) {
    fail(`${image.id} ${kind} is missing: ${error.message}`);
  }
  const actualHash = sha256(buffer);
  if (actualHash !== expectedHash) {
    fail(`${image.id} ${kind} SHA-256 changed`);
  }
  let metadata;
  try {
    metadata = await sharp(buffer, { failOn: "error" }).metadata();
  } catch (error) {
    fail(`${image.id} ${kind} is unreadable: ${error.message}`);
  }
  assertWebpMetadata(metadata, `${image.id} ${kind}`);
  const widthKey = kind === "full image" ? "fullWidth" : "thumbnailWidth";
  const heightKey = kind === "full image" ? "fullHeight" : "thumbnailHeight";
  if (metadata.width !== image[widthKey] || metadata.height !== image[heightKey]) {
    fail(
      `${image.id} ${kind} dimensions changed: manifest ${image[widthKey]}x${image[heightKey]}, actual ${metadata.width}x${metadata.height}`,
    );
  }
  const inspected = sanitizeWebpContainer(
    buffer,
    `${image.id} committed ${kind}`,
  );
  if (!inspected.buffer.equals(buffer)) {
    fail(`${image.id} ${kind} contains removable or unapproved RIFF chunks`);
  }
  if (kind === "full image") {
    assertCapturedAspectRatio(image, metadata);
    if (inspected.imagePayloadSha256 !== image.imagePayloadSha256) {
      fail(`${image.id} compressed image payload SHA-256 changed`);
    }
  }
  if (kind === "thumbnail") {
    const expectedLongestEdge = Math.min(
      THUMB_MAX_EDGE,
      Math.max(image.fullWidth, image.fullHeight),
    );
    const actualLongestEdge = Math.max(metadata.width, metadata.height);
    if (Math.abs(actualLongestEdge - expectedLongestEdge) > 1) {
      fail(
        `${image.id} thumbnail longest edge is ${actualLongestEdge}; expected ${expectedLongestEdge}`,
      );
    }
  }
}

async function checkNoOrphans(images) {
  const expected = new Set(
    images
      .flatMap((image) => [image.fullPath, image.thumbnailPath])
      .map(normalizeForComparison),
  );
  const actualFiles = await outputFiles();
  const actual = new Set(actualFiles.map(normalizeForComparison));
  const missing = [...expected].filter((file) => !actual.has(file));
  const orphaned = actualFiles.filter(
    (file) => !expected.has(normalizeForComparison(file)),
  );
  if (missing.length > 0 || orphaned.length > 0) {
    const details = [
      ...missing.map((file) => `missing output: ${relativeFromRepo(file)}`),
      ...orphaned.map((file) => `orphan output: ${relativeFromRepo(file)}`),
    ];
    fail(`team diary output set is not exact:\n${details.join("\n")}`);
  }
}

async function checkRegistry(manifest) {
  const expected = registrySource(
    manifest.images.map((image) => ({
      ...image,
      fullPath: relativeFromRepo(image.fullPath),
      thumbnailPath: relativeFromRepo(image.thumbnailPath),
    })),
  );
  assertGeneratedTextIsPrivateSafe(expected, "expected team diary registry");
  let actual;
  try {
    actual = await fs.readFile(REGISTRY_PATH, "utf8");
  } catch (error) {
    fail(`generated team diary registry is missing: ${error.message}`);
  }
  if (actual !== expected) {
    fail("generated team diary registry is stale; run the team diary processor");
  }
}

function contentNotes(raw) {
  if (Array.isArray(raw)) return raw;
  if (isRecord(raw) && Array.isArray(raw.notes)) return raw.notes;
  fail("team-diaries.json must contain an array or a notes array");
}

async function checkContent(manifest) {
  let text;
  let raw;
  try {
    text = await fs.readFile(CONTENT_PATH, "utf8");
    assertGeneratedTextIsPrivateSafe(text, "team diary content");
    raw = JSON.parse(text);
  } catch (error) {
    fail(`Unable to read team diary content: ${error.message}`);
  }
  if (sha256(Buffer.from(text, "utf8")) !== manifest.contentSha256) {
    fail("team-diaries.json is stale or was edited without regenerating the manifest");
  }
  const notes = contentNotes(raw);
  if (notes.length !== EXPECTED_DIARY_COUNT) {
    fail(`team diary content must contain exactly ${EXPECTED_DIARY_COUNT} notes`);
  }
  const manifestDiaryBySlug = new Map(
    manifest.diaries.map((diary) => [diary.slug, diary]),
  );
  const manifestImagesBySlug = new Map(
    manifest.diaries.map((diary) => [
      diary.slug,
      manifest.images.filter((image) => image.diarySlug === diary.slug),
    ]),
  );
  for (const [index, note] of notes.entries()) {
    const label = `team-diaries.json[${index}]`;
    if (!isRecord(note)) fail(`${label} must be an object`);
    const inferredDay = firstDefined(
      note.dayNumber,
      typeof note.slug === "string" && DAY_SLUG_PATTERN.test(note.slug)
        ? Number(note.slug.slice(-2))
        : undefined,
    );
    const dayNumber = requirePositiveInteger(inferredDay, `${label}.dayNumber`);
    if (dayNumber !== index + 1) fail(`${label} is out of day order`);
    const slug = requireString(note.slug, `${label}.slug`);
    if (slug !== daySlug(dayNumber)) fail(`${label}.slug does not match dayNumber`);
    const manifestDiary = manifestDiaryBySlug.get(slug);
    if (!manifestDiary) fail(`${label}.slug is not in the manifest`);
    const canonical = firstDefined(note.sourceUrl, note.canonicalUrl);
    const canonicalUrl = canonicalNoteUrl(
      canonical,
      manifestDiary.noteId,
      `${label}.sourceUrl`,
    );
    if (canonicalUrl !== manifestDiary.canonicalUrl) {
      fail(`${label}.sourceUrl does not match the captured canonical URL`);
    }
    const publishedOn = requireTimestamp(
      note.publishedOn,
      undefined,
      `${label}.publishedOn`,
    );
    if (note.updatedOn !== undefined) {
      const updatedOn = requireTimestamp(
        note.updatedOn,
        undefined,
        `${label}.updatedOn`,
      );
      if (Date.parse(updatedOn) - Date.parse(publishedOn) <= 60_000) {
        fail(`${label}.updatedOn must be omitted when the update gap is at most 60 seconds`);
      }
    }
    optionalString(note.location, `${label}.location`);
    if (requireString(note.author, `${label}.author`) !== "NJU 云启青禾") {
      fail(`${label}.author must be NJU 云启青禾`);
    }
    requireString(note.title, `${label}.title`);
    if (note.summary !== DIARY_SUMMARIES[dayNumber - 1]) {
      fail(`${label}.summary does not match the reviewed editorial summary`);
    }
    const markdown = requireString(note.markdown, `${label}.markdown`);
    if (markdown.includes("[举手R]")) {
      fail(`${label}.markdown still contains the Day 4 platform emoji placeholder`);
    }
    requireStringArray(note.tags, `${label}.tags`);
    const noteImages = note.images;
    if (!Array.isArray(noteImages)) fail(`${label}.images must be an array`);
    const expectedImages = manifestImagesBySlug.get(slug);
    const actualIds = noteImages.map((image, imageIndex) => {
      if (!isRecord(image)) {
        fail(`${label}.images[${imageIndex}] must be an { id, alt } object`);
      }
      const checkedId = requireString(
        image.id,
        `${label}.images[${imageIndex}].id`,
      );
      if (image.alt !== expectedImages[imageIndex]?.alt) {
        fail(`${label}.images[${imageIndex}].alt does not match the manifest`);
      }
      return checkedId;
    });
    const expectedIds = expectedImages.map((image) => image.id);
    if (
      actualIds.length !== expectedIds.length ||
      actualIds.some((id, imageIndex) => id !== expectedIds[imageIndex])
    ) {
      fail(`${label}.images must exactly match manifest order`);
    }
  }
}

async function checkRepositoryForCapturedShareFragments() {
  const files = await walkFiles(REPO_ROOT, SKIPPED_REPOSITORY_DIRECTORIES);
  const forbiddenBuffers = FORBIDDEN_REPOSITORY_FRAGMENTS.map((fragment) => ({
    fragment,
    bytes: Buffer.from(fragment.toLowerCase(), "utf8"),
  }));
  const findings = [];
  for (const file of files) {
    if (!REPOSITORY_TEXT_EXTENSIONS.has(path.extname(file).toLowerCase())) {
      continue;
    }
    const contents = await fs.readFile(file);
    const lower = Buffer.from(contents.toString("latin1").toLowerCase(), "latin1");
    for (const forbidden of forbiddenBuffers) {
      if (lower.indexOf(forbidden.bytes) !== -1) {
        findings.push(`${relativeFromRepo(file)}: ${forbidden.fragment}`);
      }
    }
  }
  if (findings.length > 0) {
    fail(`repository contains captured share/CDN fragments:\n${findings.join("\n")}`);
  }
}

async function checkBuiltOutputForCapturedShareFragments() {
  const files = await walkFiles(BUILD_OUTPUT_ROOT);
  if (files.length === 0) {
    fail("built output is missing; run npm run build before --check-built");
  }

  const findings = [];
  for (const file of files) {
    if (!REPOSITORY_TEXT_EXTENSIONS.has(path.extname(file).toLowerCase())) {
      continue;
    }
    const contents = await fs.readFile(file, "utf8");
    const lower = contents.toLowerCase();
    const matchedFragments = FORBIDDEN_REPOSITORY_FRAGMENTS.filter((fragment) =>
      lower.includes(fragment.toLowerCase()),
    );
    if (
      matchedFragments.length > 0 ||
      /https:\/\/www\.xiaohongshu\.com\/explore\/[a-f0-9]{24}\?/iu.test(
        contents,
      )
    ) {
      findings.push(
        `${relativeFromRepo(file)}: captured share/CDN fragment or non-canonical source URL`,
      );
    }
  }
  if (findings.length > 0) {
    fail(`built output contains captured share/CDN data:\n${findings.join("\n")}`);
  }

  console.log(
    `Verified ${files.length} built output files without captured CDN links, share identifiers, or tokens.`,
  );
}

async function runCheck(manifest) {
  await mapWithConcurrency(manifest.images, CHECK_CONCURRENCY, async (image) => {
    await Promise.all([
      checkImageOutput(
        image,
        image.fullPath,
        image.fullSha256,
        "full image",
      ),
      checkImageOutput(
        image,
        image.thumbnailPath,
        image.thumbnailSha256,
        "thumbnail",
      ),
      checkTemporarySourceTraceability(image),
    ]);
  });
  await checkNoOrphans(manifest.images);
  await checkRegistry(manifest);
  await checkContent(manifest);
  await checkRepositoryForCapturedShareFragments();
  console.log(
    `Verified ${EXPECTED_DIARY_COUNT} team diaries, ${EXPECTED_IMAGE_COUNT} full WebP images, ${EXPECTED_IMAGE_COUNT} thumbnails, the static registry, canonical source URLs, and repository privacy checks.`,
  );
}

async function runGenerate() {
  const captures = await readCaptures();
  const preparedImages = [];
  try {
    let completed = 0;
    const prepared = await mapWithConcurrency(
      captures.images,
      DOWNLOAD_CONCURRENCY,
      async (image) => {
        const result = await prepareImage(image);
        preparedImages.push(result);
        completed += 1;
        process.stdout.write(
          `\rPrepared ${String(completed).padStart(String(EXPECTED_IMAGE_COUNT).length, " ")} / ${EXPECTED_IMAGE_COUNT}`,
        );
        return result;
      },
    );
    process.stdout.write("\n");
    const contentText = `${JSON.stringify(contentFromCaptures(captures), null, 2)}\n`;
    const manifest = manifestFromCaptures(
      captures,
      prepared,
      sha256(Buffer.from(contentText, "utf8")),
    );
    const manifestText = `${JSON.stringify(manifest, null, 2)}\n`;
    const registryText = registrySource(manifest.images);
    assertGeneratedTextIsPrivateSafe(contentText, "team diary content");
    assertGeneratedTextIsPrivateSafe(manifestText, "team diary manifest");
    assertGeneratedTextIsPrivateSafe(registryText, "team diary registry");

    await promotePreparedImages(prepared);
    await removeOrphanOutputs(captures.images);
    await writeTextAtomically(MANIFEST_PATH, manifestText);
    await writeTextAtomically(REGISTRY_PATH, registryText);
    await writeTextAtomically(CONTENT_PATH, contentText);
    await runCheck(validateManifest(manifest));
  } finally {
    await cleanupTemporaryFiles(preparedImages);
  }
}

function parseMode(argumentsList) {
  if (argumentsList.length === 0) return "generate";
  if (argumentsList.length === 1 && argumentsList[0] === "--check") {
    return "check";
  }
  if (argumentsList.length === 1 && argumentsList[0] === "--check-built") {
    return "check-built";
  }
  fail("usage: node scripts/process-team-diaries.mjs [--check|--check-built]");
}

try {
  const mode = parseMode(process.argv.slice(2));
  if (mode === "check") {
    await runCheck(await readManifest());
  } else if (mode === "check-built") {
    await checkBuiltOutputForCapturedShareFragments();
  } else {
    await runGenerate();
  }
} catch (error) {
  console.error(`Team diary pipeline failed: ${error.message}`);
  process.exitCode = 1;
}
