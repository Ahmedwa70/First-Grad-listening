# LAYOUT_CENTERING_AUDIT.md — Variable-Count Card Collections (RTL)

> **Date:** 2026-09-18
> **Mode:** READ-ONLY architectural audit. **No runtime file was modified.** The only artifact produced is this report.
> **Scope:** Why a collection of cards (1–6 items, Arabic/RTL, target 1920×1080) is not centered — it visibly drifts to the right when the lesson has fewer cards than the layout expects — and which architecture should make the *collection* self-center.
> **Status:** ✅ Root cause located in `css/style.css`. Recommendation below. Awaiting approval before any fix.

**Evidence limitation:** the request referenced attached screenshots, but **no image was present in this conversation**. All findings are from source inspection of `css/style.css`, `css/responsive-system-v1.1.css`, `lecture.html`, and the renderers under `js/activities/*` and `js/engine/*`.

---

## A. Executive Summary

- **The parent *box* is already centered. The card *collection* inside it is not.**
  `#content-zone` is `display:flex; justify-content:center` and every phase container has a max-width, so the container is horizontally centered. But the grids that hold the cards are declared with a **fixed track count** — `grid-template-columns: repeat(4, 1fr)` (or `repeat(5, 1fr)`) — that was written for the **maximum** lesson size, never for the actual item count.
- With `1fr` tracks there is **no leftover free space for `justify-content` to distribute**, so the tracks always stretch edge-to-edge. In RTL, grid columns flow **right → left**; a 3-item lesson fills the rightmost 3 tracks and leaves the leftmost track(s) empty. The occupied cards therefore hug the **right** edge of a centered box → the reported "group shifted to the right."
- **Seven collection grids carry the defect**, spanning P2, P3, P4, P5 and P7. All seven share **one identical cause**; they are separate rules only because they are separate selectors.
- **The codebase already contains two correct patterns for this exact problem**: P1's `.p1-hero-letters` (`display:flex; justify-content:center`) and P6-D3's `.p6-d3-columns` (`repeat(var(--d3-columns), minmax(0,1fr))`, count supplied by the renderer). The fix should reuse an existing pattern, not invent a new abstraction.
- **Recommended:** make every collection a count-agnostic, self-centering container — primarily CSS-only via `grid-template-columns: repeat(auto-fit, minmax(<min>, <max>))` + `justify-content:center` (fallback: flex-wrap + `justify-content:center`). No engine, schema, loader, or data change. No `margin-right`, no `translateX`, no `left:`, no per-count special-casing.

---

## B. Root Cause

### B.1 The centering that already works (and why it is not enough)
`css/style.css:565`
```css
#content-zone {
  grid-area: content;
  display: flex;
  align-items: flex-start;
  justify-content: center;   /* ← centers the phase container BOX */
  ...
}
```
Each phase container is therefore centered as a box (`max-width:1100px` etc.). This is correct and should stay.

### B.2 The defect
Collections are grids with a hardcoded number of equal `1fr` tracks, e.g. `css/style.css:1341`:
```css
.p2-sound-buttons { grid-template-columns: repeat(4, 1fr); direction: rtl; }
```
Two independent CSS facts combine into the symptom:

1. **`1fr` consumes all free space.** `fr` tracks grow to fill the grid's content box. There is never any "leftover" space, so `justify-content` (even if it were set) would have nothing to center. The *tracks* are always spread across the full box.
2. **RTL grid flow is right → left.** The first track is the rightmost; items are placed into tracks `1,2,3,…` from the right. With 3 items in a 4/5-track grid, tracks `1..3` (right) are filled and the trailing track(s) on the **left** stay empty.

Net result: a full-width, correctly-centered box whose **contents are pinned to the right** with an equal-width hole on the left.

### B.3 "Centered box" vs "centered tracks" — the crux
Centering the container (B.1) centers the *rectangle*. The requirement is to center the *occupied cells inside the rectangle*. These are different operations, and the current CSS only performs the first. Any valid fix must act on the **track/child distribution**, never on the box and never with a manual RTL-computed offset.

