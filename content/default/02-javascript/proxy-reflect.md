---
id: js-proxy-reflect
title: Proxy 和 Reflect 通常怎么一起使用？
aliases: [Proxy 原理, Reflect 的作用, 代理对象]
category: javascript
difficulty: 进阶
priority: normal
projects: []
keywords: [Proxy, Reflect, 响应式, 拦截]
---

# Proxy 和 Reflect 通常怎么一起使用？

## 核心回答

Proxy 是在对象外面包一层，拦截读取、赋值、删除等操作；Reflect 提供一组对应的默认操作。一起用的好处是：我可以在拦截器里做自己的逻辑，真正执行读写时仍然交给 `Reflect.get`、`Reflect.set`，这样 this 绑定和返回值规则更接近 JavaScript 原本的行为。

响应式系统就是典型场景：读取属性时记录当前副作用，修改属性时通知依赖它的副作用。代理本身不等于响应式，依赖收集、触发更新、嵌套对象处理和停止监听还需要另外设计。

## 追问：为什么不直接用 Object.defineProperty？

defineProperty 只能给已有属性加 getter 和 setter，新增属性、删除属性和数组下标需要额外处理。Proxy 代理的是整个对象，可以拦截更多操作，所以 Vue 3 用它做响应式更自然。不过 Proxy 也有兼容性、不可撤销代理和调试复杂度等代价。

## 追问：Reflect.set 为什么要返回布尔值？

Proxy 的 `set` 拦截器必须返回是否写入成功。直接 `Reflect.set(target, key, value, receiver)` 会把原生赋值结果传回来；如果在严格模式下返回 false，赋值可能抛错。拦截器里不能写完逻辑却忘记返回结果。

## 追问：Proxy 能监听所有变化吗？

不能自动监听内部每一层。访问到嵌套对象时，需要继续给它做代理，或者采用 shallow 版本只代理第一层。Map、Set 也有自己的方法调用语义，处理时不能只照搬普通对象的 get 和 set。
