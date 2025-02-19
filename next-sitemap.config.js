/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://ryrie.ink',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  outDir: 'public',
}
