# LESSON_04_RESULT.md — Adding Lesson 04 (د ذ ط ظ)

> **Date:** 2026-09-18
> **Scope:** Author `js/lesson-04.js` only, against the official sources plus author-approved ظ vocabulary, and prove the template runs it via `lecture.html?lesson=04` with zero schema errors and zero cross-lesson leakage.
> **Prior gate:** `LESSON_04_INVESTIGATION_REPORT.md` verdict was CASE B (blocked) because **no ظ word** existed in official sources.
> **This execution:** AUTHOR-APPROVED VOCABULARY SUPPLIED → CASE A → lesson 04 created.
> **Status:** ✅ DONE — gate green, awaiting next instruction.

---

## 1. What was created

| Path | Type | Notes |
|------|------|-------|
| `js/lesson-04.js` | NEW | Complete lesson data, same 15-key contract as lessons 01–03, ends with `Object.freeze(LESSON)`. |
| `MD/LESSON_04_RESULT.md` | NEW | This report. |

No other template file was modified. `lecture.html`, `js/app.js`, `js/loader.js`, `js/engine/*`, `js/activities/*`, `css/*`, `assets/*`, `js/lesson-01.js`, `js/lesson-02.js`, `js/lesson-03.js`, `schema/lesson-schema.js` are untouched (SHA-256 verified, §7). No asset file was added — the new lesson references audio/video paths exactly like the frozen lessons do.

## 2. Content sourcing (official sources + author approval)

| Item | Value | Source |
|------|-------|--------|
| Letters | د  ذ  ط  ظ | `js/lesson-03.js → meta.nextLesson` (declared officially): `'الحروف (د • ذ • ط • ظ)'`, hint «سنتعلم الحروف المتشابهة الشكل معاً» |
| Phonetics | د `/d/` · ذ `/ð/` · ط `/tˤ/` · ظ `/ðˤ/` | Phonetic Representation Decision Record (QD-16) |
| **ظ words (5)** | **ظَرْف · ظِلّ · ظَهْر · ظَبْي · نَظِيف** | **AUTHOR-APPROVED** — resolved the CASE B blocker; spelled and vowelled exactly as supplied, not normalized |
| د word | وَلَدٌ | Pedagogical Blueprint, lesson 10 (line 349) — only د word in the letter-introduction lesson; tanween form preserved from source |
| ذ word | أَذْهَب | Pedagogical Blueprint, lesson 13 (line 442) — only ذ word in the project vocabulary |
| ط word | طَالِبٌ | Pedagogical Blueprint, lesson 10 (line 349) — tanween form preserved from source |
| Letter facts / shapes | similar-shape pairs د/ذ and ط/ظ (dots differentiate) | Blueprint letter-introduction guidance + QD-16 phonetic facts |

The CASE B blocker is **resolved by explicit author approval** of the five ظ words (see `LESSON_04_INVESTIGATION_REPORT.md` §5.1 → now supplied). All three non-ظ words are the exact words the investigation identified as the only official ones spanning د ذ ط.

The lesson's `meta` carries a proposal for the next lesson (`{chars:'الحروف (م • ي • ا • ه)', hint:'سنتعلم الحروف المتصلة والممدودة'}`) — **editorial proposal only, open to change**; it does not affect this lesson.

### 2.1 Vocabulary coverage per letter (schema rule: every letter targeted by ≥1 word)

| Letter | Word | `targetLetterId` | `targetPositions` (verified vs `chars`) |
|--------|------|------------------|------------------------------------------|
| د | وَلَدٌ | `dal` | `[2]` — chars `['و','ل','د']`, index 2 = د ✓ |
| ذ | أَذْهَب | `dhal` | `[1]` — chars `['أ','ذ','ه','ب']`, index 1 = ذ ✓ |
| ط | طَالِبٌ | `taa` | `[0]` — chars `['ط','ا','ل','ب']`, index 0 = ط ✓ |
| ظ | ظَرْف | `zah` | `[0]` — chars `['ظ','ر','ف']`, index 0 = ظ ✓ |
| ظ | ظِلّ | `zah` | `[0]` — chars `['ظ','ل']`, index 0 = ظ ✓ |
| ظ | ظَهْر | `zah` | `[0]` — chars `['ظ','ه','ر']`, index 0 = ظ ✓ |
| ظ | ظَبْي | `zah` | `[0]` — chars `['ظ','ب','ي']`, index 0 = ظ ✓ |
| ظ | نَظِيف | `zah` | `[1]` — chars `['ن','ظ','ي','ف']`, index 1 = ظ ✓ (medial ظ) |

