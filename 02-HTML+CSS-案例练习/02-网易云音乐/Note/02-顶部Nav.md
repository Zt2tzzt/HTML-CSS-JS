# 顶部 Nav

顶部 Nav 最外层盒子样式：

```css
.topnav {
  width: 100%;
  height: 35px;
  box-sizing: border-box;
  background-color: #c20c0c;
}
```

顶部 Nav 中，也使用 flex 布局。

经过计算后，内容 content 设置 1100px，并在顶部 Nav 中剧中显示。

```css
.topnav .content {
  display: flex;
  width: 1100px;
  height: 100%;
  margin: 0 auto;
}
```

顶部 Nav 的内容 content 中，使用 ul li 来显示标签 tag。

ul.tags 盒子，它里面也是用 flex 布局，水平方向使用 flex-end 对齐方式。

ul.tags 使用 flex 布局后，里面的 li 元素，高度默认会拉伸撑满（stretch），所以设置 a 的高度 100%，即 ul.tags 的高度。

然后在 a 中，使用子元素  span，并设置 displayL inline-block; ，来展示标签 label，在 span 元素中设置 padding 和 line-height 来将盒子内部空间撑开。

这么做是因为，在鼠标触碰到标签之前，在一定范围内，就需要有能够点击的效果。

```css
.topnav .tags {
  display: flex;
  width: 744px;
  height: 100%;
  justify-content: flex-end;
}
.topnav .tags li {
  font-size: 12px;
}
.topnav .tags a {
  display: block;
  height: 100%;
}
.topnav .tags span {
  display: inline-block;
  line-height: 20px;
  color: #fff;
  height: 20px;
  padding: 0 13px;
  margin: 6px 17px 0;
  border-radius: 20px;
}
.topnav .tags .active {
  background-color: #9b0909;
}
```
