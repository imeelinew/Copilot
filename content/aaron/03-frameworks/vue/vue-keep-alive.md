---
id: vue-keep-alive
title: keep-alive 是什么？怎么工作的？
aliases: [keep-alive, 组件缓存, activated, include]
category: vue
difficulty: 高频
priority: high
projects: [智服工单]
keywords: [keep-alive, include, exclude, activated, LRU]
---

# keep-alive 是什么？怎么工作的？

## 核心回答

keep-alive 是内置组件，包住的组件在切换时不会被销毁，而是缓存在内存里，下次切回来直接复用，状态、表单内容、滚动位置都还在，省掉重新渲染和重新请求。典型场景就是列表页跳详情、再返回列表，筛选条件和页码都不丢。

三个常用参数：include 和 exclude 按组件 name 指定缓存谁、排除谁；max 限制缓存数量。被缓存的组件销毁钩子不会执行，激活和离开走 activated、deactivated，所以定时器这类清理逻辑要放进这两个钩子，不然缓存期间还在跑。

## 展开回答

缓存策略上 Vue3 用的是 LRU，超出 max 就淘汰最久没访问的。排查"配了缓存但没生效"一般先查 name：include 按组件 name 匹配，script setup 组件默认从文件名推断 name，想精确控制就用 defineOptions 显式声明。

## 面试官可能追问

- activated 和 mounted 是什么关系，谁先执行？
- 缓存的组件怎么做到返回时不发请求、进详情再回来才刷新？
- 缓存太多组件会有什么问题？
