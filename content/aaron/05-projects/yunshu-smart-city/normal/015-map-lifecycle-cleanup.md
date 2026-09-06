---
id: yunshu-smart-city-normal-015-map-lifecycle-cleanup
title: 亮点 3：地图数据部分失败和命令式资源生命周期管理
aliases: [请介绍一下项目中的地图数据部分失败和命令式资源生命周期管理。, 你在地图数据部分失败和命令式资源生命周期管理方面具体做了什么？, 这部分的设计思路和边界是什么？]
category: yunshu-smart-city
difficulty: 深入
priority: high
projects: [云枢智慧城市数据平台]
keywords: [高德地图, Promise.allSettled, Promise.all, React]
---

# 亮点 3：地图数据部分失败和命令式资源生命周期管理

## 核心回答

环境地图要对多个城市分别请求数据，最直接的 `Promise.all` 会在其中一个请求失败时让整批结果都进 catch，用户看不到已经成功的城市。当前实现改用 `Promise.allSettled`，把成功数据和失败数量分别收集，地图继续画成功的圆，同时用警告说明有多少城市失败。地图本身又是命令式对象，React 重新渲染不会自动替我清理第三方事件，所以覆盖物、点击处理器、信息窗体和 `ResizeObserver` 都有明确的创建与销毁流程。它的限制是没有单城市重试，也没有区分超时、无数据和业务错误；大量覆盖物时也还没有做聚合或虚拟化。我会让一个环境接口失败、其余成功，确认地图仍显示可用城市，再反复切换模式和离开页面，检查覆盖物、事件和尺寸监听没有累积。

## 回答要点

- 环境地图要对多个城市分别请求数据，最直接的 Promise.all 会在其中一个请求失败时让整批结果都进 catch，用户看不到已经成功的城市。
- 当前实现改用 Promise.allSettled，把成功数据和失败数量分别收集，地图继续画成功的圆，同时用警告说明有多少城市失败。
- 地图本身又是命令式对象，React 重新渲染不会自动替我清理第三方事件，所以覆盖物、点击处理器、信息窗体和 ResizeObserver 都有明确的创建与销毁流程。
- 它的限制是没有单城市重试，也没有区分超时、无数据和业务错误；

## 面试官可能追问

- 关于“地图数据部分失败和命令式资源生命周期管理”，数据和视图状态是怎样对应的？
- 数据缺失或组件卸载时如何清理资源并保持页面稳定？
- 你会用哪些指标验证这部分的性能和正确性？

## 代码证据

>
> - [Map.tsx，第 185～212 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Map.tsx:185)：地图对象引用和覆盖物事件清理函数。
> - [Map.tsx，第 236～293 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Map.tsx:236)：多城市环境请求的部分成功处理。
> - [Map.tsx，第 295～322 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Map.tsx:295)：地图、信息窗体和 ResizeObserver 的创建及销毁。
> - [Map.tsx，第 324～387 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Map.tsx:324)：模式变化时重建覆盖物并解绑事件。
> - [Map.tsx，第 467～474 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Map.tsx:467)：部分城市失败的用户提示。
