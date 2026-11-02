// Renders Open Graph cards (1200x630) from an HTML template in the site's type and palette.
//   node scripts/og.mjs            (set CHROMIUM_PATH if Playwright's own browser is missing)
import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const asData = (file, type) => `data:${type};base64,${readFileSync(path.join(root, file)).toString('base64')}`;
const font = (file) => asData(`public/fonts/${file}`, 'font/woff2');

const cards = [
  {
    out: 'public/og.png',
    accent: '#E23A1F',
    label: 'GenrecAI / Software and AI studio',
    title: 'We build<br>what holds',
    sub: 'Websites, software, AI workflows, AI agents and custom CRM.',
    foot: 'genrecai.com / Founded by Shyamnath Sankar and Jai Samyukth B U',
    shot: 'public/img/structure.jpg',
    big: true,
  },
  {
    out: 'public/og/luminaiq.png',
    accent: '#C8E66A',
    label: 'AI / Education / Product',
    title: 'LuminaIQ',
    sub: 'Read it once. Remember it for the exam.',
    foot: '2026 / 12,000+ learners / by GenrecAI',
    shot: 'public/shots/luminaiq-hero.png',
  },
  {
    out: 'public/og/hailbrowser.png',
    accent: '#C8F05A',
    label: 'AI / Browser agent / Open source',
    title: 'HailBrowser',
    sub: 'Your own browser agent. 26 of 26 tasks at 4.2 seconds each.',
    foot: '2026 / MIT / by GenrecAI',
    shot: 'public/shots/hailbrowser-hero.png',
  },
  {
    out: 'public/og/selectstar.png',
    accent: '#2DD4BF',
    label: 'AI / Data tools / Open source',
    title: 'SelectStar',
    sub: 'Talk to your database in plain English.',
    foot: '2026 / MIT / by GenrecAI',
    shot: 'public/shots/selectstar-hero.png',
  },
  {
    out: 'public/og/tabble.png',
    accent: '#EA580C',
    label: 'Hospitality / Commerce / Product',
    title: 'Tabble',
    sub: 'Every table becomes your best waiter.',
    foot: '2026 / QR ordering and kitchen display / by GenrecAI',
    shot: 'public/shots/tabble-hero.png',
  },
  {
    out: 'public/og/vsb-feedback.png',
    accent: '#3B82F6',
    label: 'Education / Internal tools / Other work',
    title: 'VSB Feedback',
    size: 92,
    sub: 'Feedback that reaches the people who can act on it.',
    foot: '2024 / VSB Engineering College / by GenrecAI',
    shot: 'public/img/campus.jpg',
  },
  {
    out: 'public/og/work.png',
    accent: '#E23A1F',
    label: 'GenrecAI / Work',
    title: 'The<br>work',
    sub: 'Products, open source and other work: Tabble, LuminaIQ, SelectStar, HailBrowser.',
    foot: 'genrecai.com / work',
    shot: 'public/shots/luminaiq-hero.png',
    big: true,
  },
  {
    out: 'public/og/studio.png',
    accent: '#E23A1F',
    label: 'GenrecAI / Studio',
    title: 'Small by<br>design',
    sub: 'Founded by Shyamnath Sankar and Jai Samyukth B U.',
    foot: 'genrecai.com / Tamil Nadu, India',
    shot: 'public/img/studio.jpg',
    big: true,
  },
];

const html = (c) => `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:Clash;src:url(${font('clash-display-600-normal.woff2')});font-weight:600}
@font-face{font-family:General;src:url(${font('general-sans-400-normal.woff2')});font-weight:400}
@font-face{font-family:Mono;src:url(${font('martian-mono-400-normal.woff2')});font-weight:400}
*{margin:0;box-sizing:border-box}
body{width:1200px;height:630px;background:#0b0c0b;color:#f0eee7;position:relative;overflow:hidden;font-family:General}
.bar{position:absolute;inset:0 0 auto;height:7px;background:${c.accent}}
.bg{position:absolute;inset:0;background:url(${asData('public/img/structure.jpg', 'image/jpeg')}) 70% 40%/cover;opacity:.16}
.bg::after{content:'';position:absolute;inset:0;background:linear-gradient(90deg,#0b0c0b 38%,transparent)}
.label{position:absolute;left:64px;top:58px;font-family:Mono;font-size:17px;letter-spacing:.18em;text-transform:uppercase;color:#bdbdb6;display:flex;gap:14px;align-items:center}
.label i{width:11px;height:11px;background:${c.accent};display:block}
.mark{position:absolute;right:64px;top:58px;font-family:Clash;font-size:21px;letter-spacing:.02em}
.mark b{color:${c.accent}}
h1{position:absolute;left:60px;top:${c.big ? 100 : 104}px;font-family:Clash;font-weight:600;font-size:${c.size ?? (c.big ? 128 : 112)}px;line-height:.86;letter-spacing:-.04em;max-width:${c.big ? 700 : 760}px}
h1 b{color:${c.accent}}
.sub{position:absolute;left:64px;top:${c.big ? 330 : 228}px;font-size:28px;line-height:1.3;color:#d9d8d2;max-width:${c.big ? 520 : 560}px}
.foot{position:absolute;left:64px;bottom:44px;font-family:Mono;font-size:15px;letter-spacing:.14em;text-transform:uppercase;color:#a5a6a0;max-width:${c.big ? 560 : 600}px;line-height:1.6}
.frame{position:absolute;left:${c.big ? 680 : 640}px;top:${c.big ? 330 : 300}px;width:760px;transform:rotate(-4deg);transform-origin:0 0;background:#1d2021;border:1px solid rgba(255,255,255,.14);box-shadow:0 40px 90px rgba(0,0,0,.6)}
.frame .chrome{height:30px;display:flex;gap:7px;align-items:center;padding:0 12px;border-bottom:1px solid rgba(255,255,255,.1)}
.frame .chrome i{width:8px;height:8px;border-radius:50%;background:#555}
.frame .chrome i:first-child{background:${c.accent}}
.frame img{display:block;width:100%}
</style></head><body>
<div class="bg"></div><div class="bar"></div>
<p class="label"><i></i>${c.label}</p>
<p class="mark">GENRECAI<b>.</b></p>
<h1>${c.title}<b>.</b></h1>
<p class="sub">${c.sub}</p>
<p class="foot">${c.foot}</p>
<div class="frame"><div class="chrome"><i></i><i></i><i></i></div><img src="${asData(c.shot, c.shot.endsWith('.jpg') ? 'image/jpeg' : 'image/png')}"></div>
</body></html>`;

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
for (const card of cards) {
  await page.setContent(html(card), { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: card.out });
  console.log('wrote', card.out);
}
await browser.close();
