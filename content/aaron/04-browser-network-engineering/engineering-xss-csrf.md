---
id: engineering-xss-csrf
title: XSS 和 CSRF 的区别？怎么防？
aliases: [xss, csrf, 跨站脚本攻击, 跨站请求伪造]
category: engineering
difficulty: 高频
priority: high
projects: []
keywords: [XSS, CSRF, 转义, SameSite, CSRF Token]
---

# XSS 和 CSRF 的区别？怎么防？

## 核心回答

说白了，XSS 是把恶意脚本塞进你的页面让它跑起来，攻击发生在站内；CSRF 是攻击者自己的网站借用户浏览器里的登录态，偷偷向你的站点发请求，攻击发生在站外。所以 XSS 能偷 cookie、能改页面、能替用户干任何事；CSRF 只能冒用身份发请求，读不到响应内容。

XSS 按来源分三种：存储型，脚本存进了数据库，看这个页面的人都中招，典型是评论区；反射型，脚本藏在 URL 参数里，点了坏链接才触发；DOM 型，纯前端拼 HTML 时没转义。防法的核心是别让不可信的内容变成代码：不裸拼 innerHTML，信框架的默认转义，v-html、dangerouslySetInnerHTML 这种口子要确认数据干净；输出时转义特殊字符；再配 CSP 限制脚本来源，敏感 cookie 加 HttpOnly，脚本跑了也偷不走。

CSRF 防的是"别的网站借你的身份"。核心思路是让请求带一个攻击者拿不到的凭据：服务端下发 CSRF Token，请求头必须带上；cookie 设 SameSite，Lax 起步，跨站请求基本带不上 cookie；服务端再校验 Origin 和 Referer。转账这类高危操作上验证码兜底，攻击者替用户过不了。

## 展开回答

两者的关系也常被追问：有 XSS 基本就能顺手打出 CSRF，脚本可以直接在页面里发请求；反过来不行，CSRF 拿不到页面内容。所以 HttpOnly 不是万能的，它只保住 cookie，保不住功能，脚本照样能代替用户操作。防线是分层的：转义加 CSP 管 XSS，SameSite 加 CSRF Token 管 CSRF，少哪层都有口子。

还有个点是用 JWT 的同学容易忽略：token 存 localStorage 是把 CSRF 换成了 XSS 风险，存 cookie 就又回到 CSRF，两种方案都要按各自的打法防。

## 面试官可能追问

- HttpOnly 能防住 XSS 吗？
- SameSite 的几个值分别是什么行为？
- 用了 JWT 就不怕 CSRF 了吗？
