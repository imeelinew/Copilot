---
id: browser-event-flow
title: 事件捕获、冒泡和事件委托是怎么回事？
aliases: [事件冒泡, 事件委托, 事件流, 事件代理]
category: engineering
difficulty: 高频
priority: high
projects: []
keywords: [事件流, 捕获, 冒泡, 事件委托]
---

# 事件捕获、冒泡和事件委托是怎么回事？

## 核心回答

一个事件被触发，其实经历三个阶段：先从 window 沿着 DOM 树往下找到目标元素，这是捕获；到目标元素是目标阶段；再原路一层层冒上去回到 window，这是冒泡。addEventListener 第三个参数就是选阶段，默认 false 挂在冒泡阶段，传 true 才在捕获阶段触发。

事件委托说白了就是利用冒泡：不给一百个子元素各挂一个监听，只在共同的父元素上挂一个，点谁看 e.target 是谁，再做分发。好处一是省内存，二是后面动态加进来的子元素不用重新绑，天然生效。列表、表格这种子项多的场景我都会这么写。

配套的两个 API 要分清：不想让事件冒上去用 e.stopPropagation()，拦掉链接跳转、表单提交这类默认行为用 e.preventDefault()，俩管的事不一样。

## 展开回答

两个容易追问的细节。一是并非所有事件都冒泡，blur、focus、load 就不冒，要做委托可以用会冒泡的 focusin、focusout 替代，或者挂到捕获阶段。二是委托时 e.target 是真正点中的子元素，e.currentTarget 是挂监听的父元素，拿子元素的数据用 dataset 或者 closest 往上找。

还有一个使用上的坑：事件委托本身就靠冒泡工作，如果子元素自己的监听里随手 stopPropagation，父级的委托监听就收不到了，混用前要想清楚。

## 面试官可能追问

- stopPropagation 和 preventDefault 的区别？
- 不冒泡的事件怎么做委托？
- e.target 和 e.currentTarget 有什么区别？
