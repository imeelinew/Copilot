---
id: system-design-accessible-modal
title: 设计一个可访问的 Modal，需要哪些行为？
aliases: [Modal 设计, 弹窗焦点管理]
category: system-design
difficulty: 进阶
priority: normal
projects: []
keywords: [Modal, dialog, 焦点, 可访问性]
---

# 设计一个可访问的 Modal，需要哪些行为？

## 核心回答

打开时把焦点移到对话框内合适的标题或第一个可操作元素，Tab 只能在对话框内循环；关闭时把焦点还给触发按钮。Escape 是否关闭、点击遮罩是否关闭要由场景决定，危险操作不能只靠误触遮罩取消。使用原生 `dialog` 时仍要检查浏览器兼容和焦点行为，使用自定义容器则补上 `role="dialog"`、`aria-modal`、标题关联和背景不可交互。

## 追问：为什么不能只写一个 z-index？

z-index 只解决视觉层叠，不会阻止背景被键盘或读屏器访问，也不会自动处理焦点回收。还要考虑滚动锁、嵌套弹窗、页面卸载和移动端视口变化。实现后用键盘操作和辅助技术实际走一遍，而不是只看截图。

## 追问：如何测试？

测试打开、关闭、Escape、焦点循环、触发按钮恢复焦点和背景不可点击；再检查标题与描述的 aria 关联。自动化工具能抓部分语义问题，但焦点顺序和真实读屏体验仍需要人工键盘检查。

