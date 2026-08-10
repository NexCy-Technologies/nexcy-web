const puppeteer = require('puppeteer');

(async () => {
  try {
    console.log('Launching browser...');
    const browser = await puppeteer.launch({
      headless: "new"
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 4000 });
    console.log('Navigating to http://localhost:3000...');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2', timeout: 30000 });
    
    console.log('Taking screenshot...');
    await page.screenshot({ 
      path: '/Users/darkcyph7/.gemini/antigravity-ide/brain/fc2524d1-9be8-4ade-afa0-637c062662b6/screenshot.png', 
      fullPage: true 
    });
    
    await browser.close();
    console.log('Done!');
  } catch (error) {
    console.error('Failed:', error);
    process.exit(1);
  }
})();
