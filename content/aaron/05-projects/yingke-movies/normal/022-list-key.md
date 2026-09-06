---
id: yingke-movies-normal-022-list-key
title: 为什么列表的 `key` 不应该使用 index？
aliases: [能具体解释一下为什么列表的 `key` 不应该使用 index吗？, 从设计取舍看，为什么列表的 `key` 不应该使用 index？, 这个问题在项目中的实际边界是什么？]
category: yingke-movies
difficulty: 进阶
priority: normal
projects: [映刻影视]
keywords: [列表 Key, 分页, uni-app]
---

# 为什么列表的 `key` 不应该使用 index？

## 核心回答

index 只表示当前位置，分页追加、排序或插入后，它不能稳定代表同一部影片，可能导致框架复用错误的节点。影片数据里已经有唯一 ID，更合适的是使用 `:key="item.id"`。当前项目使用 index，我会如实说明这是可以改进的地方。

## 回答要点

- index 只表示当前位置，分页追加、排序或插入后，它不能稳定代表同一部影片，可能导致框架复用错误的节点。
- 影片数据里已经有唯一 ID，更合适的是使用 :key="item.id"。
- 当前项目使用 index，我会如实说明这是可以改进的地方。

## 面试官可能追问

- 关于“为什么列表的 `key` 不应该使用 index”，当前方案具体防住了什么风险？
- 客户端被注入脚本或凭据过期时会发生什么？
- 服务端还必须补充哪些校验或权限控制？

## 代码证据

>
> - [pages/list/index.vue 第 6～7 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/list/index.vue:6>)：列表循环使用 index 作为 key，但条目中存在影片 ID。
> - [components/listContent.vue 第 13～17 行](</Users/aaron/CodingPractice/14_uniapp/project2/components/listContent.vue:13>)：首页卡片同样使用 index 作为 key。
