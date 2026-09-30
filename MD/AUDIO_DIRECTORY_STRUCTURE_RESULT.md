# AUDIO_DIRECTORY_STRUCTURE_RESULT.md — Per-Lesson Audio Directory Resolution

Scope: implementation + verification report for moving lesson audio to the per-lesson directory
`assets/audio/<lesson-ID>/` via one generic rule (`lesson ID → audio directory`), with no per-lesson
hardcoding and no content/presentation coupling.

- Target: `RELEASE/v1.2/new_template`
- Date: 2026-09-18
- Status: COMPLETE — implemented, verified, regression-clean.
- Evidence: resolver harness (jsdom + real `app.js`), boot/leak harness, schema validator, SHA-256.

---

## A. Executive Summary

**Defect.** Lesson audio was addressed by *flat* logical paths (`assets/audio/ba.mp3`,
`assets/audio/seen.mp3`, …) stored in the lesson data and consumed verbatim by the engine. The actual
audio assets live in **per-lesson subdirectories** (`assets/audio/lesson-01/ba.mp3`, …), so playback could
not find the files, and there was no generic mapping from a lesson to its audio folder.

**Fix (implemented).** A single, generic resolver was added to `js/app.js` (the only runtime consumer of
audio paths). It derives the audio directory from the active lesson identity (`LESSON.meta.id`) and rewrites
each logical path at playback time:

```
assets/audio/<name>.mp3   →   assets/audio/<LESSON.meta.id>/<name>.mp3
```

No lesson name appears in application code; the rule is `lesson ID → assets/audio/<lesson-ID>/`. The lesson
data, the schema, the CSS, and all UI/engine/activity files are **byte-identical** to their pre-change state.

**Outcome.** Lessons 01/02/03 now resolve every letter/word to `assets/audio/lesson-01|02|03/<name>.mp3`
(9/9, 9/9, 6/6 entries). TTS fallback is unchanged. Boot/leak = `title:OK | color:OK | leak:ZERO`; schema =
0 errors. Only `js/app.js` changed.

---

## B. Objective & Scope

**In scope**

- A generic "lesson → lesson-audio directory" resolution rule.
- All runtime audio lookups routed through it (letter audio + word audio).
- Proof of scalability across `lesson-01` … `lesson-016` without creating lesson-04+ data or audio files.

**Out of scope (and left untouched)**

- Audio **files** themselves (not renamed, moved, copied, or created).
- Video assets/paths (`assets/videos/…`, `guide.videoFile`) — not addressed by this rule.
- The CSS layout/centering fix (hash `7D459C6A…` remains the baseline; not reopened).
- UI (audio button, player indicator, TTS button), P2/P3/P5 visuals.
- Lesson data & schema — changed only if strictly necessary (it was not).
- TTS fallback semantics.

---

## C. Pre-change State (discovered)

| Area | State |
|------|-------|
| Lesson data | `letters[].audioFile` / `words[].audioFile` store flat logical paths, e.g. `'assets/audio/ba.mp3'` (lesson-01, 9 entries; lesson-02, 9; lesson-03, 6). |
| Runtime consumer | **Only** `js/app.js` builds/loads audio: `AudioManager.play()` (via `playLetter`/`playWord`). `js/activities/*` and `js/engine/*` contain **zero** `assets/audio/` references. |
| Schema | `schema/lesson-schema.js` (L206, L320) requires `audioFile` to contain `'assets/audio/'` and end `.mp3` (validates the *logical* path). |
| Filesystem | `assets/audio/` has `lesson-01`…`lesson-09` and `lesson-010`…`lesson-016`; **only** `lesson-01` is populated (`ba, nun, ta, tha, word_bab, word_bayt, word_nar, word_tamr, word_thawb`). No flat `.mp3` at the `assets/audio/` root. |
| Loader | `js/loader.js` reads `?lesson=(\d{2})` and injects `js/lesson-XX.js`; `LESSON.meta.id` = `'lesson-01'`, `LESSON.meta.number` = `1`. |

---

## D. Root Cause

- The engine treated `audioFile` as a **ready-to-load URL** and passed it straight to `new Audio(...)`.
- Assets, however, are organized **per lesson** (folder = lesson ID). The missing layer was a generic
  mapping from the active lesson to its folder.
- Adding that mapping in the *data* (hardcoding `lesson-01/` per entry) or in the *engine* (per-lesson
  `if`/`switch`) would either duplicate the lesson ID across every asset entry or couple the engine to
  specific lesson names — violating content/presentation separation. The correct location is a single
  generic resolver keyed on the already-present lesson identity.

---

## E. Applied Solution

