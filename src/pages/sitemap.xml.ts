import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { isViId, localizePath } from '../i18n/ui.js';

export const prerender = true;

function escapeXml(value: string): string {
    return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}

export const GET: APIRoute = async ({ site }) => {
    const origin = (site?.toString() || 'https://huybuidoanquang.com').replace(/\/$/, '');
    const [projects, destinations, posts] = await Promise.all([
        getCollection('projects'),
        getCollection('destinations'),
        getCollection('posts'),
    ]);

    const enPaths: Array<{ path: string; lastmod?: string }> = [
        { path: '/' },
        { path: '/journal/' },
        ...projects
            .filter((e) => !isViId(e.id))
            .map((e) => ({ path: `/projects/${e.id}/` })),
        ...destinations
            .filter((e) => !isViId(e.id))
            .map((e) => ({ path: `/places/${e.id}/`, lastmod: e.data.date.toISOString().slice(0, 10) })),
        ...posts
            .filter((e) => !isViId(e.id))
            .map((e) => ({ path: `/journal/${e.id}/`, lastmod: e.data.date.toISOString().slice(0, 10) })),
    ];

    const urlEntries = enPaths.flatMap(({ path, lastmod }) => {
        const enUrl = `${origin}${path}`;
        const viUrl = `${origin}${localizePath(path, 'vi')}`;
        const alternates = [
            `        <xhtml:link rel="alternate" hreflang="en" href="${escapeXml(enUrl)}" />`,
            `        <xhtml:link rel="alternate" hreflang="vi" href="${escapeXml(viUrl)}" />`,
            `        <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(enUrl)}" />`,
        ].join('\n');
        const modTag = lastmod ? `\n        <lastmod>${lastmod}</lastmod>` : '';
        return [
            `    <url>\n        <loc>${escapeXml(enUrl)}</loc>${modTag}\n${alternates}\n    </url>`,
            `    <url>\n        <loc>${escapeXml(viUrl)}</loc>${modTag}\n${alternates}\n    </url>`,
        ];
    });

    const xml = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
        ...urlEntries,
        '</urlset>',
        '',
    ].join('\n');

    return new Response(xml, {
        headers: { 'Content-Type': 'application/xml; charset=utf-8' },
    });
};
