---
id: engineering-npm-package
title: 发布一个 npm 包，构建上要注意什么？
aliases: [npm发包, 发布npm包, peerDependencies, 组件库构建]
category: engineering
difficulty: 亮点
priority: normal
projects: []
keywords: [npm, peerDependencies, externals, tree-shaking]
---

# 发布一个 npm 包，构建上要注意什么？

## 核心回答

我还没正式发过包，这些是我研究过的注意点。核心原则是"别把依赖打进包里"：dependencies 应该让使用者自己装，构建时要么不打包依赖，要么用 externals 排除掉；组件库这种强依赖宿主框架的，用 peerDependencies 声明"你项目里得先有 React"，不然用户装完出现两份 React 直接报错。

输出格式要两头兼顾：CommonJS 和 ESM 各出一份，package.json 里用 main、module、exports 字段分别指过去，老的 require 和新的 import 都能用。想让人家 tree-shaking 你的包，ESM 产物不能丢，再把 sideEffects 标成 false，明确告诉打包器这包没副作用，没用到的导出放心摇掉。

## 展开回答

体积上还有个细节：Babel 转译会往每个文件注入辅助函数，等于重复灌水，用 transform-runtime 把这些辅助函数抽成公共引入就能瘦下来。UI 组件包的样式文件也要一起发出去，让用户按需引。

## 面试官可能追问

- dependencies 和 peerDependencies 有什么区别？
- exports 字段是干嘛的？
- 怎么让包支持 tree-shaking？
