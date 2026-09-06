---
id: yunshu-smart-city-normal-001-project-overview
title: 项目介绍
aliases: [请简单介绍一下这个项目。, 这个项目解决了什么问题？, 请概括项目的业务流程和技术栈。]
category: yunshu-smart-city
difficulty: 基础
priority: normal
projects: [云枢智慧城市数据平台]
keywords: [React, 智慧城市, TypeScript, 项目概览, 登录鉴权, 首页数据]
---

# 项目介绍

## 核心回答

云枢智慧城市数据平台主要面向城市运营人员和数据分析人员，解决的是城市数据分散、指标不容易统一查看的问题。用户先通过账号、密码和验证码登录，进入系统后可以在首页看到城市总数、人口、GDP、交通拥堵、公共设施和城市事件等核心数据，也可以继续进入地图查看城市位置和环境监测情况，或者用 3D 视图比较不同城市的人口规模。如果需要做专题分析，用户可以选择数据源、数据表、横纵轴字段和聚合方式，生成柱状图、折线图或饼图，再把图表放进自定义仪表盘。系统还提供 AI 助手，用户可以用自然语言查询城市概览、交通、天气、设施和事件；管理员则可以维护用户、角色和权限。

前端主要使用 React 19、TypeScript、Vite 和 React Router，Redux Toolkit 配合 redux-persist 保存登录和主题状态，Axios 处理普通接口，ECharts 负责二维图表，Three.js 相关库负责 3D 场景，高德地图 API 负责地图。这个项目比较有特点的地方不是单纯把图表画出来，而是把登录会话、角色菜单、业务数据、地图、图表编辑和 AI 流式回答串成了一条完整流程。比如 Token 临近过期时会自动刷新，并发请求只共享一次刷新；地图的多个环境接口允许部分失败；图表编辑器会保留聚合规则，仪表盘再次打开时可以重新查询并生成当前图表。这里我只能确认代码中的实现，不能把它进一步说成已经验证过的线上性能或用户效果。

## 回答要点

- 云枢智慧城市数据平台主要面向城市运营人员和数据分析人员，解决的是城市数据分散、指标不容易统一查看的问题。
- 用户先通过账号、密码和验证码登录，进入系统后可以在首页看到城市总数、人口、GDP、交通拥堵、公共设施和城市事件等核心数据，也可以继续进入地图查看城市位置和环境监测情况，或者用 3D 视图比较不同城市的人口规模。
- 如果需要做专题分析，用户可以选择数据源、数据表、横纵轴字段和聚合方式，生成柱状图、折线图或饼图，再把图表放进自定义仪表盘。
- 系统还提供 AI 助手，用户可以用自然语言查询城市概览、交通、天气、设施和事件；

## 面试官可能追问

- 这个项目解决的核心业务问题是什么？
- 你在项目中主要负责哪些模块？
- 你如何证明这些功能对应当前代码实现？

## 代码证据

>
> - [package.json，第 6～44 行](/Users/aaron/personal-hub/apps/project-1/package.json:6)：项目脚本以及 React、Redux、Axios、ECharts、Three.js、高德地图等依赖。
> - [router/index.tsx，第 6～21 行](/Users/aaron/personal-hub/apps/project-1/src/router/index.tsx:6)：各业务页面采用懒加载接入路由。
> - [router/index.tsx，第 30～182 行](/Users/aaron/personal-hub/apps/project-1/src/router/index.tsx:30)：首页、仪表盘、图表、地图、3D、AI、用户、角色和个人中心的路由入口。
> - [Layout.tsx，第 25～99 行](/Users/aaron/personal-hub/apps/project-1/src/layout/Layout.tsx:25)：平台菜单和模块分组。
> - [main.tsx，第 14～39 行](/Users/aaron/personal-hub/apps/project-1/src/main.tsx:14)：全局主题、会话管理、路由、Redux 和持久化的应用入口。
