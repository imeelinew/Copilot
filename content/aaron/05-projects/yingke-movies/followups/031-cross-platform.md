---
id: yingke-movies-followup-031-cross-platform
title: 【高频】这个项目真的支持多端吗？
aliases: [能具体解释一下这个项目真的支持多端吗吗？, 从设计取舍看，这个项目真的支持多端吗？, 这个问题在项目中的实际边界是什么？]
category: yingke-movies
difficulty: 基础
priority: high
projects: [映刻影视]
keywords: [跨端兼容, 移动端适配, 组件设计, 验证方法, uni-app, Vant Weapp]
---

# 【高频】这个项目真的支持多端吗？

## 核心回答

这个项目使用了 uni-app 的请求 API，样式也大量使用 `rpx`，说明代码具备一定跨端基础；但 UI 接入的是 Vant Weapp 原生小程序组件，模板还混用了 `div`、`span`、`img` 和小程序组件。更重要的是，没有各个平台的构建和运行结果。因此我会准确描述成“基于 uni-app 开发的微信小程序”，不会直接说所有平台已经适配。是否真正跨端，要分别构建并验证组件、样式和平台 API。

## 回答要点

- 这个项目使用了 uni-app 的请求 API，样式也大量使用 rpx，说明代码具备一定跨端基础；
- 但 UI 接入的是 Vant Weapp 原生小程序组件，模板还混用了 div、span、img 和小程序组件。
- 更重要的是，没有各个平台的构建和运行结果。
- 因此我会准确描述成“基于 uni-app 开发的微信小程序”，不会直接说所有平台已经适配。

## 面试官可能追问

- 关于“这个项目真的支持多端吗”，你为什么选择当前方案？
- “这个项目真的支持多端吗”在异常数据或并发场景下怎么处理？
- 如果改用替代方案，主要成本和收益分别是什么？

## 代码证据

>
> - [utils/request.js 第 3～25 行](</Users/aaron/CodingPractice/14_uniapp/project2/utils/request.js:3>)：底层请求使用 uni-app API。
> - [pages.json 第 27～34 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages.json:27>)：业务全局注册 Vant Weapp 组件。
> - [manifest.json 第 52～71 行](</Users/aaron/CodingPractice/14_uniapp/project2/manifest.json:52>)：包含微信小程序及其他平台配置，但不能证明均已运行验证。
