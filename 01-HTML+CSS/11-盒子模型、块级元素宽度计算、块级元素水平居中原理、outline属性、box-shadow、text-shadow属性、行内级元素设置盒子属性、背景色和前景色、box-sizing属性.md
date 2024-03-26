# 盒子模型、块级元素宽度计算、块级元素水平居中原理、outline属性、box-shadow、text-shadow属性、行内级元素设置盒子属性、背景色和前景色、box-sizing属性

## 一、margin 外边距

外边距 margin 属性，用于设置盒子的外边距，通常用于设置元素和元素之间的间距。它有 2 种写法。

- margin 包括四个方向, 所以有如下的取值:

  - `margin-top`：设置上外边距；
  - `margin-right`：设置右外边距；
  - `margin-bottom`：设置下外边距；
  - `margin-left`：设置左外边距；
- margin 的缩写属性，语法：`margin: xxx`，这是 `margin-top`、`margin-right`、`margin-bottom`、`margin-left` 的简写属性（顺序按照顺时钟方向）。

  | margin 值的个数 | margin 属性声明              | 代表含义                                         |
  | --------------- | ---------------------------- | ------------------------------------------------ |
  | 4               | margin: 10px 20px 30px 40px; | top: 10px, right: 20px, bottom: 30px, left: 40px |
  | 3               | margin: 10px 20px 30px;      | top: 10px, right / left: 20px, bottom: 30px      |
  | 2               | margin: 10px 20px;           | top / bottom: 10px, right / left: 20px           |
  | 1               | margin: 10px;                | top / right / bottom / left: 10px                |

### 1.margin 与 padding 比较

margin 与 padding 比较，2 个常见的问题，

| 问题                                                         | 解决方案                                                     |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| 设置 `padding`，会撑开盒子的宽度。                           | 设置 `box-sizing: border-box;`，将 padding 包含在盒子的 width、height 内。 |
| 设置 `margin-top`，有传递的特性。会传递给父元素的 `margin-top`。 | 设置父元素的 `overflow：auto`（原理是触发 BFC）。            |

margin 和 padding 的适用场景是什么：

- margin 一般是用来设置兄弟元素之间的间距。
- padding 一般是用来设置父子元素之间的间距。

### 2.margin 上下传递

margin-top，margin-bottom 有传递的特性（margin-left、margin-right 不会传递）

- `margin-top` 传递：块级元素的顶部线，和父元素的顶部线重叠时，那么这个块级元素的 margin-top 值会传递给父元素。
- `margin-bottom` 传递：块级元素的底部线，和父元素的底部线重叠，**并且父元素的高度是 auto**，那么这个块级元素的 margin-bottom 值会传递给父元素。

解决办法 3 点。

- 方案一：给父元素设置 `padding-top`、`padding-bottom` 来代替 margin 的方案。
- 方案二：给父元素设置 border.
- 方案三： 设置 `overflow: auto;`，触发 BFC（block formating context）。

### 3.margin 上下折叠

`margin-top`，`margin-bottom` 有折叠的特性（`margin-left`、`margin-right` 不会折叠）

垂直方向上，相邻的 2 个 margin（margin-top 或 margin-bottom）有可能会合并为 1 个 margin，这种现象叫做 collapse（折叠），比如：

- 两个兄弟块级元素之间上下 margin 的折叠。
- 父子块级元素之间 margin 的折叠（通过 margin 的传递产生折叠，没有传递不会折叠）。

margin 折叠的计算规则：两个值进行比较，取较大的值

如果要避免 margin 的折叠，那么一般只设置相邻元素其中一个元素的 margin。

【示例说明】取消 margin 传递，避免 margin 折叠。

```html
<head>
  <title>Document</title>
  <style>
    .box {
      width: 200px;
      height: 200px;
      background-color: #f00;
      border: 1px solid black; /* 取消 .content 的 margin 传递 */
    }
    .content {
      width: 100px;
      height: 100px;
      background-color: #0f0;
      margin-bottom: 100px;
      margin-top: 10px;
      border: 1px solid black; /* 取消 .son 的 margin 传递，.son 的 margin-top 不会产生折叠 */
    }
    .son {
      background-color: #00f;
      width: 50px;
      height: 50px;
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <div class="box">
    <div class="content">
      <div class="son"></div>
    </div>
  </div>
  <div>呵呵呵</div>
</body>
```

## 二、块级元素宽度计算公式

block box width = content width + padding + border width + margin

## 三、块级元素水平居中原理

**块级元素设置宽度后**，浏览器把这一行剩下的宽度，分配给了它的 margin-right。

**块级元素设置宽度后**，设置该元素 `margin: 0 auto;` ，将左右空间自动分配，达到水平居中的效果。

> 块级元素高度默认是内容高度，所以**不能**用 `margin: auto 0;` 来做垂直方向居中。
>
> 同理，行内元素宽度是内容宽度，**不能**设置`margin: 0 auto;` 来做水平居中。
>
> 居中布局还是推荐使用 flex 来做。

## 四、outline 属性

outline 属性，用于显示在 border 外面的边框。它不占用空间。与它相关有哪些属性，

- `outline-width`：外轮廓的宽度。
- `outline-style`：取值跟 border 的样式一样，比如 solid、dotted 等。
- `outline-color`：外轮廓的颜色。
- `outline`：outline-width、outline-style、outline-color 的简写属性，跟 border 用法类似

比如：去除 a 元素、input 元素的 focus 状态下轮廓效果

```css
a {
  outline: none;
}
```

## 五、box-shadow 属性

`box-shadow` 属性，用于设置一个或多个阴影。

如何使用？每个阴影用 `<shadow>` 表示，多个阴影之间用逗号隔开，从前到后叠加。

- 第 1 个\<length\>：表示 offset-x, 水平方向的偏移，正数往右偏移。
- 第 2 个\<length\>：表示 offset-y, 垂直方向的偏移，正数往下偏移。
- 第 3 个\<length\>：表示 blur-radius, 模糊半径，可省略。
- 第 4 个\<length\>：表示 spread-radius, 延伸半径 ，可省略。
- \<color\>：阴影的颜色，如果没有设置，就跟随 color 属性的颜色。
- inset：外框阴影变成内框阴影。

```css
.box {
  box-shadow: 5px 5px 10px orange, 10px 10px 10px green;
}
```

[在线调整网站](https://html-css-js.com/css/generator/box-shadow/)

## 六、text-shadow 属性

`text-shadow` 属性，用于给文字添加阴影的效果。

相当于 box-shadow, 它没有 spread-radius、inset 值

[在线调整网站](https://html-css-js.com/css/generator/text-shadow/)

## 七、行内级元素设置盒子属性

给行内级元素，设置盒子的属性，有几种情况。

以下属性对行内级元素不起作用：

- width、height
- margin-top、margin-bottom

以下属性对行内级元素的效果特殊，设置这些属性后，内容会被撑开，但不占据空间，原因是 W3C 考略到会影响同行的行内元素。

- padding-top、padding-bottom
- border-top-xxx、border-bottom-xxx

## 八、背景色和前景色

背景色、前景色对于 border 的影响：

- 背景色设置到了 border，padding，content 下面。
- 前景色会在 border 没有设置颜色的情况下显示在 border 上，覆盖背景色。

## 九、box-sizing 属性

`box-sizing` 属性，用来设置盒子模型中宽高的行为。

- `content-box`：默认值，表示 `padding`，`border` 都布置在 `width`，`height` 外边。
- `border-box`：表示 `padding`，`border` 都布置在 `width`，`height` 里边。

> IE8 以下的盒子模型自带 `box-sizing: border-box`;
