# LESSON_07_RESULT.md — Adding Lesson 07 (غ ض ر ز)

> **Date:** 2026-09-19
> **Scope:** Author `js/lesson-07.js` only, against the official sources (Pedagogical Blueprint + QD-16 phonetics), plus one **author-ratified** vocabulary word (زهرة), and prove the template runs it via `lecture.html?lesson=07` with zero schema errors and zero cross-lesson leakage.
> **Prior gate:** exhaustive source-led audit (Blueprint + QD-16 + runtime chain + repo-wide token scan, see `MD/LESSON_07_INVESTIGATION_REPORT.md`) found **ز** had **no official vocabulary word** in any source → **CASE B** blocker. **Resolved by author approval:** the project owner ratified **زهرة** as Author-Approved Vocabulary, to be written in the data **without diacritics** (زهرة — not modified to any other form). With زهرة adopted, Lesson 07 becomes **CASE A**.
> **Status:** ✅ DONE — gate green, awaiting next instruction.

---

## 1. What was created

| Path | Type | Notes |
|------|------|-------|
| `js/lesson-07.js` | NEW | Complete lesson data, same 15-key contract as lessons 01–06, ends with `Object.freeze(LESSON)`. |
| `MD/LESSON_07_RESULT.md` | NEW | This report. |
| `MD/LESSON_07_INVESTIGATION_REPORT.md` | EXISTING (kept) | The prior CASE B gap report documenting why ز had no official vocabulary (superseded by the author approval of زهرة; not deleted). |

No other template file was modified. `lecture.html`, `js/app.js`, `js/loader.js`, `js/engine/*`, `js/activities/*`, `css/*`, `assets/*`, `js/lesson-01.js` … `js/lesson-06.js`, `schema/lesson-schema.js` are untouched (SHA-256 verified, §8). No asset file was added — the new lesson references audio/video paths exactly like the frozen lessons do.

## 2. Content sourcing (official sources + one author-ratified word)

### 2.0 Scope determination — derivation of the letter set

Lesson 07 was derived from the **existing runtime chain** (primary implementation reference) and confirmed verbatim by the official Pedagogical Blueprint:

| Step | Evidence | Result |
|------|----------|--------|
| Runtime chain anchor | `js/lesson-06.js → meta.nextLesson`: `{chars:'الحروف (غ • ض • ر • ز)', hint:'سنتعلم بقية حروف الهجاء ونقرأ كلمات أطول'}` (l.59–61) | Lesson 07 = **غ ض ر ز** |
| QD-16 phonemes | غ (l.356), ض (l.358); ز ر ل.270 `<الهمزة ز ر>/ʔ/ /z/ /r/` | /غ/ /ض/ /ر/ /ز/ |

### 2.1 Letters, phonemes/IPA (QD-16)

| Letter | id | `phoneme` (P2, per QD-16) | `ipa` (reference only) | dots | dotPosition |
|--------|----|---------------------------|------------------------|------|-------------|
| غ | `ghayn` | /غ/ | ɣ | 1 | فوق |
| ض | `dad` | /ض/ | dˤ | 1 | فوق |
| ر | `raa` | /ر/ | r | 0 | لا نقاط |
| ز | `zay` | /ز/ | z | 1 | فوق |

QD-16 drives the convention: `phoneme` = `/حرف/` Arabic-in-slash for P2; `ipa` and `chinesePinyin` remain reference-only metadata, never displayed in P2 (matches lessons 01–06).

### 2.2 Vocabulary — every candidate word with its source

| Word | target letter/pos | Source document | Source lesson / line | Status |
|------|-------------------|-----------------|----------------------|--------|
| غرفة (room) | غ @ `[0]` | Pedagogical Blueprint (المفردات) | L4, l.165 `عَيْن — غُرْفَة — حَال — خَيْر` | OFFICIAL |
| ضحك (laughter) | ض @ `[0]` | Pedagogical Blueprint (المفردات) | L7, l.258 `دَرْس — صَفّ — شَبَاب — ضَحِك — أَدْرُس` | OFFICIAL |
| رقم (number) | ر @ `[0]` | Pedagogical Blueprint (الجمل المستهدفة) | L6, l.228 `كَمْ رَقَمُ هَاتِفِكَ؟` | OFFICIAL |
| زهرة (flower) | ز @ `[0]` | Author-Approved Vocabulary | — (ز had no official word — see investigation report) | **AUTHOR-APPROVED** |

