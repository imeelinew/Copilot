---
id: shiguangji-shop-normal-014-homepage-partial-failure
title: 亮点二：首页一个接口失败，不影响其他区域
aliases: [请介绍一下项目中的首页一个接口失败，不影响其他区域。, 你在首页一个接口失败，不影响其他区域方面具体做了什么？, 这部分的设计思路和边界是什么？]
category: shiguangji-shop
difficulty: 进阶
priority: high
projects: [拾光集移动商城系统]
keywords: [首页数据, 验证方法, Promise.allSettled, Promise.all]
---

# 亮点二：首页一个接口失败，不影响其他区域

## 核心回答

首页有轮播图、公告和推荐商品三组独立数据。最直接的串行请求会把时间累加，而简单使用 `Promise.all` 时，只要其中一个 Promise 拒绝，就会直接进入整体失败处理，其他已经成功的数据也不方便继续展示。

我的处理是先用 `Promise.allSettled` 并行等待三组请求，再分别读取每一项的结果。除了判断 Promise 有没有成功，还会检查接口的 `success` 和数据结构。某一组失败时把它的名称记下来，并给这一块返回空数组；其他成功数据继续保留。页面据此告诉用户具体哪个区域失败，并提供重新加载入口。这样首页不会因为一条公告接口失败就完全空白，也能区分“正常没有公告”和“公告接口异常”。

如果要验证，我会分别模拟网络拒绝、`success: false`、错误的数据结构和正常空数组，检查成功区域是否仍然展示，以及空数据有没有被误报成失败。

## 回答要点

- 首页有轮播图、公告和推荐商品三组独立数据。
- 最直接的串行请求会把时间累加，而简单使用 Promise.all 时，只要其中一个 Promise 拒绝，就会直接进入整体失败处理，其他已经成功的数据也不方便继续展示。
- 我的处理是先用 Promise.allSettled 并行等待三组请求，再分别读取每一项的结果。
- 除了判断 Promise 有没有成功，还会检查接口的 success 和数据结构。

## 面试官可能追问

- 关于“首页一个接口失败，不影响其他区域”，你为什么选择当前方案？
- “首页一个接口失败，不影响其他区域”在异常数据或并发场景下怎么处理？
- 如果改用替代方案，主要成本和收益分别是什么？

## 代码证据

> - [homeData.ts 第 13～41 行](/Users/aaron/personal-hub/apps/project-2/src/utils/homeData.ts:13)：并行结算、三层检查和失败名称归集。
> - [首页第 5～8 行](/Users/aaron/personal-hub/apps/project-2/src/views/Home.vue:5)：失败区域文字和重试入口。
> - [首页第 185～205 行](/Users/aaron/personal-hub/apps/project-2/src/views/Home.vue:185)：调用加载函数、保留各组数据和结束 loading。
> - [首页数据测试第 25～53 行](/Users/aaron/personal-hub/apps/project-2/tests/home-data.test.ts:25)：代码中已有失败、业务异常、结构异常和空数组用例；本轮未执行。
