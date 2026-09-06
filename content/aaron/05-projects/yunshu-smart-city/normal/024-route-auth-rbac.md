---
id: yunshu-smart-city-normal-024-route-auth-rbac
title: 前端路由守卫和 RBAC 能防住越权吗？
aliases: [能具体解释一下前端路由守卫和 RBAC 能防住越权吗吗？, 从设计取舍看，前端路由守卫和 RBAC 能防住越权吗？, 这个问题在项目中的实际边界是什么？]
category: yunshu-smart-city
difficulty: 深入
priority: normal
projects: [云枢智慧城市数据平台]
keywords: [登录鉴权, RBAC, Token]
---

# 前端路由守卫和 RBAC 能防住越权吗？

## 核心回答

防不住完整越权。它可以隐藏或禁用菜单，也能阻止普通用户从界面进入页面，主要解决交互和误操作；用户仍可以修改浏览器状态或直接调用接口。因此服务端必须按 Token 里的真实身份再次校验接口权限和数据范围。当前前端还有静态权限表和动态角色配置不一致的风险。

## 回答要点

- 它可以隐藏或禁用菜单，也能阻止普通用户从界面进入页面，主要解决交互和误操作；
- 用户仍可以修改浏览器状态或直接调用接口。
- 因此服务端必须按 Token 里的真实身份再次校验接口权限和数据范围。
- 当前前端还有静态权限表和动态角色配置不一致的风险。

## 面试官可能追问

- 关于“前端路由守卫和 RBAC 能防住越权吗”，你为什么选择当前方案？
- “前端路由守卫和 RBAC 能防住越权吗”在异常数据或并发场景下怎么处理？
- 如果改用替代方案，主要成本和收益分别是什么？

## 代码证据

>
> - [useAuthority.tsx，第 5～40 行](/Users/aaron/personal-hub/apps/project-1/src/hooks/useAuthority.tsx:5)：前端静态角色权限判断。
> - [Layout.tsx，第 200～219 行](/Users/aaron/personal-hub/apps/project-1/src/layout/Layout.tsx:200)：前端路径级 403 跳转。
> - [roles.ts，第 67～72 行](/Users/aaron/personal-hub/apps/project-1/src/api/roles.ts:67)：另一套由接口维护的权限树和角色权限关系。
