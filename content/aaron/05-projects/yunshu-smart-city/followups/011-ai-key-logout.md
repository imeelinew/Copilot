---
id: yunshu-smart-city-followup-011-ai-key-logout
title: 追问：退出登录清掉了什么？另一个标签页和 AI Key 会一起清掉吗？
aliases: [能具体解释一下退出登录清掉了什么？另一个标签页和 AI Key 会一起清掉吗吗？, 从设计取舍看，退出登录清掉了什么？另一个标签页和 AI Key 会一起清掉吗？, 这个问题在项目中的实际边界是什么？]
category: yunshu-smart-city
difficulty: 进阶
priority: high
projects: [云枢智慧城市数据平台]
keywords: [登录鉴权, AI Key, 列表 Key, localStorage, Token, Redux]
---

# 追问：退出登录清掉了什么？另一个标签页和 AI Key 会一起清掉吗？

## 核心回答

当前退出只把 Redux 里的 Token 和用户信息设为空，redux-persist 随后会保存这个新状态。AI Key 使用另一个 localStorage 键保存，退出逻辑没有删除，而且也没有按用户 ID 隔离，所以同一浏览器换账号后仍可能读到原来的 Key。另一个标签页也不能保证立刻同步，因为当前代码没有监听 storage 事件，也没有用 BroadcastChannel 广播退出。后续如果完善，我会按产品规则清理或隔离 AI 配置，广播会话变化，并取消正在进行的请求。服务端是否同时撤销旧 Token 还需要服务端支持，前端清空本地状态不能证明复制出去的 Token 已失效。

## 回答要点

- 当前退出只把 Redux 里的 Token 和用户信息设为空，redux-persist 随后会保存这个新状态。
- AI Key 使用另一个 localStorage 键保存，退出逻辑没有删除，而且也没有按用户 ID 隔离，所以同一浏览器换账号后仍可能读到原来的 Key。
- 另一个标签页也不能保证立刻同步，因为当前代码没有监听 storage 事件，也没有用 BroadcastChannel 广播退出。
- 后续如果完善，我会按产品规则清理或隔离 AI 配置，广播会话变化，并取消正在进行的请求。

## 面试官可能追问

- 关于“退出登录清掉了什么？另一个标签页和 AI Key 会一起清掉吗”，当前方案具体防住了什么风险？
- 客户端被注入脚本或凭据过期时会发生什么？
- 服务端还必须补充哪些校验或权限控制？

## 代码证据

>
> - [authSlice.tsx，第 23～26 行](/Users/aaron/personal-hub/apps/project-1/src/store/slice/authSlice.tsx:23)：退出只清空 Token 和用户。
> - [Layout.tsx，第 161～164 行](/Users/aaron/personal-hub/apps/project-1/src/layout/Layout.tsx:161)：布局中的退出入口只派发 logout。
> - [AI.tsx，第 36～43 行](/Users/aaron/personal-hub/apps/project-1/src/pages/AI.tsx:36)：AI 配置使用独立 localStorage 键读取。
