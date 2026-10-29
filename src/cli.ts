#!/usr/bin/env node

import { scan } from "./scan.js";

async function main(): Promise<void> {
	const args = process.argv.slice(2);
	const target = args[0];

	if (!target) {
		console.error("Usage: accessibility-checker <url-or-file>");
		process.exitCode = 1;
		return;
	}

	await scan({target});
}

main().catch((error: unknown) => {
	console.error(error instanceof Error ? error.message : error);
	process.exitCode = 1;
});
