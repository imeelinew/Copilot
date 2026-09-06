---
id: yunshu-smart-city-followup-006-ai-key-password-https
title: 追问：网站是 HTTPS，密码和 AI Key 就全程安全了吗？代理在这里解决了什么？
aliases: [能具体解释一下网站是 HTTPS，密码和 AI Key 就全程安全了吗？代理在这里解决了什么吗？, 从设计取舍看，网站是 HTTPS，密码和 AI Key 就全程安全了吗？代理在这里解决了什么？, 这个问题在项目中的实际边界是什么？]
category: yunshu-smart-city
difficulty: 深入
priority: high
projects: [云枢智慧城市数据平台]
keywords: [AI Key, HTTPS, 同源代理, 列表 Key, 登录鉴权, 地址管理]
---

# 追问：网站是 HTTPS，密码和 AI Key 就全程安全了吗？代理在这里解决了什么？

## 核心回答

要按整条链路判断，不能只看浏览器地址栏。浏览器请求同源 `/api`，部署平台再把请求转发到上游；当前重写目标是 HTTP，所以即使用户到部署平台这一段是 HTTPS，也不能说平台到上游这一段同样受 TLS 保护。代理主要解决同源访问和统一接口前缀：开发环境由 Vite proxy 转发，生产环境由 rewrite 转发，页面深层路由则回退到 `index.html`。代理本身不会自动加密上游，也不能证明接口鉴权安全。改进时应让上游提供可信 HTTPS，再验证整个链路；在前端额外写 AES 不能替代传输层保护。

## 回答要点

- 要按整条链路判断，不能只看浏览器地址栏。
- 浏览器请求同源 /api，部署平台再把请求转发到上游；
- 当前重写目标是 HTTP，所以即使用户到部署平台这一段是 HTTPS，也不能说平台到上游这一段同样受 TLS 保护。
- 代理主要解决同源访问和统一接口前缀：开发环境由 Vite proxy 转发，生产环境由 rewrite 转发，页面深层路由则回退到 index.html。

## 面试官可能追问

- 关于“网站是 HTTPS，密码和 AI Key 就全程安全了吗？代理在这里解决了什么”，当前方案具体防住了什么风险？
- 客户端被注入脚本或凭据过期时会发生什么？
- 服务端还必须补充哪些校验或权限控制？

## 代码证据

>
> - [vite.config.ts，第 47～55 行](/Users/aaron/personal-hub/apps/project-1/vite.config.ts:47)：开发环境 `/api` 代理及 HTTP 上游。
> - [vercel.json，第 2～10 行](/Users/aaron/personal-hub/apps/project-1/vercel.json:2)：部署环境 API 重写和 SPA 路由回退。
> - [AI.tsx，第 149～166 行](/Users/aaron/personal-hub/apps/project-1/src/pages/AI.tsx:149)：Token、AI Key 和消息经过 `/api/ai/chat` 发出。
