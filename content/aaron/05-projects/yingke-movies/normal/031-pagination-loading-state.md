---
id: yingke-movies-normal-031-pagination-loading-state
title: 分页缺少重入、并发和 loading 收口
aliases: [请介绍一下项目中的分页缺少重入、并发和 loading 收口。, 你在分页缺少重入、并发和 loading 收口方面具体做了什么？, 这部分的设计思路和边界是什么？]
category: yingke-movies
difficulty: 深入
priority: high
projects: [映刻影视]
keywords: [分页, 加载状态, 验证方法, onShow, onLoad]
---

# 分页缺少重入、并发和 loading 收口

## 核心回答

当前列表在 `onShow` 中初始化，从详情返回时也会触发，而列表没有清空或去重，所以可能重复追加；快速连续触底时又没有请求锁，可能发出并发请求；同时 `hideLoading` 紧跟在异步调用后面，没有真正等数据回来。这些情况可能造成重复内容、页序不稳定或者 loading 一闪而过。可以把首次请求放到 `onLoad`，增加 `isLoading`、`hasMore` 和初始化标记，在 `try...finally` 中等待请求后关闭 loading，并按影片 ID 去重。面试时我会说“基础分页链路已经存在，但状态收口还不完整”，不会说分页稳定性已经验证。

## 回答要点

- 当前列表在 onShow 中初始化，从详情返回时也会触发，而列表没有清空或去重，所以可能重复追加；
- 快速连续触底时又没有请求锁，可能发出并发请求；
- 同时 hideLoading 紧跟在异步调用后面，没有真正等数据回来。
- 这些情况可能造成重复内容、页序不稳定或者 loading 一闪而过。

## 面试官可能追问

- 关于“分页缺少重入、并发和 loading 收口”，为什么选择当前异步处理方式？
- 请求失败、重复触发或返回乱序时如何保证状态正确？
- 你会怎样测试慢请求和部分失败场景？

## 代码证据

>
> - [pages/list/index.vue 第 38～48 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/list/index.vue:38>)：缺少请求锁、是否到底和初始化标记。
> - [pages/list/index.vue 第 64～74 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/list/index.vue:64>)：返回后直接追加，没有去重。
> - [pages/list/index.vue 第 81～102 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/list/index.vue:81>)：`onShow` 重入以及未等待请求就关闭 loading。
