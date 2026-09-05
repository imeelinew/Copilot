---
id: css-flex-one
title: flex:1 是哪些属性的复合属性？
aliases: [flex属性, flex-grow, flex-shrink, flex-basis, flex等分]
category: html-css
difficulty: 高频
priority: high
projects: []
keywords: [flex, flex-grow, flex-shrink, flex-basis]
---

# flex:1 是哪些属性的复合属性？

## 核心回答

flex 是三个属性的缩写：flex-grow、flex-shrink、flex-basis，flex:1 完整展开就是 1 1 0%。flex-grow 管的是有剩余空间时按几份放大，默认 0，就是不放；flex-shrink 管空间不够时按比例缩，默认 1；flex-basis 是分配剩余空间之前项目的主轴基准尺寸，默认 auto，也就是看 width，没 width 就看内容。

有个能加分的点：flex:1 和 flex:auto 不一样。flex:1 的 basis 是 0%，等于把项目自身尺寸清零，空间全按 grow 比例分，所以能真正等分；flex:auto 的 basis 是 auto，项目先按内容占一块，再分剩下的，内容长短不一时就分不均。

## 展开回答

常用的几个缩写：flex: none 是 0 0 auto，不放大不缩小，保持原始尺寸；flex: initial 是 0 1 auto，就是默认值。实战里还有个常见坑：flex 子项里的内容太长时，项目默认不会被压到内容最小宽度以下，会硬把容器撑开，给子项加 min-width: 0 才能正常收缩，做文本溢出省略时经常要用。

## 面试官可能追问

- flex:1 和 flex:auto 有什么区别？
- flex-shrink 设成 0 会怎样？
- flex-basis 和 width 同时设了听谁的？
