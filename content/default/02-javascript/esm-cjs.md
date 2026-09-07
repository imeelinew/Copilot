---
id: js-esm-cjs
title: ESM 和 CommonJS 有什么区别？
aliases: [import require 区别, 模块化加载, 循环依赖]
category: javascript
difficulty: 进阶
priority: normal
projects: []
keywords: [ESM, CommonJS, import, require, tree shaking]
---

# ESM 和 CommonJS 有什么区别？

## 核心回答

ESM 用 `import` 和 `export`，模块关系在语法层面是静态的，构建工具可以提前分析依赖，也更容易做 tree-shaking。CommonJS 用 `require` 和 `module.exports`，可以在运行时按条件加载，Node.js 老项目里比较常见。

两者的导出绑定也不完全一样。ESM 导出的是活绑定，模块里的值变化后，导入方看到的仍然是同一个绑定；CommonJS 更接近把当时的 exports 对象交出去。混用时要注意默认导出、interop 和 package.json 的 type 配置。

## 追问：为什么 ESM 的 import 不能随便写进 if？

静态 import 要在模块解析阶段确定，不能按运行时条件出现。需要条件加载时用动态 `import()`，它返回 Promise，也正好可以配合路由懒加载和代码分割。

## 追问：循环依赖会发生什么？

循环依赖不一定立刻报错，但模块初始化顺序可能让某个值在初始化完成前就被读取。ESM 会暴露暂时性死区或未初始化绑定，CommonJS 可能拿到不完整的 exports。设计模块时尽量让依赖方向清楚，公共类型或常量可以单独抽一层。

## 追问：tree-shaking 为什么可能失效？

动态访问导出、模块有副作用、使用 CommonJS 或 package 没有正确声明 sideEffects，都可能让工具保守地保留更多代码。tree-shaking 是构建分析，不是运行时魔法，最终还得看产物分析结果。