**One word is Author-Approved, not official:** زهرة. The exhaustive audit (504 unique ز-words across every authoritative source) found **no official ز content word** — BP L6 (the ز ر lesson) ships numbers+sentences only, and جَوْز is already claimed by ج in lesson-02. The author subsequently ratified **زهرة**. Per instruction it is written in the data **exactly as** `زهرة` (no diacritics, not modified to any other form). The three remaining words are verbatim official Blueprint vocabulary.

**House rule on diacritics (per the author's explicit instruction for Lesson 07):** all four words are written in the data **without harakat** — `غرفة`, `ضحك`, `رقم`, `زهرة` (this is the intended deviation from lessons 01–06, which keep the Blueprint's diacritics; the author required the no-diacritics form for this lesson, and زهرة specifically must never be altered). `chars[]` records the bare Arabic letters per the schema's `isArabicChar` rule.

### 2.3 Vocabulary coverage per letter (schema rule: every letter targeted by ≥1 word)

| Letter | Word | `targetPositions` (verified vs `chars` via Unicode) |
|--------|------|------------------------------------------------------|
| غ | غرفة | `[0]` chars `['غ','ر','ف','ة']` ✓ |
| ض | ضحك | `[0]` chars `['ض','ح','ك']` ✓ |
| ر | رقم | `[0]` chars `['ر','ق','م']` ✓ |
| ز | زهرة | `[0]` chars `['ز','ه','ر','ة']` ✓ |

All four `chars[].targetPositions` verified programmatically against the real Unicode sequences (Node inspection; every position `chars[pos] === target.char`, codepoints U+063A/U+0636/U+0631/U+0632) — no visual-letter assumptions.

## 3. Schema gate (`node schema/lesson-schema.js js/lesson-07.js`)

```
lesson-07.js   summary: 0 أخطاء | 1 توصيات     → exit 0
```

Zero errors. The **1 warning is the same known, documented, non-blocking category** present in lessons 02–06 — count-dots letters whose dots/position fall outside the big P7 display range (1–3 dots, فوق/أسفل):

1. `raa` (0 dots, «لا نقاط») — `assessmentRounds[1].items[2].letterId`

The dots of ر are genuinely zero below/above — the data is accurate; the limitation is in the big two-letter P7 display range only. غ (1 فوق), ض (1 فوق), ز (1 فوق) fall inside the range and produce no warning. Known non-blocking; does not affect boot or assessment (same precedent class as L06 و/ك). Validator self-test: `SELF-TEST: 4/4` broken models caught → **exit 0**.

## 4. Boot / runtime result (`node phase3-boot.js <ROOT> 07`)

```
07 :: P1:ok(4) | P2:ok(3) | P3:ok(4) | P4:ok(2) | P5:ok(3) | P6:ok(8) | P6-D2:ok(10) | P7:ok(17)
     | P1:ok(1) | P2:ok(1) | P3:ok(1) | P4:ok(1) | P5:ok(1) | P6:ok(1) | P7:ok(1)
     | title:OK | color:OK | leak:07:ZERO      → exit 0
```

`?lesson=07` is resolved by the existing `js/loader.js` (`/[?&]lesson=(\d{2})/` → `js/lesson-07.js`) with **no template change**. P1–P7 boot, P6-D2 round works (bridge + loop), P7 completion works, title reads `المحاضرة السابعة — غ ض ر ز`, hero colors are L07 data-driven.

### 4.1 Per-phase verification (P1 → P7)

