---
id: yunshu-smart-city-normal-005-homepage-csv-export
title: 首页数据总览、刷新和 CSV 导出
aliases: [请介绍一下项目中的首页数据总览、刷新和 CSV 导出。, 你在首页数据总览、刷新和 CSV 导出方面具体做了什么？, 这部分的设计思路和边界是什么？]
category: yunshu-smart-city
difficulty: 进阶
priority: normal
projects: [云枢智慧城市数据平台]
keywords: [首页数据, CSV 导出, 地址管理, Promise.all, 分页, 数据可视化]
---

# 首页数据总览、刷新和 CSV 导出

## 核心回答

用户进入首页后，可以同时看到城市概览、交通排行、事件分类、公共设施以及分页事件列表。页面把四组互不依赖的概览请求用 `Promise.all` 并行发出，全部回来后再更新对应图表；事件列表单独按页码请求，这样翻页时不需要重拉其他模块。用户可以点击刷新按钮只更新数据，不刷新整个网页，页面也每五分钟自动拉取一次。导出时，前端请求 Blob 二进制内容，创建临时下载地址触发 CSV 下载，完成后释放地址。并行请求是为了减少串行等待，分页拆开是为了缩小一次交互的请求范围。当前边界是四个概览接口中任意一个失败都会让这一组刷新失败，而且代码没有请求序号或取消机制，快速连续刷新时存在旧请求晚返回后覆盖新数据的可能；代码也不能证明实际接口耗时或导出文件内容一定正确。

## 回答要点

- 用户进入首页后，可以同时看到城市概览、交通排行、事件分类、公共设施以及分页事件列表。
- 页面把四组互不依赖的概览请求用 Promise.all 并行发出，全部回来后再更新对应图表；
- 事件列表单独按页码请求，这样翻页时不需要重拉其他模块。
- 用户可以点击刷新按钮只更新数据，不刷新整个网页，页面也每五分钟自动拉取一次。

## 面试官可能追问

- 关于“首页数据总览、刷新和 CSV 导出”，你为什么选择当前方案？
- “首页数据总览、刷新和 CSV 导出”在异常数据或并发场景下怎么处理？
- 如果改用替代方案，主要成本和收益分别是什么？

## 代码证据

>
> - [Dashboard.tsx，第 94～124 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Dashboard.tsx:94)：请求 CSV Blob、创建下载链接并释放对象 URL。
> - [Dashboard.tsx，第 486～517 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Dashboard.tsx:486)：四组概览并行请求和事件分页请求。
> - [Dashboard.tsx，第 519～554 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Dashboard.tsx:519)：手动刷新、首屏请求和五分钟定时刷新。
> - [Dashboard.tsx，第 565～652 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Dashboard.tsx:565)：导出、刷新、响应式指标卡、图表和分页事件表入口。
> - [cities.ts，第 39～77 行](/Users/aaron/personal-hub/apps/project-1/src/api/cities.ts:39)：概览、交通、事件、设施和 CSV 导出接口。
