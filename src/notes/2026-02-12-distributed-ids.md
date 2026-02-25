---
title: Distributed ID Formats Are Architectural Commitments, Not Just Data Types
url: https://piljoong.dev/posts/distributed-id-generation-complicated/
date: 2026-02-12
tags:
  - software-architecture
  - uuid
---
While the post presents an entirely new ID format for specific needs, it also nicely summarizes the available ID format options, along with thoughts on where each of them is useful and where they fall short.

> If you’ve got a single database and no plans to shard, use auto-increment. If you just need uniqueness and don’t care about ordering, UUIDv4 is fine. If you want time ordering without coordination and moderate concurrency is good enough, go with ULID or UUIDv7.
