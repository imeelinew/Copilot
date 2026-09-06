---
id: yunshu-smart-city-followup-022-map-useref-usestate
title: 地图和 ECharts 实例为什么用 useRef，不放 useState？切换页面如何清理？
aliases: [能具体解释一下地图和 ECharts 实例为什么用 useRef，不放 useState？切换页面如何清理吗？, 从设计取舍看，地图和 ECharts 实例为什么用 useRef，不放 useState？切换页面如何清理？, 这个问题在项目中的实际边界是什么？]
category: yunshu-smart-city
difficulty: 进阶
priority: normal
projects: [云枢智慧城市数据平台]
keywords: [ECharts, useRef, useState, 高德地图, React, 数据可视化]
---

# 地图和 ECharts 实例为什么用 useRef，不放 useState？切换页面如何清理？

## 核心回答

地图和 ECharts 实例是需要跨渲染保留的命令式对象，调用它们的方法不会直接改变 React 页面结构，所以放在 `useRef` 里更合适；加载状态、模式和业务数据会影响界面，才放进 `useState`。ref 更新不会触发重渲染，因此地图创建后又用 `mapGeneration` 通知覆盖物逻辑可以开始。地图切换模式时先解绑旧点击事件并移除覆盖物，卸载时断开 ResizeObserver、关闭信息窗体并销毁地图；ECharts 则移除 window resize 监听并 dispose。当前不足是图表只监听窗口大小，侧栏折叠导致容器单独变化时可能漏掉，后续可以像地图一样观察实际容器。

## 回答要点

- 地图和 ECharts 实例是需要跨渲染保留的命令式对象，调用它们的方法不会直接改变 React 页面结构，所以放在 useRef 里更合适；
- 加载状态、模式和业务数据会影响界面，才放进 useState。
- ref 更新不会触发重渲染，因此地图创建后又用 mapGeneration 通知覆盖物逻辑可以开始。
- 地图切换模式时先解绑旧点击事件并移除覆盖物，卸载时断开 ResizeObserver、关闭信息窗体并销毁地图；

## 面试官可能追问

- 关于“地图和 ECharts 实例为什么用 useRef，不放 useState？切换页面如何清理”，数据和视图状态是怎样对应的？
- 数据缺失或组件卸载时如何清理资源并保持页面稳定？
- 你会用哪些指标验证这部分的性能和正确性？

## 代码证据

>
> - [Map.tsx，第 185～212 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Map.tsx:185)：地图实例、覆盖物和监听器使用 ref 保存并统一清理。
> - [Map.tsx，第 295～330 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Map.tsx:295)：创建地图、更新 generation、监听容器和卸载销毁。
> - [ChartRenderImpl.tsx，第 13～38 行](/Users/aaron/personal-hub/apps/project-1/src/components/ChartRenderImpl.tsx:13)：ECharts 初始化、窗口 resize 监听和 dispose。
