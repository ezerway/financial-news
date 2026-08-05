import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const siteOrigin = site ? site.origin : 'https://financial-news.ezerway.com';
  
  const content = `# EzerWay Financial News

> EzerWay Financial News is a static, high-performance financial data dashboard tracking daily commodity prices, utility tariffs, and sports analytics in Vietnam.

## Core Categories & Pages

- [Dashboard Overview](${siteOrigin}/): Daily high-level summary of Gold prices, Petrolimex fuel rates, and LPG gas cylinder prices.
- [Gold Prices (Giá Vàng)](${siteOrigin}/gold): Real-time tracking of SJC gold, PNJ 24K gold, and bullion variants with 30-day interactive price history.
- [Fuel Prices (Giá Xăng Dầu)](${siteOrigin}/oil): Petrolimex petroleum prices (RON 95-V, RON 95-III, E5 RON 92, Diesel) for Zone 1 & Zone 2.
- [LPG Gas Prices (Giá Gas)](${siteOrigin}/gas): Retail LPG gas cylinder prices for 12kg household and 45kg commercial units across provinces in Vietnam.
- [Electricity Tariffs (Giá Điện)](${siteOrigin}/electric): Official retail electricity price schedules, regulatory policy notifications, and EVN circulars.
- [Soccer Odds (Tỷ lệ Bóng đá)](${siteOrigin}/soccer): Daily match schedules, win/draw/loss odds, and league statistics.

## English Localized Versions

- [English Dashboard](${siteOrigin}/en): English localized financial summary dashboard.
- [English Gold Prices](${siteOrigin}/en/gold): Gold price tracking in English.
- [English Fuel Prices](${siteOrigin}/en/oil): Petrolimex fuel analytics in English.
- [English Gas Prices](${siteOrigin}/en/gas): LPG gas rates in English.
- [English Electricity Tariffs](${siteOrigin}/en/electric): Electricity tariff documents in English.
- [English Soccer Odds](${siteOrigin}/en/soccer): Soccer odds in English.

## Additional Resources & Data Feeds

- [Full Data Snapshot](${siteOrigin}/llms-full.txt): Complete, raw text data snapshots of latest gold, fuel, and gas price tables.
- [Sitemap Index](${siteOrigin}/sitemap-index.xml): XML Sitemap index of all published routes.
`.trim();

  return new Response(content, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
    },
  });
};
