---
id: shiguangji-shop-normal-025-cart-computed-watch
title: computed 和 watch 在购物车里分别做什么？
aliases: [能具体解释一下computed 和 watch 在购物车里分别做什么吗？, 从设计取舍看，computed 和 watch 在购物车里分别做什么？, 这个问题在项目中的实际边界是什么？]
category: shiguangji-shop
difficulty: 基础
priority: normal
projects: [拾光集移动商城系统]
keywords: [购物车, 请求封装, 服务端计价]
---

# computed 和 watch 在购物车里分别做什么？

## 核心回答

computed 用来计算能够从现有状态直接推导的数据，例如已选商品 ID、页面是否全选和展示金额；watch 用来监听选中 ID 的变化并触发服务端计价，因为发网络请求属于副作用。这样把“页面现在是什么状态”和“状态变化后要做什么”分开，也避免再保存一份容易不同步的全选布尔值。

## 回答要点

- computed 用来计算能够从现有状态直接推导的数据，例如已选商品 ID、页面是否全选和展示金额；
- watch 用来监听选中 ID 的变化并触发服务端计价，因为发网络请求属于副作用。
- 这样把“页面现在是什么状态”和“状态变化后要做什么”分开，也避免再保存一份容易不同步的全选布尔值。

## 面试官可能追问

- 关于“computed 和 watch 在购物车里分别做什么”，核心业务状态由谁维护？
- 库存、价格或接口结果变化时如何避免提交错误数据？
- 这个流程最需要覆盖哪些异常和边界条件？

## 代码证据

[购物车第 227～252 行](/Users/aaron/personal-hub/apps/project-2/src/views/Cart.vue:227)、[店铺选择第 341～352 行](/Users/aaron/personal-hub/apps/project-2/src/views/Cart.vue:341)。
