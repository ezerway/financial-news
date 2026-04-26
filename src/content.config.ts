import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const gold = defineCollection({
    loader: glob({ pattern: '**/gold/*.json', base: './databases' }),
    schema: z.array(
        z.object({
            masp: z.string(),
            tensp: z.string(),
            giaban: z.union([z.string(), z.number()]),
            giamua: z.union([z.string(), z.number()]),
        })
    ),
});

const oil = defineCollection({
    loader: glob({ pattern: '**/oil/*.json', base: './databases' }),
    schema: z.array(
        z.object({
            id: z.number(),
            created_at: z.string(),
            updated_at: z.string(),
            petrolimex_id: z.string(),
            date: z.string(),
            title: z.string(),
            zone1_price: z.number(),
            zone2_price: z.number(),
        })
    ),
});

// const soccer = defineCollection({
//     loader: glob({ pattern: '**/soccer/*.json', base: './databases' }),
//     schema: z.array(
//         z.object({
//             serie: z.string().optional(),
//             title: z.string().optional(),
//             sortTitle: z.string().optional(),
//             start: z.string().optional(),
//             startDate: z.string().optional(),
//             startTime: z.string().optional(),
//             winMarketOutcomePrices: z.array(z.string()).optional(),
//             drawMarketOutcomePrices: z.array(z.string()).optional(),
//             lossMarketOutcomePrices: z.array(z.string()).optional(),
//         })
//     ),
// });

export const collections = { gold, oil };
