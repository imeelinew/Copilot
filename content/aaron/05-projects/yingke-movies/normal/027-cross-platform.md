---
id: yingke-movies-normal-027-cross-platform
title: 这个项目真的支持多端吗？
aliases: [能具体解释一下这个项目真的支持多端吗吗？, 从设计取舍看，这个项目真的支持多端吗？, 这个问题在项目中的实际边界是什么？]
category: yingke-movies
difficulty: 基础
priority: normal
projects: [映刻影视]
keywords: [跨端兼容, 移动端适配, 请求封装, 组件设计, uni.request, uni-app]
---

# 这个项目真的支持多端吗？

## 核心回答

请求层使用 `uni.request`，样式大量使用 `rpx`，具备 uni-app 的跨端基础；但界面接入的是 Vant Weapp 原生小程序组件，而且没有各平台构建和运行结果。因此我会把它准确描述为“基于 uni-app 开发的微信小程序”，不会直接声称所有平台已经适配完成。

## 回答要点

- 请求层使用 uni.request，样式大量使用 rpx，具备 uni-app 的跨端基础；
- 但界面接入的是 Vant Weapp 原生小程序组件，而且没有各平台构建和运行结果。
- 因此我会把它准确描述为“基于 uni-app 开发的微信小程序”，不会直接声称所有平台已经适配完成。

## 面试官可能追问

- 关于“这个项目真的支持多端吗”，你为什么选择当前方案？
- “这个项目真的支持多端吗”在异常数据或并发场景下怎么处理？
- 如果改用替代方案，主要成本和收益分别是什么？

## 代码证据

>
> - [utils/request.js 第 3～25 行](</Users/aaron/CodingPractice/14_uniapp/project2/utils/request.js:3>)：底层请求使用 uni-app API。
> - [pages.json 第 27～34 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages.json:27>)：页面使用 Vant Weapp 小程序组件。
> - [manifest.json 第 52～57 行](</Users/aaron/CodingPractice/14_uniapp/project2/manifest.json:52>)：存在微信小程序专用配置。
