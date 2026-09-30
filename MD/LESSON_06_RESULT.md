# LESSON_06_RESULT.md — Adding Lesson 06 (ف و ق ك)

> **Date:** 2026-09-19
> **Scope:** Author `js/lesson-06.js` only, against the official sources (Pedagogical Blueprint + QD-16 phonetics), and prove the template runs it via `lecture.html?lesson=06` with zero schema errors and zero cross-lesson leakage.
> **Prior gate:** source-led audit (Blueprint lesson 3 + runtime chain) — every target letter had ≥1 official word → **CASE A** from the start, no blocking gap.
> **Status:** ✅ DONE — gate green, awaiting next instruction.

---

## 1. What was created

| Path | Type | Notes |
|------|------|-------|
| `js/lesson-06.js` | NEW | Complete lesson data, same 15-key contract as lessons 01–05, ends with `Object.freeze(LESSON)`. |
| `MD/LESSON_06_RESULT.md` | NEW | This report. |

No other template file was modified. `lecture.html`, `js/app.js`, `js/loader.js`, `js/engine/*`, `js/activities/*`, `css/*`, `assets/*`, `js/lesson-01.js` … `js/lesson-05.js`, `schema/lesson-schema.js` are untouched (SHA-256 verified, §8). No asset file was added — the new lesson references audio/video paths exactly like the frozen lessons do.

## 2. Content sourcing (official sources only)

### 2.0 Scope determination — derivation of the letter set

Lesson 06 was **not** chosen from an old roadmap grouping. It was derived from the **existing runtime chain**, which is the primary implementation reference, and confirmed verbatim by the official Pedagogical Blueprint:

| Step | Evidence | Result |
|------|----------|--------|
| Runtime chain anchor | `js/lesson-05.js → meta.nextLesson`: `{chars:'الحروف (ف • و • ق • ك)', hint:'سنتعلم حروفاً جديدة ونقرأ مقاطع بالضمة'}` | Lesson 06 = **ف و ق ك** |
| Official letter lesson | Pedagogical Blueprint, lesson 3 («الحروف ف و ق ك — والضمة», BP §lines 127–149): letters ف — و — ق — ك (line 133), rationale line 132 «هذه الحروف تبني كلمات يراها الطالب يوميًا: كتاب، قلم، فوق. الضمة تُدخَل هنا لأن الطالب أتقن الفتحة في الدرس السابق» | ف و ق ك is the official 3rd letter group with official vocabulary and target sentences |
| Official vocabulary | قَلَم — كِتَاب — فَوْق — وَقْت (line 134) | one official word per letter, all covered |
| Official target sentences | هَذَا قَلَم. هَذَا كِتَاب. (line 135) | demonstrates the letters in context |

The runtime chain's own `meta.nextLesson` declaration and the Blueprint lesson-3 block agree on the same four letters — no conflict to resolve. Per the established rule (L05 precedent), the runtime chain is the primary implementation reference and the Blueprint confirms it.

### 2.1 Letters, phonemes/IPA (QD-16 / Blueprint)

| Letter | id | `phoneme` (P2, per QD-16) | `ipa` (reference only) | dots | dotPosition | Blueprint rationale |
|--------|----|---------------------------|------------------------|------|-------------|---------------------|
| ف | `fa` | /ف/ | f | 1 | فوق | يراها الطالب يومياً داخل كلمات: فوق (BP lesson 3, line 132/134) |
| و | `waw` | /و/ | w | 0 | لا نقاط | شائعة جداً في الواو المدّية/العاطفة؛ هنا في وَقْت (BP lesson 3) |
| ق | `qaf` | /ق/ | q | 2 | فوق | في قَلَم — من كلمات الحياة اليومية (BP lesson 3, line 132) |
| ك | `kaf` | /ك/ | k | 0 | لا نقاط | في كِتَاب — من كلمات الحياة اليومية (BP lesson 3, line 132) |

QD-16 (Phonetic Representation Decision) drives the convention: `phoneme` = `/حرف/` Arabic-in-slash for P2; `ipa` and `chinesePinyin` remain reference-only metadata, never displayed in P2 (matches lessons 01–05).

### 2.2 Vocabulary — every candidate word with its source

| Word | target letter/pos | Source document | Source lesson / line | Status |
|------|-------------------|-----------------|----------------------|--------|
| قَلَم (pen) | ق @ `[0]` | Pedagogical Blueprint (المفردات) | L3, line 134 | OFFICIAL |
| كِتَاب (book) | ك @ `[0]` | Pedagogical Blueprint (المفردات) | L3, line 134 | OFFICIAL |
| فَوْق (above) | ف @ `[0]` | Pedagogical Blueprint (المفردات) | L3, line 134 | OFFICIAL |
| وَقْت (time) | و @ `[0]` | Pedagogical Blueprint (المفردات) | L3, line 134 | OFFICIAL |

