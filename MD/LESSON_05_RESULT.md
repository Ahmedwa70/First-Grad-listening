# LESSON_05_RESULT.md — Adding Lesson 05 (م ي ا ه)

> **Date:** 2026-09-18
> **Scope:** Author `js/lesson-05.js` only, against the official sources (Pedagogical Blueprint + QD-16 phonetics), and prove the template runs it via `lecture.html?lesson=05` with zero schema errors and zero cross-lesson leakage.
> **Prior gate:** source-led audit (Blueprint lesson 2 + runtime chain) — every target letter had ≥1 official word → **CASE A** from the start, no blocking gap.
> **Status:** ✅ DONE — gate green, awaiting next instruction.

---

## 1. What was created

| Path | Type | Notes |
|------|------|-------|
| `js/lesson-05.js` | NEW | Complete lesson data, same 15-key contract as lessons 01–04, ends with `Object.freeze(LESSON)`. |
| `MD/LESSON_05_RESULT.md` | NEW | This report. |

No other template file was modified. `lecture.html`, `js/app.js`, `js/loader.js`, `js/engine/*`, `js/activities/*`, `css/*`, `assets/*`, `js/lesson-01.js` … `js/lesson-04.js`, `schema/lesson-schema.js` are untouched (SHA-256 verified, §8). No asset file was added — the new lesson references audio/video paths exactly like the frozen lessons do.

## 2. Content sourcing (official sources only)

### 2.0 Scope determination — derivation of the letter set

Lesson 05 was **not** chosen from an old roadmap grouping. It was derived from the **existing runtime chain**, which is the primary implementation reference:

| Step | Evidence | Result |
|------|----------|--------|
| Runtime chain anchor | `js/lesson-04.js → meta.nextLesson`: `{chars:'الحروف (م • ي • ا • ه)', hint:'سنتعلم الحروف المتصلة والممدودة'}` | Lesson 05 = **م ي ا ه** |
| Official letter lesson | Pedagogical Blueprint, lesson 2 («الحروف م ي ا — وأول مقاطع», BP §line 95-118) | م ي ا is an official 3-letter group with official vocabulary and target sentences |
| Official ه coverage | هَذَا (Blueprint L1/L2 sentences, lines 73/104), هُوَ (Blueprint lesson 10, line 350) | ه fully supported by official sentences/vocabulary |

The L01→L04 runtime chain (ب ت ث ن → ج ح خ ع → س ش ص → د ذ ط ظ) already overrides the older blueprint grouping; the chain's own `meta.nextLesson` declaration — not the blueprint lesson index — is what commits to م • ي • ا • ه.

### 2.1 Letters, phonemes/IPA (QD-16 / Blueprint)

| Letter | id | `phoneme` (P2, per QD-16) | `ipa` (reference only) | dots | dotPosition | Blueprint rationale |
|--------|----|---------------------------|------------------------|------|-------------|---------------------|
| م | `meem` | /م/ | m | 1 | تحت | شائعة جدًا في بداية الكلمات (BP lesson 2) |
| ي | `ya` | /ي/ | j | 2 | تحت | شائعة جدًا في بداية الكلمات (BP lesson 2) |
| ا | `alif` | /ا/ | aː | 0 | لا نقاط | حرف مدّ بعد الفتحة مباشرةً: بَ + ا = بَا (BP lesson 2) |
| ه | `heh` | /ه/ | h | 0 | لا نقاط | من المحادثات الرسمية: هَذَا / هُوَ (BP L1/L2/L10) |

QD-16 (Phonetic Representation Decision) drives the convention: `phoneme` = `/حرف/` Arabic-in-slash for P2; `ipa` and `chinesePinyin` remain reference-only metadata, never displayed in P2 (matches lessons 01–04).

### 2.2 Vocabulary — every candidate word with its source

