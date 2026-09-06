---
id: yingke-movies-followup-032-vant-weapp
title: Vant 目录中的代码是你自己写的吗？
aliases: [能具体解释一下Vant 目录中的代码是你自己写的吗吗？, 从设计取舍看，Vant 目录中的代码是你自己写的吗？, 这个问题在项目中的实际边界是什么？]
category: yingke-movies
difficulty: 进阶
priority: normal
projects: [映刻影视]
keywords: [Vant Weapp, 组件设计, 骨架屏, 分页, 加载状态]
---

# Vant 目录中的代码是你自己写的吗？

## 核心回答

不是，`wxcomponents/vant` 是第三方 Vant Weapp 组件代码。这个项目完成的是依赖接入、全局注册，以及在业务页面里使用评分、图标、Loading、Skeleton 和 Toast。面试时我可以讲为什么选择这些现成组件、怎样把它们接到业务里，但不能把 Vant 内部组件实现说成自己的工作。真正属于项目业务的部分是数据请求、分类组织、分页、路由和业务组件组合。

## 回答要点

- 不是，wxcomponents/vant 是第三方 Vant Weapp 组件代码。
- 这个项目完成的是依赖接入、全局注册，以及在业务页面里使用评分、图标、Loading、Skeleton 和 Toast。
- 面试时我可以讲为什么选择这些现成组件、怎样把它们接到业务里，但不能把 Vant 内部组件实现说成自己的工作。
- 真正属于项目业务的部分是数据请求、分类组织、分页、路由和业务组件组合。

## 面试官可能追问

- 关于“Vant 目录中的代码是你自己写的吗”，你为什么选择当前方案？
- “Vant 目录中的代码是你自己写的吗”在异常数据或并发场景下怎么处理？
- 如果改用替代方案，主要成本和收益分别是什么？

## 代码证据

>
> - [package.json 第 12～15 行](</Users/aaron/CodingPractice/14_uniapp/project2/package.json:12>)：项目声明 `@vant/weapp` 第三方依赖。
> - [pages.json 第 28～34 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages.json:28>)：将 Vant Weapp 组件注册到项目中。
