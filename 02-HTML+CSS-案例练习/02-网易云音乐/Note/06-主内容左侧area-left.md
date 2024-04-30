# 六、主内容左侧 area-left

为主内容左侧区域，封装样式 div.area-left，在其中设置宽度和内边距。

```css
.main .area-left {
  width: 689px;
  padding: 20px 20px 40px;
}
```

---

主内容左侧，热门推荐区域的样式，封装在该文件中：

css/main/main-recommond-section.css

主内容左侧，热门推荐区域，使用 div.recommend-section 封装。

其中有 div.header_type_02 和 div.content 两部分区域。

将 div.header_type_02 样式抽取出来，并使用伪元素 ::after，为它添加精灵图。

css/header/header_type_02.css

```css
.header_type_02 {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  height: 35px;
  box-sizing: border-box;
  padding: 0 20px 5px 34px;
  border-bottom: 2px #c10d0c solid;
  background: url(../../image/main_sprite.png) no-repeat -225px -156px;
}

.header_type_02::after {
  content: '';
  position: absolute;
  width: 12px;
  height: 12px;
  right: 5px;
  bottom: 8px;
  background: url(../../image/main_sprite.png) no-repeat 0 -240px;
}
```

div.header_type_02 中，分为左侧区域 div.area_left 和右侧区域 div.area_right。

css/header/header_type_02.css

```css
.header_type_02 .area_left {
  display: flex;
  align-items: center;
}
```

div.area_left 中有标题 h1.title “热门推荐”，和 ul.keywords 关键词列表。

在 title 中，调整字体样式，在 keywords 中，使用 flex 布局。为 line 设置 margin 属性，以撑开 keywords 的宽度。

css/header/header_type_02.css

```css
.header_type_02 .title {
  font-size: 20px;
  font-weight: normal;
  color: #333;
}

.header_type_02 .keywords {
  display: flex;
  margin-left: 28px;
  color: #999;
}

.header_type_02 .keywords .item {
  color: #666;
}
.header_type_02 .keywords .item:hover {
  text-decoration: underline;
}

.header_type_02 .keywords .line {
  margin: 0 12px;
}
```

div.area_right 右侧“更多”链接设设置。

css/header/header_type_02.css

```css
.header_type_02 .more {
  font-size: 12px;
  color: #666;
}
.header_type_02 .more:hover {
  text-decoration: underline;
}

.header_type_02 .area_right {
  position: relative;
  bottom: 1px;
}
```

div.content 区域，是热门推荐的内容区域，设置它的内边距。

css/main/main-recommond-section.css

```css
.main .area-left .recommend-section .content {
  padding: 20px 0 45px;
}
```

使用 ul li.box 排版布局热门推荐列表，在其中设置样式，

```css
.main .area-left .recommend-section .content ul {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.main .area-left .recommend-section .content .box {
  width: 140px;
  height: 204px;
  margin-bottom: 30px;
}
```

热门推荐 item，封装在 li.box 里。

在其中使用绝对定位。

```css
<li class="box">
  <div class="top">
    <!-- .top 最底层 -->
    <img src="./image/music_item.jpg" alt="健身女孩" />
    <!-- 使用绝对定位，设置在 .top 第二层，覆盖整个.top -->
    <a class="cover" href="#"></a>
    <!-- 使用绝对定位，设置在 .top 最上层，背景图使用精灵图 -->
    <div class="info">
      <!-- 使用精灵图 -->
      <i class="icon-music"></i>
      <span class="count">306万</span>
      <!-- 使用精灵图 -->
      <a class="icon-play" href="#"></a>
    </div>
  </div>
  <a class="bottom" href="#">
    <i class="iconall_sprite inconal_sprite_radio icon-radio"></i>
    一个健身女孩的{跑步歌单}
  </a>
</li>
```

css/main/main-recommond-section.css

```css
.main .area-left .recommend-section .content .box .top {
  /* top的宽高由img撑开 */
  position: relative;
}
.main .area-left .recommend-section .content .box .top img {
  vertical-align: top; /* 去除图片底部经典3px，临时解决办法 */
}
.main .area-left .recommend-section .content .box .top .cover {
  /* cover宽高占据整个top */
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-image: url(../../image/coverall.png); /* 设置对角线精灵图 */
  background-position: 0 0;
}
.main .area-left .recommend-section .content .box .top .info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 27px; /* info盖度为27px，设置在img底部 */
  background-image: url(../../image/coverall.png); /* 设置图片底部信息显示栏精灵图 */
  background-position: 0 -537px;
  /* 设置播放量字体 */
  font-size: 12px;
  color: #ccc;
  line-height: 27px;
}
.main .area-left .recommend-section .content .box .top .info .icon-music {
  display: inline-block;
  /* 设置音乐图标精灵图 */
  background-image: url(../../image/iconall.png);
  background-position: 0 -24px;
  width: 14px;
  height: 11px;
  /* 元素位置定位，微调 */
  position: relative;
  left: 10px;
  top: 2px;
}
.main .area-left .recommend-section .content .box .top .info .count {
  margin-left: 12px;
}
.main .area-left .recommend-section .content .box .top .info .icon-play {
  display: inline-block;
  /* 设置播放图标精灵图 */
  background-image: url(../../image/iconall.png);
  background-position: 0 0;
  width: 16px;
  height: 17px;
  /* 元素位置定位 */
  position: absolute; /* 子绝父绝 */
  top: 0;
  bottom: 0;
  right: 10px;
  margin: auto 0; /* 垂直居中 */
}
.main .area-left .recommend-section .content .box .top .info .icon-play:hover {
  background-position: 0 -60px;
}
```

底部描述 a.bottom

```css
.main .area-left .recommend-section .content .box .bottom {
  margin-top: 10px;
  font-size: 14px;
  display: block;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
.main .area-left .recommend-section .content .box .bottom:hover {
  text-decoration: underline;
}
```

a.bottom 中，可能会设置图标 i，为它设置精灵图样式。

```css
.icon-radio {
  position: relative;
  top: 2px;
}
.iconall_sprite {
  display: inline-block;
  background: url(../../image/icon.png);
}
.inconal_sprite_radio {
  background-position: -31px -658px;
  width: 35px;
  height: 15px;
}
```

---

主内容左侧区域，新碟上架区域样式，封装在该文加：css/main/main-disc-section.css

新碟上架区域的头部标题的排版布局的样式，和热歌推荐区域的相似。

```html
<div class="header_type_02">
  <div class="area_left">
    <h1 class="title">新碟上架</h1>
  </div>
  <div class="area_right">
    <a href="#" class="more">更多</a>
  </div>
</div>
```

...

---

主内容左侧区域，榜单区域样式。

...
