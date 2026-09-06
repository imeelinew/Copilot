---
id: yingke-movies-followup-020-props
title: 为什么 `props` 只使用数组写法？
aliases: [能具体解释一下为什么 `props` 只使用数组写法吗？, 从设计取舍看，为什么 `props` 只使用数组写法？, 这个问题在项目中的实际边界是什么？]
category: yingke-movies
difficulty: 基础
priority: normal
projects: [映刻影视]
keywords: [Props, 组件设计, uni-app]
---

# 为什么 `props` 只使用数组写法？

## 核心回答

数组写法比较省事，适合快速声明组件接收哪些属性，但它没有类型、是否必传和默认值校验。这个项目的 `main` 访问层级比较深，如果父组件传入空值，模板很容易报错；`val` 也默认被当成字符串使用。更稳妥的做法是把 props 改成对象写法，明确 `type`、`required` 和默认值，并在模板中处理空数据。当前代码只是完成了基础传值，没有运行时参数保护。

## 回答要点

- 数组写法比较省事，适合快速声明组件接收哪些属性，但它没有类型、是否必传和默认值校验。
- 这个项目的 main 访问层级比较深，如果父组件传入空值，模板很容易报错；
- val 也默认被当成字符串使用。
- 更稳妥的做法是把 props 改成对象写法，明确 type、required 和默认值，并在模板中处理空数据。

## 面试官可能追问

- 关于“为什么 `props` 只使用数组写法”，你为什么选择当前方案？
- “为什么 `props` 只使用数组写法”在异常数据或并发场景下怎么处理？
- 如果改用替代方案，主要成本和收益分别是什么？

## 代码证据

>
> - [components/listContent.vue 第 24～26 行](</Users/aaron/CodingPractice/14_uniapp/project2/components/listContent.vue:24>)：`main` 使用数组式 props 声明。
> - [components/descComment.vue 第 9～16 行](</Users/aaron/CodingPractice/14_uniapp/project2/components/descComment.vue:9>)：`val` 使用数组式 props，并直接维护本地字符串状态。
