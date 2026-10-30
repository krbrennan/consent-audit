import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import { setTimeout as sleep } from 'node:timers/promises';

const TARGET_URL = 'https://bbc.com';

let domainName = null;

const QUIET_MS = 10_000;
const MAX_MS = 15_000;
const CHECK_EVERY_MS = 5_000;
let lastRequestAt = 0;
// const LISTEN_MS = 10_000;

const browser = await chromium.launch({ headless: false })
// const page = await browser.newPage()
const context = await browser.newContext();
const page = await context.newPage();

let allRequests = []

page.on('request', (request) => {
    // console.log(request.url());
    // set the lastRequestAt variable to keep track of how long the request has taken
    lastRequestAt = Date.now();
    allRequests.push(request)
});


// await page.goto('https://www.bbc.com/',{
//     waitUntil: 'load',
//     timeout: 60_000
// });
await page.goto(TARGET_URL);
await sleep(MAX_MS);
// set domain name
domainName = new URL(TARGET_URL).hostname;


// populate test-results/last-run.json
const requestData = allRequests.map((request) => ({
    url: request.url(),
    method: request.method(),
    resourceType: request.resourceType(),
    timeObserved: Date.now(),
    postData: request.postData(),
    frameUrl: request.frame().url()
}));

const folderPath = `${domainName}_${Date.now()}_no-interaction`

await mkdir('scans', { recursive: true });
await writeFile(
    `scans/${folderPath}.json`,
    JSON.stringify(requestData, null, 2),
    'utf-8'
);

await context.close();
await browser.close();

