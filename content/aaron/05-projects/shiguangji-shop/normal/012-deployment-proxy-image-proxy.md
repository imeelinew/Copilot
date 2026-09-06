---
id: shiguangji-shop-normal-012-deployment-proxy-image-proxy
title: 部署代理和旧图片处理
aliases: [请介绍一下项目中的部署代理和旧图片处理。, 你在部署代理和旧图片处理方面具体做了什么？, 这部分的设计思路和边界是什么？]
category: shiguangji-shop
difficulty: 深入
priority: normal
projects: [拾光集移动商城系统]
keywords: [同源代理, 地址管理, HttpOnly Cookie, Token, HTTPS, XSS]
---

# 部署代理和旧图片处理

## 核心回答

这个项目原来的商城接口和图片资源来自不同的旧服务。部署版没有让浏览器直接访问这些地址，而是统一使用本站路径：商城请求走 `/api`，图片走 `/shop-images`，AI 走 `/api/ai`，最后才由 Vercel 服务端函数访问固定上游。这样前端页面不需要关心真实服务地址，也便于集中控制请求头、超时和错误返回。

旧图片地址不只出现在普通字段里，也可能在数组、对象或者商品富文本中，所以响应拦截器会递归查找字符串，把指定旧域名替换成本项目的图片路径。图片代理只允许 GET 和 HEAD，请求路径必须是符合规则的图片文件；返回后还会检查 Content-Type 和文件大小，不会把业务 Token 或 Cookie 转发给图片服务器。图片可以缓存，商城用户数据则明确不缓存。

这些限制是为了让代理只完成确定的业务任务，避免它变成可以访问任意网址的开放代理。当前商城和图片固定上游仍使用 HTTP，因此只能说浏览器到本站这一段使用同源入口，不能把它描述成完整的全链路 HTTPS。

## 回答要点

- 这个项目原来的商城接口和图片资源来自不同的旧服务。
- 部署版没有让浏览器直接访问这些地址，而是统一使用本站路径：商城请求走 /api，图片走 /shop-images，AI 走 /api/ai，最后才由 Vercel 服务端函数访问固定上游。
- 这样前端页面不需要关心真实服务地址，也便于集中控制请求头、超时和错误返回。
- 旧图片地址不只出现在普通字段里，也可能在数组、对象或者商品富文本中，所以响应拦截器会递归查找字符串，把指定旧域名替换成本项目的图片路径。

## 面试官可能追问

- 关于“部署代理和旧图片处理”，你为什么选择当前方案？
- “部署代理和旧图片处理”在异常数据或并发场景下怎么处理？
- 如果改用替代方案，主要成本和收益分别是什么？

## 代码证据

> - [Vercel 配置第 11～18 行](/Users/aaron/personal-hub/apps/project-2/vercel.json:11)：AI、图片、商城代理和 SPA 回退的匹配顺序。
> - [request.ts 第 44～49 行](/Users/aaron/personal-hub/apps/project-2/src/utils/request.ts:44)：商城响应进入图片地址改写。
> - [shopImages.ts 第 3～19 行](/Users/aaron/personal-hub/apps/project-2/src/utils/shopImages.ts:3)：递归处理字符串、数组和对象中的旧图片地址。
> - [商城代理第 1～2、19～50 行](/Users/aaron/personal-hub/apps/project-2/api/proxy.ts:1)：固定上游、路径限制和请求头白名单。
> - [商城代理第 52～80 行](/Users/aaron/personal-hub/apps/project-2/api/proxy.ts:52)：转发请求、禁止重定向、超时和 no-store。
> - [图片代理第 1～12、21～63 行](/Users/aaron/personal-hub/apps/project-2/api/image.ts:1)：固定来源、图片类型白名单、路径规则和响应头大小检查。
> - [图片代理第 65～94 行](/Users/aaron/personal-hub/apps/project-2/api/image.ts:65)：读取流时再次限制 4 MiB，并设置图片缓存和安全响应头。
