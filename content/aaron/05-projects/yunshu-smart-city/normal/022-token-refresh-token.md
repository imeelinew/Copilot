---
id: yunshu-smart-city-normal-022-token-refresh-token
title: 为什么提前 30 秒刷新 Token？
aliases: [能具体解释一下为什么提前 30 秒刷新 Token吗？, 从设计取舍看，为什么提前 30 秒刷新 Token？, 这个问题在项目中的实际边界是什么？]
category: yunshu-smart-city
difficulty: 深入
priority: high
projects: [云枢智慧城市数据平台]
keywords: [Token, React, 智慧城市]
---

# 为什么提前 30 秒刷新 Token？

## 核心回答

30 秒是一个工程缓冲，用来给网络耗时和时钟偏差留空间，避免刚发出的业务请求在服务端处理时 Token 已经过期。它不是由当前代码证明出来的最优值，应该结合 Token 生命周期、接口延迟和服务端容忍范围配置化。当前 Token 剩余不到 30 秒时会立即刷新，临时错误则每 5 秒重试，但不会越过真实过期时间。

## 回答要点

- 30 秒是一个工程缓冲，用来给网络耗时和时钟偏差留空间，避免刚发出的业务请求在服务端处理时 Token 已经过期。
- 它不是由当前代码证明出来的最优值，应该结合 Token 生命周期、接口延迟和服务端容忍范围配置化。
- 当前 Token 剩余不到 30 秒时会立即刷新，临时错误则每 5 秒重试，但不会越过真实过期时间。

## 面试官可能追问

- 关于“为什么提前 30 秒刷新 Token”，当前方案具体防住了什么风险？
- 客户端被注入脚本或凭据过期时会发生什么？
- 服务端还必须补充哪些校验或权限控制？

## 代码证据

>
> - [authToken.ts，第 1～2 行](/Users/aaron/personal-hub/apps/project-1/src/utils/authToken.ts:1)：30 秒提前量和 5 秒重试间隔。
> - [authToken.ts，第 40～49 行](/Users/aaron/personal-hub/apps/project-1/src/utils/authToken.ts:40)：刷新延迟计算。
> - [SessionManager.tsx，第 88～107 行](/Users/aaron/personal-hub/apps/project-1/src/components/SessionManager.tsx:88)：临时失败只在 Token 剩余有效期内重试。
