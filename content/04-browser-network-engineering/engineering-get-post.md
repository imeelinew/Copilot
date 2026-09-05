---
id: engineering-get-post
title: GET 和 POST 有什么区别？
aliases: [get post区别, get和post]
category: engineering
difficulty: 高频
priority: normal
projects: []
keywords: [GET, POST, 幂等, 请求体]
---

# GET 和 POST 有什么区别？

## 核心回答

最实在的区别是语义：GET 是拿数据，POST 是交数据。GET 参数拼在 URL 后面，会进浏览器历史、进网关和服务器的访问日志，所以密码、token 这种敏感信息绝不能走 URL；POST 数据放请求体里，不露在地址上。GET 幂等、可缓存，重复请求没有副作用；POST 不幂等，重复提交就是重复下单，所以提交类接口要防重，比如按钮置灰加请求 id。

有几个流传很广的说法我会纠正一下。"GET 长度不能超 2048"不对，HTTP 协议没规定 URL 上限，限制来自浏览器和服务器的实现，各家不一样。"POST 比 GET 安全"也不对，不加密的话两者都是明文，真安全靠的是 HTTPS。GET 技术上也能带请求体，只是没人这么用，工具基本都忽略。

还有个经典谣言：POST 会先发 header 再发 body、拆成两个包。那只是某些客户端的实现细节，不是协议规定，拿它当区别是错的。

## 展开回答

往 RESTful 上引会很自然：GET 查、POST 增、PUT 全量改、PATCH 部分改、DELETE 删。幂等就是干这个用的——同一个请求发一次和发一百次，服务器状态应该一样，PUT、DELETE 都幂等，POST 不是。设计接口时我会按语义选方法，而不是所有写操作一律 POST。

缓存上 GET 也是唯一被普遍缓存的，配合强缓存、协商缓存那套响应头用；POST 默认不缓存。

## 面试官可能追问

- 幂等是什么意思？PUT 和 DELETE 幂等吗？
- GET 能被缓存，POST 为什么默认不缓存？
- 文件上传用什么方法？Content-Type 是什么？
