# PHASE_4_RESULT.md — Formal Lesson Data Contract

> **Date:** 2026-09-18
> **Scope:** Formalize the implicit `LESSON.XX` data contract of `js/lesson-XX.js` into a single Node-only validator, without touching any runtime, data, or asset file.
> **Status:** ✅ DONE — gate green, awaiting next instruction.

---

## 1. What was added

| Path | Type | Purpose |
|------|------|---------|
| `schema/lesson-schema.js` | NEW | Validator + CLI + negative self-tests. Node ≥12, zero dependencies, **never loaded by `lecture.html`**. Its header comment is the living contract document. |
| `TEMPLATE_MANIFEST.md` | UPDATED | Classification row 2c, file count 76→77, Phase 4 verification rows, «Creating a new lesson (Phase 4 gate)» procedure. |
| `PHASE_4_RESULT.md` | NEW | This report. |

No other file was modified. `lecture.html`, `js/app.js`, `js/loader.js`, `js/engine/*`, `js/activities/*`, `css/*`, `assets/*`, `js/lesson-01.js`, `js/lesson-02.js` are untouched (SHA-256 verified, §5).

## 2. The contract formalized

- **15 top-level keys:** `meta, p4WritingPracticeDeferred, letters, strokeGuides, words, p5WordMeta, p5RevealSteps, p6Demo, p6Strings, discriminationRounds, p7Prompts, assessmentRounds, arabicAlphabet, targetLetterIds, phases`.
- **Phases:** exactly 7, ids `P1..P7` in order, `number === index+1`.
- **Fixed key orders:** `P3.revealSteps` → `char, dots, phoneme, fact`; `p5RevealSteps` → `context, target, identity, audio`.
- **Set-equality:** `letterOrder`, `phonemeOrder`, `wordOrder`, `roundOrder` must cover their collections exactly once; `fingerCountMap` keys == letters ids.
- **No orphans / broken refs:** every letter appears in a discrimination round and in an assessment round and is targeted by ≥1 word; every ref resolves; duplicates detected.
- **Cross-field consistency:** `strokeGuides[].color` and `words[].color` == the target letter's `color`; completion chars match `letters`.
- **Authoring discipline:** `meta.id` matches the filename; `Object.freeze(LESSON)` required.

## 3. Runtime facts encoded (verified against `js/app.js`)

- `phases[i].duration` is **display text** (`app.js` line 231: `dur.textContent = phase.duration`). It is NOT required to contain a specific word.
- `_parseDuration` (`app.js` line 199) uses `/\d+/g`, which in JavaScript matches Latin digits only; for the lessons' Arabic-Indic digits (`٠ — ١٠ دقائق`) it returns `null` and the countdown is simply not shown. The validator therefore only requires a non-empty string for `duration`.
- These facts were double-checked at runtime with Node (`\d+` on `٠ — ١٠ دقائق` → `null`).

## 4. Validator results

### 4.1 Data files (`node schema/lesson-schema.js`)

```
lesson-01.js   PASS — 0 أخطاء، 0 توصيات
lesson-02.js   0 أخطاء | 4 توصيات (موثقة، غير حاجبة)
RESULT: 2 ملف | 0 خطأ | 4 توصية      → exit 0
```

### 4.2 lesson-02 documented warnings (known, non-blocking)

All 4 are the same known category — count-dots letters whose dots/position fall outside the big two-letter P7 display range (1-3 dots, فوق/أسفل):

1. `jeem` (1 dot, «داخل الجسم») — `assessmentRounds[1].items[0]`
2. `ayn` (0 dots, «لا نقاط») — `assessmentRounds[1].items[1]`
3. `haa` (0 dots, «لا نقاط») — `assessmentRounds[1].items[2]`
4. `khaa` (0 dots, «لا نقاط») — `assessmentRounds[1].items[3]`

These exist by design in the frozen lesson data (the visual P7 display shows only above/below dots for 1-3 counts); the P7 engine renders them via its fallback path. They do not block boot or assessment.

### 4.3 Negative self-tests

```
PASS 1/4  duplicate letters.id               → معرف مكرر: "ba"
PASS 2/4  missing words.targetLetterId       → مرجع مفقود: الحرف "zzz"
PASS 3/4  P3 revealSteps order broken        → الترتيب ثابت: char → dots → phoneme → fact
PASS 4/4  Object.freeze removed              → LESSON غير مجمَّد
```

### 4.4 Corrections made against the draft during execution

1. **Duration rule** — the draft required the string to contain «دقيقة»; the real runtime contract (display text, §3) does not. Fixed to non-empty string. This removed a false ERROR that had fired on both lessons.
2. **D1 permutation "preference"** — not part of the approved rule set and fired on frozen lessons; removed.
3. **Warning count** — the plan predicted 2 count-dots warnings for lesson-02; the data actually contains **4** (jeem/ayn/haa/khaa). Same rule, documented truth.

## 5. Regression gates (all green)

| Gate | Result |
|------|--------|
| `lesson-01.js` SHA-256 = `591804C32A8B9451A4D94712531C9760A9AC2EABF095A53AAAAEF69535F92B09` | unchanged |
| `lesson-02.js` SHA-256 = `96BEB452959C2C76AF8052BA12327CEBA582ED7F4B2EEC3A34E3AE80D9F20A10` | unchanged |
| Boot `?lesson=01` (phase3-boot.js) | exit 0 — P1..P7 + P6-D2 all ok, title OK, color OK, leak ZERO |
| Boot `?lesson=02` | exit 0 — same full coverage |
| Capture `?lesson=01` vs Phase 3 baseline | shots identical |
| Capture `?lesson=02` vs Phase 3 baseline | shots identical |

## 6. Documentation note

`Templet_MD/04_VARIABLE_DATA_MAP.md` documents a non-existent `meta.mvpPhases` key and is therefore stale. It is treated as a frozen archive; the schema header comment in `schema/lesson-schema.js` is now the authoritative data reference.

## 7. Standby status

Phase 4 is complete and the template is green. Work is **STOPPED**, awaiting your next instruction. Per the approved plan: no Lesson 03, no Phase 4.5, no Phase 5 unless you request them.