---
id: react-hooks-rules
title: Hooks 为什么不能写在条件分支里？
aliases: [hooks规则, rules of hooks, useState原理, hooks原理]
category: react
difficulty: 高频
priority: high
projects: [城市视图]
keywords: [调用顺序, 链表, memo, useCallback, 条件渲染]
---

# Hooks 为什么不能写在条件分支里？

## 30 秒回答

React 识别 Hook 靠的是调用顺序，不是名字或位置：每次渲染都按相同顺序走一遍 Hook 调用，状态按顺序对应存储。如果 Hook 写在条件或循环里，某次渲染数量或顺序变了，状态就会串位，比如条件为假时少调了一个 useState，后面的 Hook 全部错位。所以规则是只在函数顶层调用，条件逻辑放进 Hook 内部而不是包住 Hook。

## 标准回答

React 函数组件每次渲染都是一次全新执行。为了让 useState 这些 Hook 在多次渲染之间保持对应，React 在组件的 fiber 上按调用顺序维护 Hook 的记录，第一次渲染建立顺序，之后每次渲染按同样的顺序读取和写入。这个设计让 Hook 的实现非常轻，代价就是顺序是契约：条件分支、循环、提前 return、嵌套函数都可能让顺序变化，React 官方干脆规定只在顶层调用。

实际写法上，条件逻辑应该放在 Hook 内部。比如"登录后才轮询数据"，是 useEffect 的依赖里放登录状态，在 effect 内部决定要不要启动，而不是 if (logged) useEffect(...)。

useMemo 和 useCallback 我不会无脑全加：它们适合计算成本高的派生数据、被 memo 子组件消费的引用、以及 useEffect 依赖里需要稳定的函数。城市视图里我是按这三个标准判断的，避免缓存本身带来的比较和内存成本超过收益。

工程上用 eslint-plugin-react-hooks 的 rules-of-hooks 兜底，违反规则的写法在 lint 阶段就会被拦下来。

## 回答要点

- 核心一句：React 按"调用顺序"对应状态。
- 给出正确写法：条件放进 Hook 内部，不包住 Hook。
- 顺势说清 useMemo/useCallback 的判断标准，避免被追问翻车。

## 面试官可能追问

- useState 的初始值函数什么时候执行？
- useEffect 和 useLayoutEffect 的区别？
- 自定义 Hook 本质是什么？
