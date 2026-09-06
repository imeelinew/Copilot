---
id: yunshu-smart-city-followup-008-token
title: 追问：Token 真的过期了还能刷新吗？你有 refreshToken 吗？
aliases: [能具体解释一下Token 真的过期了还能刷新吗？你有 refreshToken 吗吗？, 从设计取舍看，Token 真的过期了还能刷新吗？你有 refreshToken 吗？, 这个问题在项目中的实际边界是什么？]
category: yunshu-smart-city
difficulty: 基础
priority: high
projects: [云枢智慧城市数据平台]
keywords: [Token, 登录鉴权, React]
---

# 追问：Token 真的过期了还能刷新吗？你有 refreshToken 吗？

## 核心回答

当前项目没有看到独立的 refreshToken，而是使用尚未过期的 Token 调用刷新接口，所以它更准确地说是“提前续期”。刷新前会检查 `exp`，已经过期就直接拒绝刷新并让用户重新登录。接口返回 401 时，如果本地 Token 还没过期，可以尝试续期一次，因为 401 也可能来自服务端提前失效或 Token 状态变化。如果要做标准的 accessToken 加 refreshToken，需要服务端支持刷新凭据的存储、轮换、撤销和独立有效期，不是前端多存一个字段就能完成。当前方案的边界就是：一旦错过尚未过期的续期窗口，不能继续无感恢复。

## 回答要点

- 当前项目没有看到独立的 refreshToken，而是使用尚未过期的 Token 调用刷新接口，所以它更准确地说是“提前续期”。
- 刷新前会检查 exp，已经过期就直接拒绝刷新并让用户重新登录。
- 接口返回 401 时，如果本地 Token 还没过期，可以尝试续期一次，因为 401 也可能来自服务端提前失效或 Token 状态变化。
- 如果要做标准的 accessToken 加 refreshToken，需要服务端支持刷新凭据的存储、轮换、撤销和独立有效期，不是前端多存一个字段就能完成。

## 面试官可能追问

- 关于“Token 真的过期了还能刷新吗？你有 refreshToken 吗”，当前方案具体防住了什么风险？
- 客户端被注入脚本或凭据过期时会发生什么？
- 服务端还必须补充哪些校验或权限控制？

## 代码证据

>
> - [authSession.ts，第 63～76 行](/Users/aaron/personal-hub/apps/project-1/src/services/authSession.ts:63)：使用当前 Token 刷新，并拒绝已过期 Token。
> - [authToken.ts，第 51～58 行](/Users/aaron/personal-hub/apps/project-1/src/utils/authToken.ts:51)：只有存在、未过期且未重试的 Token 才允许续期。
> - [SessionManager.tsx，第 101～107 行](/Users/aaron/personal-hub/apps/project-1/src/components/SessionManager.tsx:101)：已过期或无法解析时通知会话失效。
