import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const lessons = defineCollection({
  loader: glob({ base: './src/content/lessons', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    slug: z.string().regex(/^[a-z0-9-]+$/),
    order: z.number().int().min(0),
    title: z.string().min(1),
    description: z.string().min(1),
    objectives: z.array(z.string().min(1)).min(1),
    prerequisites: z.array(z.string().min(1)).default([]),
    environment: z.string().min(1),
    reviewedAt: z.iso.date().optional(),
  }),
});

export const collections = { lessons };
