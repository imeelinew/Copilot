---
id: shiguangji-shop-followup-001-ai-key-localstorage-sessionstorage
title: AI Key 为什么放在 localStorage？为什么不用 sessionStorage、Cookie 或环境变量？
aliases: [能具体解释一下AI Key 为什么放在 localStorage？为什么不用 sessionStorage、Cookie 或环境变量吗？, 从设计取舍看，AI Key 为什么放在 localStorage？为什么不用 sessionStorage、Cookie 或环境变量？, 这个问题在项目中的实际边界是什么？]
category: shiguangji-shop
difficulty: 基础
priority: high
projects: [拾光集移动商城系统]
keywords: [AI Key, localStorage, sessionStorage, HttpOnly Cookie, 列表 Key, 地址管理]
---

# AI Key 为什么放在 localStorage？为什么不用 sessionStorage、Cookie 或环境变量？

## 核心回答

练习版把 AI Key、接口地址和模型名称当成浏览器端配置，优先从 localStorage 读取。这样不需要重新构建项目，就可以在控制台切换 Key、服务地址和模型，刷新页面后配置也还在。但是 localStorage 解决的是保存时间问题，不是安全问题：同源 JavaScript 可以读取它，浏览器直连模型时 Key 也必须进入请求头。

把它换成 sessionStorage 或内存，只会缩短保存时间，Key 仍然在浏览器；换成前端的 `VITE_` 环境变量也不行，因为这类值可能进入构建产物。HttpOnly Cookie 更适合交给服务端管理用户会话，不应该用来把应用共享的模型 Key 发给浏览器。改进版因此让浏览器只调用本站 `/api/ai`，共享 Key 由服务端环境变量保存，再由服务端请求模型。如果真实 Key 曾经进入过浏览器或构建产物，还需要检查暴露范围并轮换。

## 回答要点

- 练习版把 AI Key、接口地址和模型名称当成浏览器端配置，优先从 localStorage 读取。
- 这样不需要重新构建项目，就可以在控制台切换 Key、服务地址和模型，刷新页面后配置也还在。
- 但是 localStorage 解决的是保存时间问题，不是安全问题：同源 JavaScript 可以读取它，浏览器直连模型时 Key 也必须进入请求头。
- 把它换成 sessionStorage 或内存，只会缩短保存时间，Key 仍然在浏览器；

## 面试官可能追问

- 关于“AI Key 为什么放在 localStorage？为什么不用 sessionStorage、Cookie 或环境变量”，当前方案具体防住了什么风险？
- 客户端被注入脚本或凭据过期时会发生什么？
- 服务端还必须补充哪些校验或权限控制？

## 代码证据

> - [练习版配置第 13～38 行](/Users/aaron/CodingPractice/20_Vue3/mobile-shop/src/ai/providers/openai.js:13)：localStorage、`VITE_AI_*` 和默认配置的读取顺序。
> - [练习版请求第 48～63 行](/Users/aaron/CodingPractice/20_Vue3/mobile-shop/src/ai/providers/openai.js:48)：浏览器把 Key 放入上游 Authorization。
> - [改进版客户端第 7～16 行](/Users/aaron/personal-hub/apps/project-2/src/ai/providers/openai.js:7)：浏览器只请求本站 `/api/ai`。
> - [AI 服务端第 141～172 行](/Users/aaron/personal-hub/apps/project-2/api/ai.ts:141)：服务端读取模型配置和 Key，再调用上游。
> - 原理参考：[MDN localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)、[MDN sessionStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage)、[Vite 环境变量](https://vite.dev/guide/env-and-mode)。
