---
id: react-jsx
title: JSX 是什么？浏览器能直接运行吗？
aliases: [jsx, jsx本质, createElement]
category: react
difficulty: 基础
priority: high
projects: []
keywords: [JSX, 语法糖, Babel, createElement]
---

# JSX 是什么？浏览器能直接运行吗？

## 核心回答

JSX 是 JS 的语法扩展，让你在 JS 里用类似 HTML 的写法描述界面。浏览器不认识它，必须经过 Babel 或 Vite 这类工具编译：老版本编译成 React.createElement 调用，React 17 之后走 jsx-runtime 的函数。所以 JSX 本质是语法糖，运行时真正在跑的是函数调用，返回一个描述这棵 UI 结构的 JS 对象，React 再拿这个对象去渲染。

写的时候有几个要记的点：{} 里只能放表达式，写 if、for 这种语句会报错，要用三元、&& 或者把逻辑提到 JSX 外面；class 要写成 className；最外层得有一个根节点，不想要多余的标签就用 <> 空标签。

## 展开回答

JSX 标签名大小写有讲究：小写开头会被当成原生标签，大写开头才当组件。React 17 之后 JSX 是自动转换的，组件文件里不用再为了写 JSX 手动 import React 了，但老项目里还能见到。另外 JSX 默认会把插值内容转义，往里塞 <script> 不会被当成 HTML 执行，要渲染富文本得显式用 dangerouslySetInnerHTML，这也是它默认防 XSS 的一道防线。

## 面试官可能追问

- React 17 之后 JSX 的编译产物有什么变化？
- 为什么 {} 里不能写 if 语句？
- <div> 和 <Div> 的区别？
