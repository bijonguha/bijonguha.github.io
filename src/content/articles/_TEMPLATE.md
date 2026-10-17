---
title: A short, specific title
summary: One sentence for cards and link previews.
date: 2026-01-01
area: Generative AI          # Generative AI, Computer Vision, Production ML, Mathematical Foundations, Developer Tools...
tags: [Tag one, Tag two]
cover: /media/articles/my-article/cover.png   # optional, 16:9 works best; shown on the card and at the top
gallery: [/media/articles/my-article/1.png, /media/articles/my-article/demo.gif]   # optional, extra images, GIFs or videos shown as a gallery
project:                     # optional, a project's exact name to link its card here
featured: false
draft: true                  # set to false to publish
---

Copy this file into src/content/articles/, rename it (the file name becomes the URL:
/writing/<file-name>) and write in Markdown. Put images, GIFs and videos in
public/media/articles/<your-article>/.

## A heading

Normal paragraphs, **bold**, *italic*, [links](https://example.com), `inline code`.

- Bullet lists
- and numbered lists

| Tables | work |
| ------ | ---- |
| too    | yes  |

```python
print("Code blocks are highlighted as plain code")
```

An image:

![What the image shows](/media/articles/my-article/diagram.png)

A GIF (works exactly like an image):

![The agent clicking through the app](/media/articles/my-article/demo.gif)

A video (an image link that ends in .mp4 or .webm becomes a player):

![Walkthrough video](/media/articles/my-article/walkthrough.mp4)

> Quotes and call-outs use a leading ">".

A diagram (drawn by the site, follows light/dark mode):

```mermaid
flowchart LR
  A["Input"] --> B["Processing"] --> C["Output"]
```
*Figure 1. One-line caption.*
