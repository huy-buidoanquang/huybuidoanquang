import { defineCollection, type SchemaContext } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const storyStyles = [
    'mist',
    'lantern',
    'studio',
    'commencement',
    'coastal',
    'cloudsea',
    'highland-winter',
    'autumn-ridge',
    'karst-emerald',
    'moss-summit',
    'karst-blossom',
] as const;

const atmospheres = [
    'none',
    'ocean',
    'clouds',
    'embers',
    'golden-wind',
    'waterfall',
    'spores',
    'petals',
    'karst-blossom',
] as const;

const galleryItem = (context: SchemaContext) => z.object({
    src: context.image(),
    alt: z.string().min(1),
    caption: z.string().optional(),
    credit: z.string().optional(),
    source: z.url().optional(),
});

const shared = ({ image }: SchemaContext) => z.object({
    title: z.string().min(1),
    summary: z.string().min(1),
    cover: image(),
    coverAlt: z.string().min(1),
    coverCredit: z.string().optional(),
    coverSource: z.url().optional(),
    theme: z.enum(['night', 'sand', 'forest']),
    atmosphere: z.enum(atmospheres).default('none'),
});

const projects = defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
    schema: (context) => shared(context).extend({
        repoUrl: z.url().optional(),
        liveUrl: z.url().optional(),
        stack: z.array(z.string()).default([]),
        year: z.string().optional(),
        role: z.string().optional(),
        order: z.number().default(99),
    }),
});

const destinations = defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/destinations' }),
    schema: (context) => shared(context).extend({
        date: z.coerce.date(),
        dateRange: z.string().min(1),
        region: z.string().min(1),
        coordinates: z.string().min(1),
        elevation: z.string().optional(),
        storyStyle: z.enum(storyStyles).default('mist'),
        gallery: z.array(galleryItem(context)).default([]),
    }),
});

const posts = defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
    schema: (context) => shared(context).extend({
        date: z.coerce.date(),
        category: z.enum(['milestone', 'travel', 'engineering', 'photography', 'notes']),
        destination: z.string().optional(),
        featured: z.boolean().default(false),
        storyStyle: z.enum(storyStyles).default('studio'),
        gallery: z.array(galleryItem(context)).default([]),
    }),
});

export const collections = { projects, destinations, posts };
