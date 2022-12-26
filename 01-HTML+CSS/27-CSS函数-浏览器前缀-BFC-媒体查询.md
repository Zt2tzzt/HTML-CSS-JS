补充的4个函数有什么用（blur，gradient）？怎么使用。

blur: 毛玻璃(高斯模糊)效果;

- 通常会和两个属性一起使用：

  - filter: blur(radius) ，将模糊或颜色偏移等图形效果应用于元素。
  - backdrop-filter: blur(radius) ，为元素后面的区域添加模糊或者其他效果，通常与 background-color 结合使用。

- blur(radius) ，radius 模糊的半径, 用于定义高斯函数的偏差值, 偏差值越大, 图片越模糊;

  ```html
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <style>
      .box {
        display: inline-block;
        position: relative;
        filter: blur(5px);
      }
      .cover {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        /* 通常和背景颜色一起使用 */
        background-color: rgba(255,255,255,0.2);
        backdrop-filter: blur(10px);
      }
    </style>
  </head>
  <body>
    <div class="box">
      <img src="../images/kobe01.jpg" alt="">
      <div class="cover"></div>
    </div>
  </body>
  </html>
  ```


什么是 gradient：颜色渐变函数？

- \<gradient\> 是 \<image\> CSS 数据类型的子类型，用于表现两种或多种颜色的过渡转变。
- CSS 的 \<image\> 数据类型描述的是2D图形；如 background-image、list-style-image、border-image、content等；
- \<image\> 常见的方式是通过 url 来引入一个图片资源；也可以通过CSS的 \<gradient\> 函数来设置颜色的渐变；

gradient 常见的函数实现有下面几种

- linear-gradient()：创建一个表示两种或多种颜色线性渐变的图片；

  ```css
  .box {
    background-image: linear-gradient(red, blue); /* 默认方向从上到下 */
    /* 改变方向 */
    background-image: linear-gradient(to right, red, blue); /* 从左到右 */
    background-image: linear-gradient(to right top, red, blue); /* 从左下到右上 */
    background-image: linear-gradient(-45deg, red, blue); /* -45度角方向 */
    background-image: linear-gradient(to right, red, blue 40px, orange 60%, purple 100%); /*设置颜色渐变所处的位置 */
  }
  ```

- radial-gradient()：创建了一个图像，该图像是由从原点发出的两种或者多种颜色之间的逐步过渡组成；

  ```css
  .box {
    background-image: radial-gradient(red, blue);
    background-image: radial-gradient(at 0% 50%, red, blue);
  }
  ```

- repeating-linear-gradient()：创建一个由重复线性渐变组成的\<image\>；

- repeating-radial-gradient()：创建一个重复的原点触发渐变组成的\<image\>；

-----

浏览器前缀的官方术语称为 vendor-specific extensions（供应商特定扩展），

常见的浏览器前缀（也称私有浏览器前缀），对应的浏览器有哪些。

- -o-、-xv-：Opera等
- -ms-、-mso-：IE等
- -moz-：Firefox等
- -webkit-：Safari、Chrome等

-----

为什么需要浏览器前缀。

- CSS新属性刚开始并没有成为标准，浏览器为了防止新属性后续会修改属性名，给新的属性添加了浏览器前缀；
- 如果新属性修改了属性名，原来带有浏览器前缀的属性，也会被解析为新属性。

-----

现在浏览器前缀要手动添加吗？

- 不需要，webpack 在打包时，会根据 .browserslistrc 文件中指定需要适配的浏览器，自动添加 css 的浏览器前缀。

-----

FC 的全称是 Formatting Context，什么是FC？

- 元素在标准流里面都是属于一个FC的；
- 块级元素的布局属于 Block Formatting Context（BFC）。
- 行内级元素的布局属于 Inline Formatting Context（IFC）。

-----

哪些情况下会创建 BFC。

- 根元素（\<html\>）
- 浮动元素（元素的 float 不是 none）
- 绝对定位元素（元素的 position 为 absolute 或 fixed）
- 行内块元素（元素的 display 为 inline-block）
- 表格单元格（元素的 display 为 table-cell，HTML表格单元格默认为该值）
- 表格标题（元素的 display 为 table-caption，HTML表格标题默认为该值）
- 匿名表格单元格元素（元素的 display 为 table、table-row、 table-row-group、table-header-group、table-footer-group（分别是HTML table、 row、tbody、thead、tfoot 的默认属性）或 inline-table）
- 块元素，overflow 计算值(Computed)不为 visible 的
- 弹性元素（display 为 flex 或 inline-flex 元素的直接子元素）
- 网格元素（display 为 grid 或 inline-grid 元素的直接子元素）
- display 值为 flow-root 的元素

-----

BFC有什么用？

- 在 BFC 中，box 会在垂直方向上一个挨着一个的排布；
- 垂直方向的间距由 margin 属性决定；
- 在同一个BFC中，相邻两个 box 之间的 margin 会折叠（collapse）；
- 在 BFC 中，每个元素的左边缘是紧挨着包含块的左边缘的

-----

使用BFC解决 margin 折叠问题，

- 将2个 box 放在不同的 BFC 中。

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
    <!-- 位于.content元素形成的BFC中 -->
    <div class="box1"></div>
  </div>
    <!-- 位于html元素形成的BFC中 -->
  <div class="box2"></div>
