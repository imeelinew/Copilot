---
id: engineering-git-rebase-merge
title: merge 和 rebase 有什么区别？
aliases: [rebase, merge区别, 变基, force push]
category: engineering
difficulty: 高频
priority: normal
projects: []
keywords: [merge, rebase, 变基, 冲突]
---

# merge 和 rebase 有什么区别？

## 核心回答

两个都是合代码，区别在合出来的历史长什么样。merge 是把两条分支合到一起，产生一个新的合并提交，分叉的样子原样保留，历史真实但看着乱。rebase 是把当前分支的提交一个个摘下来，复制到目标分支后面重新排队，历史变成一条直线，干净，但那些提交已经是新的副本了，hash 全变了。

hash 变了就等于改写了历史，所以我的原则是：自己的、还没推过的提交随便 rebase；已经推到共享分支的提交不动它，别人基于旧提交开发的会对不上。真要 rebase 已经推过的分支，推的时候得 force push，我会用 --force-with-lease，比裸 force 安全，远端有别人新推的提交时会拒绝，不会误覆盖。

## 展开回答

冲突处理两边也不一样：merge 是一次解完；rebase 是逐个提交重放，同一个冲突可能要解好几遍，麻烦，但换来的是每个提交都干净独立。解冲突本身没什么技巧，逐块读懂双方意图再合，拿不准就找写那段代码的人确认。

交互式 rebase 还能拿来整理本地历史，比如把几个碎提交合成一个再推出去。

## 面试官可能追问

- 什么时候用 rebase，什么时候用 merge？
- force push 有什么风险？
- 为什么 rebase 解冲突可能要解多次？
