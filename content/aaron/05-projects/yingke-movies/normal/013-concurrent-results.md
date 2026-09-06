---
id: yingke-movies-normal-013-concurrent-results
title: 并发请求成功和失败时的数据结构不同
aliases: [请介绍一下项目中的并发请求成功和失败时的数据结构不同。, 你在并发请求成功和失败时的数据结构不同方面具体做了什么？, 这部分的设计思路和边界是什么？]
category: yingke-movies
difficulty: 深入
priority: normal
projects: [映刻影视]
keywords: [首页数据, 组件设计, 验证方法, Promise.allSettled, Promise.all]
---

# 并发请求成功和失败时的数据结构不同

## 核心回答

首页三个请求并发后，一个具体的失效场景是：国产剧和综艺请求成功，但美剧请求失败。`Promise.allSettled` 不会让整个等待过程直接中断，成功项会有 `value`，失败项只有 `reason`；但当前组件不判断状态，直接读取 `main.value.subject_collection`，因此失败项可能让组件访问到 `undefined`。最直接地改成 `Promise.all` 也不合适，因为任意一个请求失败都会让三个分类一起进入失败分支。当前代码解决了“等到每个请求都结束并保留各自结果”的问题，但没有完成按分类渲染成功、失败和重试状态。验证时可以只让一个分类接口失败，观察另外两个分类能否正常显示，以及失败分类是否会造成渲染错误；本次没有实际执行这项验证。

## 回答要点

- 首页三个请求并发后，一个具体的失效场景是：国产剧和综艺请求成功，但美剧请求失败。
- Promise.allSettled 不会让整个等待过程直接中断，成功项会有 value，失败项只有 reason；
- 但当前组件不判断状态，直接读取 main.value.subject_collection，因此失败项可能让组件访问到 undefined。
- 最直接地改成 Promise.all 也不合适，因为任意一个请求失败都会让三个分类一起进入失败分支。

## 面试官可能追问

- 关于“并发请求成功和失败时的数据结构不同”，为什么选择当前异步处理方式？
- 请求失败、重复触发或返回乱序时如何保证状态正确？
- 你会怎样测试慢请求和部分失败场景？

## 代码证据

>
> - [pages/home/index.vue 第 36～48 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/home/index.vue:36>)：使用 `Promise.allSettled` 并保存三种 settlement 结果。
> - [components/listContent.vue 第 4～17 行](</Users/aaron/CodingPractice/14_uniapp/project2/components/listContent.vue:4>)：组件直接从 `main.value` 读取分类数据，没有失败分支。
