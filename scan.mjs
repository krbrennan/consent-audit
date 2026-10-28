import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import { setTimeout as sleep } from 'node:timers/promises';

const LISTEN_MS = 10_000;

const browser = await chromium.launch({ headless: false })
const page = await browser.newPage()

let allRequests = []

page.on('request', (request) => {
    // console.log(request.url());
    allRequests.push(request)
});


// await page.goto('https://www.bbc.com/',{
//     waitUntil: 'load',
//     timeout: 60_000
// });
await page.goto('https://bbc.com');
await sleep(LISTEN_MS);


// populate test-results/last-run.json
const requestData = allRequests.map((request) => ({
    url: request.url(),
    method: request.method(),
    resourceType: request.resourceType(),
    timeObserved: Date.now(),
    // add postData in later, too much data to parse at this stage
    // postData: request.postData(),
    frameUrl: request.frame().url()
}));

// All Post Requests
// const requestDataPost = allRequests
//     .filter((request) => { return request.method() == "POST" })
//     .map((request) => ({
//         url: request.url(),
//         method: request.method(),
//         resourceType: request.resourceType()
//     }))
    


await mkdir('test-results', { recursive: true });
await writeFile(
    'test-results/last-run.json',
    JSON.stringify(requestData, null, 2),
    'utf-8'
);

await browser.close();

