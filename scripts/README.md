# Growth card image pipeline

`build-growth-review.mjs` is the canonical, manually reviewed content source for
this batch. Run `npm run growth-content` after changing its transcriptions,
ownership, story summaries, or explicit per-child highlight indices. It
regenerates the internal review report, the public TypeScript content, and the
stable diary slug mappings in the manifest. Do not hand-edit the generated
review JSON or public TypeScript module. The four excluded source pages remain
internal-only.

CI runs `npm run growth-content:check` to prove those generated files and every
manifest diary mapping still match the canonical reviewed source.

`growth-cards-manifest.json` is the source of truth for all 161 photographed
source cards. The current batch publishes 157 attributed cards and explicitly
excludes 4 unsigned pages whose owners cannot be confirmed. Excluded entries
remain in the inventory with `publication: "excluded"` and
`exclusionReason: "missing-attribution"`, but produce no public asset or route.
Source paths are resolved from the repository root. A normalized crop is
interpreted after the manifest's clockwise rotation has been applied.
`crop: null` is an explicit full-frame preservation decision for cards whose
handwriting reaches the photographed edges; it is not an unreviewed default.

Generate color-preserving, metadata-free WebP assets and the TypeScript import
registry:

```bash
npm run growth-cards
```

Validate the 161-source one-to-one mapping, the exact 157/4 publication split,
byte-for-byte reproducible full and thumbnail assets, dimensions, formats,
embedded metadata, orphan files, and registry freshness:

```bash
npm run growth-cards:check
```

CI, where the private source directory is intentionally unavailable, runs
`npm run growth-cards:check-public`. It verifies the exact committed WebP set
and regenerates the expected static import registry from the public manifest so
stale or cross-child image mappings cannot deploy.

Outputs are deterministic paths derived from `studentSlug` and `outputStem`:

```text
src/assets/growth-cards/<studentSlug>/<outputStem>.webp
src/assets/growth-cards/<studentSlug>/<outputStem>-thumb.webp
```

The generated `src/content/growth-card-assets.generated.ts` module exports
`GrowthCardImageId`, `GrowthCardImageAsset`, and `growthCardImageAssets`. Do not
edit generated assets or the registry by hand.
