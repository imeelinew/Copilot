---
id: engineering-git-workflow
title: Git 是怎么用的？说说分支和提交规范
aliases: [git常用命令, 分支管理, 提交规范, reset和revert区别]
category: engineering
difficulty: 高频
priority: high
projects: [轻购, 城市视图, 智服工单]
keywords: [分支, commit, rebase, revert, 冲突]
---

# Git 是怎么用的？说说分支和提交规范

## 30 秒回答

我保持团队化的 Git 习惯：功能在 feature 分支上开发，小步提交，完成后合并回主分支；提交信息用类型前缀区分 feat、fix、refactor、docs，让历史可读。常用命令里我最有心得的是回退：对外分支用 revert 生成反向提交，安全可追溯；自己的本地分支用 reset，分得清 soft、mixed、hard 三种模式的差别。我的 GitHub 上近千次提交基本都是这样小步迭代出来的。

## 标准回答

分支策略上，个人项目我用简化的主干开发：每个功能或修复开独立分支，完成并自测后合并回 main，保证 main 随时可部署；功能特别小的时候也会直接在 main 上小步提交。如果进团队，我预期是 develop 加 feature 分支的工作流，或现在流行的短生命周期分支直接 PR 进 main，这个我上手很快，关键是原则一致：分支短命、频繁集成、main 可发布。

提交规范上，我按 Conventional Commits 的风格写：类型前缀加简短描述，比如 feat: 搜索联想增加请求取消、fix: 购物车全选状态联动错误。小步提交的好处是出问题时能精确回滚到某个改动，review diff 也小。

命令层面，日常就是 status、diff、log 看状态，add、commit、push 提交，switch 建切分支；合并时用 merge 还是 rebase 我的原则是——本地未推送的提交可以 rebase 保持线性历史，已推送的共享分支用 merge，不改写别人的历史。

回退是重点：revert 生成一条反向提交，历史保留，适合已推送的公共分支；reset 是移动分支指针，soft 保留改动在暂存区、mixed 保留在工作区、hard 直接丢弃，我只在自己未推送的提交上用。冲突解决没有捷径，逐块读双方意图，拿不准就找提交人确认，不强行合并。

## 回答要点

- 分支、提交、回退三段式回答，结构清晰。
- rebase 与 merge 的边界（是否已共享）是成熟度标志。
- 用近千次提交的真实记录佐证习惯。

## 面试官可能追问

- merge 和 rebase 怎么选？
- reset 三种模式的区别？
- 提交错了但已经 push 怎么办？
- 你们的代码审查流程是怎样的？
