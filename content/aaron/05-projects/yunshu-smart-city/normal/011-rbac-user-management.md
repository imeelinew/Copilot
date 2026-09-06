---
id: yunshu-smart-city-normal-011-rbac-user-management
title: 用户、角色和个人中心
aliases: [请介绍一下项目中的用户、角色和个人中心。, 你在用户、角色和个人中心方面具体做了什么？, 这部分的设计思路和边界是什么？]
category: yunshu-smart-city
difficulty: 基础
priority: normal
projects: [云枢智慧城市数据平台]
keywords: [RBAC, 登录鉴权, 密码哈希, 错误分层]
---

# 用户、角色和个人中心

## 核心回答

系统管理模块让管理员查询、新建和编辑用户，分配角色，启用或禁用账号，重置密码、删除用户和上传头像；对于当前账号、root 和超级管理员，前端会禁用危险操作。角色页面可以新建或编辑角色、查看角色人数并配置权限树。普通用户在个人中心可以查看资料、修改密码和退出登录。前端在表单提交前做必填、文件类型和大小等基础校验，接口返回后还要判断业务码，再刷新列表。这样能把常用账号管理流程放到一个后台里，但前端的保护按钮只负责减少误操作，服务端仍要检查操作者权限、关联数据和受保护账号。密码怎样哈希、随机密码怎样生成，当前前端代码都无法证明。

## 回答要点

- 系统管理模块让管理员查询、新建和编辑用户，分配角色，启用或禁用账号，重置密码、删除用户和上传头像；
- 对于当前账号、root 和超级管理员，前端会禁用危险操作。
- 角色页面可以新建或编辑角色、查看角色人数并配置权限树。
- 普通用户在个人中心可以查看资料、修改密码和退出登录。

## 面试官可能追问

- 关于“用户、角色和个人中心”，你为什么选择当前方案？
- “用户、角色和个人中心”在异常数据或并发场景下怎么处理？
- 如果改用替代方案，主要成本和收益分别是什么？

## 代码证据

>
> - [Users.tsx，第 75～113 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Users.tsx:75)：受保护账号判断、用户列表和角色列表加载。
> - [Users.tsx，第 141～180 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Users.tsx:141)：新建、编辑、角色分配和状态修改流程。
> - [Users.tsx，第 182～270 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Users.tsx:182)：启停、重置密码和删除确认。
> - [Users.tsx，第 273～300 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Users.tsx:273)：头像格式、大小检查和上传。
> - [Roles.tsx，第 56～92 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Roles.tsx:56)：角色、角色人数和权限树加载。
> - [Roles.tsx，第 112～200 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Roles.tsx:112)：角色保存、权限保存和角色删除。
> - [Profile.tsx，第 81～124 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Profile.tsx:81)：修改密码和退出登录。
> - [users.ts，第 33～79 行](/Users/aaron/personal-hub/apps/project-1/src/api/users.ts:33)：用户、状态、密码、角色和头像接口。