Two small pure helpers plus one call-site change, all in `js/app.js`:

```js
function _lessonAudioDir(meta) {
  const m = meta || (typeof LESSON !== 'undefined' ? LESSON.meta : null);
  if (!m) return null;
  if (typeof m.id === 'string' && /^lesson-\d+$/.test(m.id)) return m.id;
  if (Number.isInteger(m.number) && m.number > 0) return 'lesson-' + String(m.number).padStart(2, '0');
  return null;
}

function _resolveAudioPath(filePath, meta) {
  if (typeof filePath !== 'string') return filePath;
  const m = /^assets\/audio\/(.+)$/.exec(filePath);
  if (!m || m[1].indexOf('/') !== -1) return filePath;
  const dir = _lessonAudioDir(meta);
  return dir ? 'assets/audio/' + dir + '/' + m[1] : filePath;
}
```

Integration at the single choke point (`AudioManager.play`):

```js
play(filePath, fallbackText, rate = 0.8) {
  const src = _resolveAudioPath(filePath);   // was: new Audio(filePath)
  if (!this._cache[src]) this._cache[src] = new Audio(src);
  ...
}
```

**Resolution rules**

| Input | Result |
|-------|--------|
| `assets/audio/<name>.mp3` (current lesson 01) | `assets/audio/lesson-01/<name>.mp3` |
| `assets/audio/lesson-02/<name>.mp3` (already namespaced) | returned unchanged |
| `assets/videos/*` or any non-audio path | returned unchanged |
| non-string / `null` | returned unchanged |

- The directory is author-controlled data: `LESSON.meta.id` **is** the folder name. This is why the rule is
  one line and needs no per-lesson branching.
- The `number` fallback (`lesson-` + 2-digit) is defensive only; every current lesson defines `meta.id`.
- Cache key becomes the resolved path (prevents cross-lesson collisions for identical file names).
- TTS fallback (`this.speak(fallbackText, rate)` on play rejection) is **unchanged**.

**Why not change the data or schema:** the logical paths are valid per the existing contract, the schema
needs no change, and keeping asset organization in one engine-level rule preserves content/presentation
separation. No new schema/LESSON field was introduced.

---

## F. Files Changed

**Changed:** `js/app.js` only.

```
was: E0CC6D38A1F4434C4756A8D4BDD4C5B79629ADC317C72370158085A6FE09BA96
now: BD39ED0924E37A05C557C6C8193DD959CFBDF0DC59B0A95A3A7EE4950777D04A
```

**Unchanged (SHA-256 verified byte-identical):**

| File | SHA-256 |
|------|---------|
| `js/lesson-01.js` | `591804C32A8B9451A4D94712531C9760A9AC2EABF095A53AAAAEF69535F92B09` |
| `js/lesson-02.js` | `96BEB452959C2C76AF8052BA12327CEBA582ED7F4B2EEC3A34E3AE80D9F20A10` |
| `js/lesson-03.js` | `8912D70E31ED83F13733B8B9859392EF3A36B747609DE11E40AAC4BEE8AF1391` |
| `js/loader.js` | `B335E6EEB62A522E03112C6E06F9593B8E017ADD4A1FC443B075C49150FD953A` |
| `schema/lesson-schema.js` | `8E6B3EB8E487E04A4461C8E277DBA90EB7E106CC32841158A433CBFB65843C88` |
| `css/style.css` | `7D459C6A9C5CFF3670DAA721692CED34462CD8E796818A9C0F3A5774D016F727` |
| `css/responsive-system-v1.1.css` | `F86DE38B159645FAB99804AC5E5DA137B7A1705BECD5E0AE7185AA487939240E` |
| `lecture.html` | `CB2C9D3C3903391B18C7800841A6DB1B6FE9ECCC2E9C2A4E170A42DE45F43A3B` |

No lesson data, schema, CSS, HTML, loader, engine, or activity file was modified.

---

## G. Verification Results

**G.1 Resolver harness** (`audio-dir-test.js`; loads real `lesson-XX.js` + `js/app.js` in jsdom; 23 assertions = ALL-OK):

- `_lessonAudioDir()` → `lesson-01` / `lesson-02` / `lesson-03`.
- All letter+word paths namespaced correctly: 9/9 (L01), 9/9 (L02), 6/6 (L03).
- Captured `new Audio(...)` src on `playLetter`: `assets/audio/lesson-01/ba.mp3`, `…/lesson-02/jeem.mp3`,
  `…/lesson-03/seen.mp3`.
- TTS fallback fires once when `audio.play()` rejects (all three lessons).
- Edge cases: already-namespaced path unchanged; `assets/videos/*` unchanged; `null` unchanged;
  `{id:'lesson-04'}` → `assets/audio/lesson-04/…`; `{number:7}` → `assets/audio/lesson-07/…`;
  unrecognized id → path unchanged.
