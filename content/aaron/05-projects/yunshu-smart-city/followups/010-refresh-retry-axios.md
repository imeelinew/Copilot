---
id: yunshu-smart-city-followup-010-refresh-retry-axios
title: 为什么只重试一次？刷新请求为什么不用普通 Axios 实例？POST 也能重试吗？
aliases: [能具体解释一下为什么只重试一次？刷新请求为什么不用普通 Axios 实例？POST 也能重试吗吗？, 从设计取舍看，为什么只重试一次？刷新请求为什么不用普通 Axios 实例？POST 也能重试吗？, 这个问题在项目中的实际边界是什么？]
category: yunshu-smart-city
difficulty: 进阶
priority: normal
projects: [云枢智慧城市数据平台]
keywords: [Axios, 登录鉴权, Token]
---

# 为什么只重试一次？刷新请求为什么不用普通 Axios 实例？POST 也能重试吗？

## 核心回答

原请求只重试一次，是为了防止新 Token 仍然 401 时进入“刷新、重放、再刷新”的死循环。刷新接口单独使用一个 Axios 实例，是为了让刷新请求本身不再进入普通响应拦截器，否则刷新接口的 401 也可能递归触发刷新。当前代码保留原请求配置直接重放，没有按 GET 和 POST 分类，所以技术上 POST 也会重试，但业务上要谨慎：只有服务端保证鉴权失败发生在写入之前，或者写接口支持幂等键时，重放才更可靠。网络超时则不能盲目重试非幂等 POST，因为服务端可能已经执行成功，只是响应没有回来。

## 回答要点

- 原请求只重试一次，是为了防止新 Token 仍然 401 时进入“刷新、重放、再刷新”的死循环。
- 刷新接口单独使用一个 Axios 实例，是为了让刷新请求本身不再进入普通响应拦截器，否则刷新接口的 401 也可能递归触发刷新。
- 当前代码保留原请求配置直接重放，没有按 GET 和 POST 分类，所以技术上 POST 也会重试，但业务上要谨慎：只有服务端保证鉴权失败发生在写入之前，或者写接口支持幂等键时，重放才更可靠。
- 网络超时则不能盲目重试非幂等 POST，因为服务端可能已经执行成功，只是响应没有回来。

## 面试官可能追问

- 关于“为什么只重试一次？刷新请求为什么不用普通 Axios 实例？POST 也能重试吗”，为什么选择当前异步处理方式？
- 请求失败、重复触发或返回乱序时如何保证状态正确？
- 你会怎样测试慢请求和部分失败场景？

## 代码证据

>
> - [request.ts，第 35～69 行](/Users/aaron/personal-hub/apps/project-1/src/utils/request.ts:35)：`authRetry` 标记、刷新和原配置重放。
> - [authSession.ts，第 9～12 行](/Users/aaron/personal-hub/apps/project-1/src/services/authSession.ts:9)：刷新使用独立 Axios 客户端。
> - [auth.ts，第 4～25 行](/Users/aaron/personal-hub/apps/project-1/src/api/auth.ts:4)：登录、验证码和注册明确跳过鉴权刷新。
