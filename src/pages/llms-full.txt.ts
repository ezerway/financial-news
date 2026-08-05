import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { toTableItems } from '@/libs/commonTransformer';

export const GET: APIRoute = async ({ site }) => {
  const siteOrigin = site ? site.origin : 'https://financial-news.ezerway.com';

  const goldData = toTableItems(await getCollection('gold'), 'gold').at(-1);
  const oilData = toTableItems(await getCollection('oil'), 'oil').at(-1);
  const gasData = toTableItems(await getCollection('gas'), 'gas').at(-1);

  const goldDate = goldData?.date || 'N/A';
  const oilDate = oilData?.date || 'N/A';
  const gasDate = gasData?.date || 'N/A';

  const goldRows = (goldData?.data || [])
    .map(
      (item: any) =>
        `| ${item.masp || '-'} | ${item.tensp || '-'} | ${item.giamua || '-'} | ${item.giaban || '-'} |`
    )
    .join('\n');

  const oilRows = (oilData?.data || [])
    .map(
      (item: any) =>
        `| ${item.title || '-'} | ${item.zone1_price ?? '-'} | ${item.zone2_price ?? '-'} |`
    )
    .join('\n');

  const gasRows = (gasData?.data || [])
    .map(
      (item: any) =>
        `| ${item.title || '-'} | ${item.type_1_price ?? '-'} | ${item.type_2_price ?? '-'} |`
    )
    .join('\n');

  const content = `# Financial News - Full Text Data Snapshot

> Source: ${siteOrigin}
> License: Open Data for AI Search & Retrieval Indexing

---

## 1. Latest Gold Prices (Giá Vàng) - Date: ${goldDate}

| Product Code | Product Name | Buying Price | Selling Price |
| :--- | :--- | :--- | :--- |
${goldRows || '| - | - | - | - |'}

---

## 2. Latest Petroleum Prices (Giá Xăng Dầu Petrolimex) - Date: ${oilDate}

| Fuel Type | Zone 1 Price (VND/liter) | Zone 2 Price (VND/liter) |
| :--- | :--- | :--- |
${oilRows || '| - | - | - |'}

---

## 3. Latest LPG Gas Cylinder Prices (Giá Gas) - Date: ${gasDate}

| Location / Zone | 12kg Cylinder (VND) | 45kg Cylinder (VND) |
| :--- | :--- | :--- |
${gasRows || '| - | - | - |'}

---

## Data Schema Reference

- **Gold Price Unit:** VND per tael or million VND/tael depending on product standard.
- **Petrolimex Fuel Unit:** VND per liter, applicable across Zone 1 (metropolitan) and Zone 2 (remote provinces).
- **LPG Gas Unit:** VND per cylinder unit (12kg residential / 45kg commercial).
`.trim();

  return new Response(content, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
    },
  });
};
