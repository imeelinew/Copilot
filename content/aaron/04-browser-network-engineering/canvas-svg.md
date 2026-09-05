---
id: engineering-canvas-svg
title: canvas 和 svg 有什么区别？
aliases: [canvas区别, svg区别, canvas svg选型, 渲染方案]
category: engineering
difficulty: 高频
priority: normal
projects: [城市视图]
keywords: [canvas, svg, 矢量图, 命中检测]
---

# canvas 和 svg 有什么区别？

## 核心回答

canvas 是位图：拿 JS 在画布上一像素一像素画，画完浏览器就不管了，画面一动就得整块重画，放大还会糊，依赖分辨率。svg 是矢量图：用 XML 标签描述形状，每个图形都是真实的 DOM 节点，能绑事件、能用 CSS 控制，放大多少倍都不糊。

所以选型看场景：图元数量巨大、频繁重绘的场景用 canvas，比如游戏、大数据量散点图，svg 上几千个节点就把浏览器拖垮了，canvas 只是一块画布没这负担；图标、流程图、地图这类元素不多、要交互要无损缩放的用 svg。

事件上的差别最直观：svg 的每个图形直接 addEventListener 就行；canvas 拿到的是一整块画布，要知道点没点中某个图形，得自己拿坐标去算，叫命中检测。

## 展开回答

我项目里 ECharts 默认就是 canvas 渲染器，看板这种数据量用它稳，事件命中 ECharts 内部都封装好了；其实它也支持切 svg 渲染器，图表很轻量或者要导出矢量图的时候有意义。

## 面试官可能追问

- ECharts 为什么默认用 canvas？
- canvas 里怎么知道点到了哪个图形？
- 数据量再大怎么办，了解 WebGL 吗？
