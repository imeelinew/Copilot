---
id: engineering-token-security
title: 前端如何保护 Token 或 AI API Key？
aliases: [api key怎么加密, 前端保护密钥, token存哪里, httponly cookie]
category: engineering
difficulty: 高频
priority: high
projects: [轻购]
keywords: [XSS, HttpOnly, Cookie, 服务端代理, 环境变量]
---

# 前端如何保护 Token 或 AI API Key？

## 30 秒回答

真正的 API Key 不能放在前端，也不存在一种前端加密能让浏览器使用密钥却不暴露密钥。正确做法是由自己的后端或 Serverless Function 保存密钥，前端只调用自己的接口。用户 Token 如果放 localStorage 要重点防范 XSS；安全要求更高时可以使用 Secure、HttpOnly、SameSite Cookie，并配合 CSRF 防护。

## 标准回答

首先需要区分服务端密钥和用户登录 Token。AI API Key 属于服务端凭据，不能打包进前端环境变量。因为浏览器需要执行代码和发出请求，只要前端能解密或使用，用户就可以通过源码、网络请求或运行时拿到它。我的做法是让前端请求自己的服务端接口，由服务端读取环境变量中的密钥并调用 AI 服务。

登录 Token 如果保存在 localStorage，接入方便，但 JavaScript 可以读取，因此主要风险是 XSS。安全要求更高时可以由服务端设置 Secure、HttpOnly、SameSite Cookie，让前端脚本无法直接读取，同时需要根据 SameSite 策略考虑 CSRF 防护。

无论采用哪种方式，都还需要短有效期、服务端权限校验、密钥轮换、限流和日志监控。前端混淆或把固定加密密钥写在代码里，只能增加一点分析成本，不能当成安全方案。

## 回答要点

- 明确说“前端无法真正保密服务端 Key”。
- API Key 使用后端代理。
- localStorage 重点考虑 XSS，Cookie 还要考虑 CSRF。

## 面试官可能追问

- Vite 中 VITE_ 前缀环境变量安全吗？
- HttpOnly Cookie 为什么能降低 XSS 窃取 Token 的风险？
- 服务端代理如何避免被别人无限调用？

## 代码证据

- /Users/eli/Dev/mobile-shop/src/ai/providers/openai.ts：请求自己的 /ai/chat 接口
