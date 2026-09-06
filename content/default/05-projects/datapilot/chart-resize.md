---
id: datapilot-chart-resize
title: ECharts 如何适配容器尺寸变化？
aliases: [echarts自适应, ResizeObserver, 图表resize, 窗口变化图表]
category: datapilot
difficulty: 项目
priority: high
projects: [城市视图]
keywords: [ECharts, ResizeObserver, dispose, 生命周期]
---

# ECharts 如何适配容器尺寸变化？

## 核心回答

我把 ECharts 封装成了一个组件，挂载以后初始化图表，再用 ResizeObserver 监听它的容器。容器大小一变，就调用图表的 resize。

这样侧栏收缩、页面布局变化时，即使浏览器窗口没变，图表也能跟着调整。数据变化时复用实例、调用 setOption；组件卸载时断开监听，再 dispose 图表，避免留下实例和监听器。

## 追问：为什么不只监听 window.resize？

因为图表区域变大变小，不一定是窗口变了。比如侧栏展开、父容器宽度变化，都可能只改变图表容器。监听容器本身更直接，不需要每个影响布局的地方都手动通知图表。

## 追问：为什么不在每次渲染时重新 init？

React 渲染不代表图表容器需要重建。反复 init 会重复创建实例，也容易丢掉交互状态。现在初始化放在 effect 里，实例保存在 ref；正常更新只 setOption。主题变化时才清掉旧实例，按新主题重新创建。

## 追问：ResizeObserver 触发得很频繁怎么办？

当前回调直接调用 resize，还没有额外限频。如果拖动容器时调用太密，我会考虑用 requestAnimationFrame，把一帧里多次尺寸变化合并成一次，并在卸载时取消还没执行的回调。

## 追问：初始化时容器宽高为零怎么办？

当前组件有默认高度，但如果父容器隐藏，宽度仍可能是零。这时应该等容器真正可见、有尺寸以后再初始化，或者在显示出来以后补一次 resize。需要结合弹窗、标签页这些具体容器的显示时机处理。

## 追问：为什么卸载时要同时清理监听和实例？

ResizeObserver 是在观察 DOM，图表实例里还有画布和事件等资源。只清一个，另一个仍可能留着。所以 cleanup 里先 disconnect，再 dispose，并把 ref 清空，后续就不会继续用这个旧实例。

## 代码证据

- /Users/eli/Dev/datapilot-rebuild/src/components/ChartRenderer/index.tsx
