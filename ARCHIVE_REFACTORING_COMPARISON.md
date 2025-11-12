# Archive Refactoring Comparison: Deep Analysis

## Executive Summary

This document provides a comprehensive comparison of the archive refactoring applied across four branches, converting active election calculators into archived versions. The refactoring follows a consistent pattern while accommodating locale-specific variations.

### Branches Analyzed

| Branch | Purpose | Archive URL | Elections Covered | Key Commits |
|--------|---------|-------------|-------------------|-------------|
| **main** (+ main-archive-fix) | Volební kalkulačka CZ 2022–2023 | `archiv.volebnikalkulacka.cz` | Prezidentské 2023, Komunální & Senátní 2022 | 41d3469, e17c826, c9de572, 8cdde80, 6053fe1, df713fb |
| **volebni-kalkulacka** | Volební kalkulačka CZ 2024 | `archiv-2024.volebnikalkulacka.cz` | Evropské, Krajské & Senátní 2024 | 79f2ed6, bce9883, f5d6dda |
| **volebna-kalkulacka-archiv** | Volebná kalkulačka SK 2023–2024 | `archiv.volebnakalkulacka.sk` | Parlamentné 2023, Európske 2024 | 5167ae4, 60369c4, 56d4cd8, 9bb7d45, a3849b7, f350123, 5165abc, aeac269 |
| **voksmonitor-archive** | Voksmonitor HU 2024 | `archivum.voksmonitor.hu` | Európai 2024, Önkormányzati | c31914a, 75b6ccd, 590d763, 4da0c36, 20b27ac, 5510901, 7cf20b6 |

---

## Common Refactoring Pattern

All archive branches follow the same core refactoring strategy with these sequential steps:

### 1. **Database Removal** (Complete Backend Elimination)

All branches removed the entire database infrastructure to create static archive sites.

**Files Deleted:**
- `frontend/api/answers/[id].ts` (86 lines)
- `frontend/api/answers/index.ts` (41 lines)
- `frontend/api/auth/index.ts` (254-320 lines, varies by branch)
- `frontend/api/subscriptions/index.ts` (33 lines)
- `frontend/api/users/me.ts` (44 lines)
- `frontend/src/common/restApi.ts` (194 lines)
- `frontend/src/common/share.ts` (53 lines)
- `frontend/src/server/answers.ts` (31 lines)
- `frontend/src/server/auth.ts` (38 lines)
- `frontend/src/server/errors.ts` (129 lines)
- `frontend/src/server/prisma.ts` (40 lines)
- `frontend/src/server/mailing.ts` (36 lines - SK/HU only)

**Pages/Components Deleted:**
- `frontend/src/routes/profile/` (entire directory including ProfilePage, ProfileSettingsPage, AuthPageVue, EmailAuthPageVue, EmailFormPageVue, ProfileCardComponent, ElectionCardWrapperComponent, SocialMediaConnectComponent)
- `frontend/src/routes/share/SharePage.vue` (158-173 lines)
- `frontend/src/routes/result/ResultShareModal.vue` (166-178 lines)

**Stores Removed:**
- `frontend/src/stores/electionStore.ts` (81 lines)
- `frontend/src/stores/userStore.ts` (29 lines)

**Component Modifications:**
- `NavigationBar.vue` - Removed account/user authentication UI (44-47 lines removed)
- `ElectionCardComponent.vue` - Removed profile/save functionality (16-22 lines removed)
- `WebProvider.vue` - Removed embedding save functionality (5 lines removed)
- `ResultPage.vue` - Removed sharing and profile integration (111-179 lines removed)
- `IndexPage.vue` - Removed user store references (84-86 lines removed)

**Routes Removed from `main.ts`:**
- Profile routes (27-80 lines removed)
- Share routes
- Authentication routes

**Total Code Reduction:** ~2,880-3,071 lines per branch

---

### 2. **Static Page Removal & Redirect Setup**

Archive branches redirect informational pages to the main (current) site.

**Pages Deleted:**
- `frontend/src/routes/about-us/AboutUsPage.vue` (297-324 lines)
- `frontend/src/routes/data-protection/DataProtectionPage.vue` (56-59 lines)
- `frontend/src/routes/data-protection/PrivacyPolicy.md` (86 lines - CZ/SK, 1 line - HU)
- `frontend/src/routes/questions-methodology/QuestionsMethodologyPageVue.vue` (64-68 lines)
- `frontend/src/routes/questions-methodology/QuestionsMethodologyText.md` (171-183 lines)