### B.4 Secondary contributing factor — stale maximum
The fixed counts (`4` for P2/P3/P4/P7, `5` for P5) are the **maximum** expected count. Lesson 01/02 have 4 letters, so the bug is invisible there. Lesson 03 has **3** letters, so every one of these grids now has exactly one empty trailing track (P5 has two). The defect was always present; only variable-count lessons expose it.

---

## C. Affected Screens

Counts in the table are for the current lesson 03 (3 letters / 3 words), which is the exposed case.

| # | Phase | Screen | Selector | Line | Current tracks | Actual items | Trailing empty tracks (RTL left) |
|---|-------|--------|----------|------|----------------|--------------|----------------------------------|
| 1 | P2 | أصوات الحروف (`phoneme-explore`) | `.p2-sound-buttons` | 1341 | `repeat(4,1fr)` | 3 | 1 |
| 2 | P3 | عرض الحروف المتعدّد (`letter-reveal`, quad) | `.quad-grid` | 1844 | `repeat(4,1fr)` | 3 | 1 |
| 3 | P3 | تقييم الحروف (`letter-reveal`, assess) | `.p3-assess-choices` | 1987 | `repeat(4,1fr)` | 3 | 1 |
| 4 | P4 | مقارنة الكتابة (`stroke-video`, compare) | `.p4-compare-grid` | 2449 | `repeat(4,1fr)` | 3 | 1 |
| 5 | P5 | مراجعة الكلمات (`word-reveal`, quad) | `.p5-quad-grid` | 3078 | `repeat(5,1fr)` | 3 | 2 |
| 6 | P5 | استمع واختر الكلمة (`word-reveal`, assess) | `.p5-assess-choices` | 3206 | `repeat(5,1fr)` | 3 | 2 |
| 7 | P7 | ملخّص الإنجاز (`assessment-quiz`, summary) | `.summary-grid` | 5807 | `repeat(4,1fr)` | 3 | 1 |

**Media-query variants keep the same defect** (they only change the fixed number):
- `css/style.css:2191` `.p2-sound-buttons { repeat(2,1fr) }`
- `css/style.css:2196` `.quad-grid { repeat(2,1fr) }`
- `css/style.css:2197` `.p3-assess-choices { repeat(2,1fr) }`
- `css/style.css:3148` `.p5-quad-grid { repeat(3,1fr) }` and `:3151` `{ repeat(2,1fr) }`
- `css/style.css:3271` `.p5-assess-choices { repeat(3,1fr) }` and `:3274` `{ repeat(2,1fr) }`
- `css/style.css:5988` `.p4-compare-grid { repeat(2,1fr) }`

**Not affected (single card, already centered):** `.p3-card-wrapper` (P3 single letter), `.p4-card-wrapper` (P4 single), `.p7-assessment-card` (P7 question). **Already correct (flex-centered collections):** `.p1-hero-letters` (L909/6446), `.finger-map` (L1522), `.p5-history-strip` (L2810, shrink-to-fit inside `.p5-container` `align-items:center`), `.p6-round-nav` (L3313). **Fixed-size, not variable:** `.alpha-grid` (P1, always 28 chars, `repeat(14,…)` L1079).

---

## D. Current Architecture

### D.1 Layout chain
```
html[dir="rtl"]                       (lecture.html)
 └─ .app-layout  display:grid         (style.css:372)
     └─ #content-zone  display:flex; justify-content:center; align-items:flex-start   (style.css:565)
         └─ .pN-container              (max-width:1100px etc.; box centered)
             └─ .<collection-grid>     repeat(N,1fr)   ← DEFECT HERE
                 └─ .<card>
```
Proven for each phase:
- `.p2-container` `style.css:6602+` — grid item, centered by `#content-zone`.
- `.p3-container` `style.css:1554` — `flex; align-items:center`.
- `.p4-container` `style.css:2204` — `flex; max-width:1100px; margin-inline:auto`.
- `.p5-container` `style.css:2490` — `flex; align-items:center`.
- `.p7-summary` `style.css:5751` — `flex; width:100%` (so `.summary-grid` spans full width → defect fully visible).

### D.2 Stylesheet order
`lecture.html` loads `css/style.css` **then** `css/responsive-system-v1.1.css`. The responsive layer (`:root` v11 tokens, shell/content-zone sizing) **does not declare a single `grid-template-columns`** (verified: zero `repeat(` matches), so it neither causes nor currently corrects the defect. It only changes container sizes (`#content-zone`, `.activity-shell`, `.p2-sound-buttons` block-size).

