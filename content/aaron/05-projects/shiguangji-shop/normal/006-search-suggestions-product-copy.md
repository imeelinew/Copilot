---
id: shiguangji-shop-normal-006-search-suggestions-product-copy
title: AI 搜索联想和商品卖点
aliases: [请介绍一下项目中的AI 搜索联想和商品卖点。, 你在AI 搜索联想和商品卖点方面具体做了什么？, 这部分的设计思路和边界是什么？]
category: shiguangji-shop
difficulty: 进阶
priority: normal
projects: [拾光集移动商城系统]
keywords: [商品搜索, 文本展开, AI Key, localStorage, 服务端计价, 限流]
---

# AI 搜索联想和商品卖点

## 核心回答

项目中的 AI 主要有两个使用场景。第一个是搜索联想：用户输入关键词并停顿一段时间后，AI 返回相关的商品搜索词；第二个是商品卖点：把商品名称、价格和简介交给 AI，让它生成几条适合展示的简短文案。这里是基于商品信息生成内容，没有使用用户画像，所以我不会把它说成个性化推荐。

为了避免 AI 接口不可用时影响正常购物流程，我做了本地降级。搜索联想失败后，先看关键词能不能命中本地品类词表；没有命中时，就用当前关键词组合出“推荐、新品、热卖、优惠”等通用建议。卖点生成失败后，先根据商品名称判断鞋、运动、手机、数码等品类，再补充通用卖点。这样即使模型没有配置、请求超时或者返回空内容，页面仍然有可点击的搜索建议或者可展示的卖点。

练习版允许从 localStorage 或前端环境变量读取 AI Key，再由浏览器直接请求模型，配置方便，但共享 Key 会暴露在客户端。改进版把 Key 放到服务端环境变量，浏览器只请求本站的 `/api/ai`。服务端还限制请求方法、JSON 格式、请求体大小、提示词长度、模型选择和调用频率，并统一处理上游超时和错误。这样解决了共享密钥直接下发的问题，不过当前限流只存在于单个运行实例内，也还不是完整的用户配额系统。

## 回答要点

- 项目中的 AI 主要有两个使用场景。
- 第一个是搜索联想：用户输入关键词并停顿一段时间后，AI 返回相关的商品搜索词；
- 第二个是商品卖点：把商品名称、价格和简介交给 AI，让它生成几条适合展示的简短文案。
- 这里是基于商品信息生成内容，没有使用用户画像，所以我不会把它说成个性化推荐。

## 面试官可能追问

- 关于“AI 搜索联想和商品卖点”，当前方案解决了哪类用户体验问题？
- 模型超时、返回空内容或数据流被截断时怎么处理？
- 这项 AI 能力的实现边界和替代方案是什么？

## 代码证据

> - [搜索联想第 20～40 行](/Users/aaron/personal-hub/apps/project-2/src/ai/search.js:20)：搜索提示词和通用回退建议。
> - [卖点生成第 43～75 行](/Users/aaron/personal-hub/apps/project-2/src/ai/search.js:43)：商品信息输入、提示词和品类回退。
> - [详情页第 325～372 行](/Users/aaron/personal-hub/apps/project-2/src/views/ProdInfo.vue:325)：商品主体先展示，再加载辅助数据和 AI 卖点。
> - [部署版 AI 客户端第 7～46 行](/Users/aaron/personal-hub/apps/project-2/src/ai/providers/openai.js:7)：请求本站 `/api/ai`、错误映射和 15 秒超时。
> - [AI 服务端第 21～43 行](/Users/aaron/personal-hub/apps/project-2/api/ai.ts:21)：请求体实际读取过程的 16 KiB 限制。
> - [AI 服务端第 46～72 行](/Users/aaron/personal-hub/apps/project-2/api/ai.ts:46)：单实例中的分钟和小时滑动窗口限流。
> - [AI 服务端第 76～147 行](/Users/aaron/personal-hub/apps/project-2/api/ai.ts:76)：请求来源、类型、提示词、模型和服务端 Key 检查。
> - [AI 服务端第 167～226 行](/Users/aaron/personal-hub/apps/project-2/api/ai.ts:167)：调用模型、输出限制、12 秒超时和错误收敛。
> - [练习版 AI 配置第 13～38 行](/Users/aaron/CodingPractice/20_Vue3/mobile-shop/src/ai/providers/openai.js:13)：浏览器读取 localStorage 或 `VITE_AI_*` 配置。
