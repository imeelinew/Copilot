---
id: browser-resource-loading
title: defer、async、preload 和 prefetch 怎么选？
aliases: [脚本加载顺序, 资源优先级, preload prefetch]
category: engineering
difficulty: 进阶
priority: high
projects: []
keywords: [defer, async, preload, prefetch, 资源加载]
---

# defer、async、preload 和 prefetch 怎么选？

## 核心回答

`defer` 脚本下载时不阻塞 HTML 解析，等文档解析完成后按顺序执行，适合依赖 DOM 或有执行顺序要求的主逻辑。`async` 下载完就执行，可能打断解析，适合互不依赖的统计脚本。普通 script 放在头部时，下载和执行都可能阻塞解析。

`preload` 是告诉浏览器当前页面很快一定会用到某个资源，提前提高优先级；`prefetch` 更像为之后的页面准备，优先级低。预加载写错资源类型或预加载太多，反而会抢走真正关键资源，所以每个 hint 都要有明确理由。

## 追问：defer 脚本的执行顺序可靠吗？

同一文档里的 defer 脚本会在解析完成后按文档顺序执行，通常适合有依赖关系的主脚本。动态插入的 script 不一定遵循这套顺序，不能混在一起想当然。

## 追问：preload 为什么可能造成警告？

浏览器发现预加载资源在规定时间内没被使用，说明优先级提示可能写错了。字体、图片、模块脚本还要配置正确的 as、跨域和 MIME，否则可能重复下载或根本没命中。

## 追问：模块脚本默认是什么行为？

module 脚本默认具有 defer 的解析行为，并且会按模块依赖加载。动态 import 可以把非首屏代码延后，但也要处理网络失败和版本更新后的 chunk 不存在。