### D.3 Existing correct precedents inside this same codebase
1. **Flex-centered collection** — `css/style.css:909` / `:6446`:
   ```css
   .p1-hero-letters { display:flex; align-items:center; justify-content:center; direction:rtl; gap:clamp(12px,2vw,24px); }
   .p1-hero-stage-card .p1-hero-letters .hero-char { flex:0 1 clamp(90px,11vw,130px); min-width:clamp(84px,10vw,120px); }
   ```
   Centers 3 or 4 cards correctly. **This is Approach A already validated in production.**
2. **Count-driven grid variable** — `js/activities/auditory-discrimination.js:506`:
   ```js
   <section class="p6-d3-sequence p6-d3-count-${d3Count}" style="--d3-columns:${d3Count}" …>
   ```
   with `css/style.css:4131`:
   ```css
   .p6-d3-columns { grid-template-columns: repeat(var(--d3-columns), minmax(0,1fr)); }
   ```
   Because the track count **equals** the item count, there is no dead track and the row appears centered. **This is the existing, accepted mechanism for a variable-count grid** and is the natural template to reuse if equal-width columns are required.

---

## E. Shared vs Independent Causes

| Aspect | Verdict | Detail |
|--------|---------|--------|
| Stale fixed track count | **Shared (single cause)** | All 7 selectors: `repeat(4/5,1fr)` written for the max lesson, not the actual count. |
| `1fr` tracks erase free space | **Shared** | Prevents any centered-track behavior even if `justify-content` were added. |
| RTL right→left fill | **Shared** | Makes empty trailing tracks appear on the *left* → visual "shift right." |
| Box already centered | **Shared** | `#content-zone justify-content:center` + container max-widths. |
| Parent context | **Independent (cosmetic)** | P2 grid lives inside a `display:grid` parent (`.p2-container`), the others inside flex columns; irrelevant to the cause but affects the chosen fix's integration. |
| Max-width caps | **Independent** | P3 assess `min(1000px,94vw)`; P5 quad `1200px`; P5 assess `1100px`; others `100%`. |
| `flex:1` growth | **Independent** | `.p4-compare-grid` and `.summary-grid` have `flex:1` / `flex:1 1 auto`, forcing full width (amplifies the hole). |
| Media-query variants | **Independent copies** | Same defect at small breakpoints with smaller fixed counts. |
| Single-card screens | **Not affected** | P3/P4 single, P7 question. |

**Conclusion:** one shared root cause, one shared remedy. Fixing each selector consistently is sufficient; no per-phase logic is needed.

---

## F. Candidate Solutions

| Approach | Centers collection? | RTL-safe | 1–6 cards | 1920×1080 | No overflow | Stable card width | Maintainability | CSS-only | Fits current arch | Per-count hardcoding |
|----------|--------------------|----------|-----------|-----------|-------------|-------------------|-----------------|----------|-------------------|----------------------|
| **A. Flex + `justify-content:center` + wrap** | ✅ | ✅ | ✅ | ✅ | ✅ (wraps) | ✅ with `flex:0 1 clamp(min,ideal,max)` | ✅ high | ✅ | ✅ (P1 precedent) | none |
| **B. Grid + JS `repeat(var(--n),1fr)`** | ✅ (count == items) | ✅ | ✅ | ✅ | ⚠️ no wrap by default | ✅ equal | ⚠️ needs renderer count | ❌ JS data-attr | ✅ (D3 precedent) | none (uses real count) |
| **C. Grid centered tracks: `repeat(var(--n), minmax(0,<max>))` + `justify-content:center`** | ✅ | ✅ | ✅ | ✅ | ⚠️ no wrap | ✅ capped | ⚠️ needs count + max tuning | ❌ JS var | ✅ (D3 variant) | none (uses real count) |
| **D. Intrinsic container + `margin-inline:auto` (`width:fit-content`) + fixed cards** | ✅ | ✅ | ✅ | ✅ | ⚠️ may overflow if 6×wide | ✅ | ⚠️ brittle widths | ✅ | ⚠️ changes box model | none (but fixed card widths) |
| **E. `fit-content`/`max-content` tracks** | ✅ | ✅ | ⚠️ fragile | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ✅ | ⚠️ | none |
| **F. `repeat(auto-fit, minmax(<min>,<max>))` + `justify-content:center`** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ capped | ✅ high, no JS | ✅ | ✅ | none |
| **G. JS counts items and mutates layout (classes/margins/rows)** | ✅ | ⚠️ | ✅ | ✅ | ✅ | ✅ | ❌ lowest | ❌ | ⚠️ | avoids, but adds runtime coupling |
| **H. `:has()`/`nth-child` per-count rules (columns by count)** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ many rules | ✅ | ✅ | ❌ **per-count special-casing (forbidden)** |

