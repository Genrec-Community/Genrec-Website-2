import { chromium } from 'playwright';

console.log('launching');
const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
console.log('launched');
const page = await browser.newPage({ viewport: { width: 1600, height: 1000 } });
console.log('page');
await page.goto('https://www.luminaiq.fun/', { waitUntil: 'domcontentloaded', timeout: 45000 });
console.log('loaded');
await page.waitForTimeout(5000);
console.log('waited', await page.title());
await page.screenshot({ path: 'public/shots/luminaiq-hero.png' });
console.log('shot');
await browser.close();