**Redirects Added to `vercel.json`:**

```json
{
  "redirects": [
    {
      "source": "/o-nas",
      "destination": "https://www.{main-site}/o-nas",
      "permanent": true
    },
    {
      "source": "/metodika-tvorby-otazek", // CZ
      // OR "/metodika-tvorby-otazok" (SK)
      "destination": "https://www.{main-site}/metodika",
      "permanent": true
    },
    {
      "source": "/ochrana-dat",
      "destination": "https://www.{main-site}/soukromi", // CZ
      // OR "/sukromie" (SK) / various for HU
      "permanent": true
    }
  ]
}
```

**Footer Link Changes (`FooterMultiWord.vue`):**
- Changed from `<router-link to="/o-nas">` to `<a href="/o-nas">`
- Changed from `<router-link to="/metodika-tvorby-otazek">` to `<a href="/metodika-tvorby-otazek">`
- Changed from `<router-link to="/ochrana-dat">` to `<a href="/ochrana-dat">`

This ensures clicking footer links triggers server-side redirects to the main site instead of client-side routing.

---

### 3. **SPA Rewrite Configuration**

To maintain client-side routing functionality, all branches added SPA rewrite rules.

**Added to `vercel.json`:**

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/"
    }
  ]
}
```

This ensures all routes serve the SPA `index.html`, enabling Vue Router to handle navigation.

---

### 4. **Build Process Simplification**

All branches updated `frontend/vercel-build.sh` to remove database dependencies.

**Before (with database):**
```bash
if [[ $VERCEL_ENV == "production" ]]; then
  echo "Building for production environment, running database migration"
  prisma generate && prisma migrate deploy && npm run build-only && cp -r ../data ./dist/
elif [[ $VERCEL_GIT_COMMIT_REF == "staging" ]]; then
  echo "Building for preview environment, running database migration for \`staging\` branch"
  export DATABASE_URL="$DATABASE_URL_BASE/staging"
  prisma generate && prisma migrate deploy && npm run build-only:preview && cp -r ../data ./dist/
else
  echo "Building for preview environment, using a clean database for \`$VERCEL_GIT_COMMIT_REF\` branch"
  GIT_COMMIT_REF_SHA=$(echo -n $VERCEL_GIT_COMMIT_REF | openssl dgst -sha256 | sed 's/^.* //')
  export DATABASE_URL="$DATABASE_URL_BASE/$GIT_COMMIT_REF_SHA"
  prisma generate && prisma migrate reset --force && npm run build-only:preview && cp -r ../data ./dist/
fi
```

**After (database-free):**
```bash
if [[ $VERCEL_ENV == "production" ]]; then
  echo "Building for production environment"
  npm run build-only && cp -r ../data ./dist/
else
  echo "Building for preview environment"
  npm run build-only:preview && cp -r ../data ./dist/
fi
```

Removed: `prisma generate`, `prisma migrate deploy`, `prisma migrate reset`, database URL manipulation

---

### 5. **Environment & Domain Configuration**

All branches updated production URLs to archive subdomains.

**Changes to `frontend/.env.production`:**

| Branch | Before | After |
|--------|--------|-------|
| main | `PUBLIC_URL=https://www.volebnikalkulacka.cz` | `PUBLIC_URL=https://archiv.volebnikalkulacka.cz` |
| volebni-kalkulacka | `PUBLIC_URL=https://www.volebnikalkulacka.cz` | `PUBLIC_URL=https://archiv-2024.volebnikalkulacka.cz` |
| volebna-kalkulacka-archiv | `PUBLIC_URL=https://www.volebnakalkulacka.sk` | `PUBLIC_URL=https://archiv.volebnakalkulacka.sk` |
| voksmonitor-archive | `PUBLIC_URL=https://www.voksmonitor.hu` | `PUBLIC_URL=https://archivum.voksmonitor.hu` |

**Changes to `frontend/index.html`:**
- Updated all `og:url` meta tags to archive domain
- Updated all `og:image` URLs to archive domain
- Updated `twitter:image` URLs to archive domain

---

### 6. **Branding & Title Updates**

Each branch updated branding to clearly indicate archive status.

#### **Logo Component (`LogoComponent.vue`)**

| Branch | Logo Text |
|--------|-----------|
| main | `Volební kalkulačka archiv 2022–2023` |
| volebni-kalkulacka | (No logo text change in commits analyzed) |
| volebna-kalkulacka-archiv | (No logo text change in commits analyzed) |
| voksmonitor-archive | `Voksmonitor Archívum` |