**Forbidden outright (regardless of approach):** `margin-right/left`, `transform: translateX`, `left:`, or any value computed from a specific element count. **Approach H is disqualified** for that reason. **Approach G** works but adds runtime coupling that is unnecessary; keep it only as a last resort.

**Notes on A vs F:**
- **A (flex)** is the simplest, wraps gracefully for 6 items on a narrow viewport, and is already proven by `.p1-hero-letters`. Its cost: cards must carry an explicit `flex-basis` clamp, and rows do not guarantee equal card heights unless `align-items:stretch` is used.
- **F (auto-fit grid)** keeps grid semantics (equal rows, `align-items:stretch`) and needs **no JS**, no count, no renderer change. `auto-fit` collapses the empty trailing tracks, and because the remaining (capped) tracks are shorter than the container, `justify-content:center` finally has free space to center. This is the cleanest match to "driven by card count **and** width **and** available space."

---

## G. Recommended Architecture

**Make each collection a self-centering, count-agnostic box; never center cards individually.**

### G.1 Primary (CSS-only, recommended)
For every collection selector, replace the fixed 1fr tracks with intrinsic, capped tracks centered inside the container:
```css
/* pattern, not yet applied */
.<collection> {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(<min-card>, <max-card>));
  justify-content: center;          /* centers the tracks, not the box */
  gap: <existing gap token>;
  direction: rtl;                   /* keep — RTL order is automatic */
}
```
- `auto-fit` derives the track count from available width and card size → no count, no JS.
- Empty trailing tracks collapse, leaving free space → `justify-content:center` centers the **occupied** tracks.
- `<max-card>` caps card width so 1–2 items do **not** stretch absurdly; `<min-card>` drives the responsive break point, replacing the hand-written media queries.
- Applies identically to all 7 selectors and lets the existing `@media` column overrides be simplified or removed (to be decided in the fix phase).

### G.2 Structural alternative (when exact equal columns are mandatory)
If a screen must guarantee equal-width columns regardless of card intrinsic size, reuse the **already-accepted P6-D3 mechanism**: pass the real count as a CSS custom property from the renderer and use non-`1fr` tracks:
```css
.<collection> { grid-template-columns: repeat(var(--collection-count), minmax(0, <max-card>)); justify-content:center; }
```
The count comes from the same data array the renderer already iterates (`LESSON.letters`, target letters, words, `assessmentRounds`). This is declarative, uses no per-count CSS branches, and matches `--d3-columns`. It is **not** "JS changes the layout"; JS only supplies an integer.

### G.3 Shared primitive
Define the collection behavior once (a token pair for `min/max` card width and the `auto-fit + justify-content:center` rule) and apply it by adding the utility to each collection selector. Prefer applying the shared rule in `css/responsive-system-v1.1.css` (loaded last) so it overrides the legacy block cleanly and centralizes the contract — **subject to approval**, since that file is currently runtime-loaded and this report is read-only.

**Non-negotiable properties of the architecture:**
- It centers the **collection** (the group), including the midpoint of the gap for 2 cards and the true center for odd counts.
- It is derived from **item count + card size + available width**, not from a constant.
- It contains **no RTL offsets** and no writes to `left`/`margin`/`transform`.
- It adds **no engine/schema/loader abstraction**.

---

## H. Variable Count Strategy (1 → 6)

Behavior of the recommended pattern at 1920×1080 (container ≈1100–1200px, card max ≈240px, gap ≈16–24px). The *group* center always coincides with the container center.

