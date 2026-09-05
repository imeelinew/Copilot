---
id: vue-dom-access
title: Vue 里怎么操作 DOM？
aliases: [ref, 自定义指令, 操作dom, directive]
category: vue
difficulty: 基础
priority: normal
projects: [智服工单, 轻购]
keywords: [ref, nextTick, 自定义指令, directive]
---

# Vue 里怎么操作 DOM？

## 核心回答

主要靠 ref。标签上写 ref 拿到真实 DOM 元素，组件上写 ref 拿到组件实例，Vue3 组合式里子组件默认封闭，要暴露内容得用 defineExpose。注意时机：要在 mounted 之后用，而且渲染是异步批量的，改完数据立刻取 ref 还是旧值，得配合 nextTick。

成体系、要复用的 DOM 操作就用自定义指令封装，比如输入框自动聚焦、图片懒加载、埋点上报。Vue3 的指令钩子跟组件生命周期同名：mounted、updated、unmounted 这些，钩子里拿到 el 和 binding 直接操作元素。全局用 app.directive 注册，局部写在组件的 directives 选项里。

## 展开回答

原则上是能不碰 DOM 就不碰，手动改的 DOM 和虚拟 DOM 管理的容易打架。ref 和自定义指令算正规渠道，真正绕不开的场景是第三方库需要容器节点，比如图表库，这种我一般包一层组件把 DOM 逻辑收在里面，别处照常声明式写。

## 面试官可能追问

- 为什么数据更新后要 nextTick 才能拿到新 DOM？
- 自定义指令有哪些钩子函数？
- 你写过什么自定义指令？
