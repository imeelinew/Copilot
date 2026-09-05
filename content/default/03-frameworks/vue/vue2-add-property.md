---
id: vue2-add-property
title: Vue 2 给对象新增属性，页面会响应吗？
aliases: [vue2新增属性不响应, Vue.set, 对象新增属性响应式]
category: vue
difficulty: 基础
priority: high
projects: [智服工单]
keywords: [Object.defineProperty, Vue.set, this.$set]
---

# Vue 2 给对象新增属性，页面会响应吗？

## 30 秒回答

如果属性在初始化 data 时不存在，直接通过 obj.newKey 赋值通常不会触发 Vue 2 的响应式更新，因为 Vue 2 初始化时只会用 Object.defineProperty 劫持已有属性。可以提前声明属性，或者使用 Vue.set、this.$set，也可以替换成一个包含新属性的新对象。

## 标准回答

Vue 2 初始化数据时，会遍历对象已有属性并使用 Object.defineProperty 转换成 getter 和 setter。后续直接新增的属性没有经过这个转换，所以直接写 this.form.newKey = value，视图通常不会自动更新。

解决方式有三个：第一是在 data 中提前声明所有需要的属性；第二是使用 this.$set(object, key, value) 或 Vue.set；第三是创建包含新属性的新对象并替换原引用，例如使用对象展开语法。

删除属性也有类似问题，需要使用 this.$delete。Vue 3 使用 Proxy 代理整个对象，可以拦截属性新增和删除，所以没有同样的限制。

## 回答要点

- 明确限定为 Vue 2 和初始化时不存在的属性。
- 给出提前声明、Vue.set、替换对象三种办法。

## 面试官可能追问

- Vue 2 直接修改数组索引会怎样？
- Vue 3 为什么能检测新增属性？
