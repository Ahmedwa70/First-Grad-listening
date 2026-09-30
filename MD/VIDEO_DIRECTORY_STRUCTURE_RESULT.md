# VIDEO_DIRECTORY_STRUCTURE_RESULT.md — Per-Lesson Video Directory Resolution

Scope: implementation + verification report for resolving lesson video paths to the per-lesson directory
`assets/videos/<lesson-ID>/` via one generic rule (`lesson ID → video directory`), with no per-lesson
hardcoding and no content/presentation coupling.

- Target: `RELEASE/v1.2/new_template`
- Date: 2026-09-18
- Status: COMPLETE — implemented, verified, regression-clean.
- Evidence: full-page harness (jsdom + real `lecture.html`/`app.js`/`stroke-video.js`), boot/leak harness,
  schema validator, SHA-256.

---

## A. الوضع السابق — How video was resolved before

- Video paths were stored in lesson data as **flat logical paths**:
  `LESSON.strokeGuides[].videoFile = 'assets/videos/ba.mp4'`, `'assets/videos/jeem.mp4'`, … for lessons 01/02/03.
- The **only runtime consumer** was `js/activities/stroke-video.js:87`, which injected the value **verbatim**
  into the DOM:

  ```js
  <video id="p4-video" class="p4-stroke-video" src="${guide.videoFile}" …>
  ```

- The physical files were already organized per lesson (`assets/videos/lesson-01/ba.mp4`, `ta.mp4`, `tha.mp4`,
  `nun.mp4`), so the flat `src` pointed to non-existent paths and no video played. There was **no** generic
  mapping from the active lesson to its video folder.
- No other file (engine, other activities, app.js) constructed video paths. `schema/lesson-schema.js`
  (L258) validates the *logical* path only (`assets/videos/…*.mp4`).
- Missing video was already non-fatal: `p4PlayVideo()` used `video.play().catch(() => {})`.

---

## B. الوضع الجديد — How the video folder is now determined

A single generic resolver was added next to the existing audio resolver in `js/app.js`, and the activity now
calls it. The lesson folder is derived from the **existing lesson identity** (`LESSON.meta.id`) — no new
LESSON/Schema field:

```js
function _lessonAudioDir(meta) {            // shared lesson-resource-directory helper (reused)
  const m = meta || (typeof LESSON !== 'undefined' ? LESSON.meta : null);
  if (!m) return null;
  if (typeof m.id === 'string' && /^lesson-\d+$/.test(m.id)) return m.id;
  if (Number.isInteger(m.number) && m.number > 0) return 'lesson-' + String(m.number).padStart(2, '0');
  return null;
}

function _resolveVideoPath(filePath, meta) { // generic: lesson ID → assets/videos/<lesson-ID>/
  if (typeof filePath !== 'string') return filePath;
  const m = /^assets\/videos\/(.+)$/.exec(filePath);
  if (!m || m[1].indexOf('/') !== -1) return filePath;
  const dir = _lessonAudioDir(meta);
  return dir ? 'assets/videos/' + dir + '/' + m[1] : filePath;
}
```

Call site (`js/activities/stroke-video.js`):

```js
<video id="p4-video" class="p4-stroke-video" src="${_resolveVideoPath(guide.videoFile)}" …>
```

**Resolution rules**

| Input | Result |
|-------|--------|
| `assets/videos/<name>.mp4` (current lesson 01) | `assets/videos/lesson-01/<name>.mp4` |
| already namespaced `assets/videos/lesson-02/<name>.mp4` | returned unchanged |
| non-video path (`assets/audio/…`, etc.) | returned unchanged |
| non-string / `null` | returned unchanged |

- **Reuse, not a new system:** the pre-existing shared helper `_lessonAudioDir` (which already returns the
  lesson resource directory from `LESSON.meta.id`) is reused; only a thin video-specific wrapper was added,
  because the audio path resolver hardcodes `assets/audio/`.
