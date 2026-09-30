# LESSON 11 — INVESTIGATION / IMPLEMENTATION REPORT

> **Date:** 2026-09-19
> **Scope:** Official source audit only. No `js/lesson-11.js` was created. No schema / engine / activity / HTML / CSS was changed. The architecture question is deliberately left OPEN — this report is an EVIDENCE MAP.
> **Verdict:** ⛔ **CASE B — BLOCKED for implementation under the current letter-lesson contract.** Identity established with high confidence; the lesson belongs to the recurring **علامات الضبط والقراءة (orthography / reading-conventions / grammar)** family, NOT to the letter-acquisition family the runtime implements.

---

## 1. Executive Summary

Official Lesson 11 is **«اللام الشمسية والقمرية»** (Sun and Moon Lam — the definite article «ال») with objective: *«يُميّز الطالب بين اللام التي تُنطق واللام التي تختفي عند التعريف»* (distinguish the lam that is pronounced / moon letters from the lam that disappears / sun letters). It is a **grammar / reading-convention lesson about ال assimilation**, in which the letter **ل** is introduced only as the *vehicle* for لام التعريف — it is NOT introduced as á standalone new-letter lesson.

It is blocked by three contract-level reasons, identical in kind to L09/L10:

1. **Lesson type:** the official target (sun-vs-moon classification, assimilated lam is replaced by a doubling of the sun letter, ال prevented prefix) has no field and no activity type in the P1–P7 letter pipeline. The distinctive activity — Framework L185 «لعبة شمس 🌞 أم قمر 🌙» — does not exist.
2. **Orthography:** the pedagogical distinction itself is *encoded orthographically by shadda* — official sentences «الشَّمْسُ جَمِيلَة» contain ّ (U+0651) and other harakat (U+064E/U+064F), all outside the schema whitelist `[\u0621-\u064A]` (`lesson-schema.js` L82–84). Removing the shadda silently destroys the exact feature the lesson teaches.
3. **Letter ownership / vocabulary:** all official vocabulary (الباب، الشمس، النور، القمر، الطالب) contains ل **only inside the grammatical prefix ال**. No word justifies "ل as a bare target letter," and the runtime's letter-position model has no notion of a definite article. Forcing a standalone «ل» letter lesson would *invent* a runtime letter lesson that the official curriculum does not contain.

