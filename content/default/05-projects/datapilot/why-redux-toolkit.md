---
id: datapilot-why-redux
title: 城市视图为什么选 Redux Toolkit 而不是其他状态方案？
aliases: [为什么用redux, redux和pinia区别, 状态管理选型, redux toolkit优势]
category: datapilot
difficulty: 项目
priority: normal
projects: [城市视图]
keywords: [Redux Toolkit, redux-persist, 状态选型, Context]
---

# 城市视图为什么选 Redux Toolkit 而不是其他状态方案？

## 核心回答

城市视图里，登录用户、角色和主题会被多个页面用到，放在全局状态里比较方便。比如登录以后，菜单和路由都要读取同一份用户信息，退出时也要一起清掉。

我用了 Redux Toolkit，用 createSlice 把这些更新集中管理，再配合 redux-persist 做刷新恢复。图表配置、加载状态这些只在当前页面使用的数据，还是放在组件里，不会全部塞进 store。

## 追问：具体持久化了什么？

现在白名单是 auth 和 app。auth 里是 Token 和用户信息，app 里主要是主题。接口请求的 loading、图表预览数据这些没有一起保存，避免刷新后恢复出一份过期的临时状态。

## 追问：为什么不直接用 Context？

Context 也能做，尤其状态少的时候很合适。这里我希望把更新动作、状态读取和持久化放在一起管理，Redux Toolkit 比较方便。Context 的值变化会通知消费它的组件，不过并不是用了 Context 整个页面就一定都会重渲染。

## 追问：为什么 reducer 里能直接修改状态？

createSlice 里面用了 Immer，我写的时候是在修改它提供的 draft，最后会生成新的状态。所以看起来像直接赋值，实际仍然按不可变更新来处理。我不需要自己一层层展开对象。

## 追问：哪些状态不应该放进去？

像一个弹窗开没开、当前表单填到哪、某张图表是不是加载中，只要没有跨页面共享的需要，我就放在组件里。判断标准主要是谁要用、要保存多久，不能因为有 store 就全放进去。

## 追问：轻购为什么没有用 Pinia？

轻购目前购物车数据放在页面，通过接口加载和修改，Token 有单独的读写工具，下单参数用 sessionStorage。现在这样能满足功能，就没有再加 Pinia。以后多个页面要一起同步购物车数量、用户资料时，再集中管理会更有价值。

## 代码证据

- /Users/eli/Dev/datapilot-rebuild/src/store/index.ts
- /Users/eli/Dev/datapilot-rebuild/src/store/authSlice.ts