| Word | target letter/pos | Source document | Source lesson / line | Status |
|------|-------------------|-----------------|----------------------|--------|
| مَاء (water) | م @ `[0]` | Pedagogical Blueprint (المفردات) | L2, line 103 | OFFICIAL |
| يَد (hand) | ي @ `[0]` | Pedagogical Blueprint (المفردات) | L2, line 103 | OFFICIAL |
| أَمَل (hope) | م @ `[1]` | Pedagogical Blueprint (المفردات) | L2, line 103 | OFFICIAL |
| نَام (slept) | ا @ `[1]` | Pedagogical Blueprint (المفردات) | L2, line 103 | OFFICIAL (alif medial) |
| هَذَا (this) | ه @ `[0]` | Pedagogical Blueprint (الجمل المستهدفة) | L1 line 73 / L2 line 104 | OFFICIAL |
| هُوَ (he) | ه @ `[0]` | Pedagogical Blueprint (الجملة هُوَ طَالِبٌ) | L10, line 350 | OFFICIAL |
| هَذِهِ (this f.) | ه @ `[0,2]` | Pedagogical Blueprint (الجمل المستهدفة) | L2, line 104 | OFFICIAL |

**No vocabulary was invented.** Every word is verbatim from the official Blueprint vocabulary/target-sentence lists (spelling and diacritics kept as the source shows — no normalization, same house rule as lesson 04). All four target letters are covered by ≥1 official word (schema rule). `أَمَل` and `نَام` carry حرف الهمزة «أ»/الفتحة exactly as the source prints them; `chars[]` records the bare Arabic letters per the schema's `isArabicChar` rule (no diacritics in `chars`).

### 2.3 Vocabulary coverage per letter (schema rule: every letter targeted by ≥1 word)

| Letter | Words | `targetPositions` (verified vs `chars`) |
|--------|-------|------------------------------------------|
| م | مَاء · أَمَل | `[0]` chars `['م','ا','ء']` ✓ · `[1]` chars `['أ','م','ل']` ✓ |
| ي | يَد | `[0]` chars `['ي','د']` ✓ |
| ا | نَام | `[1]` chars `['ن','ا','م']` ✓ (medial alif) |
| ه | هَذَا · هُوَ · هَذِهِ | `[0]` chars `['ه','ذ','ا']` ✓ · `[0]` chars `['ه','و']` ✓ · `[0,2]` chars `['ه','ذ','ه']` ✓ (initial + final) |

All seven word `chars[].targetPositions` were verified programmatically against the actual Unicode character sequences (Node inspection; no diacritics in `chars`). `هَذِهِ` correctly carries both alif-free ه occurrences at positions 0 and 2.

## 3. Schema gate (`node schema/lesson-schema.js js/lesson-05.js`)

```
lesson-05.js   summary: 0 أخطاء | 4 توصيات     → exit 0
```

Zero errors. The **4 warnings are the same known, documented, non-blocking category** present in lessons 02–04 — count-dots letters whose dots/position fall outside the big P7 display range (1–3 dots, فوق/أسفل):

1. `meem` (1 dot, «تحت») — `assessmentRounds[1].items[0].letterId`
2. `ya` (2 dots, «تحت») — `assessmentRounds[1].items[1].letterId`
3. `alif` (0 dots, «لا نقاط») — `assessmentRounds[1].items[2].letterId`
4. `heh` (0 dots, «لا نقاط») — `assessmentRounds[1].items[3].letterId`

The dots of م/ي are genuinely below the letter and ا/ه genuinely have zero dots — the data is accurate; the limitation is in the big two-letter P7 display range only. Known non-blocking; does not affect boot or assessment (matches the precedent of lessons 02 (4 warnings), 03 (2), 04 (2)). Validator self-test: `SELF-TEST: 4/4` broken models caught → **exit 0**.

## 4. Boot / runtime result (`node phase3-boot.js <ROOT> 05`)

