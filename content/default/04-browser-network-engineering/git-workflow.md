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

## 核心回答

我的习惯和团队流程基本一致：功能开 feature 分支，小步提交，提交信息带类型前缀——feat、fix、refactor 这种，写清楚这条提交干了什么，然后合回主分支，保证主分支随时是能跑的状态。

回退这块我分得比较清：已经推出去的提交用 revert，它会生成一条反向提交，历史保留，安全；自己本地没推的才用 reset，soft、mixed、hard 三种模式，对应改动留在暂存区、留在工作区、还是直接扔掉。

## 展开回答

merge 和 rebase 的边界我的原则是：本地没推的提交可以 rebase，保持历史线性；已经推到共享分支的用 merge，不去改写别人的历史。冲突解决没有技巧，逐块读双方的意图，拿不准就找写那段代码的人确认，不硬合。

个人项目我也是这么走的，所以 GitHub 上近千次提交就是真实的小步迭代，不是攒一波一次性 push。这样有个好处：出了问题能精确回滚到某一次改动。

## 面试官可能追问

- merge 和 rebase 怎么选？
- 提交错了但已经 push 怎么办？
- stash 什么场景用？
