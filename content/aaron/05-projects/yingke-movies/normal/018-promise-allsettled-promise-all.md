---
id: yingke-movies-normal-018-promise-allsettled-promise-all
title: 为什么使用 `Promise.allSettled`，不用 `Promise.all`？
aliases: [能具体解释一下为什么使用 `Promise.allSettled`，不用 `Promise.all`吗？, 从设计取舍看，为什么使用 `Promise.allSettled`，不用 `Promise.all`？, 这个问题在项目中的实际边界是什么？]
category: yingke-movies
difficulty: 深入
priority: high
projects: [映刻影视]
keywords: [Promise.allSettled, Promise.all, uni-app]
---

# 为什么使用 `Promise.allSettled`，不用 `Promise.all`？

## 核心回答

三个分类互不依赖，适合并发。`Promise.all` 中任意一个请求失败，整个聚合 Promise 就会 reject；`allSettled` 会保留每个请求自己的成功或失败结果。不过当前代码还没有判断 `status`，所以选择是有理由的，但失败分类的降级没有做完。

## 回答要点

- 三个分类互不依赖，适合并发。
- Promise.all 中任意一个请求失败，整个聚合 Promise 就会 reject；
- allSettled 会保留每个请求自己的成功或失败结果。
- 不过当前代码还没有判断 status，所以选择是有理由的，但失败分类的降级没有做完。

## 面试官可能追问

- 关于“为什么使用 `Promise.allSettled`，不用 `Promise.all`”，为什么选择当前异步处理方式？
- 请求失败、重复触发或返回乱序时如何保证状态正确？
- 你会怎样测试慢请求和部分失败场景？

## 代码证据

>
> - [pages/home/index.vue 第 36～48 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/home/index.vue:36>)：三个请求通过 `Promise.allSettled` 聚合。
> - [components/listContent.vue 第 4～17 行](</Users/aaron/CodingPractice/14_uniapp/project2/components/listContent.vue:4>)：当前组件只支持成功结果的 `value` 结构。
