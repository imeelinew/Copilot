---
id: yingke-movies-followup-017-start-total
title: 追问：到底条件为什么不能只判断 `start < total`？
aliases: [能具体解释一下到底条件为什么不能只判断 `start < total`吗？, 从设计取舍看，到底条件为什么不能只判断 `start < total`？, 这个问题在项目中的实际边界是什么？]
category: yingke-movies
difficulty: 基础
priority: normal
projects: [映刻影视]
keywords: [uni-app, 影视小程序, Vue 2]
---

# 追问：到底条件为什么不能只判断 `start < total`？

## 核心回答

`start` 只是下一次请求的偏移量，并不一定等于页面里实际有效的数据数量。如果接口返回不足一页、空数组或者重复内容，只比较 `start` 和 `total` 可能不能准确反映页面状态。更直观的做法是请求完成后比较 `list.length` 和 `total`，或者直接使用服务端提供的 `hasMore`、`nextCursor`。同时还要防止最后一次多发请求，并把“正在加载”和“已经到底”分成不同状态。

## 回答要点

- start 只是下一次请求的偏移量，并不一定等于页面里实际有效的数据数量。
- 如果接口返回不足一页、空数组或者重复内容，只比较 start 和 total 可能不能准确反映页面状态。
- 更直观的做法是请求完成后比较 list.length 和 total，或者直接使用服务端提供的 hasMore、nextCursor。
- 同时还要防止最后一次多发请求，并把“正在加载”和“已经到底”分成不同状态。

## 面试官可能追问

- 关于“到底条件为什么不能只判断 `start < total`”，你为什么选择当前方案？
- “到底条件为什么不能只判断 `start < total`”在异常数据或并发场景下怎么处理？
- 如果改用替代方案，主要成本和收益分别是什么？

## 代码证据

>
> - [pages/list/index.vue 第 69～72 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/list/index.vue:69>)：追加结果并保存服务端总数。
> - [pages/list/index.vue 第 88～101 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/list/index.vue:88>)：当前仅根据 `startNum` 和 `totalNum` 判断是否到底。