#### **Page Titles (`index.html`)**

| Branch | Before | After |
|--------|--------|-------|
| main | `Archiv volebních kalkulaček` | `Volební kalkulačka archiv 2022–2023` |
| volebna-kalkulacka-archiv | (Original SK title) | `Volebná kalkulačka Archív 2023–2024` |
| voksmonitor-archive | `Voksmonitor 2024` | `Voksmonitor Archívum 2024` |

#### **Meta Descriptions (`index.html`)**

Updated to:
- Mention archive status
- Specify which elections are archived
- Redirect users to current site (e.g., "Aktuální kalkulačku najdete na www.volebnikalkulacka.cz")

#### **Route Titles (`main.ts`)**

All route meta titles updated to include archive designation:

**main branch example:**
```typescript
meta: {
  title: 'Volební kalkulačka archiv 2022–2023',
}
// Applied to: index, error, districtSelection, guide, question, recap, result, comparison routes
```

**volebna-kalkulacka-archiv example:**
```typescript
meta: {
  title: 'Error - Volebná kalkulačka Archív',
}
```

**voksmonitor-archive example:**
```typescript
meta: {
  title: 'Voksmonitor Archívum 2024',
}
```

---

### 7. **Homepage Redesign**

All branches significantly redesigned the homepage to:
1. Emphasize archive status
2. Prominently link to current site
3. Provide context about archived elections

#### **Main Pattern (Consistent Across All Branches):**

```vue
<section class="current-version-hero">
  <StackComponent spacing="medium" centered>
    <CardComponent style="max-width: 48rem; text-align: center;">
      <StackComponent spacing="medium" centered>
        <HeadlineText tag="h1" size="medium" color="fg-strong">
          [New Calculator Available Message]
        </HeadlineText>
        <BodyText size="medium" centered>
          This is an archive of calculators from [years].
          <strong>Current calculator available at
          <a href="https://www.[main-site]">[main-site]</a></strong>
        </BodyText>
        <ButtonComponent
          kind="filled"
          color="primary"
          tag="a"
          href="https://www.[main-site]"
          target="_blank"
        >
          Go to Current Calculator
        </ButtonComponent>
        <BodyText size="small" color="fg-muted" centered>
          This archive contains calculators for [specific elections]
        </BodyText>
      </StackComponent>
    </CardComponent>
  </StackComponent>
</section>
```

#### **Branch-Specific Homepage Messages:**

**main (CZ 2022–2023):**
```
Archiv Volebních kalkulaček z let 2022–2023
Prezidentské, komunální a senátní volby

"Nová Volební kalkulačka je tady!"
"Aktuální kalkulačku najdete na www.volebnikalkulacka.cz"
```

**volebni-kalkulacka (CZ 2024):**
```
Archiv Volebních kalkulaček z roku 2024
Evropské, krajské a senátní volby

"Nová Volební kalkulačka je tady!"
"Aktuální kalkulačku najdete na www.volebnikalkulacka.cz"
```

**volebna-kalkulacka-archiv (SK 2023–2024):**
```
Archív Volebných kalkulačiek z rokov 2023–2024
Európske, prezidentské a parlamentné voľby

"Nová Volebná kalkulačka je tu!"
"Aktuálnu kalkulačku nájdete na www.volebnakalkulacka.sk"
```

**voksmonitor-archive (HU 2024):**
```
(Similar pattern in Hungarian)
Archívum 2024
Európai parlamenti és önkormányzati választások
```

**Changes Made:**
- Removed or simplified calculator launch buttons for specific elections
- Added prominent "archive notice" card at top of page
- Replaced direct calculator links with links to main site
- Simplified election card displays (varies by branch)

**Lines Changed:** 59-748 lines modified per branch in `IndexPage.vue`

---

## Branch-Specific Differences

### **Main (CZ 2022–2023 Archive)**

**Unique Characteristics:**
1. **Most aggressive cleanup** - Removed 2,880 lines, most comprehensive database removal
2. **Archive redirect added** - Unique redirect from `/archiv` to 2024 archive:
   ```json
   {
     "source": "/archiv",
     "destination": "https://archiv-2024.volebnikalkulacka.cz/archiv",
     "permanent": true
   }
   ```
