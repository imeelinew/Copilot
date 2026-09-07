---
id: react-hydration-boundary
title: SSR hydration 不一致通常是怎么造成的？
aliases: [hydration mismatch, SSR 水合, React SSR]
category: react
difficulty: 进阶
priority: normal
projects: []
keywords: [SSR, hydration, hydration mismatch, React]
---

# SSR hydration 不一致通常是怎么造成的？

## 核心回答

服务端先生成 HTML，客户端第一次 render 必须产出同样的结构，React 才能把事件和状态接上。时间、随机数、浏览器宽度、用户存储和只在客户端存在的数据，如果直接参与首屏 render，就可能出现 mismatch。我的处理方式是让首屏使用稳定输入，客户端挂载后再读取浏览器信息；确实只在客户端存在的局部，才用明确的 suppress 或客户端边界，并记录它的影响。

## 追问：为什么不能到处 suppressHydrationWarning？

它只是压掉提示，不会自动修复结构或事件不一致。滥用后，真正的 SSR bug 变得很难发现。应该先找出非确定性来源，统一时间和随机数，保证服务端与客户端使用同一份初始数据，再把不可避免的动态区域限制在很小范围。

## 追问：客户端数据请求放哪里？

能在服务端拿到且适合首屏的数据，优先随 HTML 或框架数据协议下发，减少客户端重复请求；用户交互后的数据在客户端请求。无论放哪一侧，都要处理加载、失败和权限变化，不能因为 SSR 首屏有数据就假设后续永远成功。

