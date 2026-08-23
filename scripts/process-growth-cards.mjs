import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const EXPECTED_SOURCE_CARD_COUNT = 161;
const EXPECTED_PUBLISHED_CARD_COUNT = 157;
const EXPECTED_EXCLUDED_CARD_COUNT = 4;
const FULL_MAX_EDGE = 1440;
const THUMB_MAX_EDGE = 480;
const WEBP_FORMAT = "webp";
const SOURCE_IMAGE_EXTENSIONS = new Set([
  ".jpeg",
  ".jpg",
  ".png",
  ".tif",
  ".tiff",
  ".webp",
]);
const ALLOWED_ROTATIONS = new Set([0, 90, 180, 270]);
const ALLOWED_KINDS = new Set(["standard-card", "freeform-reflection"]);
const ALLOWED_PUBLICATION_STATES = new Set(["published", "excluded"]);
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const DIARY_SLUG_PATTERN = /^student-\d{3}-session-\d{2}-[a-z]$/;

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(SCRIPT_DIR, "..");
const MANIFEST_PATH = path.join(SCRIPT_DIR, "growth-cards-manifest.json");
const OUTPUT_ROOT = path.join(
  REPO_ROOT,
  "src",
  "assets",
  "growth-cards",
);
const REGISTRY_PATH = path.join(
  REPO_ROOT,
  "src",
  "content",
  "growth-card-assets.generated.ts",
);

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

function requireSlug(value, label) {
  const slug = requireString(value, label);
  if (!SLUG_PATTERN.test(slug)) {
    fail(`${label} must contain lowercase letters, numbers, and hyphens only`);
  }
  return slug;
}

function requirePositiveInteger(value, label) {
  if (!Number.isInteger(value) || value <= 0) {
    fail(`${label} must be a positive integer`);
  }
  return value;
}

function assertPathInside(root, target, label) {
  const relative = path.relative(root, target);
  if (relative === "" || (!relative.startsWith("..") && !path.isAbsolute(relative))) {
    return;
  }
  fail(`${label} resolves outside ${root}: ${target}`);
}

function normalizeForComparison(value) {
  const resolved = path.resolve(value);
  return process.platform === "win32" ? resolved.toLowerCase() : resolved;
}

function validateCrop(value, label) {
  if (value === null) return null;
  if (!isRecord(value) || value.unit !== "normalized") {
    fail(`${label} must be null or a normalized crop object`);
  }

  const crop = {
    unit: "normalized",
    x: value.x,
    y: value.y,
    width: value.width,
    height: value.height,
  };

  for (const key of ["x", "y", "width", "height"]) {
    if (!Number.isFinite(crop[key])) {
      fail(`${label}.${key} must be a finite number`);
    }
  }

  if (
    crop.x < 0 ||
    crop.y < 0 ||
    crop.width <= 0 ||
    crop.height <= 0 ||
    crop.x >= 1 ||
    crop.y >= 1 ||
    crop.x + crop.width > 1 + Number.EPSILON ||
    crop.y + crop.height > 1 + Number.EPSILON
  ) {
    fail(`${label} must stay within normalized bounds 0..1`);
  }

  return Object.freeze(crop);
}

