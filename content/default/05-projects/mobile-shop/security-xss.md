---
id: mobile-shop-security-xss
title: 轻购里 v-html 和 AI 内容有哪些安全风险？
aliases: [轻购 XSS, 商品详情 XSS, AI 输出安全]
category: mobile-shop
difficulty: 进阶
priority: high
projects: [轻购]
keywords: [v-html, XSS, CSP, prompt injection, 清洗]
---

# 轻购里 v-html 和 AI 内容有哪些安全风险？

## 核心回答

商品详情页现在用 `v-html` 展示富文本，所以关键不是“接口来自自己的服务”就默认安全，而是要确认内容经过可信的白名单清洗，禁止脚本、事件属性和危险 URL。AI 生成的卖点也只能基于商品字段，输出要按纯文本或安全 Markdown 渲染，不能直接拼进 HTML。前端再配合 CSP、严格的输出编码和服务端校验，形成多层防线。

## 追问：当前代码已经清洗了吗？

我能确认页面存在 `v-html="product.content"` 的渲染点，但在已核对的前端代码里没有看到清洗逻辑。因此面试时我会把它列为风险和待改进项，而不是说已经解决。下一步会在服务端统一清洗并做 XSS 样例测试，前端只接受约定格式，避免每个页面各自决定是否信任。

## 追问：AI key 和 prompt 注入怎么处理？

模型 key 只放 Cloudflare Function 的环境变量，浏览器只能请求自己的代理；代理限制来源、输入长度、token 数和超时，并对错误做统一映射。用户输入可能试图改写系统约束或诱导模型泄露信息，所以推荐结果必须再经过结构校验和商品库约束，不能把模型原文当成权限或价格依据。

