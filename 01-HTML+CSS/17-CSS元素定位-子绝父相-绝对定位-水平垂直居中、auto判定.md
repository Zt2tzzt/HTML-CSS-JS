# CSS元素定位-子绝父相-绝对定位-水平垂直居中、auto判定

## 一、absolute 绝对定位

绝对定位 absolute 的特性 2 点。

- 元素脱离标准流（脱标）。
- 可以通过 `left`、`right`、`top`、`bottom` 进行定位
  - 定位参照对象是**最邻近的定位祖先**元素。
  - 如果找不到这样的祖先元素，参照对象是视口。

## 二、子绝父相

元素嵌套定位案例的实现。

```html
<head>
  <style>
    .container {
      width: 500px;
      height: 400px;
      background-color: #f00;
      position: relative;
    }
    
    /* .box 和 container 形成子绝父相 */
    .container > .box {
      width: 300px;
      height: 200px;
      background-color: #0f0;
      position: absolute;
      bottom: 0;
      right: 0;
    }
    
    /* span 和 .box 形成子绝父绝 */
    .container > .box > span {
      position: absolute;
      bottom: 0;
      left: 0;
    }
  </style>
</head>

<body>
  <div class="container">
    <div class="box">
      <span>我是内容</span>
    </div>
  </div>
</body>
```

通常，子元素的绝对定位都是相对于父元素进行定位（子元素脱标，相对于父元素进行定位，父元素不脱标）：

1. 父元素设置 `position: relative;`（让父元素成为相对定位元素，而且父元素不脱离标准流）。
2. 子元素设置 `position: absolute;`。

简称为“子绝父相"。

## 五、绝对定位元素

将 position 设置为 **absolute / fixed** 元素，称为 **绝对定位元素**（absolutely positioned element）。

position 值对应元素性质对比：

|                     | 脱离标准流 | 定位元素 | 绝对定位元素 | 定位参照对象                             |
| ------------------- | ---------- | -------- | ------------ | ---------------------------------------- |
| static - 静态定位   | ❌         | ❌       | ❌           | ❌                                       |
| relative - 相对定位 | ❌         | ✔        | ❌           | 元素自己原来的位置                       |
| absolute - 绝对定位 | ✔          | ✔        | ✔            | 最邻近的祖先定位元素（找不到，参照视口） |
| fixed - 固定定位    | ✔          | ✔        | ✔            | 视口                                     |

绝对定位元素的特点（一）5 点。

- 宽高默认由内容决定，可以随意设置宽高。
- 脱离标准流（不再严格按照从上到下、从左到右排布）。
- 不再严格区分块级（block）、行内级（inline），行内块级（inline-block）元素，它们的很多特性都会消失。
- 不再给父元素汇报宽高数据（此时如果父元素没有设置宽高，那么父元素会消失）。
- 脱标元素内部默认还是按照标准流布局。

### 1.绝对定位元素的宽、高计算

对于绝对定位元素来说：

- 宽度（固定） = `left + right + margin-left + margin-right + 绝对定位元素的实际占用宽度`。
- 高度（固定） = `top + bottom + margin-top + margin-bottom + 绝对定位元素的实际占用高度`。

利用以上 2 个公式，实现的绝对定位元素的水平、垂直居中，是绝对的居中显示，不存在兼容性问题。

衍生出的 2 点规律。

### 2.绝对定位元素铺满参照元素

给绝对定位元素设置属性：left: 0、right: 0、top: 0、bottom: 0、margin: 0（不设置宽或高，浏览器会优先把父元素的宽高分配给绝对定位元素，导致宽或高占据父元素的 100%）。

### 3.绝对定位元素在参照元素中居中

给绝对定位元素设置属性：left: 0、right: 0、top: 0、bottom: 0、margin: auto。具体的宽、高值。

## 六、auto 值的判定

`auto` 值，一般意为交给浏览器处理。

定位元素，left、right 等等属性，设置成 auto，一般浏览器不会做等分处理。

给以下元素设置 `width: auto;`分别有什么含义？

- 行内元素 -> width: 包裹内容的宽度。
- 块级元素 -> width: 包含块的宽度。
- 绝对定位元素 -> width: 包裹内容的宽度。

## 七、网易云音乐item案例

知识点总结：

- 绝对定位的使用。
- 精灵图的使用。

01-HTML+CSS/demo-project/09-绝对定位-网易云音乐item/index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>网易云音乐</title>
    <link rel="stylesheet" href="./index.css" />
  </head>
  <body>
    <ul>
      <li class="box">
        <div class="top">
          <!-- .top 最底层 -->
          <img src="../../images/music_item.jpg" alt="健身女孩" />
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
        <a class="bottom" href="#"> 一个健身女孩的{跑步歌单} </a>
      </li>
    </ul>
  </body>
</html>

```

01-HTML+CSS/demo-project/09-绝对定位-网易云音乐item/index.css

```css
/* 重置样式 */
body,
ul,
li {
  margin: 0;
  padding: 0;
}
ul li {
  list-style: none;
}
a {
  text-decoration: none;
  color: #333;
}

/* 公共样式 */
/* 普通样式 */
.box {
  width: 140px;
  height: 204px;
  margin: 10px auto;
}
.box .top {
  /* top 的宽高由img撑开 */
  position: relative;
}
.box .top img {
  vertical-align: top; /* 去除图片底部经典3px，临时解决办法 */
}
.box .top .cover {
  /* cover宽高占据整个top */
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-image: url(https://s2.music.126.net/style/web2/img/coverall.png?c3f6557b90288c705d1fb2ea6549f303); /* 设置对角线精灵图 */
  background-position: 0 0;
}
.box .top .info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 27px; /* info 盖度为 27px，设置在 img 底部 */
  background-image: url(https://s2.music.126.net/style/web2/img/coverall.png?c3f6557b90288c705d1fb2ea6549f303); /* 设置图片底部信息显示栏精灵图 */
  background-position: 0 -537px;
  /* 设置播放量字体 */
  font-size: 12px;
  color: #ccc;
  line-height: 27px;
}
.box .top .info .icon-music {
  display: inline-block;
  /* 设置音乐图标精灵图 */
  background-image: url(https://s2.music.126.net/style/web2/img/iconall.png?f73c146a001f5fe7f01b30bb88f8d42a);
  background-position: 0 -24px;
  width: 14px;
  height: 11px;
  /* 元素位置定位，微调 */
  position: relative;
  left: 10px;
  top: 2px;
}
.box .top .info .count {
  margin-left: 12px;
}
.box .top .info .icon-play {
  display: inline-block;
  /* 设置播放图标精灵图 */
  background-image: url(https://s2.music.126.net/style/web2/img/iconall.png?f73c146a001f5fe7f01b30bb88f8d42a);
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
.box .top .info .icon-play:hover {
  background-position: 0 -60px;
}
.box .bottom {
  margin-top: 10px;
  font-size: 14px;
  display: block;
}
.box .bottom:hover {
  text-decoration: underline;
}

```
