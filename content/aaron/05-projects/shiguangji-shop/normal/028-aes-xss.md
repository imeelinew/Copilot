---
id: shiguangji-shop-normal-028-aes-xss
title: 前端 AES 和商品富文本仍有安全边界
aliases: [请介绍一下项目中的前端 AES 和商品富文本仍有安全边界。, 你在前端 AES 和商品富文本仍有安全边界方面具体做了什么？, 这部分的设计思路和边界是什么？]
category: shiguangji-shop
difficulty: 深入
priority: normal
projects: [拾光集移动商城系统]
keywords: [AES, XSS, 商品详情, 地址管理]
---

# 前端 AES 和商品富文本仍有安全边界

## 核心回答

当前 AES 使用前端源码里的固定密钥和 ECB 模式。它能按照现有格式生成接口参数，但固定在客户端的密钥不能对用户保密，ECB 也不提供完整性认证；拼接时间戳只能改变输入，是否能够防重放还取决于服务端有没有检查时间和重复请求。改进时应该先确认后端为什么要求应用层加密，再统一设计传输、密钥和重放策略，而不是只在前端换一个算法名称。

商品详情还通过 `v-html` 展示接口返回的富文本。目前的 `formatHtml` 只调整图片和表格样式，图片地址函数也只负责换域名，都不属于 HTML 安全清洗。如果富文本来源不能完全信任，应该在服务端按允许的标签、属性和 URL 协议进行清洗，前端再根据需要使用成熟的清洗库并配合 CSP。

## 回答要点

- 当前 AES 使用前端源码里的固定密钥和 ECB 模式。
- 它能按照现有格式生成接口参数，但固定在客户端的密钥不能对用户保密，ECB 也不提供完整性认证；
- 拼接时间戳只能改变输入，是否能够防重放还取决于服务端有没有检查时间和重复请求。
- 改进时应该先确认后端为什么要求应用层加密，再统一设计传输、密钥和重放策略，而不是只在前端换一个算法名称。

## 面试官可能追问

- 关于“前端 AES 和商品富文本仍有安全边界”，当前方案具体防住了什么风险？
- 客户端被注入脚本或凭据过期时会发生什么？
- 服务端还必须补充哪些校验或权限控制？

## 代码证据

> - [cryptojs.ts 第 10～26 行](/Users/aaron/personal-hub/apps/project-2/src/utils/cryptojs.ts:10)：固定密钥、时间戳、ECB 和 Pkcs7。
> - [商品详情第 158～162 行](/Users/aaron/personal-hub/apps/project-2/src/views/ProdInfo.vue:158)：富文本通过 v-html 进入页面。
> - [utils.js 第 1～17 行](/Users/aaron/personal-hub/apps/project-2/src/utils/utils.js:1)：只处理图片和表格尺寸，没有清洗 HTML。
> - [shopImages.ts 第 3～19 行](/Users/aaron/personal-hub/apps/project-2/src/utils/shopImages.ts:3)：递归替换旧图片域名，不承担内容清洗。
