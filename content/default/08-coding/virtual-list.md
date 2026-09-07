---
id: coding-virtual-list-core
title: 虚拟列表的核心计算怎么写？
aliases: [手写虚拟列表, virtual list]
category: coding
difficulty: 进阶
priority: normal
projects: []
keywords: [虚拟列表, scrollTop, overscan, 行高]
---

# 虚拟列表的核心计算怎么写？

## 核心回答

固定行高时，`start = floor(scrollTop / rowHeight)`，再加上前后 overscan 得到渲染区间；外层用一个总高度占位，内容通过 translateY 放到 start 对应的位置。滚动时节流计算并限制 start/end 边界，列表项 key 仍然使用业务 id。动态行高要维护测量结果和前缀和，复杂度和滚动定位都会上升，不能用固定公式硬套。

## 追问：为什么需要 overscan？

只渲染刚好在视口内的行，快速滚动时容易出现白屏。前后多渲染几行可以给浏览器和 React/Vue 留出准备时间，代价是多一点 DOM。overscan 应按行高、滚动速度和设备测量，过大就失去虚拟化意义。

## 追问：虚拟列表如何保证可访问性？

可见窗口之外的内容不在 DOM，读屏器和浏览器查找不会自动拿到完整列表。需要提供总数、当前位置和键盘移动语义，焦点移出窗口时及时滚动到对应项；如果用户必须连续阅读所有内容，分页或普通列表可能更合适。

