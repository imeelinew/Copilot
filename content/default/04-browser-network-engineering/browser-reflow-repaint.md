---
id: browser-reflow-repaint
title: 重排和重绘的区别？怎么减少？
aliases: [回流重绘, reflow repaint, 强制同步布局, 布局抖动]
category: engineering
difficulty: 高频
priority: high
projects: []
keywords: [重排, 重绘, 合成, 批量DOM操作]
---

# 重排和重绘的区别？怎么减少？

## 核心回答

一句话：动了几何就要重排，只动了外观就只重绘。改宽高、位置，增删可见节点，窗口 resize，这些布局得重新算，叫重排或者回流；只改颜色、背景、阴影这种不占空间的样式，跳过布局直接重画，叫重绘。重排一定带重绘，反过来不一定，重排代价也大得多。

减少的思路就是别频繁打扰布局引擎。批量改：几处样式改动合成一个 class 一次加上去，或者先在 DocumentFragment 里拼好再一次性插进 DOM。缓存布局信息：循环里要用的 offsetHeight 先存到变量，别每圈都读。

还有个更省的选项是合成。transform 和 opacity 不走布局和绘制，直接在合成层处理，所以位移动画用 transform: translate 代替改 left、top，这也是它俩流畅的原因。

## 展开回答

有个经典坑叫强制同步布局，或者布局抖动。渲染本身是批处理的：攒一批改动，等下一帧统一算布局。但改完样式马上读 offsetWidth、getBoundingClientRect，浏览器为了给准确值只能立刻强制重排，循环里这么干就是改一次算一次，性能直接崩。解法是读写分离，先集中读再集中写，或者用 requestAnimationFrame 把写操作排到下一帧。

其实 Vue、React 的批量更新底层干的也是同一件事：把多次改动攒起来一次处理，减少重排重绘次数。所以这道题往框架上也能接。

## 面试官可能追问

- 循环里读 offsetWidth 为什么慢？
- transform 为什么不触发重排？
- requestAnimationFrame 和这个有什么关系？
