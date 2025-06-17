---
title: Duplication Is Not the Enemy
url: https://terriblesoftware.org/2025/05/28/duplication-is-not-the-enemy/
date: 2025-06-18
tags:
  - abstraction
  - software-architecture
---
This post is music to my ears. It essentially conveys the same message I've been presenting in a [talk](/talks) called 'Keep yourself DRY.' We are obsessed with deduplicating code into abstractions, but abstractions often don't age well:

> Each new requirement made it slightly worse, but never quite bad enough to refactor. **It’s death by a thousand parameters.**

Having said that, it's also quite difficult to design good abstractions from the beginning. As Matheus says:

> The right time to abstract isn’t when you see duplication — it’s when you understand the pattern.

And if you _do_ abstract early and only later a different pattern emerges, do not be afraid to break the abstraction down and put it back on the drawing board. 
