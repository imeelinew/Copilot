---
id: yingke-movies-normal-019-onshow-onload
title: 为什么不用 `onLoad` 请求列表，而是在 `onShow` 请求？
aliases: [能具体解释一下为什么不用 `onLoad` 请求列表，而是在 `onShow` 请求吗？, 从设计取舍看，为什么不用 `onLoad` 请求列表，而是在 `onShow` 请求？, 这个问题在项目中的实际边界是什么？]
category: yingke-movies
difficulty: 基础
priority: normal
projects: [映刻影视]
keywords: [onShow, onLoad, uni-app]
---

# 为什么不用 `onLoad` 请求列表，而是在 `onShow` 请求？

## 核心回答

`onLoad` 主要在页面首次创建时执行，`onShow` 在页面每次重新可见时都会执行。当前写在 `onShow` 会让用户从详情返回列表时再次请求，而状态没有重置，可能重复追加。更合适的做法是把首次请求放在 `onLoad`，或者增加是否已经初始化的标记；只有明确需要刷新时才在 `onShow` 重新请求。

## 回答要点

- onLoad 主要在页面首次创建时执行，onShow 在页面每次重新可见时都会执行。
- 当前写在 onShow 会让用户从详情返回列表时再次请求，而状态没有重置，可能重复追加。
- 更合适的做法是把首次请求放在 onLoad，或者增加是否已经初始化的标记；
- 只有明确需要刷新时才在 onShow 重新请求。

## 面试官可能追问

- 关于“为什么不用 `onLoad` 请求列表，而是在 `onShow` 请求”，为什么选择当前异步处理方式？
- 请求失败、重复触发或返回乱序时如何保证状态正确？
- 你会怎样测试慢请求和部分失败场景？

## 代码证据

>
> - [pages/list/index.vue 第 81～87 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/list/index.vue:81>)：`onLoad` 只保存参数，`onShow` 每次调用初始化。
> - [pages/list/index.vue 第 64～73 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/list/index.vue:64>)：初始化后的结果直接追加到现有列表。
