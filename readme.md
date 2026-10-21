# Consent & Accessibility Audit Tool

A tool that loads a website in a real browser and records what the website does before and after a visitor responds to its cookie consent banner. It also checks the page for accessibility problems.

**Status:** Early development. The current version opens a website and prints every network request the page makes. The features below are being built one step at a time.

## Why this exists

Many websites load tracking scripts (for example, advertising pixels) before a visitor has agreed to tracking. Many websites also have accessibility barriers that make them hard to use for people with disabilities. Both problems are common sources of legal complaints.

This tool produces timestamped evidence of what a page actually does, so findings can be checked and reproduced instead of guessed at.

## Roadmap

Each step is finished and working before the next one starts.

1. **Request capture** *(in progress)*: Open a website in a real browser and list every request the page sends to other servers.
2. **Tracker detection**: Compare those requests against a list of known tracking services and flag the matches.
3. **Before and after consent**: Click the cookie banner's "Accept" or "Reject" button, then separate requests sent before the click from requests sent after the click.
4. **Accessibility scan**: Run [axe-core](https://github.com/dequelabs/axe-core) on the page to find automatically detectable accessibility issues.
5. **Report**: Save results as a JSON file and a simple HTML report, with screenshots and timestamps.

Planned after version 1:

- A React dashboard to view past scans
- A PostgreSQL database to store scan history
- Automated tests and continuous integration with GitHub Actions

## Tech stack

- **Node.js**: runs the scanner
- **[Playwright](https://playwright.dev/)**: controls a real browser and records network requests
- **axe-core**: accessibility testing (planned)
- **TypeScript, React, PostgreSQL**: planned for later versions

## Getting started

### Requirements

- [Node.js](https://nodejs.org/) (LTS version)

### Install

```bash
git clone <this repository's URL>
cd consent-audit
npm install
npx playwright install
```

`npx playwright install` downloads the browsers that Playwright controls.

### Run a scan

Open `scan.mjs` and change the URL passed to `page.goto()` to the site you want to scan. Then run:

```bash
node scan.mjs
```

A browser window opens, loads the page, and every request URL is printed in the terminal.

## Scope and ethics

- This tool only loads publicly available pages, the same way an ordinary visitor would. It does not log in, bypass paywalls, or solve CAPTCHAs.
- Each scan loads a single page. The tool does not crawl or mass-scan websites.
- Example scans in this repository use public websites or test pages I built myself. No client or employer data is used anywhere in this project.
- Results are automated observations, not legal conclusions. An automated accessibility scan cannot determine whether a website complies with the ADA or any other law; it catches only a portion of accessibility issues.

## Use of AI assistance

I use AI tools openly while building this project. I direct the design, write the core logic myself, and verify AI suggestions by running and testing them. A log of how AI was used and how its output was checked is kept in `docs/ai-log.md` (coming soon).