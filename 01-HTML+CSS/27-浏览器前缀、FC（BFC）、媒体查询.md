# 浏览器前缀、FC（BFC）、媒体查询

## 一、浏览器前缀

浏览器前缀，官方术语称为 vendor-specific extensions（供应商特定扩展），

常见的浏览器前缀（也称私有浏览器前缀），与对应的浏览器有：

| 浏览器前缀  | 浏览器              |
| ----------- | ------------------- |
| -o-、-xv-   | Opera 等等          |
| -ms-、-mso- | IE 等等             |
| -moz-       | Firefox 等等        |
| -webkit-    | Safari、Chrome 等等 |

浏览器前缀，用于设置不稳定的 CSS 新属性：

- CSS 新属性一开始并没有成为标准，浏览器为了防止新属性后续会修改属性名，给新的属性添加了浏览器前缀；
- 如果新属性修改了属性名，原来带有浏览器前缀的属性，也会被解析为新属性。

浏览器前缀不需要手动添加，webpack 在打包时，会根据 `.browserslistrc` 文件中指定需要适配的浏览器，自动添加 css 的浏览器前缀。

## 二、Formatting Context

Formatting Context 简称 FC：

- 元素在标准流里面都是属于一个 FC 的；
- 块级元素的布局属于级格式化上下文（Block Formatting Context）（BFC）。
- 行内级元素的布局属于行内级格式化上下文（Inline Formatting Context）（IFC）。

### 1.BFC 被创建的情况

根元素（\<html\>）。

浮动元素（元素的 `float` 不是 `none`）。

绝对定位元素（元素的 `position` 为 `absolute` 或 `fixed`）。

行内块元素（元素的 `display` 为 `inline-block`）。

表格单元格（元素的 `display` 为 `table-cell`，HTML 表格单元格默认为该值）。

表格标题（元素的 `display` 为 `table-caption`，HTML 表格标题默认为该值）。

匿名表格单元格元素（元素的 `display` 为 `table`、`table-row`、 `table-row-group`、`table-header-group`、`table-footer-group`（分别是 HTML 元素table、 row、tbody、thead、tfoot 的默认属性）或 `inline-table`）

块元素，`overflow` 计算值（Computed）不为 `visible` 的。

弹性元素（`display` 为 `flex` 或 `inline-flex` 元素的直接子元素）。

网格元素（`display` 为 `grid` 或 `inline-grid` 元素的直接子元素）

`display` 值为 `flow-root` 的元素

### 2.BFC 有什么用

在 BFC 中，盒子会在垂直方向上一个挨着一个的排布；

垂直方向的间距由 margin 属性决定；

在 BFC 中，每个元素的左边缘是紧挨着包含块的左边缘的。

在同一个 BFC 中，相邻两个 box 之间的 margin 会折叠（collapse）；

BFC 解决浮动元素高度塌陷（BFC 不能解决绝对定位元素的高度塌陷问题）。

#### 1.BFC 解决 margin 折叠问题

