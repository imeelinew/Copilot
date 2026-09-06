---
id: yingke-movies-followup-022-description-toggle
title: 【高频】简介为什么用 JavaScript 截断，不用 CSS 多行省略？
aliases: [能具体解释一下简介为什么用 JavaScript 截断，不用 CSS 多行省略吗？, 从设计取舍看，简介为什么用 JavaScript 截断，不用 CSS 多行省略？, 这个问题在项目中的实际边界是什么？]
category: yingke-movies
difficulty: 基础
priority: high
projects: [映刻影视]
keywords: [文本展开, uni-app, 影视小程序]
---

# 【高频】简介为什么用 JavaScript 截断，不用 CSS 多行省略？

## 核心回答

标题只需要视觉省略，但简介还要支持点击展开和收起，所以当前代码直接切换展示字符串，控制起来比较直观。CSS `line-clamp` 更适合只做行数限制，不改变原始文本；如果也要展开，就还需要额外状态切换。当前 JavaScript 方案的问题是短文本仍会显示“展开”，而且 `slice(0, 50)` 按 UTF-16 单元截取，遇到部分 emoji 可能截断字符。更完整的实现可以把是否超长和是否展开分开计算。

## 回答要点

- 标题只需要视觉省略，但简介还要支持点击展开和收起，所以当前代码直接切换展示字符串，控制起来比较直观。
- CSS line-clamp 更适合只做行数限制，不改变原始文本；
- 如果也要展开，就还需要额外状态切换。
- 当前 JavaScript 方案的问题是短文本仍会显示“展开”，而且 slice(0, 50) 按 UTF-16 单元截取，遇到部分 emoji 可能截断字符。

## 面试官可能追问

- 关于“简介为什么用 JavaScript 截断，不用 CSS 多行省略”，你为什么选择当前方案？
- “简介为什么用 JavaScript 截断，不用 CSS 多行省略”在异常数据或并发场景下怎么处理？
- 如果改用替代方案，主要成本和收益分别是什么？

## 代码证据

>
> - [components/descComment.vue 第 1～6 行](</Users/aaron/CodingPractice/14_uniapp/project2/components/descComment.vue:1>)：展开、收起入口。
> - [components/descComment.vue 第 18～35 行](</Users/aaron/CodingPractice/14_uniapp/project2/components/descComment.vue:18>)：使用 `slice` 截断并切换完整文本。
