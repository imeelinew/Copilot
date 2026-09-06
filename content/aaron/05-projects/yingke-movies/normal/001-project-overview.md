---
id: yingke-movies-normal-001-project-overview
title: 项目介绍
aliases: [请简单介绍一下这个项目。, 这个项目解决了什么问题？, 请概括项目的业务流程和技术栈。]
category: yingke-movies
difficulty: 基础
priority: normal
projects: [映刻影视]
keywords: [uni-app, 影视小程序, Vue 2, 项目概览, 请求封装, 首页数据]
---

# 项目介绍

## 核心回答

映刻影视是一个用 uni-app 开发的影视信息浏览小程序，主要面向想快速查看影视分类、评分和简介的用户。它解决的需求比较直接：用户进入首页后，可以先看到国产剧、综艺和美剧三个分类，每个分类会展示一组影视卡片，包括封面、标题、星级和评分；如果对某个分类感兴趣，可以点击“更多”进入分类列表，继续向下滚动加载数据；在列表里点击具体影片，又可以进入详情页查看大图封面、标题、副标题和剧情简介。整个项目主要分成首页聚合、分类列表、影视详情、公共展示组件和请求层五部分。技术上使用 Vue 2、JavaScript、Less、uni-app 和 Vant Weapp，请求部分没有让页面到处直接写 `uni.request`，而是给 Axios 配了一个自定义适配器，把 Axios 的调用方式转换成小程序请求。这个项目比较有特点的地方，一是首页同时请求三个分类，再复用同一个横向卡片组件展示；二是列表页通过分类 ID 选择接口，并使用 `start` 和 `count` 做触底分页；三是把评论简介单独做成组件，支持长文本截断、展开和收起。需要说明的是，这些结论只能证明当前代码里存在相应实现，不能证明项目已经上线，也不能证明第三方接口现在仍然可用。

## 回答要点

- 映刻影视是一个用 uni-app 开发的影视信息浏览小程序，主要面向想快速查看影视分类、评分和简介的用户。
- 它解决的需求比较直接：用户进入首页后，可以先看到国产剧、综艺和美剧三个分类，每个分类会展示一组影视卡片，包括封面、标题、星级和评分；
- 如果对某个分类感兴趣，可以点击“更多”进入分类列表，继续向下滚动加载数据；
- 在列表里点击具体影片，又可以进入详情页查看大图封面、标题、副标题和剧情简介。

## 面试官可能追问

- 这个项目解决的核心业务问题是什么？
- 你在项目中主要负责哪些模块？
- 你如何证明这些功能对应当前代码实现？

## 代码证据

>
> - [pages.json 第 2～20 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages.json:2>)：注册首页、分类列表页和详情页。
> - [manifest.json 第 52～71 行](</Users/aaron/CodingPractice/14_uniapp/project2/manifest.json:52>)：小程序相关配置以及 Vue 2 版本声明。
> - [package.json 第 12～16 行](</Users/aaron/CodingPractice/14_uniapp/project2/package.json:12>)：声明 Vant Weapp、Axios 和 axios-miniprogram 依赖。
> - [pages/home/index.vue 第 1～20 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/home/index.vue:1>)：首页三个分类区域以及 API、组件入口。
> - [pages/list/index.vue 第 1～25 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/list/index.vue:1>)：分类列表展示、评分、简介和详情入口。
> - [pages/detail/index.vue 第 1～10 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/detail/index.vue:1>)：影视详情页的展示字段。
