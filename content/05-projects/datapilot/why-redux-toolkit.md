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

## 30 秒回答

两个原因。一是技术栈匹配：这是 React 项目，Redux Toolkit 是 React 社区的主流方案，学它等于学生态主流；二是项目确有全局状态——登录会话、用户角色、菜单权限，需要可预测的单向数据流和持久化能力，RTK 加 redux-persist 的组合很成熟。反过来说，轻购是 Vue 3 项目，状态局部性很强，我并没有为了"显得专业"强行上 Pinia。状态方案跟着项目复杂度走，不是默认全家桶。

## 标准回答

我先判断状态放哪：组件内部状态留在组件里；父子传递用 props；真正跨页面、跨层共享的才进全局 store。城市视图里符合"全局"标准的其实只有认证相关状态——用户信息、Token、角色，以及少量应用级 UI 状态，菜单和业务数据大多跟着页面走。

选 RTK 的具体收益：createSlice 把 action 类型和 reducer 写在一起，样板代码比传统 Redux 少很多；内置 immer 风格的写法，"看起来直接改"实际产出不可变更新，和我推崇的数据习惯一致；Redux DevTools 能看到每次 action 前后的状态差异，调试权限问题时特别有用。

持久化用 redux-persist，并且只对 auth slice 做白名单持久化——刷新页面后登录态还在，其他状态不该持久化的绝不进 localStorage，这也是出于安全和数据新鲜度的考虑。

和 Vuex、Pinia 比，思想都是集中式 store 加模块化，差别在 API 风格和配套生态；React 团队生态里 RTK 的文档和社区答案最全，遇到问题好查。Context 我也考虑过，但 Context 频繁更新会让消费组件大面积重渲染，配合持久化和 devtools 的需求，store 方案更合适。

## 回答要点

- 先讲状态分级判断，证明选型是推导出来的不是跟风。
- persist 只白名单 auth slice，安全和边界意识。
- 主动对比 Context 的重渲染问题，堵住常见追问。

## 面试官可能追问

- 什么状态不该放进全局 store？
- redux-persist 的白名单怎么配置？
- Redux 的缺点是什么，什么场景你不推荐？

## 代码证据

- /Users/eli/Dev/datapilot-rebuild/src/store/index.ts
- /Users/eli/Dev/datapilot-rebuild/src/store/authSlice.ts
