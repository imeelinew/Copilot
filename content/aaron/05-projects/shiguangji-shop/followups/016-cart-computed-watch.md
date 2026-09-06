---
id: shiguangji-shop-followup-016-cart-computed-watch
title: 购物车全选、店铺全选和半选，为什么不用几个独立布尔值？computed 和 watch 分别做什么？
aliases: [能具体解释一下购物车全选、店铺全选和半选，为什么不用几个独立布尔值？computed 和 watch 分别做什么吗？, 从设计取舍看，购物车全选、店铺全选和半选，为什么不用几个独立布尔值？computed 和 watch 分别做什么？, 这个问题在项目中的实际边界是什么？]
category: shiguangji-shop
difficulty: 基础
priority: normal
projects: [拾光集移动商城系统]
keywords: [购物车, 服务端计价, Vue 3]
---

# 购物车全选、店铺全选和半选，为什么不用几个独立布尔值？computed 和 watch 分别做什么？

## 核心回答

购物车以每件商品的 `checked` 作为基础状态，已选 ID、页面全选、店铺全选和半选都从商品状态计算，而不是再保存几份独立布尔值。这样只有一份真实来源，可以减少单选变化后忘记同步全选状态的问题。页面全选还要先判断购物车不为空，因为空数组调用 `every` 也会返回 true。

`computed` 负责计算能够由当前状态直接得到的结果，例如已选 ID 和是否全选；带 setter 的全选 computed 负责批量修改商品。`watch` 监听已选 ID 的变化，然后请求服务端计价，因为发请求属于状态变化后的副作用。数量改变时 ID 没变，所以数量接口成功后还要主动重新计价。

## 回答要点

- 购物车以每件商品的 checked 作为基础状态，已选 ID、页面全选、店铺全选和半选都从商品状态计算，而不是再保存几份独立布尔值。
- 这样只有一份真实来源，可以减少单选变化后忘记同步全选状态的问题。
- 页面全选还要先判断购物车不为空，因为空数组调用 every 也会返回 true。
- computed 负责计算能够由当前状态直接得到的结果，例如已选 ID 和是否全选；

## 面试官可能追问

- 关于“购物车全选、店铺全选和半选，为什么不用几个独立布尔值？computed 和 watch 分别做什么”，核心业务状态由谁维护？
- 库存、价格或接口结果变化时如何避免提交错误数据？
- 这个流程最需要覆盖哪些异常和边界条件？

## 代码证据

> - [购物车第 227～252 行](/Users/aaron/personal-hub/apps/project-2/src/views/Cart.vue:227)：商品扁平化、已选 ID、全选、金额和 watch。
> - [购物车第 341～352 行](/Users/aaron/personal-hub/apps/project-2/src/views/Cart.vue:341)：店铺全选、半选和批量修改。
> - [购物车第 418～427 行](/Users/aaron/personal-hub/apps/project-2/src/views/Cart.vue:418)：数量成功后主动重新计价。
