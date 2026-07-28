# Implementation Plan & Developer Roadmap

## 1. Developer Setup & Environment Workflow

### 1.1 Prerequisites
- **Node.js**: `^22.12.0` or `>=24.0.0`
- **Package Manager**: `pnpm@11.2.2`

### 1.2 Development Commands
```sh
# 1. Install dependencies
pnpm install

# 2. Start local development server (localhost:4321)
pnpm dev

# 3. Build production bundle (output to ./dist)
pnpm build

# 4. Preview production build locally
pnpm preview
```

---

## 2. Guideline: Adding a New Financial Commodity / Collection

To extend the system with a new dataset collection (e.g., `forex` currency exchange rates), follow these steps:

### Step 1: Create Data Directory
Store daily snapshot JSON files in `./databases/YYYY-MM-DD/forex/*.json`:
```json
[
  { "currency": "USD", "buy": 25400, "sell": 25480 },
  { "currency": "EUR", "buy": 27200, "sell": 27350 }
]
```

### Step 2: Update Domain Model Schema (`databases/schema.ts`)
Add TypeScript interface:
```ts
export interface ForexPrice {
  currency: string;
  buy: number;
  sell: number;
}
```

### Step 3: Register Collection in Astro (`src/content.config.ts`)
Define collection using `glob` loader and Zod schema:
```ts
const forex = defineCollection({
    loader: glob({ pattern: '**/forex/*.json', base: './databases' }),
    schema: z.array(
        z.object({
            currency: z.string(),
            buy: z.number(),
            sell: z.number(),
        })
    ),
});

export const collections = { gold, oil, soccer, forex };
```

### Step 4: Create Page Component (`src/pages/forex.astro`)
Create page routing component utilizing `CalendarTable` and `Chart`:
```astro
---
import Layout from "@layouts/Layout.astro";
import { getCollection } from "astro:content";
import CalendarTable from "@components/CalendarTable.astro";
import { toTableItems, toChart } from "@libs/commonTransformer";
import Chart from "@components/Chart.astro";

const model = "forex";
const collection = await getCollection(model);
const items = toTableItems(collection, model);
const chart = toChart(items, "currency", "sell", 30, ["USD", "EUR"]);
---

<Layout title="Forex Rates">
  <CalendarTable
    header={[
      { key: "currency", label: "Currency" },
      { key: "buy", label: "Buying Price" },
      { key: "sell", label: "Selling Price" },
    ]}
    items={items}
  >
    <Chart
      slot="chart"
      id="forex-chart"
      series={chart.series}
      categories={chart.categories}
    />
  </CalendarTable>
</Layout>
```

---

## 3. Verification & Quality Assurance Plan

### 3.1 Automated Build Check
Always run `pnpm build` locally to ensure Zod validation rules pass across all dataset directories and no broken TypeScript imports exist.

```sh
pnpm build
```

### 3.2 CI Deployment Verification
When pushing changes to `main`:
1. Navigate to GitHub repository **Actions** tab.
2. Confirm the `Deploy to CloudPanel VPS` workflow succeeds.
3. Verify updated deployment live on `https://financial-news.ezerway.com`.

---

## 4. SEO & Search Engine Crawling (`@astrojs/sitemap` & `robots.txt`)

The application configures search engine indexing and sitemap generation:
- **Sitemap Configuration**: Registered in `astro.config.mjs` with integration `sitemap({ changefreq: 'daily' })` and canonical domain `site: "https://financial-news.ezerway.com"`.
- **Sitemap Output**: Generates `sitemap-index.xml` and `sitemap-0.xml` (with `<changefreq>daily</changefreq>` on all route entries) in `./dist` upon executing `pnpm build`.
- **Head Link Discovery**: Included `<link rel="sitemap" href="/sitemap-index.xml" />` in `src/layouts/Layout.astro` `<head>`.
- **Robots Endpoint**: Dynamic endpoint [`src/pages/robots.txt.ts`](file:///Users/ezerway/PhpstormProjects/ezerway/finance/src/pages/robots.txt.ts) dynamically constructs `robots.txt` referencing `https://financial-news.ezerway.com/sitemap-index.xml`.