**No vocabulary was invented.** Every word is verbatim from the official Blueprint lesson-3 vocabulary list (spelling and diacritics kept as the source shows — no normalization, same house rule as lessons 04/05). All four target letters are covered by ≥1 official word (schema rule). `chars[]` records the bare Arabic letters per the schema's `isArabicChar` rule (no diacritics in `chars`).

### 2.3 Vocabulary coverage per letter (schema rule: every letter targeted by ≥1 word)

| Letter | Words | `targetPositions` (verified vs `chars`) |
|--------|-------|------------------------------------------|
| ف | فَوْق | `[0]` chars `['ف','و','ق']` ✓ |
| و | وَقْت | `[0]` chars `['و','ق','ت']` ✓ |
| ق | قَلَم | `[0]` chars `['ق','ل','م']` ✓ |
| ك | كِتَاب | `[0]` chars `['ك','ت','ا','ب']` ✓ |

All four word `chars[].targetPositions` were verified programmatically against the actual Unicode character sequences (Node inspection; no diacritics in `chars`).

## 3. Schema gate (`node schema/lesson-schema.js js/lesson-06.js`)

```
lesson-06.js   summary: 0 أخطاء | 2 توصيات     → exit 0
```

Zero errors. The **2 warnings are the same known, documented, non-blocking category** present in lessons 02–05 — count-dots letters whose dots/position fall outside the big P7 display range (1–3 dots, فوق/أسفل):

1. `waw` (0 dots, «لا نقاط») — `assessmentRounds[1].items[1].letterId`
2. `kaf` (0 dots, «لا نقاط») — `assessmentRounds[1].items[3].letterId`

The dots of و/ك are genuinely zero below/above — the data is accurate; the limitation is in the big two-letter P7 display range only. ف (1 dot above) and ق (2 dots above) fall inside the range and produce no warning. Known non-blocking; does not affect boot or assessment (matches the precedent of lessons 02 (4 warnings), 03 (2), 04 (2), 05 (4)). Validator self-test: `SELF-TEST: 4/4` broken models caught → **exit 0**.

## 4. Boot / runtime result (`node phase3-boot.js <ROOT> 06`)

```
06 :: P1:ok(4) | P2:ok(3) | P3:ok(4) | P4:ok(2) | P5:ok(3) | P6:ok(8) | P6-D2:ok(10) | P7:ok(17)
     | P1:ok(1) | P2:ok(1) | P3:ok(1) | P4:ok(1) | P5:ok(1) | P6:ok(1) | P7:ok(1)
     | title:OK | color:OK | leak:06:ZERO      → exit 0
```

`?lesson=06` is resolved by the existing `js/loader.js` (`/[?&]lesson=(\d{2})/` → `js/lesson-06.js`) with **no template change**. P1–P7 boot, P6-D2 round works (bridge + loop), P7 completion works, title reads `المحاضرة السادسة — ف و ق ك`, hero colors are L06 data-driven.

### 4.1 Per-phase verification (P1 → P7)

| Phase | Result | Content verified |
|-------|--------|------------------|
| P1 | ok (4 shots) | intro → universe → spotlight, targetLetters `['ف','و','ق','ك']`, welcomeHint `第六课` |
| P2 | ok (3 shots) | phonemeOrder `fa,waw,qaf,kaf`; silent-listen / choral-repeat / finger-count; finger map ف=1 و=2 ق=3 ك=4 |
| P3 | ok (4 shots) | letterOrder + fixed reveal order `char→dots→phoneme→fact` |
| P4 | ok (2 shots) | 4 strokeGuides (all letters present, colors match letters) |
| P5 | ok (3 shots) | wordOrder all 4 official words; targets ف/و/ق/ك each initial |
| P6 | ok (8 shots) | D1 identify, D2 same/diff, D3 close (ق/ك و ف/ق — أصوات وأشكال متقاربة); demo shows ف/و/ق/ك |
| P6-D2 | ok (10 shots) | bridge + loop wiring intact |
| P7 | ok (17 shots) | Q1 shape, Q2 dots, Q3 sound; completion `المحاضرة السادسة مكتملة` |

`title:OK` — header shows `المحاضرة السادسة — ف و ق ك`. `color:OK` — hero colors are data-driven from `letters[].color` (L06 palette: ف `#E67E22`, و `#16A085`, ق `#880E4F`, ك `#0288D1` — mutually disjoint and a programmatic scan confirms disjoint from all colors in lessons 01–05, including `heroColor`).

## 5. Media path resolution (audio + video, with TTS/video fallback)

`audio-dir-test.js` (lesson 06 added to the harness):

```
PASS:lesson-06:dir=lesson-06
PASS:lesson-06:all-8-paths-namespaced            (4 letter mp3 + 4 word mp3)
PASS:lesson-06:target-dir-exists                  assets/audio/lesson-06/ exists
INFO:lesson-06:files-present=0/8                  (assets not yet supplied — same as lessons 02/03/04/05)
PASS:lesson-06:Audio-src=assets/audio/lesson-06/fa.mp3
PASS:lesson-06:tts-fallback-fired
```

`video-dir-test.js` (lesson 06 added to the harness):

