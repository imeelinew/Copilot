---
id: yingke-movies-normal-012-homepage-component-reuse
title: 用数据驱动方式复用三个首页分类
aliases: [请介绍一下项目中的用数据驱动方式复用三个首页分类。, 你在用数据驱动方式复用三个首页分类方面具体做了什么？, 这部分的设计思路和边界是什么？]
category: yingke-movies
difficulty: 深入
priority: normal
projects: [映刻影视]
keywords: [首页数据, 组件设计, 页面导航, 验证方法, Promise.allSettled, Promise.all]
---

# 用数据驱动方式复用三个首页分类

## 核心回答

首页的三个分类只有数据不同，卡片结构、评分展示和跳转方式都相同。如果直接复制三套模板，后续改卡片尺寸或字段时就要同步修改三处，也容易出现样式不一致。当前代码把公共结构放进 `listContent` 组件，首页并发取得三份相同结构的数据后分别传入，组件再从数据中读取分类名称、总数和分类 ID。这样首页负责组织数据，组件负责展示和跳转，新增同结构分类时不需要再复制整套视图。当前限制是组件接收的不是干净业务数据，而是 `Promise.allSettled` 的结果对象，所以它知道了父页面的并发细节。验证时可以逐个核对三个分类的名称、数量、首尾卡片和“更多”跳转参数，确认同一组件展示的是各自数据。

## 回答要点

- 首页的三个分类只有数据不同，卡片结构、评分展示和跳转方式都相同。
- 如果直接复制三套模板，后续改卡片尺寸或字段时就要同步修改三处，也容易出现样式不一致。
- 当前代码把公共结构放进 listContent 组件，首页并发取得三份相同结构的数据后分别传入，组件再从数据中读取分类名称、总数和分类 ID。
- 这样首页负责组织数据，组件负责展示和跳转，新增同结构分类时不需要再复制整套视图。

## 面试官可能追问

- 关于“用数据驱动方式复用三个首页分类”，你为什么选择当前方案？
- “用数据驱动方式复用三个首页分类”在异常数据或并发场景下怎么处理？
- 如果改用替代方案，主要成本和收益分别是什么？

## 代码证据

>
> - [pages/home/index.vue 第 7～9 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/home/index.vue:7>)：同一组件复用三次。
> - [pages/home/index.vue 第 36～67 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/home/index.vue:36>)：并发组织三个分类结果。
> - [components/listContent.vue 第 1～20 行](</Users/aaron/CodingPractice/14_uniapp/project2/components/listContent.vue:1>)：通用分类卡片结构。
> - [components/listContent.vue 第 24～38 行](</Users/aaron/CodingPractice/14_uniapp/project2/components/listContent.vue:24>)：组件数据入口和分类跳转。