- `lesson-01` target files exist on disk (9/9); `lesson-02`/`lesson-03` target **directories** exist and
  the 0/9 and 0/6 missing files are expected (assets not yet supplied; none were created).

**G.2 Boot / leak regression (lessons 01/02/03):**

```
01 :: P1:ok(4) | P2:ok(3) | P3:ok(4) | P4:ok(2) | P5:ok(3) | P6:ok(8) | P6-D2:ok(10) | P7:ok(17) | title:OK | color:OK | leak:01:ZERO
02 :: ...same phase counts... | title:OK | color:OK | leak:02:ZERO
03 :: ...same phase counts... | title:OK | color:OK | leak:03:ZERO
```

**G.3 Schema validators:** `lesson-01` = 0 errors / 0 warnings; `lesson-02` = 0 errors / 4 known non-blocking
warnings; `lesson-03` = 0 errors / 2 known non-blocking warnings; self-test = 4/4. No data change.

**G.4 Source audit:** the only runtime construction of an `assets/audio/…` path is `js/app.js:65` (the
resolver). `js/activities/*` and `js/engine/*` = 0 references. Lesson data retains logical names only.
Remaining non-runtime mentions: `schema/lesson-schema.js` (contract) and the stale comment `lecture.html:14`;
plumbing also appears in historical markdown docs. No runtime code relies on a flat `assets/audio/<file>.mp3`.

---

## H. Scalability (lesson-01 → lesson-016)

The rule is data-driven and uses no per-lesson code. Synthetic metas fed to the real resolver produce:

| Lesson ID | Resolved directory | Lesson ID | Resolved directory |
|-----------|--------------------|-----------|--------------------|
| `lesson-01` | `assets/audio/lesson-01/` | `lesson-09` | `assets/audio/lesson-09/` |
| `lesson-02` | `assets/audio/lesson-02/` | `lesson-010` | `assets/audio/lesson-010/` |
| `lesson-03` | `assets/audio/lesson-03/` | `lesson-011` | `assets/audio/lesson-011/` |
| `lesson-04` | `assets/audio/lesson-04/` | `lesson-012` | `assets/audio/lesson-012/` |
| `lesson-05` | `assets/audio/lesson-05/` | `lesson-013` | `assets/audio/lesson-013/` |
| `lesson-06` | `assets/audio/lesson-06/` | `lesson-014` | `assets/audio/lesson-014/` |
| `lesson-07` | `assets/audio/lesson-07/` | `lesson-015` | `assets/audio/lesson-015/` |
| `lesson-08` | `assets/audio/lesson-08/` | `lesson-016` | `assets/audio/lesson-016/` |

Adding lesson-04 requires only `js/lesson-04.js` with `meta.id = 'lesson-04'` and assets in
`assets/audio/lesson-04/`. No engine edit, no per-lesson branch. (No lesson-04 data or audio was created.)

---

## I. Constraints, Notes & Residual Risks

- **Content/presentation separation:** no lesson names in `js/app.js`; the resolver is a pure function of the
  lesson identity carried in data.
- **No forbidden patterns:** no `if (lessonId === '01')`, no `switch/case` per lesson, no fake audio files,
  no new abstractions beyond the two helpers required by the rule.
- **Non-runtime leftovers (documented, intentionally not changed):**
  - `lecture.html:14` comment still reads `الصوت: assets/audio/` (flat). It is documentation, not code; left
    untouched to keep the change minimal and out of UI.
  - Lesson data strings remain logical (`assets/audio/<name>.mp3`); they are now resolved by the engine. This
    is the documented, architectural exception to "no flat references".
- **Naming caveat (pre-existing, out of scope):** the loader uses a 2-digit pattern (`?lesson=XX`) while the
  audio folders for 10–16 are 3-digit (`lesson-010`…). The resolver follows the **lesson ID verbatim**, so a
  future lesson whose `meta.id`/folder is `lesson-016` resolves correctly; the loader convention is a separate
  matter and was not modified.
- **Residual risk:** if a future lesson's data path is already namespaced (`assets/audio/<dir>/<file>`) the
  resolver leaves it untouched; if a lesson omits `meta.id`, the `number` fallback pads to 2 digits
  (`lesson-04`, `lesson-16`), so authors should keep `meta.id` in sync with the on-disk folder name.

**Conclusion.** Lesson audio is now resolved generically to its per-lesson directory; playback, TTS fallback,
and all prior behavior (including the centering fix) are unchanged; only `js/app.js` changed.