All eight word `chars[].targetPositions` were verified against the actual Unicode character sequence by a Node inspection (no diacritics counted in `chars`, per schema `isArabicChar`). `targetPositions` reflect the exact letter index of the target letter in each word.

## 3. Schema gate (`node schema/lesson-schema.js js/lesson-04.js`)

```
lesson-04.js   summary: 0 أخطاء | 2 توصيات     → exit 0
```

Zero errors. The **2 warnings are the same known, documented, non-blocking category** present in lessons 02/03 — count-dots letters with 0 dots («لا نقاط») that fall outside the big two-letter P7 display range (1–3 dots, فوق/أسفل):

1. `dal` (0 dots, «لا نقاط») — `assessmentRounds[1].items[0].letterId`
2. `taa` (0 dots, «لا نقاط») — `assessmentRounds[1].items[2].letterId`

`dhal` and `zah` (1 dot, «فوق») are inside the range and raise no warning. Exactly parallels lesson 03 (`sad`/`seen`) and lesson 02 (4 warnings in the same category); does not block boot or assessment.

Full validator over all data files: `4 ملف | 0 خطأ | 8 توصية`, `SELF-TEST: 4/4` → **exit 0**.

## 4. Boot / runtime result (`node phase3-boot.js <ROOT> 04`)

```
04 :: P1:ok(4) | P2:ok(3) | P3:ok(4) | P4:ok(2) | P5:ok(3) | P6:ok(8) | P6-D2:ok(10) | P7:ok(17)
     | P1:ok(1) | P2:ok(1) | P3:ok(1) | P4:ok(1) | P5:ok(1) | P6:ok(1) | P7:ok(1)
     | title:OK | color:OK | leak:04:ZERO      → exit 0
```

`?lesson=04` is resolved by the existing `loader.js` (`/[?&]lesson=(\d{2})/` → `js/lesson-04.js`) with **no template change**. P1–P7 boot, P6-D2 round works (bridge + loop), P7 completion works, title reads `المحاضرة الرابعة — د ذ ط ظ`, hero colors are L04 data-driven.

### 4.1 Per-phase verification (P1 → P7)

| Phase | Result | Content verified |
|-------|--------|------------------|
| P1 | ok (4 shots) | intro → universe → spotlight, targetLetters `['د','ذ','ط','ظ']`, welcomeHint `第四课` |
| P2 | ok (3 shots) | phonemeOrder `dal,dhal,taa,zah`; silent-listen / choral-repeat / finger-count; finger map د=1 ذ=2 ط=3 ظ=4 |
| P3 | ok (4 shots) | letterOrder + fixed reveal order `char→dots→phoneme→fact` |
| P4 | ok (2 shots) | 4 strokeGuides (all letters present, colors match letters) |
| P5 | ok (3 shots) | wordOrder all 8 words; targets د/ذ/ط/ظ incl. the 5 author-approved ظ words |
| P6 | ok (8 shots) | D1 identify, D2 same/diff, D3 close; demo shows د/ذ/ط/ظ |
| P6-D2 | ok (10 shots) | bridge + loop wiring intact |
| P7 | ok (17 shots) | Q1 shape, Q2 dots, Q3 sound; completion `المحاضرة الرابعة مكتملة` |

`title:OK` — header shows `المحاضرة الرابعة — د ذ ط ظ`. `color:OK` — hero colors are data-driven from `letters[].color` (L04 palette: د `#3F51B5`, ذ `#E91E63`, ط `#00BCD4`, ظ `#FF9800` — mutually disjoint and disjoint from lessons 01–03).

## 5. Media path resolution (audio + video, with TTS/video fallback)

`audio-dir-test.js` (lesson 04 added to the harness):

```
PASS:lesson-04:dir=lesson-04
PASS:lesson-04:all-12-paths-namespaced            (4 letter mp3 + 8 word mp3)
PASS:lesson-04:target-dir-exists                  assets/audio/lesson-04/ exists
INFO:lesson-04:files-present=0/12                 (assets not yet supplied — same as lessons 02/03)
PASS:lesson-04:Audio-src=assets/audio/lesson-04/dal.mp3
PASS:lesson-04:tts-fallback-fired
```

