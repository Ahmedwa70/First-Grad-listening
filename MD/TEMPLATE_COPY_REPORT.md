# TEMPLATE_COPY_REPORT.md

> **Snapshot source:** `v1.2\_RELEASE` (Phase 2.5 verified build)
> **Destination:** `v1.2\new_template`
> **Date:** 2026-09-17

---

## Flow Summary

| Step | Status |
|------|--------|
| 1. IDENTIFY | ✅ PASS |
| 2. COPY | ✅ PASS (74 files) |
| 3. VERIFY | ✅ PASS (74/74 SHA-256, boot OK) |
| 4. MANIFEST | ✅ `TEMPLATE_MANIFEST.md` |
| 5. REPORT | ✅ this file |
| 6. STOP | ✅ Phase 3 NOT started |

---

## IDENTIFY — Source Analysis

### Copied (Template Core + Reference Data + Assets)

```
new_template/
├── lecture.html                        runtime entry point (no favicon, no external links)
├── css/
│   ├── style.css                       main stylesheet (no lesson-specific colors after W5)
│   └── responsive-system-v1.1.css      responsive layer (untouched)
├── js/
│   ├── app.js                          universal engine (lessons via LESSON global)
│   ├── lesson-01.js                    [DECISION: Option A] reference lesson data
│   ├── engine/
│   │   ├── activity-engine.js
│   │   ├── activity-definitions.js
│   │   └── p6-d2-bridge.js
│   └── activities/ (7 files)
└── assets/
    ├── audio/   9 files   (ba/ta/tha/nun + word_bab/bayt/tamr/thawb/nar)
    ├── fonts/  46 files   (Noto Naskh Arabic + Noto Sans Arabic families)
    └── videos/  4 files   (ba/ta/tha/nun stroke guides)
```

### Excluded (NOT copied)

| File/Dir | Category | Reason |
|----------|----------|--------|
| `lecture-01.html` | B — lesson-specific | Phase 1 legacy page |
| `js/lesson-01.backup-before-QD16.js` | C — backup | Frozen, superseded |
| `md/*`, `Work plan/*`, root `*.md` | D — docs | Not runtime |

---

## Decision Log

### 1. `lesson-01.js` → **Option A: copy as Reference/Example Data**
`lecture.html` loads `js/lesson-01.js` in its script block; excluding it would break the entry page. The file is kept so `new_template` is self-contained and boots. It is **not** template core — it is Lesson‑01 data (letters ب ت ث ن, activity labels, `p6Strings`) and serves as the example for future `lesson-XX.js` files.

### 2. `lecture-01.html` → **Excluded (Category B)**
Legacy Phase 1 page with its own dedicated script set and markup. Not part of the generic `lecture.html` architecture. Left untouched in `_RELEASE`.

### 3. `assets/` → **Full copy (53 files, 9.4 MB)**
Minimal runtime subset = 5 fonts + 9 audio + 4 video (as verified by `@font-face` in `style.css` and `audioFile`/`videoFile` in `lesson-01.js`). Full copy chosen to keep the snapshot independent of any future font-stack/data changes; cost is modest (~9.4 MB).

### 4. Script order preserved (from `lecture.html`)
`lesson-01.js` → inline meta script → `engine/activity-engine.js` → `engine/activity-definitions.js` → `engine/p6-d2-bridge.js` → 7 activity files → `app.js?v=7`.

---

## VERIFY — Results

### A. Hash integrity (SHA-256)

```
Files scanned:   74
Matched:         74/74   ✅
Mismatches:       0
```

All 74 copied files are **byte-identical** to their `_RELEASE` counterparts.

### B. External dependency scan

