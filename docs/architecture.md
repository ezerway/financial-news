# System Architecture & Technical Specifications

## 1. High-Level System Architecture

The **EzerWay Financial News** system follows a static-first data-driven architecture using Astro 6, Tailwind CSS v4, and Highcharts. The application reads date-partitioned file storage directly at build time to produce a fully static web interface hosted on a Linux VPS running CloudPanel.

```
┌─────────────────────────────────────────────────────────┐
│              File-Based Data Store                      │
│             ./databases/YYYY-MM-DD/                     │
│   ├── gold/*.json   ├── oil/*.json   ├── electric/*.md  │
└────────────────────────────┬────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────┐
│            Astro Content Collections Layer              │
│       src/content.config.ts (Zod Glob Loader)           │
└────────────────────────────┬────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────┐
│              Data Transformers & Helpers                │
│    src/libs/commonTransformer.ts & soccerTransformer.ts │
└────────────────────────────┬────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────┐
│               Astro Components & Layout                 │
│  src/components/{CalendarTable, Chart, Table, Prose}    │
│            src/layouts/Layout.astro                     │
└────────────────────────────┬────────────────────────────┘
                             │
                             ▼ Static Build Output (./dist)
┌─────────────────────────────────────────────────────────┐
│             GitHub Actions CI/CD Pipeline               │
│          .github/workflows/deploy.yml                   │
│         (Build -> Rsync over SSH -> VPS Public)          │
└─────────────────────────────────────────────────────────┘
```

---

## 2. Technology Stack

| Layer | Technology / Library | Version / Details |
| :--- | :--- | :--- |
| **Framework** | Astro | `^6.3.7` (SSG Node `>=22.12.0`) |
| **Styling** | Tailwind CSS & `@tailwindcss/vite` | `^4.2.2` with `@tailwindcss/typography` |
| **UI Components** | `@tailwindplus/elements` | Web components library (CDN loaded) |
| **Data Visualization** | Highcharts | `^12.5.0` client-side chart library |
| **Validation** | Zod / Astro Content API | Schema enforcement in `content.config.ts` |
| **Package Manager** | pnpm | `11.2.2` |
| **Deployment Target** | CloudPanel VPS | Rsync deployment via GitHub Actions |

---

## 3. Core Directory Layout

```
finance/
├── .github/workflows/
│   └── deploy.yml          # GitHub Actions deployment workflow
├── databases/              # Date-partitioned JSON/MD snapshot store
│   ├── YYYY-MM-DD/
│   │   ├── gold/           # Daily gold rate JSONs
│   │   ├── oil/            # Daily petrolimex fuel JSONs
│   │   ├── electric/       # Daily electricity policy Markdown docs
│   │   └── soccer/         # Daily soccer odds JSONs
│   └── schema.ts           # TypeScript domain interfaces
├── docs/                   # System & project documentation
│   ├── prd.md
│   ├── architecture.md
│   ├── task.md
│   └── implementation_plan.md
├── src/
│   ├── assets/             # SVGs and images
│   ├── components/         # Reusable Astro components
│   │   ├── CalendarTable.astro
│   │   ├── Chart.astro
│   │   ├── Prose.astro
│   │   ├── Table.astro
│   │   └── Welcome.astro
│   ├── layouts/
│   │   └── Layout.astro    # Navigation navbar, dark theme shell
│   ├── libs/
│   │   ├── commonTransformer.ts  # Date parsing & Highcharts series formatter
│   │   └── soccerTransformer.ts  # Sports data transformer
│   ├── pages/
│   │   ├── index.astro     # Main Dashboard (Gold + Oil overview)
│   │   ├── gold.astro      # Gold analytics page
│   │   ├── oil.astro       # Petroleum analytics page
│   │   ├── electric.astro  # Electricity markdown reader page
│   │   └── soccer.astro    # Soccer odds tracking page
│   ├── styles/
│   │   └── global.css      # CSS entrypoint with Tailwind directives
│   └── content.config.ts   # Astro collection schemas & glob loaders
├── astro.config.mjs        # Astro configuration file
├── package.json            # Node dependencies and build scripts
└── tsconfig.json           # TypeScript configuration with path aliases (@/*)
```

---

## 4. Data Layer & Schema Specifications

Data is stored hierarchically in `./databases/YYYY-MM-DD/<collection>/<filename>.json`.

### 4.1 Gold Price Collection (`gold`)
- **Loader:** Glob pattern `**/gold/*.json`
- **Schema:**
  ```ts
  {
    masp: string;     // Product code (e.g. SJC, N24K, PNJ)
    tensp: string;    // Product full display name
    giaban: string | number; // Selling price
    giamua: string | number; // Buying price
  }
  ```

### 4.2 Petroleum Collection (`oil`)
- **Loader:** Glob pattern `**/oil/*.json`
- **Schema:**
  ```ts
  {
    id: number;
    created_at: string;
    updated_at: string;
    petrolimex_id: string;
    date: string;
    title: string;          // Fuel name (e.g. Xăng RON 95-V)
    zone1_price: number;    // Zone 1 price in VND
    zone2_price: number;    // Zone 2 price in VND
  }
  ```

### 4.3 Electricity Collection (`electric`)
- Loaded via `import.meta.glob("@databases/*/electric/*.md")` for rendering compiled HTML content.

---

## 5. Data Transformation & Visualizations

### 5.1 `commonTransformer.ts`
1. `toTableItems(collection, model)`: Extracts date and time strings from folder structure IDs (e.g. `2026-07-28/gold/160000.json` -> `2026-07-28T16:00:00.000Z`).
2. `toChart(collection, keyField, valueField, pageSize=30, ids=[])`:
   - Filters the collection by target product IDs (e.g., SJC, RON 95-V).
   - Generates Highcharts category array (formatted dates: `Jul 28`) and multi-series price arrays.

### 5.2 Client-Side Highcharts Component (`Chart.astro`)
- Encapsulates Highcharts options into `data-chart` attribute on container HTML elements.
- Executes client-side script targeting `.astro-chart` elements for rendering.

---

## 6. CI/CD Deployment Workflow

The project deploys automatically to CloudPanel VPS via GitHub Actions (`.github/workflows/deploy.yml`):

1. **Trigger:** `push` on branch `main` or manual `workflow_dispatch`.
2. **Environment:** Node 24 with pnpm `11.2.2` frozen lockfile.
3. **Build:** Executes `pnpm run build` outputting static web files to `./dist/`.
4. **Deploy:** Uses `burnett01/rsync-deployments@v9` with flags `-avzr --delete` to sync `./dist/` to remote path `/home/ezerway-financial-news/htdocs/financial-news.ezerway.com/public`.
