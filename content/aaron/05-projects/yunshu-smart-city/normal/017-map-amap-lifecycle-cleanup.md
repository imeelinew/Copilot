---
id: yunshu-smart-city-normal-017-map-amap-lifecycle-cleanup
title: 难点 2：把高德地图的命令式对象放进 React 生命周期
aliases: [请介绍一下项目中的把高德地图的命令式对象放进 React 生命周期。, 你在把高德地图的命令式对象放进 React 生命周期方面具体做了什么？, 这部分的设计思路和边界是什么？]
category: yunshu-smart-city
difficulty: 深入
priority: high
projects: [云枢智慧城市数据平台]
keywords: [React, 高德地图, 组件设计, useRef]
---

# 难点 2：把高德地图的命令式对象放进 React 生命周期

## 核心回答

地图难点不是写一个 Marker，而是第三方地图对象不会因为 React 状态变化自动销毁。比如用户从城市模式切到环境模式，如果只在新状态下继续 `new Circle`，旧 Marker 和旧点击事件仍会留在地图上；开发环境的严格模式还可能让副作用经历额外的挂载和清理，更容易暴露重复实例问题。当前代码用 `useRef` 保存不会参与视图渲染的地图实例和覆盖物绑定，每次模式或数据变化先统一解绑旧事件、移除覆盖物，再创建新覆盖物；组件卸载时断开尺寸观察、关闭信息窗体并销毁地图。限制是 SDK 加载本身不能真正取消，只是用 `active` 标记忽略卸载后的结果；覆盖物数量增大时还需要点聚合等方案。我会连续切换模式、调整容器大小和反复进入退出页面，通过地图覆盖物数量及监听器状态检查是否泄漏。

## 回答要点

- 地图难点不是写一个 Marker，而是第三方地图对象不会因为 React 状态变化自动销毁。
- 比如用户从城市模式切到环境模式，如果只在新状态下继续 new Circle，旧 Marker 和旧点击事件仍会留在地图上；
- 开发环境的严格模式还可能让副作用经历额外的挂载和清理，更容易暴露重复实例问题。
- 当前代码用 useRef 保存不会参与视图渲染的地图实例和覆盖物绑定，每次模式或数据变化先统一解绑旧事件、移除覆盖物，再创建新覆盖物；

## 面试官可能追问

- 关于“把高德地图的命令式对象放进 React 生命周期”，数据和视图状态是怎样对应的？
- 数据缺失或组件卸载时如何清理资源并保持页面稳定？
- 你会用哪些指标验证这部分的性能和正确性？

## 代码证据

>
> - [Map.tsx，第 185～234 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Map.tsx:185)：第三方实例引用、统一清理以及异步 SDK 的 active 标记。
> - [Map.tsx，第 295～322 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Map.tsx:295)：地图实例和 ResizeObserver 生命周期。
> - [Map.tsx，第 324～387 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Map.tsx:324)：模式变化时覆盖物及点击事件的替换过程。
