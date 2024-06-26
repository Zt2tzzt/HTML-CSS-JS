# 顶部 Header

顶部 Header 精灵图样式封装：

css/common.css

```css
.top_sprite {
  display: inline-block;
  background-image: url(../image/topbar.png);
}
```

顶部 Header 样式封装在该文件下：css/topbar.css

顶部 Header logo：

- 使用 a 标签和精灵图展示 logo 图片。
- 使用 `text-indent` 位移文字。，用于作 SEO 优化。

css/topbar.css

```css
.topbar .left .logo {
  width: 157px;
  height: 100%;
  padding-right: 20px;
  text-indent: -9999px;
}
```

顶部 Header 标签，使用 ul li 布局，ul 使用 flex 布局

ul.tags 使用 flex 布局后，里面的 li 元素，高度默认会拉伸撑满（stretch），所以设置 a.tag 的高度 100%，即 ul.tags 的高度。

然后再 a.tag 中，设置 padding 和 line-height 来将盒子内部空间撑开。

css/topbar.css

```css
.topbar .left > .tags {
  display: flex;
}
.topbar .left .tag {
  position: relative;
  display: block;
  height: 100%;
  padding: 0 19px;
  font-size: 14px;
  color: #ccc;
  line-height: 70px;
}
```

使用动态伪类 :hover，来设置 tag 在不同状态下的样式：

使用 .active 类，来设置激活的 tag 的样式：

css/topbar.css

```css
.topbar .left .tag.active,
.topbar .left .tag:hover {
  color: #fff;
  background-color: #000;
}
```

使用精灵图，伪元素 ::after，绝对定位，来设置激活 tag 下方红色小三角的样式。

css/topbar.css

```css
/* 伪元素做小三角 */
.topbar .left .tag.active::after {
  content: '';
  position: absolute;
  display: inline-block;
  width: 12px;
  height: 6px;
  bottom: -1px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background: url(../image/topbar.png) -226px 0;
}
```

顶部 Header 标签【下载客户端】的【hot】图标：使用精灵图，并使用相对定位。

css/topbar.css

```css
.topbar .left .hot {
  position: relative;
  right: 13px;
  top: 20px;
  width: 28px;
  height: 19px;
  background-position: -190px 0;
}
```

顶部 Header 使用 input 元素，自定义搜索框区域。使用精灵图 + 白色的背景颜色 + flex 布局 + border-radius。

css/topbar.css

```css
.topbar .right .search {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 158px;
  height: 32px;
  padding-right: 10px;
  border-radius: 32px;
  background-color: #fff;
  background-position: 0 -99px;
}
```

自定义 input 输入框的样式。使用 `-webkit-input-placeholder` 伪元素，设置 input 元素中的 placeholder 样式。

```css
.topbar .right .search input {
  font-size: 12px;
  width: 125px;
}
.topbar .right .search input::-webkit-input-placeholder {
  color: #9b9b9b;
}
```

顶部 Header 使用 a 元素，显示登录按钮。

使用动态伪类，实现登录按钮的三种状态样式

```css
.topbar .right .login:hover a {
  color: #999;
}
.topbar .right .login a {
  color: #787878;
}
.topbar .right .login a:hover {
  color: #787878;
  text-decoration: underline;
}
```

顶部 Header 使用 a 元素，显示创作者中心按钮。

此时，这个 a 元素，是一个 flex-item，所以可以给它设置宽、高等 CSS 属性。

```css
.topbar .right > .creater-center {
  text-align: center;
  line-height: 33px;
  color: #ccc;

  width: 90px;
  height: 32px;
  margin-left: 12px;
  border-radius: 20px;
  border: 1px #4f4f4f solid;
}
.topbar .right > .creater-center:hover {
  border: 1px #fff solid;
  color: #fff;
}
```
