---
id: shiguangji-shop-normal-023-sessionstorage-pinia
title: 为什么结算参数使用 sessionStorage，不用 Pinia？
aliases: [能具体解释一下为什么结算参数使用 sessionStorage，不用 Pinia吗？, 从设计取舍看，为什么结算参数使用 sessionStorage，不用 Pinia？, 这个问题在项目中的实际边界是什么？]
category: shiguangji-shop
difficulty: 基础
priority: normal
projects: [拾光集移动商城系统]
keywords: [sessionStorage, 订单流程, 页面导航]
---

# 为什么结算参数使用 sessionStorage，不用 Pinia？

## 核心回答

结算参数需要在页面跳转和刷新后保留，但只服务于当前标签页的这次下单，所以使用 sessionStorage。Pinia 适合共享响应式状态，但默认在内存里，刷新后仍然要设计持久化。它们不是互相替代的关系，也可以用 Pinia 管理状态、再选择性同步到 sessionStorage。无论放在哪里，客户端参数都不可信，确认订单时仍要让服务端重新校验。

## 回答要点

- 结算参数需要在页面跳转和刷新后保留，但只服务于当前标签页的这次下单，所以使用 sessionStorage。
- Pinia 适合共享响应式状态，但默认在内存里，刷新后仍然要设计持久化。
- 它们不是互相替代的关系，也可以用 Pinia 管理状态、再选择性同步到 sessionStorage。
- 无论放在哪里，客户端参数都不可信，确认订单时仍要让服务端重新校验。

## 面试官可能追问

- 关于“为什么结算参数使用 sessionStorage，不用 Pinia”，你为什么选择当前方案？
- “为什么结算参数使用 sessionStorage，不用 Pinia”在异常数据或并发场景下怎么处理？
- 如果改用替代方案，主要成本和收益分别是什么？

## 代码证据

[购物车写入第 481～496 行](/Users/aaron/personal-hub/apps/project-2/src/views/Cart.vue:481)、[立即购买写入第 450～464 行](/Users/aaron/personal-hub/apps/project-2/src/views/ProdInfo.vue:450)、[确认页读取第 120～141 行](/Users/aaron/personal-hub/apps/project-2/src/views/Order.vue:120)、[示例 store 第 1～12 行](/Users/aaron/personal-hub/apps/project-2/src/stores/counter.ts:1)。
