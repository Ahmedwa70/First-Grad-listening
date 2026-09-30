# LESSON_04_INVESTIGATION_REPORT — Source-Audit for Lesson 04 (د ذ ط ظ)

> **Date:** 2026-09-18
> **Task rule:** Official source → existing schema → Lesson 04. Never guess → invent → force into schema.
> **Verdict:** ⛔ **CASE B — NOT fully supported.** No `js/lesson-04.js` is created. No template file is modified. This report identifies the gap and what the pedagogical source must supply before implementation.

---

## Executive summary

Lesson 04 is officially declared as **د ذ ط ظ** (`js/lesson-03.js → meta.nextLesson`). Its phonemes/IPA are fully supported by the governance docs. **The lesson cannot be built inside the current schema because no word containing the letter ظ exists anywhere in the project's official sources**, and the schema hard-errors when a lesson letter is not targeted by any word. Inventing a ظ word is explicitly forbidden by task rule.

---

## 1. What IS officially supported (no authoring risk)

| Item | Value | Source |
|------|-------|--------|
| Letter scope | د  ذ  ط  ظ | `js/lesson-03.js` lines 54–56: `meta.nextLesson.chars = 'الحروف (د • ذ • ط • ظ)'` |
| Lesson hint | «سنتعلم الحروف المتشابهة الشكل معاً» | `js/lesson-03.js` line 56 |
| Phonemes | د `/d/` · ذ `/ð/` · ط `/tˤ/` · ظ `/ðˤ/` | QD-16 exam table (ط line 359, ظ line 360, ذ line 361); Phonetic Representation Decision Record: group «9-10 | ج د ذ ط ظ | /dʒ/ /d/ /ð/ /tˤ/ /ðˤ/ — تراكيب مزدوجة» |
| Orthography (dots) | د=٠ بلا نقاط · ذ=١ فوق · ط=٠ بلا نقاط · ظ=١ فوق | Standard orthography; same style the lesson-03 header documents for its letters |
| Lesson data contract | 15 root keys, P1–P7 phases, Object.freeze | `schema/lesson-schema.js` + lessons 01–03 |
| Audio/video layout | `assets/audio/lesson-04/` · `assets/videos/lesson-04/` | Existing generic resolvers in `js/app.js` (protected, unchanged) |
| Template boot | `lecture.html?lesson=04` resolves via existing loader | `/[?&]lesson=(\d{2})/` → `js/lesson-04.js` (no loader change) |

## 2. What is MISSING (official content that does not exist)

| Missing item | Detail | Where it should have come from |
|--------------|--------|-------------------------------|
| **A word containing ظ** | **Zero occurrences in the entire repository.** All 100+ `ظ` hits are system/UI terms (نظام, ظاهر/ظاهرة, الظل, «تحت أي ظرف») — none is a lesson word. | Any official vocabulary list |
| **A ذ word from the letter-introduction lesson** | Blueprint lesson 10 (the «د ذ ط ظ» lesson) word list has **no ذ word**. | `03_Pedagogical Blueprint`, lesson 10 |
| **Phrase/word-type alignment** | Lesson 10's only word list is tanween-form: طَالِبٌ — كِتَابًا — جَامِعَةٍ — وَلَدٌ, while runtime lessons 01–03 use plain A0 nouns (بَاب، صَفّ، دَرْس). | `03_Pedagogical Blueprint`, lesson 10 (line 349) |
| **Ratification of the lesson itself** | 「د ذ ط ظ as lesson 04」 is declared only as `meta.nextLesson`, which `LESSON_03_RESULT.md` marks «editorial proposal only, open to change». | `js/lesson-03.js` + `MD/LESSON_03_RESULT.md` line 27 |

## 3. Exact schema fields that CANNOT be completed