| Check | Result |
|-------|--------|
| `../` escaping the copy root | **NONE** (only `../assets/fonts/...` in `style.css`, resolves within `assets/`) |
| Drive-letter absolute paths (`C:\`, `D:\`) | **NONE** in code files |
| `http://` / `https://` network URLs | **NONE** in code files (matches exist only inside mp3 binary XMP metadata — `ns.adobe.com` etc., no runtime dependency) |
| `file:///` URIs | **NONE** |
| Hardcoded source paths (`_RELEASE`, `new_template`) | **NONE** |

### C. Asset reference resolution
Every `assets/...` path in the copied `lecture.html`/`js/*`/`css/*` resolves to an existing file inside `new_template`.

### D. Boot test (jsdom — full script chain, no `_RELEASE` present)

```
lecture.html :: P1:ok(1) | P2:ok(1) | P3:ok(1) | P4:ok(1) | P5:ok(1) | P6:ok(1) | P7:ok(1) | title:OK
```

All 7 phases boot; title = `المحاضرة الأولى — ب ت ث ن`.

---

## SHA-256 Hash Table (16 code/config files)

| # | File | Size | SHA-256 |
|---|------|------|---------|
| 1 | `lecture.html` | 13,126 | `1BD8283FCEBA5B5EA7600FAA851A983025DBC493DE18AA3A66A19F433FD92D34` |
| 2 | `css/style.css` | 233,368 | `FC13C818CE69C985437BD98D04B0EC0D1156EB72EF00C5347B4AE0235B021A71` |
| 3 | `css/responsive-system-v1.1.css` | 12,577 | `F86DE38B159645FAB99804AC5E5DA137B7A1705BECD5E0AE7185AA487939240E` |
| 4 | `js/app.js` | 28,906 | `E0CC6D38A1F4434C4756A8D4BDD4C5B79629ADC317C72370158085A6FE09BA96` |
| 5 | `js/lesson-01.js` | 26,157 | `591804C32A8B9451A4D94712531C9760A9AC2EABF095A53AAAAEF69535F92B09` |
| 6 | `js/engine/activity-engine.js` | 8,941 | `AEABFF46121F838B37314BE075553B236BD3FE67CA649D47B2DF17B94461349F` |
| 7 | `js/engine/activity-definitions.js` | 15,609 | `C50D198CBD88C7AA8A4729B8446E426AC70DC15FF326C4FE337838F890E26013` |
| 8 | `js/engine/p6-d2-bridge.js` | 1,496 | `815551E9026CAFFB4808615D270497547CCBF2604EEE1F983671B708C54E1A35` |
| 9 | `js/activities/welcome-orientation.js` | 6,394 | `930A3DA99836636C95227FF421C41266AFDC78C66B78B532B655460640A8392B` |
| 10 | `js/activities/letter-reveal.js` | 12,247 | `7D07B1F52B480AD7FA1A20914CC388F80ED6EDB23C93C9E3AD725FA35DDD813E` |
| 11 | `js/activities/phoneme-explore.js` | 7,570 | `2DEC371EFEA3AD46E6A7C4749650E6AF736B2C8D4755CCDF7A380A01B0184161` |
| 12 | `js/activities/stroke-video.js` | 7,661 | `DC402ADC386CD0D404B9939D828045040D3DFF72EC30A6EBDC4154758D3D77A5` |
| 13 | `js/activities/auditory-discrimination.js` | 27,233 | `22F0786065FA1F28795B22BC9530577BF92CAE9E8C36425D96CAA0A3FD5E0455` |
| 14 | `js/activities/word-reveal.js` | 17,753 | `746717EDB9063C79E03AB8F8D5B702499AD83770D524CE30C4A9F2E21C87923D` |
| 15 | `js/activities/assessment-quiz.js` | 13,682 | `1081E1EB3F99F8D39252CD255FEF12691F49BAD17EE0A35A36F46E227CA75BE6` |
| 16 | `assets/**` (59 files: 46 fonts + 9 audio + 4 video) | — | All byte-identical; full SHA-256 TSV saved at `C:\Users\NextEdge\AppData\Local\Temp\opencode\tpl_hashes.tsv` |

---

## Final Verdict

```
╔══════════════════════════════════════════════════════════╗
║  TEMPLATE SNAPSHOT VERIFIED                               ║
║  74/74 SHA-256 ✅   BOOT P1-P7 OK ✅   ZERO EXTERNAL       ║
║  DEPS ✅   ASSET RESOLUTION ✅   SOURCE UNTOUCHED ✅        ║
╚══════════════════════════════════════════════════════════╝
```

`new_template` is a byte-identical, self-contained, independently runnable snapshot of the Phase 2.5 verified build. The source `_RELEASE` was not modified. **STOP — Phase 3 not started.**