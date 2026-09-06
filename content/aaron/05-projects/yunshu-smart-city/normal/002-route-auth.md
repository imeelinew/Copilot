---
id: yunshu-smart-city-normal-002-route-auth
title: 前端路由鉴权
aliases: [请介绍一下项目中的前端路由鉴权。, 你在前端路由鉴权方面具体做了什么？, 这部分的设计思路和边界是什么？]
category: yunshu-smart-city
difficulty: 深入
priority: high
projects: [云枢智慧城市数据平台]
keywords: [登录鉴权, 首页数据, 组件设计, 页面导航, 验证方法, Token]
---

# 前端路由鉴权

## 核心回答

用户登录时先填写账号、密码和验证码，前端把验证码 ID 和验证码内容一起交给登录接口。业务码成功后，我把 Token 和用户信息写入 Redux，再跳转到首页。进入受保护页面之前，`UseAuth` 会检查当前有没有 Token，并读取 JWT，也就是服务端签发的登录凭证中的过期时间；没有 Token 就回到登录页，Token 已过期就先停止渲染业务页面，由全局会话组件提示重新登录。把判断放在统一路由入口，是为了避免每个页面各写一套登录检查，也能避免过期状态下先闪出业务内容。它的边界是：前端只是在控制页面是否显示，JWT 签名校验和接口权限必须由服务端完成，不能把前端路由守卫说成完整的安全鉴权。

## 回答要点

- 用户登录时先填写账号、密码和验证码，前端把验证码 ID 和验证码内容一起交给登录接口。
- 业务码成功后，我把 Token 和用户信息写入 Redux，再跳转到首页。
- 进入受保护页面之前，UseAuth 会检查当前有没有 Token，并读取 JWT，也就是服务端签发的登录凭证中的过期时间；
- 没有 Token 就回到登录页，Token 已过期就先停止渲染业务页面，由全局会话组件提示重新登录。

## 面试官可能追问

- 关于“前端路由鉴权”，当前方案具体防住了什么风险？
- 客户端被注入脚本或凭据过期时会发生什么？
- 服务端还必须补充哪些校验或权限控制？

## 代码证据

>
> - [Login.tsx，第 33～57 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Login.tsx:33)：提交登录参数、判断业务码、保存登录信息并跳转。
> - [auth.ts，第 4～25 行](/Users/aaron/personal-hub/apps/project-1/src/api/auth.ts:4)：登录、验证码和注册接口跳过鉴权及自动刷新。
> - [authSlice.tsx，第 5～26 行](/Users/aaron/personal-hub/apps/project-1/src/store/slice/authSlice.tsx:5)：Token 和用户信息的 Redux 状态及退出操作。
> - [UseAuth.tsx，第 8～32 行](/Users/aaron/personal-hub/apps/project-1/src/hooks/UseAuth.tsx:8)：白名单、未登录跳转和过期页面拦截。
> - [router/index.tsx，第 30～161 行](/Users/aaron/personal-hub/apps/project-1/src/router/index.tsx:30)：受保护布局和登录页接入统一路由守卫。
