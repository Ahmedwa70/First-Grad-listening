# LESSON_09_INVESTIGATION_REPORT — Source-Audit for Lesson 09

> **Date:** 2026-09-19
> **Task rule:** Official source → existing schema → Lesson 09. Never guess → invent → force into schema. Runtime `nextLesson` metadata is supporting evidence only — never overrides authoritative curriculum.
> **Verdict:** ⛔ **CASE B — NOT fully supported.** No `js/lesson-09.js` is created. No template file is modified. This report identifies the gap and why the official Lesson 09 cannot be built under the current lesson-data contract.

---

## Executive summary

Lesson 09 is officially **«الشدة — حرفان في واحد»** (the **shadda / gemination** lesson) — a **grammar/orthography (diacritics) lesson**, not a plain new-letter lesson. It fails the current contract on **four independent, irreversible grounds**:

1. **Letter-set gate:** the officially named new letter is **ج alone** (plus the shadda applied to *all* letters). The schema hard-requires **≥ 2 target letters** (`lesson-schema.js` L148–149). A single-letter lesson fails at root.
2. **Cross-lesson leakage:** **ج is already taught in runtime Lesson 02** (`js/lesson-02.js` → `targetLetters: ج ح خ ع`). Any L09 containing ج as a target letter would leak L02 content — which the leak gate forbids.
3. **Vocabulary gate:** the official vocabulary **مُحَمَّد — جَدَّة — حُبّ — دَرَّسَ** all contain the **shadda diacritic ّ (U+0651)**, and every one of them also carries harakat (ُ َ etc.). The schema's Arabic-char whitelist is `[\\u0621-\\u064A]` (`lesson-schema.js` L82–84) — **no shadda, no harakat** — so **none of the official words can be represented verbatim** in `words[].chars`, `letters[].char`, or `meta.completion.chars[].char`.
4. **Activity-type gate:** the official activity is «لعبة 1 أو 2: صوت → الطالب يضغط الزر الصحيح» (distinguish single vs. doubled letter). No round type for that exists: P6 = `identify / sameordiff / close`, P7 = `show-letter / count-dots / sound` (schema L36–37, L441, L511). Implementing the lesson's objective = **new activity type** = forbidden.

Runtime `nextLesson` of L07 («الحروف (ل)») does **not** rescue this: it is editorial-only, and ل is officially assigned to Blueprint **Lesson 11** («اللام الشمسية والقمرية»), not Lesson 09 — exactly the L08-precedent reasoning.

---

## 1. Official Lesson 09 identity

| Item | Value | Source |
|------|-------|--------|
| Official title | **الشدة — حرفان في واحد** | `03_Pedagogical Blueprint`, lesson-9 card, line 311 |
| Official new "letters" | **ج + الشدة على جميع الحروف** (letter ج AND the shadda concept applied to every letter) | Blueprint line 317 |
| Official vocabulary | مُحَمَّد — جَدَّة — حُبّ — دَرَّسَ | Blueprint line 318 |
| Official target sentences | اسْمُهُ مُحَمَّد. هُوَ مِنْ جَدَّة. | Blueprint line 319 |
| Official lesson objective | «يتعرّف الطالب على الشدة ويُميّز بين الحرف العادي والحرف المضعّف في النطق والكتابة» | Blueprint line 321 |
| Diagram/rationale | «الشدة مفهوم غائب في الصينية … الشدة = حرفان» | Blueprint lines 316 |
| Sequencing rationale | الشدة ّ — تُبنى على السكون مفاهيمياً — **المحاضرة 9** | `01_Pedagogical Framework`, line 102 |
| Framework activity | «لعبة 1 أو 2: صوت → الطالب يضغط الزر الصحيح» | Framework line 183 |

## 2. Evidence sources checked

| Priority | Source | What it provides |
|----------|--------|------------------|
| 1 | `Work plan/03_Pedagogical Blueprint (…).md` | Lesson-9 official card (L311–340): title, new letters, vocab, sentences, objective, minute-by-minute plan; grouping table L56: «5 — المحاضرتان 9-10 \| ج د ذ ط ظ + الشدة والتنوين»; least-common-errors L594: «الضربتان على الطاولة — أزواج مقارنة» (native-teacher remedy for shadda) |
| 1 | `Work plan/01_Pedagogical Framework (فلسفة التدريس).md` | L102: shadda → lesson 9; L183: «الشدة — حرفان في واحد ◎ يميّز المشدّد وغير المشدّد \| لعبة 1 أو 2» |
| 2 | `md/Pedagogy/PHONETIC_REPRESENTATION_DECISION_RECORD.md`, `md/Governance/QD-16_…md` | Phoneme convention `'/' + char + '/'` — applies to letters; **no shadda/gemination data model** |
| 3 | `Work plan/04_Instructional Blueprint (…).md`, `02_Course Roadmap (…).md` | Course-level principles only; **no runtime letter-grouping numbered 09** |
| 4 | `new_template/MD/*RESULT.md`, `LESSON_0{4,7,8}_INVESTIGATION_REPORT.md` | Precedent: single-letter/vocab-less lessons → CASE B; lam = Lesson 11 |
| 5 | `new_template/js/lesson-01…07.js` | **Structure precedent only** — prove the contract shape; do **not** define L09 content |
| 6 | `new_template/js/lesson-07.js` L60–63 | `meta.nextLesson.chars = 'الحروف (ل)'` — **EDITORIAL, unratified**; ل is officially Lesson 11 (Blueprint L379; Framework L104). |

