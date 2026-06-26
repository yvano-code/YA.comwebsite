const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Mobile viewport
  await page.setViewport({ width: 390, height: 844 });
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));

  console.log('Navigating to http://localhost:3000...');
  await page.goto('http://localhost:3000');
  
  console.log('Waiting 3 seconds for animation to start...');
  await new Promise(r => setTimeout(r, 3000));
  
  // Dump the style attributes of the first letter 'Y'
  const styles = await page.evaluate(() => {
    const spans = document.querySelectorAll('span');
    let results = [];
    spans.forEach(s => {
      if (s.textContent.includes('Y') || s.textContent.includes('A')) {
        results.push({ text: s.textContent, transform: s.style.transform });
      }
    });
    return results;
  });
  
  console.log('Styles after 3s:', styles);

  console.log('Waiting 2 more seconds...');
  await new Promise(r => setTimeout(r, 2000));

  const styles2 = await page.evaluate(() => {
    const spans = document.querySelectorAll('span');
    let results = [];
    spans.forEach(s => {
      if (s.textContent.includes('Y') || s.textContent.includes('A')) {
        results.push({ text: s.textContent, transform: s.style.transform });
      }
    });
    return results;
  });
  
  console.log('Styles after 5s:', styles2);

  await browser.close();
})();
