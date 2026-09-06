---
id: shiguangji-shop-normal-027-login-state-validation
title: 登录校验规则和登录态处理还需要统一
aliases: [请介绍一下项目中的登录校验规则和登录态处理还需要统一。, 你在登录校验规则和登录态处理还需要统一方面具体做了什么？, 这部分的设计思路和边界是什么？]
category: shiguangji-shop
difficulty: 基础
priority: normal
projects: [拾光集移动商城系统]
keywords: [登录鉴权, 请求封装, 验证方法, localStorage, HttpOnly Cookie, Token]
---

# 登录校验规则和登录态处理还需要统一

## 核心回答

当前注册页和登录页的密码正则不一致。例如只包含小写字母和数字的密码可以通过注册校验，却可能在登录页被拦住。这个问题应该把密码规则抽成一个公共校验函数，并和服务端策略保持一致。登录页主要检查必填和合理边界，不应该用新的复杂度规则挡住已经存在的合法密码。

登录态方面，路由守卫只判断 localStorage 里有没有 Token，请求层也没有统一处理 Token 过期、401 和刷新流程。后续可以根据后端认证方案补充统一失效处理，或者改成由服务端维护 HttpOnly Cookie 会话。无论采用哪种方式，真正的身份和权限都必须由后端验证。

## 回答要点

- 当前注册页和登录页的密码正则不一致。
- 例如只包含小写字母和数字的密码可以通过注册校验，却可能在登录页被拦住。
- 这个问题应该把密码规则抽成一个公共校验函数，并和服务端策略保持一致。
- 登录页主要检查必填和合理边界，不应该用新的复杂度规则挡住已经存在的合法密码。

## 面试官可能追问

- 关于“登录校验规则和登录态处理还需要统一”，你为什么选择当前方案？
- “登录校验规则和登录态处理还需要统一”在异常数据或并发场景下怎么处理？
- 如果改用替代方案，主要成本和收益分别是什么？

## 代码证据

> - [注册页第 90～92 行](/Users/aaron/personal-hub/apps/project-2/src/views/Register.vue:90)：注册要求至少包含小写字母和数字。
> - [登录页第 96～101 行](/Users/aaron/personal-hub/apps/project-2/src/views/Login.vue:96)：登录规则排除了部分注册页允许的组合。
> - [路由第 72～82 行](/Users/aaron/personal-hub/apps/project-2/src/router/index.ts:72)：只检查 Token 是否存在。
> - [request.ts 第 27～55 行](/Users/aaron/personal-hub/apps/project-2/src/utils/request.ts:27)：注入 Token，但错误响应只向页面继续抛出。
