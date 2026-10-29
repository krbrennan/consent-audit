import { chromium } from 'playwright';
import { setTimeout as sleep } from 'node:timers/promises';

export type CapturedRequest = {
    url: string;
    method: string;
    resourceType: string;
    observedAt: number;
    postData: string | null;
    frameUrl: string;
}

export type ScanOptions = {
    url: string;
    listenMs: number;
}

export async function scan(options:
    ScanOptions): Promise<CapturedRequest[]> {

    }