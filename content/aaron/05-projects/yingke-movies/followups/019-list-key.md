---
id: yingke-movies-followup-019-list-key
title: 追问：【高频】为什么列表的 `key` 使用 `index`，不用影片 ID？
aliases: [能具体解释一下为什么列表的 `key` 使用 `index`，不用影片 ID吗？, 从设计取舍看，为什么列表的 `key` 使用 `index`，不用影片 ID？, 这个问题在项目中的实际边界是什么？]
category: yingke-movies
difficulty: 进阶
priority: high
projects: [映刻影视]
keywords: [列表 Key, 分页, uni-app]
---

# 追问：【高频】为什么列表的 `key` 使用 `index`，不用影片 ID？

## 核心回答

当前代码确实使用了 index，但更合适的是影片 ID。因为 index 只代表当前数组位置，分页追加、排序或插入后，它不能稳定标识同一部影片，框架可能复用到不对应的节点。影片对象已经提供 `item.id`，所以应该改成 `:key="item.id"`。只有列表完全静态、顺序永远不变化时，index 才勉强适合，这个分页列表不属于那种情况。

## 回答要点

- 当前代码确实使用了 index，但更合适的是影片 ID。
- 因为 index 只代表当前数组位置，分页追加、排序或插入后，它不能稳定标识同一部影片，框架可能复用到不对应的节点。
- 影片对象已经提供 item.id，所以应该改成 :key="item.id"。
- 只有列表完全静态、顺序永远不变化时，index 才勉强适合，这个分页列表不属于那种情况。

## 面试官可能追问

- 关于“为什么列表的 `key` 使用 `index`，不用影片 ID”，当前方案具体防住了什么风险？
- 客户端被注入脚本或凭据过期时会发生什么？
- 服务端还必须补充哪些校验或权限控制？

## 代码证据

>
> - [pages/list/index.vue 第 6～7 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/list/index.vue:6>)：分页列表使用 index 作为 key，同时条目中存在影片 ID。
> - [components/listContent.vue 第 13～17 行](</Users/aaron/CodingPractice/14_uniapp/project2/components/listContent.vue:13>)：首页卡片列表同样使用 index 作为 key。