- No `if (lessonId === '01')` / `switch (lessonId)` anywhere; the rule is `lesson ID → assets/videos/lesson-{ID}/`.
- Extension is not inspected, so any video extension (`.mp4`, `.webm`, `.mov`) resolves identically.
- Content/presentation separation preserved: `js/app.js`, `js/activities/*`, `js/engine/*` contain **no**
  hardcoded lesson names.

---

## C. Files Changed

| File | Reason | Before → After (SHA-256) |
|------|--------|--------------------------|
| `js/app.js` | Added generic `_resolveVideoPath()` (reusing the shared lesson-dir helper). | `BD39ED09…077D04A` → `87B37E6B…159D35078` |
| `js/activities/stroke-video.js` | P4 `<video src>` now uses `_resolveVideoPath(guide.videoFile)` instead of the raw flat path. | new: `5C19DED2…D16CAFD0` |

No other file changed. No lesson data, schema, CSS, HTML, loader, engine, or other activity was modified.

---

## D. Lesson 01 — Path proof

`lecture.html?lesson=01` renders P4 with a live `<video>` element whose `src` is now:

```
assets/videos/lesson-01/ba.mp4
```

- All 4 `strokeGuides` resolve to `assets/videos/lesson-01/{ba,ta,tha,nun}.mp4` and **all 4 files exist on
  disk**.
- Captured DOM value from `#p4-video` after `initP4()` = `assets/videos/lesson-01/ba.mp4` (PASS).

---

## E. Lesson 02 / 03 — Resolver proof

Even though their video assets are not yet supplied, the resolver maps them automatically:

| Lesson | First guide | Resolved `#p4-video` src | Target dir |
|--------|-------------|--------------------------|------------|
| 02 | `assets/videos/jeem.mp4` | `assets/videos/lesson-02/jeem.mp4` | exists |
| 03 | `assets/videos/seen.mp4` | `assets/videos/lesson-03/seen.mp4` | exists |

- Lesson 02: 4/4 guide paths namespaced to `assets/videos/lesson-02/` (0 files present — expected).
- Lesson 03: 3/3 guide paths namespaced to `assets/videos/lesson-03/` (0 files present — expected).
- No crash when the files are absent (see section F).

---

## F. Missing Video Behavior

- **Unchanged** and non-fatal: `p4PlayVideo()` still calls `video.play().catch(() => {})`, and
  `p4PauseAtStart()` guards `if (!video) return`.
- After resolution, a missing file simply yields a `src` that the browser fails to load; the rejected
  `play()` promise is swallowed. Verified: calling `p4PlayVideo()` with a rejecting `play()` produced
  `missing-video-no-crash` for lessons 01, 02, and 03.
- `renderP4()` itself throws nothing when assets are absent (PASS for all three lessons).

---

## G. 16-Lesson Scalability

The rule is data-driven (folder = `LESSON.meta.id`) and contains no per-lesson code. Synthetic metas fed to
the real resolver produce a stable mapping:

| Lesson ID | Resolved directory | Lesson ID | Resolved directory |
|-----------|--------------------|-----------|--------------------|
| `lesson-01` | `assets/videos/lesson-01/` | `lesson-09` | `assets/videos/lesson-09/` |
| `lesson-02` | `assets/videos/lesson-02/` | `lesson-010` | `assets/videos/lesson-010/` |
| `lesson-03` | `assets/videos/lesson-03/` | `lesson-011` | `assets/videos/lesson-011/` |
| `lesson-04` | `assets/videos/lesson-04/` | `lesson-012` | `assets/videos/lesson-012/` |
| `lesson-05` | `assets/videos/lesson-05/` | `lesson-013` | `assets/videos/lesson-013/` |
| `lesson-06` | `assets/videos/lesson-06/` | `lesson-014` | `assets/videos/lesson-014/` |
| `lesson-07` | `assets/videos/lesson-07/` | `lesson-015` | `assets/videos/lesson-015/` |
| `lesson-08` | `assets/videos/lesson-08/` | `lesson-016` | `assets/videos/lesson-016/` |

