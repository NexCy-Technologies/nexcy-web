const puppeteer = require('puppeteer');

(async () => {
  try {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    
    page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));
    page.on('pageerror', error => {
      console.log('BROWSER ERROR MESSAGE:', error.message);
      console.log('BROWSER ERROR STACK:', error.stack);
    });
    page.on('requestfailed', request => console.log('BROWSER REQUEST FAILED:', request.url(), request.failure().errorText));

    await page.goto('http://localhost:3001', { waitUntil: 'networkidle2' });
    await browser.close();
  } catch (e) {
    console.error(e);
  }
})();
