---
id: vue-if-vs-show
title: v-if 和 v-show 有什么区别？
aliases: [v-if v-show, 条件渲染, display none]
category: vue
difficulty: 基础
priority: high
projects: []
keywords: [v-if, v-show, display, 条件渲染]
---

# v-if 和 v-show 有什么区别？

## 核心回答

v-if 是真的创建和销毁节点。条件为假时节点根本不存在，所以初始不显示的内容零渲染成本，但切换时有真实的创建销毁开销，组件的话会走完整的生命周期。v-show 是节点一直都在，只是切 display: none，不管显不显示初始都会渲染，切换只是改个样式，开销很小。

所以选择标准就一条：频繁切换用 v-show，条件基本不变、或者初始大概率不显示的用 v-if。比如 tab 频繁切换的面板用 v-show，权限控制不给看就别渲染的模块用 v-if。

## 展开回答

v-if 能配合 v-else、v-else-if 形成条件链，v-show 没有这套。v-if 还常和 transition 一起做进出场动画，因为节点真实创建销毁才有动画可播。

一个容易忽略的点：v-show 是靠内联样式 display 实现的，想用普通 CSS 再把它显示出来会被内联样式压住，偶尔在这个上面踩坑。

## 面试官可能追问

- v-if 切换时组件的生命周期会怎么走？
- 什么场景必须用 v-if 而不能用 v-show？
- v-if 和 v-for 为什么不建议写在同一个标签上？
