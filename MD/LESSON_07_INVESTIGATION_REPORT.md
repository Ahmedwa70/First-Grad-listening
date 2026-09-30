# LESSON_07_INVESTIGATION_REPORT — Source-Audit for Lesson 07 (غ ض ر ز)

> **Date:** 2026-09-19
> **Task rule:** Official source → existing schema → Lesson 07. Never guess → invent → force into schema.
> **Verdict:** ⛔ **CASE B — NOT fully supported.** No `js/lesson-07.js` is created. No template file is modified. This report identifies the gap and what the pedagogical source must supply before implementation.

---

## Executive summary

Lesson 07 is officially declared as **غ ض ر ز** (`js/lesson-06.js` lines 59–61 → `meta.nextLesson`). Its phonemes/IPA are fully supported by the governance docs, and three of its four letters have official vocabulary words (غُرْفَة، ضَحِك، رَقَم). **The lesson cannot be built inside the current schema because no word containing the letter ز exists anywhere in the project's official sources**, and the schema hard-errors when a lesson letter is not targeted by any word. Inventing a ز word is explicitly forbidden by task rule. This is the same structural gap that blocked Lesson 04 until the author supplied five ظ words (ظَرْف — ظِلّ — ظَهْر — ظَبْي — نَظِيف).

---

## 1. What IS officially supported (no authoring risk)

| Item | Value | Source |
|------|-------|--------|
| Letter scope | غ  ض  ر  ز | `js/lesson-06.js` lines 59–61: `meta.nextLesson.chars = 'الحروف (غ • ض • ر • ز)'` |
| Lesson hint | «سنتعلم بقية حروف الهجاء ونقرأ كلمات أطول» | `js/lesson-06.js` line 61 |
| Phonemes | غ `/ɣ/` · ض `/dˤ/` · ر `/r/` · ز `/z/` | QD-16 difficult-sounds table (غ line 356, ض line 358); Phonetic Representation Decision Record group «5-6 \| الهمزة ز ر \| /ʔ/ /z/ /r/» (line 270) |
| Orthography (dots) | غ=١ فوق · ض=١ فوق · ر=٠ بلا نقاط · ز=١ فوق | Standard orthography; same style the lesson-03 header documents for its letters |
| Letter-fact grouping | غ from the throat-letter set (ع غ ح خ), ض from the similar-shape set (س ش ص ض), ر ز from the functional set (ز ر + numbers) | `03_Pedagogical Blueprint`, letter-group table (lines 50–57) |
| Lesson data contract | 15 root keys, P1–P7 phases, Object.freeze | `schema/lesson-schema.js` + lessons 01–06 |
| Audio/video layout | `assets/audio/lesson-07/` · `assets/videos/lesson-07/` | Existing generic resolvers in `js/app.js` (protected, unchanged) |
| Template boot | `lecture.html?lesson=07` resolves via existing loader | `/[?&]lesson=(\d{2})/` → `js/lesson-07.js` (no loader change) |
| **Words for each letter** | **غ → غُرْفَة ✓ — ض → ضَحِك ✓ — ر → رَقَم ✓ — ز → ✗ MISSING** | see §2, §4 |
| Stroke guides vs words | Fully authorable for غ ض ر ز in the same editorial house style as lessons 01–06 | L01–L06 precedent |

## 2. Word-coverage gate (the deciding check)

| Target letter | Candidate official word | Status | Source |
|---------------|-------------------------|--------|--------|
| غ | غُرْفَة (room) — غ at `[0]` | ✅ **OFFICIAL** | Blueprint lesson 4, line 165: vocab عَيْن — **غُرْفَة** — حَال — خَيْر |
| ض | ضَحِك (laughter) — ض at `[0]` | ✅ **OFFICIAL** | Blueprint lesson 7, line 258: vocab دَرْس — صَفّ — شَبَاب — **ضَحِك** — أَدْرُس |
| ر | رَقَم (number) — ر at `[0]` | ✅ **OFFICIAL** | Blueprint lesson 6, line 228: target sentence كَمْ **رَقَمُ** هَاتِفِكَ؟ (number words أربعة/عشرة also contain ر) |
| **ز** | **(none)** | ❌ **MISSING — zero occurrences in the entire repository.** | see §4 |

## 3. Exact schema fields that CANNOT be completed

| Schema location | Rule | Why it fails for L07 |
|-----------------|------|----------------------|
| `words[]` (targeted coverage) | `schema/lesson-schema.js` lines 327–331: **every** letter in `letters[].id` must appear in some `words[].targetLetterId`, else `E('words', ...)` — hard ERROR. | غ (غُرْفَة), ض (ضَحِك), ر (رَقَم) cover 3 of 4 letters. **No ز word → ERROR.** |
| `words[].chars / targetLetterId / targetPositions` | Each word must be ≥2 Arabic chars with ≥1 valid position pointing at the target letter (lines 302–316). | A ز word entry (and its `targetLetterId`, `targetPositions`, `audioFile`) cannot be authored without inventing the word itself. |
| `p5WordMeta[wordId]` (transitively) | Every word id needs a meta entry (line 339). | Unreachable until a ز word exists. |
| `phases.P5.wordOrder` (transitively) | Must cover every word once (lines 618–623). | Cannot list a ز word that does not exist. |

