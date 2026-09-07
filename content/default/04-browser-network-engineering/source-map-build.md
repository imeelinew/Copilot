---
id: engineering-source-map-build
title: source map、构建缓存和可复现构建怎么做？
aliases: [source map, 可复现构建, 构建缓存]
category: engineering
difficulty: 进阶
priority: normal
projects: []
keywords: [source map, 构建, 缓存, lockfile, CI]
---

# source map、构建缓存和可复现构建怎么做？

## 核心回答

source map 让压缩后的堆栈回到源码，但生产 map 可能暴露源码和路径，我会把它上传到受限的错误平台，不把公开 URL 放到静态站点。可复现构建依赖锁文件、固定 Node 和包管理器版本、明确环境变量，CI 用干净环境构建并校验产物。缓存可以复用依赖和中间产物，但 cache key 必须包含 lockfile、构建配置和运行时版本，避免拿旧产物冒充新版本。

## 追问：构建缓存失效怎么排查？

先比较依赖锁文件、Node、插件版本和构建参数，再看缓存 key 是否真的变化；删除缓存做一次基线构建，比较产物 hash 和日志。缓存命中不能作为正确性的证据，发布前仍要在干净环境跑测试和 smoke。错误平台若无法映射堆栈，也要保留发布版本和 commit 关联。

## 追问：为什么不把完整 source map 放公网？

它可能还原业务代码、注释和内部目录，给攻击者更多信息。生产环境可以关闭公开 map，或只上传 hidden source map 到监控服务；调试权限和保留期限也要控制。发生线上问题时宁可通过受限平台还原堆栈，也不要用公开文件换方便。

