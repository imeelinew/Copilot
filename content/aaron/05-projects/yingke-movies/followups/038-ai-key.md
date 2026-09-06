---
id: yingke-movies-followup-038-ai-key
title: 追问：如果以后接入 AI Key，应该存在哪里？
aliases: [能具体解释一下如果以后接入 AI Key，应该存在哪里吗？, 从设计取舍看，如果以后接入 AI Key，应该存在哪里？, 这个问题在项目中的实际边界是什么？]
category: yingke-movies
difficulty: 进阶
priority: high
projects: [映刻影视]
keywords: [AI Key, 列表 Key, 登录鉴权, localStorage]
---

# 追问：如果以后接入 AI Key，应该存在哪里？

## 核心回答

真正的 AI Key 不能放在 LocalStorage、小程序 Storage、源码或前端环境变量里，因为这些内容最终都会进入客户端，用户有机会读取。正确做法是把 Key 放在后端或云函数，前端只调用自己的业务接口；后端再负责用户鉴权、额度限制、日志脱敏和第三方 AI 请求。需要特别说明，这个影视项目当前没有 AI SDK、AI Key 或 AI 功能，这只是通用安全追问，不能说成项目现有设计。

## 回答要点

- 真正的 AI Key 不能放在 LocalStorage、小程序 Storage、源码或前端环境变量里，因为这些内容最终都会进入客户端，用户有机会读取。
- 正确做法是把 Key 放在后端或云函数，前端只调用自己的业务接口；
- 后端再负责用户鉴权、额度限制、日志脱敏和第三方 AI 请求。
- 需要特别说明，这个影视项目当前没有 AI SDK、AI Key 或 AI 功能，这只是通用安全追问，不能说成项目现有设计。

## 面试官可能追问

- 关于“如果以后接入 AI Key，应该存在哪里”，当前方案具体防住了什么风险？
- 客户端被注入脚本或凭据过期时会发生什么？
- 服务端还必须补充哪些校验或权限控制？

## 代码证据

>
> - [package.json 第 12～16 行](</Users/aaron/CodingPractice/14_uniapp/project2/package.json:12>)：现有依赖只有 UI 和请求相关库，没有 AI SDK。
> - [pages.json 第 2～20 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages.json:2>)：现有业务页面只有首页、列表和详情。
