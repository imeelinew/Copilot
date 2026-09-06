---
id: yingke-movies-followup-026-description-toggle
title: 为什么标题使用 CSS 省略，简介却使用 JavaScript 截断？
aliases: [能具体解释一下为什么标题使用 CSS 省略，简介却使用 JavaScript 截断吗？, 从设计取舍看，为什么标题使用 CSS 省略，简介却使用 JavaScript 截断？, 这个问题在项目中的实际边界是什么？]
category: yingke-movies
difficulty: 基础
priority: normal
projects: [映刻影视]
keywords: [文本展开, Props, uni-app]
---

# 为什么标题使用 CSS 省略，简介却使用 JavaScript 截断？

## 核心回答

因为两处交互目标不同。卡片标题只需要保持单行布局，没有展开需求，所以用 `overflow: hidden`、`white-space: nowrap` 和 `text-overflow: ellipsis` 做视觉省略就够了；简介需要用户主动展开和收起，因此使用状态控制实际展示文本。两种做法没有绝对优劣，关键看是否需要交互。当前简介方案仍要补短文本判断和 props 更新处理。

## 回答要点

- 卡片标题只需要保持单行布局，没有展开需求，所以用 overflow: hidden、white-space: nowrap 和 text-overflow: ellipsis 做视觉省略就够了；
- 简介需要用户主动展开和收起，因此使用状态控制实际展示文本。
- 两种做法没有绝对优劣，关键看是否需要交互。
- 当前简介方案仍要补短文本判断和 props 更新处理。

## 面试官可能追问

- 关于“为什么标题使用 CSS 省略，简介却使用 JavaScript 截断”，你为什么选择当前方案？
- “为什么标题使用 CSS 省略，简介却使用 JavaScript 截断”在异常数据或并发场景下怎么处理？
- 如果改用替代方案，主要成本和收益分别是什么？

## 代码证据

>
> - [components/listContent.vue 第 91～95 行](</Users/aaron/CodingPractice/14_uniapp/project2/components/listContent.vue:91>)：标题使用 CSS 单行省略。
> - [components/descComment.vue 第 19～35 行](</Users/aaron/CodingPractice/14_uniapp/project2/components/descComment.vue:19>)：简介使用 JavaScript 截断并切换状态。
