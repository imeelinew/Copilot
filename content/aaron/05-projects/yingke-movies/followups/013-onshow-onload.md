---
id: yingke-movies-followup-013-onshow-onload
title: 【高频】为什么列表初始化放在 `onShow`，不用 `onLoad`？
aliases: [能具体解释一下为什么列表初始化放在 `onShow`，不用 `onLoad`吗？, 从设计取舍看，为什么列表初始化放在 `onShow`，不用 `onLoad`？, 这个问题在项目中的实际边界是什么？]
category: yingke-movies
difficulty: 基础
priority: high
projects: [映刻影视]
keywords: [onShow, onLoad, 影视详情]
---

# 【高频】为什么列表初始化放在 `onShow`，不用 `onLoad`？

## 核心回答

`onLoad` 主要在页面第一次创建时执行，`onShow` 在页面每次重新可见时都会执行。当前代码在 `onLoad` 里只保存分类 ID，在 `onShow` 里每次都调用初始化。这样从详情页返回列表时会再次请求，而列表和游标没有重置，结果可能重复追加。更合适的做法是把首次加载放到 `onLoad`，或者增加已经初始化的标记；只有业务明确要求刷新时，才在 `onShow` 重新拉取数据。

## 回答要点

- onLoad 主要在页面第一次创建时执行，onShow 在页面每次重新可见时都会执行。
- 当前代码在 onLoad 里只保存分类 ID，在 onShow 里每次都调用初始化。
- 这样从详情页返回列表时会再次请求，而列表和游标没有重置，结果可能重复追加。
- 更合适的做法是把首次加载放到 onLoad，或者增加已经初始化的标记；

## 面试官可能追问

- 关于“为什么列表初始化放在 `onShow`，不用 `onLoad`”，你为什么选择当前方案？
- “为什么列表初始化放在 `onShow`，不用 `onLoad`”在异常数据或并发场景下怎么处理？
- 如果改用替代方案，主要成本和收益分别是什么？

## 代码证据

>
> - [pages/list/index.vue 第 81～87 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/list/index.vue:81>)：`onLoad` 保存参数，`onShow` 每次调用初始化。
> - [pages/list/index.vue 第 64～73 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/list/index.vue:64>)：请求结果直接追加到现有列表。
