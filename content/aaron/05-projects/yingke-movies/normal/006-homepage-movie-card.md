---
id: yingke-movies-normal-006-homepage-movie-card
title: 首页影视卡片组件
aliases: [请介绍一下项目中的首页影视卡片组件。, 你在首页影视卡片组件方面具体做了什么？, 这部分的设计思路和边界是什么？]
category: yingke-movies
difficulty: 深入
priority: normal
projects: [映刻影视]
keywords: [首页数据, 组件设计, 页面导航, Promise.allSettled, Vant Weapp, Props]
---

# 首页影视卡片组件

## 核心回答

首页三个分类的展示结构完全相同，所以我把分类标题、内容总数、横向影视卡片、星级、评分和“更多”跳转整理到 `listContent` 组件里。首页只需要分别把三个分类结果传进去，组件就会根据数据展示对应的名称和影片列表。卡片区域使用横向 `scroll-view`，每张卡片展示封面、单行省略标题和 Vant 的只读评分组件。这样设计是为了避免国产剧、综艺和美剧各写一套重复模板，后续如果调整卡片布局，只需要改一个组件。组件还负责把分类 ID 传给列表页，因此它连接了首页展示和分类列表。当前边界是组件直接依赖 `allSettled` 返回对象中的 `main.value`，和父页面的并发实现耦合较深；props 也没有类型和默认值校验。

## 回答要点

- 首页三个分类的展示结构完全相同，所以我把分类标题、内容总数、横向影视卡片、星级、评分和“更多”跳转整理到 listContent 组件里。
- 首页只需要分别把三个分类结果传进去，组件就会根据数据展示对应的名称和影片列表。
- 卡片区域使用横向 scroll-view，每张卡片展示封面、单行省略标题和 Vant 的只读评分组件。
- 这样设计是为了避免国产剧、综艺和美剧各写一套重复模板，后续如果调整卡片布局，只需要改一个组件。

## 面试官可能追问

- 关于“首页影视卡片组件”，你为什么选择当前方案？
- “首页影视卡片组件”在异常数据或并发场景下怎么处理？
- 如果改用替代方案，主要成本和收益分别是什么？

## 代码证据

>
> - [pages/home/index.vue 第 7～9 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/home/index.vue:7>)：同一个组件分别接收三个分类结果。
> - [components/listContent.vue 第 1～20 行](</Users/aaron/CodingPractice/14_uniapp/project2/components/listContent.vue:1>)：分类标题、总数、横向卡片、封面和评分结构。
> - [components/listContent.vue 第 24～43 行](</Users/aaron/CodingPractice/14_uniapp/project2/components/listContent.vue:24>)：接收 `main` 并携带分类 ID 跳转列表页。
> - [components/listContent.vue 第 67～99 行](</Users/aaron/CodingPractice/14_uniapp/project2/components/listContent.vue:67>)：横向布局、卡片尺寸和标题单行省略样式。
