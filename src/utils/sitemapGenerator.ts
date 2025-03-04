
import siteConfig from "@/config/site.json";
import fs from 'fs';
import path from 'path';

interface SitemapURL {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

/**
 * Generate a sitemap XML string from a list of URLs
 * 
 * This function can be used during build time to generate a sitemap.xml
 * Note: This function should run on the server, not in the browser
 */
export const generateSitemap = (domain: string, urls: SitemapURL[]): string => {
  let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
  sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  urls.forEach(url => {
    sitemap += '   <url>\n';
    sitemap += `      <loc>${domain}${url.loc}</loc>\n`;
    sitemap += `      <lastmod>${url.lastmod}</lastmod>\n`;
    sitemap += `      <changefreq>${url.changefreq}</changefreq>\n`;
    sitemap += `      <priority>${url.priority}</priority>\n`;
    sitemap += '   </url>\n';
  });
  
  sitemap += '</urlset>';
  return sitemap;
};

/**
 * Get all the main pages from the site configuration
 */
export const getMainPagesForSitemap = (domain: string): SitemapURL[] => {
  const currentDate = new Date().toISOString().split('T')[0];
  
  const mainUrls: SitemapURL[] = [
    {
      loc: '/',
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: 1.0
    },
    {
      loc: '/about',
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.8
    },
    {
      loc: '/services',
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.8
    },
    {
      loc: '/projects',
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.8
    },
    {
      loc: '/team',
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.7
    },
    {
      loc: '/gallery',
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.7
    },
    {
      loc: '/contact',
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.8
    }
  ];
  
  return mainUrls;
};

/**
 * This function can be used in a build step to generate the sitemap
 * Example usage:
 * ```
 * // In a Node.js build script
 * const { writeSitemapToFile } = require('./sitemapGenerator');
 * writeSitemapToFile('https://yourdomain.com', './public');
 * ```
 */
export const writeSitemapToFile = (domain: string, outputDir: string): void => {
  const urls = getMainPagesForSitemap(domain);
  const sitemapXml = generateSitemap(domain, urls);
  
  // Ensure the directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // Write the sitemap to the output directory
  fs.writeFileSync(path.join(outputDir, 'sitemap.xml'), sitemapXml);
  console.log('Sitemap generated successfully at', path.join(outputDir, 'sitemap.xml'));
};
