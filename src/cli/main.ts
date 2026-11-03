import { mkdir, writeFile } from 'node:fs/promises';
import { parseArgs } from 'node:util';
import { scan } from '../scanner/scan.ts';

// writing results
// const folderPath = `${domainName}_${Date.now()}_no-interaction`

const { values, positionals } = parseArgs({
    allowPositionals: true,
    options: {
        'quiet-ms': {type: 'string', default: '5000'},
        'max-ms': { type: 'string', default: '30000'}
    },
});

const url = positionals[0];
const folderPath = `${ url }`

await mkdir('scans', { recursive: true });
await writeFile(
    `scans/${folderPath}.json`,
    JSON.stringify(allRequests, null, 2),
    'utf-8'
);