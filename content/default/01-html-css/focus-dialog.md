---
id: css-accessible-dialog-focus
title: 弹窗和下拉菜单的焦点管理怎么做？
aliases: [焦点陷阱, focus-visible, 下拉菜单可访问性]
category: html-css
difficulty: 进阶
priority: high
projects: []
keywords: [focus, focus-visible, dialog, 键盘, ARIA]
---

# 弹窗和下拉菜单的焦点管理怎么做？

## 核心回答

弹窗打开后焦点要进入弹窗，Tab 只能在可交互元素里循环，Escape 按约定关闭，关闭后焦点回到触发按钮；下拉菜单还要处理箭头键、当前项和点击外部。优先使用原生 button、dialog、select 等语义，再补 `aria-expanded`、`aria-controls` 和标签关联。`focus-visible` 可以让键盘用户看到焦点样式，同时避免鼠标点击出现不必要的描边。

## 追问：焦点陷阱为什么不能只监听 Tab？

还要考虑弹窗里没有可聚焦元素、动态增删按钮、嵌套弹窗、Shift+Tab 和组件卸载。只在 keydown 里硬跳索引，容易把 disabled、hidden 或 shadow DOM 元素算进去。实现时先收集当前可聚焦节点，找不到就把焦点放到标题或容器，再通过键盘测试验证。

## 追问：ARIA 能解决所有问题吗？

ARIA 只补充语义，不会自动增加键盘行为、焦点移动或状态管理；错误的 role 反而会误导读屏器。能用原生元素就不用 ARIA 伪造，使用自定义组件时同时实现语义、交互和视觉焦点，最后用自动化工具和人工读屏检查。

