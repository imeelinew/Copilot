---
id: yunshu-smart-city-normal-032-ai-key-token
title: 浏览器长期保存 Token 和 AI Key
aliases: [请介绍一下项目中的浏览器长期保存 Token 和 AI Key。, 你在浏览器长期保存 Token 和 AI Key方面具体做了什么？, 这部分的设计思路和边界是什么？]
category: yunshu-smart-city
difficulty: 深入
priority: high
projects: [云枢智慧城市数据平台]
keywords: [AI Key, Token, 列表 Key, localStorage, sessionStorage, HttpOnly Cookie]
---

# 浏览器长期保存 Token 和 AI Key

## 核心回答

当前 Token 通过 redux-persist 进入 localStorage，AI Key 也直接保存在 localStorage。当页面存在 XSS、使用共享电脑或用户退出后没有清理 AI 配置时，这些值可能被同源脚本或后续使用者读取，影响是账号会话和第三方模型额度都有泄露风险。改进时，我会让服务端用 Secure、HttpOnly Cookie 管理会话，AI 平台密钥由服务端托管；用户自带 Key 时至少改成内存或 sessionStorage，提供清除按钮，并收紧 CSP 和输入输出处理。面试时我会说这是当前实现的安全取舍和改进方向，不会说 localStorage 本身安全，也不会把前端 AES 当成解决方案。

## 回答要点

- 当前 Token 通过 redux-persist 进入 localStorage，AI Key 也直接保存在 localStorage。
- 当页面存在 XSS、使用共享电脑或用户退出后没有清理 AI 配置时，这些值可能被同源脚本或后续使用者读取，影响是账号会话和第三方模型额度都有泄露风险。
- 改进时，我会让服务端用 Secure、HttpOnly Cookie 管理会话，AI 平台密钥由服务端托管；
- 用户自带 Key 时至少改成内存或 sessionStorage，提供清除按钮，并收紧 CSP 和输入输出处理。

## 面试官可能追问

- 关于“浏览器长期保存 Token 和 AI Key”，当前方案具体防住了什么风险？
- 客户端被注入脚本或凭据过期时会发生什么？
- 服务端还必须补充哪些校验或权限控制？

## 代码证据

>
> - [store/index.ts，第 13～18 行](/Users/aaron/personal-hub/apps/project-1/src/store/index.ts:13)：整个 Redux 根状态使用 Web Storage 持久化。
> - [authSlice.tsx，第 5～26 行](/Users/aaron/personal-hub/apps/project-1/src/store/slice/authSlice.tsx:5)：持久化状态中包含 Token 和用户信息。
> - [AI.tsx，第 36～78 行](/Users/aaron/personal-hub/apps/project-1/src/pages/AI.tsx:36)：AI 配置包含 Key 并写入 localStorage。
