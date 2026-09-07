---
id: vue-async-component
title: Vue 的异步组件和 keep-alive 怎么取舍？
aliases: [defineAsyncComponent, Vue 页面缓存, 异步组件]
category: vue
difficulty: 进阶
priority: normal
projects: []
keywords: [异步组件, keep-alive, defineAsyncComponent, 缓存]
---

# Vue 的异步组件和 keep-alive 怎么取舍？

## 核心回答

异步组件是需要时才加载组件代码，适合不一定会访问的页面或很重的编辑器；keep-alive 是缓存已经创建过的组件实例，让用户切回来时保留页面状态。一个解决代码下载，一个解决实例生命周期，目的不同，可以一起使用。

缓存也会占内存，数据过期、用户切换账号或权限变化时可能需要失效。页面缓存前要确认保留筛选条件是好事，还是用户更希望每次进入都重新拉最新数据。

## 追问：keep-alive 下 onUnmounted 会执行吗？

组件被缓存时通常不会真正卸载，而是触发 activated / deactivated。需要暂停轮询、地图监听或视频播放时，应该在 deactivated 处理；永久释放的资源仍在真正卸载时清理。

## 追问：异步组件失败怎么办？

可以配置 loadingComponent、errorComponent 和超时，路由层还可以提供刷新或返回入口。发布后旧 chunk 不存在时，要和部署的静态资源保留策略一起考虑。

## 追问：缓存列表页会不会拿到旧数据？

会，所以 activated 时要按业务决定检查时间戳、重新请求或清空缓存。缓存的是组件状态，不等于服务端数据永远新鲜。
