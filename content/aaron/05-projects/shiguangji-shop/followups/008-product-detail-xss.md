---
id: shiguangji-shop-followup-008-product-detail-xss
title: 商品详情用了 v-html，会有 XSS 吗？调整图片尺寸算不算过滤？
aliases: [能具体解释一下商品详情用了 v-html，会有 XSS 吗？调整图片尺寸算不算过滤吗？, 从设计取舍看，商品详情用了 v-html，会有 XSS 吗？调整图片尺寸算不算过滤？, 这个问题在项目中的实际边界是什么？]
category: shiguangji-shop
difficulty: 深入
priority: high
projects: [拾光集移动商城系统]
keywords: [商品详情, XSS, 地址管理, Token]
---

# 商品详情用了 v-html，会有 XSS 吗？调整图片尺寸算不算过滤？

## 核心回答

`v-html` 会把接口字符串当成 HTML 插入页面，不能享受普通文本插值的自动转义。当前 `formatHtml` 只是给图片和表格补样式，图片地址处理也只是替换旧域名，这两件事都不是安全过滤。如果上游富文本能够被污染，危险标签、事件属性或者不安全 URL 就可能带来 XSS，本地保存的 Token 也会因此面临风险。

更完整的做法是先明确哪些人能够编辑商品富文本，在服务端按允许的标签、属性和 URL 协议清洗；前端需要额外防护时，再使用成熟的 HTML 清洗库并配合 CSP。不能只靠删除 `<script>` 或做几次字符串替换就说已经安全。这里能确认的是前端没有提供清洗保证，不能反过来断言线上一定已经发生攻击。

## 回答要点

- v-html 会把接口字符串当成 HTML 插入页面，不能享受普通文本插值的自动转义。
- 当前 formatHtml 只是给图片和表格补样式，图片地址处理也只是替换旧域名，这两件事都不是安全过滤。
- 如果上游富文本能够被污染，危险标签、事件属性或者不安全 URL 就可能带来 XSS，本地保存的 Token 也会因此面临风险。
- 更完整的做法是先明确哪些人能够编辑商品富文本，在服务端按允许的标签、属性和 URL 协议清洗；

## 面试官可能追问

- 关于“商品详情用了 v-html，会有 XSS 吗？调整图片尺寸算不算过滤”，当前方案具体防住了什么风险？
- 客户端被注入脚本或凭据过期时会发生什么？
- 服务端还必须补充哪些校验或权限控制？

## 代码证据

> - [商品详情第 158～162 行](/Users/aaron/personal-hub/apps/project-2/src/views/ProdInfo.vue:158)：富文本通过 v-html 渲染。
> - [utils.js 第 1～17 行](/Users/aaron/personal-hub/apps/project-2/src/utils/utils.js:1)：只处理图片和表格尺寸。
> - [shopImages.ts 第 3～19 行](/Users/aaron/personal-hub/apps/project-2/src/utils/shopImages.ts:3)：只递归改写图片域名。
> - 原理参考：[Vue 安全指南](https://vuejs.org/guide/best-practices/security.html)。
