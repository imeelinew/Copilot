---
id: vue-router-guards
title: 路由守卫有哪些？怎么用它做登录拦截？
aliases: [路由守卫, beforeEach, 登录拦截, 权限路由]
category: vue
difficulty: 高频
priority: high
projects: [智服工单]
keywords: [beforeEach, afterEach, beforeEnter, beforeRouteEnter, token]
---

# 路由守卫有哪些？怎么用它做登录拦截？

## 核心回答

分三层。全局的：router.beforeEach 每次跳转前都走，最常用来做登录拦截和权限校验；afterEach 跳转完成后走，适合改页面标题、上报埋点。路由独享的：写在某条路由配置里的 beforeEnter，只管这一条。组件内的：beforeRouteEnter、beforeRouteUpdate、beforeRouteLeave，比如表单页离开前弹确认"内容还没保存，确定离开吗"。

登录拦截的做法：beforeEach 里看目标路由的 meta 需不需要登录，再查本地 token，没有就重定向到登录页，并把原目标地址捎上，登录成功后跳回原页面。写的时候注意所有分支都要放行，不然跳转会卡死。

## 展开回答

Vue Router 4 的 beforeEach 支持直接返回值：return false 取消跳转，return 一个路由对象就重定向，官方更推荐这种风格，next 的写法还在。beforeRouteEnter 比较特殊，触发时组件实例还没创建，里面没有 this，要拿实例得在 next 回调里接 vm。

## 面试官可能追问

- beforeEach 里怎么区分哪些路由需要登录？
- beforeRouteUpdate 什么时候触发？
- afterEach 和 beforeEach 的区别？
