module.exports = {
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL || "https://dataverse-ai-smoky.vercel.app",
  generateRobotsTxt: false, // we already added our own robots.txt
  changefreq: "daily",
  priority: 0.7,
  sitemapSize: 7000,
};