## 3. Official lesson type

**GRAMMAR / ORTHOGRAPHY (DIACRITICS)** — the teaching target is the **shadda дiаcritic (gemination)** and the skill of hearing/reading *single vs. doubled* letters. Letter ج appears only as the lesson's named vehicle («ج + الشدة على جميع الحروف»). It is **not** a "new-letter lesson" in the sense the P1–P7 letter pipeline is built for (sound → char → dots → form → word).

The 8-step official plan (Blueprint L326–333) confirms this: review sukun → present ج → **present the shadda (two letters in one)** → comparison pairs دَرَسَ/دَرَّسَ → «لعبة مرة أم مرتين» → read doubled words → build sentences with doubled names → write/correct 3 sentences.

## 4. Candidate target content, if any

| What the runtime would need | What officially exists | Status |
|-----------------------------|------------------------|--------|
| Letter set ≥ 2 | Only **ج** (single) | ❌ schema `meta.targetLetters.length ≥ 2` fails; pairing artificially = forbidden |
| A letter not yet taught | ج was taught in **lesson-02** (ج ح خ ع) | ❌ cross-lesson leakage (L02 target letter) |
| Words without shadda/harakat | Official words are مُحَمَّد، جَدَّة، حُبّ، دَرَّسَ — all contain ّ and َ/ُ | ❌ unreprerepresentable verbatim in schema whitelist |
| A round type for "1 or 2" | None — P6 = identify/sameordiff/close; P7 = show-letter/count-dots/sound | ❌ new activity type required (forbidden) |
| A field to hold a doubled/diacritic letter | None — `letters[].char` is a single base Arabic char; no shadda field exists | ❌ data-model gap |

## 5. Vocabulary evidence

| Official word | Contains target letter ج? | Contains شدة ّ (U+0651)? | Schéma-representable verbatim? |
|---------------|--------------------------|---------------------------|--------------------------------|
| مُحَمَّد | ✗ (م ح م د) | ✓ (ّ on م) | ❌ chars include ُ َ ّ → outside `[\\u0621-\\u064A]` |
| جَدَّة | ✓ (ج at `[0]`) | ✓ (ّ on د) | ❌ chars include َ ّ → outside whitelist |
| حُبّ | ✗ (ح ب) | ✓ (ّ on ب) | ❌ chars include ُ ّ |
| دَرَّسَ | ✗ (د ر س) | ✓ (ّ on ر) | ❌ chars include َ ّ َ |

**Verdict:** even the single ج-word (جَدَّة) cannot be stored as officially written, because the shadda is a mandatory part of its official spelling. Stripping the shadda would silently corrupt the exact word the lesson exists to teach — precisely the "normalize words" the task forbids (§8). **Vocabulary gate: FAIL.**

## 6. Runtime compatibility

The P1–P7 pipeline can boot arbitrary lesson data, but its **content semantics** are letter-centric: P2 phonemes, P3 char/dots/phoneme/fact reveal, P5 word cards targeting a letter position, P6 three sound-discrimination round types, P7 three letter-assessment types. **Shadda discrimination (single vs. doubled) is a new round/activity type not implemented anywhere in `js/app.js`, `js/activities/*`, or `js/engine/*`** — and adding it is explicitly prohibited. The official 8-step class plan is therefore unrepresentable without runtime change.

## 7. Schema compatibility

| Schema location | Rule | Consequence for L09 |
|-----------------|------|---------------------|
| `meta.targetLetters` | `length ≥ 2`, each `isArabicChar` (L148–155) | Single letter ج → hard ERROR |
| `letters[].char` | single char in `[\\u0621-\\u064A]` (L200) | Letter ج is fine *as a letter*, but it violates the letter-set gate above |
| `words[].chars[]` | each char in `[\\u0621-\\u064A]` (L299–301) | Official words contain ّ (and harakat) → hard ERROR if written officially; stripping = content corruption |
| `words[].targetPositions[j]` | `chars[pos] === target.char` (L311–313) | Unreachable — the word layer fails before this |
| `discriminationRounds` | only types `identify/sameordiff/close` (L441) | No "single vs doubled" type; the lesson's own activity isn't expressible |
| `assessmentRounds` | only types `show-letter/count-dots/sound` (L511) | No shadda assessment |
| L02 leakage gate | L09 must not reuse L01–L07 target letters | ج ∈ L02 → would fail any L09–L07 leak scan |

