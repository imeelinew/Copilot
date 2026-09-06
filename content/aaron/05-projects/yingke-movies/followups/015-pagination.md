---
id: yingke-movies-followup-015-pagination
title: 追问：为什么用 `start/count`，不用 `page/pageSize`？
aliases: [能具体解释一下为什么用 `start/count`，不用 `page/pageSize`吗？, 从设计取舍看，为什么用 `start/count`，不用 `page/pageSize`？, 这个问题在项目中的实际边界是什么？]
category: yingke-movies
difficulty: 进阶
priority: normal
projects: [映刻影视]
keywords: [分页, 文本展开, uni-app]
---

# 追问：为什么用 `start/count`，不用 `page/pageSize`？

## 核心回答

这是由服务端接口的分页协议决定的。当前接口接收起始偏移量和本次数量，所以前端使用 `start/count`；如果服务端定义的是页码，才使用 `page/pageSize`。偏移分页实现简单，也方便从第几条开始取数据，但当服务端列表频繁插入新内容时，可能出现重复或遗漏。如果数据变化非常频繁，更适合由服务端提供稳定的 cursor，也就是游标分页。

## 回答要点

- 这是由服务端接口的分页协议决定的。
- 当前接口接收起始偏移量和本次数量，所以前端使用 start/count；
- 如果服务端定义的是页码，才使用 page/pageSize。
- 偏移分页实现简单，也方便从第几条开始取数据，但当服务端列表频繁插入新内容时，可能出现重复或遗漏。

## 面试官可能追问

- 关于“为什么用 `start/count`，不用 `page/pageSize`”，你为什么选择当前方案？
- “为什么用 `start/count`，不用 `page/pageSize`”在异常数据或并发场景下怎么处理？
- 如果改用替代方案，主要成本和收益分别是什么？

## 代码证据

>
> - [pages/list/index.vue 第 44～45 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/list/index.vue:44>)：页面用 `startNum`、`countNum` 保存分页参数。
> - [api/list.js 第 3～26 行](</Users/aaron/CodingPractice/14_uniapp/project2/api/list.js:3>)：三个分类接口使用 `start` 和 `count`。
