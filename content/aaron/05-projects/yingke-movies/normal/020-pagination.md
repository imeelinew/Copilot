---
id: yingke-movies-normal-020-pagination
title: 怎样防止快速触底导致重复分页请求？
aliases: [能具体解释一下怎样防止快速触底导致重复分页请求吗？, 从设计取舍看，怎样防止快速触底导致重复分页请求？, 这个问题在项目中的实际边界是什么？]
category: yingke-movies
difficulty: 进阶
priority: high
projects: [映刻影视]
keywords: [分页, 加载状态, uni-app]
---

# 怎样防止快速触底导致重复分页请求？

## 核心回答

我会增加 `isLoading` 和 `hasMore` 两个状态。触底时先判断是否正在请求以及是否还有下一页，请求开始后加锁，在 `finally` 中释放；请求完成后根据列表长度、总数或服务端的 next cursor 更新 `hasMore`。当前代码没有这两个保护，所以我会把它作为明确的改进点，而不是说已经解决。

## 回答要点

- 我会增加 isLoading 和 hasMore 两个状态。
- 触底时先判断是否正在请求以及是否还有下一页，请求开始后加锁，在 finally 中释放；
- 请求完成后根据列表长度、总数或服务端的 next cursor 更新 hasMore。
- 当前代码没有这两个保护，所以我会把它作为明确的改进点，而不是说已经解决。

## 面试官可能追问

- 关于“怎样防止快速触底导致重复分页请求”，为什么选择当前异步处理方式？
- 请求失败、重复触发或返回乱序时如何保证状态正确？
- 你会怎样测试慢请求和部分失败场景？

## 代码证据

>
> - [pages/list/index.vue 第 38～48 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/list/index.vue:38>)：当前状态中没有请求锁和 `hasMore`。
> - [pages/list/index.vue 第 88～101 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/list/index.vue:88>)：每次触底直接递增游标并请求。
