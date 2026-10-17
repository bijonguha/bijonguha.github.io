---
title: Content Intelligence: agent skills that document any web app
summary: A no-code, skills-based extension for AI coding tools that explores a live app and produces docs and narrated videos.
date:              # YYYY-MM-DD, e.g. 2025-06-01
role: Creator & Lead Engineer
area: Generative AI
tags: [Agent skills, Playwright MCP, Claude, Amazon Polly, ffmpeg]
cover:             # e.g. /media/content-intelligence-agent-skills/cover.jpg
project: Content Intelligence
featured: true
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

- Packaged the whole pipeline as portable agent skills for AI coding tools such as Kiro, Claude Code and Codex. There is no app-specific code.
- The agent reads the app's code and API contracts, discovers user personas and workflows, then drives a real browser.
- Each key screen is captured and annotated with one highlighted element and a learner-style caption.
- An LLM writes narration that must pass five automatic checks: eye cue, no invention, coverage, no meta talk and length.
- Text-to-speech and ffmpeg render a captioned video per topic. Renders are fingerprinted, so only changed topics re-render.
- A person approves every video before it is published.

> **To write:** the key decisions and the trade-offs you weighed, at box-and-arrow level. A simple diagram helps: `![Architecture overview](/media/content-intelligence-agent-skills/architecture.png)`. No code, prompts or internal names.

![Content Intelligence walkthrough](/media/content-intelligence/demo.mp4)

> Add `demo.mp4` to `public/media/content-intelligence/` or remove the line above.

## Outcome

- Used in production in enterprise healthcare.
- A full role captured in 1–3 hours of agent time.
- 60–90 second narrated videos per topic, with no screen recording or voice-over.

> **To write:** two or three measured results. Rounded numbers or percentages are fine; only claims you can back up.

## Lessons

> **To write:** what you'd tell another team taking on something similar.
