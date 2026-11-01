## How and When LLM's were used to assist in project development

### Wanted insight into different methods of capturing network data:
- Wait until page loads and miss late requests
- Wait a specific amount of time after page loads and still likely miss late requests
- Wait for x seconds, which is too ham-handed
- Wait for page load, then x seconds after, but still might miss late loads on ad-heavy or poorly designed sites
- wait until network traffic is idle, which never happens on some sights

<b>Claude's input: </b>Claude had sent me in a direction that would involve a combined approach that waits x seconds after networkIdle, but never more than y seconds to handle those sites that seemingly never stop facilitating network events
<br></br>
<b>What I ended up doing: </b>After some thinking and testing, claude was leading me down a path that the playwright docs specifically say not to go in; namely the use of networkIdle. I had a feeling that networkIdle could result in an infinite run and I was correct. The final polling approach that I went with was in the spirit of where Claude was headed, but without using undesired methods and taking a more curated common sense approach. 

<b>The Approach: </b>For every request, record the time that the request was processed in. within a while(true) loop, check to see if its been more than x seconds since the last request, and check if its been over 30 total seconds that the entire scan has run. if it's been more than 30 total seconds, stop listening and record the reason why the listening stopped, and if its been under 30 total seconds but its been more than 10 seconds since the last request came in, record the quiet timeout and close the browser context.
<hr>
## 2026-11-01: Script that never exited

**Questioned:** why the scan finished and wrote its output file, but the process kept running.<br>
**Did instead:** added logging to trace the shutdown steps, found that the page and context were closed but the browser wasn't, and added `await browser.close()`.
<hr>
<br>

