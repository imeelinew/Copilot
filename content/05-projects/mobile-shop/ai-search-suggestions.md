---
id: mobile-shop-ai-search
title: 轻购的 AI 搜索联想有什么技术难点？
aliases: [ai搜索亮点, 搜索联想难点, 搜索请求乱序, ai接口降级]
category: mobile-shop
difficulty: 亮点
priority: high
projects: [轻购]
keywords: [防抖, AbortController, 竞态, 缓存, fallback]
---

# 轻购的 AI 搜索联想有什么技术难点？

## 30 秒回答

难点不是把 AI 接口调通，而是保证连续输入时结果稳定。我使用 300 毫秒防抖减少请求，通过 AbortController 取消旧请求，再用请求编号防止无法及时取消的旧响应覆盖新结果。返回后还会清洗内容并校验是否正好五条；超时、异常或格式错误时切换本地推荐，并对相同关键词缓存五分钟。

## 标准回答

轻购中最能体现我处理异步问题的功能是 AI 搜索联想。用户连续输入时，可能产生请求过多、旧响应晚于新响应返回、AI 格式不稳定和服务不可用几个问题。

我的处理分为四层。第一层是 300 毫秒防抖，用户停止输入后才请求。第二层是在新输入出现时使用 AbortController 取消上一请求，同时维护递增的请求编号，只允许最后一次请求更新页面，避免竞态。第三层是对相同关键词做五分钟内存缓存，并把缓存数量限制为 30 条。第四层是清洗 AI 返回的编号和多余字符、限制长度并检查是否正好五条；任何异常都会使用本地规则生成建议。

AI 请求通过服务端接口转发，密钥不保存在浏览器。这个功能让我认识到，接入第三方服务时，请求频率、并发顺序、返回契约、安全和降级缺一不可。

## 深入回答

AbortController 和请求编号并不重复。取消请求可以减少无效网络与计算，但取消可能发生得太晚，也不能假设所有中间层都严格支持取消；请求编号是在状态更新层提供最后一道保护。只有当前请求编号仍然有效时，才写入 suggestions 和结束 loading。

缓存使用标准化后的关键词作为 key，命中时避免重复请求。达到容量上限后删除最早插入的项，防止页面长时间使用时 Map 无限增长。格式校验失败也进入 fallback，因此 UI 对 AI 的输出不做盲目信任。

## 回答要点

- 按“频率、竞态、格式、可用性、安全”组织回答。
- 明确取消请求和请求编号解决的是不同层次的问题。
- 不要把本地降级说成 AI 能力。

## 面试官可能追问

- 为什么有防抖还需要取消请求？
- 缓存为什么设置容量上限？
- 前端如何保护 AI API Key？
- 如果需要避免重复的相同并发请求怎么做？

## 代码证据

- /Users/eli/Dev/mobile-shop/src/views/SearchView.vue：handleSuggestionInput
- /Users/eli/Dev/mobile-shop/src/ai/searchSuggestions.ts：CACHE_TTL、parseSuggestions、getSearchSuggestions
- /Users/eli/Dev/mobile-shop/src/ai/providers/openai.ts：requestAI
