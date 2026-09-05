---
id: html-block-inline
title: 块级元素和行内元素有什么区别？
aliases: [行内元素, 块级元素, inline-block, 行内块]
category: html-css
difficulty: 基础
priority: normal
projects: []
keywords: [块级元素, 行内元素, inline-block, 替换元素]
---

# 块级元素和行内元素有什么区别？

## 核心回答

块级元素默认独占一行，宽度撑满父容器，宽高和四个方向的 margin 都能设，像 div、p、ul、li、h1 到 h6。行内元素在同一行里排，宽高由内容决定，设 width 和 height 不生效，水平 margin 能设、垂直 margin 不起作用，像 span、a。中间还有个 inline-block：对外像行内一样并排，对内可以设宽高。

有个常被拿来考的点：img、input 这些看起来是行内元素却能设宽高，因为它们是替换元素，表现接近 inline-block。

## 展开回答

两个实用细节。一是行内元素之间因为源码里的换行会有一条小空隙，常见处理是父元素 font-size: 0，或者干脆改成 flex 布局。二是嵌套有规则，p 里面只能放短语内容，塞 div 是不合法的，a 里面也不能再套 a。display 属性可以在 block、inline、inline-block 之间随意转换。

## 面试官可能追问

- img 是行内元素，为什么能设置宽高？
- 行内元素之间的空隙怎么去掉？
- inline-block 和 float 做横向排列有什么区别？
