export type ScenarioName = 'no-interaction' | 'accept' | 'reject';

export type CapturedRequest = {
    url: string;
    method: string;
    resourceType: string;
    observedAt: number;
    postData: string | null;
    frameUrl: string;
}

export type ListeningResult = {
    quietMs: number;
    maxMs: number;
    stopReason: 'quiet' | 'max-time';
}

export type ScenarioResult = {
    name: ScenarioName;
    finalUrl: string;
    requests: CapturedRequest[];
    listening: ListeningResult;
}

export type ScanOptions = {
    url: string;
    quietMs: number;
    maxMs: number;
}

export type ScanResult = {
    url: string;
    finalUrl: string;
    startedAt: number;
    finishedAt: number;
    scenarios: ScenarioResult[];
}