3. **Two-phase branding update:**
   - Initial commit: Set logo to "Archiv volebních kalkulaček"
   - Follow-up (main-archive-fix): Updated to "Volební kalkulačka archiv 2022–2023"
4. **Specific elections archived:**
   - Prezidentské volby 2023 (1. a 2. kolo)
   - Komunální volby 2022
   - Senátní volby 2022
5. **Node version update:** Added `frontend/.nvmrc` with Node version specification

**Commit Timeline:**
1. `41d3469` - Major database removal and page deletions
2. `a22d4cb` - README update
3. `1084961` - Homepage update
4. `356caab` - Add ignored build step
5. `cebbc66` - Update title to archive
6. `e42833a` - Update README for archive
7. `8cdde80` - Fix redirected links (router-link → a href)
8. `c9de572` - Bring back SPA rewrite
9. `e17c826` - Update Vercel build command (remove database)
10. `6053fe1` - Final branding update (2022–2023 specific)
11. `df713fb` - Merged to main

---

### **volebni-kalkulacka (CZ 2024 Archive)**

**Unique Characteristics:**
1. **Preserved archive page** - Kept `frontend/src/routes/archive/` directory with:
   - `ArchivePage.vue` (modified)
   - `Archive.md` (updated content)
2. **Different URL scheme** - Uses `archiv-2024` subdomain instead of just `archiv`
3. **Footer modifications** - More extensive footer link changes (14 lines modified)
4. **Specific elections archived:**
   - Evropské volby 2024
   - Krajské volby 2024
   - Senátní volby 2024
5. **"Coming soon 2025" feature** - Added message about upcoming elections before archiving

**Key Differences from main:**
- Less aggressive page removal (755 lines vs 2,880)
- Kept archive documentation page
- More gradual homepage redesign

**Commit Timeline:**
1. `b3fe1af` - Add follow buttons
2. `4b29146` - Add 2025 coming soon
3. `79f2ed6` - Update archive 2024 (remove pages, update homepage)
4. `bce9883` - Update Vercel build command (remove database)
5. `f5d6dda` - Few more archive 2024 fixes

---

### **volebna-kalkulacka-archiv (SK 2023–2024)**

**Unique Characteristics:**
1. **Locale-specific configuration:**
   - `VITE_DEFAULT_LOCALE=sk` in `.env.production`
   - Slovak language throughout
2. **Different archive term** - Uses "Archív" (Slovak) instead of "Archiv" (Czech)
3. **Most gradual refactoring** - Split into more incremental commits
4. **Unique redirects** - Slovak-specific static page redirects:
   ```json
   {
     "source": "/metodika-tvorby-otazok",
     "destination": "https://www.volebnakalkulacka.sk/metodika"
   }
   ```
5. **Different OG images** - Uses SK-specific images: `og-image-sk-2024-eu.png`
6. **Specific elections archived:**
   - Parlamentné voľby (NRSR) 2023
   - Európske voľby 2024

**Node Version:** Updated `.nvmrc` from old version to newer

**Commit Timeline:**
1. `5167ae4` - Remove database (3,071 lines)
2. `60369c4` - Update Vercel build command
3. `7664edd` - Bring back SPA rewrite
4. `56d4cd8` - Redirect static pages
5. `9bb7d45` - Update title
6. `a3849b7` - Update description
7. `f350123` - Swap www with archiv
8. `5165abc` - Update homepage (major redesign, 251 lines changed)
9. `aeac269` - Update all route titles to include Archív

**Most detailed timeline** - 9 distinct commits for archive transformation

---

### **voksmonitor-archive (HU 2024)**

**Unique Characteristics:**
1. **Locale-specific configuration:**
   - `VITE_DEFAULT_LOCALE=hu` in `.env.production`
   - Hungarian language throughout
2. **Different archive term** - Uses "Archívum" (Hungarian) instead of Czech/Slovak variants
3. **Different URL subdomain** - Uses `archivum` instead of `archiv`
4. **Facebook integration** - Unique `fb:app_id` meta tag: `297106463778572`
5. **Different OG images** - Uses HU-specific images: `og-image-hu-2024-eu.png`
6. **Minimal privacy policy** - `PrivacyPolicy.md` was only 1 line (vs 86 lines in CZ/SK)
7. **Specific elections archived:**
   - Európai parlamenti választások 2024
   - Önkormányzati választások 2024 (including Debrecen)

**Node Version:** Updated `.nvmrc` from old version to newer

