# Archive Migration Progress Notes

## Instance Details

### 1. Wahlrechner (AT) - German
- Branch: `wahlrechner-archive`
- Current URL: `www.wahlrechner.at`
- Archive URL: `archiv.wahlrechner.at`
- Archive term: "Archiv"
- Locale: `de`

### 2. Kalkulatori Zgjedhor (AL) - Albanian
- Branch: `kalkulatori-zgjedhor-al-archive`
- Current URL: `www.kalkulatorizgjedhor.al`
- Archive URL: `arkiv.kalkulatorizgjedhor.al`
- Archive term: "Arkiv"
- Locale: `sq`

### 3. Kalkulatori Zgjedhor (XK) - Albanian/Kosovo
- Branch: `kalkulatori-zgjedhor-xk-archive`
- Current URL: `www.kalkulatorizgjedhor.org`
- Archive URL: `arkiv.kalkulatorizgjedhor.org`
- Archive term: "Arkiv"
- Locale: `sq`

### 4. TestVot (RO) - Romanian
- Branch: `testvot2-archive`
- Current URL: `testvot.eu`
- Archive URL: `arhiv.testvot.eu`
- Archive term: "Arhiv"
- Locale: `ro`

## Progress Tracker

### Wahlrechner (AT)
- [x] Phase 1: Infrastructure Removal (c746941)
- [x] Phase 2: Build Simplification (f8140a9)
- [ ] Phase 3: Static Page Redirects
- [ ] Phase 4: SPA Routing
- [ ] Phase 5: Domain & Branding (2-3 commits)
- [ ] Phase 6: Homepage Redesign

### AL, XK, RO
- [ ] All phases pending

## Key Patterns to Apply

### German (DE) Translations
- "Neuer Wahlrechner ist verfügbar!"
- "Dies ist ein Archiv..."
- "Aktuellen Wahlrechner finden Sie auf"
- "Zum aktuellen Wahlrechner"

### Albanian (SQ) Translations
- "Kalkulatori i ri zgjedhor është i disponueshëm!"
- "Ky është një arkiv..."
- "Kalkulatorin aktual mund ta gjeni në"
- "Shko te kalkulatori aktual"

### Romanian (RO) Translations
- "Noul TestVot este disponibil!"
- "Acesta este un arhiv..."
- "TestVot-ul actual îl găsiți la"
- "Mergi la TestVot-ul actual"

## Footer Path Patterns
- DE: `/uber-uns`, `/methodik`, `/datenschutz`
- SQ (AL/XK): `/rreth-nesh`, `/metodologjia`, `/privatesia`
- RO: `/despre-noi`, `/metodologie`, `/protectia-datelor`
