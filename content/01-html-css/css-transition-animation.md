---
id: css-transition-animation
title: transition 和 animation 的区别？
aliases: [过渡和动画, keyframes, css动画]
category: html-css
difficulty: 高频
priority: normal
projects: []
keywords: [transition, animation, keyframes, 过渡]
---

# transition 和 animation 的区别？

## 核心回答

transition 是过渡，得有状态变化来触发，比如 hover 或者 JS 切了个类名，它只负责定义两个状态之间怎么过渡：哪个属性、多长时间、什么节奏。animation 配合 @keyframes 用，关键帧里可以定义很多帧，不需要状态变化就能自动播放，还能循环、延迟、暂停。

选型上我按复杂度分：按钮悬浮、弹窗淡入这种单次的状态变化用 transition；加载动画、轮播这种多帧或要循环的用 animation。

## 展开回答

细节上，transition 触发它的状态改回去会反向过渡回来；animation 有 fill-mode 控制动画前后停在哪个帧，animation-play-state 可以暂停，监听 animationend 能拿到动画结束的时机做后续处理。性能上大面积动画优先用 transform 和 opacity，走合成不触发重排，比改 left、top 顺滑得多。

## 面试官可能追问

- 怎么让 animation 停在最后一帧？
- JS 怎么知道动画结束了？
- 为什么 transform 动画比 left/top 性能好？
