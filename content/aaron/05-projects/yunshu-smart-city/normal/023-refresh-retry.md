---
id: yunshu-smart-city-normal-023-refresh-retry
title: 为什么刷新请求只允许重试一次？
aliases: [能具体解释一下为什么刷新请求只允许重试一次吗？, 从设计取舍看，为什么刷新请求只允许重试一次？, 这个问题在项目中的实际边界是什么？]
category: yunshu-smart-city
difficulty: 基础
priority: normal
projects: [云枢智慧城市数据平台]
keywords: [Token, React, 智慧城市]
---

# 为什么刷新请求只允许重试一次？

## 核心回答

如果刷新后重放的请求仍然 401，再继续自动刷新会形成循环，还可能持续打接口。当前在请求配置上写入 `authRetry`，同一个业务请求最多经历一次“刷新加重放”；之后通知会话失效。临时网络错误的定时刷新属于另一条路径，只在 Token 还有效时按 5 秒间隔重试。

## 回答要点

- 如果刷新后重放的请求仍然 401，再继续自动刷新会形成循环，还可能持续打接口。
- 当前在请求配置上写入 authRetry，同一个业务请求最多经历一次“刷新加重放”；
- 临时网络错误的定时刷新属于另一条路径，只在 Token 还有效时按 5 秒间隔重试。

## 面试官可能追问

- 关于“为什么刷新请求只允许重试一次”，为什么选择当前异步处理方式？
- 请求失败、重复触发或返回乱序时如何保证状态正确？
- 你会怎样测试慢请求和部分失败场景？

## 代码证据

>
> - [authToken.ts，第 51～58 行](/Users/aaron/personal-hub/apps/project-1/src/utils/authToken.ts:51)：已重试请求不再允许刷新。
> - [request.ts，第 35～68 行](/Users/aaron/personal-hub/apps/project-1/src/utils/request.ts:35)：写入重试标记、重放请求和失败退出。
