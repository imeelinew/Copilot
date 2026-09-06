---
id: yingke-movies-followup-014-pagination
title: 【高频】触底分页怎么防止连续触发和重复请求？
aliases: [能具体解释一下触底分页怎么防止连续触发和重复请求吗？, 从设计取舍看，触底分页怎么防止连续触发和重复请求？, 这个问题在项目中的实际边界是什么？]
category: yingke-movies
difficulty: 进阶
priority: high
projects: [映刻影视]
keywords: [分页, 加载状态, uni-app]
---

# 【高频】触底分页怎么防止连续触发和重复请求？

## 核心回答

我会给分页增加 `isLoading` 和 `hasMore` 两个状态。触底时先判断是不是正在请求、是不是已经到底，请求开始后把 `isLoading` 设为 true，结束时在 `finally` 中释放；数据回来后再根据 `list.length` 和 `total`，或者服务端的 next cursor 更新 `hasMore`。当前代码没有请求锁，快速连续触底时可能发出多个请求，所以我会把它说成现有分页的不足，而不是已经解决的能力。

## 回答要点

- 我会给分页增加 isLoading 和 hasMore 两个状态。
- 触底时先判断是不是正在请求、是不是已经到底，请求开始后把 isLoading 设为 true，结束时在 finally 中释放；
- 数据回来后再根据 list.length 和 total，或者服务端的 next cursor 更新 hasMore。
- 当前代码没有请求锁，快速连续触底时可能发出多个请求，所以我会把它说成现有分页的不足，而不是已经解决的能力。

## 面试官可能追问

- 关于“触底分页怎么防止连续触发和重复请求”，为什么选择当前异步处理方式？
- 请求失败、重复触发或返回乱序时如何保证状态正确？
- 你会怎样测试慢请求和部分失败场景？

## 代码证据

>
> - [pages/list/index.vue 第 38～48 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/list/index.vue:38>)：当前分页状态中没有请求锁和 `hasMore`。
> - [pages/list/index.vue 第 88～101 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/list/index.vue:88>)：触底后直接递增并请求，没有并发保护。