function validateCard(rawCard, index, sourceRoot) {
  const label = `cards[${index}]`;
  if (!isRecord(rawCard)) fail(`${label} must be an object`);

  const sourceFilename = requireString(
    rawCard.sourceFilename,
    `${label}.sourceFilename`,
  );
  if (path.basename(sourceFilename) !== sourceFilename) {
    fail(`${label}.sourceFilename must not contain a directory`);
  }

  const sourcePathValue = requireString(rawCard.sourcePath, `${label}.sourcePath`);
  const sourcePath = path.resolve(REPO_ROOT, sourcePathValue);
  assertPathInside(sourceRoot, sourcePath, `${label}.sourcePath`);
  const expectedSourcePath = path.resolve(sourceRoot, sourceFilename);
  if (
    normalizeForComparison(sourcePath) !==
    normalizeForComparison(expectedSourcePath)
  ) {
    fail(`${label}.sourcePath must resolve to sourceRoot/sourceFilename`);
  }

  const rotation = rawCard.rotation;
  if (!ALLOWED_ROTATIONS.has(rotation)) {
    fail(`${label}.rotation must be 0, 90, 180, or 270`);
  }

  if (rawCard.sourceKind !== "photographed-paper") {
    fail(`${label}.sourceKind must be photographed-paper`);
  }
  if (!ALLOWED_KINDS.has(rawCard.kind)) {
    fail(`${label}.kind is not supported`);
  }

  const publication = rawCard.publication;
  if (!ALLOWED_PUBLICATION_STATES.has(publication)) {
    fail(`${label}.publication must be published or excluded`);
  }

  const common = {
    imageId: requireSlug(rawCard.imageId, `${label}.imageId`),
    sourceFilename,
    sourcePath,
    sourceWidth: requirePositiveInteger(
      rawCard.sourceWidth,
      `${label}.sourceWidth`,
    ),
    sourceHeight: requirePositiveInteger(
      rawCard.sourceHeight,
      `${label}.sourceHeight`,
    ),
    rotation,
    crop: validateCrop(rawCard.crop, `${label}.crop`),
    sourceKind: rawCard.sourceKind,
    kind: rawCard.kind,
    publication,
  };
  const expectedImageId = `growth-card-${String(index + 1).padStart(3, "0")}`;
  if (common.imageId !== expectedImageId) {
    fail(`${label}.imageId must be ${expectedImageId} so source order cannot drift`);
  }

  if (publication === "excluded") {
    for (const key of ["studentSlug", "diarySlug", "outputStem"]) {
      if (rawCard[key] !== null) {
        fail(`${label}.${key} must be null when publication is excluded`);
      }
    }
    if (rawCard.exclusionReason !== "missing-attribution") {
      fail(
        `${label}.exclusionReason must be missing-attribution when publication is excluded`,
      );
    }
    return Object.freeze({
      ...common,
      studentSlug: null,
      diarySlug: null,
      outputStem: null,
      exclusionReason: rawCard.exclusionReason,
      outputDirectory: null,
      fullPath: null,
      thumbPath: null,
    });
  }

  if (rawCard.exclusionReason !== undefined && rawCard.exclusionReason !== null) {
    fail(`${label}.exclusionReason must be omitted for published cards`);
  }

  const studentSlug = requireSlug(rawCard.studentSlug, `${label}.studentSlug`);
  const diarySlug = requireSlug(rawCard.diarySlug, `${label}.diarySlug`);
  if (!DIARY_SLUG_PATTERN.test(diarySlug)) {
    fail(`${label}.diarySlug must use student-NNN-session-NN-x format`);
  }
  if (!diarySlug.startsWith(`${studentSlug}-session-`)) {
    fail(`${label}.diarySlug must begin with its studentSlug`);
  }
  const outputStem = requireSlug(rawCard.outputStem, `${label}.outputStem`);
  const outputDirectory = path.join(OUTPUT_ROOT, studentSlug);
  const fullPath = path.join(outputDirectory, `${outputStem}.webp`);
  const thumbPath = path.join(outputDirectory, `${outputStem}-thumb.webp`);
  assertPathInside(OUTPUT_ROOT, fullPath, `${label} full output`);
  assertPathInside(OUTPUT_ROOT, thumbPath, `${label} thumbnail output`);

  return Object.freeze({
    ...common,
    diarySlug,
    studentSlug,
    outputStem,
    exclusionReason: null,
    outputDirectory,
    fullPath,
    thumbPath,
  });
}

function assertUnique(cards, label, getValue) {
  const seen = new Map();
  for (const [index, card] of cards.entries()) {
    const value = normalizeForComparison(getValue(card));
    const previousIndex = seen.get(value);
    if (previousIndex !== undefined) {
      fail(`${label} is duplicated at cards[${previousIndex}] and cards[${index}]`);
    }
    seen.set(value, index);
  }
}

