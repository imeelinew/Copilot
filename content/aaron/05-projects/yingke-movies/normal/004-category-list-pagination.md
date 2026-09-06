---
id: yingke-movies-normal-004-category-list-pagination
title: 分类列表和触底分页
aliases: [请介绍一下项目中的分类列表和触底分页。, 你在分类列表和触底分页方面具体做了什么？, 这部分的设计思路和边界是什么？]
category: yingke-movies
difficulty: 进阶
priority: high
projects: [映刻影视]
keywords: [分页, 首页数据, 页面导航, onShow, onLoad, 加载状态]
---

# 分类列表和触底分页

## 核心回答

用户在首页点击某个分类的“更多”后，会进入对应分类列表，并且可以继续向下滑动查看更多影视。首页跳转时会把分类 ID 放进路由参数，列表页在 `onLoad` 中取出这个 ID，再根据它选择国产剧、综艺或美剧对应的请求函数。页面用 `startNum` 表示起始位置，用 `countNum` 表示每次请求 8 条；接口返回后，通过 `concat` 把新数据追加到原列表，而不是覆盖已经展示的内容，同时记录分类标题和总数。触底时再把起始位置增加 8，继续请求下一批；达到总数后显示“已经到底了”。这种设计适合接口本身提供 `start/count` 的偏移分页，也能保持用户已经浏览过的内容。它向前接首页分类 ID，向后接影片详情跳转。不过当前初始化放在 `onShow`，从详情返回时可能再次追加数据；快速连续触底也没有请求锁，而且 loading 没有等待请求完成，这些都属于当前分页实现的限制。

## 回答要点

- 用户在首页点击某个分类的“更多”后，会进入对应分类列表，并且可以继续向下滑动查看更多影视。
- 首页跳转时会把分类 ID 放进路由参数，列表页在 onLoad 中取出这个 ID，再根据它选择国产剧、综艺或美剧对应的请求函数。
- 页面用 startNum 表示起始位置，用 countNum 表示每次请求 8 条；
- 接口返回后，通过 concat 把新数据追加到原列表，而不是覆盖已经展示的内容，同时记录分类标题和总数。

## 面试官可能追问

- 关于“分类列表和触底分页”，为什么选择当前异步处理方式？
- 请求失败、重复触发或返回乱序时如何保证状态正确？
- 你会怎样测试慢请求和部分失败场景？

## 代码证据

>
> - [components/listContent.vue 第 28～38 行](</Users/aaron/CodingPractice/14_uniapp/project2/components/listContent.vue:28>)：首页携带分类 ID 跳转列表页。
> - [pages/list/index.vue 第 38～48 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/list/index.vue:38>)：定义分类 ID、列表、分页游标、总数和加载状态。
> - [pages/list/index.vue 第 53～74 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/list/index.vue:53>)：根据分类 ID 选择接口，并追加分页结果。
> - [pages/list/index.vue 第 81～102 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/list/index.vue:81>)：接收路由参数、在 `onShow` 初始化并处理触底加载。
> - [api/list.js 第 3～26 行](</Users/aaron/CodingPractice/14_uniapp/project2/api/list.js:3>)：三个分类接口把 `start`、`count` 写入请求地址。
