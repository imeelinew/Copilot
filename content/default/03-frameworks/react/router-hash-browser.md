---
id: react-router-hash-browser
title: HashRouter 和 BrowserRouter 有什么区别？
aliases: [hashrouter, browserrouter, react router路由模式]
category: react
difficulty: 高频
priority: normal
projects: []
keywords: [hash路由, history路由, react-router, 404]
---

# HashRouter 和 BrowserRouter 有什么区别？

## 核心回答

最直观的区别在 URL。HashRouter 的地址带 #，比如 example.com/#/list，路由变化只改 # 后面的部分，这部分不会发给服务器，监听的是 hashchange 事件。BrowserRouter 没有井号，路径是真实路径，靠 history API 的 pushState 和 popstate 实现跳转。

实际影响在刷新上。hash 模式刷新时，浏览器请求的还是 # 前面那个地址，服务器永远返回同一个页面，所以天然不会 404，扔到任意静态服务器上就能跑。browser 模式刷新时会把整个路径发给服务器，服务器上没有这个路径的资源就直接 404 了，所以服务端要配兜底，把所有路由都指向 index.html，nginx 就是 try_files 那一句。

另外要做服务端渲染、对 SEO 有要求，一般用 BrowserRouter，因为服务器需要拿到完整路径才知道该渲染哪一页。

## 展开回答

hash 模式也不是没代价：URL 不好看，而且 # 在原生语义里是页内锚点，锚点定位会跟路由打架。面试说区别的时候，最好主动把"刷新 404 怎么解决"带上，这个才是这道题真正的考点。

## 面试官可能追问

- BrowserRouter 刷新 404 怎么解决？
- 两种模式的底层原理分别监听什么？
- 你项目里用的哪种，为什么？
