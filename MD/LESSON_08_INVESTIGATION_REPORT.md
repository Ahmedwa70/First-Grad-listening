# LESSON_08_INVESTIGATION_REPORT — Source-Audit for Lesson 08

> **Date:** 2026-09-19
> **Task rule:** Official source → existing schema → Lesson 08. Never guess → invent → force into schema.
> **Verdict:** ⛔ **CASE B — NOT fully supported.** No `js/lesson-08.js` is created. No template file is modified. This report identifies the gap and what the pedagogical source/author must supply before implementation.

---

## Executive summary

Lesson 08 has **no officially supported, schema-conformant letter lesson**. Three independent facts converge on CASE B:

1. **The Blueprint's official Lesson 8 is a midterm exam, not a letter lesson.** `03_Pedagogical Blueprint` names lesson 8 «اختبار منتصف الفصل + مراجعة شاملة» (midterm test + comprehensive review) with **no new letters** — «مراجعة جميع الحروف السابقة (24 حرفًا)» — and its minute-by-minute plan (oral exam, written exam, reading exam, feedback) is an assessment class, not a teaching lesson in the letter-pipeline contract.
2. **The letter ل has no official ≥2-letter runtime grouping.** The runtime chain's only lam reference is the **editorial, unratified** `meta.nextLesson` of `lesson-07.js` («الحروف (ل)»). The Blueprint teaches ل officially in **lesson 11** («اللام الشمسية والقمرية») — a grammar lesson (sun/moon lam al-ta'rif) whose activities exist nowhere in the schema's 3 P6 round types or 3 P7 assessment types.
3. **The schema hard-blocks a single-letter lesson.** `schema/lesson-schema.js` line 148–149 requires `meta.targetLetters.length ≥ 2`. A lam-only lesson (ل) is the eviscerated remainder of the alphabet after lessons 01–07 cover the other 27 letters — any such single-letter file fails the validator at root.

Any attempt at CASE A would therefore require **inventing** a second letter (or an exam/review round type), both explicitly forbidden by the task rule.

---

## 1. What IS officially supported (no authoring risk)

| Item | Value | Source |
|------|-------|--------|
| Letter scope | **none** (Blueprint L8 = review of the 24 letters taught in lessons 1–7, no new letters) | `Work plan/03_Pedagogical Blueprint`.md — lesson-8 card, lines 282–310; assessment schema line 568 «اختبار منتصف الفصل — المحاضرة 8 (30٪)» |
| Official lam lesson | **Blueprint Lesson 11** «اللام الشمسية والقمرية» — new letter «ل + لام التعريف (الشمسية والقمرية)» | Blueprint line 379; grouping table line 57; `01_Pedagogical Framework`.md lines 104, 185 |
| Runtime-chain lam anchor | `meta.nextLesson = { chars: 'الحروف (ل)', hint: 'سنتعلم لام التعريف ونقرأ كلمات أطول' }` — **EDITORIAL PROPOSAL ONLY, unratified** | `js/lesson-07.js` lines 60–63; flagged as open to change in `MD/LESSON_07_RESULT.md` line 140 |
| Phoneme | ل = `/ل/` (IMLA) — consistent with QD-16 Arabic-in-slash convention | QD-16 decision record (phoneme pattern `'/' + char + '/'`); QD-16 strategy |
| Orthography | ل = ٠ بلا نقاط, standard | Standard orthography; consistent with lesson-03 style |
| Official lam vocabulary bank | الباب — الشمس — النور — القمر — الطالب (words built on ال٬معرفة; all contain ل at position [0]) | Blueprint lesson 11, line 380 |
| Lesson data contract | 15 root keys, P1–P7 phases, Object.freeze | `schema/lesson-schema.js` + lessons 01–07 |
| Audio/video layout | `assets/audio/lesson-08/` · `assets/videos/lesson-08/` (directory placeholders only) | `MD/AUDIO_DIRECTORY_STRUCTURE_RESULT.md` line 206; `MD/VIDEO_DIRECTORY_STRUCTURE_RESULT.md` line 149 |

