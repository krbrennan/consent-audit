import type { Browser } from 'playwright';
import { setTimeout as sleep } from 'node:timers/promises';
// import { setTimeout as sleep } from 'node:timers/promises';
import type { 
    CapturedRequest,
    ScanOptions,
    ScanResult,
    ScenarioName,
    ScenarioResult 
    } from '../types.ts';

const CHECK_EVERY_MS = 250;

// export async function runScenario(options:
//     ScanOptions): Promise<CapturedRequest[]> {

//     }

async function runScenario(
    browser: Browser, 
    name: ScenarioName, 
    options: ScanOptions
): Promise<ScenarioResult> {
    const context = await browser.newContext();
    const page = await context.newPage();

    const requests: CapturedRequest[] =[];

    const listenStartedAt = Date.now();

    let lastRequestAt = Date.now();

    page.on('request', (request) => {
        lastRequestAt = Date.now();
        requests.push({
            url: request.url(),
            method: request.method(),
            resourceType: request.resourceType(),
            observedAt: Date.now(),
            postData: request.postData(),
            frameUrl: request.frame().url()
        });
    });
    await page.goto(options.url)
    const polling = 250;

    // This is a solution that avoids the undesirable networkTimeout playwright method
    // Rather than wait for a page to finish loading requests (some sites never do),
    //      this approach establishes a max-wait time, but then also will stop listening for
    //      requests if its been over 10 seconds since the last network request.
    console.log('loop starting')
    while(true){
        let timeElapsedSinceLastRqst = Date.now() - lastRequestAt
        let totalElapsedTime = Date.now() - listenStartedAt
    
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

    const stopReason = Date.now() - listenStartedAt >= options.maxMs ? 'max-time': 'quiet';
    
    const finalUrl = page.url();
    await context.close();

    return {
        name,
        finalUrl,
        requests,
        listening: { quietMs: options.quietMs, maxMs: options.maxMs, stopReason},
    };
    
}