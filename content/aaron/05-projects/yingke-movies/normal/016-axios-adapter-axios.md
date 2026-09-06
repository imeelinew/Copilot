---
id: yingke-movies-normal-016-axios-adapter-axios
title: 已经安装了 `axios-miniprogram`，为什么还自己写 adapter？
aliases: [能具体解释一下已经安装了 `axios-miniprogram`，为什么还自己写 adapter吗？, 从设计取舍看，已经安装了 `axios-miniprogram`，为什么还自己写 adapter？, 这个问题在项目中的实际边界是什么？]
category: yingke-movies
difficulty: 深入
priority: high
projects: [映刻影视]
keywords: [Axios, 请求适配器, uni-app]
---

# 已经安装了 `axios-miniprogram`，为什么还自己写 adapter？

## 核心回答

按当前代码，真正生效的是自定义 adapter，`axios-miniprogram` 只出现在依赖清单中，没有被业务代码导入。这里不能说两个方案同时工作；如果继续维护，我会在成熟适配库和自定义实现之间选择一个，并删除没有使用的依赖，减少包体和认知成本。

## 回答要点

- 按当前代码，真正生效的是自定义 adapter，axios-miniprogram 只出现在依赖清单中，没有被业务代码导入。
- 这里不能说两个方案同时工作；
- 如果继续维护，我会在成熟适配库和自定义实现之间选择一个，并删除没有使用的依赖，减少包体和认知成本。

## 面试官可能追问

- 关于“已经安装了 `axios-miniprogram`，为什么还自己写 adapter”，你为什么选择当前方案？
- “已经安装了 `axios-miniprogram`，为什么还自己写 adapter”在异常数据或并发场景下怎么处理？
- 如果改用替代方案，主要成本和收益分别是什么？

## 代码证据

>
> - [package.json 第 12～16 行](</Users/aaron/CodingPractice/14_uniapp/project2/package.json:12>)：同时声明 Axios 和 axios-miniprogram。
> - [utils/request.js 第 1～6 行](</Users/aaron/CodingPractice/14_uniapp/project2/utils/request.js:1>)：业务实际导入的是 Axios，并自行定义 adapter。
