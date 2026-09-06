---
id: yingke-movies-followup-023-description-toggle
title: 追问：如果父组件传入的简介后来变化，子组件会更新吗？
aliases: [能具体解释一下如果父组件传入的简介后来变化，子组件会更新吗吗？, 从设计取舍看，如果父组件传入的简介后来变化，子组件会更新吗？, 这个问题在项目中的实际边界是什么？]
category: yingke-movies
difficulty: 基础
priority: normal
projects: [映刻影视]
keywords: [组件设计, 文本展开, Props]
---

# 追问：如果父组件传入的简介后来变化，子组件会更新吗？

## 核心回答

props 本身会更新，但当前显示用的是组件自己的 `wordStr`，而它只在 `created` 阶段根据 `val` 初始化一次。父组件后续替换 `val` 时，这段格式化逻辑不会自动重新执行，所以可能继续显示旧内容。可以监听 `val`，也可以把展示文本改成 computed，由当前 props 和展开状态直接计算，这样就不用手动同步两份状态。

## 回答要点

- props 本身会更新，但当前显示用的是组件自己的 wordStr，而它只在 created 阶段根据 val 初始化一次。
- 父组件后续替换 val 时，这段格式化逻辑不会自动重新执行，所以可能继续显示旧内容。
- 可以监听 val，也可以把展示文本改成 computed，由当前 props 和展开状态直接计算，这样就不用手动同步两份状态。

## 面试官可能追问

- 关于“如果父组件传入的简介后来变化，子组件会更新吗”，你为什么选择当前方案？
- “如果父组件传入的简介后来变化，子组件会更新吗”在异常数据或并发场景下怎么处理？
- 如果改用替代方案，主要成本和收益分别是什么？

## 代码证据

>
> - [components/descComment.vue 第 11～16 行](</Users/aaron/CodingPractice/14_uniapp/project2/components/descComment.vue:11>)：组件把 props 内容复制到本地状态。
> - [components/descComment.vue 第 37～40 行](</Users/aaron/CodingPractice/14_uniapp/project2/components/descComment.vue:37>)：只在 `created` 时执行格式化。
