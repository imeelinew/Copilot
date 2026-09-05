---
id: engineering-babel
title: Babel 是怎么把 ES6 转成 ES5 的？
aliases: [babel原理, AST, polyfill, preset-env]
category: engineering
difficulty: 高频
priority: normal
projects: []
keywords: [babel, AST, 转译, polyfill]
---

# Babel 是怎么把 ES6 转成 ES5 的？

## 核心回答

Babel 是个转译器，把同种语言的高版本语法翻译成低版本，流程三步：先解析，把源码按词法和语法拆成 AST（抽象语法树）；再转换，插件在这棵树上改节点，比如把箭头函数节点改回普通函数节点；最后生成，拿新的 AST 输出目标代码。

插件是按功能一个个装的，太碎，所以有 preset 这种集合，最常用的是 preset-env，它会根据 browserslist 声明的目标浏览器决定哪些语法需要转。要注意语法能转掉，但 Promise、数组 includes 这种新 API 转不掉，得靠 polyfill 补，现代方案是 core-js 配按需注入，或者走 @babel/runtime 从包里引，不污染全局。

## 展开回答

Vite 项目里基本见不到 Babel 了：语法转译交给 esbuild，或者目标本来就是现代浏览器不用转，只有 JSX 这类要插件转换的语法才需要 Babel 或者对应插件处理一句。

被追问为什么 esbuild 快，可以接着说：Babel 用 JS 写，管线为插件生态设计，灵活但慢；esbuild 是 Go 写的，并行处理加上省掉不少工程化的开销，快一个量级，代价是扩展性没那么开放。

## 面试官可能追问

- polyfill 是什么，和语法转换有什么区别？
- preset 和 plugin 是什么关系？
- esbuild 和 Babel 转译有什么区别？
