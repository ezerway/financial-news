# Product Requirement Document (PRD)

## 1. Project Overview

**Product Name:** EzerWay Financial News & Commodity Tracking System (`finance`)  
**Repository:** `ezerway/financial-news`  
**Target Domain:** `financial-news.ezerway.com`  

The **EzerWay Financial News** system is a high-performance, lightweight web dashboard engineered to aggregate, transform, and visualize daily financial asset and commodity data in Vietnam. Key assets tracked include **Gold Prices (SJC, PNJ, Ring Gold)**, **Petroleum/Fuel Prices (Petrolimex Zone 1 & Zone 2)**, **Electricity Tariff Schedules**, and **Sports Betting Odds**.

---

## 2. Problem Statement & Objectives

### 2.1 Problem Statement
Financial asset prices such as gold standard rates and fuel costs fluctuate daily and are published across fragmented web sources without unified historical tracking, clean visualization, or static archival accessibility.

### 2.2 Core Objectives
- **Centralized Data Aggregation:** Store date-partitioned JSON and Markdown snapshots locally in the codebase under `./databases/YYYY-MM-DD/`.
- **Fast Static Delivery:** Render pre-built static pages with Astro 6.x SSG (Server-Side Generation) for instant page loads and zero server overhead.
- **Interactive Analytics:** Provide historical trend charts via Highcharts alongside calendar-driven historical lookup tables.
- **Automated Deployment:** Deploy changes seamlessly to CloudPanel VPS via GitHub Actions on every push to the `main` branch.

---

## 3. Key Target Audiences & Use Cases

1. **Individual Investors & Consumers:** Monitor daily purchasing and selling rates for SJC gold, PNJ 24K gold, and local bullion variants.
2. **Drivers & Logistics Operators:** Track Petrolimex gasoline (RON 95-V, RON 95-III, E5 RON 92) and diesel price adjustments across Zone 1 and Zone 2.
3. **Analysts & Utility Subscribers:** Inspect official electricity tariff schedules and market betting odds.

---

## 4. Product Features & Scope

### 4.1 Dashboard Overview (`/`)
- Summary landing page showcasing current day/latest price tables for Gold and Petroleum.
- Quick navigation header for switching between commodity views.

### 4.2 Gold Price Tracking (`/gold`)
- **Data Attributes:** Product Code (`masp`), Product Name (`tensp`), Buying Price (`giamua`), Selling Price (`giaban`).
- **30-Day Trend Chart:** Multi-line Highcharts interactive chart tracking key gold products (`SJC`, `N24K`, `KB`, `TL`, `PNJ`).
- **Historical Calendar View:** `CalendarTable` component allowing date selection across historical dataset snapshots.

### 4.3 Petroleum / Fuel Price Analytics (`/oil`)
- **Data Attributes:** Title (`title`), Zone 1 Price (`zone1_price`), Zone 2 Price (`zone2_price`), Effective Date (`date`).
- **Price Chart:** Interactive line graph tracking top fuel types (`RON 95-V`, `RON 95-III`, `E5 RON 92-II`, `DO 0,05S-II`).
- **Calendar & Table Matrix:** Tabular listing with date selection.

### 4.4 Electricity Tariff Notices (`/electric`)
- Markdown-compiled reader parsing regulatory notifications, utility price brackets, and policy documentation.
- HTML rendering using Astro's `set:html` and Tailwind Typography prose container (`Prose.astro`).

### 4.5 Soccer Odds & Sports Analytics (`/soccer`)
- Data collection tracking soccer matches, start times, win/draw/loss odds, and league details.

---

## 5. Non-Functional Requirements (NFRs)

- **Performance:** First Contentful Paint (FCP) < 0.8s; zero client JS except for Highcharts dynamic chart rendering.
- **SEO & Accessibility:** Fully semantic HTML5 header hierarchy, dynamic title generation, responsive viewport metadata, and Tailwind Plus UI elements.
- **Design & UI:** Modern dark/light theme toggle support via Tailwind CSS v4, dark mode color tokens (`bg-gray-800`, `dark:text-white`), responsive flexbox/grid containers.
- **Reliability:** Strict schema validation using Astro Zod content collections preventing broken data builds.

---

## 6. Success Metrics

- **Zero Build Failures:** 100% build success rate on GitHub Actions pipeline.
- **Sub-second Page Load:** Instant static asset rendering on CloudPanel VPS web server.
- **Data Consistency:** Daily snapshot directories accurately parsed without schema runtime errors.
