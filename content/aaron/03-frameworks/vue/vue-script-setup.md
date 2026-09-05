---
id: vue-script-setup
title: script setup 是干什么的？
aliases: [setup语法糖, defineProps, defineExpose, 自动注册]
category: vue
difficulty: 高频
priority: high
projects: [轻购]
keywords: [script setup, defineProps, defineEmits, defineExpose, 语法糖]
---

# script setup 是干什么的？

## 核心回答

script setup 是组合式 API 在单文件组件里的编译期语法糖，等于把 setup 函数写法简化了。好处全是省代码：顶层的变量、函数、import 进来的组件不用 return 也不用 components 注册，模板直接用，组件 import 即注册。声明 props 和事件用 defineProps、defineEmits，这些 define 开头的宏是编译器特殊处理的，不需要 import。

还有一点，默认组件内部是封闭的，父组件拿 ref 访问不到内部状态，要暴露就 defineExpose；插槽和透传属性用 useSlots、useAttrs 拿。

## 展开回答

说到底是语法糖，编译后还是普通的 setup，所以不能说它"运行时性能更高"，面试里这么说会被抓。轻购项目整站都是 script setup 加 TypeScript，defineProps 直接写类型标注，props 的校验和类型提示一次搞定，体验比 Vue2 时代好不少。另外要拿组件 name 的场景，比如 keep-alive 的 include，Vue 3.3 之后可以直接用 defineOptions 声明。

## 面试官可能追问

- script setup 的组件怎么定义 name？
- defineProps 怎么做类型限制？
- script setup 和普通 setup() 写法有什么区别？
