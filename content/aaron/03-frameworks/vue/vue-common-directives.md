---
id: vue-common-directives
title: Vue 有哪些常用指令？
aliases: [常用指令, v-html, v-once, v-pre, v-cloak]
category: vue
difficulty: 基础
priority: normal
projects: []
keywords: [v-html, v-once, v-pre, v-cloak, v-bind, v-on]
---

# Vue 有哪些常用指令？

## 核心回答

天天用的：v-bind 动态绑属性（缩写 :），v-on 绑事件（缩写 @），v-if / v-else 条件渲染，v-for 列表循环，v-model 表单双向绑定。这几个说清楚就行。

低频但爱问的几个：v-html 输出真正的 HTML，有 XSS 风险，只能喂可信内容，用户输入绝不能直接 v-html；v-once 节点只渲染一次，之后数据再变它不更新；v-pre 跳过编译，花括号原样输出，省一点编译开销；v-cloak 是 Vue2 时代的，配合 CSS 把未编译的挂载区先藏起来，防止网慢时用户看到一闪而过的模板原文。

## 展开回答

被问到没答过的指令别硬背全，答常用的加两三个冷门的就够，顺势把 v-html 的 XSS 风险讲出来反而加分，说明写代码有安全意识。

## 面试官可能追问

- v-html 有什么风险？怎么防范？
- v-once 和 v-pre 有什么区别？
- v-cloak 解决什么问题？
