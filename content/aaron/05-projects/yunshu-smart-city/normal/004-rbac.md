---
id: yunshu-smart-city-normal-004-rbac
title: 基于角色的页面权限控制
aliases: [请介绍一下项目中的基于角色的页面权限控制。, 你在基于角色的页面权限控制方面具体做了什么？, 这部分的设计思路和边界是什么？]
category: yunshu-smart-city
difficulty: 深入
priority: high
projects: [云枢智慧城市数据平台]
keywords: [RBAC, 登录鉴权, 首页数据, 地址管理, 页面导航, 高德地图]
---

# 基于角色的页面权限控制

## 核心回答

不同角色登录后看到的菜单和能进入的页面不同。例如普通用户能看首页、地图、AI 和个人中心，管理员还能进入数据管理和系统管理。前端先按角色过滤一级菜单，再根据权限字符串把无权访问的叶子菜单设为禁用；如果用户直接在地址栏输入没有权限的路径，布局层还会把他跳转到 403 页面。角色管理页可以从接口读取权限树，并提交角色和权限 ID 的关系。采用 RBAC，也就是“角色关联一组权限，用户再关联角色”，是因为权限可以按岗位复用，不需要给每个用户逐项配置。不过当前页面访问判断仍来自前端写死的角色权限表，并没有直接消费角色管理接口返回的权限树，所以两边可能不一致；真正的数据权限还必须由服务端接口再次校验。

## 回答要点

- 不同角色登录后看到的菜单和能进入的页面不同。
- 例如普通用户能看首页、地图、AI 和个人中心，管理员还能进入数据管理和系统管理。
- 前端先按角色过滤一级菜单，再根据权限字符串把无权访问的叶子菜单设为禁用；
- 如果用户直接在地址栏输入没有权限的路径，布局层还会把他跳转到 403 页面。

## 面试官可能追问

- 关于“基于角色的页面权限控制”，当前方案具体防住了什么风险？
- 客户端被注入脚本或凭据过期时会发生什么？
- 服务端还必须补充哪些校验或权限控制？

## 代码证据

>
> - [useAuthority.tsx，第 5～45 行](/Users/aaron/personal-hub/apps/project-1/src/hooks/useAuthority.tsx:5)：前端角色到权限字符串的静态映射及权限判断。
> - [Layout.tsx，第 25～131 行](/Users/aaron/personal-hub/apps/project-1/src/layout/Layout.tsx:25)：菜单角色范围、权限名推导、菜单过滤和禁用处理。
> - [Layout.tsx，第 145～151 行](/Users/aaron/personal-hub/apps/project-1/src/layout/Layout.tsx:145)：根据当前角色生成菜单。
> - [Layout.tsx，第 200～219 行](/Users/aaron/personal-hub/apps/project-1/src/layout/Layout.tsx:200)：直接访问路径时的页面权限检查和 403 跳转。
> - [Roles.tsx，第 136～175 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Roles.tsx:136)：读取角色详情、回显权限并提交权限 ID。
> - [roles.ts，第 46～76 行](/Users/aaron/personal-hub/apps/project-1/src/api/roles.ts:46)：角色、权限树和角色权限关系接口。
