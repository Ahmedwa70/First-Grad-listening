# TEMPLATE_MANIFEST.md

> **Snapshot source:** `v1.2\_RELEASE` (Phase 2.5 verified build)
> **Created:** 2026-09-17 — IDENTIFY → COPY → VERIFY flow
> **Updated:** 2026-09-18 — Phase 4 (formal lesson data contract). See `PHASE_4_RESULT.md`.

---

## Classification

| # | Category | Files | Included in `new_template` | Rationale |
|---|----------|-------|---------------------------|-----------|
| 1 | **A — Template Core** | `lecture.html`, `css/style.css`, `css/responsive-system-v1.1.css`, `js/app.js`, `js/engine/*` (3), `js/activities/*` (7) | **YES** | Runtime shell, engine, and activity system — zero lesson-specific code |
| 2 | **A — Reference Lesson Data** | `js/lesson-01.js` | **YES** (Option A) | Required for `lecture.html` to boot standalone; content is Lesson-01 data used as the example/reference |
| 2b | **A — Lesson-02 Data** | `js/lesson-02.js` | **YES** (Phase 3) | Second lesson data file, same schema, proves the template is multi-lesson |
| 2c | **A — Authoring gate** | `schema/lesson-schema.js` | **YES** (Phase 4) | Node-only validator; formalizes the `lesson-XX.js` contract (never loaded by `lecture.html`)
| 3 | **A — Assets** | `assets/fonts/*` (46), `assets/audio/*` (9), `assets/videos/*` (4) | **YES** (full copy) | 5 font families referenced by `@font-face`; 9 audio + 4 video referenced by `lesson-01.js`; full copy for independence |
| 4 | **B — Lesson-specific page** | `lecture-01.html` | **NO** | Phase 1 legacy page; not part of the generic template |
| 5 | **C — Backup** | `js/lesson-01.backup-before-QD16.js` | **NO** | Frozen backup, superseded by Phase 2.5 W4 edits |
| 6 | **D — Documentation** | `md/*`, `Work plan/*`, all root `*.md` | **NO** | Project docs/reports — not runtime |

### Assets note
`style.css` `@font-face` actually references 5 font files (NotoSansArabic Regular/Bold/Variable + NotoNaskhArabic Regular/Bold). The Condensed/Extra/Semi‑Condensed variants (37 files) are copied for completeness. Total `assets/` = 9.4 MB.

---

## File Count

| Directory | Count |
|-----------|-------|
| Root (`lecture.html`) | 1 |
| `css/` | 2 |
| `js/` (app + loader + lesson-01 + lesson-02) | 4 |
| `js/engine/` | 3 |
| `js/activities/` | 7 |
| `assets/audio/` | 9 |
| `assets/fonts/` | 46 |
| `assets/videos/` | 4 |
| `schema/` (lesson contract validator) | 1 |
| **Total** | **77** |

---

## Verification

| Check | Result |
|-------|--------|
| SHA-256 byte-identical (source ↔ copy) | ✅ **74/74** (Phase 2.5 baseline) |
| Boot test (jsdom, `lecture.html`) | ✅ P1–P7 OK, title OK |
| External dependency scan (`../`, drive letters, network URLs) | ✅ zero in code files |
| Asset reference resolution (`assets/...` paths exist) | ✅ all resolve inside copy |
| Phase 3 — loader vs static baseline (lesson 01) | ✅ snapshots byte-identical |
| Phase 3 — multi-lesson boot (`?lesson=01` / `?lesson=02`) | ✅ P1–P7 OK + title + color parity |
| Phase 3 — cross-lesson leak scan | ✅ ZERO tokens in both directions |
| Phase 3 — schema equivalence (lesson-01 ↔ lesson-02) | ✅ union-shape identical, freeze OK |
| Phase 3 — shared-template files drift | ✅ 0 (engine/activities/app/css/lesson-01 stale-free) |
| Phase 4 — formal contract (`node schema/lesson-schema.js`) | ✅ exit 0: lesson-01 PASS 0/0; lesson-02 0 errors + 4 documented warnings |
| Phase 4 — negative self-tests | ✅ 4/4 broken cases detected |
| Phase 4 — data file drift | ✅ lesson-01.js / lesson-02.js byte-identical (SHA-256 unchanged) |
| Phase 4 — runtime regression (boot `?lesson=01`/`?lesson=02`) | ✅ captures identical to Phase 3 baseline |

For full details and the SHA-256 table, see `TEMPLATE_COPY_REPORT.md`.
For Phase 3 evidence, see `PHASE_3_RESULT.md`.
For Phase 4 evidence, see `PHASE_4_RESULT.md`.

---

## Creating a new lesson (Phase 4 gate)

1. Author `js/lesson-XX.js` following the contract in the header comment of `schema/lesson-schema.js` (15 top-level keys; phases `P1..P7` in order; targeted refs; no orphan letters).
2. The file **must** end with `Object.freeze(LESSON);` and `meta.id` must be `lesson-XX` (matches the filename).
3. Run the gate: `node schema/lesson-schema.js js/lesson-XX.js`.
4. **Gate passes only at 0 errors (exit 0).** Warnings are documented non-blocking authoring notes — review them; add/refresh the corresponding note in this manifest if a new one appears.
5. Add the new file to the template (classification + file count) and re-run the full manifest verification checklist.