**Commit Timeline:**
1. `c31914a` - Remove database (2,998 lines)
2. `75b6ccd` - Update Vercel build command
3. `590d763` - Redirect static pages
4. `4da0c36` - Update title and description (including logo component)
5. `20b27ac` - Swap www with archivum
6. `5510901` - Update homepage (major redesign, 748 lines changed)
7. `7cf20b6` - Update all route titles to include Archívum

**Similar pattern to SK** - Multi-commit incremental refactoring

---

## File-by-File Detailed Breakdown

### **Critical File Changes**

#### **1. `frontend/vercel.json`**

**Purpose:** Vercel deployment configuration

**Changes Applied:**
- **Added:** `rewrites` array with SPA catch-all rule
- **Added:** `redirects` array for static pages → main site
- **Modified/Removed:** API route rewrites (removed in CZ 2022 archive)

**Branch Differences:**
- **main:** Most complex, includes `/archiv` redirect to 2024 archive
- **Others:** Standard static page redirects only

**Final Structure:**
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/"
    }
  ],
  "redirects": [
    { "source": "/o-nas", "destination": "https://www.[main]/...", "permanent": true },
    { "source": "/metodika...", "destination": "https://www.[main]/...", "permanent": true },
    { "source": "/ochrana-dat", "destination": "https://www.[main]/...", "permanent": true }
  ],
  "trailingSlash": false
}
```

---

#### **2. `frontend/.env.production`**

**Purpose:** Production environment variables

**Changes Applied:**
- Updated `PUBLIC_URL` to archive subdomain
- Maintained locale configuration (SK/HU only)

**Examples:**
```bash
# CZ 2022–2023
PUBLIC_URL=https://archiv.volebnikalkulacka.cz

# CZ 2024
PUBLIC_URL=https://archiv-2024.volebnikalkulacka.cz

# SK
PUBLIC_URL=https://archiv.volebnakalkulacka.sk
VITE_DEFAULT_LOCALE=sk

# HU
PUBLIC_URL=https://archivum.voksmonitor.hu
VITE_DEFAULT_LOCALE=hu
```

---

#### **3. `frontend/index.html`**

**Purpose:** Root HTML template with meta tags

**Changes Applied:**
1. Updated `<title>` tag to include archive designation and years
2. Updated `og:url` to archive domain
3. Updated `og:title` to include "Archív/Archívum/archiv" + years
4. Updated `og:description` to:
   - Mention archive status
   - List specific elections
   - Direct to current site URL
5. Updated all image URLs (`og:image`, `og:image:secure_url`, `twitter:image`) to archive domain

**Example (main branch):**
```html
<title>Volební kalkulačka archiv 2022–2023</title>
<meta property="og:url" content="https://archiv.volebnikalkulacka.cz" />
<meta property="og:title" content="Volební kalkulačka archiv 2022–2023" />
<meta property="og:description" content="Archiv Volební kalkulačky pro prezidentské volby 2023, komunální a senátní volby 2022. Aktuální kalkulačku najdete na www.volebnikalkulacka.cz" />
```

**Lines Changed:** 8-10 lines per branch

---

#### **4. `frontend/src/components/design-system/style/LogoComponent.vue`**

**Purpose:** Logo component displayed in navigation

**Changes Applied:**
- Updated logo text to include archive designation

**Examples:**
```vue
<!-- main -->
Volební kalkulačka archiv 2022–2023

<!-- voksmonitor-archive -->
Voksmonitor Archívum
```

**Note:** Not all branches modified this file in analyzed commits

---

#### **5. `frontend/src/main.ts`**

**Purpose:** Vue Router configuration and route definitions

**Changes Applied:**
1. **Removed:** 27-80 lines of profile/auth route definitions
2. **Updated:** All route `meta.title` fields to include archive designation

**Route Titles Updated:**
- Index/home page
- Error page
- District selection
- Guide page
- Question pages (with $$ placeholder for number)
- Recap page
- Result page
- Comparison page

**Example (volebna-kalkulacka-archiv):**
```typescript
{
  name: 'guide',
  path: `/:type(...)/:first/:second?/:third?/:fourth?/${'navod'}/:step(\\d+)?`,
  component: GuidePageVue,
  meta: {
    title: 'Návod - Volebná kalkulačka Archív',
  },
}
```

**Lines Changed:** 14-79 lines per branch (14 title updates + route removals)

---

#### **6. `frontend/src/routes/index/IndexPage.vue`**

**Purpose:** Homepage component

**Changes Applied:**
1. **Removed:** User store imports and references
2. **Removed/Modified:** Calculator launch buttons and election cards
3. **Added:** Prominent "archive notice" section with:
   - Archive title with years
   - Description of archived elections
   - CTA button linking to current site
   - Archive status message
4. **Modified:** Hero section headline to include "Archiv/Archív/Archívum"
5. **Changed:** "O kalkulačce" button from `router.push()` to `<a href>` (where kept)

**Structure of Archive Notice:**
```vue
<section class="current-version-hero">
  <CardComponent style="max-width: 48rem; text-align: center;">
    <HeadlineText>Nová [Brand] je tady/tu!</HeadlineText>
    <BodyText>
      Toto je archiv... <strong>Aktuální kalkulačku najdete na
      <a href="https://www.[main]">www.[main]</a></strong>
    </BodyText>
    <ButtonComponent href="https://www.[main]">
      Přejít na aktuální [Brand]
    </ButtonComponent>
    <BodyText size="small" color="fg-muted">
      Na této archivní stránce najdete kalkulačky pro [elections]
    </BodyText>
  </CardComponent>
