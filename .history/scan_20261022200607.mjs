import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: false })
const page = await browser.newPage()

let allRequests = []

page.on('request', (request) => {
    // console.log(request.url());
    allRequests.push(request)
});

await page.goto('https://example.com',{
    // waitUntil: 'domcontentloaded',
    timeout: 60_000
});
await browser.close();

// populate test-results/last-run.json
allRequests.forEach((rqst) => {
    console.log(rqst)
})