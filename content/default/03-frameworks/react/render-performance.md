---
id: react-render-performance
title: React 页面更新慢时怎么定位？
aliases: [React 性能优化, 重复渲染, memo useMemo]
category: react
difficulty: 进阶
priority: normal
projects: []
keywords: [React 性能, rerender, memo, Profiler]
---

# React 页面更新慢时怎么定位？

## 核心回答

先用 React DevTools Profiler 看是哪次交互、哪个组件和哪段提交耗时，再看是计算慢、组件更新范围太大，还是 DOM 太多。确认原因后再决定拆组件、稳定 props、缓存计算、虚拟列表或延后非关键工作。

memo、useMemo、useCallback 都有比较和维护依赖的成本，不能当成默认装饰。比如一个组件每次都收到新的对象字面量，单独给它加 memo 可能没有效果；先让数据和边界稳定，优化才有意义。

## 追问：列表为什么要用稳定 key？

key 让 React 知道一行数据是不是原来那一行。插入、删除和排序时如果用 index，带本地状态的行可能被错误复用，输入内容就会跑到别的行。稳定 key 应来自业务实体 ID。

## 追问：大列表怎么优化？

只渲染视口附近的项目，也就是虚拟列表；减少每行的计算和图片尺寸变化；分页或增量加载数据。先确认瓶颈是 DOM 数量还是数据处理，别盲目把所有列表都虚拟化。

## 追问：状态放错位置会导致什么？

把高频变化放在过高的父组件，可能让整棵子树跟着更新。可以把状态下沉到真正需要它的区域，或者拆分订阅范围。状态位置比“用了哪个缓存 Hook”更影响更新范围。
