## How and When LLM's were used to assist in project development

### Wanted insight into different methods of capturing network data:
- Wait until page loads and miss late requests
- Wait a specific amount of time after page loads and still likely miss late requests
- Wait for x seconds, which is too ham-handed
- Wait for page load, then x seconds after, but still might miss late loads on ad-heavy or poorly designed sites
- wait until network traffic is idle, which never happens on some sights
<hr>
- The esablished direction will involve a combined approach that waits x seconds after networkIdle, but never more than y seconds to handle those sites that seemingly never stop facilitating network events