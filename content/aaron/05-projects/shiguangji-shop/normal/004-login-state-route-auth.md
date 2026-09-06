---
id: shiguangji-shop-normal-004-login-state-route-auth
title: 注册登录和路由鉴权
aliases: [请介绍一下项目中的注册登录和路由鉴权。, 你在注册登录和路由鉴权方面具体做了什么？, 这部分的设计思路和边界是什么？]
category: shiguangji-shop
difficulty: 深入
priority: high
projects: [拾光集移动商城系统]
keywords: [登录鉴权, 页面导航, localStorage, Token, AES, HTTPS]
---

# 注册登录和路由鉴权

## 核心回答

注册和登录使用 Vant Form 收集用户名和密码，并在提交前检查输入格式。密码不会直接作为明文参数发送，前端会先把当前时间戳拼到密码前面，再用 CryptoJS 的 AES 进行加密，然后把加密结果交给登录或者注册接口。接口登录成功后，页面把 accessToken 保存到 localStorage，之后 Axios 请求拦截器会自动带上这个 Token。

页面访问控制使用 Vue Router 的全局前置守卫。登录页和注册页放在白名单里，访问其他页面时先检查本地有没有 Token；如果没有，就跳回登录页。退出登录时删除本地 Token，再返回登录页。这样做可以把登录状态、页面跳转和接口鉴权串起来，避免每个页面分别写一套登录判断。

不过我要把边界说清楚：前端路由守卫只是控制页面跳转，不能代替服务端权限校验；本地存在 Token 也不代表 Token 一定有效。AES 也是为了配合当前接口的请求格式，它不能替代 HTTPS，更不能证明后端怎样保存密码。

## 回答要点

- 注册和登录使用 Vant Form 收集用户名和密码，并在提交前检查输入格式。
- 密码不会直接作为明文参数发送，前端会先把当前时间戳拼到密码前面，再用 CryptoJS 的 AES 进行加密，然后把加密结果交给登录或者注册接口。
- 接口登录成功后，页面把 accessToken 保存到 localStorage，之后 Axios 请求拦截器会自动带上这个 Token。
- 页面访问控制使用 Vue Router 的全局前置守卫。

## 面试官可能追问

- 关于“注册登录和路由鉴权”，当前方案具体防住了什么风险？
- 客户端被注入脚本或凭据过期时会发生什么？
- 服务端还必须补充哪些校验或权限控制？

## 代码证据

> - [注册页第 67～92 行](/Users/aaron/personal-hub/apps/project-2/src/views/Register.vue:67)：注册提交和输入校验。
> - [登录页第 74～101 行](/Users/aaron/personal-hub/apps/project-2/src/views/Login.vue:74)：登录提交、Token 保存和输入校验。
> - [cryptojs.ts 第 10～26 行](/Users/aaron/personal-hub/apps/project-2/src/utils/cryptojs.ts:10)：时间戳拼接、AES、ECB 和 Pkcs7 配置。
> - [auth.ts 第 1～10 行](/Users/aaron/personal-hub/apps/project-2/src/utils/auth.ts:1)：Token 的保存、读取和删除。
> - [路由第 72～82 行](/Users/aaron/personal-hub/apps/project-2/src/router/index.ts:72)：白名单和全局前置守卫。
> - [个人中心第 79～82、132～135 行](/Users/aaron/personal-hub/apps/project-2/src/views/Mine.vue:79)：退出按钮及处理函数。
