---
id: shiguangji-shop-normal-018-ai-key-localstorage
title: 为什么 AI Key 原来放 localStorage，后来又放到服务端？
aliases: [能具体解释一下为什么 AI Key 原来放 localStorage，后来又放到服务端吗？, 从设计取舍看，为什么 AI Key 原来放 localStorage，后来又放到服务端？, 这个问题在项目中的实际边界是什么？]
category: shiguangji-shop
difficulty: 进阶
priority: high
projects: [拾光集移动商城系统]
keywords: [AI Key, localStorage, 列表 Key, 登录鉴权, 地址管理, 限流]
---

# 为什么 AI Key 原来放 localStorage，后来又放到服务端？

## 核心回答

练习版把 Key、接口地址和模型名称当成浏览器端配置，优点是修改方便、刷新后仍然存在，但 localStorage 不是安全存储，同源 JavaScript 可以读取，浏览器直连模型时 Key 也必须出现在请求里。改进版让浏览器只请求本站接口，共享 Key 由服务端环境变量保存。迁移后仍需要鉴权、限流和费用控制，不能认为放到服务端就不会被滥用。

## 回答要点

- 练习版把 Key、接口地址和模型名称当成浏览器端配置，优点是修改方便、刷新后仍然存在，但 localStorage 不是安全存储，同源 JavaScript 可以读取，浏览器直连模型时 Key 也必须出现在请求里。
- 改进版让浏览器只请求本站接口，共享 Key 由服务端环境变量保存。
- 迁移后仍需要鉴权、限流和费用控制，不能认为放到服务端就不会被滥用。

## 面试官可能追问

- 关于“为什么 AI Key 原来放 localStorage，后来又放到服务端”，当前方案具体防住了什么风险？
- 客户端被注入脚本或凭据过期时会发生什么？
- 服务端还必须补充哪些校验或权限控制？

## 代码证据

[练习版配置第 13～38 行](/Users/aaron/CodingPractice/20_Vue3/mobile-shop/src/ai/providers/openai.js:13)、[部署版客户端第 7～16 行](/Users/aaron/personal-hub/apps/project-2/src/ai/providers/openai.js:7)、[服务端 Key 第 141～172 行](/Users/aaron/personal-hub/apps/project-2/api/ai.ts:141)。