## 8. Exact blocker(s)

1. **Single-letter lesson:** official L09 names only letter **ج** (+ the shadda concept). Schema requires ≥ 2 target letters; pairing ج with another letter artificially is forbidden.
2. **Letter already taught:** ج is a target letter of **lesson-02** — a Lesson-09 letter lesson on ج would be a cross-lesson duplicate (leak).
3. **Official vocabulary unissuable:** all four official words contain the **shadda diacritic (U+0651)** and harakat, which lie outside the schema's Arabic-char whitelist and the lesson data model has no field for them.
4. **Activity mismatch:** the defining activity (»لعبة 1 أو 2» — single vs. doubled discrimination, and pairs دَرَسَ/دَرَّسَ) needs a round type that does not exist in the contract.
5. **Lesson type mismatch:** L09 is a **grammar/orthography (diacritics)** lesson; the P1–P7 letter pipeline has no phase for teaching a diacritic on all letters.

## 9. What would be required to proceed (author/architect decisions)

1. **Ratify a ≥2-letter set** for a runtime Lesson 09 that is not "invented": if the course intends to keep ج with the shadda, the author must pair it with an officially-documented accompanying letter AND supply official words that are schema-representable (no shadda on the target char, or provide a written un-diacriticized official form).
2. **Resolve the L02 conflict:** decide whether ج may legitimately be *re-consolidated* in a later lesson (if so, the leak gate and the task rule forbid cross-lesson target reuse — this needs an explicit author blanket approval and a lenient leak exemption).
3. **Extend the data model** (out of current scope): a `shadda`/gemination representation in `letters`/`words` (e.g., doubled-letter form), plus a **new activity round type** («1 أو 2»/single-vs-doubled) in P6/P7, plus validated characters for ّ/harakat — all of which require schema + engine changes explicitly forbidden in this task.
4. **OR reposition the lesson:** treat «الشدة» as a **future grammar lesson** (Blueprint lesson 9 in classroom terms but not a runtime letter-file), akin to how the runtime intentionally skipped the midterm exam (L08). In that case `js/lesson-09.js` should not exist until grammar-lesson capability is designed.

## 10. Files intentionally NOT modified

- `js/lesson-09.js` — **NOT created** (CASE B).
- `js/lesson-08.js` — still absent by design (L08 = blocked midterm).
- `js/lesson-01.js … js/lesson-07.js` — **unchanged** (SHA-256 verified below).
- `js/app.js`, `js/loader.js`, `js/engine/*`, `js/activities/*` — **unchanged**.
- `schema/lesson-schema.js` — **unchanged**.
- `css/*`, `lecture.html` — **unchanged**.
- `MD/LESSON_08_INVESTIGATION_REPORT.md`, `MD/LESSON_07_*` — **unchanged**.

## 11. Regression confirmation

Protected hashes re-verified (this session):

| File | SHA-256 | Status |
|------|---------|--------|
| `js/lesson-01.js` | `591804C3…92B09` | unchanged |
| `js/lesson-02.js` | `96BEB452…0A10` | unchanged |
| `js/lesson-03.js` | `8912D70E…91391` | unchanged |
| `js/lesson-04.js` | `35609CD8…5FE98` | unchanged |
| `js/lesson-05.js` | `0A89060A…EF3787` | unchanged |
| `js/lesson-06.js` | `51CDB211…E71A87` | unchanged |
| `js/lesson-07.js` | `1FE9C896…9853D` | unchanged (created in L07 task, now protected) |
| `js/app.js` | `87B37E6B…5078` | unchanged |
| `js/loader.js` | `B335E6EE…53A` | unchanged |
| `schema/lesson-schema.js` | `8E6B3EB8…43C88` | unchanged |
| `lecture.html` | `CB2C9D3C…43A3B` | unchanged |
| `css/style.css` | `7D459C6A…6F727` | unchanged |

---

## Final verdict

**CASE B — BLOCKED.** Lesson 09 (official identity: **«الشدة — حرفان في واحد»**, a grammar/diacritics lesson with named letter ج) cannot be implemented under the current lesson-data contract without:
- inventing a ≥2-letter pairing, and/or
- reusing a letter already taught in Lesson 02 (cross-lesson leak), and/or
- representing the shadda diacritic (outside the schema whitelist), and/or
- adding a new activity type (forbidden).

**Nothing else was changed. The gate stays closed until the author/architect ratifies one of the resolutions in §9.**

---

*Per CASE B protocol: only `MD/LESSON_09_INVESTIGATION_REPORT.md` was created; no runtime lesson file, no schema change, no engine change.*