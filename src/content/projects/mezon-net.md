---
title: "Mezon.NET"
summary: "A four-layer .NET SDK and real-time socket engine for the Mezon platform — spanning Protobuf contracts, TCP/WebSocket transport, gRPC MMN nodes, and ZK proving."
cover: "../../assets/projects/mezon-net.svg"
coverAlt: "Four-layer architectural blueprint of Mezon.NET showing Sdk, Client and Mmn, Transport, and Core layers"
theme: "night"
atmosphere: "spores"
repoUrl: "https://github.com/huy-buidoanquang/Mezon.NET"
stack: ["C#", ".NET 6+ / netstandard", "Protobuf", "gRPC", "TCP / WebSocket", "ZK Prove"]
year: "2025 – 2026"
role: "Architecture & SDK Engineering"
order: 1
---

**Mezon.NET** is an open-source, multi-package .NET SDK built to serve both bot/channel-app developers and full real-time UI/client applications on the Mezon platform without forcing either group to absorb the other's complexity.

## Four cleanly separated layers

Instead of bundling protocol contracts, raw socket plumbing, and high-level bot ergonomics into one monolithic library, the architecture separates concerns into four focused layers:

- **`Mezon.Net.Sdk`** — High-level Bot & Channel-App facade (`MezonClient`, `Clan`/`Channel`/`Role`/`Message`/`User` entities, dependency injection, past-tense events like `ChannelMessageReceived`, interactive builders, quick menus, and MMN/SSE integration).
- **`Mezon.Net.Mmn`** — Dedicated MMN gRPC node client paired with a Zero-Knowledge (`ZK`) proving HTTP client for `.NET 6+` workloads.
- **`Mezon.Net.Client`** — Full socket engine (`cid` request/response map, `Envelope` framing, API-over-socket calls, and real-time event facades on `BaseMezonSocketClient`).
- **`Mezon.Net.Transport` & `Mezon.Net.Core`** — Pluggable transport supporting both primary TCP connections and browser WebSockets, grounded on shared Protobuf schemas, protocol maps, and typed options.

## Two audiences, two clean entry points

Bot developers only need to reference **`Mezon.Net.Sdk`** — it pulls in `Mezon.Net.Client` (and `Mezon.Net.Mmn` on `.NET 6+`) transitively while presenting a minimal, strongly typed developer surface. Meanwhile, teams building rich desktop, mobile, or browser clients can drop directly down to **`Mezon.Net.Client`** and **`Mezon.Net.Transport`** for complete lifecycle control.
