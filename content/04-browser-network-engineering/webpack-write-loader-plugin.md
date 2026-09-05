---
id: engineering-webpack-write-loader-plugin
title: 写过 Webpack 的 Loader 或 Plugin 吗？
aliases: [编写loader, 编写plugin, loader思路, plugin思路]
category: engineering
difficulty: 亮点
priority: normal
projects: []
keywords: [loader, plugin, 钩子, 扩展]
---

# 写过 Webpack 的 Loader 或 Plugin 吗？

## 核心回答

实话说没在生产里写过，我的项目构建都是 Vite，这块我是照着文档和优秀 loader 的源码理解思路的。Loader 本身就是个函数：接收文件内容，返回处理后的内容，几个 loader 链起来接力。写的时候讲究单一职责，一个 loader 只干一种转换；遇到异步处理就用 this.async() 拿一个回调，处理完再交回去，官方还配了 loader-utils 工具库。

Plugin 是一个带 apply 方法的类，apply 里拿到 compiler 对象，在上面订阅具体钩子，比如 emit（写文件前），再通过 compilation 提供的 API 读改资源。写 plugin 的思路就是想清楚两件事：在什么时机、改什么东西。

## 展开回答

如果真让我写：想把 markdown 文件转成组件，就写个 loader，解析出结构再拼成 JS 模块返回；想在打包结束后统计产物体积、超了就告警，就写个 plugin 监听钩子，遍历 assets 算大小。

我觉得面试官问这题多数不是要现场写，是看懂不懂这套扩展机制，我把"loader 管转换、plugin 管时机"这个边界讲清楚，再能给出一两个真实场景的思路就够了。

## 面试官可能追问

- loader 之间怎么传递内容？
- plugin 拿到 compilation 能干什么？
- Webpack 的事件机制了解吗？