| Phase | Result | Content verified |
|-------|--------|------------------|
| P1 | ok (4 shots) | intro → universe → spotlight, targetLetters `['غ','ض','ر','ز']`, welcomeHint `第七课` |
| P2 | ok (3 shots) | phonemeOrder `ghayn,dad,raa,zay`; silent-listen / choral-repeat / finger-count; finger map غ=1 ض=2 ر=3 ز=4 |
| P3 | ok (4 shots) | letterOrder + fixed reveal order `char→dots→phoneme→fact` |
| P4 | ok (2 shots) | 4 strokeGuides (all letters present, colors match letters) |
| P5 | ok (3 shots) | wordOrder all 4 words (غرفة، ضحك، رقم، زهرة); targets غ/ض/ر/ز each initial |
| P6 | ok (8 shots) | D1 identify, D2 same/diff, D3 close (ر/ز و غ/ض — أصوات وأشكال متقاربة); demo shows غ/ض/ر/ز |
| P6-D2 | ok (10 shots) | bridge + loop wiring intact |
| P7 | ok (17 shots) | Q1 shape, Q2 dots, Q3 sound; completion `المحاضرة السابعة مكتملة` |

`title:OK` — header shows `المحاضرة السابعة — غ ض ر ز`. `color:OK` — hero colors are data-driven from `letters[].color` (L07 palette: غ `#5D4037`, ض `#1976D2`, ر `#388E3C`, ز `#F39C12` — mutually disjoint, and the programmatic scan confirms disjoint from every color in lessons 01–06 including `heroColor`).

## 5. Media path resolution (audio + video, with TTS/video fallback)

`audio-dir-test.js` (lesson 07 added to the harness):

```
PASS:lesson-07:dir=lesson-07
PASS:lesson-07:all-8-paths-namespaced            (4 letter mp3 + 4 word mp3)
PASS:lesson-07:target-dir-exists                  assets/audio/lesson-07/ exists
INFO:lesson-07:files-present=0/8                  (assets not yet supplied — same as lessons 02–06)
PASS:lesson-07:Audio-src=assets/audio/lesson-07/ghayn.mp3
PASS:lesson-07:tts-fallback-fired
```

`video-dir-test.js` (lesson 07 added to the harness):

```
PASS:lesson-07:all-4-video-paths-namespaced       assets/videos/lesson-07/*.mp4
PASS:lesson-07:target-dir-exists
INFO:lesson-07:videos-present=0/4                 (assets not yet supplied)
PASS:lesson-07:P4-video-src=assets/videos/lesson-07/ghayn.mp4
PASS:lesson-07:missing-video-no-crash
```

Logical paths are `assets/audio/…` / `assets/videos/…` exactly like lessons 01–06 (no literal `lesson-07` in the data); the generic resolvers in the protected `js/app.js` namespace them into `assets/audio/lesson-07/` and `assets/videos/lesson-07/`. Missing media is compatible with the TTS/fallback paths — no crash observed.

## 6. Leak check

- Harness-level: `leak:07:ZERO` (boot).
- Distinctive-token scan of `js/lesson-07.js` against **lessons 01, 02, 03, 04, 05 AND 06** (`leakscan-l07.js`: prior target-letter chars, letter ids, word ids, word texts, media basenames, exact color values, meta title/docTitle): **ZERO**. Only prior-letter characters that appear **inside** L07 word strings (e.g., ر within غرفة/زهرة, ق/م within رقم, ح/ك within ضحك, ف/ة within غرفة, ه/ة within زهرة) are present — those are expected members of the approved words, not target-letter reuse.
- Canonical 28-letter `arabicAlphabet` remains the single shared structural value (allowed), byte-identical to L01–L06.
- L07 colors, letter ids (`ghayn,dad,raa,zay`), word ids (`ghurfa,dahk,raqm,zahra`), audio/video filenames (`ghayn.mp3` … `zay.mp4`, `word_ghurfa.mp3` …) are all new — no L01–L06 value reused (L02 uses `khaa`, L04 uses `dhal`; L07 ids are distinct).

