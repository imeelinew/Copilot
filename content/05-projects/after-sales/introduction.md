---
id: after-sales-introduction
title: 介绍一下智服工单项目
aliases: [智服工单项目介绍, 售后工单系统, vue2项目]
category: after-sales
difficulty: 必问
priority: high
projects: [智服工单]
keywords: [Vue2, Vuex, 工单, 状态机, SLA]
---

# 介绍一下智服工单项目

## 30 秒回答

智服工单是我独立完成前端的企业售后服务管理系统，使用 Vue 2、Vuex、Element UI、Axios 和 ECharts。系统覆盖客户设备建档、工单创建分配、维修处理、回访和数据看板。我重点设计了工单状态机、SLA 超时展示以及菜单、路由和操作按钮的角色权限。

## 标准回答

智服工单是面向客服、维修人员和售后管理员的工单管理系统，前端由我独立完成。它使用 Vue 2、Vue Router、Vuex、Element UI、Axios、ECharts 和 SCSS。

核心业务从客服创建工单开始，经过待分配、待处理、处理中、待回访，最后完成闭环。不同角色能看到的菜单、数据和操作不同，例如工程师只能处理分配给自己的工单，客服负责回访和完成。

我把状态和角色共同映射为当前允许的操作，前端只展示合法按钮；服务端也会再次校验状态流转。系统按照问题分类的 SLA 计算截止时间，在列表、详情和看板中标识超时工单。看板使用 Promise.all 并行获取统计、趋势和最近工单，并在组件销毁时释放 ECharts 实例。

这个项目让我意识到后台系统的难点不只是表格增删改查，而是业务状态、角色权限和数据一致性。

## 回答要点

- 用完整业务闭环说明系统价值。
- 重点引向状态机、SLA 和权限。
- 不包含“后端由谁完成”的表述。

## 面试官可能追问

- 如何防止工单越级流转？
- 两个人同时处理同一工单怎么办？
- 工程师为什么只能看到自己的工单？

## 代码证据

- /Users/eli/Resumes/after-sales-work-order/frontend/src/views/TicketDetail.vue
- /Users/eli/Resumes/after-sales-work-order/frontend/src/router/index.js
- /Users/eli/Resumes/after-sales-work-order/server/src/services/ticketState.js
