import { storage } from './storage';

interface SitemapUrl {
  url: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

export async function generateSitemap(baseUrl: string = 'https://bessecho.com'): Promise<string> {
  const urls: SitemapUrl[] = [];
  
  // Static pages
  urls.push({
    url: `${baseUrl}/`,
    lastmod: new Date().toISOString(),
    changefreq: 'daily',
    priority: 1.0
  });
  
  urls.push({
    url: `${baseUrl}/blog`,
    lastmod: new Date().toISOString(),
    changefreq: 'daily',
    priority: 0.9
  });
  
  urls.push({
    url: `${baseUrl}/knowledge`,
    lastmod: new Date().toISOString(),
    changefreq: 'weekly',
    priority: 0.8
  });

  // Blog posts
  const blogPosts = await storage.getBlogPosts();
  for (const post of blogPosts) {
    urls.push({
      url: `${baseUrl}/blog/${post.slug}`,
      lastmod: post.createdAt.toISOString(),
      changefreq: 'monthly',
      priority: 0.7
    });
  }

  // Categories
  const categories = await storage.getCategories();
  for (const category of categories) {
    urls.push({
      url: `${baseUrl}/blog/category/${category.slug}`,
      lastmod: new Date().toISOString(),
      changefreq: 'weekly',
      priority: 0.6
    });
  }

  // Generate XML
  const xmlUrls = urls.map(url => `
  <url>
    <loc>${url.url}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlUrls}
</urlset>`;
}

export async function generateRobotsTxt(baseUrl: string = 'https://bessecho.com'): Promise<string> {
  return `User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml

# Block admin areas
Disallow: /admin
Disallow: /api

# Allow specific files
Allow: /api/blog-posts
Allow: /api/categories
`;
}