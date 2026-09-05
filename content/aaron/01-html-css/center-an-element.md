---
id: css-center-element
title: 如何让一个元素水平垂直居中？
aliases: [元素完美居中, css居中, flex居中, 水平垂直居中]
category: html-css
difficulty: 基础
priority: high
projects: []
keywords: [flex, grid, transform, margin]
---

# 如何让一个元素水平垂直居中？

## 30 秒回答

最常用的是给父元素设置 display flex，再使用 justify-content center 和 align-items center。如果使用 Grid，可以直接 place-items center。绝对定位时，可以让子元素 top、left 都为 50%，再通过 transform translate 负 50% 修正自身宽高。具体选择取决于布局上下文和是否知道元素尺寸。

## 标准回答

我常用三种方式。现代布局中首选 Flex：父元素设置 display:flex、justify-content:center 和 align-items:center；如果页面本身使用 Grid，可以直接使用 place-items:center。

如果元素需要脱离文档流，例如居中的弹窗，可以设置父元素 position:relative，子元素 absolute，top 和 left 为 50%，再使用 transform:translate(-50%, -50%) 抵消自身宽高。

已知固定宽高时也可以使用绝对定位四边为 0，再设置 margin:auto，但适用范围更窄。我会根据现有布局体系选择，不会为了居中单独引入复杂结构。

## 回答要点

- 首选 Flex 或 Grid。
- 绝对定位加 transform 不需要预先知道宽高。
- 说明方案选择取决于布局上下文。

## 面试官可能追问

- justify-content 和 align-items 分别控制哪个轴？
- transform 会不会影响文档流？
