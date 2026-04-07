---
slug: case-against-rpa
locale: en
category: essay
title: The Case Against RPA
subtitle: Why robotic process automation addresses the wrong layer of the problem
date: '2024-11-15'
readMinutes: 10
tags: []
sources: []
status: published
series: tools
seriesOrder: 1
---

Robotic Process Automation had a compelling thesis: automate the repetitive clicks and data entry that humans shouldn't be doing. The execution, in most enterprises, has been disappointing. RPA bots are brittle, expensive to maintain, and address symptoms rather than causes.

The fundamental issue is that RPA operates at the UI layer. It mimics human actions within existing interfaces — clicking buttons, copying fields, navigating menus. This means it inherits all the inefficiencies of the interfaces themselves. When an interface changes (a UI update, a field relocation, a workflow modification), the bot breaks.

More importantly, RPA automates individual tasks, not coordination. It can copy a value from System A to System B, but it can't reason about whether that value is correct, whether the downstream process should actually be triggered, or whether an exception requires human attention.

Agent systems operate at a fundamentally different layer. Instead of mimicking the UI, they connect directly to system APIs and data layers. Instead of automating individual tasks, they orchestrate entire workflows — aggregating signals, routing decisions, and triggering execution across multiple systems simultaneously.

The difference is architectural: RPA is task automation at the interface layer. Agent systems are coordination automation at the data layer. One is a band-aid on a broken process. The other is a structural fix.

There are valid use cases for RPA — specifically, legacy systems with no API and no alternative integration path. But for organizations with modern enterprise systems (ERP, MES, WMS with API capabilities), agent-based coordination is the architecturally sound approach.
