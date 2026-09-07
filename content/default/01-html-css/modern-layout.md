---
id: css-modern-layout
title: Flex 和 Grid 怎么根据场景选择？
aliases: [Flex Grid 选择, CSS 两维布局, 响应式卡片布局]
category: html-css
difficulty: 进阶
priority: high
projects: []
keywords: [Flex, Grid, minmax, auto-fit, 布局]
---

# Flex 和 Grid 怎么根据场景选择？

## 核心回答

Flex 更像是在一条主轴上排东西，适合导航、工具栏、表单行和一维对齐；Grid 同时管理行和列，适合卡片墙、仪表盘这类二维布局。实际项目里两者经常嵌套，并不是选了 Grid 就不能用 Flex。

响应式卡片可以用 `repeat(auto-fit, minmax(...))`，让浏览器根据容器宽度决定列数。尺寸要由内容和最小可用宽度决定，不能只按几个常见手机型号写死。

## 追问：Grid 的 auto-fit 和 auto-fill 有什么区别？

容器放不满时，auto-fill 会保留空的轨道，auto-fit 会把空轨道折叠，现有卡片可以拉宽。大多数自适应卡片场景用 auto-fit 更符合直觉，但要看是否需要保留网格轨道。

## 追问：Flex 子项为什么会撑破容器？

子项默认的最小尺寸可能来自内容本身，长文本或很长的 URL 不愿意缩小。横向布局里给需要收缩的子项 `min-width: 0`，再配合 overflow 或换行规则，通常就能解决。

## 追问：什么时候不该继续加 CSS？

如果布局已经靠很多负 margin、绝对定位和特殊断点勉强对齐，我会停下来重看 DOM 结构和布局模型。先把父子关系和尺寸约束理清，比继续堆选择器更可靠。
