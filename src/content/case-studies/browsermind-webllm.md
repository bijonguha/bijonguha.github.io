---
title: Browsermind: private AI chat that runs in the browser
summary: Running LLMs locally in the browser with WebLLM, so no chat data leaves the device.
date:              # YYYY-MM-DD, e.g. 2025-06-01
role: Generative AI Engineer
area: Generative AI
tags: [WebLLM, WebAssembly, Transformers.js]
cover:             # e.g. /media/browsermind-webllm/cover.jpg
project: Browsermind
draft: true
# ---------------------------------------------------------------------------
# Confidentiality checklist (these # lines are notes for you; they never show on the site)
#  [ ] Client named only if your NDA allows it or they approved. Otherwise use a
#      description, e.g. "client: Global automotive manufacturer", and leave logo empty.
#  [ ] No source code, prompts, configs, schemas, endpoints or internal system names.
#  [ ] No client data, and no screenshots showing real records.
#  [ ] Results as rounded numbers or percentages; no contract values or unreleased plans.
#  [ ] Diagrams at box-and-arrow level only.
# ---------------------------------------------------------------------------
---
## Context

> **To write:** the industry, the scale and who the users were. Describe the client in general terms if you can't name them.

## Challenge

> **To write:** what made this hard: data, scale, latency, safety, accuracy or adoption. Two or three sentences.

## Approach

- Implemented WebLLM to run AI models locally, with no server.
- Supports 5 different models.
- Inference runs in the browser, so no data is sent anywhere.

> **To write:** the key decisions and the trade-offs you weighed, at box-and-arrow level. A simple diagram helps: `![Architecture overview](/media/browsermind-webllm/architecture.png)`. No code, prompts or internal names.

## Outcome

- 5 models supported.
- 100% of inference on the user's device.

> **To write:** two or three measured results. Rounded numbers or percentages are fine; only claims you can back up.

## Lessons

> **To write:** what you'd tell another team taking on something similar.
