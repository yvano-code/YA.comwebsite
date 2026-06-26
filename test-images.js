const { siteConfig } = require('./lib/site-config.ts');
const isImage = (src) => {
  if (!src) return false;
  const lower = src.toLowerCase();
  return lower.endsWith('.jpg') || lower.endsWith('.jpeg') || lower.endsWith('.png') || lower.endsWith('.webp') || lower.includes('image.tmdb.org');
};
const pImages = siteConfig.projects.map(p => p.image).filter(isImage);
const eImages = siteConfig.editorial.flatMap(e => e.images || []).filter(isImage);
console.log("pImages:", pImages.length);
console.log("eImages:", eImages.length);