## 2. Letter-set gate (the deciding check)

| Candidate letter set for a runtime Lesson 08 | Status | Source evidence |
|------|--------|--------|
| **ل — alone** (runtime chain's editorial remainder) | ❌ **SCHEMA-BLOCKED** — `meta.targetLetters.length` must be **≥ 2** (`lesson-schema.js` lines 148–149); a 1-element set fails at root | `schema/lesson-schema.js` L148–149; `js/lesson-07.js` L60–63 (proposal only) |
| **ل + another letter** (any pairing) | ❌ **NOT DOCUMENTED** — no source anywhere pairs ل with a second letter in one lesson file; constructing a pair = inventing the lesson scope | Whole-repo search (no hits) |
| **Midterm review/exam** (Blueprint Lesson 8) | ❌ **NOT EXPRESSIBLE** in the letter-pipeline contract — requires an exam/review round type that does not exist in the schema (P6 = identify/sameordiff/close; P7 = show-letter/count-dots/sound). Adding it = new activity types, forbidden | `lesson-schema.js` P6_ROUND_TYPES / P7_ASSESS_TYPES (lines 36–37, 441–511); Blueprint lines 282–310 |

**Conclusion:** no letter set that a runtime `lesson-08.js` could legally hold is backed by any source, and the only source-defined "lesson 8" is not a letter lesson at all.

## 3. Vocabulary evidence for ل (available, but moot)

The lam vocabulary gate itself **is satisfiable** from the Blueprint — but it cannot rescue the lesson because the letter-set gate (§2) fails first:

| Candidate word | Target | Source |
|----------------|--------|--------|
| الباب (the door) | ل at `[0]` | Blueprint lesson 11, line 380 |
| الشمس (the sun) | ل at `[0]` | Blueprint lesson 11, line 380 |
| النور (the light) | ل at `[0]` | Blueprint lesson 11, line 380 |
| القمر (the moon) | ل at `[0]` | Blueprint lesson 11, line 380 |
| الطالب (the student) | ل at `[0]` | Blueprint lesson 11, line 380 |

Even with this vocabulary filled truthfully, the schema still hard-errors on `meta.targetLetters.length < 2` before reaching the word checks.

## 4. Exact schema fields that CANNOT be completed

| Schema location | Rule | Why it fails for L08 |
|-----------------|------|----------------------|
| `meta.targetLetters` | requires array with **≥ 2 elements**, each a single Arabic char (lines 148–155) | A lam-only lesson gives exactly 1 element → hard ERROR. No second letter exists in any source to pair with it. |
| `letters[]` | `letters.length === meta.targetLetters.length` (lines 192–194) | Must mirror the (impossible) targetLetters size. |
| `targetLetterIds` | set-equals `letters[].char` (lines 230–237) | Same one-letter problem as root. |
| `phases` (P1–P7) | fixed 7-phase letter-pipeline, ids/order fixed (lines 533–537) | Cannot express a midterm review examination (no such phase/round type exists). |
| `words[]` / `p5WordMeta` / P5 `wordOrder` | every letter targeted by ≥1 word (lines 327–331) | Only satisfiable **after** the letter-set gate passes. |

## 5. Missing evidence (what does not exist anywhere in the sources)

1. No document defines a runtime (file-based) letter grouping for a lesson numbered 08. The only occurrences of "lesson-08" in the repo are directory-placeholder rows in audio/video structure tables (MD lines cited in §1).
2. No document pairs ل with a second letter for a single lesson file.
3. No document ratifies the runtime chain's final lam proposal `الحروف (ل)` — all `meta.nextLesson` declarations are flagged "editorial proposal only, open to change" across `LESSON_03_RESULT.md` … `LESSON_07_RESULT.md`.
4. The Blueprint's own lesson-8 is officially a **midterm examination** (no new letter, review of 24 previous letters + oral/written/reading tests), which the runtime contract has no way to represent.

## 6. Exact blocker (one-line)

**The official (Blueprint) Lesson 8 is a midterm-review examination with no new letters, and the only remaining untaught letter (ل) can be taught only as a single-letter lesson — which the schema forbids (`meta.targetLetters ≥ 2`) — while no source groups ل with any second letter for one file.**

## 7. Why the schema blocks (mechanically)

- `validateLesson` at `schema/lesson-schema.js` line 148:
  `if (!Array.isArray(meta.targetLetters) || meta.targetLetters.length < 2)` → `E('meta.targetLetters','مصفوفة ≥ 2 حروف مطلوبة')`.
- This is a **hard ERROR** (exit code 1), evaluated before letters/words/phases. No data authored around ل alone can pass it, regardless of vocabulary correctness.
- A review/exam lesson is equally blocked: `phases` must be exactly 7 with ids `P1..P7` (lines 533–537), and both `discriminationRounds` and `assessmentRounds` count only the 3+3 existing types (lines 36–37). No exam/review round-type exists; introducing one changes the schema/engine — forbidden.

## 8. Required from the pedagogical source/author BEFORE implementation

1. **A ratified letter set** for runtime Lesson 08 — either:
   - (a) an official **pairing of ل with one other letter** (e.g., a documented "similar-shape" or "remaining letters" grouping) plus its official rationale, or
   - (b) a **decision that Lesson 08 is an assessment/consolidation lesson**, which requires an author-approved contract extension (new/exam round types) — explicitly out of scope of the current 15-key P1–P7 letter contract.
2. For the lam letter itself (needed in case (a)): an official (or author-ratified) **lam vocabulary bank beyond the five «ال»-words** if the sun/moon grammar words are deemed unsuitable as plain P5 target words (each must be A0, plain-noun style match to lessons 01–07), and an explicit note on how the «ال»-definite words should be treated (they are grammatically definite nouns — current contract words are plain indefinite nouns).
3. **Ratification of the lam order/hint** currently proposed in `lesson-07.js` `meta.nextLesson` — i.e., an explicit confirmation that ل follows غ ض ر ز, or an alternative official order.

## 9. Recommended minimal resolution (options)

- **Option A (preferred if the course requires exactly 28 letters in ~8 runtime files):** author supplies an official second letter to pair with ل (any two-letter set that sources support teaching together, e.g. a documented "rare/remaining letter" pair), with 1–2 official words per letter. Then CASE A can proceed within the current schema.
- **Option B (if the Blueprint's midterm positioning is honored):** Lesson 08 is declared an out-of-contract assessment/review milestone — no `lesson-08.js` letter file; instead the author approves the contract change needed (or accepts the existing P1–P7 engine as the only format).
- **Option C (course-state question, not authoring):** if runtime lessons 01–07 already serve as the letter-teaching backbone, the project owner may decide lam belongs to a later, grammar-oriented lesson (Blueprint lesson 11, «اللام الشمسية والقمرية») — in which case **no runtime file 08 exists by design** and this CASE B report is the permanent record.

## 10. Files touched / untouched

- **Created:** `MD/LESSON_08_INVESTIGATION_REPORT.md` (this file) — CASE B report only.
- **NOT created:** `js/lesson-08.js`. No runtime lesson data was written.
- **Untouched (protected hashes unchanged):** `js/lesson-01..07.js`, `js/app.js`, `js/loader.js`, `js/engine/*`, `js/activities/*`, `schema/lesson-schema.js`, `css/style.css`, `lecture.html`.

## 11. No runtime changes

No change to `app.js`, `loader.js`, `engine/*`, `activities/*`, `style.css`, `lecture.html`, or `schema/lesson-schema.js`. The loader boot contract (`lecture.html?lesson=08`) was **not** exercised because no lesson file exists. Nothing that would affect lessons 01–07 was modified.

---

**Per CASE B: nothing else was changed; the gate stays closed until the author supplies a ratified, schema-conformant letter set for Lesson 08 (or authorizes the midterm-exam contract extension).**