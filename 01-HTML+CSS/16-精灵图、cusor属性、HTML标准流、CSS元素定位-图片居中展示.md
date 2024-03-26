# 精灵图、cusor属性、HTML标准流、CSS元素定位-图片居中展示

## 一、CSS 精灵图

### 1.CSS 精灵图是什么

CSS Sprite（CSS 雪碧、CSS 精灵）是一种 CSS 图像合成技术，将各种小图片合并到一张图片上，然后利用 CSS 的背景定位，来显示对应的图片部分。

### 2.CSS 精灵图优势

使用 CSS Sprite 的好处 3 点。

- 减少网页的 http 请求数量，加快网页响应速度，减轻服务器压力。
- 减小图片总大小。
- 解决了图片命名的困扰，只需要针对一张集合的图片命名。

### 3.CSS 精灵图制作

设计人员使用 Photoshop 提供精灵图 。或在[工具网站](https://www.toptal.com/developers/css/sprite-generator)上制作。

### 4.CSS 精灵图原理

通过只显示图片的很小一部分来图标的。

### 5.CSS 精灵图使用

精灵图的使用步骤 2 步，顺序可打乱。

1. 设置对应元素的宽度和高度。
2. 设置精灵图作为背景图片，调整背景图片的位置来展示。

[获取精灵图的位置工具网站](http://www.spritecow.com/)

### 6.CSS 精灵图使用案例

精灵图实现案例。

```html
<head>
  <style>
    .box {
      background: #333;
    }
    .topbar {
      /* 使用精灵图 */
      background-image: url(../images/topbar_sprite.png);
      display: inline-block;
    }
    i.hot-icon {
      /* 给背景精灵图做定位，并设值背景图片的宽高 */
      background-position: -192px 0;
      width: 26px;
      height: 13px;
    }
    i.logo-icon {
      /* 给背景精灵图做定位，并设值背景图片的宽高 */
      background-position: 0 -19px;
      width: 157px;
      height: 33px;
    }
  </style>
</head>
<body>
  <div class="box">
    <i class="topbar hot-icon"></i>
    <i class="topbar logo-icon"></i>
    <!-- <i class="topbar "></i> -->
  </div>
</body>
```

## 二、CSS cursor 属性

CSS cursor 属性，用于设置鼠标指针（光标）在元素上面时的显示样式。

常见的设置 5 个

- `auto`：浏览器自动决定指针显示样式。
- `default`：由操作系统决定，一般就是一个小箭头。
- `pointer`：一只小手。
- `text`：一条竖线。
- `none`：没有任何指针显示在元素上面。

## 三、HTML 标准流（文档流）

HTML 标准流（normal flow）也称常规流、正常流、文档流【document flow】。表示默认情况下，元素的排布规则是，从左到右、从上到下按顺序摆放好 ，互相之间不存在层叠现象。

### 1.标准流中改变位置

在标准流中，常见的调整位置的方法有：margin、padding，其中 margin 可以设置负数。

这种方式的缺点：

- 会影响到标准流中其他元素的定位效果。
- 不便于实现元素层叠的效果。

## 四、CSS 元素定位

CSS 元素的定位（脱离标准流），指的是定位元素从正常的文档流布局中，脱离出来，并使它们具有不同的行为。

### 1.CSS position 属性

CSS position 属性用来对元素进行定位。

- `static`：默认值, 静态定位。

使用下面的值, 可以让元素变成**定位元素（positioned element)**。

- `relative`：相对定位。
- `absolute`：绝对定位。
- `fixed`：固定定位。
- `sticky`：粘性定位。

### 2.static 静态定位

静态定位 static，是 position 属性的默认值。元素按照标准流布局。`left`、`right`、`top`、`bottom` 等属性没有任何作用。

### 3.relative 相对定位

相对定位的特性 3 点：

- 元素仍按照标准流布局。
- 可以通过 `left`、`right`、`top`、`bottom` 进行定位，可设置负数。
- 定位参照对象是元素自己原来的位置。

举例；数学表达式案例。

```html
<head>
  <style>
    span {
      font-size: 10px;
      position: relative;
      bottom: 4px; /* 距离原来的位置，从底部，向上移动 4px */
    }
  </style>
</head>

<body>
  <div>3<span>2</span> + 2<span>3</span> = 17</div>
</body>
```

梦幻西游网站，背景图居中案例，

使用背景图片的方案。

```html
<head>
  <style>
    body {
      margin: 0;
      padding: 0;
    }
    .box {
      height: 489px;
      background: url(../images/mhxy.jpg) center;
    }
  </style>
</head>

<body>
  <div class="box"></div>
</body>
```

使用 img 元素的方案（相对定位 + margin-left）

- 实现方式一：`transform: translate(-50%)`，translate 中的百分比是相对于自己（即图片一半的宽度 960px）。
- 实现方式二：`left: -960px;` 相对于自己移动图片一半的宽度（即图片一半的宽度 960px）。

```html
<head>
  <style>
    body {
      margin: 0;
      padding: 0;
    }
    .box {
      height: 489px;
      /* div 元素会占据视口宽度，缩放浏览器时，视口宽度变小，而 img 元素不会换行，宽度不变，所以 img 宽度超出了 div 宽度，屏幕显示滚动条。*/
      overflow: hidden; /* img 超出的宽度不显示，滚动条隐藏。*/
    }
    .box img {
      /* ---------伪代码------------ */
      /* 第一种方案 */
      position: relative;
      left: -960px; /* left: 图片的一半宽度 */

      /* 第二种方案 */
      transform: translate(-50%); /* translate 中的百分比是相对于自己 */
      /* ---------伪代码------------ */

      margin-left: 50%; /* 向右边移动 .box 的一半 */
    }
  </style>
</head>
<body>
  <div class="box">
    <img src="../images/mhxy.jpg" alt="" />
  </div>
</body>
```

### 4.fixed 固定定位

固定定位 fixed 特性 4 点。

- 元素脱离标准流（脱标）。
- 可以通过 `left`、`right`、`top`、`bottom` 进行定位。
- 定位参照对象是视口（viewport）。
- 当画布滚动时，固定不动。

> 视口指的是：文档的可视区域。
>
> 画布指的是：用于渲染文档的区域，文档内容超出视口范围，可以通过滚动查看。
>
> 通常它们之间的关系：画布 >= 视口

举例：在视口右下方展示两个按钮。

```html
<head>
  <style>
    body {
      margin: 0;
      padding: 0;
    }
    .box {
      position: fixed;
      right: 150px;
      bottom: 70px;
    }
    .box .item {
      ...;
    }
  </style>
</head>
<body>
  <div class="box">
    <div class="item">按钮1</div>
    <div class="item">按钮2</div>
  </div>
</body>
```
