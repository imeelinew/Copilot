---
id: after-sales-auth-security
title: 智服工单的登录和接口安全有哪些层次？
aliases: [智服工单安全, JWT bcrypt Helmet CORS]
category: after-sales
difficulty: 进阶
priority: high
projects: [智服工单]
keywords: [JWT, bcrypt, Helmet, CORS, originGuard, 限流]
---

# 智服工单的登录和接口安全有哪些层次？

## 核心回答

服务端用 bcrypt 保存密码哈希，登录后签发 JWT；中间件负责验证 token，`allowRoles` 再限制角色，生产环境的 `originGuard` 用 timing-safe 比较检查受信来源。Helmet、CORS、请求体限制和参数校验负责减少常见攻击面，SQL 查询使用参数化和白名单。错误响应不能泄露 SQL 或堆栈，个人资料和日志也要按最小必要原则处理。

## 追问：JWT 里用户被停用后怎么办？

JWT 自身在有效期内通常仍然可验证，所以只看签名不能立刻反映停用状态。每次敏感请求可以查询用户当前状态，或者维护 token version / 黑名单；代价是数据库访问或缓存复杂度增加。现有系统的 token 有有效期，我会把“停用后立即失效”的策略作为需要和后端契约确认的安全要求。

## 追问：originGuard 能代替 CORS 吗？

不能。CORS 是浏览器跨源读取控制，originGuard 更像服务间或反向代理的额外来源校验，防止不该直连的请求进入应用。两者要分别配置，密钥要能轮换，开发环境不能为了方便把生产密钥写进前端或仓库。鉴权、来源校验和业务权限仍是三件事。

