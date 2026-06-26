const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/');
  
  const nav = await page.$('#ya-mobile-navigator-v3');
  if (nav) {
    const box = await nav.boundingBox();
    console.log('Nav Box on Home:', box);
    const zIndex = await page.evaluate(el => window.getComputedStyle(el).zIndex, nav);
    console.log('Nav zIndex:', zIndex);
  } else {
    console.log('Nav not found on Home');
  }

  await page.goto('http://localhost:3000/clips');
  
  const clipsNav = await page.$('#ya-mobile-navigator-v3');
  if (clipsNav) {
    const box = await clipsNav.boundingBox();
    console.log('Nav Box on Clips:', box);
  } else {
    console.log('Nav not found on Clips');
  }

  await browser.close();
})();
