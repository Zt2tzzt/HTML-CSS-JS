# 右侧固定 Nav

在右侧固定放上一个 Nav 导航，里面有二维码，里面有公众号二维码，官方微博，微信公众号，微信视频号的链接。

使用绝对定位的方式，进行剧中布局：

css\right_nav.css

```css
.right-nav {
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  right: 0;
  width: 254px;
  height: 494px;
  background: url(../img/right_nav_bg.png) no-repeat;
}
```

使用“子绝父x相”，对右上方图片区域内的文字进行定位，使得文字处于图片的对话框中：

css\right_nav.css

```css
.right-nav .right-dj .desc {
  position: absolute;
  top: 37px;
  left: 12px;
  width: 100px;
  height: 36px;
  font-size: 14px;
  text-indent: 2px;
  font-weight: bold;
  line-height: 18px;
  color: #62401b;
  overflow: hidden;
}
```

使用 `text-align: center;` 将块级元素中的图片剧中。

css\right_nav.css

```css
.right-nav .right-list .item a {
  display: block;
  height: 100%;
}

.right-nav .right-list .item.code {
  height: 116px;
  text-align: center;
  background-position: 0 -3px;
}
```

二维码和链接，都是用的是精灵图，并通过动态伪类，定义不同的状态效果：
css\right_nav.css

```css
.right-nav .right-list .item {
  width: 117px;
  height: 38px;
  background: url(../img/right_all.png) no-repeat;
}

.right-nav .right-list .item.weibo {
  background-position: -122px -120px;
}
.right-nav .right-list .item.weibo:hover {
  background-position: -122px -240px;
}

.right-nav .right-list .item.gzh {
  background-position: -122px -160px;
}
.right-nav .right-list .item.gzh:hover {
  background-position: -122px -200px;
}

.right-nav .right-list .item.sph {
  background-position: -122px 0;
}
.right-nav .right-list .item.sph:hover {
  background-position: -122px -42px;
}
```

