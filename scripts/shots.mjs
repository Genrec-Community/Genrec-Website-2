import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

mkdirSync('public/shots', { recursive: true });

const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'], executablePath: process.env.CHROMIUM_PATH || undefined });

async function shoot(url, slug, opts = {}) {
  const page = await browser.newPage({
    viewport: { width: 1600, height: 1000 },
    deviceScaleFactor: 1,
    reducedMotion: 'reduce',
  });
  await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 }).catch(() => {});
  await page.waitForTimeout(4500);
  await page.evaluate(() => window.scrollTo(0, 1));
  await page.waitForTimeout(500);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(800);
  await page.screenshot({ path: `public/shots/${slug}-hero.png`, animations: 'disabled' });
  if (opts.sections) {
    for (const [name, y] of opts.sections) {
      await page.evaluate((top) => window.scrollTo(0, top), y);
      await page.waitForTimeout(1800);
      await page.screenshot({ path: `public/shots/${slug}-${name}.png`, animations: 'disabled' });
    }
  }
  if (opts.mobile) {
    const m = await browser.newPage({
      viewport: { width: 430, height: 932 },
      deviceScaleFactor: 2,
      reducedMotion: 'reduce',
    });
    await m.goto(url, { waitUntil: 'networkidle', timeout: 60000 }).catch(() => {});
    await m.waitForTimeout(4000);
    await m.screenshot({ path: `public/shots/${slug}-mobile.png`, animations: 'disabled' });
    await m.close();
  }
  await page.close();
  console.log('shot', slug);
}

await shoot('https://selectstar.genrecai.com/', 'selectstar', {
  sections: [['app', 1500], ['pipeline', 3000], ['graph', 5400]],
  mobile: true,
});
await shoot('https://selectstarapp.genrecai.com', 'selectstar-app');
await shoot('https://www.tabble.in/', 'tabble', {
  sections: [['phone', 1200], ['kitchen', 2700], ['founding', 4800]],
  mobile: true,
});
await shoot('https://www.luminaiq.fun/', 'luminaiq', {
  sections: [['loop', 2000], ['features', 3650], ['app', 5900]],
  mobile: true,
});
await shoot('https://hailbrowser.genrecai.com/', 'hailbrowser', {
  sections: [['benchmark', 1950], ['panel', 2950], ['modes', 4350]],
  mobile: true,
});

await browser.close();
