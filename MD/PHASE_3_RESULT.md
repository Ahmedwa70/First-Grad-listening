# PHASE_3_RESULT.md

> **Phase 3 — Multi-Lesson Template Proof**
> **Date:** 2026-09-18
> **Scope:** `new_template` only (`_RELEASE` untouched as frozen source)

---

## 1. Objective

Prove the same template — one `lecture.html` + one shared runtime
(`js/app.js`, `js/engine/*` ×3, `js/activities/*` ×7, `css/*` ×2, `assets/*`) —
serves **all lessons** from data-only files `js/lesson-XX.js`, selected by URL
`lecture.html?lesson=XX`.

**Result:** ✅ Proven end-to-end for lessons 01 (ب ت ث ن) and 02 (ج ح خ ع), with
zero behavioural difference for lesson 01 vs the pre-change static build, zero
cross-lesson data leakage, and zero coupling in the template code.

---

## 2. Files changed / created (* = new)

| File | Change | SHA-256 |
|------|--------|---------|
| `lecture.html` | Pre-change snapshot | `1BD8283FCEBA5B5EA7600FAA851A983025DBC493DE18AA3A66A19F433FD92D34` |
| `lecture.html` | Post-change | `CB2C9D3C3903391B18C7800841A6DB1B6FE9ECCC2E9C2A4E170A42DE45F43A3B` |
| *`js/loader.js` | New — query-param lesson loader | `B335E6EEB62A522E03112C6E06F9593B8E017ADD4A1FC443B075C49150FD953A` |
| *`js/lesson-02.js` | New — Lesson-02 data (ج ح خ ع) | `96BEB452959C2C76AF8052BA12327CEBA582ED7F4B2EEC3A34E3AE80D9F20A10` |

**What changed in `lecture.html` (only):**
- Line ≈216: `<script src="js/lesson-01.js"></script>` → `<script src="js/loader.js"></script>`.
- Three documentation comments updated (`LESSON_XX` → `LESSON`; copy-note replaced
  by loader note). No structural/behavioural markup changed.

`loader.js` reads `/^[?&]lesson=(\d{2})/` (default `01`), writes
`<script src="js/lesson-XX.js">` **synchronously during HTML parsing**, keeping the
constraint that `LESSON` is defined **before** `js/app.js` (`app.js:210`
`const phases = LESSON.phases;`).

**Verified untouched (byte-identical to pre-Phase 3):**
`js/app.js`, `js/lesson-01.js`, `css/*` (2), `js/engine/*` (3), `js/activities/*` (7).
Drift check at W5: **0** mismatches.

---

## 3. Workstream evidence

### W0 — Rollback baseline ✅
`lecture.html` backed up to harness dir with SHA-256 snapshot before any edit.
Pre/post diff proved limited to the four intended lines (loader tag + 3 comments).
Rollback = restore backup + delete `js/loader.js` and `js/lesson-02.js`.

### W1 — Loader rewrite ✅
- `node --check js/loader.js` → OK.
- Boot harness `phase3-boot.js` (executes the **real** loader code against a
  captured `document` stub, then loads the resolved lesson in script order).
- `lecture.html?lesson=01` → **title OK, color parity OK, P1–P7 + P6-D2 sequences
  all OK** (4/3/4/2/3/8/10/17 steps).
- **Loader vs static baseline:** content-zone snapshots byte-identical
  (`shots identical: true`) → loader introduces zero behavioural change for lesson 01.

### W2 — No `LESSON_01` in executable code ✅
Grep across `new_template`: 0 occurrences in `.js`. Single occurrence remains in
`css/style.css:2877` inside an **HTML comment** (documentation; file frozen —
kept, recorded as a non-executable false positive).

### W3 — Engine-level regression ✅
- `jsdom-diff.js` (pre-Phase2 app backup vs fresh `_RELEASE`): **DIFF SAME** for
  P1/P2/P3/P4/P5/P6/P6-D2/P7.
- Legacy `lecture-01.html` (Phase 1 page) → **still boots P1–P7** (kept, not deleted).

### W4 — Lesson-02 data file ✅
`js/lesson-02.js` mirrors the `lesson-01.js` schema **shape** (union-signature
comparison across 15 top-level branches), frozen via `Object.freeze`, with:

| Field | Value |
|-------|-------|
| Letters / ids | ج (jeem) · ح (haa) · خ (khaa) · ع (ayn) |
| Facts (dots) | 1 / 0 / 0 / 0 — dotless ح, خ, ع (factual correction vs the
  earlier plan draft which said 0/0/0/1) |
| Words | جَوْز · حَمَل · خَطّ · عَسَل · حَرْف (all target char at position 0) |
| Colors | `#B03A2E` · `#2E86C1` · `#6C3483` · `#117864` (+hero shades) — fully disjoint from the Lesson-01 palette |
| meta | `id lesson-02`, docTitle «المحاضرة الثانية — ج ح خ ع», welcome hints, completion, nextLesson «الحروف (س • ش • ص)» |
| Data probe | **ALL PASS** (schema shape, freeze, facts, fingerCountMap, phase ids P1–P7, shared 29-char alphabet identical) |
| Boot | `?lesson=02` → title OK, color OK, **P1–P7 + P6-D2 all OK**, exits 0 |

### W5 — Shared template, zero leakage ✅
- Same `lecture.html` boots **both** lessons from the same engine set.
- All **8 content sequences diverge** between 01 and 02 (data drives output).
- **Leak scan (token-level, boundary-aware; bare letter chars excluded because the
  shared alphabet ring legitimately renders 29 letters in both lessons):**
  - Lesson-02 output contains **ZERO** Lesson-01 tokens (ids `ba/ta/tha/nun`,
    names باء/تاء/ثاء/نون, words بَاب/بَيْت/تَمْر/ثَوْب/نَار, phrases «المحاضرة الأولى» …).
  - Lesson-01 output contains **ZERO** Lesson-02 tokens (ids `jeem/haa/khaa/ayn`,
    names جيم/حاء/خاء/عين, words جَوْز/حَمَل/خَطّ/عَسَل/حَرْف, phrases «المحاضرة الثانية» …).
  - **False positives eliminated:** `ba/ta` inside template CSS class names
    (`p1-card-method-*bar*`, `p1-con*ta*iner`) and «عين» inside the shared generic
    instruction «أَعينهم» are excluded by boundary rules.

### W6 — Coupling audit ✅

| # | Coupling category | Verdict | Evidence |
|---|-------------------|---------|----------|
| 1 | **Positional** — `LESSON.phases[2]` (P3 hook in `app.js`) | Managed (weak, fixed order) | P1…P7 order enforced by schema probe; both lessons keep order |
| 2 | **Data-key** — letter/word/round ids resolved via `find/map` | Zero | Lesson-01 ids absent from Lesson-02 and vice-versa (W5); all order arrays keyed by data |
| 3 | **Visual/colour** — per-letter `color` | Zero | Palettes disjoint (probe PASS); hero colours data-driven |
| 4 | **Text/convention** — `LESSON_XX` refs | Zero executable | W2 (0 in `.js`); only a comment false positive in frozen `style.css` |
| 5 | **Assets** — `assets/...` paths | Template 100% / Lesson-data pending | `asset-scan`: **TEMPLATE-CORE missing = 0**; Lesson-02's 13 paths are distinctive and "قيد الإنتاج" — runtime falls back to TTS (`AudioManager`, `speechSynthesis`) |

### W7 — Full verification ✅
All gates green: W1 boot + identical baseline, W2 grep, W3 jsdom-diff DIFF SAME +
legacy boots, W4 probe/probe boot, W5 divergence + zero leaks, W6 audit, shared-file
staleness 0.

---

## 4. How to boot

```
lecture.html            → lesson 01 (default)
lecture.html?lesson=01  → lesson 01
lecture.html?lesson=02  → lesson 02
```

A future lesson = add `js/lesson-XX.js` with the same schema (no template copy).

---

## 5. Open items (non-blocking)

- `assets/audio|video/*` for letters ج ح خ ع and their words do not exist yet →
  AudioManager TTS fallback covers runtime; paths already reserved and
  Lesson-01-distinct. Add the real recordings before classroom use.
- `css/style.css:2877` comment references `LESSON_01` (frozen file; left as-is,
  documentation-only).
- `js/lesson-02.js` `chinesePinyin` cribs (`吉/哈/咳/哎`) are teaching
  approximations to be reviewed by a Chinese-language expert.