</section>
```

**Lines Changed:** 59-748 lines (varies significantly by branch)
- **main:** 59 lines (moderate changes)
- **volebni-kalkulacka:** Moderate changes
- **volebna-kalkulacka-archiv:** 251 lines (major redesign)
- **voksmonitor-archive:** 748 lines (most extensive redesign)

---

#### **7. `frontend/src/components/FooterMultiWord.vue`**

**Purpose:** Footer component with links

**Changes Applied:**
- Changed from `<router-link>` to `<a>` tags for:
  - `/o-nas` (About Us)
  - `/metodika-tvorby-otazek` or `/metodika-tvorby-otazok` (Methodology)
  - `/ochrana-dat` (Data Protection)
  - `/archiv` (Archive link - in some branches)

**Why:** Ensures clicks trigger server-side redirects (configured in `vercel.json`) to main site instead of client-side routing

**Example:**
```vue
<!-- Before -->
<router-link to="/o-nas">
  <BodyText>O volební kalkulačce</BodyText>
</router-link>

<!-- After -->
<a href="/o-nas">
  <BodyText>O volební kalkulačce</BodyText>
</a>
```

**Lines Changed:** 8-16 lines per branch

**Additional Changes (volebni-kalkulacka):**
- Also added footnote about archive in footer (3 lines added)

---

#### **8. `frontend/vercel-build.sh`**

**Purpose:** Vercel build script

**Changes Applied:**
- **Removed:** All Prisma commands (`prisma generate`, `prisma migrate deploy`, `prisma migrate reset`)
- **Removed:** Database URL environment variable manipulation
- **Removed:** Staging and preview branch database logic
- **Simplified:** Build to just `npm run build-only` + data copy

**Before:** 15 lines with complex logic
**After:** 9 lines with simple if/else

**Lines Changed:** 10 lines removed, 4 lines added

---

#### **9. `frontend/src/components/design-system/navigation/NavigationBar.vue`**

**Purpose:** Top navigation bar

**Changes Applied:**
- **Removed:** `with-account` prop
- **Removed:** `:user="user"` binding
- **Removed:** Profile/account UI elements (44-47 lines)

**Example:**
```vue
<!-- Before -->
<NavigationBar transparent with-account :user="user" />

