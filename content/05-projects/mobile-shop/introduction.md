---
id: mobile-shop-introduction
title: 介绍一下轻购项目
aliases: [轻购项目介绍, 移动端电商项目, 最熟悉的vue3项目]
category: mobile-shop
difficulty: 必问
priority: high
projects: [轻购]
keywords: [Vue3, TypeScript, Vant, 电商, 移动端]
---

# 介绍一下轻购项目

## 30 秒回答

轻购是我独立完成前端的移动端电商项目，使用 Vue 3、TypeScript、Vant 和 Axios，覆盖登录、商品搜索、购物车、地址、订单确认和订单管理等购物流程。我重点优化了 AI 搜索联想的稳定性，以及购物车和订单之间的复杂状态联动。

## 标准回答

轻购是一个面向移动端用户的电商 Web 应用，前端由我独立完成。技术栈是 Vue 3、TypeScript、Vue Router、Vant、Axios、SCSS 和 Vite。

功能上覆盖了注册登录、商品浏览和搜索、购物车、收货地址、订单确认、支付及订单管理，形成了比较完整的购物流程。

这个项目里我认为最值得介绍的是 AI 搜索联想。它不只是调用接口，我还处理了 300 毫秒防抖、取消旧请求、响应乱序、五分钟缓存、返回格式校验和本地降级。另外在购物车中，需要处理店铺和商品的嵌套选择、全选、数量修改和金额联动；在订单确认流程中，则使用 sessionStorage 维护跨页面数据，并在订单创建后及时清理。

通过这个项目，我对移动端交互、异步请求的竞态问题以及第三方服务的容错设计有了更具体的实践。

## 回答要点

- 明确说“前端由我独立完成”。
- 功能概述不超过三句话。
- 主动引导到 AI 搜索稳定性和购物流程状态。

## 面试官可能追问

- 为什么订单数据放 sessionStorage？
- 搜索请求为什么既取消又使用请求编号？
- 购物车快速点击如何避免并发问题？

## 代码证据

- /Users/eli/Dev/mobile-shop/src/views/SearchView.vue
- /Users/eli/Dev/mobile-shop/src/views/CartView.vue
- /Users/eli/Dev/mobile-shop/src/views/OrderConfirmView.vue
