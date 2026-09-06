---
id: shiguangji-shop-normal-032-deployment-proxy
title: 部署和代理还不能说成全部验证完成
aliases: [请介绍一下项目中的部署和代理还不能说成全部验证完成。, 你在部署和代理还不能说成全部验证完成方面具体做了什么？, 这部分的设计思路和边界是什么？]
category: shiguangji-shop
difficulty: 深入
priority: normal
projects: [拾光集移动商城系统]
keywords: [验证方法, 同源代理, 性能优化, HTTPS]
---

# 部署和代理还不能说成全部验证完成

## 核心回答

改进版已经在本地代码中增加 AI、商城和图片代理，但本地有实现不等于当前生产站点一定已经使用相同代码。商城和图片代理到固定上游的连接仍然是 HTTP，所以也不能宣称全链路 HTTPS。后续需要核对实际部署提交、环境变量和线上路由，再通过 Network 检查接口、图片和深层页面刷新是否进入正确处理器。

代理还会增加 Serverless 调用、图片带宽和维护成本。图片虽然设置了浏览器和共享缓存，但实际命中率、流量额度和上游稳定性需要根据平台数据评估，不能只根据配置给出性能或成本结论。

## 回答要点

- 改进版已经在本地代码中增加 AI、商城和图片代理，但本地有实现不等于当前生产站点一定已经使用相同代码。
- 商城和图片代理到固定上游的连接仍然是 HTTP，所以也不能宣称全链路 HTTPS。
- 后续需要核对实际部署提交、环境变量和线上路由，再通过 Network 检查接口、图片和深层页面刷新是否进入正确处理器。
- 代理还会增加 Serverless 调用、图片带宽和维护成本。

## 面试官可能追问

- 关于“部署和代理还不能说成全部验证完成”，你为什么选择当前方案？
- “部署和代理还不能说成全部验证完成”在异常数据或并发场景下怎么处理？
- 如果改用替代方案，主要成本和收益分别是什么？

## 代码证据

> - [Vercel 配置第 6～18 行](/Users/aaron/personal-hub/apps/project-2/vercel.json:6)：三个服务端函数及路由顺序。
> - [商城代理第 1～2 行](/Users/aaron/personal-hub/apps/project-2/api/proxy.ts:1)、[图片代理第 1～12 行](/Users/aaron/personal-hub/apps/project-2/api/image.ts:1)：固定上游仍使用 HTTP。
> - [图片代理第 88～94 行](/Users/aaron/personal-hub/apps/project-2/api/image.ts:88)：成功图片的缓存和安全响应头。
