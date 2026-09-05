---
id: engineering-git-distributed
title: Git 和 SVN 这类工具有什么区别？
aliases: [git是什么, 分布式版本控制, svn区别, 暂存区]
category: engineering
difficulty: 基础
priority: normal
projects: []
keywords: [git, svn, 分布式, 暂存区]
---

# Git 和 SVN 这类工具有什么区别？

## 核心回答

Git 是分布式版本控制：每个开发者的本地就是完整仓库，带着全部历史，提交、看 log、切分支离线都能干，远端仓库只是大家同步的节点。SVN 是集中式：完整历史只在中央服务器上，本地只是个工作副本，断网连提交都做不了，看历史也得连服务器。

日常感受最明显的是分支：Git 建分支就是挪一个指针，秒级，想开就开；SVN 建分支是整个目录拷贝，又重又慢。正因为分支便宜，大家才玩得起 feature 分支这种工作流。

本地结构上是三层：工作区里改代码，git add 进暂存区，git commit 进本地仓库。暂存区很实用，能让我把改动拆开提交，比如这次只提交功能代码，调试日志留到下一次。

## 展开回答

所以 Git 的日常操作其实大部分发生在本地，push 只是把本地历史同步到远端。pull 则等于 fetch 加 merge：先拉远端更新，再合到当前分支。

## 面试官可能追问

- 工作区、暂存区、仓库是什么关系？
- git pull 和 git fetch 有什么区别？
- 为什么说 Git 的分支是轻量的？
