# LAYOUT_CENTERING_FIX_RESULT.md — Variable-Count Card Collections (RTL)

Scope: implementation + verification report for the variable-count card centering defect diagnosed in
`LAYOUT_CENTERING_AUDIT.md`. CSS/layout only. This document follows the same A–M structure as the audit.

- Target: `RELEASE/v1.2/new_template`
- Date: 2026-09-18
- Status: COMPLETE — implemented, verified, regression-clean.
- Evidence: real headless Chrome (1920×1080, 1366×768, 900×800, 390×844), jsdom boot harness, schema validator, SHA-256.

---

## A. Executive Summary

**Defect.** Variable-count card *collections* (1–6 items) hugged the RTL start (right) with a large empty
gap on the left, because each collection was a `grid` with a **fixed** column count and `1fr` tracks. With
no free space, `justify-content` is inert, and RTL fills right→left, leaving the unused tracks empty on the left.

**Fix (implemented).** All 7 collections were converted from grid to a **flex-wrap** primitive:

```css
display: flex;
flex-wrap: wrap;
justify-content: center;
align-content: stretch;
gap: <unchanged>;
```

with each card given a **fixed main size**: `flex: 0 1 <basis>; max-width: <basis>;` where `<basis>` equals
the collection's previous per-card width at its native count. `flex-grow: 0` keeps cards fixed-size;
`justify-content: center` centers **every** wrapped line.

**Deviation from the originally-mandated technique (approved).** The task prescribed
`repeat(auto-fit, minmax(...)) + justify-content: center`. Empirical testing in Chrome/Edge proved that
technique cannot satisfy the required numeric proof:

1. `auto-fit` computes its repetition count from the **definite max track size** (CSS Grid §7.2.3.1), so
   `minmax(min(100%,10rem), 16.5rem)` resolves to **3 columns** in a 1100px box (not 6); 4 cards then wrap 3+1.
2. `auto-fit` shares **one** track set for all rows, so a wrapped last row aligns to the RTL start — it can
   never be centered.

The user was presented this evidence and **approved switching to flexbox wrap + center** (the only CSS-only
option that centers every line, keeps fixed card sizes, and passes the proof). No JS, no count variable, no
per-count CSS was used.

**Outcome.** `|leftGap − rightGap| = 0px` for all 7 collections × counts 1–6 × all four viewports (RTL).
Native-count card sizes are preserved within 2px. Boot/leak for lessons 01/02/03 = `title:OK | color:OK | leak:ZERO`.
Schema validators = 0 errors. Only `css/style.css` changed; all JS/data/schema files are byte-identical.

---

## B. Root Cause

- Phase containers already center their **box** (`#content-zone { display:flex; justify-content:center }`,
  `.app-layout` grid). The defect is inside each collection's **track model**.
- Legacy declarations used fixed counts (`repeat(4,1fr)`, `repeat(5,1fr)`, …). With `1fr` tracks the collection
  always fills its box; `justify-content` has nothing to distribute. In RTL, items fill from the right, so a
  1–3 item set leaves empty tracks on the left → the visual "hugs the right" symptom.
- Stale responsive overrides (`repeat(2,1fr)`, `repeat(3,1fr)`) re-introduced the same fixed-track behavior at ≤900px.
- Secondary root cause (why the prescribed grid fix fails): `auto-fit` repetition uses the definite max track
  size, and `auto-fit` cannot center a wrapped row. Full probe evidence in section F.

---

## C. Affected Screens

| # | Collection | Phase / file | Native cards | Container box |
|---|------------|--------------|--------------|----------------|
| 1 | `.p2-sound-buttons` | P2 `phoneme-explore.js` | 3 | `.p2-container` (1100px) |
| 2 | `.quad-grid` | P3 `letter-reveal.js` | 4 | `.p3-container` (1100px) |
| 3 | `.p3-assess-choices` | P3 `assessment` | 4 | `.p3-container` (min(1000px,94vw)) |
| 4 | `.p4-compare-grid` | P4 `stroke-video.js` | 2 | `.p4-container` (1036px) |
| 5 | `.p5-quad-grid` | P5 `word-reveal.js` | 5 | `.p5-container` (max 1200px) |
| 6 | `.p5-assess-choices` | P5 `word-reveal.js` | 5 | `.p5-container` (max 1100px) |
| 7 | `.summary-grid` | P7 `assessment-quiz.js` | 4 | `.p7-summary` (1056px) |

