---
id: css-stacking-context
title: z-index 为什么有时候不生效？
aliases: [层叠上下文, stacking context, fixed 被遮挡]
category: html-css
difficulty: 进阶
priority: high
projects: []
keywords: [z-index, 层叠上下文, position, transform]
---

# z-index 为什么有时候不生效？

## 核心回答

`z-index` 不是全页面统一比数字，它先在各自的层叠上下文里排序。父元素如果形成了一个层叠上下文，里面的子元素再怎么把 z-index 写成 9999，也不能跑到父元素这一层上下文之外。

常见形成条件有 position 配合 z-index、fixed、opacity 小于 1、transform、filter、isolation 等。排查时我会从目标元素一路往上看父元素，找出哪个上下文把它限制住，再决定调整父层级还是把弹层挂到更合适的位置。

## 追问：为什么 transform 会影响 fixed？

某些 transform 容器会成为 fixed 后代的包含块，让它不再相对视口定位。页面里如果出现弹窗跟着某个滚动容器走，除了 z-index，也要检查祖先节点有没有 transform。

## 追问：弹窗应该怎么处理层级？

先约定应用里的层级体系，再把弹窗挂到靠近 body 的容器，避免被卡在业务卡片的层叠上下文里。层级数字本身不应该无限递增，越多越难维护。

## 追问：怎么用 DevTools 排查？

先确认元素本身可见，再检查祖先的 overflow、transform、opacity 和 position。DevTools 的 Layers 或 computed styles 能帮助确认上下文，但最终要从父子层级关系解释清楚，不是只改一个更大的数字。