async function readManifest() {
  let raw;
  try {
    raw = JSON.parse(await fs.readFile(MANIFEST_PATH, "utf8"));
  } catch (error) {
    fail(`Unable to read ${MANIFEST_PATH}: ${error.message}`);
  }

  if (!isRecord(raw) || raw.version !== 2) {
    fail("growth-cards-manifest.json must use version 2");
  }
  const sourceRootValue = requireString(raw.sourceRoot, "sourceRoot");
  const sourceRoot = path.resolve(REPO_ROOT, sourceRootValue);
  if (!Array.isArray(raw.cards)) fail("cards must be an array");
  if (raw.cards.length !== EXPECTED_SOURCE_CARD_COUNT) {
    fail(`manifest must contain exactly ${EXPECTED_SOURCE_CARD_COUNT} source cards`);
  }

  const cards = raw.cards.map((card, index) =>
    validateCard(card, index, sourceRoot),
  );
  const publishedCards = cards.filter((card) => card.publication === "published");
  const excludedCards = cards.filter((card) => card.publication === "excluded");
  if (publishedCards.length !== EXPECTED_PUBLISHED_CARD_COUNT) {
    fail(
      `manifest must contain exactly ${EXPECTED_PUBLISHED_CARD_COUNT} published cards`,
    );
  }
  if (excludedCards.length !== EXPECTED_EXCLUDED_CARD_COUNT) {
    fail(
      `manifest must contain exactly ${EXPECTED_EXCLUDED_CARD_COUNT} excluded cards`,
    );
  }

  assertUnique(cards, "imageId", (card) => card.imageId);
  assertUnique(publishedCards, "diarySlug", (card) => card.diarySlug);
  assertUnique(cards, "sourceFilename", (card) => card.sourceFilename);
  assertUnique(cards, "sourcePath", (card) => card.sourcePath);
  assertUnique(publishedCards, "full output path", (card) => card.fullPath);
  assertUnique(publishedCards, "thumbnail output path", (card) => card.thumbPath);

  return Object.freeze({
    sourceRoot,
    cards: Object.freeze(cards),
    publishedCards: Object.freeze(publishedCards),
    excludedCards: Object.freeze(excludedCards),
  });
}

async function walkFiles(root) {
  const files = [];
  async function visit(directory) {
    const entries = await fs.readdir(directory, { withFileTypes: true });
    for (const entry of entries) {
      const entryPath = path.join(directory, entry.name);
      if (entry.isDirectory()) {
        await visit(entryPath);
      } else if (entry.isFile()) {
        files.push(entryPath);
      }
    }
  }
  await visit(root);
  return files;
}

async function assertSourceOneToOne(sourceRoot, cards) {
  const sourceFiles = (await walkFiles(sourceRoot)).filter((file) =>
    SOURCE_IMAGE_EXTENSIONS.has(path.extname(file).toLowerCase()),
  );
  if (sourceFiles.length !== EXPECTED_SOURCE_CARD_COUNT) {
    fail(
      `sourceRoot must contain exactly ${EXPECTED_SOURCE_CARD_COUNT} supported images; found ${sourceFiles.length}`,
    );
  }

  const actual = new Set(sourceFiles.map(normalizeForComparison));
  const declared = new Set(cards.map((card) => normalizeForComparison(card.sourcePath)));
  const unlisted = sourceFiles.filter(
    (file) => !declared.has(normalizeForComparison(file)),
  );
  const missing = cards.filter(
    (card) => !actual.has(normalizeForComparison(card.sourcePath)),
  );
  if (unlisted.length > 0 || missing.length > 0) {
    const details = [
      ...unlisted.map((file) => `unlisted source: ${path.relative(REPO_ROOT, file)}`),
      ...missing.map((card) => `missing source: ${path.relative(REPO_ROOT, card.sourcePath)}`),
    ];
    fail(`manifest and sourceRoot are not one-to-one:\n${details.join("\n")}`);
  }
}

function getOrientedDimensions(card) {
  return card.rotation === 90 || card.rotation === 270
    ? { width: card.sourceHeight, height: card.sourceWidth }
    : { width: card.sourceWidth, height: card.sourceHeight };
}

