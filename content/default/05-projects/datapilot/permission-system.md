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

## 核心回答

城市视图登录以后，会把用户和 Token 放进 Redux Toolkit，刷新时通过持久化恢复。页面根据用户角色过滤菜单，只显示可以进入的入口。

但用户也可能自己输入地址，所以路由外面还包了一层 RequireAuth，检查是否登录、角色能不能访问。没登录去登录页，没权限就回仪表盘。前端主要负责这些访问体验，真正的数据权限还需要后端接口再检查。

## 追问：多层菜单是怎么过滤的？

递归处理每个节点的子菜单，再看这个节点本身允不允许当前角色。如果节点本身不允许，而且也没有可访问的子菜单，就去掉；如果还有能访问的子菜单，就保留父级，避免把下面的合法入口一起删掉。

## 追问：刷新以后，登录状态怎么恢复？

redux-persist 会把白名单里的状态保存到浏览器存储，再在启动时恢复。目前白名单有 auth 和 app，分别保存用户和 Token，以及主题设置。恢复本地状态不代表 Token 永远有效，接口返回失效时还是要清理登录信息。

## 追问：隐藏菜单了，为什么还要路由检查？

菜单只是入口，用户能直接输入 URL，也能从旧收藏打开页面。所以 RequireAuth 会用当前路径和角色再判断一次，详情页和编辑页沿用所属列表页的权限，不能只靠菜单有没有显示。

## 追问：新增页面会默认禁止访问吗？

当前权限函数里，如果路径没有匹配到权限配置，会默认放行，前提是已经通过登录检查。这点需要在新增页面时特别检查。更稳妥的改法是让受保护页面必须有明确配置，未配置时不放行，避免漏写权限。

## 追问：用户修改浏览器里的角色怎么办？

前端存储可以被改，所以不能把它当最终的权限依据。即使用户改了角色让菜单出现，后端仍然需要根据经过验证的身份，检查接口和数据权限，不能直接相信前端传来的角色。

## 代码证据

- /Users/eli/Dev/datapilot-rebuild/src/store/index.ts
- /Users/eli/Dev/datapilot-rebuild/src/utils/permission.ts
- /Users/eli/Dev/datapilot-rebuild/src/components/RequireAuth.tsx
