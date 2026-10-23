import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: false })
const page = await browser.newPage()

page.on('request', (request) => {
    console.log(request.url());
});

await page.goto('https://motherjones.com',{
    // waitUntil: 'domcontentloaded',
    timeout: 60_000
});
await browser.close();