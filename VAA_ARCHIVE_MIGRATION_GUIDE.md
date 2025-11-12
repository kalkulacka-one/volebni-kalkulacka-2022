# VAA Archive Migration Guide

**Purpose:** This guide provides a complete, step-by-step process for converting any active Voter Advice Application (VAA) instance into a static archive version.

**Based on:** Successful archive migrations of Volební kalkulačka (CZ 2022–2023, 2024), Volebná kalkulačka (SK 2023–2024), and Voksmonitor (HU 2024).

---

## Table of Contents

1. [Pre-Migration Checklist](#pre-migration-checklist)
2. [Migration Overview](#migration-overview)
3. [Step-by-Step Instructions](#step-by-step-instructions)
4. [Configuration Reference](#configuration-reference)
5. [Verification Checklist](#verification-checklist)
6. [Rollback Procedure](#rollback-procedure)
7. [Common Issues & Solutions](#common-issues--solutions)

---

## Pre-Migration Checklist

Before starting the archive migration, ensure you have:

### **1. Information Gathering**

Collect the following information about your VAA instance:

| Item | Example | Your Value |
|------|---------|------------|
| **Current branch name** | `volebni-kalkulacka` | _____________ |
| **Current production URL** | `www.volebnikalkulacka.cz` | _____________ |
| **Archive subdomain** | `archiv.volebnikalkulacka.cz` OR `archiv-2024.volebnikalkulacka.cz` | _____________ |
| **New VAA URL** (where users should go) | `www.volebnikalkulacka.cz` | _____________ |
| **Election years covered** | `2022–2023` | _____________ |
| **Election types covered** | `Prezidentské, komunální, senátní` | _____________ |
| **Locale code** | `cs` / `sk` / `hu` / etc. | _____________ |
| **Archive term** | `Archiv` (CS) / `Archív` (SK) / `Archívum` (HU) | _____________ |
| **Brand name** | `Volební kalkulačka` | _____________ |

### **2. Branch Strategy Decision**

Choose one:

- **Option A: Archive on current branch** (e.g., `volebni-kalkulacka` becomes archive)
  - ✅ Simpler, fewer branches to manage
  - ⚠️ Current production becomes archive immediately upon deploy

- **Option B: Create new archive branch** (e.g., `volebni-kalkulacka-archive-2024`)
  - ✅ Preserves current branch as-is for reference
  - ✅ Can deploy archive separately
  - ⚠️ More branches to manage

**Recommendation:** Use Option A if this is the final state of this instance. Use Option B if you might need to revert or maintain both versions temporarily.

### **3. Vercel/Deployment Setup**

Ensure you have:
- [ ] Access to Vercel project for this VAA instance
- [ ] DNS access to create archive subdomain
- [ ] Ability to update environment variables in Vercel
- [ ] Backup of current production deployment

### **4. Communication Plan**

Prepare:
- [ ] User communication about archive (email, social media, etc.)
- [ ] Timeline for migration (when will current site become archive?)
- [ ] Rollback plan if issues occur

---

## Migration Overview

The archive migration follows this sequence:

```
┌─────────────────────────────────────────────────────────────┐
│ Phase 1: INFRASTRUCTURE REMOVAL                              │
│ • Remove database (API, Prisma, auth, profiles, sharing)    │
│ • Delete user-dependent features                            │
│ Expected time: 30-60 minutes                                 │
│ Lines removed: ~2,800-3,100                                  │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│ Phase 2: BUILD SIMPLIFICATION                                │
│ • Update vercel-build.sh to remove Prisma                   │
│ • Simplify to static-only build                             │
│ Expected time: 10 minutes                                    │
│ Lines changed: ~10                                           │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│ Phase 3: STATIC PAGE REDIRECTS                               │
│ • Delete About/Methodology/Privacy pages                    │
│ • Add redirects to new VAA site                             │
│ • Update footer links                                        │
│ Expected time: 20 minutes                                    │
│ Lines removed: ~700-750                                      │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│ Phase 4: SPA ROUTING CONFIGURATION                           │
│ • Add catch-all rewrite for client-side routing             │
│ Expected time: 5 minutes                                     │
│ Lines added: 6                                               │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│ Phase 5: DOMAIN & BRANDING UPDATE                            │
│ • Update .env.production with archive subdomain             │
│ • Update all meta tags and titles                           │
│ • Update logo and route titles                              │
│ Expected time: 30 minutes                                    │
│ Lines changed: ~20-30                                        │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│ Phase 6: HOMEPAGE REDESIGN                                   │
│ • Add archive notice section                                │
│ • Add CTA to new VAA site                                   │
│ • Simplify calculator selection                             │
│ Expected time: 45-90 minutes                                 │
│ Lines changed: 50-750 (varies by complexity)                 │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│ Phase 7: VERIFICATION & DEPLOYMENT                           │
│ • Test locally                                               │
│ • Deploy to preview                                          │
│ • Verify all functionality                                   │
│ • Deploy to production                                       │
│ Expected time: 30-60 minutes                                 │
└─────────────────────────────────────────────────────────────┘

Total estimated time: 3-5 hours
```

---

## Step-by-Step Instructions

### **Phase 1: Infrastructure Removal**

**Goal:** Remove all database and user authentication infrastructure.

#### **Step 1.1: Create Archive Branch (if using Option B)**

```bash
# From your current VAA branch
git checkout volebni-kalkulacka  # Replace with your branch name
git pull origin volebni-kalkulacka
git checkout -b volebni-kalkulacka-archive-2024  # Replace with your archive branch name
```

#### **Step 1.2: Delete API Routes**

Delete the entire `frontend/api/` directory:

```bash
cd frontend
rm -rf api/
```

**Files to be deleted:**
- `api/answers/[id].ts`
- `api/answers/index.ts`
- `api/auth/index.ts`
- `api/subscriptions/index.ts`
- `api/users/me.ts`

#### **Step 1.3: Delete Server Code**

Delete server-side utilities:

```bash
cd frontend/src
rm -rf server/
rm common/restApi.ts
rm common/share.ts
```

**Files to be deleted:**
- `server/answers.ts`
- `server/auth.ts`
- `server/errors.ts`
- `server/prisma.ts`
- `server/mailing.ts` (if exists)

#### **Step 1.4: Delete Profile & Authentication Pages**

Delete the entire profile directory:

```bash
cd frontend/src/routes
rm -rf profile/
rm -rf share/
```

**Files to be deleted:**
- `profile/ProfilePage.vue`
- `profile/ProfileSettingsPage.vue`
- `profile/AuthPageVue.vue`
- `profile/EmailAuthPageVue.vue`
- `profile/EmailFormPageVue.vue`
- `profile/ProfileCardComponent.vue`
- `profile/ElectionCardWrapperComponent.vue`
- `profile/SocialMediaConnectComponent.vue`
- `share/SharePage.vue`

#### **Step 1.5: Delete Result Share Modal**

```bash
cd frontend/src/routes/result
rm ResultShareModal.vue
```

#### **Step 1.6: Delete User Stores**

```bash
cd frontend/src/stores
rm userStore.ts
rm electionStore.ts  # If it only handles user-election relationships
```

#### **Step 1.7: Remove User/Auth from Components**

Edit the following files to remove user/authentication references:

**File: `frontend/src/components/design-system/navigation/NavigationBar.vue`**

Remove:
- `with-account` prop
- `:user` binding
- All profile/account UI elements (~44-47 lines)

**File: `frontend/src/components/containers/ElectionCardComponent.vue`**

Remove:
- Profile/save functionality
- User-specific display logic (~16-22 lines)

**File: `frontend/src/components/utilities/embedding/WebProvider.vue`**

Remove:
- Embedding save functionality (~5 lines)

**File: `frontend/src/routes/result/ResultPage.vue`**

Remove:
- Import of `ResultShareModal`
- Share modal integration
- Profile integration
- Social media sharing features (~111-179 lines depending on branch)

**File: `frontend/src/routes/index/IndexPage.vue`**

Remove:
- Import of `useUserStore`
- `userStore` constant
- `user` computed property
- User references in template (~84-86 lines)
- Remove `with-account :user="user"` from NavigationBar component

#### **Step 1.8: Remove Routes from main.ts**

Edit `frontend/src/main.ts`:

Remove the following route definitions:
- Profile routes (all variations)
- Share routes
- Authentication routes

**Example of routes to remove:**
```typescript
profile: {
  name: 'profile',
  path: '/profil',
  component: ProfilePageVue,
  // ...
},
auth: {
  name: 'auth',
  path: '/prihlaseni',
  component: AuthPageVue,
  // ...
},
// etc.
```

**Lines to remove:** ~27-80 lines (varies by instance)

#### **Step 1.9: Commit Phase 1**

```bash
git add -A
git commit -m "Remove database infrastructure and user authentication

- Delete all API routes (api/)
- Delete server-side code (server/, restApi.ts, share.ts)
- Delete profile and share pages
- Remove user/election stores
- Strip authentication from NavigationBar, ElectionCard, ResultPage
- Remove profile/auth routes from main.ts

This converts the VAA to a static-only archive without database dependencies.

~2,800-3,100 lines removed"
```

---

### **Phase 2: Build Simplification**

**Goal:** Remove Prisma and database from build process.

#### **Step 2.1: Edit vercel-build.sh**

Edit `frontend/vercel-build.sh`:

**Replace this:**
```bash
#!/bin/bash

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

**With this:**
```bash
#!/bin/bash

if [[ $VERCEL_ENV == "production" ]]; then
  echo "Building for production environment"
  npm run build-only && cp -r ../data ./dist/
else
  echo "Building for preview environment"
  npm run build-only:preview && cp -r ../data ./dist/
fi
```

#### **Step 2.2: Commit Phase 2**

```bash
git add frontend/vercel-build.sh
git commit -m "Update Vercel build command to work without database

- Remove all Prisma commands (generate, migrate, reset)
- Remove database URL environment variable logic
- Simplify to static-only build process

Build script reduced from 15 lines to 9 lines."
```

---

### **Phase 3: Static Page Redirects**

**Goal:** Remove static pages and redirect users to the new VAA site.

#### **Step 3.1: Delete Static Pages**

```bash
cd frontend/src/routes

# Delete About Us page
rm -rf about-us/

# Delete Data Protection page
rm -rf data-protection/

# Delete Methodology page
rm -rf questions-methodology/

# Optional: Delete archive page if you want to redirect it too
# rm -rf archive/
```

**Files deleted:**
- `about-us/AboutUsPage.vue`
- `data-protection/DataProtectionPage.vue`
- `data-protection/PrivacyPolicy.md`
- `questions-methodology/QuestionsMethodologyPageVue.vue`
- `questions-methodology/QuestionsMethodologyText.md`

#### **Step 3.2: Remove Routes from main.ts**

Edit `frontend/src/main.ts` and remove route definitions for:
- About Us (`/o-nas`, `/a-voksmonitorrol`, etc.)
- Methodology (`/metodika-tvorby-otazek`, `/metodika-tvorby-otazok`, `/kerdesek-modszertana`, etc.)
- Data Protection (`/ochrana-dat`, `/adatvedelem`, etc.)
- Archive (if deleting)

#### **Step 3.3: Add Redirects to vercel.json**

Edit `frontend/vercel.json` and add redirects (adjust paths and destinations for your locale):

**For Czech (CZ):**
```json
{
  "redirects": [
    {
      "source": "/o-nas",
      "destination": "https://www.volebnikalkulacka.cz/o-nas",
      "permanent": true
    },
    {
      "source": "/metodika-tvorby-otazek",
      "destination": "https://www.volebnikalkulacka.cz/metodika",
      "permanent": true
    },
    {
      "source": "/ochrana-dat",
      "destination": "https://www.volebnikalkulacka.cz/soukromi",
      "permanent": true
    }
  ],
  "trailingSlash": false
}
```

**For Slovak (SK):**
```json
{
  "redirects": [
    {
      "source": "/o-nas",
      "destination": "https://www.volebnakalkulacka.sk/o-nas",
      "permanent": true
    },
    {
      "source": "/metodika-tvorby-otazok",
      "destination": "https://www.volebnakalkulacka.sk/metodika",
      "permanent": true
    },
    {
      "source": "/ochrana-dat",
      "destination": "https://www.volebnakalkulacka.sk/sukromie",
      "permanent": true
    }
  ],
  "trailingSlash": false
}
```

**For Hungarian (HU):**
```json
{
  "redirects": [
    {
      "source": "/a-voksmonitorrol",
      "destination": "https://www.voksmonitor.hu/rolunk",
      "permanent": true
    },
    {
      "source": "/kerdesek-modszertana",
      "destination": "https://www.voksmonitor.hu/modszertanunk",
      "permanent": true
    },
    {
      "source": "/adatvedelem",
      "destination": "https://www.voksmonitor.hu/adatvedelem",
      "permanent": true
    }
  ],
  "trailingSlash": false
}
```

**Optional:** If you have an existing 2024 archive and want to redirect `/archiv` to it:
```json
{
  "source": "/archiv",
  "destination": "https://archiv-2024.volebnikalkulacka.cz/archiv",
  "permanent": true
}
```

#### **Step 3.4: Update Footer Links**

Edit `frontend/src/components/FooterMultiWord.vue`:

Change from `<router-link>` to `<a>` for static page links:

**Before:**
```vue
<router-link to="/o-nas">
  <BodyText size="small">O volební kalkulačce</BodyText>
</router-link>
<router-link to="/metodika-tvorby-otazek">
  <BodyText size="small">Metodika tvorby otázek</BodyText>
</router-link>
<router-link to="/ochrana-dat">
  <BodyText size="small">Ochrana dat</BodyText>
</router-link>
```

**After:**
```vue
<a href="/o-nas">
  <BodyText size="small">O volební kalkulačce</BodyText>
</a>
<a href="/metodika-tvorby-otazek">
  <BodyText size="small">Metodika tvorby otázek</BodyText>
</a>
<a href="/ochrana-dat">
  <BodyText size="small">Ochrana dat</BodyText>
</a>
```

**Why:** Using `<a>` instead of `<router-link>` ensures clicks trigger server-side redirects (configured in `vercel.json`) instead of client-side routing.

#### **Step 3.5: Commit Phase 3**

```bash
git add -A
git commit -m "Redirect static pages to main VAA site

- Delete About Us, Methodology, and Data Protection pages
- Add permanent redirects in vercel.json to new VAA site
- Update footer links from router-link to href
- Remove static page routes from main.ts

~700-750 lines removed
Redirects ensure users find current information on the new site."
```

---

### **Phase 4: SPA Routing Configuration**

**Goal:** Enable client-side routing for the archive SPA.

#### **Step 4.1: Add SPA Rewrite Rule**

Edit `frontend/vercel.json` and add a `rewrites` array **at the top** (before `redirects`):

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/"
    }
  ],
  "redirects": [
    // ... existing redirects
  ],
  "trailingSlash": false
}
```

**Important:** The `rewrites` array must come **before** `redirects` in the JSON structure. Vercel processes rewrites first, then redirects.

**What this does:** All routes that don't match static files or redirects will serve `index.html`, allowing Vue Router to handle navigation client-side.

#### **Step 4.2: Commit Phase 4**

```bash
git add frontend/vercel.json
git commit -m "Bring back rewrite for SPA

Add catch-all rewrite rule to enable client-side routing.
This ensures Vue Router can handle all calculator routes."
```

---

### **Phase 5: Domain & Branding Update**

**Goal:** Update all URLs and branding to reflect archive status.

#### **Step 5.1: Update .env.production**

Edit `frontend/.env.production`:

**Before:**
```bash
PUBLIC_URL=https://www.volebnikalkulacka.cz
VITE_PUBLIC_URL=${PUBLIC_URL}

# If locale-specific:
VITE_DEFAULT_LOCALE=cs
VITE_FALLBACK_LOCALE=cs
```

**After:**
```bash
PUBLIC_URL=https://archiv.volebnikalkulacka.cz
# OR for year-specific: https://archiv-2024.volebnikalkulacka.cz
# OR for SK: https://archiv.volebnakalkulacka.sk
# OR for HU: https://archivum.voksmonitor.hu

VITE_PUBLIC_URL=${PUBLIC_URL}

# Keep locale settings unchanged
VITE_DEFAULT_LOCALE=cs
VITE_FALLBACK_LOCALE=cs
```

**Archive subdomain naming conventions:**
- **Czech (CZ):** `archiv` or `archiv-YYYY`
- **Slovak (SK):** `archiv`
- **Hungarian (HU):** `archivum`

#### **Step 5.2: Update index.html Meta Tags**

Edit `frontend/index.html`:

Update the following meta tags:

1. **Page title:**
```html
<!-- Before -->
<title>Volební kalkulačka</title>

<!-- After -->
<title>Volební kalkulačka archiv 2022–2023</title>
<!-- OR for SK: Volebná kalkulačka Archív 2023–2024 -->
<!-- OR for HU: Voksmonitor Archívum 2024 -->
```

2. **OG URL:**
```html
<meta property="og:url" content="https://archiv.volebnikalkulacka.cz" />
```

3. **OG Title:**
```html
<meta property="og:title" content="Volební kalkulačka archiv 2022–2023" />
```

4. **OG Description:**
```html
<meta
  property="og:description"
  content="Archiv Volební kalkulačky pro prezidentské volby 2023, komunální a senátní volby 2022. Aktuální kalkulačku najdete na www.volebnikalkulacka.cz"
/>
```

**Template for description:**
```
Archiv [Brand Name] [election types and years]. Aktuální kalkulačku najdete na [new VAA URL]
```

5. **OG Images:**
```html
<meta
  property="og:image"
  content="https://archiv.volebnikalkulacka.cz/images/og-image-2023.png"
/>
<meta
  property="og:image:secure_url"
  content="https://archiv.volebnikalkulacka.cz/images/og-image-2023.png"
/>
```

6. **Twitter Title & Description:**
```html
<meta name="twitter:title" content="Volební kalkulačka archiv 2022–2023" />
<meta
  name="twitter:description"
  content="Archiv Volební kalkulačky pro prezidentské volby 2023, komunální a senátní volby 2022. Aktuální kalkulačku najdete na www.volebnikalkulacka.cz"
/>
```

7. **Twitter Image:**
```html
<meta
  name="twitter:image"
  content="https://archiv.volebnikalkulacka.cz/images/og-image-2023.png"
/>
```

**Summary:** Update 8-10 meta tag `content` attributes with archive domain and archive-specific messaging.

#### **Step 5.3: Update Logo Component**

Edit `frontend/src/components/design-system/style/LogoComponent.vue`:

Find the logo text section and update it:

**Before:**
```vue
<div class="logo--text">
  Volební kalkulačka
</div>
```

**After:**
```vue
<div class="logo--text">
  Volební kalkulačka archiv 2022–2023
</div>
<!-- OR for SK: Volebná kalkulačka Archív 2023–2024 -->
<!-- OR for HU: Voksmonitor Archívum -->
```

#### **Step 5.4: Update Route Titles in main.ts**

Edit `frontend/src/main.ts` and update all route `meta.title` fields:

**Find and replace pattern:**
- Find: `title: 'Volební kalkulačka'`
- Replace: `title: 'Volební kalkulačka archiv 2022–2023'`

**Routes to update:**
- Index/home route
- Error route
- District selection route
- Guide route
- Question route (use `$$` placeholder for number)
- Recap route
- Result route
- Comparison route

**Example:**
```typescript
{
  name: 'index',
  path: '/',
  component: IndexPageVue,
  meta: {
    title: 'Volební kalkulačka archiv 2022–2023',
  },
},
{
  name: 'question',
  path: '/volby/:election/:district/otazka/:nr?',
  component: QuestionPageVue,
  meta: {
    title: 'Otázka $$ - Volební kalkulačka archiv 2022–2023',
    hasNumber: true,
  },
},
```

**Lines to update:** ~14-16 route title strings

#### **Step 5.5: Commit Phase 5**

You can commit this in one or multiple commits:

**Option A: Single commit**
```bash
git add frontend/.env.production frontend/index.html frontend/src/components/design-system/style/LogoComponent.vue frontend/src/main.ts
git commit -m "Update archive branding and domain

- Update .env.production URL to archiv.volebnikalkulacka.cz
- Update all meta tags in index.html with archive branding
- Update LogoComponent to show 'Volební kalkulačka archiv 2022–2023'
- Update all route titles in main.ts to include archive designation

This ensures users understand they are viewing archived content."
```

**Option B: Multiple granular commits (recommended if following SK/HU pattern)**
```bash
# Commit 1: Update domain
git add frontend/.env.production frontend/index.html
git commit -m "Swap www with archiv subdomain

Update production URL and all index.html references to use archiv.volebnikalkulacka.cz"

# Commit 2: Update title and description
git add frontend/index.html frontend/src/components/design-system/style/LogoComponent.vue frontend/src/main.ts
git commit -m "Update title and description for archive

- Update page title to 'Volební kalkulačka archiv 2022–2023'
- Update meta descriptions to mention archive status and new site
- Update logo component text
- Update main route title (index page)"

# Commit 3: Update all route titles
git add frontend/src/main.ts
git commit -m "Update all route titles to include Archiv

Applied to all routes: guide, question, recap, result, comparison, error, etc."
```

---

### **Phase 6: Homepage Redesign**

**Goal:** Add prominent archive notice and link to new VAA site.

#### **Step 6.1: Design Archive Notice Section**

Edit `frontend/src/routes/index/IndexPage.vue`:

Add this section **prominently** at the top of your homepage (inside the hero section or immediately after):

```vue
<section class="current-version-hero">
  <StackComponent spacing="medium" centered>
    <CardComponent style="max-width: 48rem; text-align: center;">
      <StackComponent spacing="medium" centered>
        <HeadlineText tag="h1" size="medium" color="fg-strong">
          Nová Volební kalkulačka je tady!
          <!-- SK: Nová Volebná kalkulačka je tu! -->
          <!-- HU: Új Voksmonitor elérhető! -->
        </HeadlineText>

        <BodyText size="medium" centered>
          Toto je archiv kalkulaček z let <strong>2022–2023</strong>.
          Aktuální kalkulačku najdete na
          <a href="https://www.volebnikalkulacka.cz" target="_blank" rel="noopener noreferrer">
            <strong>www.volebnikalkulacka.cz</strong>
          </a>
          <!-- Adjust years, URL, and text for your locale -->
        </BodyText>

        <ButtonComponent
          kind="filled"
          color="primary"
          size="medium"
          tag="a"
          href="https://www.volebnikalkulacka.cz"
          target="_blank"
          rel="noopener noreferrer"
        >
          <template #icon>
            <IconComponent :icon="mdiArrowRight" />
          </template>
          Přejít na aktuální Volební kalkulačku
          <!-- SK: Prejsť na aktuálnu Volebná kalkulačku -->
          <!-- HU: Ugrás az aktuális Voksmonitorra -->
        </ButtonComponent>

        <BodyText size="small" color="fg-muted" centered>
          Na této archivní stránce najdete kalkulačky pro prezidentské volby 2023,
          komunální a senátní volby 2022
          <!-- Adjust election description for your instance -->
        </BodyText>
      </StackComponent>
    </CardComponent>
  </StackComponent>
</section>
```

#### **Step 6.2: Update Hero Headline**

Update the main hero headline to emphasize archive status:

**Before:**
```vue
<HeadlineText tag="h1" size="large">
  Volební kalkulačka
</HeadlineText>
```

**After:**
```vue
<StackComponent spacing="large" centered>
  <BodyText size="medium" tag="h1" color="fg-strong">
    <strong>Archiv Volebních kalkulaček z let 2022–2023</strong><br />
    Prezidentské, komunální a senátní volby
  </BodyText>
  <HeadlineText tag="p" size="small">
    Archiv
    <span style="color: rgb(var(--color-neutral-fg))"> 2022–2023 </span>
  </HeadlineText>
</StackComponent>
```

#### **Step 6.3: Simplify Calculator Selection**

Depending on your homepage structure, you may want to:

**Option A: Keep existing election cards as-is** (minimal change)
- Users can still browse and launch archived calculators
- Just add the archive notice at the top

**Option B: Simplify election cards** (moderate change)
- Remove or simplify calculator launch CTAs
- Focus on viewing results only
- De-emphasize archived content

**Option C: Remove calculator launch entirely** (aggressive)
- Only show information about the archive
- Redirect all calculator attempts to new site
- Not recommended unless fully deprecating

**Recommendation:** Use Option A. The archive should remain functional for historical reference.

#### **Step 6.4: Optional - Remove User Store References**

If you haven't already in Phase 1, ensure `IndexPage.vue` has no user store imports:

**Remove:**
```vue
<script setup lang="ts">
import { useUserStore } from '@/stores/userStore';

const userStore = useUserStore();
const user = computed(() => userStore.user);
</script>
```

**Remove from template:**
```vue
<NavigationBar transparent with-account :user="user" />
```

**Replace with:**
```vue
<NavigationBar transparent />
```

#### **Step 6.5: Commit Phase 6**

```bash
git add frontend/src/routes/index/IndexPage.vue
git commit -m "Update homepage with archive notice

- Add prominent archive notice card at top of page
- Include CTA button to current VAA site
- Update hero headline to emphasize 'Archiv 2022–2023'
- Clarify which elections are archived

This ensures users immediately understand they're viewing archived content
and can easily navigate to the current site."
```

---

### **Phase 7: Verification & Deployment**

**Goal:** Test thoroughly before deploying to production.

#### **Step 7.1: Local Testing**

Start the development server:

```bash
cd frontend
npm run dev
```

**Test checklist:**
- [ ] Homepage loads and shows archive notice
- [ ] Archive notice button links to correct new VAA URL
- [ ] Logo shows archive branding
- [ ] Calculator selection works
- [ ] Can start a calculator (guide page loads)
- [ ] Can answer questions
- [ ] Can view results
- [ ] Footer links redirect to new VAA site (should leave archive)
- [ ] No console errors
- [ ] No broken images
- [ ] Page titles show archive designation

#### **Step 7.2: Build Test**

Test the production build locally:

```bash
npm run build-only
npm run preview
```

**Verify:**
- [ ] Build completes without errors
- [ ] No Prisma errors (should not attempt database connection)
- [ ] Preview serves correctly
- [ ] All routes work in preview

#### **Step 7.3: Deploy to Preview Environment**

Push your branch and create a preview deployment:

```bash
git push origin volebni-kalkulacka-archive-2024  # Your branch name
```

Vercel will automatically create a preview deployment. Check the Vercel dashboard for the preview URL.

**Test on preview:**
- [ ] All functionality from local testing works
- [ ] Static redirects work (footer links go to new VAA site)
- [ ] OG meta tags are correct (check with OpenGraph debugger)
- [ ] Performance is good (should be faster without database)
- [ ] Share the preview URL with team for review

#### **Step 7.4: DNS Configuration**

Before deploying to production, configure DNS for the archive subdomain:

**In your DNS provider (e.g., Cloudflare):**

1. Add a CNAME record:
   - **Name:** `archiv` (or `archiv-2024`, `archivum`)
   - **Target:** `cname.vercel-dns.com`
   - **Proxy status:** Proxied (if using Cloudflare)

2. Wait for DNS propagation (can take 5-60 minutes)

3. Verify DNS:
```bash
nslookup archiv.volebnikalkulacka.cz
# Should return Vercel's servers
```

#### **Step 7.5: Vercel Domain Configuration**

In Vercel dashboard for your project:

1. Go to **Settings** → **Domains**
2. Add domain: `archiv.volebnikalkulacka.cz` (your archive subdomain)
3. Assign to branch: `volebni-kalkulacka-archive-2024` (your archive branch)
4. Wait for SSL certificate provisioning (~1-5 minutes)
5. Verify domain is active

#### **Step 7.6: Deploy to Production**

**Option A: If using existing branch (e.g., `volebni-kalkulacka`)**

Merge your changes to the production branch:

```bash
git checkout volebni-kalkulacka
git merge volebni-kalkulacka-archive-2024  # If you created a temporary branch
# OR if you worked directly on volebni-kalkulacka, it's already ready

git push origin volebni-kalkulacka
```

Vercel will automatically deploy to the configured domain.

**Option B: If using new archive branch**

Just push the branch (already done in Step 7.3) and ensure Vercel is configured to deploy it to the archive subdomain.

#### **Step 7.7: Post-Deployment Verification**

Once deployed, thoroughly test the production archive:

**Functional tests:**
- [ ] Visit archive homepage: `https://archiv.volebnikalkulacka.cz`
- [ ] Archive notice displays correctly
- [ ] Click CTA → goes to new VAA site
- [ ] Start a calculator → works
- [ ] Complete calculator flow → works
- [ ] View results → works
- [ ] Footer "About Us" link → redirects to new site
- [ ] Footer "Methodology" link → redirects to new site
- [ ] Footer "Privacy" link → redirects to new site

**SEO/Meta tests:**
- [ ] Page title is correct (check browser tab)
- [ ] Meta description is correct (view source)
- [ ] OG tags are correct (use [OpenGraph debugger](https://www.opengraph.xyz/))
- [ ] Twitter card is correct (use [Twitter Card Validator](https://cards-dev.twitter.com/validator))

**Performance tests:**
- [ ] Page loads quickly (should be faster without database)
- [ ] No JavaScript errors (check console)
- [ ] No 404 errors (check Network tab)
- [ ] Lighthouse score is good (>90)

#### **Step 7.8: Update README**

Edit `README.md` at the root of your repository:

Add a section explaining this is an archive:

```markdown
# Volební kalkulačka archiv 2022–2023

This is an archived version of Volební kalkulačka for elections in 2022–2023.

**Current version:** For the latest Volební kalkulačka, visit [www.volebnikalkulacka.cz](https://www.volebnikalkulacka.cz)

**Archive URL:** [archiv.volebnikalkulacka.cz](https://archiv.volebnikalkulacka.cz)

**Elections covered:**
- Prezidentské volby 2023 (1. a 2. kolo)
- Komunální volby 2022
- Senátní volby 2022

This archive is static-only (no database) and deployed on Vercel.

## About this archive

This branch was converted to a static archive in [Month Year]. Key changes:
- Removed all database and authentication infrastructure
- Removed user profiles, sharing, and saving features
- Redirected informational pages (About, Methodology, Privacy) to main site
- Added prominent notice directing users to current VAA
- Preserved calculator functionality for historical reference

For technical details, see [ARCHIVE_REFACTORING_COMPARISON.md](ARCHIVE_REFACTORING_COMPARISON.md).
```

Commit the README update:

```bash
git add README.md
git commit -m "Update README for archive version"
git push origin volebni-kalkulacka-archive-2024
```

---

## Configuration Reference

### **Locale-Specific Variations**

Use these translations for your locale:

| Element | Czech (CS) | Slovak (SK) | Hungarian (HU) |
|---------|-----------|-------------|----------------|
| **Archive term** | Archiv | Archív | Archívum |
| **Archive subdomain** | `archiv` or `archiv-YYYY` | `archiv` | `archivum` |
| **"New VAA is here!"** | Nová Volební kalkulačka je tady! | Nová Volebná kalkulačka je tu! | Új Voksmonitor elérhető! |
| **"This is an archive..."** | Toto je archiv kalkulaček z let... | Toto je archív kalkulačiek z rokov... | Ez a Voksmonitor archívum... |
| **"Current calculator available at"** | Aktuální kalkulačku najdete na | Aktuálnu kalkulačku nájdete na | Az aktuális Voksmonitor elérhető a |
| **"Go to current VAA"** | Přejít na aktuální Volební kalkulačku | Prejsť na aktuálnu Volebná kalkulačku | Ugrás az aktuális Voksmonitorra |
| **"About Us" path** | `/o-nas` | `/o-nas` | `/a-voksmonitorrol` |
| **"Methodology" path** | `/metodika-tvorby-otazek` | `/metodika-tvorby-otazok` | `/kerdesek-modszertana` |
| **"Privacy" path** | `/ochrana-dat` | `/ochrana-dat` | `/adatvedelem` |

### **URL Mapping Reference**

| Instance | Current Production URL | Archive URL | New VAA URL |
|----------|------------------------|-------------|-------------|
| Volební kalkulačka CZ 2022 | www.volebnikalkulacka.cz | archiv.volebnikalkulacka.cz | www.volebnikalkulacka.cz |
| Volební kalkulačka CZ 2024 | www.volebnikalkulacka.cz | archiv-2024.volebnikalkulacka.cz | www.volebnikalkulacka.cz |
| Volebná kalkulačka SK | www.volebnakalkulacka.sk | archiv.volebnakalkulacka.sk | www.volebnakalkulacka.sk |
| Voksmonitor HU | www.voksmonitor.hu | archivum.voksmonitor.hu | www.voksmonitor.hu |
| Wahlrechner AT | www.wahlrechner.at | archiv.wahlrechner.at | www.wahlrechner.at |
| Kalkulatori Zgjedhor AL | www.kalkulatorizgjedhor.al | arkiv.kalkulatorizgjedhor.al | www.kalkulatorizgjedhor.al |
| Kalkulatori Zgjedhor XK | www.kalkulatorizgjedhor.com | arkiv.kalkulatorizgjedhor.com | www.kalkulatorizgjedhor.com |

### **Files Modified Summary**

| File | Type of Change | Lines Changed |
|------|----------------|---------------|
| `frontend/api/**/*` | Deleted | ~300-400 |
| `frontend/src/server/**/*` | Deleted | ~400-500 |
| `frontend/src/routes/profile/**/*` | Deleted | ~1,200-1,500 |
| `frontend/src/routes/share/**/*` | Deleted | ~150-200 |
| `frontend/src/routes/about-us/**/*` | Deleted | ~300-350 |
| `frontend/src/routes/data-protection/**/*` | Deleted | ~150 |
| `frontend/src/routes/questions-methodology/**/*` | Deleted | ~250 |
| `frontend/src/stores/userStore.ts` | Deleted | ~30 |
| `frontend/src/stores/electionStore.ts` | Deleted | ~80 |
| `frontend/src/common/restApi.ts` | Deleted | ~200 |
| `frontend/src/common/share.ts` | Deleted | ~50 |
| `frontend/vercel-build.sh` | Modified | ~10 |
| `frontend/vercel.json` | Modified | ~20-25 |
| `frontend/.env.production` | Modified | 1-2 |
| `frontend/index.html` | Modified | 8-10 |
| `frontend/src/components/design-system/style/LogoComponent.vue` | Modified | 1 |
| `frontend/src/components/design-system/navigation/NavigationBar.vue` | Modified | ~45 |
| `frontend/src/components/containers/ElectionCardComponent.vue` | Modified | ~20 |
| `frontend/src/components/utilities/embedding/WebProvider.vue` | Modified | ~5 |
| `frontend/src/components/FooterMultiWord.vue` | Modified | 8-16 |
| `frontend/src/routes/result/ResultPage.vue` | Modified | ~110-180 |
| `frontend/src/routes/index/IndexPage.vue` | Modified | 50-750 |
| `frontend/src/main.ts` | Modified | ~100-150 |
| `README.md` | Modified | ~20-30 |

**Total:** ~2,800-3,100 lines removed, ~150-200 lines added/modified

---

## Verification Checklist

Use this checklist to ensure you haven't missed anything:

### **Phase 1: Infrastructure Removal**
- [ ] Deleted `frontend/api/` directory
- [ ] Deleted `frontend/src/server/` directory
- [ ] Deleted `frontend/src/common/restApi.ts`
- [ ] Deleted `frontend/src/common/share.ts`
- [ ] Deleted `frontend/src/routes/profile/` directory
- [ ] Deleted `frontend/src/routes/share/` directory
- [ ] Deleted `frontend/src/routes/result/ResultShareModal.vue`
- [ ] Deleted `frontend/src/stores/userStore.ts`
- [ ] Deleted `frontend/src/stores/electionStore.ts`
- [ ] Removed user/auth from `NavigationBar.vue`
- [ ] Removed save/profile from `ElectionCardComponent.vue`
- [ ] Removed save from `WebProvider.vue`
- [ ] Removed share from `ResultPage.vue`
- [ ] Removed user from `IndexPage.vue`
- [ ] Removed profile/auth routes from `main.ts`

### **Phase 2: Build Simplification**
- [ ] Updated `frontend/vercel-build.sh`
- [ ] Removed all Prisma commands
- [ ] Simplified to static-only build

### **Phase 3: Static Page Redirects**
- [ ] Deleted `frontend/src/routes/about-us/`
- [ ] Deleted `frontend/src/routes/data-protection/`
- [ ] Deleted `frontend/src/routes/questions-methodology/`
- [ ] Added redirects to `vercel.json`
- [ ] Updated footer links from `<router-link>` to `<a href>`
- [ ] Removed static page routes from `main.ts`

### **Phase 4: SPA Routing**
- [ ] Added `rewrites` array to `vercel.json`
- [ ] Added catch-all rewrite rule

### **Phase 5: Domain & Branding**
- [ ] Updated `PUBLIC_URL` in `frontend/.env.production`
- [ ] Updated `<title>` in `frontend/index.html`
- [ ] Updated `og:url` in `frontend/index.html`
- [ ] Updated `og:title` in `frontend/index.html`
- [ ] Updated `og:description` in `frontend/index.html`
- [ ] Updated `og:image` URLs in `frontend/index.html`
- [ ] Updated `twitter:title` in `frontend/index.html`
- [ ] Updated `twitter:description` in `frontend/index.html`
- [ ] Updated `twitter:image` in `frontend/index.html`
- [ ] Updated logo text in `LogoComponent.vue`
- [ ] Updated all route titles in `main.ts`

### **Phase 6: Homepage Redesign**
- [ ] Added archive notice section to `IndexPage.vue`
- [ ] Updated hero headline to include "Archiv"
- [ ] Added CTA button to new VAA site
- [ ] Included description of archived elections

### **Phase 7: Verification & Deployment**
- [ ] Tested locally with `npm run dev`
- [ ] Tested build with `npm run build-only`
- [ ] Tested preview with `npm run preview`
- [ ] Created preview deployment on Vercel
- [ ] Configured DNS for archive subdomain
- [ ] Added domain in Vercel dashboard
- [ ] Deployed to production
- [ ] Verified all functionality works
- [ ] Checked SEO/meta tags
- [ ] Updated README.md

---

## Rollback Procedure

If you need to rollback after deployment:

### **Before Deployment (Git Rollback)**

If you haven't pushed to production yet:

```bash
# Find the commit before your changes
git log --oneline

# Reset to that commit (replace COMMIT_HASH)
git reset --hard COMMIT_HASH

# Force push (only if you haven't shared the branch)
git push --force origin your-branch-name
```

### **After Deployment (Vercel Rollback)**

If already deployed to production:

1. **In Vercel Dashboard:**
   - Go to your project
   - Navigate to "Deployments"
   - Find the last working deployment (before archive changes)
   - Click "..." menu → "Promote to Production"

2. **Revert Git commits:**
```bash
# Create a revert commit
git revert HEAD~7..HEAD  # Adjust number based on how many commits to revert

# Or reset and force push
git reset --hard COMMIT_HASH
git push --force origin your-branch-name
```

3. **Update DNS if needed:**
   - If you changed DNS to point to archive subdomain, revert those changes

---

## Common Issues & Solutions

### **Issue 1: Build Fails with Prisma Error**

**Symptom:** Build fails with error like "Prisma schema not found" or "Cannot connect to database"

**Cause:** Didn't fully remove Prisma from build script

**Solution:**
1. Check `frontend/vercel-build.sh` – ensure NO Prisma commands remain
2. Check `package.json` scripts – ensure build scripts don't call Prisma
3. Delete `prisma/` directory if it exists and isn't needed
4. Clear Vercel build cache: Settings → General → Clear Build Cache

### **Issue 2: Footer Links Don't Redirect**

**Symptom:** Clicking footer "About Us" stays on archive site instead of redirecting

**Cause:** Still using `<router-link>` instead of `<a href>`

**Solution:**
1. Edit `FooterMultiWord.vue`
2. Change `<router-link to="/o-nas">` to `<a href="/o-nas">`
3. Repeat for all static page links

### **Issue 3: Vue Router Not Working (404s on Direct URLs)**

**Symptom:** Direct URLs like `/volby/2023/1-kolo/otazka/1` return 404

**Cause:** Missing SPA rewrite rule

**Solution:**
1. Edit `vercel.json`
2. Ensure `rewrites` array exists with catch-all rule:
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
3. Ensure `rewrites` comes BEFORE `redirects` in JSON

### **Issue 4: Archive Notice Not Showing**

**Symptom:** Homepage loads but doesn't show the archive notice

**Cause:** Didn't add archive notice section to `IndexPage.vue`

**Solution:**
1. Edit `frontend/src/routes/index/IndexPage.vue`
2. Add the `<section class="current-version-hero">` component (see Phase 6)
3. Ensure it's placed prominently (inside hero or immediately after)

### **Issue 5: Wrong Domain in OG Tags**

**Symptom:** Sharing on social media shows wrong URL or old domain

**Cause:** Forgot to update meta tags in `index.html`

**Solution:**
1. Edit `frontend/index.html`
2. Update ALL instances of the old domain to new archive subdomain
3. Clear social media caches:
   - Facebook: [Sharing Debugger](https://developers.facebook.com/tools/debug/)
   - Twitter: [Card Validator](https://cards-dev.twitter.com/validator)

### **Issue 6: Images Not Loading**

**Symptom:** Logo or OG images return 404

**Cause:** Image URLs still point to old domain

**Solution:**
1. Check `frontend/.env.production` – ensure `PUBLIC_URL` is correct
2. Check `index.html` – ensure image URLs use new archive domain
3. Check if images exist in `frontend/public/images/`

### **Issue 7: Locale/Language Issues**

**Symptom:** Wrong language displays or falls back to default

**Cause:** Locale configuration not preserved

**Solution:**
1. Check `frontend/.env.production` – ensure locale settings unchanged:
```bash
VITE_DEFAULT_LOCALE=sk  # Or cs, hu, etc.
VITE_FALLBACK_LOCALE=sk
```
2. Don't modify i18n configuration during archive migration

### **Issue 8: DNS Not Propagating**

**Symptom:** Archive subdomain not resolving after adding DNS record

**Cause:** DNS propagation delay or incorrect configuration

**Solution:**
1. Wait 5-60 minutes for DNS propagation
2. Check DNS with `nslookup archiv.volebnikalkulacka.cz`
3. Ensure CNAME points to `cname.vercel-dns.com`
4. If using Cloudflare, ensure "Proxied" is enabled
5. Clear local DNS cache:
   - Mac: `sudo dscacheutil -flushcache`
   - Windows: `ipconfig /flushdns`

### **Issue 9: Vercel Domain Not Adding**

**Symptom:** Can't add archive subdomain in Vercel dashboard

**Cause:** Domain ownership verification or DNS issue

**Solution:**
1. Ensure DNS CNAME is configured correctly first
2. Wait for DNS propagation
3. Try adding domain again in Vercel
4. If it still fails, check Vercel project settings → ensure correct team/ownership

### **Issue 10: Calculator Functionality Broken**

**Symptom:** Can't complete calculators, data not loading

**Cause:** Accidentally deleted data loading logic or data directory

**Solution:**
1. Ensure `data/` directory exists and is not deleted
2. Check `vercel-build.sh` includes: `cp -r ../data ./dist/`
3. Verify data JSON files are valid
4. Check browser console for data loading errors

---

## Tips for Success

### **1. Test Incrementally**

Don't wait until the end to test. After each phase:
- Run `npm run dev` locally
- Check that nothing is broken
- Commit working changes

### **2. Use Descriptive Commits**

Follow the commit message patterns from the historical migrations:
- Clear, actionable titles
- Bullet points explaining what was changed
- Line count estimates
- Purpose/reasoning

### **3. Keep Static Pages Redirecting**

Don't delete static pages without setting up redirects. Users may have bookmarked `/o-nas` or `/metodika` – ensure they get to the new site, not a 404.

### **4. Preserve Calculator Functionality**

The archive should remain fully functional. Don't break the calculator itself – users should be able to:
- Browse elections
- Answer questions
- View results
- Compare candidates

Only remove features that required a database (save, share, profile).

### **5. Communicate Clearly**

Make it VERY obvious this is an archive:
- Large, prominent notice on homepage
- Clear CTA to new site
- Archive in title, logo, and all meta tags
- Don't bury the information

### **6. Check Social Media Previews**

After deploying, check how the archive looks when shared:
- Test Facebook share: [Sharing Debugger](https://developers.facebook.com/tools/debug/)
- Test Twitter share: [Card Validator](https://cards-dev.twitter.com/validator)
- Ensure title, description, and image are correct

### **7. Monitor After Deployment**

For the first few days after deployment:
- Check analytics for error rates
- Monitor Vercel logs for issues
- Watch for user reports/complaints
- Be ready to hotfix if needed

### **8. Document Everything**

Update README and add notes about:
- What elections are archived
- When it was archived
- Where the current site is
- Technical changes made

Future you (or future developers) will thank you!

---

## Summary

Following this guide, you should be able to convert any VAA instance into a static archive in **3-5 hours** with confidence.

**Key principles:**
1. **Remove, don't disable** – Delete unused code completely
2. **Redirect, don't duplicate** – Point to main site for static content
3. **Simplify, don't complicate** – Static-only architecture
4. **Clarify, don't confuse** – Make archive status obvious

**Expected outcomes:**
- ✅ ~70-80% code reduction
- ✅ Zero database dependencies
- ✅ Faster, cheaper, more reliable deployment
- ✅ Clear user communication
- ✅ Preserved calculator functionality

**Next steps:**
1. Fill out the [Pre-Migration Checklist](#pre-migration-checklist)
2. Follow [Step-by-Step Instructions](#step-by-step-instructions)
3. Complete [Verification Checklist](#verification-checklist)
4. Deploy and monitor

Good luck! 🚀

---

**Questions or issues?** Open an issue on GitHub or consult [ARCHIVE_REFACTORING_COMPARISON.md](ARCHIVE_REFACTORING_COMPARISON.md) for detailed technical analysis.
