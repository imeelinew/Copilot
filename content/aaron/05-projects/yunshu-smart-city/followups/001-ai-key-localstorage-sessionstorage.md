---
id: yunshu-smart-city-followup-001-ai-key-localstorage-sessionstorage
title: AI Key 为什么存在 localStorage？为什么不放 sessionStorage、内存、Cookie 或服务端？
aliases: [能具体解释一下AI Key 为什么存在 localStorage？为什么不放 sessionStorage、内存、Cookie 或服务端吗？, 从设计取舍看，AI Key 为什么存在 localStorage？为什么不放 sessionStorage、内存、Cookie 或服务端？, 这个问题在项目中的实际边界是什么？]
category: yunshu-smart-city
difficulty: 深入
priority: high
projects: [云枢智慧城市数据平台]
keywords: [AI Key, localStorage, sessionStorage, HttpOnly Cookie, 列表 Key, XSS]
---

# AI Key 为什么存在 localStorage？为什么不放 sessionStorage、内存、Cookie 或服务端？

## 核心回答

当前功能允许用户配置自己的 AI Key。放在 localStorage 的直接效果是刷新页面甚至重新打开浏览器后还能读取，用户不用反复输入；但它是一个方便性方案，不是安全存储，因为同源 JavaScript 可以读取，发生 XSS 或使用共享电脑时就有泄露风险。sessionStorage 主要把保存范围缩短到当前标签页会话，内存状态则刷新就丢失，它们能减少留存时间，但都不能从根本上阻止正在运行的恶意脚本读取。如果是平台统一提供的 Key，更合适的是放在服务端，由服务端代理模型请求；如果必须使用用户自己的 Key，我会优先提供“仅本次使用”和主动清除选项。当前代码还没有这些改进。

## 回答要点

- 当前功能允许用户配置自己的 AI Key。
- 放在 localStorage 的直接效果是刷新页面甚至重新打开浏览器后还能读取，用户不用反复输入；
- 但它是一个方便性方案，不是安全存储，因为同源 JavaScript 可以读取，发生 XSS 或使用共享电脑时就有泄露风险。
- sessionStorage 主要把保存范围缩短到当前标签页会话，内存状态则刷新就丢失，它们能减少留存时间，但都不能从根本上阻止正在运行的恶意脚本读取。

## 面试官可能追问

- 关于“AI Key 为什么存在 localStorage？为什么不放 sessionStorage、内存、Cookie 或服务端”，当前方案具体防住了什么风险？
- 客户端被注入脚本或凭据过期时会发生什么？
- 服务端还必须补充哪些校验或权限控制？

## 代码证据

>
> - [AI.tsx，第 36～43 行](/Users/aaron/personal-hub/apps/project-1/src/pages/AI.tsx:36)：从 localStorage 读取 AI 配置。
> - [AI.tsx，第 68～78 行](/Users/aaron/personal-hub/apps/project-1/src/pages/AI.tsx:68)：把 Key、Base URL 和模型名直接写入 localStorage。
> - [AI.tsx，第 149～166 行](/Users/aaron/personal-hub/apps/project-1/src/pages/AI.tsx:149)：把浏览器中的 Key 放进模型请求头。
