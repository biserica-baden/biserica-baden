import type { APIRoute } from 'astro';
import { languages, type Language } from '../data/types';

const base = import.meta.env.BASE_URL.replace(/\/?$/, '/');
const route = (locale: Language) => `${base}${locale === 'ro' ? '' : `${locale}/`}`;

// One entry per language; each lists all translations so search engines treat them as one page.
export const GET: APIRoute = ({ site }) => {
  const url = (locale: Language) => new URL(route(locale), site).href;
  const lastmod = new Date().toISOString().slice(0, 10);
  const alternates = [
    ...languages.map((locale) => `    <xhtml:link rel="alternate" hreflang="${locale}" href="${url(locale)}"/>`),
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${url('ro')}"/>`,
  ].join('\n');
  const entries = languages
    .map((locale) => `  <url>\n    <loc>${url(locale)}</loc>\n    <lastmod>${lastmod}</lastmod>\n${alternates}\n  </url>`)
    .join('\n');
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries}
</urlset>
`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