```
05 :: P1:ok(4) | P2:ok(3) | P3:ok(4) | P4:ok(2) | P5:ok(3) | P6:ok(8) | P6-D2:ok(10) | P7:ok(17)
     | P1:ok(1) | P2:ok(1) | P3:ok(1) | P4:ok(1) | P5:ok(1) | P6:ok(1) | P7:ok(1)
     | title:OK | color:OK | leak:05:ZERO      → exit 0
```

`?lesson=05` is resolved by the existing `js/loader.js` (`/[?&]lesson=(\d{2})/` → `js/lesson-05.js`) with **no template change**. P1–P7 boot, P6-D2 round works (bridge + loop), P7 completion works, title reads `المحاضرة الخامسة — م ي ا ه`, hero colors are L05 data-driven.

### 4.1 Per-phase verification (P1 → P7)

| Phase | Result | Content verified |
|-------|--------|------------------|
| P1 | ok (4 shots) | intro → universe → spotlight, targetLetters `['م','ي','ا','ه']`, welcomeHint `第五课` |
| P2 | ok (3 shots) | phonemeOrder `meem,ya,alif,heh`; silent-listen / choral-repeat / finger-count; finger map م=1 ي=2 ا=3 ه=4 |
| P3 | ok (4 shots) | letterOrder + fixed reveal order `char→dots→phoneme→fact` |
| P4 | ok (2 shots) | 4 strokeGuides (all letters present, colors match letters) |
| P5 | ok (3 shots) | wordOrder all 7 official words; targets م/ي/ا/ه incl. medial alif (نَام) and initial+final ه (هَذِهِ) |
| P6 | ok (8 shots) | D1 identify, D2 same/diff, D3 close (م/ه و ي/ا وأشكال الأشكال المتقاربة); demo shows م/ي/ا/ه |
| P6-D2 | ok (10 shots) | bridge + loop wiring intact |
| P7 | ok (17 shots) | Q1 shape, Q2 dots, Q3 sound; completion `المحاضرة الخامسة مكتملة` |

`title:OK` — header shows `المحاضرة الخامسة — م ي ا ه`. `color:OK` — hero colors are data-driven from `letters[].color` (L05 palette: م `#607D8B`, ي `#FFC107`, ا `#9C27B0`, ه `#D32F2F` — mutually disjoint and a programmatic scan confirms disjoint from all colors in lessons 01–04, including `heroColor`).

## 5. Media path resolution (audio + video, with TTS/video fallback)

`audio-dir-test.js` (lesson 05 added to the harness):

```
PASS:lesson-05:dir=lesson-05
PASS:lesson-05:all-11-paths-namespaced            (4 letter mp3 + 7 word mp3)
PASS:lesson-05:target-dir-exists                  assets/audio/lesson-05/ exists
INFO:lesson-05:files-present=0/11                 (assets not yet supplied — same as lessons 02/03/04)
PASS:lesson-05:Audio-src=assets/audio/lesson-05/meem.mp3
PASS:lesson-05:tts-fallback-fired
```

`video-dir-test.js` (lesson 05 added to the harness):

```
PASS:lesson-05:all-4-video-paths-namespaced       assets/videos/lesson-05/*.mp4
PASS:lesson-05:target-dir-exists
INFO:lesson-05:videos-present=0/4                 (assets not yet supplied)
PASS:lesson-05:P4-video-src=assets/videos/lesson-05/meem.mp4
PASS:lesson-05:missing-video-no-crash
```

Logical paths are `assets/audio/…` / `assets/videos/…` exactly like lessons 01–04; the generic resolvers in the protected `js/app.js` namespace them into `assets/audio/lesson-05/` and `assets/videos/lesson-05/`. Missing media is compatible with the TTS/fallback paths — no crash observed.

## 6. Leak check