Only `css/style.css` carries their track declarations; `responsive-system-v1.1.css` had none.

---

## D. Current Architecture (post-fix)

- **Layout chain:** `#content-zone` (flex, centered) → phase container → collection → cards.
- **Cascade order:** `style.css` first, `responsive-system-v1.1.css` last. The fix lives in `style.css` base rules.
- **Shared primitive** applied identically to all 7 collections:

```css
display: flex;
flex-wrap: wrap;
align-content: stretch;
justify-content: center;
```

- **Card sizing** (fixed main size, no grow):

| Collection | Card selector | `flex-basis` / `max-width` | ≈ px |
|------------|---------------|----------------------------|------|
| `.p2-sound-buttons` | `.sound-btn` | `16.3125rem` | 261 |
| `.quad-grid` | `.quad-card` | `16.5rem` | 264 |
| `.p3-assess-choices` | `.p3-assess-choice` | `14.5625rem` | 233 |
| `.p4-compare-grid` | `.p4-compare-card` | `15.125rem` | 242 |
| `.p5-quad-grid` | `.p5-quad-card` | `13.875rem` | 222 |
| `.p5-assess-choices` | `.p5-assess-choice` | `12.625rem` | 202 |
| `.summary-grid` | `.summary-card` | `15.5rem` | 248 |

---

## E. Shared vs Independent Causes

- **Shared:** all 7 collections failed for the same reason — a fixed track model with no distributable space.
- **Independent:** the stale `@media` overrides were a separate, redundant layer that re-imposed fixed counts at
  ≤900px; they were removed so behavior is fully governed by flex-wrap.
- Because the cause is shared, one consistent primitive fixes all seven; no per-screen special cases exist.

---

## F. Candidate Solutions

Probe results (real Chrome, 1100px box, RTL, 1920×1080):

| Approach | N=1 | N=3 | N=4 | N=6 | Verdict |
|----------|-----|-----|-----|-----|---------|
| `minmax(min(100%,10rem), 16.5rem)` (mandated) | 3 cols | 3 cols | **wraps 3+1** | wraps | **rejected** |
| `minmax(min(100%,10rem), 1fr)` | card **1100px** | cards spread 356 | 263 ✓ | 170 ✓ | rejected (stretch/spread) |
| flex `wrap` + `justify-content:center` + fixed basis | 264 centered | 824 centered | 263 centered | per-line centered | **chosen** |

Conclusion: the mandated grid technique is technically infeasible for the required proof. Flexbox is the only
CSS-only option that centers each wrapped line while preserving fixed card sizes. (A `--collection-count` JS
variable was **not** required and was not used.)

---

## G. Recommended Architecture (implemented)

- One shared flex-wrap primitive for all variable-count collections.
- Fixed card main size via `flex: 0 1 <basis>` (grow = 0 → cards never stretch; shrink = 1 → a single card can
  shrink if the viewport is narrower than one card).
- `justify-content: center` centers each line; this is direction-aware and therefore correct in RTL.
- `align-content: stretch` (and default `align-items: stretch`) preserves the previous full-height behavior of
  stretched card rows (notably P2).
- Grid layout is retained only where it is genuinely fixed/structural (P1 alphabet, etc.).

---

## H. Variable Count Strategy (1 → 6)

Per-line capacity at 1920 is determined by `floor((container + gap) / (basis + gap))`:

| Collection | Container | Basis | Per line @1920 | 1–4 behavior | 5–6 behavior |
|------------|-----------|-------|----------------|--------------|--------------|
| `.p2-sound-buttons` | 1100 | 261 | 4 | one centered row | wraps (4+1 / 4+2), each line centered |
| `.quad-grid` | 1100 | 264 | 4 | one centered row | wraps, each line centered |
| `.p3-assess-choices` | 1000 | 233 | 4 | one centered row | wraps, each line centered |
| `.p4-compare-grid` | 1036 | 242 | 4 | one centered row | wraps, each line centered |
| `.p5-quad-grid` | 1200 | 222 | 5 | one centered row | 5 fits; 6 wraps |
| `.p5-assess-choices` | 1100 | 202 | 5 | one centered row | 5 fits; 6 wraps |
| `.summary-grid` | 1056 | 248 | 4 | one centered row | wraps, each line centered |