function getCropRectangle(card) {
  const oriented = getOrientedDimensions(card);
  if (!card.crop) {
    return { left: 0, top: 0, width: oriented.width, height: oriented.height };
  }

  const left = Math.floor(card.crop.x * oriented.width);
  const top = Math.floor(card.crop.y * oriented.height);
  const right = Math.min(
    oriented.width,
    Math.ceil((card.crop.x + card.crop.width) * oriented.width),
  );
  const bottom = Math.min(
    oriented.height,
    Math.ceil((card.crop.y + card.crop.height) * oriented.height),
  );
  if (right <= left || bottom <= top) {
    fail(`crop for ${card.imageId} resolves to an empty rectangle`);
  }
  return { left, top, width: right - left, height: bottom - top };
}

async function assertSourceMetadata(card) {
  const metadata = await sharp(card.sourcePath, { failOn: "error" }).metadata();
  if (
    metadata.width !== card.sourceWidth ||
    metadata.height !== card.sourceHeight
  ) {
    fail(
      `${card.imageId} source dimensions changed: manifest ${card.sourceWidth}x${card.sourceHeight}, actual ${metadata.width}x${metadata.height}`,
    );
  }
}

async function preparePixels(card) {
  await assertSourceMetadata(card);
  const crop = getCropRectangle(card);
  let pipeline = sharp(card.sourcePath, { failOn: "error" }).rotate(card.rotation);
  if (
    crop.left !== 0 ||
    crop.top !== 0 ||
    crop.width !== getOrientedDimensions(card).width ||
    crop.height !== getOrientedDimensions(card).height
  ) {
    pipeline = pipeline.extract(crop);
  }

  return pipeline
    .toColourspace("srgb")
    .removeAlpha()
    .normalize({ lower: 1, upper: 99 })
    .raw()
    .toBuffer({ resolveWithObject: true });
}

