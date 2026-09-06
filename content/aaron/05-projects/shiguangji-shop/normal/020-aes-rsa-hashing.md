---
id: shiguangji-shop-normal-020-aes-rsa-hashing
title: 为什么密码使用 AES，不用 RSA、MD5 或 SHA-256？
aliases: [能具体解释一下为什么密码使用 AES，不用 RSA、MD5 或 SHA-256吗？, 从设计取舍看，为什么密码使用 AES，不用 RSA、MD5 或 SHA-256？, 这个问题在项目中的实际边界是什么？]
category: shiguangji-shop
difficulty: 深入
priority: high
projects: [拾光集移动商城系统]
keywords: [AES, RSA, 密码哈希, HTTPS]
---

# 为什么密码使用 AES，不用 RSA、MD5 或 SHA-256？

## 核心回答

AES 是对称加密，RSA 是非对称算法，MD5 和 SHA-256 是摘要算法，它们解决的问题并不一样，不能直接互换。当前前端把时间戳和密码拼接后，按接口格式使用 AES-128、ECB 和 Pkcs7 加密。我只能确认前端这样提交，是否由后端协议明确规定还需要结合接口文档确认。密码传输首先依靠 HTTPS，密码长期存储则应该由后端使用专门的带盐密码哈希；前端 AES 不能替代这两件事。

## 回答要点

- AES 是对称加密，RSA 是非对称算法，MD5 和 SHA-256 是摘要算法，它们解决的问题并不一样，不能直接互换。
- 当前前端把时间戳和密码拼接后，按接口格式使用 AES-128、ECB 和 Pkcs7 加密。
- 我只能确认前端这样提交，是否由后端协议明确规定还需要结合接口文档确认。
- 密码传输首先依靠 HTTPS，密码长期存储则应该由后端使用专门的带盐密码哈希；

## 面试官可能追问

- 关于“为什么密码使用 AES，不用 RSA、MD5 或 SHA-256”，当前方案具体防住了什么风险？
- 客户端被注入脚本或凭据过期时会发生什么？
- 服务端还必须补充哪些校验或权限控制？

## 代码证据

[AES 函数第 10～26 行](/Users/aaron/personal-hub/apps/project-2/src/utils/cryptojs.ts:10)、[登录提交第 74～86 行](/Users/aaron/personal-hub/apps/project-2/src/views/Login.vue:74)。
