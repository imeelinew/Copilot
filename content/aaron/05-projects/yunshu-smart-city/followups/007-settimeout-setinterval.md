---
id: yunshu-smart-city-followup-007-settimeout-setinterval
title: 为什么提前 30 秒刷新？为什么用 setTimeout，不一直 setInterval 检查？
aliases: [能具体解释一下为什么提前 30 秒刷新？为什么用 setTimeout，不一直 setInterval 检查吗？, 从设计取舍看，为什么提前 30 秒刷新？为什么用 setTimeout，不一直 setInterval 检查？, 这个问题在项目中的实际边界是什么？]
category: yunshu-smart-city
difficulty: 深入
priority: normal
projects: [云枢智慧城市数据平台]
keywords: [Token, JWT, 节流]
---

# 为什么提前 30 秒刷新？为什么用 setTimeout，不一直 setInterval 检查？

## 核心回答

提前 30 秒是给网络耗时、服务端处理时间和少量时钟偏差留缓冲，避免请求发出去时 Token 还有效，处理到一半却过期。这个数值是当前工程配置，不是 JWT 规定的最优值，也没有证据说明它经过压测。因为代码已经知道准确的 `exp`，可以直接计算“过期时间减当前时间再减 30 秒”，用一次 `setTimeout` 定点触发；拿到新 Token 后再重新计算，比固定 `setInterval` 反复检查更直接。临时刷新失败时会在 Token 仍有效的范围内每 5 秒重试。边界是后台标签页节流、电脑休眠和本地时钟偏差都可能让定时器延迟，后续可以在页面恢复可见或发送请求前再复查。

## 回答要点

- 提前 30 秒是给网络耗时、服务端处理时间和少量时钟偏差留缓冲，避免请求发出去时 Token 还有效，处理到一半却过期。
- 这个数值是当前工程配置，不是 JWT 规定的最优值，也没有证据说明它经过压测。
- 因为代码已经知道准确的 exp，可以直接计算“过期时间减当前时间再减 30 秒”，用一次 setTimeout 定点触发；
- 拿到新 Token 后再重新计算，比固定 setInterval 反复检查更直接。

## 面试官可能追问

- 关于“为什么提前 30 秒刷新？为什么用 setTimeout，不一直 setInterval 检查”，你为什么选择当前方案？
- “为什么提前 30 秒刷新？为什么用 setTimeout，不一直 setInterval 检查”在异常数据或并发场景下怎么处理？
- 如果改用替代方案，主要成本和收益分别是什么？

## 代码证据

>
> - [authToken.ts，第 1～2 行](/Users/aaron/personal-hub/apps/project-1/src/utils/authToken.ts:1)：30 秒提前量和 5 秒重试间隔。
> - [authToken.ts，第 40～49 行](/Users/aaron/personal-hub/apps/project-1/src/utils/authToken.ts:40)：根据 exp 计算单次刷新延迟。
> - [SessionManager.tsx，第 68～114 行](/Users/aaron/personal-hub/apps/project-1/src/components/SessionManager.tsx:68)：setTimeout 调度、失败重试和清理。
