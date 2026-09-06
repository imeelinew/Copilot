---
id: yunshu-smart-city-normal-029-map-useref-usestate
title: 为什么地图实例用 useRef，不用 useState？
aliases: [能具体解释一下为什么地图实例用 useRef，不用 useState吗？, 从设计取舍看，为什么地图实例用 useRef，不用 useState？, 这个问题在项目中的实际边界是什么？]
category: yunshu-smart-city
difficulty: 进阶
priority: normal
projects: [云枢智慧城市数据平台]
keywords: [useRef, useState, 高德地图, React]
---

# 为什么地图实例用 useRef，不用 useState？

## 核心回答

地图实例、信息窗体和事件绑定是可变对象，它们的变化本身不需要触发 React 渲染。放进 `useState` 会增加无意义的渲染，还容易把实例创建和视图状态混在一起；`useRef` 可以在多次渲染之间保留同一个对象。真正需要影响界面的加载、错误、模式和统计数据仍放在 state 里。这个回答针对的是 React；项目里没有 Vue API，不能把 React 的实现说成 Vue 的 Composition API。

## 回答要点

- 地图实例、信息窗体和事件绑定是可变对象，它们的变化本身不需要触发 React 渲染。
- 放进 useState 会增加无意义的渲染，还容易把实例创建和视图状态混在一起；
- useRef 可以在多次渲染之间保留同一个对象。
- 真正需要影响界面的加载、错误、模式和统计数据仍放在 state 里。

## 面试官可能追问

- 关于“为什么地图实例用 useRef，不用 useState”，数据和视图状态是怎样对应的？
- 数据缺失或组件卸载时如何清理资源并保持页面稳定？
- 你会用哪些指标验证这部分的性能和正确性？

## 代码证据

>
> - [Map.tsx，第 185～212 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Map.tsx:185)：地图实例和覆盖物绑定使用 useRef，加载和错误使用 state。
> - [Map.tsx，第 295～322 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Map.tsx:295)：ref 中实例的创建和卸载清理。
