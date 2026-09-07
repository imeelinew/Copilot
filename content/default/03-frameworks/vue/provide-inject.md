---
id: vue-provide-inject-boundary
title: Vue 的 provide / inject 适合放什么状态？
aliases: [Vue provide inject, 依赖注入边界]
category: vue
difficulty: 进阶
priority: normal
projects: []
keywords: [provide, inject, Vue, 依赖注入, Pinia]
---

# Vue 的 provide / inject 适合放什么状态？

## 核心回答

provide / inject 适合把一组有明确上下文的能力传给深层后代，比如表单上下文、主题、组件库配置或当前页面服务；它能避免层层透传 props，但依赖关系也会变得隐含。跨页面、需要调试和持久化的业务状态更适合 Pinia 或 URL。注入对象要定义清楚读写方向，必要时只提供 readonly 状态和操作函数。

## 追问：注入值为什么有时不更新？

如果 provide 的是普通值，它本来就不是响应式；要传 ref、reactive 或计算值，后代才能跟着变化。解构 reactive 也可能丢掉响应式，需要 toRef 或保留对象引用。另一个常见问题是组件树中间换了 provider，实际注入来源已经变了，要通过 devtools 和最小复现确认。

## 追问：如何测试依赖注入组件？

测试时在 wrapper 的 global.provide 注入最小实现，分别覆盖默认值、缺失依赖和更新回调。不要为了测试去访问组件内部的注入变量，而是操作页面并断言可见结果。公共 provider 还要测卸载后是否清理订阅和请求。

