---
title: Stable Chat: one endpoint for many AI providers
summary: A universal AI endpoint layer that lets apps switch between providers through one API.
date:              # YYYY-MM-DD, e.g. 2025-06-01
role: AI Systems Architect
area: Generative AI
tags: [Node.js, Docker, Kubernetes, OpenAI API, Claude API]
cover:             # e.g. /media/stable-chat-ai-gateway/cover.jpg
project: Stable Chat
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

- Built infrastructure supporting multiple AI service providers behind a unified API.
- Auto-scaling and real-time monitoring.

> **To write:** the key decisions and the trade-offs you weighed, at box-and-arrow level. A simple diagram helps: `![Architecture overview](/media/stable-chat-ai-gateway/architecture.png)`. No code, prompts or internal names.

## Outcome

- 5+ providers supported.
- Response time under 200ms.

> **To write:** two or three measured results. Rounded numbers or percentages are fine; only claims you can back up.

## Lessons

> **To write:** what you'd tell another team taking on something similar.