Existing project IDs are respected verbatim (`lesson-010`…`lesson-016` are **not** renamed to
`lesson-10`…`lesson-16`). Adding lesson-04 requires only its data + `assets/videos/lesson-04/`; no engine
edit. (No lesson-04 data or videos were created.)

---

## H. Regression

**Boot / leak (full page, lessons 01/02/03):**

```
01 :: P1:ok(4) | P2:ok(3) | P3:ok(4) | P4:ok(2) | P5:ok(3) | P6:ok(8) | P6-D2:ok(10) | P7:ok(17) | title:OK | color:OK | leak:01:ZERO
02 :: ...same... | title:OK | color:OK | leak:02:ZERO
03 :: ...same... | title:OK | color:OK | leak:03:ZERO
```

**Audio resolver regression:** `audio-dir-test.js` = `ALL-OK` (audio behavior untouched).

**Video resolver harness:** 24/24 checks `ALL-OK` (paths, target dirs, live P4 `src`, missing-video
no-crash, edge cases, 16-lesson table).

**Schema validator (data unchanged):**

```
lesson-01 :: RESULT: 0 errors | 0 warnings   SELF-TEST: 4/4
lesson-02 :: RESULT: 0 errors | 4 warnings   SELF-TEST: 4/4   (known non-blocking)
lesson-03 :: RESULT: 0 errors | 2 warnings   SELF-TEST: 4/4   (known non-blocking)
```

**Runtime reference audit:** the only runtime construction of an `assets/videos/…` path is the resolver in
`js/app.js:73`; `js/activities/*` and `js/engine/*` have none. Lesson data retains logical names
(`assets/videos/<name>.mp4`), resolved by the engine. Remaining mentions are documentation (historical
reports) only.

---

## I. Protected Files — Unchanged (SHA-256 verified)

| File | SHA-256 (unchanged) |
|------|---------------------|
| `js/lesson-01.js` | `591804C32A8B9451A4D94712531C9760A9AC2EABF095A53AAAAEF69535F92B09` |
| `js/lesson-02.js` | `96BEB452959C2C76AF8052BA12327CEBA582ED7F4B2EEC3A34E3AE80D9F20A10` |
| `js/lesson-03.js` | `8912D70E31ED83F13733B8B9859392EF3A36B747609DE11E40AAC4BEE8AF1391` |
| `js/loader.js` | `B335E6EEB62A522E03112C6E06F9593B8E017ADD4A1FC443B075C49150FD953A` |
| `schema/lesson-schema.js` | `8E6B3EB8E487E04A4461C8E277DBA90EB7E106CC32841158A433CBFB65843C88` |
| `css/style.css` | `7D459C6A9C5CFF3670DAA721692CED34462CD8E796818A9C0F3A5774D016F727` |
| `css/responsive-system-v1.1.css` | `F86DE38B159645FAB99804AC5E5DA137B7A1705BECD5E0AE7185AA487939240E` |
| `lecture.html` | `CB2C9D3C3903391B18C7800841A6DB1B6FE9ECCC2E9C2A4E170A42DE45F43A3B` |

- Flexbox centering fix untouched (`css/style.css` hash `7D459C6A…`).
- Schema not modified (inference from `LESSON.meta.id` sufficed; no new field).
- No video file was moved, renamed, deleted, or duplicated; the user's `assets/videos/lesson-01/` layout was
  preserved exactly.
- No UI/video-player/CSS/P2–P7 redesign; no new resource-management system; no new lesson created.

**Conclusion.** Lesson videos now resolve generically to `assets/videos/<lesson-ID>/`; playback and
missing-video behavior are unchanged; only the resolver (`js/app.js`) and its single call site
(`js/activities/stroke-video.js`) changed.
