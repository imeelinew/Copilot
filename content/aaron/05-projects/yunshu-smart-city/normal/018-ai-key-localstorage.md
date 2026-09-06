---
id: yunshu-smart-city-normal-018-ai-key-localstorage
title: AI 的 Key 为什么存在 localStorage，为什么不放别处？
aliases: [能具体解释一下AI 的 Key 为什么存在 localStorage，为什么不放别处吗？, 从设计取舍看，AI 的 Key 为什么存在 localStorage，为什么不放别处？, 这个问题在项目中的实际边界是什么？]
category: yunshu-smart-city
difficulty: 深入
priority: normal
projects: [云枢智慧城市数据平台]
keywords: [AI Key, localStorage, 列表 Key, 登录鉴权, sessionStorage, AES]
---

# AI 的 Key 为什么存在 localStorage，为什么不放别处？

## 核心回答

当前选择 localStorage 的直接原因是刷新页面后仍保留用户配置，使用成本低。但这不是安全存储：同源脚本都能读取，发生 XSS 时 Key 可能泄露，而且退出登录不会自动删除它。sessionStorage 只能缩短保留时间，仍防不了同源脚本；用 AES 在前端加密也解决不了，因为解密密钥同样要放在前端。更合理的方案是让服务端托管平台密钥，前端只持有当前站点的会话；如果必须使用用户自己的 Key，可以只保存在内存或 sessionStorage，并提供明确的清除入口和风险提示。

## 回答要点

- 当前选择 localStorage 的直接原因是刷新页面后仍保留用户配置，使用成本低。
- 但这不是安全存储：同源脚本都能读取，发生 XSS 时 Key 可能泄露，而且退出登录不会自动删除它。
- sessionStorage 只能缩短保留时间，仍防不了同源脚本；
- 用 AES 在前端加密也解决不了，因为解密密钥同样要放在前端。

## 面试官可能追问

- 关于“AI 的 Key 为什么存在 localStorage，为什么不放别处”，当前方案具体防住了什么风险？
- 客户端被注入脚本或凭据过期时会发生什么？
- 服务端还必须补充哪些校验或权限控制？

## 代码证据

>
> - [AI.tsx，第 36～43 行](/Users/aaron/personal-hub/apps/project-1/src/pages/AI.tsx:36)：从 localStorage 读取 AI 配置。
> - [AI.tsx，第 68～78 行](/Users/aaron/personal-hub/apps/project-1/src/pages/AI.tsx:68)：把 Key、地址和模型名写入 localStorage。
> - [AI.tsx，第 379～381 行](/Users/aaron/personal-hub/apps/project-1/src/pages/AI.tsx:379)：界面说明配置保存在当前浏览器。
