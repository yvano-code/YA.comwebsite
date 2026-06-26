import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.setViewport({ width: 390, height: 844 });
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));

  await page.goto('http://localhost:3000');
  
  await new Promise(r => setTimeout(r, 3000));
  
  const styles = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('span')).map(s => s.style.transform).filter(t => t);
  });
  
  console.log('Transforms:', styles);

  await browser.close();
})();
