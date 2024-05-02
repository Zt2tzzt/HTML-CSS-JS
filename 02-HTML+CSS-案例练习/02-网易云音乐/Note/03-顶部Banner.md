# 顶部 Banner

顶部 Banner 区域样式封装，设置了背景图片。

```css
.banner {
  width: 100%;
  height: 285px;
  background: url(../../image/banner_blur_01.jpg) center / 6000px;
}
```

顶部 Banner 的中间区域，用来展示轮播图和下载客户端的按钮，使用 div.wrap 封装。

为它设置宽、高，并居中显示。

```css
.banner .wrap {
  position: relative;
  width: 982px;
  height: 285px;
  margin: 0 auto;
}
```

顶部 Banner 轮播图图片区域设置，使用 div.images-area 封装。

```css
.banner .images-area {
  position: relative;
  width: 730px;
  height: 100%;
}
```

顶部 Banner 中，使用 ul.images 封装轮播图列表：在其中使用 flex 布局。

设置 overflow: hidden; 将超出盒子的图片隐藏起来。

```css
.banner .images {
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
```

顶部 Banner 中，使用 ui li 布局轮播图图片列表，在 li 中，使用 a 元素包裹 img 元素。

li 元素，是 flex-item，让它撑满整个 ul.images 元素，同一行的其它 li 元素，被隐藏。

```css
.banner .images li {
  flex-shrink: 0;
  width: 100%;
}
.banner .images li a {
  display: block;
}
.banner .images li img {
  width: 100%;
  height: 285px;
}
```

顶部 Banner 中，为轮播图设置下方标点：

使用 ul li 元素，来布局下方标点，使用绝对定位，将 ul 设为占据它的父元素 div.image-area 的整行宽度，并将 ul 定位到轮播图的下方，

为 ul.dots 设置水平居中。并设置 flex 布局。

```css
.banner .dots {
  position: absolute;
  display: flex;
  justify-content: center;
  left: 0;
  right: 0;
  bottom: 3px;
  margin: 0 auto;
}
```

ul.dots > li 是 flex-item，为它设置 margin，来撑开 ul.dots 的宽度。

```css
.banner .dots li {
  margin: 0 2px;
}
```

为 li > a 设置宽、高并设置为块级元素，并使用精灵图。

并使用动态伪类，来设置不同状态下的样式。

```css
.banner .dots a {
  display: block;
  width: 20px;
  height: 20px;
  background: url(../../image/banner.png) 3px -343px;
}
.banner .dots a:hover {
  background: url(../../image/banner.png) -16px -343px;
}
```

顶部 Banner 中，设置轮播图右侧下载客户端按钮，使用 div.download 封装。

为它设置绝对定位，相对于父元素 div.wrap，并为它设置精灵图，精灵图中有下载客户端按钮的图形。

```css
.banner .dowload {
  position: absolute;
  right: -1px;
  top: 0;
  bottom: 0;
  width: 254px;
  background: url(../../image/download.png);
}
```

将 a 元素，覆盖在精灵图的“下载客户端”按钮的位置，并设置 text-intend 用于 SEO 优化。

使用动态伪类，来设置鼠标悬停状态下背景精灵图的。

```css
.banner .dowload a {
  display: block;
  text-indent: -9999px;
  width: 215px;
  height: 56px;
  margin: 186px 0 0 19px;
}
.banner .dowload a:hover {
  background: url(../../image/download.png) 0 -290px;
}
```

在 div.download 中，放入 p 元素，来显示说明信息。

以前在 reset.css 中重置过 p 元素的样式。

```css
.banner .dowload p {
  text-align: center;
  color: #8d8d8d;
  margin-top: 10px;
}
```

顶部 Banner 轮播图控制器的显示，使用 a 元素进行布局。

为左、右两个控制器，设置绝对定位布局，参照它们的父元素 div.wrap。为它们设置垂直居中，并设置精灵图。

并使用动态伪类，来改变精灵图。

```css
.banner .wrap .control {
  position: absolute;
  width: 37px;
  height: 63px;
  top: 0;
  bottom: 0;
  margin: auto 0;
  background-image: url(../../image/banner.png);
}
.banner .wrap .left {
  left: -70px;
  background-position: 0 -360px;
}
.banner .wrap .left:hover {
  left: -70px;
  background-position: 0 -430px;
}
.banner .wrap .right {
  right: -70px;
  background-position: 0 -500px;
}
.banner .wrap .right:hover {
  right: -70px;
  background-position: 0 -570px;
}
```