`video-dir-test.js` (lesson 04 added to the harness):

```
PASS:lesson-04:all-4-video-paths-namespaced       assets/videos/lesson-04/*.mp4
PASS:lesson-04:target-dir-exists
INFO:lesson-04:videos-present=0/4                 (assets not yet supplied)
PASS:lesson-04:P4-video-src=assets/videos/lesson-04/dal.mp4
PASS:lesson-04:missing-video-no-crash
```

Logical paths are `assets/audio/…` / `assets/videos/…` exactly like lessons 01–03; the generic resolvers in the protected `js/app.js` namespace them into `assets/audio/lesson-04/` and `assets/videos/lesson-04/`. Missing media is compatible with the TTS/fallback paths — no crash observed.

## 6. Leak check

- Harness-level: `leak:04:ZERO` (boot) — lesson-01 tokens absent.
- Distinctive-token scan of `js/lesson-04.js` against **lessons 01, 02, AND 03** (letter ids, letter chars, word ids, words, meta title/summaryTitle/docTitle): **ZERO**. Only the canonical 28-letter `arabicAlphabet` (required shared structure) contains prior letters.
- L04 colors, letter ids (`dal,dhal,taa,zah`), word ids, audio/video filenames (`dal.mp3`, `word_zarf.mp3`, `zah.mp4`, …) are all new — no lesson-01/02/03 values reused.

## 7. Non-blocking warnings / notes (as of date)

1. Two schema warnings (§3) — known category, matches lessons 02/03.
2. All referenced media (`assets/audio/dal.mp3`, `word_zarf.mp3`, `assets/videos/zah.mp4`, …) **do not exist**; like lessons 02/03, the lesson ships the references and the engine degrades gracefully (TTS + missing-video fallback verified). No asset files were added.
3. `meta.nextLesson` (م ي ا ه) is a proposal only — editorial, open to change.
4. **Editorial fields** following the L01–L03 house convention (no official source defines them): letter colors, `chinesePinyin`, stroke-guide step texts and video paths, `fact` texts, and p5WordMeta emoji/zh. All marked by the comment `الألوان/النطق التحريرية خاصة بهذه المحاضرة`. No "official" claim is attached to these.
5. The non-ظ words keep their **tanween form exactly as the source shows** (وَلَدٌ from Blueprint lesson 10, طَالِبٌ from Blueprint lesson 10) — no normalization by the author.

## 8. Regression (protected/unchanged files)

| File | SHA-256 | vs baseline |
|------|---------|-------------|
| `js/lesson-01.js` | `591804C32A8B9451A4D94712531C9760A9AC2EABF095A53AAAAEF69535F92B09` | unchanged |
| `js/lesson-02.js` | `96BEB452959C2C76AF8052BA12327CEBA582ED7F4B2EEC3A34E3AE80D9F20A10` | unchanged |
| `js/lesson-03.js` | `8912D70E31ED83F13733B8B9859392EF3A36B747609DE11E40AAC4BEE8AF1391` | unchanged |
| `js/app.js` | `87B37E6B4AC1651A4DE248D746D7EB4A95F35B891A6163DE9ADBBC5159D35078` | unchanged |
| `js/loader.js` | `B335E6EEB62A522E03112C6E06F9593B8E017ADD4A1FC443B075C49150FD953A` | unchanged |
| `schema/lesson-schema.js` | `8E6B3EB8E487E04A4461C8E277DBA90EB7E106CC32841158A433CBFB65843C88` | unchanged |
| `lecture.html` | `CB2C9D3C3903391B18C7800841A6DB1B6FE9ECCC2E9C2A4E170A42DE45F43A3B` | unchanged |
| `js/activities/*` (7 files) | intact ($7D07B1F5…, `2DEC371E…`, `5C19DED2…`, `930A3DA9…`, `746717ED…`, `22F07860…`, `1081E1EB…`) | unchanged |
| `js/engine/*` (3 files) | intact | unchanged |
| `css/style.css` | `7D459C6A9C5CFF3670DAA721692CED34462CD8E796818A9C0F3A5774D016F727` | unchanged |

No tree modification outside `js/lesson-04.js` and `MD/LESSON_04_RESULT.md`.

---

**Per CASE A: done. Lesson 04 is created and validated. No Lesson 05, no Phase 5, no redesign, no refactoring. Gate closed.**