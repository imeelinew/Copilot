---
id: shiguangji-shop-followup-022-deployment-proxy-image-proxy
title: 为什么需要同源代理和图片代理？直接改地址不行吗？会不会成为开放代理？
aliases: [能具体解释一下为什么需要同源代理和图片代理？直接改地址不行吗？会不会成为开放代理吗？, 从设计取舍看，为什么需要同源代理和图片代理？直接改地址不行吗？会不会成为开放代理？, 这个问题在项目中的实际边界是什么？]
category: shiguangji-shop
difficulty: 深入
priority: normal
projects: [拾光集移动商城系统]
keywords: [地址管理, 同源代理, AI Key, HttpOnly Cookie, HTTPS, 列表 Key]
---

# 为什么需要同源代理和图片代理？直接改地址不行吗？会不会成为开放代理？

## 核心回答

部署版让浏览器统一访问本站路径：AI 走 `/api/ai`，商城接口走 `/api/...`，旧图片走 `/shop-images/...`，再由不同的服务端函数访问固定上游。这样前端不需要暴露共享 AI Key，也能集中控制请求头、超时、错误和缓存。只替换图片字符串还不够，本站必须有对应代理真正返回图片；直接把旧 HTTP 写成 HTTPS，也不能保证上游支持。

为了避免成为开放代理，商城代理不接收任意上游 URL，而是固定服务地址，拒绝绝对路径、协议字符串和 `..` 路径，并只转发必要请求头。图片代理限制 GET 和 HEAD，路径必须符合栅格图片规则，不转发 Cookie 和 Authorization；上游返回后再检查 Content-Type，并在读取数据流时把实际大小限制在 4 MiB。商城用户数据使用 no-store，成功图片才设置缓存。

路由顺序也很重要：精确的 AI 路由要放在商城通配前，SPA 的 index.html 回退放最后，否则接口可能被错误处理。当前商城和图片代理访问固定上游时仍然使用 HTTP，而且代理会增加 Serverless 调用和带宽成本，所以不能说已经实现全链路 HTTPS，也不能说没有部署成本。

## 回答要点

- 部署版让浏览器统一访问本站路径：AI 走 /api/ai，商城接口走 /api/...，旧图片走 /shop-images/...，再由不同的服务端函数访问固定上游。
- 这样前端不需要暴露共享 AI Key，也能集中控制请求头、超时、错误和缓存。
- 只替换图片字符串还不够，本站必须有对应代理真正返回图片；
- 直接把旧 HTTP 写成 HTTPS，也不能保证上游支持。

## 面试官可能追问

- 关于“为什么需要同源代理和图片代理？直接改地址不行吗？会不会成为开放代理”，核心业务状态由谁维护？
- 库存、价格或接口结果变化时如何避免提交错误数据？
- 这个流程最需要覆盖哪些异常和边界条件？

## 代码证据

> - [Vercel 配置第 11～18 行](/Users/aaron/personal-hub/apps/project-2/vercel.json:11)：三类代理和 SPA 回退顺序。
> - [商城代理第 19～50 行](/Users/aaron/personal-hub/apps/project-2/api/proxy.ts:19)：固定上游、路径校验和请求头白名单。
> - [商城代理第 52～80 行](/Users/aaron/personal-hub/apps/project-2/api/proxy.ts:52)：请求转发、禁止重定向、超时和 no-store。
> - [图片代理第 21～63 行](/Users/aaron/personal-hub/apps/project-2/api/image.ts:21)：方法、路径、响应类型和声明大小检查。
> - [图片代理第 65～94 行](/Users/aaron/personal-hub/apps/project-2/api/image.ts:65)：流式大小限制、缓存和安全响应头。
> - [Vite 配置第 15～37 行](/Users/aaron/personal-hub/apps/project-2/vite.config.ts:15)：开发代理及 AI 路径排除；Vite 本身不运行服务端函数。
