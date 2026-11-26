---
title: "Signal & Motion"
summary: "An interface study on scroll pacing, smoothstep blending, and quiet transitions."
cover: "../../assets/signal.svg"
coverAlt: "Curved luminous signal waves layered over a dark violet field"
theme: "night"
---

Good motion rarely asks for attention. Instead, it gives your eye a cue for where you are and where the page is carrying you next.

## Measuring rhythm instead of adding effects

Most scroll experiences break down when transitions fight the reader's hand. In this study, every background shift is driven by a single bounded smoothstep function mapping a chapter's viewport position into `0..1`. Opacity and subtle parallax stay predictable across trackpads, touch screens, and fast scroll wheels.

## Accessible by default

Motion only runs as a progressive enhancement. When a visitor prefers reduced motion or browses without JavaScript, every chapter, image, and link stays immediately legible in the exact same order.
