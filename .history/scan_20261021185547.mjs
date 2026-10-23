import { chromium } from '@playwrite/test';

const browser = await chromium.launch({ headless: false })
const page = await browser.newPage()

page.on('request', (request) => {
    console.log(request.url());
});

await page.goto('https://example.com')
await browser.close();