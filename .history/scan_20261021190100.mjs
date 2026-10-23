import { chromium } from '@playwright/test';

const browser = await chromium.launch({ headless: false })
const page = await browser.newPage()

page.on('request', (request) => {
    console.log(request.url());
});

await page.goto('https://motherjones.com')
await browser.close();