---
id: shiguangji-shop-normal-007-cart
title: 购物车
aliases: [请介绍一下项目中的购物车。, 你在购物车方面具体做了什么？, 这部分的设计思路和边界是什么？]
category: shiguangji-shop
difficulty: 基础
priority: normal
projects: [拾光集移动商城系统]
keywords: [购物车, 订单流程, sessionStorage, 请求乱序, 服务端计价, Vant Weapp]
---

# 购物车

## 核心回答

购物车接口返回的数据包含店铺、优惠分组和商品，我先把这些嵌套数据整理成“店铺下面放商品”的结构，再给每件商品补充 checked 状态。商品勾选是最基础的数据，店铺全选、店铺半选、页面全选和已选商品 ID 都根据它计算。这样不用同时维护很多份真假状态，可以减少全选和单选显示不一致的问题。

用户勾选商品后，页面会把选中的 basketId 发给服务端，由服务端返回商品总价、优惠金额和最终应付金额。最终价格放到服务端计算，是因为真实价格可能受到商品价格变化、店铺优惠和其他业务规则影响，不能只依赖前端把单价相加。连续勾选时可能同时存在多次计价请求，所以我给每次请求生成递增编号，只有最新请求才能更新页面金额，防止旧请求后返回，把价格改回上一次的选择结果。

修改数量使用 Vant Stepper 的 `before-change`。前端先计算新旧数量的差值并调用接口，成功后才允许步进器更新，失败就保持原来的数量；同一件商品正在修改时会暂时禁止重复操作。删除成功后再从本地列表移除商品和空店铺。点击结算时，把本次选中的 basketId 写入 sessionStorage，然后进入确认订单页重新请求服务端确认数据。

## 回答要点

- 购物车接口返回的数据包含店铺、优惠分组和商品，我先把这些嵌套数据整理成“店铺下面放商品”的结构，再给每件商品补充 checked 状态。
- 商品勾选是最基础的数据，店铺全选、店铺半选、页面全选和已选商品 ID 都根据它计算。
- 这样不用同时维护很多份真假状态，可以减少全选和单选显示不一致的问题。
- 用户勾选商品后，页面会把选中的 basketId 发给服务端，由服务端返回商品总价、优惠金额和最终应付金额。

## 面试官可能追问

- 关于“购物车”，核心业务状态由谁维护？
- 库存、价格或接口结果变化时如何避免提交错误数据？
- 这个流程最需要覆盖哪些异常和边界条件？

## 代码证据

> - [购物车第 227～252 行](/Users/aaron/personal-hub/apps/project-2/src/views/Cart.vue:227)：全部商品、选中 ID、页面全选、金额单位转换和计价监听。
> - [购物车第 261～307 行](/Users/aaron/personal-hub/apps/project-2/src/views/Cart.vue:261)：按店铺合并优惠分组中的商品并加载列表。
> - [购物车第 341～352 行](/Users/aaron/personal-hub/apps/project-2/src/views/Cart.vue:341)：店铺全选、半选和批量切换。
> - [购物车第 364～396 行](/Users/aaron/personal-hub/apps/project-2/src/views/Cart.vue:364)：服务端计价、请求编号和旧结果失效。
> - [购物车第 99～109、399～427 行](/Users/aaron/personal-hub/apps/project-2/src/views/Cart.vue:99)：异步步进器、数量差值、按商品防重复和失败回退。
> - [购物车第 430～475 行](/Users/aaron/personal-hub/apps/project-2/src/views/Cart.vue:430)：单项删除和清空购物车。
> - [购物车第 481～496 行](/Users/aaron/personal-hub/apps/project-2/src/views/Cart.vue:481)：把结算参数写入 sessionStorage 并跳转确认页。