<!-- After -->
<NavigationBar transparent />
```

---

#### **10. `frontend/src/routes/result/ResultPage.vue`**

**Purpose:** Calculator results page

**Changes Applied:**
- **Removed:** Share modal integration (111-179 lines)
- **Removed:** Profile/save result functionality
- **Removed:** Social media sharing features

**Impact:** Results page becomes view-only, no save/share capabilities

---

## Refactoring Impact Summary

### **Code Reduction**

| Branch | Lines Deleted | Major Files Removed | Components Simplified |
|--------|---------------|---------------------|----------------------|
| main (CZ 2022–2023) | ~2,880 | 34 | 6 |
| volebni-kalkulacka (CZ 2024) | ~755 | 11 | 3 |
| volebna-kalkulacka-archiv (SK) | ~3,071 | 32 | 7 |
| voksmonitor-archive (HU) | ~2,998 | 32 | 7 |

### **Functionality Removed**

✅ **Fully Removed:**
- User authentication (OAuth, email)
- User profiles and settings
- Answer persistence to database
- Result sharing (social media, direct links)
- Embedding save functionality
- Subscription management
- Election progress tracking per user
- All API endpoints
- Database migrations and connections
- Email notifications

✅ **Redirected to Main Site:**
- About Us page
- Methodology page
- Data protection/privacy policy page
- (Archive page in some branches)

✅ **Retained:**
- Calculator functionality (client-side only)
- Result calculation and display
- Comparison functionality
- Question flow
- District selection
- Static data from `/data` directory
- All design system components
- Internationalization (i18n)

### **New Features Added**

✨ **Archive-Specific:**
- Prominent archive notice on homepage
- Direct links to current calculator site
- Archive year indicators in all titles
- Updated branding to prevent confusion
- Server-side redirects for static pages
- Simplified, static-only deployment

---

## Chronological Refactoring Timeline

### **Phase 1: Database Removal** (First Commit)

All branches started with complete database infrastructure removal:
- Delete all API routes
- Delete all server-side code (Prisma, auth, mailing)
- Delete profile pages and components
- Delete share functionality
- Remove user/election stores
- Strip authentication from navigation and pages

**Commits:**
- main: `41d3469` (2,880 lines removed)
- volebna-kalkulacka-archiv: `5167ae4` (3,071 lines removed)
- voksmonitor-archive: `c31914a` (2,998 lines removed)

### **Phase 2: Build Simplification** (Separate Commit)

Update build scripts to remove Prisma:
- Simplify `vercel-build.sh`
- Remove all database migration steps
- Remove preview environment database logic

**Commits:**
- main: `e17c826`
- volebni-kalkulacka: `bce9883`
- volebna-kalkulacka-archiv: `60369c4`
- voksmonitor-archive: `75b6ccd`

### **Phase 3: Static Page Redirects** (After Build)

Remove static pages and set up redirects:
- Delete AboutUsPage, DataProtectionPage, MethodologyPage
- Add redirect rules to `vercel.json`
- Update footer links from router-link to href

**Commits:**
- main: `8cdde80` (Fix redirected links)
- volebni-kalkulacka: `79f2ed6` (included in main refactor)
- volebna-kalkulacka-archiv: `56d4cd8` (Redirect static pages)
- voksmonitor-archive: `590d763` (Redirect static pages)

### **Phase 4: SPA Rewrite** (Critical Fix)

Add back SPA routing functionality:
- Add catch-all rewrite to `vercel.json`

**Commits:**
- main: `c9de572`
- volebna-kalkulacka-archiv: `7664edd`
- (Not separate commit in volebni-kalkulacka or voksmonitor-archive)

### **Phase 5: Branding & URLs** (Multiple Commits)

Update all branding to archive:
- Update `.env.production` domain
- Update `index.html` meta tags
- Update logo component
- Update route titles

**Commits:**
- main: `cebbc66` (initial title), `6053fe1` (final branding)
- volebna-kalkulacka-archiv: `9bb7d45` (title), `a3849b7` (description), `f350123` (swap www), `aeac269` (route titles)
- voksmonitor-archive: `4da0c36` (title + description + logo), `20b27ac` (swap www), `7cf20b6` (route titles)

### **Phase 6: Homepage Redesign** (Near End)

Major homepage overhaul:
- Add archive notice
- Simplify election cards
- Add CTA to current site

**Commits:**
- main: `1084961` (Update home)
- volebni-kalkulacka: `79f2ed6` (Update archive 2024)
- volebna-kalkulacka-archiv: `5165abc` (Update homepage)
- voksmonitor-archive: `5510901` (Update homepage)

### **Phase 7: Final Fixes** (Last Commits)

Minor corrections and polish:
- README updates
- Additional branding tweaks
- Final redirect fixes

**Commits:**
- main: `df713fb` (Few more fixes - merged to main)
- volebni-kalkulacka: `f5d6dda` (Few more fixes)

---

## Refactoring Best Practices Observed

### ✅ **Consistent Patterns**

1. **Database removal first** - Complete backend elimination in single commit
2. **Build simplification next** - Separate commit for build script changes
3. **Gradual branding** - Multiple small commits for titles, descriptions, URLs
4. **SPA rewrite critical** - Must be added after static page redirects
5. **Homepage last** - Major redesign after infrastructure changes complete

### ✅ **Locale Handling**

- Maintained locale-specific environment variables
- Preserved i18n functionality
- Used locale-appropriate archive terms (Archiv/Archív/Archívum)
- Kept locale-specific OG images

### ✅ **User Experience**

- Clear archive notices on homepage
- Prominent links to current site
- Maintained calculator functionality
- Removed confusing features (save, share, profile)
- Updated all titles and meta tags to prevent confusion

### ✅ **Technical Stability**

- Removed all database dependencies
- Simplified build process
- Static-only deployment (no server-side rendering)
- Maintained client-side routing
- Preserved data directory structure

### ⚠️ **Inconsistencies Noted**

1. **volebni-kalkulacka kept archive page** - Others deleted it
2. **Logo updates varied** - Not all branches updated LogoComponent
3. **Commit granularity differed** - CZ 2022 was more aggressive, SK/HU more gradual
4. **Archive URL schemes differ** - `archiv` vs `archiv-2024` vs `archivum`

---

## Recommendations for Future Archives

Based on this analysis, here's the recommended refactoring sequence:

### **Step 1: Database Removal** (Single Commit)
- Delete all API routes (`frontend/api/`)
- Delete all server code (`frontend/src/server/`)
- Delete profile routes and pages (`frontend/src/routes/profile/`)
- Delete share pages (`frontend/src/routes/share/`)
- Remove user/election stores (`frontend/src/stores/`)
- Strip authentication from components (NavigationBar, ElectionCard, etc.)
- Remove share/save from ResultPage
- Remove user references from IndexPage
- Delete `restApi.ts` and `share.ts` utilities
- Remove profile/auth routes from `main.ts`

**Expected:** ~2,800-3,100 lines deleted

### **Step 2: Build Simplification** (Single Commit)
- Edit `frontend/vercel-build.sh`
- Remove all Prisma commands
- Remove database URL logic
- Simplify to: `npm run build-only && cp -r ../data ./dist/`

**Expected:** ~10 lines changed

### **Step 3: Static Page Redirects** (Single Commit)
- Delete `AboutUsPage.vue`, `DataProtectionPage.vue`, `QuestionsMethodologyPageVue.vue` and their markdown files
- Add redirects to `vercel.json` for `/o-nas`, `/metodika...`, `/ochrana-dat`
- Update `FooterMultiWord.vue` to change `<router-link>` → `<a href>`
- Remove static page routes from `main.ts`

**Expected:** ~700-750 lines deleted

### **Step 4: SPA Rewrite** (Single Commit)
- Add rewrite rule to `vercel.json`: `{"source": "/(.*)", "destination": "/"}`

**Expected:** 6 lines added

### **Step 5: Domain Update** (Single Commit)
- Update `frontend/.env.production` with archive subdomain
- Update all URLs in `frontend/index.html` (og:url, og:image, twitter:image)

**Expected:** 8-10 lines changed

### **Step 6: Branding Update** (Single or Multiple Commits)
- Update `<title>` in `index.html` to include "archiv [years]"
- Update `og:title` and `og:description` in `index.html`
- Update logo text in `LogoComponent.vue`
- Update all route titles in `main.ts` to include archive designation

**Expected:** 20-25 lines changed

### **Step 7: Homepage Redesign** (Single Commit)
- Add archive notice section to `IndexPage.vue`
- Simplify or remove calculator launch buttons
- Add prominent CTA to current site
- Update hero headline to include "Archiv"

**Expected:** 50-750 lines changed (varies based on complexity)

### **Step 8: Final Review** (Single Commit if needed)
- README updates
- Additional minor fixes
- Verification of all redirects and links

---

## Conclusion

The archive refactoring demonstrates a **consistent, well-structured pattern** applied across multiple locales and calculator instances. The key insight is the **complete elimination of backend infrastructure** while **preserving core calculator functionality** through static deployment.

### **Core Principles:**

1. **Remove, don't disable** - Delete unused code entirely rather than commenting or feature-flagging
2. **Redirect, don't duplicate** - Point static pages to main site instead of maintaining copies
3. **Simplify, don't complicate** - Streamline build process to match new static architecture
4. **Clarify, don't confuse** - Update all branding to clearly indicate archive status

### **Result:**

Each archive branch achieves:
- ✅ **~70-80% code reduction** in modified areas
- ✅ **Zero database dependencies**
- ✅ **Static-only deployment** (faster, cheaper, more reliable)
- ✅ **Clear user communication** about archive status
- ✅ **Maintained calculator functionality** for historical reference
- ✅ **Proper SEO** with updated meta tags

This refactoring pattern can serve as a **template for future archive migrations** across the kalkulacka-one project family.
