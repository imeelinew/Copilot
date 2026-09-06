---
id: yunshu-smart-city-followup-023-lazy-loading
title: 追问：你说做了懒加载，具体什么时候加载？怎么证明性能真的变好了？
aliases: [能具体解释一下你说做了懒加载，具体什么时候加载？怎么证明性能真的变好了吗？, 从设计取舍看，你说做了懒加载，具体什么时候加载？怎么证明性能真的变好了？, 这个问题在项目中的实际边界是什么？]
category: yunshu-smart-city
difficulty: 进阶
priority: normal
projects: [云枢智慧城市数据平台]
keywords: [性能优化, 路由懒加载, 组件设计, 验证方法, ECharts, React]
---

# 追问：你说做了懒加载，具体什么时候加载？怎么证明性能真的变好了？

## 核心回答

路由页面通过 `React.lazy` 按访问路径加载，`Suspense` 在代码到达前显示占位；图表组件还做了第二层延迟，只有满足它的可见和交互条件后才加载真正的 ECharts 实现。这样从代码行为上能说明资源被推迟加载，但不能直接说性能提高了多少。当前图表逻辑还要求本次挂载后发生过用户交互，或者页面初始化时已经滚动，因此用户停在页面不操作时可能一直看到占位，这是需要验证的体验边界。要证明收益，我会在相同设备和网络下对比首屏资源体积、主线程时间和图表首次可用时间，同时覆盖无交互、慢网和低性能设备；没有实测数据时不报百分比。

## 回答要点

- 路由页面通过 React.lazy 按访问路径加载，Suspense 在代码到达前显示占位；
- 图表组件还做了第二层延迟，只有满足它的可见和交互条件后才加载真正的 ECharts 实现。
- 这样从代码行为上能说明资源被推迟加载，但不能直接说性能提高了多少。
- 当前图表逻辑还要求本次挂载后发生过用户交互，或者页面初始化时已经滚动，因此用户停在页面不操作时可能一直看到占位，这是需要验证的体验边界。

## 面试官可能追问

- 关于“你说做了懒加载，具体什么时候加载？怎么证明性能真的变好了”，你为什么选择当前方案？
- “你说做了懒加载，具体什么时候加载？怎么证明性能真的变好了”在异常数据或并发场景下怎么处理？
- 如果改用替代方案，主要成本和收益分别是什么？

## 代码证据

>
> - [router/index.tsx，第 6～27 行](/Users/aaron/personal-hub/apps/project-1/src/router/index.tsx:6)：路由页面使用 lazy 和 Suspense。
> - [ChartRender.tsx，第 18～53 行](/Users/aaron/personal-hub/apps/project-1/src/components/ChartRender.tsx:18)：图表加载依赖可见性及交互条件。
> - [ChartRender.tsx，第 73～84 行](/Users/aaron/personal-hub/apps/project-1/src/components/ChartRender.tsx:73)：条件满足后才渲染懒加载实现。
> - [Scene.tsx，第 408～425 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Scene.tsx:408)：3D Canvas 的像素比和展示入口。
