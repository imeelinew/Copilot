---
id: vue-modifiers
title: Vue 的常用修饰符有哪些？
aliases: [修饰符, 事件修饰符, 表单修饰符, stop prevent]
category: vue
difficulty: 基础
priority: normal
projects: []
keywords: [stop, prevent, lazy, trim, number, 按键修饰符]
---

# Vue 的常用修饰符有哪些？

## 核心回答

记三类就够。事件修饰符：.stop 阻止冒泡，.prevent 阻止默认行为，.self 只处理点在自己身上的事件，.once 只触发一次，还有 .capture 和 .passive。表单修饰符：.lazy 把 input 换成 change 事件、失焦才同步，.trim 去首尾空格，.number 尝试转数字。按键修饰符：@keyup.enter、@keyup.esc 这种，不用自己在回调里比对键值。

它们的价值是让意图写在模板上，不用在 handler 里手写 stopPropagation、preventDefault 这些样板代码，一眼能看懂这一行想干什么。

## 展开回答

Vue3 有两个变化顺带说了：.sync 修饰符没了，统一改成 v-model:xxx；Vue2 里给组件根元素绑原生事件的 .native 也移除了，因为 Vue3 里组件没声明的事件默认就往下透传。另外修饰符可以串联，@click.stop.prevent 这种写法很常见。

## 面试官可能追问

- .stop 和 .self 有什么区别？
- .passive 修饰符是干什么的？
- Vue3 里 .sync 和 .native 去哪了？