| Cards | Occupied tracks (RTL, right→left) | Result | Notes |
|-------|-----------------------------------|--------|-------|
| 1 | 1 (centered) | Single card, centered | Capped at `<max-card>`, never stretched to full width. |
| 2 | 2 | Gap **midpoint** centered | `justify-content:center` centers the 2 tracks symmetrically. |
| 3 | 3 | Group centered | The exact reported case — no left hole. |
| 4 | 4 | Group centered | Lessons 01/02 keep their current look (no regression). |
| 5 | 5 | Group centered | Fits within max container at 1920. |
| 6 | 6, or 4+2 wrap | Centered; second row centered | If 6 × max + gaps > container, `auto-fit`/flex wraps and each row centers. |

- **Fewer items:** fewer filled tracks; `auto-fit` collapses the unused trailing tracks → the remaining group centers.
- **More items / narrow viewport:** tracks reduce to `<min-card>`; below that, wrapping keeps the group centered. This supersedes the fixed `repeat(2/3,1fr)` media queries.
- **Never** an empty track on any side once the group is smaller than the row.

---

## I. RTL Strategy

1. **Inherit `dir="rtl"`** from `<html lang="ar" dir="rtl">`; do **not** set `flex-direction: row-reverse` or `direction:ltr` on collections.
2. **Grid/flex order is automatic:** under RTL the first item is the rightmost. Centered tracks therefore preserve correct reading order with zero extra code.
3. **Centering is symmetric:** `justify-content:center` distributes equal free space on both sides → equal left/right margins for the group by construction (verifiable numerically, §M).
4. **Forbidden RTL workarounds:** `margin-right/left`, `translateX`, `left:`, `float`, or `text-align` hacks. They break when the count changes and were explicitly excluded.
5. **Keep bidi isolates** already used inside cards (`unicode-bidi: isolate`, e.g. `style.css:5915`) — the fix only touches the outer collection, not card internals.

---

## J. Risk Analysis

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Over-stretching with 1–2 cards | Medium | Visual | Cap tracks with `<max-card>` (minmax) / `flex-basis` clamp. |
| 6 wide cards overflow a narrow viewport | Medium | Layout | `auto-fit` shrinks tracks to `<min-card>`; allow wrap (flex) or a documented min. |
| Rows with unequal card heights | Low | Visual | Use grid (`align-items:stretch`) via Approach F; flex fallback sets `align-items:stretch`. |
| Specificity/ordering conflict — `css/style.css` has a **dual layer** (base ≈L1199–3400 + override block ≈L5300–7430) and `responsive-system-v1.1.css` loads last | Medium | Fix silently ignored | Apply the shared rule in the last-loaded layer, or update every redeclaration of the 7 selectors; verify computed style, not source order. |
| Existing `@media` column overrides remain and re-introduce fixed counts | High if untouched | Partial fix | Update/neutralize the media-query variants listed in §C in the same change. |
| `.p2-sound-buttons` inside a `display:grid` parent (`.p2-container`) | Low | Grid interaction | It already spans `grid-column:1/-1`; only its internal tracks change — no parent change needed. |
| `.p4-compare-grid` / `.summary-grid` `flex:1` force full width | Medium | Amplifies empty space | Keep the full-width container; centering now acts on tracks, so the empty space is split symmetrically. |
| Regression on 4-card lessons 01/02 | Medium | Trust | 4 cards already fill 4 tracks; new pattern must reproduce the look at 4 (test matrix §M). |
| Very large P5 caps (`max-width:1200/1100`) | Low | Visual | Tokenize `<max-card>` so P5 cards stay within their intended size. |
| Dark/light themes | Low | Visual | Pattern is layout-only; no color/theme interaction. |
| Print/zoom/large text | Low | Layout | `clamp()`-based card sizing continues to apply; verify at 125%/150% zoom. |

---

## K. Files Likely to Change (list only — nothing edited)

