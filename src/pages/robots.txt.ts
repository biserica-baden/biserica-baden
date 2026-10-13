import type { APIRoute } from 'astro';

const base = import.meta.env.BASE_URL.replace(/\/?$/, '/');

export const GET: APIRoute = ({ site }) => {
  const noindex = import.meta.env.LOCAL_PREVIEW === 'true';
  const body = `User-agent: *
${noindex ? 'Disallow: /' : 'Allow: /'}

Sitemap: ${new URL(`${base}sitemap.xml`, site).href}
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