## 7. Non-blocking warnings / notes (as of date)

1. One schema warning (§3) — known category, matches lessons 02–06 (ر 0 dots; data is accurate; display-range limitation only).
2. **زهرة is Author-Approved Vocabulary — not from the official Blueprint.** It is written exactly as `زهرة` (no harakat). If the author ever replaces it, only `js/lesson-07.js` words/p5WordMeta/p5RevealSteps/P5.wordOrder change; the letter set and runtime stay untouched.
3. All referenced media (`assets/audio/ghayn.mp3` … `assets/audio/word_zahra.mp3`, `assets/videos/ghayn.mp4`, …) **do not exist**; like lessons 02–06, the lesson ships the references and the engine degrades gracefully (TTS + missing-video fallback verified). No asset files were added.
4. `meta.nextLesson` is a proposal only: `{chars:'الحروف (ل)', hint:'سنتعلم لام التعريف ونقرأ كلمات أطول'}` — editorial (the last untaught alphabet letter is ل), open to change; does not affect this lesson.
5. **Editorial fields** following the L01–L06 house convention (no official source defines them): letter colors, `chinesePinyin`, stroke-guide step texts and video paths, `fact` texts, and p5WordMeta emoji/zh. All marked by the comment `لا تُنسخ من محاضرات سابقة`. No "official" claim is attached to these.
6. **Words are written without harakat** (غرفة، ضحك، رقم، زهرة) per the author's explicit instruction for Lesson 07 — a deliberate, documented deviation from lessons 01–06 (which keep the Blueprint's diacritics). `chars[]` remains bare letters as always.

## 8. Regression (protected/unchanged files)

| File | SHA-256 | vs baseline |
|------|---------|-------------|
| `js/lesson-01.js` | `591804C32A8B9451A4D94712531C9760A9AC2EABF095A53AAAAEF69535F92B09` | unchanged |
| `js/lesson-02.js` | `96BEB452959C2C76AF8052BA12327CEBA582ED7F4B2EEC3A34E3AE80D9F20A10` | unchanged |
| `js/lesson-03.js` | `8912D70E31ED83F13733B8B9859392EF3A36B747609DE11E40AAC4BEE8AF1391` | unchanged |
| `js/lesson-04.js` | `35609CD8FDA537AADAF7AC0123902759ED2DA1A7C6AC57991F5CD3354BC5FE98` | unchanged |
| `js/lesson-05.js` | `0A89060A111F7F81DF10DCF18A7BA88492BFD44CD304A4984507CDDB69EF3787` | unchanged |
| `js/lesson-06.js` | `51CDB211F5E7E311E162E0321F70374EAFA328FAE79EF7452677A45656E71A87` | unchanged |
| `js/app.js` | `87B37E6B4AC1651A4DE248D746D7EB4A95F35B891A6163DE9ADBBC5159D35078` | unchanged |
| `js/loader.js` | `B335E6EEB62A522E03112C6E06F9593B8E017ADD4A1FC443B075C49150FD953A` | unchanged |
| `schema/lesson-schema.js` | `8E6B3EB8E487E04A4461C8E277DBA90EB7E106CC32841158A433CBFB65843C88` | unchanged |
| `lecture.html` | `CB2C9D3C3903391B18C7800841A6DB1B6FE9ECCC2E9C2A4E170A42DE45F43A3B` | unchanged |
| `js/activities/*` (7 files) | intact | unchanged |
| `js/engine/*` (3 files) | intact | unchanged |
| `css/style.css` | `7D459C6A9C5CFF3670DAA721692CED34462CD8E796818A9C0F3A5774D016F727` | unchanged |

No tree modification outside `js/lesson-07.js` and `MD/LESSON_07_RESULT.md`.

---

**Per CASE A: done. Lesson 07 is created and validated — three words official (غرفة/ضحك/رقم), one author-ratified (زهرة). No Lesson 08, no Phase 5, no redesign, no refactoring. Gate closed.**