---
id: css-animation-performance
title: CSS 动画卡顿时怎么排查？
aliases: [动画性能, transform opacity, 合成层]
category: html-css
difficulty: 进阶
priority: normal
projects: []
keywords: [动画, transform, opacity, 合成层, 性能]
---

# CSS 动画卡顿时怎么排查？

## 核心回答

我先看动画到底改了什么属性。transform 和 opacity 通常更容易交给合成阶段处理，改宽高、top、left 往往会触发布局和绘制，连续执行时更容易卡。这个不是绝对规则，最终还是用 Performance 面板看有没有长任务、重排或大量绘制。

也不会给所有元素都加 `will-change`。它会提前占资源，长期滥用反而变慢。动画结束后如果只是一次性的效果，应该让浏览器恢复正常状态，并为不喜欢动效的用户提供 prefers-reduced-motion 方案。

## 追问：requestAnimationFrame 解决什么问题？

它让 JavaScript 更新尽量对齐浏览器下一帧，适合自己计算拖动或 canvas 动画。它不能让昂贵计算变快，也不能把本来会触发布局的改动变成合成动画，计算量仍要控制。

## 追问：怎么判断是 JS 还是 CSS 卡？

录一段实际操作，看主线程时间线。如果有很长的脚本任务，先拆计算或减少重复渲染；如果脚本不重但绘制区域很大，再检查阴影、滤镜、布局和图片。不要只凭“看起来卡”猜原因。

## 追问：移动端为什么更容易卡？

设备 CPU、GPU 和内存都可能更有限，长列表、高清图片、复杂阴影同时出现时更明显。需要减少同时动画的节点、压缩资源、限制列表渲染量，并在真实设备上验证。
