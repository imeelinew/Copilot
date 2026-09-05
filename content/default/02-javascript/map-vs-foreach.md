---
id: js-map-vs-foreach
title: map 和 forEach 有什么区别？
aliases: [map, forEach, 数组遍历, 遍历区别]
category: javascript
difficulty: 基础
priority: normal
projects: []
keywords: [map, forEach, 返回值, 遍历, break]
---

# map 和 forEach 有什么区别？

## 核心回答

两个都是遍历数组，区别一句话讲完：map 有返回值，对每一项做处理之后返回一个等长的新数组，不碰原数组；forEach 没有返回值，返回 undefined，单纯把每一项执行一遍，靠副作用干活。

所以选择很直接：要拿到处理结果就用 map，比如把接口返回的列表加工一遍再拿去渲染；只是对每项做点操作、不关心结果，比如打日志、上报埋点，就用 forEach。两个的回调都支持 item、index、原数组三个参数。

## 展开回答

这俩有几个共同的限制：不能用 break 跳出，回调里 return 只是提前结束当前这一项，循环照样走完；想中途退出得换 for...of，或者用 some、every 这种本身就支持短路的。另外 map 因为返回新数组，经常拿来链式调用，map 完接 filter 再接 reduce，写数据处理很顺。

还有一个小区别：forEach 对稀疏数组的空位不执行回调，map 也跳过空位但返回的数组里会保留空位，一般业务里碰不到，知道就行。

## 面试官可能追问

- forEach 里能修改原数组吗？
- 怎么提前终止一个遍历？
- map 的返回值不接收，说明了什么问题？
