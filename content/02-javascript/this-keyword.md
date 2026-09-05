---
id: js-this-keyword
title: this 的指向怎么判断？
aliases: [this指向, 箭头函数this, 默认绑定, 显式绑定]
category: javascript
difficulty: 必问
priority: high
projects: []
keywords: [this, 箭头函数, call, new, 调用方式]
---

# this 的指向怎么判断？

## 核心回答

this 不是定义时决定的，是函数被调用那一刻才确定的，看的是调用方式。一共四条规则：直接调用 fn()，this 是 undefined，非严格模式下是 window；作为对象方法调用 obj.fn()，this 指向 obj；用 new 调用，this 指向刚创建的实例；call、apply、bind 显式指定，this 指向传进去的第一个参数。判断时按优先级从强到弱套：new 和显式绑定最高，方法调用其次，默认调用兜底。

箭头函数是个例外，它没有自己的 this，用的是定义时外层作用域的 this，而且 call、bind 都改不动。所以回调场景特别好使：setTimeout 里写普通函数 this 会丢，换成箭头函数就直接拿到外层的 this。

说白了就是一句话：普通函数的 this 看谁调用，箭头函数的 this 看在哪定义。

## 展开回答

容易踩的场景有两个。一个是把对象方法取出来单独调用，const fn = obj.fn 之后 fn()，this 就从 obj 变成默认绑定了。另一个是 DOM 事件处理函数里 this 是绑定事件的那个元素，不是外层组件。

React 的 class 组件要给事件回调 bind 或者直接用箭头函数属性，不然 onClick 触发时 this 是 undefined，现在函数组件加 Hooks 就没这个烦恼了。

## 面试官可能追问

- 箭头函数为什么不能用 call 改 this？
- new 的过程中 this 经历了什么？
- 多次 bind 之后再 call，this 到底是谁？