**Broader finding (the audit's real question):** L09→L10→L11 confirm a **recurring second lesson family**, not three isolated strays. The Framework explicitly names it — «المرحلة الثالثة │ علامات الضبط والقراءة — المحاضرات 9-12» (L81–83), with sukun (L7) and madd (L12) completing the family. Lesson 11 is not a template failure; it is evidence of a coherent, authoritative ␢second pedagogical track that the current runtime does not cover.

---

## 2. Official Lesson 11 Identity

| Field | Official value | Source |
|-------|----------------|--------|
| Official lesson number | **11** | Blueprint L373 |
| Official title | **«اللام الشمسية والقمرية»** (Sun and Moon Lam) | Blueprint L373; Framework L185 |
| Official objective | «يُميّز الطالب بين اللام التي تُنطق واللام التي تختفي عند التعريف» | Blueprint L383 |
| Official new content | **ل + لام التعريف (الشمسية والقمرية)** | Blueprint L379 |
| Official vocabulary | **الباب — الشمس — النور — القمر — الطالب** | Blueprint L380 |
| Official target sentences | **البَابُ مَفْتُوح. الشَّمْسُ جَمِيلَة.** | Blueprint L381 |
| Sequencing rationale | «هذه القاعدة ضرورية لأن كل كلمة معرّفة في العربية تبدأ بـ(ال). تأتي بعد التنوين ليُفهم الفرق» | Blueprint L378 |
| Teacher note | «علّم قائمة الحروف الشمسية كشعر قصير أو أغنية» | Blueprint L397 |
| Homework | «كتابة 5 جمل عن الفصل الدراسي باستخدام كلمات معرّفة بـ(ال)» | Blueprint L402 |
| Assessment | «نطق 10 كلمات بـ(ال) بدقة: 5 شمسية و5 قمرية» | Blueprint L402 |
| Timing | 120-min plan (L388–395) | Blueprint L386–395 |

## 3. Authoritative Evidence

| Priority | Source | Evidence |
|----------|--------|----------|
| 1 | `03_Pedagogical Blueprint (…).md` | Full Lesson-11 card L373–402 (title, letters, vocab, sentences, objective, 8-step lesson plan, teacher note, HW, assessment). Letter-group table L57: «6 — المحاضرات 11-16 \| ل + لام التعريف + كل الحروف». Sequencing dependency L378. |
| 2 | `01_Pedagogical Framework (…).md` | Diacritics progression matrix L104: «لام التعريف ال \| المحاضرة 11 \| يُفهم بعد التنوين: نكرة ↔ معرفة \| التنوين». Stage map L81–83: «المرحلة الثالثة │ علامات الضبط والقراءة — المحاضرات 9-12». Lesson map row L185: «11 \| اللام الشمسية والقمرية ◎ يميّز اللام التي تختفي \| لعبة شمس 🌞 أم قمر 🌙». |
| 3 | `md/Pedagogy/PHONETIC_REPRESENTATION_DECISION_RECORD.md` | Phonemic dtype for BASE LETTERS only (`'/' + char + '/'`); the ال-prefix / assimilation has no phonetic record. |
| 4–5 | Instructional Blueprint / Roadmap | Cover Lesson 01 implementation and course-level targets only; no L11 activity spec exists. |
| 6 | `MD/LESSON_{08,09,10}_INVESTIGATION_REPORT.md` | Precedent: L09, L10 (same family) both CASE B; L08 midterm not runtime-represented. |
| 7 | `js/lesson-01…07.js` | STRUCTURAL EVIDENCE: runtime letter ownership (see §7, §8). |
| 8 | `meta.nextLesson` (lesson-07.js) = «الحروف (ل)» | RUNTIME EVIDENCE only — conflicts with official L11 (see §7). |

**Evidence classification:** identity/title/objective/vocab/activity-set = **OFFICIAL FACT** (Blueprint L373–402 + Framework L81–83/L104/L185). Shadda/harakat codepoints & whitelist exclusion = **OFFICIAL FACT** (Unicode + `lesson-schema.js` L82–84). ل not a runtime target letter, and all-group letter ownership = **OFFICIAL FACT** (lesson-01…07.js). «الحروف (ل)» as next lesson = **RUNTIME EVIDENCE**, superseded by curriculum. Compatibility conclusions = **INFERENCE from official facts**.

## 4. Lesson Type

**GRAMMAR / READING CONVENTION — definite article «ال» and its two pronunciations.** Official objective is a *phonological-orthographic discrimination*: moon letters keep the lam pronounced; sun letters assimilate it (the lam disappears and the following letter is geminated — hence the shadda in official examples). The lesson's eight steps (Blueprint L388–395) are:

1. Review tanwin with tanwin-noun cards (prerequisite recap)
2. Introduce letter ل, then لام التعريف: adding (ال) before a noun makes it definite
3. Board demo of sun vs. moon: الباب (lam appears) / الشمس (lam disappears)
4. **Sorting activity:** students classify word cards into two groups and read them aloud
5. **Game «شمس أم قمر»:** student raises the correct card when hearing a word
6. Read definite-artiicle sentences in turn
7. Extended dialogue: (أين الكتاب؟ الكتاب على الطاولة)
8. Write 5 sun-lam words and 5 moon-lam words

Answer to §5: the official target is primarily **E (definite article «ال») + F (sun/moon letters) + D (reading convention)**; ل itself (option A) appears only as the vehicle, introduced in step 2 in service of the ال rule. Not a letter lesson.

## 5. Relationship to Lesson 09

L09 = **«الشدة — حرفان في واحد»**; L11 = **«اللام الشمسية والقمرية»**. The Framework connects them **explicitly**: both are in «المرحلة الثالثة │ علامات الضبط والقراءة — المحاضرات 9-12» (L81–83), and shadda matters for L11 because the sun-lam's disappearance *is orthographically the doubling of the following letter* — the very phenomenon shadda encodes. L11 builds on the diacritics mastery of L09/L10, not on letter naming. Same family, consecutive deepening.

## 6. Relationship to Lesson 10

Framework L104 (diacritics matrix): «لام التعريف ال \| المحاضرة 11 \| **يُفهم بعد التنوين: نكرة ↔ معرفة** \| التنوين» — L11's grammatical concept (indefinite ↔ definite) is defined *through* tanwin, explicitly making tanwin its prerequisite. L11 lesson-plan minute 1 (Blueprint L388) = «مراجعة التنوين: بطاقات الأسماء المنوّنة». So L10 → L11 is a **documented grammatical chain** (tanwin/indefiniteness → ال/definiteness), not an incidental ordering.

## 7. Relationship to Runtime Letter Sequence

Runtime editorial chain: lesson-07 → `meta.nextLesson = «الحروف (ل)»`. This is **RUNTIME EVIDENCE** and **does not match the official curriculum**: the official sequence after L07 is L08 midterm, L09 shadda, L10 tanwin, **L11 lam al-ta'rif**. The runtime's "ل letter lesson" never exists authoritatively.

**Documented conflict (reported, not silently resolved):**
- **Source A (Blueprint L57 + Framework L81–83):** ل appears only inside the L11–16 block "ل + لام التعريف + كل الحروف" — as part of the orthography/grammar track, after all 28 letters are known.
- **Source B (runtime `lesson-07.js` `meta.nextLesson`):** «الحروف (ل)» as a standalone letter lesson.
- **Authority:** Source A (Priority 1/2 official curriculum) wins. Source B (Priority 8 runtime metadata) is editorial. **Impact:** the runtime's metadata cannot justify a lesson-11 «ل» letter lesson.

Additionally, the runtime chain already re-sequenced the curriculum's letter groups: runtime L04 = د ذ ط ظ (official group 5, L9–10); runtime L02 = ج ح خ ع (official group 5). So runtime lesson-02/lesson-04 *already consumed* official letters for lessons 9–10 — structural proof that runtime numbering (letter files) and curriculum numbering (16 pedagogy lessons) are different sequences.

## 8. Letter Ownership Analysis

| Letter | Officially introduced in L11 as a NEW letter? | Ownership in runtime chain | Status |
|--------|------------------------------------------------|----------------------------|--------|
| ل | **No** — introduced only as vehicle for the ال rule (Blueprint L379 «ل + لام التعريف»); L57 «المحاضرات 11-16 \| ل + لام التعريف» | NOT owned by any runtime lesson (verified lesson-01…07 targetLetterIds) | ⚠️ partial: ل unused in runtime, but officially its teaching is grammatical, not standalone |
| Sun letters (ت ث د ذ ر ز س ش ص ض ط ظ ل ن) | No — previously acquired, recalled via song (L397) | Mixed / mostly owned (runtime L01–L07) | n/a |
| Moon letters (rest) | No | Owned | n/a |

**Conclusion:** ل is *assumed-known material serving a grammar lesson*, exactly like ج in L09 and د ذ ط ظ in L10. Its absence from the runtime letter lessons does not make L11 a "missing letter lesson."

## 9. Vocabulary Analysis

| Word | Purpose in lesson | Contains ل? | Orthographic marks | Source | Status |
|------|-------------------|-------------|--------------------|--------|--------|
| الباب | moon-lam reading example | yes (prefix ال) | فتحة on ب in sentence «البَابُ» | L380/L381 | grammar example |
| الشمس | sun-lam example | yes (prefix ال) | **شدة U+0651** + ضمة in «الشَّمْسُ» | L380/L381 | grammar example |
| النور | moon-lam example | yes (prefix ال) | ضمة في «نُور» | L380 | grammar example |
| القمر | moon-lam example | yes (prefix ال) | none in isolated form | L380 | grammar example |
| الطالب | sun-lam example | yes (prefix ال) | none in isolated form | L380 | grammar example |
| أين الكتاب؟ / الكتابُ على الطاولة | extended dialogue | yes (prefix ال) | n/a | L394 | grammar example |

All vocabulary is **grammar/reading examples**, not letter-teaching vocabulary. No word demonstrates ل as an independent letter. ل appears in every item only as the ال prefix. No inventable content.

## 10. Orthography Analysis

| Official element | Marks present | Codepoints | In schema whitelist `[\u0621-\u064A]`? |
|------------------|---------------|------------|----------------------------------------|
| البَابُ | فتحة َ | U+064E | ❌ no |
| | ضمة ُ | U+064F | ❌ no |
| الشَّمْسُ | **شدة ّ** | U+0651 | ❌ no |
| الشَّمْسُ | ضمة ُ | U+064F | ❌ no |
| جَمِيلَة | فتحة َ | U+064E | ❌ no |
| ال prefix | ا + ل as grammatical prefix | within range, but no prefix field | ❌ structurally unmodelable |

**Critical:** the sun-lam distinction *is* the shadda — when the lam disappears, the following letter doubles, canonically written with ّ. Recording «الشمس» without ّ erases exactly the orthographic phenomenon the lesson teaches. `lesson-schema.js` L82–84 (`isArabicChar = /^[\u0621-\u064A]$/`) rejects every diacritic above. The exact official content cannot be represented, and stripping َ ُ ّ is a "silent stripping of meaningful characters," forbidden by the audit rules.

## 11. Official Activity Analysis

| Official activity (Blueprint L388–395 / Framework L185) | Learning purpose | Existing runtime type? | Faithful? |
|----------------------------------------------------------|------------------|------------------------|-----------|
| 1. Review tanwin noun cards | diacritic recap | ❌ (L10 tanwin is itself CASE B) | NO |
| 2. Introduce ل then add ال → definiteness | grammar rule | ❌ (letter reveal exists, but ل here is a vehicle; the ال-rule has no field) | NO |
| 3. Board demo: الباب (lam visible) / الشمس (lam hidden) | assimilation concept | ❌ | NO |
| 4. **Sort word cards into 2 groups + read** | classification | ❌ (P6 rounds are letter-sound: identify/sameordiff/close) | NO |
| 5. **Game «شمس أم قمر»: hear word → raise card** | listening classification | ❌ no such round/game type | NO |
| 6. Read definite-article sentences | reading | ❌ no sentence reader | NO |
| 7. Extended dialogue أين الكتاب؟ | communication | ❌ no dialogue engine | NO |
| 8. Write 5 sun + 5 moon words | writing | ❌ (P4 = letter-stroke writing only) | NO |

A generic P3/P5 card could *technically render* the letters of «الشمس», but it could not express why two sun-words and two moon-words behave differently — the pedagogical function is the classification/assimilation rule, which no existing round type carries. By the audit's own test, that is compatibility of atoms, not of pedagogy.

## 12. Runtime Compatibility

P1–P7 is a letter-framing pipeline (P2 phonemes, P3 char/dots/fact reveal, P4 letter strokes, P5 letter target cards, P6 letter-sound discrimination, P7 letter assessment). L11's grammar objective (pronounced vs. assimilated ال) exists only as a *word-level phonological rule* — outside every phase. The runtime can teach «a card that shows ل», not «a lesson where ال vanishes before ش because ش is a sun letter».

## 13. Schema Compatibility

| Requirement | Contract | L11 official content | Verdict |
|-------------|----------|----------------------|---------|
| 15-root-key structure + Object.freeze | schema/lesson-schema.js | no diacritics / prefix / rule field exists | PARTIAL (structure untouched, content un-representable) |
| `meta.targetLetters` / `letters[].char` / `words[].chars[]` | whitelist `[\u0621-\u064A]` (L82–84) | ل in-whitelist; **ّ ، َ، ُ out of whitelist** | FAIL |
| `words[].targetPositions` + `chars[pos]===target.char` | L311–313 | no bare-ل word exists | FAIL |
| `discriminationRounds` (identify/sameordiff/close) | L36–37, L441 | no sun/moon classification | FAIL |
| `assessmentRounds` (show-letter/count-dots/sound) | L511 | «نطق 10 كلمات بال» is not a letter assessment | FAIL |

No schema modification was made or proposed.

## 14. CASE A / CASE B Decision

**CASE B.** Implementation would require (each individually forbidden): inventing a ل letter lesson the curriculum never defines; stripping shadda/harakat from official content; adding a sun/moon classification round and a `شمس أم قمر` game type; modeling the ال prefix; adding a reading/dialogue capability.

---

## 15. Preliminary Lesson-Type Map (L01–L11)

Built from authoritative sources only (Framework lesson map L173–190; Blueprint title cards L65+, L342+; Blueprint group table L50–57). Runtime numbering ≠ curriculum numbering; status reflects official lesson, not runtime file.

| Lesson | Official Title (Framework L173–190) | Primary Pedagogical Type | New Letters? | Diacritics? | Grammar? | Assess/Review? | Current Runtime Status |
|--------|-------------------------------------|--------------------------|--------------|--------------|----------|----------------|------------------------|
| 1 | الحروف الأولى — ب ت ث ن | LETTER ACQUISITION | ب ت ث ن | fatha (as reading aid) | — | — | Implemented (runtime L01) |
| 2 | م ي ا — وأول مقاطع | LETTER ACQUISITION + first syllables | م ي ا | fatha/madd آ | — | — | Implemented, re-sequenced (runtime L02-L05 mix) |
| 3 | ف و ق ك — والضمة | LETTER ACQUISITION | ف و ق ك | damma | — | — | Implemented (runtime L06) |
| 4 | ع غ ح خ — والكسرة | LETTER ACQUISITION + first dialogue | ع غ ح خ | kasra | minimal | — | Implemented (runtime L02/L07 mix) |
| 5 | التعارف الكامل | COMMUNICATION | — | — | phrasing | — | Not built |
| 6 | الأرقام وأيام الأسبوع | VOCABULARY / COMMUNICATION | — | — | — | — | Not built |
| 7 | السكون — الحروف الساكنة | **ORTHOGRAPHY / DIACRITICS** | — | **سكون ْ** | — | — | **Unsupported** — letters re-used (runtime L07 غ ض ر ز) |
| 8 | اختبار المنتصف + مراجعة | ASSESSMENT / REVIEW | — | — | — | ✅ midterm | Not built (CASE B report) |
| 9 | الشدة — حرفان في واحد | **ORTHOGRAPHY / DIACRITICS** | (ج + vehicles) | **شدة ّ** | — | — | **Unsupported** (CASE B report) |
| 10 | التنوين — نهايات الأسماء | **ORTHOGRAPHY / DIACRITICS** | (د ذ ط ظ vehicles) | **تنوين ً ٍ ٌ** | noun endings | — | **Unsupported** (CASE B report) |
| 11 | اللام الشمسية والقمرية | **GRAMMAR / READING CONVENTION** | (ل as vehicle) | **شدة ّ implied** | ✅ ال / نكرة↔معرفة | — | **Unsupported** (this report) |

Notes: Framework L2 row = «م ي ا — وأول مقاطع»; runtime split letter coverage differently (runtime L02=ج ح خ ع, L05=م ي ا ه…). This numbering divergence is STRUCTURAL EVIDENCE, reported, not reconciled.

## 16. Emerging Lesson Families

Two **repeated** families are now clearly visible from official evidence:

- **FAMILY A — LETTER ACQUISITION (lessons 1–4 + part of 5–6):** learn new letters, build first syllables/words, basic harakat as reading aids. ✅ Current runtime implements this family (L01–07 letter chain).
- **FAMILY B — ORTHOGRAPHY / DIACRITICS / GRAMMAR / READING CONVENTIONS (lessons 7, 9, 10, 11 — and, per Framework Stage-3 label, 12):** sukun, shadda, tanwin, ali-lam, madd. ❌ **None supported.** Framework L81–83 names this family explicitly: «علامات الضبط والقراءة — المحاضرات 9-12».

Additional provisional families (evidence for their titles/objectives exists in Framework L186–190, not yet fully audited): READING (13 – أول نص كامل), WRITING (14 – الكتابة المتصلة), COMMUNICATION (15 – حوار حر), ASSESSMENT (16 – الاختبار النهائي), plus ASSESSMENT (8 – midterm) and COMMUNICATION (5-6).

## 17. Current Runtime Coverage

- Supported: **LETTER ACQUISITION** (family A) via lessons 01–07.
- Partially/incidentally: none of the grammar/oral/writing families.

## 18. Unsupported Lesson Families

- **ORTHOGRAPHY / DIACRITICS** (7, 9, 10) — repeated 3×, documented, all CASE B.
- **GRAMMAR / READING CONVENTION** (11) — repeated-pattern sibling, CASE B.
- Not yet audited (title-level evidence only): ASSESSMENT (8, 16), COMMUNICATION (5, 6, 15), READING (13), WRITING (14), VOCAB (6). Flags: **NEEDS AUDIT**.

## 19. Evidence-Based Next Step

The recurring unsupported family is confirmed **by official documents, not by inference**: 4 consecutive lessons (9–12) plus lesson 7 are officially declared the «علامات الضبط والقراءة» stage. This is enough to confidently conclude **a second family exists and recurs** rispondendo the audit's question B/C: this is NOT "one isolated stray lesson"; it is a full pedagogical track — justified for future architecture design (e.g., a diacritics/grammar lesson model and its round/game types).

However: **do not design yet.** Lessons 12–16 must be audited first to (1) confirm madd (12) belongs to family B, (2) classify 13–16 (reading text, connected writing, free dialogue, final assessment) as 3–4 further families, and (3) measure total engine requirements (probably ≥3 engines: LETTER, ORTHOGRAPHY/GRAMMAR, plus READING/WRITING/COMMUNICATION components). Final architecture recommendation is deliberately withheld pending the L12–16 audit.

## 20. Files Created

- `MD/LESSON_11_INVESTIGATION_REPORT.md` (this file) — CASE B report only.

## 21. Files Modified

None. No `js/lesson-11.js`. No schema/engine/activity/CSS/HTML/runtime change.

## 22. Files Protected

`js/lesson-01…07.js`, `js/app.js`, `js/loader.js`, `js/engine/*`, `js/activities/*`, `schema/lesson-schema.js`, `css/*`, `lecture.html`; L08/L09/L10 investigation reports — all untouched.

## 23. Regression Verification

Protected SHA-256 hashes re-verified this session — **0 unexpected changes**:

| File | SHA-256 prefix | Status |
|------|----------------|--------|
| `js/lesson-01.js` | `591804C3…` | unchanged |
| `js/lesson-02.js` | `96BEB452…` | unchanged |
| `js/lesson-03.js` | `8912D70E…` | unchanged |
| `js/lesson-04.js` | `35609CD8…` | unchanged |
| `js/lesson-05.js` | `0A89060A…` | unchanged |
| `js/lesson-06.js` | `51CDB211…` | unchanged |
| `js/lesson-07.js` | `1FE9C896…` | unchanged |
| `js/app.js` | `87B37E6B…` | unchanged |
| `js/loader.js` | `B335E6EE…` | unchanged |
| `schema/lesson-schema.js` | `8E6B3EB8…` | unchanged |
| `lecture.html` | `CB2C9D3C…` | unchanged |
| `css/style.css` | `7D459C6A…` | unchanged |

## 24. Final Verdict

**CASE B — BLOCKED.** Official Lesson 11 (identity: **«اللام الشمسية والقمرية»**, i.e., the definite article ال and its sun/moon assimilation) is a GRAMMAR / READING-CONVENTION lesson that the current letter pipeline cannot faithfully represent — the assimilation is orthographically a shadda (outside the whitelist), the target exists only at word level (no prefix/rule field), the dedicated «شمس أم قمر» game does not exist, and ل is a vehicle, not a new letter. It is the fourth Case-B lesson (8, 9, 10, 11) and the second explicit member of the Framework-documented **علامات الضبط والقراءة** family. **Per protocol: only this report was created.**

---

**Evidence-discipline note:** identity/type/objective/vocab/activity-set = OFFICIAL FACT (Blueprint L373–402; Framework L81–83/L104/L185). Codepoints + whitelist = OFFICIAL FACT (Unicode; `lesson-schema.js` L82–84). ل not runtime-owned = OFFICIAL FACT (lesson-01…07). «الحروف (ل)» chain = RUNTIME EVIDENCE, superseded (conflict reported §7). No inference is presented as curriculum.