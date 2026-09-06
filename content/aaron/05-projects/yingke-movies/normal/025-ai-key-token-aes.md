---
id: yingke-movies-normal-025-ai-key-token-aes
title: Token、密码和第三方密钥应该怎么处理？为什么不用 AES？
aliases: [能具体解释一下Token、密码和第三方密钥应该怎么处理？为什么不用 AES吗？, 从设计取舍看，Token、密码和第三方密钥应该怎么处理？为什么不用 AES？, 这个问题在项目中的实际边界是什么？]
category: yingke-movies
difficulty: 深入
priority: high
projects: [映刻影视]
keywords: [AI Key, Token, AES, 登录鉴权, 密码哈希, HTTPS]
---

# Token、密码和第三方密钥应该怎么处理？为什么不用 AES？

## 核心回答

这个项目没有登录、密码、Token 或第三方密钥处理，不能把这些说成现有功能。如果以后接入，真正的 API Secret 不能放在小程序源码或本地存储里，而应该保存在后端或云函数；前端只调用自己的业务服务。密码应该通过 HTTPS 传输，由服务端使用专门的单向密码哈希保存，而不是用可逆的 AES 代替密码存储。Token 是否落地还要根据有效期和风险设计，前端存储只能降低使用成本，不能把客户端变成可信环境。

## 回答要点

- 这个项目没有登录、密码、Token 或第三方密钥处理，不能把这些说成现有功能。
- 如果以后接入，真正的 API Secret 不能放在小程序源码或本地存储里，而应该保存在后端或云函数；
- 前端只调用自己的业务服务。
- 密码应该通过 HTTPS 传输，由服务端使用专门的单向密码哈希保存，而不是用可逆的 AES 代替密码存储。

## 面试官可能追问

- 关于“Token、密码和第三方密钥应该怎么处理？为什么不用 AES”，当前方案具体防住了什么风险？
- 客户端被注入脚本或凭据过期时会发生什么？
- 服务端还必须补充哪些校验或权限控制？

## 代码证据

>
> - [utils/request.js 第 35～45 行](</Users/aaron/CodingPractice/14_uniapp/project2/utils/request.js:35>)：请求拦截器目前只是透传，没有注入 Token。
> - [package.json 第 12～16 行](</Users/aaron/CodingPractice/14_uniapp/project2/package.json:12>)：业务依赖中没有加密或鉴权相关库。