- **`css/style.css`** — the 7 collection selectors (L1341, L1844, L1987, L2449, L3078, L3206, L5807) and their fixed media-query variants (L2191, L2196, L2197, L3148, L3151, L3271, L3274, L5988). Primary change target.
- **`css/responsive-system-v1.1.css`** — optional home for the single shared collection rule/tokens (loaded last, overrides cleanly). Conditional on approval.
- **`js/activities/phoneme-explore.js`, `letter-reveal.js`, `stroke-video.js`, `word-reveal.js`, `assessment-quiz.js`** — **only if** Approach G.2 (`--collection-count`) is chosen instead of the CSS-only pattern. Otherwise untouched.
- **`lecture.html`** — no change expected.
- **`js/app.js`, `js/engine/*`, `js/loader.js`, `js/lesson-0X.js`, `schema/lesson-schema.js`, `assets/*`** — no change.

---

## L. Implementation Plan

1. **Decide approach** — approve F (CSS-only auto-fit + centered tracks) as primary, or A (flex) if wrapping behavior is preferred on narrow viewports. (No code yet.)
2. **Define tokens** — `<min-card>` / `<max-card>` and the collection rule, ideally once in the last-loaded stylesheet.
3. **Convert the 7 selectors** listed in §C, preserving each existing `gap` and `align-items`.
4. **Resolve the media queries** — replace the fixed `repeat(2/3,1fr)` overrides with the intrinsic behavior, or remove those declarations if `auto-fit` fully covers them.
5. **Optional G.2** — if equal columns are required, have each renderer output `--collection-count` from its existing data array (mirroring `--d3-columns`).
6. **Do not touch** engine, schema, loader, lesson data, or assets.
7. **Verify** per §M, then report.

---

## M. Verification Plan

### M.1 Visual matrix
- **Counts:** 1, 2, 3, 4, 5, 6 cards (use a temporary lesson/data fixture **outside** the shipped lessons, or the existing lessons 01 [4], 02 [4], 03 [3]; synthetic counts 1/2/5/6 via a throwaway local data file not committed).
- **Viewports:** 1920×1080 (primary), 1366×768, exactly the `max-width:900px` breakpoint, and one phone width.
- **Direction:** RTL only (the app is RTL-first); confirm order is correct right→left.
- **Themes:** dark and light.
- **Phases:** P2, P3 (quad + assess), P4 (compare), P5 (quad + assess), P7 (summary).

### M.2 Numeric centering proof (per collection, from DevTools or a headless script)
For the collection element `C` and its bounding rect:
```
leftGap  = groupLeft  - containerLeft      // container = centered box
rightGap = containerRight - groupRight
PASS when |leftGap - rightGap| <= 1px
```
Compute `groupLeft/groupRight` from the union of the child cards' `getBoundingClientRect()`. For **2 cards**, also assert the gap midpoint equals the container center. For **even counts**, assert group center == container center.

### M.3 DOM/automated checks
- Assert `getComputedStyle(collection).gridTemplateColumns` yields only as many track sizes as **filled** tracks (auto-fit) or exactly the item count (G.2), never the stale `4`/`5`.
- Assert no overflow: `collection.scrollWidth <= container.clientWidth + 1`.
- Re-run the existing Phase 3 boot harness to confirm no runtime regression:
  `node phase3-boot.js <abs new_template> 01|02|03` → title OK, color OK, leak ZERO.
- Re-run the schema validator to confirm no data change: `node schema/lesson-schema.js js/lesson-0X.js` → 0 errors.

### M.4 Source checks
- `grep -n "repeat([0-9], *1fr)" css/style.css` returns **no** collection matches after the fix (P1 alphabet `repeat(14,…)`/`repeat(7,…)` are fixed-size and exempt).
- Confirm no `translateX`, no `margin-right/left`, no `left:` introduced by the fix.

### M.5 Regression guard
- Lessons 01 and 02 (4 letters) must render visually **identical** to the pre-fix capture at 1920×1080 — capture before/after screenshots and diff.

---

## Summary of the one actionable conclusion

> **The containers are centered; the card tracks are not.** Replace the hardcoded `repeat(4|5, 1fr)` collection grids with a count-agnostic, self-centering pattern — `repeat(auto-fit, minmax(<min>,<max>))` + `justify-content:center` (CSS-only), or the existing `--d3-columns` count-variable pattern when equal columns are mandatory. CSS/layout-only; no engine, schema, loader, or data changes; no RTL offsets; no per-count special cases.
