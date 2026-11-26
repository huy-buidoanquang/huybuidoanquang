import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
    output: 'static',
    site: 'https://huybuidoanquang.com',
    integrations: [mdx()],
});
