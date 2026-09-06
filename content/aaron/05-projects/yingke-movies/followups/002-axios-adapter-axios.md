---
id: yingke-movies-followup-002-axios-adapter-axios
title: 追问：【高频】为什么自己实现 adapter？项目里不是还安装了 `axios-miniprogram` 吗？
aliases: [能具体解释一下为什么自己实现 adapter？项目里不是还安装了 `axios-miniprogram` 吗吗？, 从设计取舍看，为什么自己实现 adapter？项目里不是还安装了 `axios-miniprogram` 吗？, 这个问题在项目中的实际边界是什么？]
category: yingke-movies
difficulty: 深入
priority: high
projects: [映刻影视]
keywords: [Axios, 请求适配器, 请求封装]
---

# 追问：【高频】为什么自己实现 adapter？项目里不是还安装了 `axios-miniprogram` 吗？

## 核心回答

从当前代码看，真正生效的是自己写的 adapter，`axios-miniprogram` 只是出现在依赖清单里，并没有被业务代码导入。所以我不会说两个方案一起完成了请求封装。自定义 adapter 的好处是能够直接控制请求参数和响应格式，但成熟适配库通常覆盖的边界更多。如果继续维护，我会在这两个方案中选一个：要么补全并保留自定义实现，要么改用成熟库，同时删除没用的依赖，减少包体和维护成本。

## 回答要点

- 从当前代码看，真正生效的是自己写的 adapter，axios-miniprogram 只是出现在依赖清单里，并没有被业务代码导入。
- 所以我不会说两个方案一起完成了请求封装。
- 自定义 adapter 的好处是能够直接控制请求参数和响应格式，但成熟适配库通常覆盖的边界更多。
- 如果继续维护，我会在这两个方案中选一个：要么补全并保留自定义实现，要么改用成熟库，同时删除没用的依赖，减少包体和维护成本。

## 面试官可能追问

- 关于“为什么自己实现 adapter？项目里不是还安装了 `axios-miniprogram` 吗”，你为什么选择当前方案？
- “为什么自己实现 adapter？项目里不是还安装了 `axios-miniprogram` 吗”在异常数据或并发场景下怎么处理？
- 如果改用替代方案，主要成本和收益分别是什么？

## 代码证据

>
> - [package.json 第 12～16 行](</Users/aaron/CodingPractice/14_uniapp/project2/package.json:12>)：依赖中同时声明 Axios 和 axios-miniprogram。
> - [utils/request.js 第 1～6 行](</Users/aaron/CodingPractice/14_uniapp/project2/utils/request.js:1>)：业务代码实际导入 Axios，并自行定义 adapter。
