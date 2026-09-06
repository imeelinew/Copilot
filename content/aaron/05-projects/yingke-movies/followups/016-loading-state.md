---
id: yingke-movies-followup-016-loading-state
title: 追问：【高频】为什么 loading 会立即消失？
aliases: [能具体解释一下为什么 loading 会立即消失吗？, 从设计取舍看，为什么 loading 会立即消失？, 这个问题在项目中的实际边界是什么？]
category: yingke-movies
difficulty: 基础
priority: high
projects: [映刻影视]
keywords: [加载状态, uni-app, 影视小程序]
---

# 追问：【高频】为什么 loading 会立即消失？

## 核心回答

因为 `getList` 是异步函数，但触底代码调用它时没有写 `await`，下一行就执行了 `uni.hideLoading()`，所以 loading 不会真正等到数据返回。正确做法是让触底方法能够等待 `getList`，并把关闭 loading 放进 `finally`，这样无论请求成功还是失败都能收口。当前代码这里属于明确的时序问题，面试时应该直接承认，而不是把它解释成设计选择。

## 回答要点

- 因为 getList 是异步函数，但触底代码调用它时没有写 await，下一行就执行了 uni.hideLoading()，所以 loading 不会真正等到数据返回。
- 正确做法是让触底方法能够等待 getList，并把关闭 loading 放进 finally，这样无论请求成功还是失败都能收口。
- 当前代码这里属于明确的时序问题，面试时应该直接承认，而不是把它解释成设计选择。

## 面试官可能追问

- 关于“为什么 loading 会立即消失”，为什么选择当前异步处理方式？
- 请求失败、重复触发或返回乱序时如何保证状态正确？
- 你会怎样测试慢请求和部分失败场景？

## 代码证据

>
> - [pages/list/index.vue 第 88～95 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/list/index.vue:88>)：调用异步 `getList` 后立即关闭 loading。
