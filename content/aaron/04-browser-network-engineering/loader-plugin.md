---
id: engineering-webpack-loader-plugin
title: Loader 和 Plugin 的区别？
aliases: [loader, plugin, webpack配置, 常见loader]
category: engineering
difficulty: 高频
priority: high
projects: []
keywords: [loader, plugin, 编译, 打包]
---

# Loader 和 Plugin 的区别？

## 核心回答

Loader 直译是加载器。Webpack 把所有文件都当模块，但它原生只认 JS 和 JSON，碰到 CSS、图片、.vue 文件就不认识了，Loader 就是给它补上翻译能力，把这些文件转成能用的模块。配置写在 module.rules 里，每一项描述什么文件（test）用什么 loader 处理、带什么参数。

Plugin 直译是插件，干的是扩展功能的事。Webpack 构建过程里会在很多关键节点广播事件钩子，插件去监听这些钩子，在合适的时机用自己的逻辑改打包结果，比如生成 HTML、压缩代码、抽离 CSS。配置在 plugins 数组里，放的是 new 出来的实例，参数走构造函数。

一句话总结：Loader 是文件转换器，管"把看不懂的文件翻译成能用的"；Plugin 是流程干预者，管"在构建的什么时机做什么事"。

## 展开回答

常见的 loader 可以顺手报菜名：babel-loader 转 JS 语法，css-loader 解析 CSS 里的 import 和 url，style-loader 把 CSS 塞进页面，vue-loader 处理单文件组件。Webpack 5 里图片这类资源直接用 asset 模块，小图内联、大图出文件，不用再装 file-loader 和 url-loader 了。常见 plugin 有 HtmlWebpackPlugin 自动生成 HTML 并注入产物、MiniCssExtractPlugin 抽 CSS 成单独文件、TerserPlugin 压缩 JS、DefinePlugin 注入环境变量。

Loader 是链式的，前一个的输出是后一个的输入，执行顺序从后往前，比如处理 sass 是 sass-loader 先转成 CSS，再 css-loader 解析，最后 style-loader 注入页面。

## 面试官可能追问

- loader 的执行顺序是怎样的？
- css-loader 和 style-loader 为什么要配合用？
- 写一个 loader 或 plugin 的思路？