</body>
</html>
```

-----

BFC解决高度塌陷需要2个条件。(BFC 不能解决绝对定位元素的高度塌陷问题)

- 浮动元素的父元素触发 BFC 形成独立的块级格式化上下文（Block Formatting Context）；
- 浮动元素的父元素的高度是 auto 的；

-----

产生 BFC 的元素高度是 auto 的情况下，怎么计算高度。

1. 如果只有 inline-level，是行高的顶部和底部的距离；
2. 如果有 block-level，是由最顶层块盒子上边缘和最底层块盒子的下边缘之间的距离。
3. 如果有绝对定位元素，将被忽略；（解释了为什么 BFC 不能解决绝对定位元素的高度塌陷问题）
4. 如果有浮动元素，那么会增加高度以包括这些浮动元素的下边缘。

解决浮动问题。

```html
<!DOCTYPE html>
<html lang="en">
<head>
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
  <div class="container clear_fix">
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
  </div>
</body>
</html>
```

-----

什么是媒体查询？

- 媒体查询是一种提供给开发者针对不同设备需求进行定制化开发的一个接口。
- 可以根据设备的类型（比如屏幕设备、打印机设备），或者特定的特性（比如屏幕的宽度）来修改你的页面。

-----

媒体查询的3种方式。

- 通过 `@media` 和 `@import` 使用不同的CSS规则（常用）；

  ```html
  <head>
    <style>
      /* @import是可以和媒体查询结合来使用 */
      @import url(./css/body_bgc.css) (max-width: 800px);
    </style>
  </head>
  ```

- 使用 media 属性为 \<style\>, \<link\>, \<source\> 和其他HTML元素指定特定的媒体类型； 

  ```html
  <head>
    <link rel="stylesheet" media="screen and (max-width: 800px)" href="./css/body_bgc.css">
  </head>
  ```

- 比较常用的是通过 `@media` 来使用不同的CSS规则，目前掌握这个即可；

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

- （了解）使用 `Window.matchMedia()` 和 `MediaQueryList.addListener()` 方法来测试和监控媒体状态；

-----

媒体查询中的媒体类型有什么用？

- 媒体类型是可选的，并且会（隐式地）应用 all 类型，用于指定媒体查询的类型。

常见的媒体类型值有哪些？

- all：适用于所有设备。 
- print：适用于在打印预览模式下在屏幕上查看的分页材料和文档。 
- screen（掌握）：主要用于屏幕。 
- speech：主要用于语音合成器。

CSS2.1 和 Media Queries 3 定义了一些额外的媒体类型(tty, tv, projection, handheld, braille, embossed, 以及 aural)；它们在 Media Queries 4 中已经被废弃，并且不应该被使用；aural 类型被替换为具有相似效果的 speech。

```css
/* 如果 screen 省略，隐式使用 all */
@media screnn and (min-width: 320px) {
  .box { font-size: 15px; }
}
```

-----

什么是媒体查询的媒体特性，

- 媒体特性（Media features）描述了 浏览器、输出设备，或是预览环境的具体特征； 
- 通常会将媒体特性描述为一个表达式； 
- 每条媒体特性表达式都必须用括号括起来；

| 特征                         | 价值                            | 最小/最大 | 描述               |
| ---------------------------- | ------------------------------- | --------- | ------------------ |
| 宽度 width                   | 长度                            | 是的      | 渲染表面的宽度     |
| 高度 height                  | 长度                            | 是的      | 渲染表面的高度     |
| 颜色 color                   | 整数                            | 是的      | 每个颜色分量的位数 |
| 设备比例 device-aspect-ratio | 整数/整数                       | 是的      | 长宽比             |
| 设备宽度 device-width        | 长度                            | 是的      | 输出设备的宽度     |
| 设备高度 device-height       | 长度                            | 是的      | 输出设备的高度     |
| 方向 orientation             | 'protrait'或'landscape'         | 不        | 屏幕方向           |
| 分辨率 resolution            | 分辨率（'dpi', 'dpcm'或'dppx'） | 是的      | 解析度             |

-----

媒体查询的表达式最终会得到一个 Boolean 值，

- 如果结果为真（true），那么就会生效； 
- 如果结果为假（false），那么就不会生效；

媒体查询的逻辑操作符（运算符）有哪些？

- and：and 操作符用于将多个媒体查询规则组合成单条媒体查询。
- not：not 运算符用于否定媒体查询，如果不满足这个条件则返回true，否则返回false。
- only：only 运算符仅在整个查询匹配时才用于应用样式。
- , (逗号)：逗号用于将多个媒体查询合并为一个规则。

-----

理解媒体查询案例的2种写法，利用 CSS 的层叠性，2种写法效果一样。

写法一：

```css
@media (min-width: 320px) and (max-width: 375px) {
  .box { font-size: 15px; }
}
@media (min-width: 375px) and (max-width: 414px) {
  .box { font-size: 18px; }
}
@media (min-width: 414px) and (max-width: 480px) {
  .box { font-size: 21px; }
}
@media (min-width: 480px) {
  .box { font-size: 24px; }
}
```

写法二

```css
@media (min-width: 320px) {
  .box { font-size: 15px; }
}
@media (min-width: 375px) {
  .box { font-size: 18px; }
}
@media (min-width: 414px) {
  .box { font-size: 21px; }
}
@media (min-width: 480px) {
  .box { font-size: 24px; }
}
```

