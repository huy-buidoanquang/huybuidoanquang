import { defineCollection, type SchemaContext } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const shared = ({ image }: SchemaContext) => z.object({
    title: z.string().min(1),
    summary: z.string().min(1),
    cover: image(),
    coverAlt: z.string().min(1),
    theme: z.enum(['night', 'sand', 'forest']),
});

const projects = defineCollection({
    loader: glob({ pattern: '*.md', base: './src/content/projects' }),
    schema: shared,
});
const destinations = defineCollection({
    loader: glob({ pattern: '*.md', base: './src/content/destinations' }),
    schema: shared,
});
const posts = defineCollection({
    loader: glob({ pattern: '*.md', base: './src/content/posts' }),
    schema: (context) => shared(context).extend({
        date: z.coerce.date(),
        category: z.enum(['du-lich', 'ky-thuat', 'nhiep-anh', 'so-thich']),
        destination: z.string().optional(),
    }),
});

export const collections = { projects, destinations, posts };