```
PASS:lesson-06:all-4-video-paths-namespaced       assets/videos/lesson-06/*.mp4
PASS:lesson-06:target-dir-exists
INFO:lesson-06:videos-present=0/4                 (assets not yet supplied)
PASS:lesson-06:P4-video-src=assets/videos/lesson-06/fa.mp4
PASS:lesson-06:missing-video-no-crash
```

Logical paths are `assets/audio/…` / `assets/videos/…` exactly like lessons 01–05; the generic resolvers in the protected `js/app.js` namespace them into `assets/audio/lesson-06/` and `assets/videos/lesson-06/`. Missing media is compatible with the TTS/fallback paths — no crash observed.

## 6. Leak check

- Harness-level: `leak:06:ZERO` (boot).
- Distinctive-token scan of `js/lesson-06.js` against **lessons 01, 02, 03, 04 AND 05** (prior target-letter chars, letter ids, word ids, word texts, media basenames, exact color values): **ZERO**. Only prior-letter characters that appear **inside** L06 word strings (e.g., ا/ب within كِتَاب, ل/م within قَلَم, ت within وَقْت) are present — those are expected members of official words, not target-letter reuse.
- Canonical 28-letter `arabicAlphabet` remains the single shared structural value (allowed), byte-identical to L01–L05.
- L06 colors, letter ids (`fa,waw,qaf,kaf`), word ids, audio/video filenames (`fa.mp3` … `kaf.mp4`, `word_qalam.mp3` …) are all new — no L01–L05 value reused. Note: L02 uses `haa`, L04 uses `taa`; L06 `fa/waw/qaf/kaf` are all distinct id strings.

## 7. Non-blocking warnings / notes (as of date)

1. Two schema warnings (§3) — known category, matches lessons 02–05 (data is accurate; display-range limitation only).
2. All referenced media (`assets/audio/fa.mp3` … `assets/audio/word_waqt.mp3`, `assets/videos/qaf.mp4`, …) **do not exist**; like lessons 02–05, the lesson ships the references and the engine degrades gracefully (TTS + missing-video fallback verified). No asset files were added.
3. `meta.nextLesson` is a proposal only: `{chars:'الحروف (غ • ض • ر • ز)', hint:'سنتعلم بقية حروف الهجاء ونقرأ كلمات أطول'}` — editorial, open to change; does not affect this lesson.
4. **Editorial fields** following the L01–L05 house convention (no official source defines them): letter colors, `chinesePinyin`, stroke-guide step texts and video paths, `fact` texts, and p5WordMeta emoji/zh. All marked by the comment `الألوان/النقاط/النطق التحريرية خاصة بهذه المحاضرة` and `(لا تُنسخ من محاضرات سابقة)`. No "official" claim is attached to these.
5. Word diacritics kept exactly as the Blueprint prints them (قَلَم، كِتَاب، فَوْق، وَقْت) — no normalization by the author (house rule since lesson 04).

## 8. Regression (protected/unchanged files)

| File | SHA-256 | vs baseline |
|------|---------|-------------|
| `js/lesson-01.js` | `591804C32A8B9451A4D94712531C9760A9AC2EABF095A53AAAAEF69535F92B09` | unchanged |
| `js/lesson-02.js` | `96BEB452959C2C76AF8052BA12327CEBA582ED7F4B2EEC3A34E3AE80D9F20A10` | unchanged |
| `js/lesson-03.js` | `8912D70E31ED83F13733B8B9859392EF3A36B747609DE11E40AAC4BEE8AF1391` | unchanged |
| `js/lesson-04.js` | `35609CD8FDA537AADAF7AC0123902759ED2DA1A7C6AC57991F5CD3354BC5FE98` | unchanged |
| `js/lesson-05.js` | `0A89060A111F7F81DF10DCF18A7BA88492BFD44CD304A4984507CDDB69EF3787` | unchanged |
| `js/app.js` | `87B37E6B4AC1651A4DE248D746D7EB4A95F35B891A6163DE9ADBBC5159D35078` | unchanged |
| `js/loader.js` | `B335E6EEB62A522E03112C6E06F9593B8E017ADD4A1FC443B075C49150FD953A` | unchanged |
| `schema/lesson-schema.js` | `8E6B3EB8E487E04A4461C8E277DBA90EB7E106CC32841158A433CBFB65843C88` | unchanged |
| `lecture.html` | `CB2C9D3C3903391B18C7800841A6DB1B6FE9ECCC2E9C2A4E170A42DE45F43A3B` | unchanged |
| `js/activities/*` (7 files) | intact | unchanged |
| `js/engine/*` (3 files) | intact | unchanged |
| `css/style.css` | `7D459C6A9C5CFF3670DAA721692CED34462CD8E796818A9C0F3A5774D016F727` | unchanged |

No tree modification outside `js/lesson-06.js` and `MD/LESSON_06_RESULT.md`.

---

**Per CASE A: done. Lesson 06 is created and validated against official sources. No Lesson 07, no Phase 5, no redesign, no refactoring. Gate closed.**