> All other L07 fields are authorable from official source or established lesson precedent (colors/pinyin/facts/stroke guides follow the L01–L06 editorial house style; P4 remains deferred; hero colors are data-driven).

## 4. Exact source / document where the gap occurs

| Document | Location | What it actually provides |
|----------|----------|---------------------------|
| `Work plan/03_Pedagogical Blueprint (…).md` | Lesson 6 — lines 220, 226–228 | The **ز ر lesson itself**: new letters «ز — ر» (line 226), but its official vocabulary is **الأرقام** واحد — اثنان — ثلاثة — ... — عشرة (line 227) and target sentences كَمْ رَقَمُ هَاتِفِكَ؟ / رَقْمِي هُوَ… / اليَوْمُ يَوْمُ… (line 228) — **no word contains ز**. The numbers and days of the week contain ر but not ز. |
| `Work plan/03_Pedagogical Blueprint (…).md` | Lesson 7 — line 258 | دَرْس — صَفّ — شَبَاب — **ضَحِك** — أَدْرُس → provides the ض word and more. No ز. |
| `Work plan/03_Pedagogical Blueprint (…).md` | Lesson 4 — line 165 | عَيْن — **غُرْفَة** — حَال — خَيْر → provides the غ word. No ز. |
| `Work plan/03_Pedagogical Blueprint (…).md` | Lesson 15 — line 504 | Rare-letter consolidation targets **ث — ذ — ظ** only (rare-letter lesson for the *pre-final* review); its vocab أُحِبّ — لَا أُحِبّ — أَسْكُن — أَعِيش — مَعَ — وَحْدِي contains no ز. ز is never consolidated in any official lesson. |
| `Work plan/03_Pedagogical Blueprint (…).md` | Whole file | Every ز hit is a structural/meta word (وزّع، زملاء، التمييز، الترميز، مزدوج…) — never a lexicon entry. |
| `Work plan/04_Instructional Blueprint (…).md` | Whole file | All ز hits are activity/UI words (أزرار، ترميز، تمييز) — no vocabulary. |
| `md/Governance/QD-16_…md`, `md/Governance/QD-17_…`, `md/Pedagogy/PHONETIC_REPRESENTATION_DECISION_RECORD.md`, `md/Pedagogy/AUDIO_RECORDING_SCRIPT.md` | Phoneme tables / script | Phonemes (%z%) and IPA only — **no word bank**. The audio script covers Lesson 01 (ب ت ث ن) only. |
| `md/AI Workflow/ACTIVE_TASK.md`, `External_Benchmark_Analysis.md`, all P1–P6 engineering reports | Whole repo | ز occurrences are exclusively system/UI/engineering terms (رموز، تمييز، أزرار، زر، مزامنة، تخزين، إلزامية…). |
| Global ز grep (whole repo, 504 unique ز-words) | All files | Only content-word candidates ever found: **جَوْز** (walnut) appears in `js/lesson-02.js` as a word **already targeted to ج in a prior lesson** (cross-lesson reuse forbidden), and يزين appears in `lesson-05.js` inside a teacher-hint prose string (not a lexicon word, not Blueprint-listed). **No usable ز word exists.** |

## 5. Required from the pedagogical source/author BEFORE implementation

1. An official (or author-ratified) **word containing ز** — fully vowelled, A0-level, matching the plain-noun style of lessons 01–06 — with its Chinese meaning and an audio file assignment — so `words[]` at schema lines 327–331 can be filled truthfully. Recommended pattern (mirrors the author-supplied ظ words of Lesson 04): at least one ز-initial plain noun such as زَيْت (ز at `[0]`), with spelling and vowelling supplied **as-is by the author, not normalized by the implementer**.
2. If only one ز word is provided, a **second ز word** is recommended so P6 discrimination and P5 revision have lexical variety (Lesson 04 precedent supplied five words: ظَرْف، ظِلّ، ظَهْر، ظَبْي، نَظِيف).
3. **Ratification of the letter order غ — ض — ر — ز** as presented by `js/lesson-06.js → meta.nextLesson` (it remains an editorial proposal, open to change — the governing blueprint teaches ز and ر together in its lesson 6, so pairing them here is consistent).
4. Optionally: an explicit note confirming **رَقَم** (from the lesson-6 target sentence) is acceptable as the official ر word, or whether the author prefers a number-derived word (أربعة / عشرة) instead.

---

**Per CASE B: nothing else was changed; the gate stays closed until the author supplies the missing ز vocabulary.**