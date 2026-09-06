---
id: yunshu-smart-city-normal-013-stale-response-token-refresh-token
title: 亮点 1：Token 刷新的并发收敛和迟到响应保护
aliases: [请介绍一下项目中的Token 刷新的并发收敛和迟到响应保护。, 你在Token 刷新的并发收敛和迟到响应保护方面具体做了什么？, 这部分的设计思路和边界是什么？]
category: yunshu-smart-city
difficulty: 深入
priority: high
projects: [云枢智慧城市数据平台]
keywords: [Token, 请求乱序, 首页数据, Redux, 自动化测试]
---

# 亮点 1：Token 刷新的并发收敛和迟到响应保护

## 核心回答

这个场景是首页同时发出多条请求，而 Token 恰好接近失效。如果每个 401 都独立刷新，会产生多次刷新请求，不同新 Token 还可能互相覆盖。当前代码把刷新函数包成 single flight：第一次调用创建 Promise，后续调用直接复用，结束后再释放；请求拦截器还用 `authRetry` 标记保证原请求最多重放一次。刷新响应回来时，再比较发起刷新时的旧 Token 和 Redux 当前 Token，如果用户已经退出或切换账号，就丢弃迟到结果。它的限制是锁只在当前浏览器标签页的 JavaScript 上下文内生效，多标签页之间没有协调，而且刷新机制依赖“旧 Token 尚未过期”。我会用并发触发多个 401 的测试确认刷新接口只调用一次，再模拟刷新期间退出，确认旧响应不会恢复会话。

## 回答要点

- 这个场景是首页同时发出多条请求，而 Token 恰好接近失效。
- 如果每个 401 都独立刷新，会产生多次刷新请求，不同新 Token 还可能互相覆盖。
- 当前代码把刷新函数包成 single flight：第一次调用创建 Promise，后续调用直接复用，结束后再释放；
- 请求拦截器还用 authRetry 标记保证原请求最多重放一次。

## 面试官可能追问

- 关于“Token 刷新的并发收敛和迟到响应保护”，当前方案具体防住了什么风险？
- 客户端被注入脚本或凭据过期时会发生什么？
- 服务端还必须补充哪些校验或权限控制？

## 代码证据

>
> - [authToken.ts，第 51～72 行](/Users/aaron/personal-hub/apps/project-1/src/utils/authToken.ts:51)：只允许未重试请求刷新，以及 single flight 的实现。
> - [authSession.ts，第 63～100 行](/Users/aaron/personal-hub/apps/project-1/src/services/authSession.ts:63)：刷新前置条件、响应校验和 Token 变化检查。
> - [request.ts，第 35～69 行](/Users/aaron/personal-hub/apps/project-1/src/utils/request.ts:35)：刷新后重放一次原请求并处理刷新失败。
> - [authSession.test.ts，第 55～96 行](/Users/aaron/personal-hub/apps/project-1/tests/authSession.test.ts:55)：代码中已有的并发 Promise、失败释放和重试条件单元测试。
