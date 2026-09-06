---
id: yingke-movies-followup-009-promise-allsettled-promise-all
title: 追问：【高频】为什么使用 `Promise.allSettled`，不用 `Promise.all`？
aliases: [能具体解释一下为什么使用 `Promise.allSettled`，不用 `Promise.all`吗？, 从设计取舍看，为什么使用 `Promise.allSettled`，不用 `Promise.all`？, 这个问题在项目中的实际边界是什么？]
category: yingke-movies
difficulty: 深入
priority: high
projects: [映刻影视]
keywords: [Promise.allSettled, Promise.all, 首页数据]
---

# 追问：【高频】为什么使用 `Promise.allSettled`，不用 `Promise.all`？

## 核心回答

首页的国产剧、综艺和美剧三个请求互不依赖，所以并发执行可以避免串行等待。选择 `Promise.allSettled`，是因为它会等每个请求结束，并分别保留成功或失败结果；如果使用 `Promise.all`，其中一个请求失败，整个聚合 Promise 就会直接 reject。不过当前代码只使用了 `allSettled` 的结果结构，没有判断每一项的 `status`，所以它解决了独立收集结果的问题，但还没有完成失败分类的降级展示。

## 回答要点

- 首页的国产剧、综艺和美剧三个请求互不依赖，所以并发执行可以避免串行等待。
- 选择 Promise.allSettled，是因为它会等每个请求结束，并分别保留成功或失败结果；
- 如果使用 Promise.all，其中一个请求失败，整个聚合 Promise 就会直接 reject。
- 不过当前代码只使用了 allSettled 的结果结构，没有判断每一项的 status，所以它解决了独立收集结果的问题，但还没有完成失败分类的降级展示。

## 面试官可能追问

- 关于“为什么使用 `Promise.allSettled`，不用 `Promise.all`”，为什么选择当前异步处理方式？
- 请求失败、重复触发或返回乱序时如何保证状态正确？
- 你会怎样测试慢请求和部分失败场景？

## 代码证据

>
> - [pages/home/index.vue 第 36～48 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/home/index.vue:36>)：同时创建三个请求，并使用 `Promise.allSettled` 保存结果。
