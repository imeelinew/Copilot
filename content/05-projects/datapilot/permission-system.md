---
id: datapilot-permission
title: 城市视图的权限系统是怎么实现的？
aliases: [前端权限, 菜单权限, 路由守卫, RBAC, 根据角色过滤菜单]
category: datapilot
difficulty: 项目
priority: high
projects: [城市视图]
keywords: [Redux Toolkit, redux-persist, 菜单过滤, RequireAuth]
---

# 城市视图的权限系统是怎么实现的？

## 30 秒回答

登录状态由 Redux Toolkit 管理并持久化。页面布局根据当前角色递归过滤菜单；路由层使用 RequireAuth 检查是否登录以及角色能否访问目标路径；请求层统一携带 Token 并处理失效。菜单隐藏和路由限制负责前端体验，真正的数据和操作权限仍应由后端接口校验。

## 标准回答

城市视图的前端权限分为登录状态、菜单展示和页面访问三层。

登录后把用户和 Token 放进 Redux Toolkit 的 auth slice，并通过 redux-persist 保持会话。菜单配置中的每个节点包含允许角色，布局组件根据当前角色递归过滤：父节点本身不允许但仍有可访问子节点时，需要保留父节点，避免把合法入口一起删除。

仅隐藏菜单是不够的，因为用户还可以手动输入 URL，所以受保护路由会检查登录状态和路径对应的角色列表，没有权限时跳转到允许访问的页面。Axios 请求层再统一携带 Token 并处理登录失效。

不过这些都不是最终安全边界，后端必须根据 Token 中的用户身份再次校验接口和数据权限。

## 回答要点

- 会话、菜单、路由、接口四个层次说清楚。
- 解释递归菜单保留父节点的细节。
- 强调后端才是安全边界。

## 面试官可能追问

- 刷新页面后 Redux 状态如何恢复？
- 为什么隐藏按钮不等于权限控制？
- 动态路由和静态路由过滤怎么选择？

## 代码证据

- /Users/eli/Dev/datapilot-rebuild/src/store/index.ts
- /Users/eli/Dev/datapilot-rebuild/src/utils/permission.ts
- /Users/eli/Dev/datapilot-rebuild/src/components/RequireAuth.tsx
