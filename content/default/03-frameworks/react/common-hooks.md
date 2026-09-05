---
id: react-common-hooks
title: React 常用的 Hooks 有哪些？
aliases: [常用hooks, react hooks, useState useEffect]
category: react
difficulty: 基础
priority: high
projects: [城市视图]
keywords: [useState, useEffect, useMemo, useRef, useCallback]
---

# React 常用的 Hooks 有哪些？

## 30 秒回答

我最常用的是 useState 管理组件状态、useEffect 处理请求和订阅等副作用、useMemo 缓存计算结果、useCallback 缓存函数引用，以及 useRef 保存 DOM 或不需要触发渲染的值。实际使用时我不会为了缓存而全部加上 useMemo、useCallback，而是先判断计算成本和子组件是否依赖引用稳定性。

## 标准回答

在城市视图项目里，我主要使用几类 Hook。useState 管理页面状态，例如加载状态、筛选条件和接口数据；useEffect 在依赖变化时请求数据、启动定时器或初始化第三方库，并在清理函数里取消定时器和释放资源；useMemo 用于根据角色计算过滤后的菜单；useRef 保存 ECharts、地图实例或 DOM 容器，不需要改变它们时触发重新渲染。

useCallback 可以在把函数传给使用 memo 的子组件时保持引用稳定，但它本身也有维护依赖和计算成本，所以不会机械使用。复杂的跨组件全局状态，我会使用 Redux Toolkit，而不是把所有状态都塞进 Context 或层层传递。

## 回答要点

- 每个 Hook 都要说明用途，而不是只报名称。
- useEffect 必须提到依赖和清理函数。
- 主动说明不会滥用缓存 Hook。

## 面试官可能追问

- useEffect 的依赖数组为空代表什么？
- useRef 改变为什么不会重新渲染？
- useMemo 和 React.memo 有什么区别？

## 代码证据

- /Users/eli/Dev/datapilot-rebuild/src/pages/Dashboard/index.tsx
- /Users/eli/Dev/datapilot-rebuild/src/layouts/MainLayout/index.tsx