- Harness-level: `leak:05:ZERO` (boot).
- Distinctive-token scan of `js/lesson-05.js` against **lessons 01, 02, 03 AND 04** (prior target-letter chars, letter ids, word ids, word texts, media basenames, exact color values): **ZERO**. Only prior-letter characters that appear **inside** L05 word strings (e.g., د within يَد, ذ within هَذَا/هَذِهِ, ن within نَام) are present — those are expected members of official words, not target-letter reuse.
- Canonical 28-letter `arabicAlphabet` remains the single shared structural value (allowed), byte-identical to L01–L04.
- L05 colors, letter ids (`meem,ya,alif,heh`), word ids, audio/video filenames (`meem.mp3`, `word_hadhihi.mp3`, `ya.mp4`, …) are all new — no L01–L04 value reused.

## 7. Non-blocking warnings / notes (as of date)

1. Four schema warnings (§3) — known category, matches lessons 02–04 (data is accurate; display-range limitation only).
2. All referenced media (`assets/audio/meem.mp3`, `word_hadhihi.mp3`, `assets/videos/alif.mp4`, …) **do not exist**; like lessons 02–04, the lesson ships the references and the engine degrades gracefully (TTS + missing-video fallback verified). No asset files were added.
3. `meta.nextLesson` is a proposal only: `{chars:'الحروف (ف • و • ق • ك)', hint:'سنتعلم حروفاً جديدة ونقرأ مقاطع بالضمة'}` — editorial, open to change; does not affect this lesson.
4. **Editorial fields** following the L01–L04 house convention (no official source defines them): letter colors, `chinesePinyin`, stroke-guide step texts and video paths, `fact` texts, and p5WordMeta emoji/zh. All marked by the comment `الألوان/النقاط/النطق التحريرية خاصة بهذه المحاضرة` and `(لا تُنسخ من محاضرات سابقة)`. No "official" claim is attached to these.
5. Word diacritics kept exactly as the Blueprint prints them (مَاء، أَمَل، نَام، هَذِهِ، هُوَ) — no normalization by the author (house rule since lesson 04).

## 8. Regression (protected/unchanged files)

| File | SHA-256 | vs baseline |
|------|---------|-------------|
| `js/lesson-01.js` | `591804C32A8B9451A4D94712531C9760A9AC2EABF095A53AAAAEF69535F92B09` | unchanged |
| `js/lesson-02.js` | `96BEB452959C2C76AF8052BA12327CEBA582ED7F4B2EEC3A34E3AE80D9F20A10` | unchanged |
| `js/lesson-03.js` | `8912D70E31ED83F13733B8B9859392EF3A36B747609DE11E40AAC4BEE8AF1391` | unchanged |
| `js/lesson-04.js` | `35609CD8FDA537AADAF7AC0123902759ED2DA1A7C6AC57991F5CD3354BC5FE98` | unchanged |
| `js/app.js` | `87B37E6B4AC1651A4DE248D746D7EB4A95F35B891A6163DE9ADBBC5159D35078` | unchanged |
| `js/loader.js` | `B335E6EEB62A522E03112C6E06F9593B8E017ADD4A1FC443B075C49150FD953A` | unchanged |
| `schema/lesson-schema.js` | `8E6B3EB8E487E04A4461C8E277DBA90EB7E106CC32841158A433CBFB65843C88` | unchanged |
| `lecture.html` | `CB2C9D3C3903391B18C7800841A6DB1B6FE9ECCC2E9C2A4E170A42DE45F43A3B` | unchanged |
| `js/activities/*` (7 files) | intact | unchanged |
| `js/engine/*` (3 files) | intact | unchanged |
| `css/style.css` | `7D459C6A9C5CFF3670DAA721692CED34462CD8E796818A9C0F3A5774D016F727` | unchanged |

No tree modification outside `js/lesson-05.js` and `MD/LESSON_05_RESULT.md`.

---

**Per CASE A: done. Lesson 05 is created and validated against official sources. No Lesson 06, no Phase 5, no redesign, no refactoring. Gate closed.**