Native counts always render as a single centered row. Higher counts wrap and remain centered line-by-line.

---

## I. RTL Strategy

- `direction: rtl` was preserved on the collections that had it (P2, quad, p5, summary) via the flex container.
- Flexbox lays items right→left, and `justify-content: center` centers the line regardless of direction; there
  is no reliance on `margin`, `left/right`, `transform`, `:nth-child`, `:has`, or per-count rules.
- Verified numerically under `dir="rtl"` for every count and viewport.

---

## J. Risk Analysis

| Risk | Mitigation / result |
|------|---------------------|
| Exact-fit boundary fragility (4×263 + 3×16 = 1100.0 exactly wrapped in Chrome) | Every basis carries a ~2px safety margin; native counts now fit one row with a small centered margin |
| Wrapped last line not centered | Eliminated — flex `justify-content:center` centers each line (grid could not) |
| Loss of fixed card size | `flex-grow:0` keeps size; only an undersized viewport triggers shrink |
| Loss of stretched full-height cards (P2) | `align-content: stretch` + `align-items: stretch` retained |
| Cascade/specificity conflicts | Base rules in `style.css`; `responsive-system-v1.1.css` had no competing track declarations |
| Responsive regressions | Stale fixed-count `@media` overrides removed; flex-wrap handles ≤900px and phone naturally |
| Forbidden workarounds | None used (no margin/left/right/transform/nth-child/:has/per-count, no JS) |

Residual note: at an artificial 390px viewport, `.p3-assess-choices`'s *box* is offset 7px from the content
center (`CollVsOuter=7`). This is pre-existing container-level behavior, untouched by this change, and the group
is still centered within its box (`AbsDiff=0`). At 900/1366/1920 the box offset is 0.

---

## K. Files Changed

**Changed:** `css/style.css` only.

```
was: FC13C818CE69C985437BD98D04B0EC0D1156EB72EF00C5347B4AE0235B021A71
now: 7D459C6A9C5CFF3670DAA721692CED34462CD8E796818A9C0F3A5774D016F727
```

**Unchanged (SHA-256 verified byte-identical):**

| File | SHA-256 (before = after) |
|------|--------------------------|
| `js/app.js` | `E0CC6D38A1F4434C4756A8D4BDD4C5B79629ADC317C72370158085A6FE09BA96` |
| `js/lesson-01.js` | `591804C32A8B9451A4D94712531C9760A9AC2EABF095A53AAAAEF69535F92B09` |
| `js/lesson-02.js` | `96BEB452959C2C76AF8052BA12327CEBA582ED7F4B2EEC3A34E3AE80D9F20A10` |
| `js/lesson-03.js` | `8912D70E31ED83F13733B8B9859392EF3A36B747609DE11E40AAC4BEE8AF1391` |
| `js/loader.js` | `B335E6EEB62A522E03112C6E06F9593B8E017ADD4A1FC443B075C49150FD953A` |
| `schema/lesson-schema.js` | `8E6B3EB8E487E04A4461C8E277DBA90EB7E106CC32841158A433CBFB65843C88` |
| `css/responsive-system-v1.1.css` | `F86DE38B159645FAB99804AC5E5DA137B7A1705BECD5E0AE7185AA487939240E` |

No loaders, renderers, lesson data, schema, engine, or manifest files were modified.

---

## L. Implementation (as executed)

All edits are in `css/style.css` (line numbers post-edit).

**1. Flex primitive for each collection** (grid → flex-wrap + center + stretch):

- `.p2-sound-buttons` (L1336): `display:grid; grid-template-columns: repeat(4,1fr); grid-template-rows:1fr` →
  `display:flex; flex-wrap:wrap; align-content:stretch; align-items:stretch; justify-content:center`.
- `.quad-grid` (L1846), `.p3-assess-choices` (L1993), `.p4-compare-grid` (L2456), `.p5-quad-grid` (L3089),
  `.p5-assess-choices` (L3217), `.summary-grid` (L5816): grid declarations replaced with the flex primitive
  (`summary-grid` keeps `align-items:stretch`, `flex:1 1 auto`, `min-height:0`; `p4` keeps `flex:1`; `p5` keeps
  widths/max-widths).