将 2 个 box 放在不同的 BFC 中。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <style>
      .container {
        overflow: auto;
      }
      .box1 {
        height: 200px;
        width: 400px;
        margin-bottom: 30px;
        background-color: orange;
      }
      .box2 {
        height: 150px;
        margin-top: 50px;
        background-color: purple;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <!-- box1 位于 .content 元素形成的 BFC 中 -->
      <div class="box1"></div>
    </div>

    <!-- box2 位于 html 元素形成的 BFC 中 -->
    <div class="box2"></div>
  </body>
</html>
```

#### 2.BFC 解决浮动元素高度塌陷

需要 2 个条件：

- 浮动元素的父元素触发 BFC 形成独立的块级格式化上下文（Block Formatting Context）；
- 浮动元素的父元素的高度是 auto 的；

使用 BFC 解决浮动高度塌陷的问题。

01-HTML+CSS/demo-project/16-BFC解决浮动元素高度塌陷.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>16-BFC解决浮动元素高度塌陷</title>
    <style>
      .container {
        background-color: orange;
        position: relative;
        /* 利用 BFC 解决浮动高度塌陷问题 */
        overflow: auto;
      }
      .item {
        float: left;
        width: 400px;
        height: 200px;
        box-sizing: border-box;
        border: 1px solid #000;
        background-color: #f00;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
    </div>
  </body>
</html>
```

BFC 不能解决绝对定位元素的高度塌陷问题。

产生 BFC 的元素，高度是 auto 的情况下，怎么计算高度。

- 如果只有行内级元素，是行高的顶部和底部的距离；
- 如果有块级元素，是由最顶层块盒子上边缘和最底层块盒子的下边缘之间的距离。
- 如果有绝对定位元素，将被忽略；（解释了为什么 BFC 不能解决绝对定位元素的高度塌陷问题）。
- 如果有浮动元素，那么会增加高度以包括这些浮动元素的下边缘。

## 三、媒体查询

媒体查询，是一种提供给开发者的接口，用于针对不同设备需求进行定制化开发。

可以根据设备的类型（比如：屏幕设备、打印机设备），或者特定的特性（比如：屏幕的宽度）来修改页面样式。

媒体查询的 3 种方式。

方式一：通过 `@media` 和 `@import` 使用不同的 CSS 规则（常用）；

```html
<head>
  <style>
    /* @import 是可以和媒体查询结合来使用 */
    @import url(./css/body_bgc.css) (max-width: 800px);
  </style>
</head>
```

方式二：使用 link 元素的 media 属性来指定特定的媒体类型；

```html
<head>
  <link rel="stylesheet" media="screen and (max-width: 800px)" href="./css/body_bgc.css" />
</head>
```

方式三：比较常用的是在 CSS 中通过 `@media` 来使用不同的 CSS 规则，目前掌握这个即可；

```css
/*
  all: 媒体类型
  (max-width: 800px)：媒体特性
*/
@media all and (max-width: 800px) {
  body {
    background-color: orange;
  }
}
```

> 在浏览器控制台，可使用 `Window.matchMedia()` 和 `MediaQueryList.addListener()` 方法，来测试和监控媒体状态；

### 1.媒体类型

媒体查询中的媒体类型是可选的，并且会（隐式地）应用 `all` 类型，用于指定媒体查询的类型。常见的媒体类型值有：

- `all`：适用于所有设备。
- `print`：适用于在打印预览模式下在屏幕上查看的分页材料和文档。
- `screen`：（掌握）主要用于屏幕。
- `speech`：主要用于语音合成器。

CSS2.1 和 Media Queries 3 定义了一些额外的媒体类型（比如：tty，tv，projection，handheld，braille，embossed，aural）；它们在 Media Queries 4 中已经被废弃，并且不应该被使用；aural 类型被替换为具有相似效果的 speech。

```css
/* 如果 screen 省略，隐式使用 all */
@media screnn and (min-width: 320px) {
  .box {
    font-size: 15px;
  }
}
```

### 2.媒体特性

媒体特性（Media features）描述了浏览器、输出设备，或是预览环境的具体特征；

通常会将媒体特性描述为一个表达式；它必须用括号括起来；

| 特征                         | 值                              | 可设置最小/最大 | 描述               |
| ---------------------------- | ------------------------------- | --------------- | ------------------ |
| 宽度 width                   | 长度                            | 是的            | 渲染表面的宽度     |
| 高度 height                  | 长度                            | 是的            | 渲染表面的高度     |
| 颜色 color                   | 整数                            | 是的            | 每个颜色分量的位数 |
| 设备比例 device-aspect-ratio | 整数/整数                       | 是的            | 长宽比             |
| 设备宽度 device-width        | 长度                            | 是的            | 输出设备的宽度     |
| 设备高度 device-height       | 长度                            | 是的            | 输出设备的高度     |
| 方向 orientation             | `protrait` 或 `landscape`       | 不              | 屏幕方向           |
| 分辨率 resolution            | 分辨率（'dpi', 'dpcm'或'dppx'） | 是的            | 解析度             |

媒体查询的表达式，最终会得到一个 Boolean 值，

- 如果结果为真（true），那么就会生效；
- 如果结果为假（false），那么就不会生效；

### 3.逻辑操作符

媒体查询的逻辑操作符（运算符）有哪些？

- `and`：用于将多个媒体查询规则组合成单条媒体查询。
- `not`：用于否定媒体查询，如果不满足这个条件，则返回 true，否则返回 false。
- `only`：仅在整个查询匹配时才用于应用样式。
- `,` (逗号)：用于将多个媒体查询合并为一个规则。

## 四、媒体查询案例分析

理解媒体查询案例的 2 种写法，利用 CSS 的层叠性，2 种写法效果一样。

写法一：

```css
@media (min-width: 320px) and (max-width: 375px) {
  .box {
    font-size: 15px;
  }
}
@media (min-width: 375px) and (max-width: 414px) {
  .box {
    font-size: 18px;
  }
}
@media (min-width: 414px) and (max-width: 480px) {
  .box {
    font-size: 21px;
  }
}
@media (min-width: 480px) {
  .box {
    font-size: 24px;
  }
}
```

写法二

```css
@media (min-width: 320px) {
  .box {
    font-size: 15px;
  }
}
@media (min-width: 375px) {
  .box {
    font-size: 18px;
  }
}
@media (min-width: 414px) {
  .box {
    font-size: 21px;
  }
}
@media (min-width: 480px) {
  .box {
    font-size: 24px;
  }
}
```
