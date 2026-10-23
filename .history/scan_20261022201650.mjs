import { chromium } from 'playwright';
import { mkDir, writeFile } from 'node:fs/promises';

const browser = await chromium.launch({ headless: false })
const page = await browser.newPage()

let allRequests = []

page.on('request', (request) => {
    // console.log(request.url());
    allRequests.push(request)
});

await page.goto('https://www.wikipedia.org/',{
    // waitUntil: 'domcontentloaded',
    timeout: 60_000
});

// populate test-results/last-run.json
const requestData = allRequests.map((request) => ({
    url: request.url(),
    method: request.method(),
    resourceType: request.resourceType()
}));

await mkdir('test-results', { recursive: true });
await writeFile(
    'test-results/last-run.json',
    JSON.stringify(requestData, null, 2),
    'utf-8'
);

await browser.close();

