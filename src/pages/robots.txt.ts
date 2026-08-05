import type { APIRoute } from 'astro';

const getRobotsTxt = (sitemapURL: URL, llmsURL: URL) => `
User-agent: *
Allow: /

# AI Crawlers & LLM Search Agents
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Applebot-Extended
Allow: /

Sitemap: ${sitemapURL.href}
# LLM Index: ${llmsURL.href}
`.trim();

export const GET: APIRoute = ({ site }) => {
  const sitemapURL = new URL('sitemap-index.xml', site);
  const llmsURL = new URL('llms.txt', site);
  return new Response(getRobotsTxt(sitemapURL, llmsURL), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
