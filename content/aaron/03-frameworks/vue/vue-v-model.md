---
id: vue-v-model
title: v-model 的原理是什么？
aliases: [v-model, 双向绑定语法糖, modelValue, update modelValue]
category: vue
difficulty: 高频
priority: high
projects: [轻购]
keywords: [v-model, input 事件, modelValue, 语法糖]
---

# v-model 的原理是什么？

## 核心回答

v-model 就是语法糖，本质是值绑定加事件监听。原生表单上，Vue2 等价于 :value 加 @input，输入时把值写回数据；Vue3 改成 :modelValue 加 @update:modelValue，思路没变。所以双向绑定没有任何魔法：数据变视图靠响应式，视图变数据靠事件回写。

用在组件上是同一套约定：组件接收 modelValue 这个 prop，内部变化时 emit('update:modelValue', 新值)。Vue2 里是 value prop 加 input 事件，另有个 .sync 修饰符干类似的事；Vue3 统一成 v-model:xxx 的写法，还能给一个组件绑多个值，比如 v-model:title 和 v-model:visible 同时用。

## 展开回答

修饰符顺带知道：.lazy 把 input 事件换成 change，失焦才同步，搜索框防抖时好用；.trim 自动去首尾空格；.number 尝试转成数字。表单多的业务页这几个天天用，不用自己在回调里处理。

## 面试官可能追问

- 自定义组件上实现 v-model 要做什么？
- Vue3 的 .sync 去哪了？
- 一个组件上能用多个 v-model 吗？
