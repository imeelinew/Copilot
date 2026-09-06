---
id: shiguangji-shop-followup-005-ecb-cbc-gcm
title: 为什么使用 ECB，不用 CBC 或 GCM？加上时间戳能防重放吗？
aliases: [能具体解释一下为什么使用 ECB，不用 CBC 或 GCM？加上时间戳能防重放吗吗？, 从设计取舍看，为什么使用 ECB，不用 CBC 或 GCM？加上时间戳能防重放吗？, 这个问题在项目中的实际边界是什么？]
category: shiguangji-shop
difficulty: 基础
priority: normal
projects: [拾光集移动商城系统]
keywords: [Vue 3, 移动商城, 前端工程]
---

# 为什么使用 ECB，不用 CBC 或 GCM？加上时间戳能防重放吗？

## 核心回答

当前代码确实使用 ECB，但我不会把它说成安全优势。同一个密钥下，相同的明文分组会得到相同的密文分组，而且 ECB 不提供完整性认证。CBC 需要正确处理随机 IV，GCM 可以同时提供机密性和完整性，不过即使换成 GCM，只要秘密密钥仍固定在前端，就没有解决密钥能够被读取的问题，接口格式也需要和服务端一起改变。

时间戳的作用只是让大部分请求的输入发生变化，它不是随机 IV，也不能单靠前端防止重放。攻击者如果重复发送同一份密文，是否被拒绝取决于服务端有没有检查时间窗口和重复请求；即使有时间窗口，窗口内的重复仍要另外处理。目前只能确认前端拼接了 `Date.now()`，不能确认后端已经实现防重放。

## 回答要点

- 当前代码确实使用 ECB，但我不会把它说成安全优势。
- 同一个密钥下，相同的明文分组会得到相同的密文分组，而且 ECB 不提供完整性认证。
- CBC 需要正确处理随机 IV，GCM 可以同时提供机密性和完整性，不过即使换成 GCM，只要秘密密钥仍固定在前端，就没有解决密钥能够被读取的问题，接口格式也需要和服务端一起改变。
- 时间戳的作用只是让大部分请求的输入发生变化，它不是随机 IV，也不能单靠前端防止重放。

## 面试官可能追问

- 关于“为什么使用 ECB，不用 CBC 或 GCM？加上时间戳能防重放吗”，你为什么选择当前方案？
- “为什么使用 ECB，不用 CBC 或 GCM？加上时间戳能防重放吗”在异常数据或并发场景下怎么处理？
- 如果改用替代方案，主要成本和收益分别是什么？

## 代码证据

> - [cryptojs.ts 第 12～23 行](/Users/aaron/personal-hub/apps/project-2/src/utils/cryptojs.ts:12)：时间戳、ECB 和 Pkcs7。
> - 原理参考：[OWASP 加密模式建议](https://cheatsheetseries.owasp.org/cheatsheets/Cryptographic_Storage_Cheat_Sheet.html)。
