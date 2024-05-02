# 主内容右侧 area-right

为主内容右侧区域，封装样式 .area-right，在其中设置宽度。

```css
.main .area-right {
  width: 250px;
}
```

---

在主内容右侧区域顶部，设置用户登录区域 div.user-login。为它设置宽、高和精灵图。

```css
.main .area-right .user-login {
  width: 250px;
  height: 126px;
  background: url(../../image/main_sprite.png) 0 0;
}
```

在 div.user.login 中，使用 p 元素，设置说明信息；使用 a 元素，设置用户登录按钮。

```css
.main .area-right .user-login .desc {
  width: 205px;
  margin: 0 auto;
  padding: 16px 0;
  color: #666;
  line-height: 22px;
}

.main .area-right .user-login .btn {
  display: block;
  width: 100px;
  height: 31px;
  margin: 0 auto;
  line-height: 31px;
  text-align: center;
  color: #fff;
  background: url(../../image/main_sprite.png) 0 -195px;
  text-shadow: 0 1px 0 #8a060b;
}
.main .area-right .user-login .btn:hover {
  background-position: -110px -195px;
}
```

---

在主内容右侧区域中间，设置入驻歌手区域 .settle-singer，为其设置内边距。

```css
.main .settle-singer {
  padding: 20px;
  padding-bottom: 14px;
}
```

封装一个 header_type_01 样式，用于设置头部标题中的样式。

其中使用 flex 布局，并未 .title 区域和 .more 区域，设置字体颜色，下划线等样式。

css/header/header_type_01.css

```css
.header_type_01 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 5px;
  border-bottom: 1px #ccc solid;
}

.header_type_01 .title {
  color: #333;
}

.header_type_01 .more {
  color: #666;
}

.header_type_01 .more:hover {
  text-decoration: underline;
}
```

将 header_type_01 样式，应用于入驻歌手区域的标题 div.settle-singer，并为 div.settle-singer 设置字体的样式。

```css
.main .settle-singer .title {
  font-size: 12px;
  font-weight: 700;
}
```

```html
<div class="header_type_01">
  <h1 class="title">入驻歌手</h1>
  <a href="#" class="more">查看全部 &gt;</a>
</div>
```

---

主内容右侧区域歌手列表，使用 ul li 来布局。

用 a.item 包裹整个歌手 item。为它设置 flex 布局。

```css
.main .settle-singer .list .item {
  display: flex;
  width: 210px;
  height: 62px;
  margin-top: 15px;
  background-color: #fafafa;
}
```

在 a.item 中，布局 div.album 和 div.info 分别用来展示歌手头像和歌手信息。

div.info 的兄弟元素 div.album 中的 img 图片撑开了宽、高。所以可以个 div.info 设置 flex: 1;

```css
.main .settle-singer .list .item .info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 3px 12px;
  border: 1px #e9e9e9 solid;
  border-left: none;
  /* flex item 设置 flex-grow 后，需要设置overflow: hidden; 子元素的省略号效果才能有效 */
  overflow: hidden;
}
```

为 div.info 中的元素，设置样式：

desc 中，设置单行省略号。

```css
.main .settle-singer .list .item .info .singer {
  font-size: 14px;
  font-weight: 700;
  color: #000;
}
.main .settle-singer .list .item .info .desc {
  font-size: 12px;
  color: #666;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
```

---

主内容右侧，“申请成为网易音乐人”按钮，使用 a 元素封装。在其中使用 i 元素，设置精灵图。

将 btn 相关的精灵图样式，封装在 css/btn/btn_type_01.css 中

```css
.btn_sprite {
  display: block;
  background: url(../../image/btn_sprite.png) no-repeat;
  height: 31px;
  line-height: 31px;
  text-align: center;
}

.btn_type_01_sup {
  background-position: right -100px;
  padding-right: 5px;
}

.btn_type_01_sub {
  background-position: 0 -59px;
  padding-left: 3px;
}
```

为 a 元素设置样式：

之所以要在 a 元素中，使用 i 元素，是因为需要为 a 元素设置 border-radius 和 overflow: hidden; 以隐藏精灵图左上角小点。

```css
/* 申请成为网易云音乐人按钮 */
.main .apply {
  width: 210px;
  font-size: 12px;
  font-weight: 700;
  color: #000;
  box-sizing: border-box;
  /* 设置 border-radius 和 overflow: hidden; 隐藏精灵图左上角小点 */
  border-radius: 4px;
  overflow: hidden;
  margin: 0 auto;
}
```

---

主内容右侧，热门主播区域，使用 div.hot-hoster 样式封装，排版布局和样式与上方的“入驻歌手”类似。

只不过它的 header，没有右侧区域。

```css
.main .hot-hoster {
  margin-top: 14px;
  padding: 20px;
}
```

使用 ui li 排版布局热门主播列表：

```css
.main .hot-hoster .list {
  margin-top: 10px;
  overflow: auto;
}
```

使用 li.item 封装热门主播 item，为它使用 flex 布局。在其中使用  a.image 元素和 div.info 元素，分别排版布局主播头像和主播信息。

```css
.main .hot-hoster .list .item {
  display: flex;
  margin-top: 10px;
}

.main .hot-hoster .list .item .image {
  width: 40px;
}

.main .hot-hoster .list .item .info {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-left: 10px;
}

.main .hot-hoster .list .item .info .author,
.intro {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
```