**2. Fixed card sizing** (`flex: 0 1 <basis>; max-width: <basis>`):

- `.sound-btn` L1354-1355 `16.3125rem`; `.quad-card` L1865-1866 `16.5rem`; `.p3-assess-choice` L2005-2006
  `14.5625rem`; `.p4-compare-card` L2473-2474 `15.125rem`; `.p5-quad-card` L3102-3103 `13.875rem`;
  `.p5-assess-choice` L3230-3231 `12.625rem`; `.summary-card` L5831-5832 `15.5rem`.

**3. Stale fixed-count `@media` overrides neutralized:**

- Removed `.p2-sound-buttons { repeat(2,1fr) }`, `.quad-grid { repeat(2,1fr) }`,
  `.p3-assess-choices { repeat(2,1fr) }` from the `max-width:900px` block (now L2202-2207).
- Removed `@media(max-width:900px){ .p5-quad-grid { repeat(3,1fr) } }` and the `.p5-quad-grid { repeat(2,1fr) }`
  line from the 600px block (`.p5-container` rule retained, L3165).
- Removed `@media(max-width:900px){ .p5-assess-choices { repeat(3,1fr) } }` and
  `@media(max-width:600px){ .p5-assess-choices { repeat(2,1fr) } }`.
- Removed `.p4-compare-grid { repeat(2,1fr) }` from its responsive block (now L5999-6000).
- No unrelated media queries were deleted.

No comments were added; no forbidden workaround patterns were used.

---

## M. Verification Results

**M.1 Numeric centering proof (real Chrome headless, RTL).**
`leftGap = groupLeft − boxLeft`, `rightGap = boxRight − groupRight`, PASS = `|leftGap − rightGap| ≤ 1px`.
Result: `AbsDiff = 0` for **every** collection × count (1–6) × viewport (1920×1080, 1366×768, 900×800, 390×844),
and `Overflow = 0` everywhere. Representative 1920×1080 rows:

```
KEY                N  GroupW  LeftGap  RightGap  AbsDiff  Rows
p2-sound-buttons   1  261     420      419       0        1
p2-sound-buttons   4  1092    4        4         0        1
quad-grid          1  264     418      418       0        1
quad-grid          4  1092    4        4         0        1
p3-assess-choices  3  739     131      131       0        1
p4-compare-grid    1  242     397      397       0        1
p5-quad-grid       5  1190    5        5         0        1
p5-assess-choices  5  1090    5        5         0        1
summary-grid       1  248     404      404       0        1
```

**M.2 Native-count card-size preservation.** Card widths at native counts are within 2px of the legacy grid
values (e.g. P2 261 vs 263; quad 264 vs 266; summary 248 vs 249.6), so 4-card lessons look effectively unchanged
while the group is now centered.

**M.3 Boot / leak regression (lessons 01/02/03):**

```
01 :: P1:ok(4) | P2:ok(3) | P3:ok(4) | P4:ok(2) | P5:ok(3) | P6:ok(8) | P6-D2:ok(10) | P7:ok(17) | title:OK | color:OK | leak:01:ZERO
02 :: ... same ... | title:OK | color:OK | leak:02:ZERO
03 :: ... same ... | title:OK | color:OK | leak:03:ZERO
```

**M.4 Schema validators:** `lesson-01` = 0 errors / 0 warnings; `lesson-02` = 0 errors / 4 known non-blocking
warnings; `lesson-03` = 0 errors / 2 known non-blocking warnings. Self-test = 4/4 detected. No data change.

**M.5 Hash check:** only `css/style.css` changed (see section K); all JS/data/schema hashes byte-identical.

**M.6 Source audit:** `repeat(N,1fr)` occurrences on the 7 collections = 0; leftover `auto-fit` = 0; the only
remaining fixed grids are legitimate structural ones (`.p1-stage .alpha-grid` `repeat(14/7, minmax(0,1fr))`,
`--d3-columns` grid, P4 card internals). CSS brace balance = 1367/1367.

**Conclusion:** the variable-count centering defect is fixed and verified; no scope outside the seven
collections and their stale responsive overrides was touched.