async function encodeWebp(pixelData, maxEdge, quality) {
  return sharp(pixelData.data, {
      raw: {
        width: pixelData.info.width,
        height: pixelData.info.height,
        channels: pixelData.info.channels,
      },
    })
    .resize({
      width: maxEdge,
      height: maxEdge,
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({ effort: 5, quality, smartSubsample: true })
    .toBuffer();
}

async function writeWebpAtomically(pixelData, outputPath, maxEdge, quality) {
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  const temporaryPath = `${outputPath}.tmp-${process.pid}`;
  try {
    await fs.writeFile(
      temporaryPath,
      await encodeWebp(pixelData, maxEdge, quality),
    );
    await replaceFile(temporaryPath, outputPath);
  } finally {
    await fs.rm(temporaryPath, { force: true });
  }
}

async function processCard(card) {
  const pixelData = await preparePixels(card);
  await Promise.all([
    writeWebpAtomically(pixelData, card.fullPath, FULL_MAX_EDGE, 90),
    writeWebpAtomically(pixelData, card.thumbPath, THUMB_MAX_EDGE, 84),
  ]);
}

async function mapWithConcurrency(items, concurrency, operation) {
  let nextIndex = 0;
  async function worker() {
    while (nextIndex < items.length) {
      const index = nextIndex;
      nextIndex += 1;
      await operation(items[index], index, items.length);
    }
  }
  await Promise.all(
    Array.from({ length: Math.min(concurrency, items.length) }, () => worker()),
  );
}

function registrySource(cards) {
  const sortedCards = [...cards].sort((left, right) =>
    left.imageId.localeCompare(right.imageId),
  );
  const imports = [];
  const records = [];
  const ids = [];

  for (const [index, card] of sortedCards.entries()) {
    const importStem = `growthCardAsset${String(index + 1).padStart(3, "0")}`;
    const fullImportPath = `@/assets/growth-cards/${card.studentSlug}/${card.outputStem}.webp`;
    const thumbImportPath = `@/assets/growth-cards/${card.studentSlug}/${card.outputStem}-thumb.webp`;
    imports.push(`import ${importStem}Full from ${JSON.stringify(fullImportPath)};`);
    imports.push(`import ${importStem}Thumb from ${JSON.stringify(thumbImportPath)};`);
    records.push(
      `  ${JSON.stringify(card.imageId)}: { full: ${importStem}Full, thumb: ${importStem}Thumb },`,
    );
    ids.push(JSON.stringify(card.imageId));
  }

  return [
    "// Generated by scripts/process-growth-cards.mjs. Do not edit by hand.",
    'import type { StaticImageData } from "next/image";',
    "",
    ...imports,
    "",
    `export type GrowthCardImageId = ${ids.join(" | ")};`,
    "",
    "export interface GrowthCardImageAsset {",
    "  readonly full: StaticImageData;",
    "  readonly thumb: StaticImageData;",
    "}",
    "",
    "export const growthCardImageAssets = {",
    ...records,
    "} as const satisfies Record<GrowthCardImageId, GrowthCardImageAsset>;",
    "",
  ].join("\n");
}

async function writeTextAtomically(outputPath, contents) {
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  const temporaryPath = `${outputPath}.tmp-${process.pid}`;
  try {
    await fs.writeFile(temporaryPath, contents, "utf8");
    await replaceFile(temporaryPath, outputPath);
  } finally {
    await fs.rm(temporaryPath, { force: true });
  }
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

async function outputFiles() {
  try {
    return await walkFiles(OUTPUT_ROOT);
  } catch (error) {
    if (error.code === "ENOENT") return [];
    throw error;
  }
}

async function removeOrphanOutputs(cards) {
  const expected = new Set(
    cards.flatMap((card) => [card.fullPath, card.thumbPath]).map(normalizeForComparison),
  );
  const files = await outputFiles();
  for (const file of files) {
    assertPathInside(OUTPUT_ROOT, file, "generated output");
    if (!expected.has(normalizeForComparison(file))) {
      await fs.rm(file);
    }
  }
}

function hasEmbeddedMetadata(metadata) {
  return Boolean(
    metadata.exif ||
      metadata.icc ||
      metadata.iptc ||
      metadata.xmp ||
      metadata.tifftagPhotoshop ||
      metadata.orientation,
  );
}

async function checkOutput(card, outputPath, maxEdge, label) {
  let metadata;
  try {
    metadata = await sharp(outputPath, { failOn: "error" }).metadata();
  } catch (error) {
    fail(`${card.imageId} ${label} is missing or unreadable: ${error.message}`);
  }

  if (metadata.format !== WEBP_FORMAT) {
    fail(`${card.imageId} ${label} must be WebP, got ${metadata.format}`);
  }
  if (!metadata.width || !metadata.height) {
    fail(`${card.imageId} ${label} has no dimensions`);
  }
  const crop = getCropRectangle(card);
  if (
    metadata.width > maxEdge ||
    metadata.height > maxEdge ||
    metadata.width > crop.width ||
    metadata.height > crop.height
  ) {
    fail(
      `${card.imageId} ${label} violates size or no-upscale limits: ${metadata.width}x${metadata.height}`,
    );
  }
  const expectedLongestEdge = Math.min(maxEdge, Math.max(crop.width, crop.height));
  const actualLongestEdge = Math.max(metadata.width, metadata.height);
  if (Math.abs(actualLongestEdge - expectedLongestEdge) > 1) {
    fail(
      `${card.imageId} ${label} longest edge is ${actualLongestEdge}; expected ${expectedLongestEdge}`,
    );
  }
  if (hasEmbeddedMetadata(metadata)) {
    fail(`${card.imageId} ${label} still contains embedded metadata`);
  }
}

async function checkOutputReproducibility(
  card,
  pixelData,
  outputPath,
  maxEdge,
  quality,
  label,
) {
  const [expected, actual] = await Promise.all([
    encodeWebp(pixelData, maxEdge, quality),
    fs.readFile(outputPath),
  ]);
  if (!expected.equals(actual)) {
    fail(
      `${card.imageId} ${label} is stale or not reproducible; run npm run growth-cards`,
    );
  }
}

async function checkNoOrphans(cards) {
  const expected = new Set(
    cards.flatMap((card) => [card.fullPath, card.thumbPath]).map(normalizeForComparison),
  );
  const actualFiles = await outputFiles();
  const actual = new Set(actualFiles.map(normalizeForComparison));
  const missing = [...expected].filter((file) => !actual.has(file));
  const orphaned = actualFiles.filter(
    (file) => !expected.has(normalizeForComparison(file)),
  );
  if (missing.length > 0 || orphaned.length > 0) {
    const details = [
      ...missing.map((file) => `missing output: ${path.relative(REPO_ROOT, file)}`),
      ...orphaned.map((file) => `orphan output: ${path.relative(REPO_ROOT, file)}`),
    ];
    fail(`generated output set is not exact:\n${details.join("\n")}`);
  }
}

async function checkPublicOutputs(manifest) {
  await mapWithConcurrency(manifest.publishedCards, 8, async (card) => {
    await Promise.all([
      checkOutput(card, card.fullPath, FULL_MAX_EDGE, "full image"),
      checkOutput(card, card.thumbPath, THUMB_MAX_EDGE, "thumbnail"),
    ]);
  });
  await checkNoOrphans(manifest.publishedCards);

  const expectedRegistry = registrySource(manifest.publishedCards);
  let actualRegistry;
  try {
    actualRegistry = await fs.readFile(REGISTRY_PATH, "utf8");
  } catch (error) {
    fail(`generated registry is missing: ${error.message}`);
  }
  if (actualRegistry !== expectedRegistry) {
    fail("generated registry is stale; run npm run growth-cards");
  }
}

async function runCheck(manifest) {
  await assertSourceOneToOne(manifest.sourceRoot, manifest.cards);
  await mapWithConcurrency(manifest.publishedCards, 4, async (card) => {
    const pixelData = await preparePixels(card);
    await Promise.all([
      checkOutput(card, card.fullPath, FULL_MAX_EDGE, "full image"),
      checkOutput(card, card.thumbPath, THUMB_MAX_EDGE, "thumbnail"),
      checkOutputReproducibility(
        card,
        pixelData,
        card.fullPath,
        FULL_MAX_EDGE,
        90,
        "full image",
      ),
      checkOutputReproducibility(
        card,
        pixelData,
        card.thumbPath,
        THUMB_MAX_EDGE,
        84,
        "thumbnail",
      ),
    ]);
  });
  await checkPublicOutputs(manifest);

  console.log(
    `Verified ${manifest.cards.length} sources, ${manifest.publishedCards.length} published cards, ${manifest.excludedCards.length} excluded cards, ${manifest.publishedCards.length * 2} WebP outputs, and the static import registry.`,
  );
}

async function runPublicCheck(manifest) {
  await checkPublicOutputs(manifest);
  console.log(
    `Verified ${manifest.publishedCards.length} public card mappings, ${manifest.publishedCards.length * 2} committed WebP outputs, and the static import registry without requiring private source images.`,
  );
}

async function runGenerate(manifest) {
  await assertSourceOneToOne(manifest.sourceRoot, manifest.cards);
  let completed = 0;
  await mapWithConcurrency(manifest.publishedCards, 4, async (card) => {
    await processCard(card);
    completed += 1;
    process.stdout.write(
      `\rProcessed ${String(completed).padStart(String(manifest.publishedCards.length).length, " ")} / ${manifest.publishedCards.length}`,
    );
  });
  process.stdout.write("\n");
  await removeOrphanOutputs(manifest.publishedCards);
  await writeTextAtomically(REGISTRY_PATH, registrySource(manifest.publishedCards));
  await runCheck(manifest);
}

function parseMode(argumentsList) {
  if (argumentsList.length === 0) return "generate";
  if (argumentsList.length === 1 && argumentsList[0] === "--check") {
    return "check";
  }
  if (argumentsList.length === 1 && argumentsList[0] === "--check-public") {
    return "check-public";
  }
  fail("usage: node scripts/process-growth-cards.mjs [--check|--check-public]");
}

try {
  const mode = parseMode(process.argv.slice(2));
  const manifest = await readManifest();
  if (mode === "check") {
    await runCheck(manifest);
  } else if (mode === "check-public") {
    await runPublicCheck(manifest);
  } else {
    await runGenerate(manifest);
  }
} catch (error) {
  console.error(`Growth card pipeline failed: ${error.message}`);
  process.exitCode = 1;
}