| Schema location | Rule | Why it fails for L04 |
|-----------------|------|----------------------|
| `words[]` (targeted coverage) | `schema/lesson-schema.js` lines 327–331: **every** letter in `letters[].id` must appear in some `words[].targetLetterId`, else `E('words', ...)` — hard ERROR. | Only 3 official words span the 4 letters: طَالِبٌ→ط, وَلَدٌ→د, أَذْهَب→ذ. **No ظ word → ERROR.** |
| `words[].chars / targetLetterId / targetPositions` | Each word must be ≥2 Arabic chars with ≥1 valid position pointing at the target letter (lines 302–316). | A ظ word entry (and its `targetLetterId`, `targetPositions`, `audioFile`) cannot be authored without inventing the word itself. |
| `p5WordMeta[wordId]` (transitively) | Every word id needs a meta entry (line 339). | Unreachable until a ظ word exists. |
| Official stroke-guide content | `strokeGuides[]` per letter with `videoFile` + `steps[]`. | Arabic Stroke Engine contains a model for ب only; no stroke data for د ذ ط ظ exists in any doc. |

> All other L04 fields are authorable from official source or established lesson precedent (colors/pinyin/facts follow the L01–L03 editorial house style).

## 4. Exact source / document where the gap occurs

| Document | Location | What it actually provides |
|----------|----------|---------------------------|
| `03_Pedagogical Blueprint (…).md` | Lesson 10 — line 349 | Word list طَالِبٌ — كِتَابًا — جَامِعَةٍ — وَلَدٌ. Covers **only ط and د**; كِتَابًا/جَامِعَةٍ contain no target letter. |
| `03_Pedagogical Blueprint (…).md` | Lesson 13 — line 442 | أَذْهَب — جَامِعَة — أَدْرُس — اللُّغَة — العَرَبِيَّة — أُحِبّ → provides the only **ذ** word (أَذْهَب). |
| `03_Pedagogical Blueprint (…).md` | Lesson 15 — line 504 | Rare-letter consolidation ث ذ ظ: أُحِبّ — لَا أُحِبّ — أَسْكُن — أَعِيش — مَعَ — وَحْدِي → **no ظ word even in the ظ-consolidation lesson**. |
| `03_Pedagogical Blueprint (…).md` | Lessons 5/7/9/12 (lines 196/258/318/411) | طَالِب/طَالِبَة (ط), دَرْس...أَدْرُس (no ظ), مُحَمَّد/جَدَّة/دَرَّسَ (د), طَيْر/كَاتِب (ط). No ظ word anywhere. |
| `md/Pedagogy/AUDIO_RECORDING_SCRIPT.md` | Whole file | Lesson 01 only (ب ت ث ن). No L04 vocabulary recorded. |
| `md/Governance/QD-16_…md` + Decision Record | Phoneme table | Phonemes/IPA only — **no word bank**. |
| `Work plan/05_Design_System.docx` | Color semantics | No per-letter colors for د ذ ط ظ. |
| `md/New Text Document.txt` + Stroke Engine | Whole | Engineering roadmap; stroke model exists for **ب only**. |
| Global `ظ` grep (whole repo) | All files | Only system/UI occurrences (نظام/ظاهر/الظل). **No vocabulary.** |

## 5. Required from the pedagogical source/author BEFORE implementation

1. An official **word containing ظ** (fully vowelled, A0-level, matching the plain-noun style of lessons 01–03), with its Chinese meaning and an audio file assignment — so `words[]` scheduled at lines 327–331 can be filled truthfully.
2. An official **ذ word from the letter-introduction lesson** (or explicit approval to reuse أَذْهَب out-of-lesson), plus a second د word if وَلَدٌ's tanween form is deemed non-standard for the runtime word style.
3. Confirmation/fix of the **word-type mismatch**: whether lessons 04+ use plain nouns (runtime precedent) or tanween-form nouns (Blueprint lesson 10).
4. **Ratification of "د ذ ط ظ as lesson 04"** as a real lesson decision (today it is only an editorial `meta.nextLesson` proposal).
5. Official **stroke-guide content** for د ذ ط ظ (or a deferral directive to reuse/port an existing guide).
6. Official **letter colors** for د ذ ط ظ if the editorially-assigned disjoint palette of lessons 02/03 is not acceptable.

---

**Per CASE B: nothing else was changed; the gate stays closed until the author supplies the missing ظ vocabulary.**