---
id: shiguangji-shop-followup-004-aes-rsa-hashing
title: 追问：为什么用 AES，不用 RSA、MD5 或 SHA-256？有 HTTPS 还需要前端加密吗？
aliases: [能具体解释一下为什么用 AES，不用 RSA、MD5 或 SHA-256？有 HTTPS 还需要前端加密吗吗？, 从设计取舍看，为什么用 AES，不用 RSA、MD5 或 SHA-256？有 HTTPS 还需要前端加密吗？, 这个问题在项目中的实际边界是什么？]
category: shiguangji-shop
difficulty: 深入
priority: normal
projects: [拾光集移动商城系统]
keywords: [AES, RSA, 密码哈希, HTTPS]
---

# 追问：为什么用 AES，不用 RSA、MD5 或 SHA-256？有 HTTPS 还需要前端加密吗？

## 核心回答

这些方案解决的问题不一样，不能直接互换。AES 是对称加密，使用同一个秘密密钥加解密；RSA 是非对称算法，使用公钥和私钥；MD5 和 SHA-256 是摘要算法，本身不是可逆加密。当前项目按照现有接口格式提交 AES 结果，替换算法必须和接收端一起修改。我只能从前端确认现在是这样提交，不能只看这段代码就说“后端明确要求 AES”。

密码保护还要区分传输和存储。传输过程首先依靠 HTTPS，服务端长期保存密码时通常使用带盐、带成本参数的专用密码哈希，例如 Argon2id，而不是保存可逆密码，也不是直接做一次普通 SHA-256。前端 AES 不能替代 HTTPS 和服务端密码哈希。如果接口没有明确的应用层加密需求，就不应该为了看起来更安全而自行设计一套协议。

## 回答要点

- 这些方案解决的问题不一样，不能直接互换。
- AES 是对称加密，使用同一个秘密密钥加解密；
- RSA 是非对称算法，使用公钥和私钥；
- MD5 和 SHA-256 是摘要算法，本身不是可逆加密。

## 面试官可能追问

- 关于“为什么用 AES，不用 RSA、MD5 或 SHA-256？有 HTTPS 还需要前端加密吗”，当前方案具体防住了什么风险？
- 客户端被注入脚本或凭据过期时会发生什么？
- 服务端还必须补充哪些校验或权限控制？

## 代码证据

> - [登录页第 74～86 行](/Users/aaron/personal-hub/apps/project-2/src/views/Login.vue:74)：提交 AES 处理后的密码。
> - [cryptojs.ts 第 19～26 行](/Users/aaron/personal-hub/apps/project-2/src/utils/cryptojs.ts:19)：实际采用的算法参数。
> - 原理参考：[OWASP 密码存储](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html)、[OWASP 加密存储](https://cheatsheetseries.owasp.org/cheatsheets/Cryptographic_Storage_Cheat_Sheet.html)。
