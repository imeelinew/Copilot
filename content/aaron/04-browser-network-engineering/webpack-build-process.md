---
id: engineering-webpack-build-process
title: Webpack 的构建流程是怎样的？
aliases: [webpack流程, 构建流程, 打包原理]
category: engineering
difficulty: 高频
priority: high
projects: []
keywords: [入口, 依赖图, chunk, 编译]
---

# Webpack 的构建流程是怎样的？

## 核心回答

整个流程说白了就是：从入口出发，画出一张依赖图，最后变成文件。启动时先合并配置文件和命令行参数，创建 Compiler 对象、注册所有插件，然后根据 entry 找到入口文件。

接着从入口递归处理：每个模块先交给对应的 Loader 翻译成 JS，再解析它 import 了谁，把依赖也拉进来继续走同样的流程。全部处理完，所有模块加上它们之间的依赖关系就构成一张完整的依赖图。

最后按依赖图把模块组装成一个个 chunk，经过压缩、tree-shaking 这些优化，根据 output 的配置写到磁盘上。插件能插手的地方贯穿全程，靠的就是各阶段广播出来的钩子，所以 plugin 的逻辑能在输出前改结果。

## 展开回答

我平时写 Vite 多，Webpack 生产项目没从零搭过，但流程是通的：Vite 开发时跳过了"组装成 chunk"这一步，浏览器按需取单个模块，生产构建用 Rollup 走的还是类似的依赖图流程。

chunk 和 bundle 顺带能说清：chunk 是打包过程的中间产物，一个入口或者一次动态导入对应一个 chunk，写到磁盘上之后那份文件就叫 bundle。

## 面试官可能追问

- Loader 在流程里哪一步起作用？
- chunk 和 bundle 有什么区别？
- Webpack 怎么知道一个模块被谁依赖？
