import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import { setTimeout as sleep } from 'node:timers/promises';

const QUIET_MS = 10_000;
const MAX_MS = 40_000;
const POLLING_MS = 250;


// temporary hard-coded before this becomes a cli
const TARGET_URL = 'https://bbc.com';
let domainName = null;

const browser = await chromium.launch({ headless: false })
// const page = await browser.newPage()
const context = await browser.newContext();
const page = await context.newPage();

let allRequests = []

// page.on('request', (request) => {
//     // set the lastRequestAt variable to keep track of how long the request has taken
//     lastRequestAt = Date.now();
//     allRequests.push(request)
// });


// await page.goto('https://www.bbc.com/',{
//     waitUntil: 'load',
//     timeout: 60_000
// });

const listenStartedAt = Date.now();
// await sleep(MAX_MS);


// set domain name
domainName = new URL(TARGET_URL).hostname;


// populate test-results/last-run.json
// const requestData = allRequests.map((request) => ({
//     url: request.url(),
//     method: request.method(),
//     resourceType: request.resourceType(),
//     timeObserved: Date.now(),
//     postData: request.postData(),
//     frameUrl: request.frame().url()
// }));

// creating a new "lastRequestAt" for every request. once its been quiet for
// QUIET_MS, xor up to MAX_MS, stop listening and close the page
let lastRequestAt = Date.now();
page.on('request', (request) => {
    lastRequestAt = Date.now();
    allRequests.push({
        url: request.url(),
        method: request.method(),
        resourceType: request.resourceType(),
        timeObserved: Date.now(),
        postData: request.postData(),
        frameUrl: request.frame().url()
    });
});


// silent loop logic 
await page.goto(TARGET_URL);
const pageOpenStartedAt = Date.now();
const polling = 250

// This is a solution that avoids the undesirable networkTimeout playwright method
// Rather than wait for a page to finish loading requests (some sites never do),
//      this approach establishes a max-wait time, but then also will stop listening for
//      requests if its been over 10 seconds since the last network request.
console.log('loop starting')
while(true){
    let timeElapsedSinceLastRqst = Date.now() - lastRequestAt
    let totalElapsedTime = Date.now() - pageOpenStartedAt

    if(timeElapsedSinceLastRqst > 10_000) {
        console.log('no requests in 10 seconds')
        break;
    }
    if(totalElapsedTime > 30_000) {
        console.log('time limit exceeded')
        break;
    }
    await sleep(polling);
}


// writing results

const folderPath = `${domainName}_${Date.now()}_no-interaction`

await mkdir('scans', { recursive: true });
await writeFile(
    `scans/${folderPath}.json`,
    JSON.stringify(allRequests, null, 2),
    'utf-8'
);

console.log("closing context");
await context.close();
console.log("closing browser");
await browser.close();



