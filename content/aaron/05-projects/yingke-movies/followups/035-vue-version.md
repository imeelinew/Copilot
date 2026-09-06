---
id: yingke-movies-followup-035-vue-version
title: 追问：`main.js` 同时有 Vue 2 和 Vue 3 代码，项目到底用哪个？
aliases: [能具体解释一下`main.js` 同时有 Vue 2 和 Vue 3 代码，项目到底用哪个吗？, 从设计取舍看，`main.js` 同时有 Vue 2 和 Vue 3 代码，项目到底用哪个？, 这个问题在项目中的实际边界是什么？]
category: yingke-movies
difficulty: 基础
priority: normal
projects: [映刻影视]
keywords: [Vue 3, Vue 2, 验证方法, uni-app]
---

# 追问：`main.js` 同时有 Vue 2 和 Vue 3 代码，项目到底用哪个？

## 核心回答

这是 uni-app 模板通过条件编译兼容 Vue 2 和 Vue 3 的写法，不代表两个版本会同时运行。项目的 `manifest.json` 明确把 `vueVersion` 配成了 2，所以当前构建应走 Vue 2 分支：导入 Vue、创建实例并挂载。Vue 3 的 `createSSRApp` 分支只是模板保留代码。这里可以根据配置判断目标版本，但本次没有实际构建，所以不把它说成已运行验证结果。

## 回答要点

- 这是 uni-app 模板通过条件编译兼容 Vue 2 和 Vue 3 的写法，不代表两个版本会同时运行。
- 项目的 manifest.json 明确把 vueVersion 配成了 2，所以当前构建应走 Vue 2 分支：导入 Vue、创建实例并挂载。
- Vue 3 的 createSSRApp 分支只是模板保留代码。
- 这里可以根据配置判断目标版本，但本次没有实际构建，所以不把它说成已运行验证结果。

## 面试官可能追问

- 关于“`main.js` 同时有 Vue 2 和 Vue 3 代码，项目到底用哪个”，当前方案解决了哪类用户体验问题？
- 模型超时、返回空内容或数据流被截断时怎么处理？
- 这项 AI 能力的实现边界和替代方案是什么？

## 代码证据

>
> - [main.js 第 3～21 行](</Users/aaron/CodingPractice/14_uniapp/project2/main.js:3>)：使用条件编译分别保留 Vue 2、Vue 3 启动分支。
> - [manifest.json 第 68～71 行](</Users/aaron/CodingPractice/14_uniapp/project2/manifest.json:68>)：配置 `vueVersion` 为 2。
