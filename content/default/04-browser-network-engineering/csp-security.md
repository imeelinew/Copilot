---
id: web-csp-security
title: CSP 能防什么，配置时容易踩哪些坑？
aliases: [Content Security Policy, XSS 防护, script-src]
category: engineering
difficulty: 进阶
priority: normal
projects: []
keywords: [CSP, XSS, nonce, script-src, 安全]
---

# CSP 能防什么，配置时容易踩哪些坑？

## 核心回答

CSP 是浏览器对脚本、样式、图片、连接来源等资源设置的白名单策略。即使页面出现了某种注入，策略也可能阻止恶意脚本加载或执行，降低 XSS 的影响。它是额外防线，不能替代输出编码、输入处理和安全的模板写法。

上线前我会先用 Report-Only 收集违规报告，再逐步收紧。`unsafe-inline`、通配符和把一堆不明 CDN 全放进白名单都会削弱效果。需要内联脚本时可以用每次请求生成的 nonce 或 hash，不能把固定 nonce 写死在前端代码里。

## 追问：CSP 能防所有 XSS 吗？

不能。策略配置错误、可信来源本身被污染、DOM API 使用不当都可能留下风险。用户输入输出时仍要按上下文编码，富文本需要可信的清洗库，密码和 Token 也不能因为有 CSP 就随便放进页面。

## 追问：connect-src 管什么？

它限制 fetch、XHR、WebSocket、SSE 等连接能访问的来源。配置 API 代理、AI 服务和地图服务时都要加入实际来源，否则页面功能会被浏览器拦掉；来源也不宜直接放宽到 `*`。

## 追问：怎么定位 CSP 报错？

看浏览器 Console 和 Report-Only 上报，确认被拦的是脚本、样式、图片还是连接，再判断该来源是否真的应该允许。修配置前先排除代码里意外注入和错误 URL，不能为了消掉红字直接加通配符。
