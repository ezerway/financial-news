# Task Tracking & Feature Backlog

## Task Legend
- `[x]` Completed
- `[/]` In Progress
- `[ ]` Planned / Backlog

---

## Phase 1: Core Framework & Environment Setup
- [x] Initialize Astro 6.x project with TypeScript support.
- [x] Configure Tailwind CSS v4 (`@tailwindcss/vite` & `@tailwindcss/typography`).
- [x] Set up pnpm package management (`pnpm@11.2.2`).
- [x] Integrate Highcharts library (`highcharts^12.5.0`) for data visualization.
- [x] Configure TypeScript path aliases (`@/*`, `@components/*`, `@layouts/*`, `@libs/*`).

---

## Phase 2: Data Schemas & Content Layer
- [x] Define `databases/schema.ts` domain model interfaces for Gold, Petroleum, and Soccer.
- [x] Configure `src/content.config.ts` Astro collections loader with Zod validation rules:
  - [x] `gold` collection loader (`**/gold/*.json`).
  - [x] `oil` collection loader (`**/oil/*.json`).
  - [x] `soccer` collection loader (`**/soccer/*.json`).
- [x] Implement glob dataset parser for Markdown electricity documents in `src/pages/electric.astro`.

---

## Phase 3: Data Transformers & Utility Libraries
- [x] Create `src/libs/commonTransformer.ts`:
  - [x] `toTableItems()` transformer parsing date/timestamp paths.
  - [x] `filesToItems()` transformer for markdown content files.
  - [x] `toChart()` transformer producing Highcharts categories and multi-series arrays.
- [x] Create `src/libs/soccerTransformer.ts` for sports dataset structuring.

---

## Phase 4: UI Components & Page Layouts
- [x] Develop main layout shell `src/layouts/Layout.astro`:
  - [x] Dynamic navigation navbar mapping collections and markdown pages.
  - [x] Dark mode color palette styling.
  - [x] Mobile responsive drawer with `@tailwindplus/elements` integration.
- [x] Implement reusable UI components:
  - [x] `src/components/Table.astro` (generic data table grid).
  - [x] `src/components/CalendarTable.astro` (calendar date picker & data switcher).
  - [x] `src/components/Chart.astro` (client-side Highcharts wrapper).
  - [x] `src/components/Prose.astro` (Tailwind typography container for markdown).
- [x] Implement route pages:
  - [x] `/` (Dashboard overview with Gold and Oil latest prices).
  - [x] `/gold` (Gold analytics table & interactive Highchart).
  - [x] `/oil` (Oil analytics table & interactive Highchart).
  - [x] `/gas` (Gas price analytics for 12kg and 45kg cylinders).
  - [x] `/electric` (Electricity tariff markdown reader).
  - [x] `/soccer` (Soccer odds grid).

---

## Phase 5: CI/CD & Production Deployment
- [x] Create GitHub Actions workflow `.github/workflows/deploy.yml`:
  - [x] Setup Node 24 and pnpm caching.
  - [x] Frozen lockfile installation and Astro production build.
  - [x] Rsync deployment over SSH to CloudPanel VPS (`htdocs/financial-news.ezerway.com/public`).
- [x] Integrate `@astrojs/sitemap` to generate production sitemap index and routes (`sitemap-index.xml`) with `changefreq: 'daily'`.
- [x] Create dynamic `src/pages/robots.txt.ts` endpoint referencing `sitemap-index.xml`.
- [x] Add `<link rel="sitemap" href="/sitemap-index.xml" />` inside HTML `<head>` in `src/layouts/Layout.astro`.

---

## Phase 6: Internationalization & Backlog
- [x] Implement Internationalization (i18n) support:
  - [x] Configure `astro.config.mjs` with `locales: ['vi', 'en']`, `defaultLocale: 'vi'`, `prefixDefaultLocale: false`.
  - [x] Create `src/i18n/ui.ts` for Vietnamese and English UI translation dictionaries and path helpers.
  - [x] Add dynamic locale switcher (VI / EN) in `Layout.astro` desktop & mobile navigation bars.
  - [x] Create English localized route pages under `src/pages/en/` (`/en`, `/en/gold`, `/en/oil`, `/en/electric`, `/en/soccer`, `/en/oil/widget`, `/en/gold/widget`).
  - [x] Internationalize `FuelSlider.astro` component with multi-language dictionary support (`slider.*`).
  - [x] Add day-before price comparison indicators (`▲ +X` / `▼ -X`) to `GoldSlider.astro` widget component.
  - [x] Add day-before price comparison indicators (`▲ +X` / `▼ -X`) to `FuelSlider.astro` widget component.
  - [x] Sync English route pages under `src/pages/en/` with default language pages (widgets, Layout image props, footer notes, and locale-aware number formatting).

---

## Phase 7: SEO Optimization & Structured Data
- [x] Comprehensive Meta Tags & Descriptions:
  - [x] Add dynamic page titles and meta descriptions for all pages in both Vietnamese (`vi`) and English (`en`) in `src/i18n/ui.ts`.
  - [x] Render `<meta name="description">`, `<meta name="robots">`, `<meta name="theme-color">`, `<meta name="author">` in `Layout.astro`.
- [x] Canonical & Multilingual Hreflang Tags:
  - [x] Add `<link rel="canonical">` referencing production URLs.
  - [x] Add bidirectional `<link rel="alternate" hreflang="vi">`, `hreflang="en"`, and `hreflang="x-default">`.
- [x] Social Cards (Open Graph & Twitter):
  - [x] Implement `og:site_name`, `og:type`, `og:title`, `og:description`, `og:url`, `og:image`, `og:locale`.
  - [x] Implement Twitter Cards (`twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`).
- [x] Rich Snippets & Schema.org JSON-LD:
  - [x] Inject `Organization`, `WebSite`, and dynamic `BreadcrumbList` JSON-LD payloads.
- [x] Semantic Structure & UX:
  - [x] Add semantic `<footer>` element with copyright, brand link, and sticky layout container.
- [x] AI SEO & Generative Engine Optimization (GEO):
  - [x] Create dynamic `/llms.txt` endpoint (`src/pages/llms.txt.ts`) providing LLM discovery index.
  - [x] Create dynamic `/llms-full.txt` endpoint (`src/pages/llms-full.txt.ts`) serving raw pre-parsed Markdown price tables.
  - [x] Configure AI crawler permissions in `src/pages/robots.txt.ts` (`GPTBot`, `ChatGPT-User`, `ClaudeBot`, `PerplexityBot`, `Google-Extended`, `Applebot-Extended`).
  - [x] Add `<link rel="help" href="/llms.txt">` and Schema.org `DataFeed` / `Dataset` JSON-LD payloads.

---

## Phase 8: Backlog & Future Improvements
- [ ] Add RSS / Atom feed generator for daily gold and fuel price updates.
- [ ] Implement automated data scraper cron script to write daily folders into `./databases/YYYY-MM-DD/`.
- [ ] Add export tools (CSV / Excel export) on `CalendarTable` component.
- [x] Implement percentage change indicators (+/- %) comparing current day prices to previous day.
- [ ] Enhance mobile table horizontal scrolling and accessibility.
