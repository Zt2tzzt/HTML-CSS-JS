外边距 margin 属性有什么用。

- 用于设置盒子的外边距, 通常用于元素和元素之间的间距

2种写法。
- margin 包括四个方向, 所以有如下的取值: 
	- margin-top：上外边距 
	- margin-right：右外边距 
	- margin-bottom：下外边距 
	- margin-left：左外边距
- margin 的缩写属性： 
	
	- margin-top、margin-right、margin-bottom、margin-left 的简写属性（顺时钟方向）

	| margin值的个数 | margin属性声明               | 代表含义                                         |
	| --------------- | ----------------------------- | ------------------------------------------------ |
	| 4               | margin: 10px 20px 30px 40px; | top: 10px, right: 20px, bottom: 30px, left: 40px |
	| 3               | margin: 10px 20px 30px;      | top: 10px, right / left: 20px, bottom: 30px      |
	| 2               | margin: 10px 20px;           | top / bottom: 10px, right / left: 20px           |
	| 1               | margin: 10px;                | top / right / bottom / left: 10px                |

------

margin 与 padding 比较，2个注意事项，

1. 设置 padding，会撑开盒子的宽度。解决办法：设置 `box-sizing: border-box;`
2. 设置 margin-top，有传递的特性，会影响父元素的 margin-top，解决办法：设置父元素的 `overflow：auto`。

margin 和 padding 的适用场景是什么。

- margin 一般是用来设置兄弟元素之间的间距。
- padding 一般是用来设置父子元素之间的间距。

------

什么是上下 margin 的传递（左右不会传递）

- margin-top 传递：块级元素的顶部线，和父元素的顶部线重叠，那么这个块级元素的 margin-top 值会传递给父元素。
- margin-bottom 传递：块级元素的底部线，和父元素的底部线重叠，**并且父元素的高度是auto**，那么这个块级元素的 margin-bottom 值会传递给父元素

解决办法3点。

- 给父元素设置 padding-top \ padding-bottom 来代替 margin 的方案。
- 给父元素设置 border.
- 触发 BFC（block formating context）: 设置`overflow: auto`

------

什么是上下 margin 的折叠（左右不会折叠）2种情况？

- 垂直方向上相邻的2个margin（margin-top、margin-bottom）有可能会合并为1个margin，这种现象叫做 collapse（折叠）
- 2种情况：
  1. 两个兄弟块级元素之间上下 margin 的折叠。
  2. 父子块级元素之间 margin 的折叠（通过 margin 的传递产生折叠，没有传递不会折叠）。

折叠的计算规则。

- 两个值进行比较，取较大的值

如何防止？

- 只设置其中一个元素的 margin

```html
<head>
  <title>Document</title>
  <style>
    .box {
      width: 200px;
      height: 200px;
      background-color: #f00;
      border: 1px solid black; /* 取消.content的margin传递 */
    }
    .content {
      width: 100px;
      height: 100px;
      background-color: #0f0;
      margin-bottom: 100px;
      margin-top: 10px;
      border: 1px solid black; /* 取消.son的margin传递，.son的margin-top不会产生折叠 */ 
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

------

块级元素宽度的计算公式。

- block box width = content width + padding + border width + margin

使块级元素居中的原理。

1. 块级元素设置宽度后，浏览器把这一行剩下的宽度，分配给了它的 margin-right。
2. 设置该元素 margin: 0 auto; 将左右空间自动分配，达到水平居中的效果。
3. 块级元素高度默认是内容高度，所以**不能**用`margin: auto 0;`来做垂直方向居中。同理，行内元素宽度是内容宽度，**不能**设置`margin: 0 auto`来做水平居中。
4. 最终，居中布局还是推荐使用 flex 来做。

------

什么是 outline？

- 不占用空间，显示在 border 外面的边框。

与它相关有哪些属性，

- `outline-width`：外轮廓的宽度 
- `outline-style`：取值跟 border 的样式一样，比如 solid、dotted 等 
- `outline-color`：外轮廓的颜色 
- `outline`：outline-width、outline-style、outline-color 的简写属性，跟 border 用法类似

1个应用场景。

- 去除 a 元素、input 元素的 focus 状态下轮廓效果

  ```css
  a {
    outline: none;
  }
  ```

------

`box-shadow` 属性有什么用？

- 设置一个或多个阴影。

如何使用？

- 每个阴影用`<shadow>`表示 多个阴影之间用逗号隔开，从前到后叠加。

1. 第1个<length>：offset-x, 水平方向的偏移，正数往右偏移 
2. 第2个<length>：offset-y, 垂直方向的偏移，正数往下偏移 
3. 第3个<length>：blur-radius, 模糊半径，可省略。
4. 第4个<length>：spread-radius, 延伸半径 ，可省略。
5. <color>：阴影的颜色，如果没有设置，就跟随 color 属性的颜色 
6. inset：外框阴影变成内框阴影

```css
.box {
  box-shadow: 5px 5px 10px orange, 10px 10px 10px green;
}
```
在线调整网站：https://html-css-js.com/css/generator/box-shadow/

------

`text-shadow` 属性有什么用？

- 给文字添加阴影的效果。

如何使用？

- 相当于 box-shadow, 它没有 spread-radius 的值和 inset 值

在线调整网站：https://html-css-js.com/css/generator/text-shadow/

------

给行内级元素，设置盒子的属性，有几种情况。

- 以下属性对行内级非替换元素不起作用
  - width、height、margin-top、margin-bottom
- 以下属性对行内级非替换元素的效果比较特殊
  - padding-top、padding-bottom。border-top-xxx、border-bottom-xxx
  - 内容会被撑开，但不占据空间，原因是W3C考略到会影响同行的行内元素。

------

有关背景色与前景色对于border的影响的结论2点。

1. 背景色设置到了border，padding，content下面。
2. 前景色会在border没有设置颜色的情况下显示在border上，覆盖背景色。

------

`box-sizing` 属性有什么用？

- 用来设置盒子模型中宽高的行为。

它的两个属性值的含义。

- `content-box`：默认值，padding，border 都布置在 width，height 外边。
- `border-box`：padding，border 都布置在 width，height 里边。

------

IE8以下的盒子模型自带 `box-sizing: border-box`;