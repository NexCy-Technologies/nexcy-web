import fs from "fs";
import path from "path";

const baseUrl = "https://nexcy.lk";
const currentDate = new Date().toISOString();

const pages = [
  { path: "", changefreq: "weekly", priority: 1 },
  { path: "about", changefreq: "monthly", priority: 0.8 },
  { path: "services", changefreq: "monthly", priority: 0.9 },
  { path: "team", changefreq: "monthly", priority: 0.7 },
  { path: "contact", changefreq: "monthly", priority: 0.8 },
];

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (page) => `
  <url>
    <loc>${baseUrl}/${page.path}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join("")}
</urlset>
`;

fs.writeFileSync(path.join(process.cwd(), "public", "sitemap.xml"), sitemapXml);
console.log("✅ sitemap.xml generated in public/");