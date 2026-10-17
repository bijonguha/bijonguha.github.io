---
title: A short, specific title
summary: One sentence for cards and link previews.
date: 2026-01-01
client: Global automotive manufacturer   # a real name only if your NDA allows it
logo:                        # optional: bosch, cargill, compass-digital, ford, intel, neom, qpiai, siemens
role: Your role
area: Generative AI          # Generative AI, Computer Vision, Production ML, Mathematical Foundations, Developer Tools...
tags: [Tag one, Tag two]
cover: /media/my-case-study/cover.jpg   # optional, 16:9 works best
gallery: []                  # optional, e.g. [/media/my-case-study/1.png, /media/my-case-study/demo.gif]
project:                     # optional, a project's exact name to link its card here
featured: false              # true = shown first on the homepage
draft: true                  # set to false to publish
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

Copy this file, rename it (the file name becomes the URL: /case-studies/<file-name>) and
write in Markdown. Share how you think and what you learned, not the client's secrets.

## Context

The industry, the scale and who the users were.

## Challenge

What made it hard: data, scale, latency, safety, accuracy or adoption.

## Approach

The key decisions and the trade-offs you weighed, at box-and-arrow level.

```mermaid
flowchart LR
  U(["Users"]) --> A["Application"]
  A --> M["Model or service"]
  M --> D[("Data store")]
```
*Figure 1. One-line caption explaining the diagram.*

See instruction-write-case-studies.md, section 8, for diagram types and rules.

## Outcome

- Two or three measured results, rounded if needed.

## Lessons

What you'd tell another team taking on something similar.
