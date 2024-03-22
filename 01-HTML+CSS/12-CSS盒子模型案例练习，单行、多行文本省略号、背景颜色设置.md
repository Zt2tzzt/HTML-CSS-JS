# CSS盒子模型案例练习，单行、多行文本省略号、背景颜色设置

## 一、盒子模型案例练习

### 1.小米商城商品案例

理解盒子模型案例一小米商城商品，实现过程。

知识点总结：

- body、p、h、a 元素的样式重置。
- 行内块级元素的居中展示。
- 单行文字过多内容显示省略号。

01-HTML+CSS/demo-project/04-小米商城商品案例/reset.css

```css
body,
p,
h3 {
  margin: 0;
  padding: 0;
}
body {
  background-color: #f5f5f5;
  font: 12px/1.5 Helvetica Neue, Helvetica, Arial, Microsoft Yahei, Hiragino Sans GB, Heiti SC,
    WenQuanYi Micro Hei, sans-serif;
}
h3 {
  font-weight: 400;
}

/* a的重置 */
a {
  text-decoration: none;
  color: #333;
  font-size: 12px;
}
```

01-HTML+CSS/demo-project/04-小米商城商品案例/index.html

```html
<head>
  <!-- 给案例引入重置样式。-->
  <link rel="stylesheet" href="./css/reset.css" />
  <style>
    body {
      text-align: center;
    }
    .item {
      display: inline-block;
      width: 234px;
      height: 300px;
      padding: 20px 10px;
      text-align: center;
      background-color: #fff;
      box-sizing: border-box;
    }
    .item:hover {
      box-shadow: 0 2px 20px 5px rgba(0, 0, 0, 0.1);
    }
    .item img {
      width: 160px;
      height: 160px;
    }
    .item .title {
      margin-top: 14px;
    }
    .item .desc {
      color: #999;
      margin-top: 8px;

      /* 单行显示省略号 */
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis; /* 省略的意思 */
    }
    .item .price {
      margin-top: 14px;
      font-size: 14px;
    }
    .item .new-price {
      color: #ff6700;
    }
    .item .old-price {
      color: #999;
      text-decoration: line-through;
      margin-left: 5px;
    }
  </style>
</head>
<body>
  <a class="item" href="https://www.mi.com/xiaomipad5pro" target="_blank">
    <img src="../images/xiaomi01.webp" alt="" />
    <h3 class="title">小米平板5 Pro</h3>
    <p class="desc">全新12代英特尔处理器，CNC一体精雕工艺，2.5K 120Hz高清屏，可选MX550独立显卡</p>
    <div class="price">
      <span class="new-price">2399元起</span>
      <span class="old-price">2499元</span>
    </div>
  </a>
</body>
```

> 注意事项：
>
> 浏览器调试，使用`:hov`选项，调试元素的伪类状态。
>
> 网站背景偏灰，通常设置颜色`#f5f5f5`。
>
> 使用选择器时，如后代选择器，不推荐超过 4 个。

### 2.单行文本省略号

单行文本过多内容显示省略号的固定写法。

```css
.item .desc {
  white-space: nowrap; /* 设置后不会换行 */
  overflow: hidden;
  text-overflow: ellipsis; /* ellipsis 省略的意思 */
}
```

### 3.头条新闻热搜条目

理解盒子模型案例二：头条新闻热搜条目，实现过程。

知识点总结：

- 在 a 元素中包裹 img、p 元素。
- 多行文本过多内容显示省略号。
- 伪元素 before 的使用。

01-HTML+CSS/demo-project/05-头条新闻热搜条目/index.html

```html
<head>
  <title>Document</title>
  <link rel="stylesheet" href="./css/reset.css" />
  <style>
    a {
      display: block;
    }
    .item {
      width: 300px;
      margin: 0 auto;
    }
    .item .album img {
      width: 100%;
      border-radius: 8px;
    }
    .item .info p {
      font-size: 15px;
      margin-top: 8px;
      /* 显示一行 */
      /* white-space: nowrap; */
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
    .item .info .anchor {
      font-size: 13px;
      color: #888;
      margin-top: 5px;
    }
    .item .info .anchor::before {
      content: url(../images/widget-up.svg);
      display: inline-block;
      width: 16px;
      height: 16px;
      position: relative;
      top: 1px;
    }
  </style>
</head>
<body>
  <div class="item">
    <div class="album">
      <a href="#">
        <img
          src="https://i0.hdslb.com/bfs/archive/9c763bf06b7765462eac62cc0a9a34b260d3f9c8.jpg@672w_378h_1c.webp"
          referrerpolicy="no-referrer"
          alt=""
        />
      </a>
    </div>
    <div class="info">
      <a href="#">
        <p>
          萌化了！谁会不喜欢毛茸茸的小懒懒呢？萌化了！谁会不喜欢毛茸茸的小懒懒呢？萌化了！谁会不喜欢毛茸茸的小懒懒呢？萌化了！谁会不喜欢毛茸茸的小懒懒呢？
        </p>
      </a>
      <a class="anchor" href="#">
        <span class="nickname">Muxi慕喜咩</span>
        <span class="time">3-20</span>
      </a>
    </div>
  </div>
</body>
```

注意事项：

> 解决 b 站视频封面 url 无法正常显示的方法：给 img 元素设置属性 `referrerpolicy="no-referrer"`。
>
> 插入图片的 3 种方案，
>
> - img 元素。
> - 空元素 + background-img。
> - 伪元素。

a 元素设置 inline-block，包裹的 p 元素内容无限延申解决方案，

- 方案一：给 a 元素设置 `width: 100%;`，意为占据父元素宽度，这样 a 元素就有了具体宽度。
- 方案二：给 a 元素设置 `display: block;`，让 a 元素占据父元素的宽度，这样 a 元素就有了具体的宽度。

### 4.多行文本省略号

多文本 2 行显示省略号方案。固定写法。

```css
div {
  /* white-space: nowrap; */
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box; /* flex 布局的前身，现在多用于做多行保留场景。 */
  -webkit-line-clamp: 2; /* clamp 保留，保持 */
  -webkit-box-orient: vertical;
}
```

## 二、background 属性

### 1.background-image 属性

`background-image` 属性，用于设置元素的背景图片。

设置多张图片方法，设置的第一张图片，将显示在最上面，其它图片按顺序层叠在下面。

```css
.box {
  background-image: url(../images/kobe01.jpg), url(../images/kobe02.png);
}
```

==注意事项：如果元素没有设置宽高，背景图片是不会显示出来的。==

#### 1.background-image CSS 属性和 img 元素

`background-image` 和 `<img>` 元素的比较。

| 对比项目               | img                | background-image |
| ---------------------- | ------------------ | ---------------- |
| 性质                   | HTML 元素          | CSS 样式         |
| 图片是否占用空间       | ✔                  | ❌                |
| 浏览器右键直接查看地址 | ✔                  | ❌                |
| 支持 CSS Sprite 精灵图 | ❌                  | ✔                |
| 更有可能被搜索引擎收录 | ✔（结合 alt 属性） | ❌                |

background-image CSS 属性和 img 元素适用场景分别有哪些。

- img，作为网页内容的重要组成部分，比如广告图片、LOGO 图片、文章配图、产品图片
- background-image，可有可无。有，能让网页更加美观。无，也不影响用户获取完整的网页内容信息

### 2.background-repeat 属性

`background-repeat` 属性，用于设置背景图片是否要平铺。

- `repeat`：平铺。
- `no-repeat`：不平铺。
- `repeat-x`：只在水平方向平铺。
- `repeat-y`：只在垂直平方向平铺。

一张小图片，结合平铺属性，可以实现背景墙效果。

```css
.box {
  width: 600px;
  height: 600px;
  background-image: url(../images/wall.png);
  background-repeat: repeat;
}
```

### 3.background-size 属性

`background-size` 属性，用于设置背景图片的大小。

- `auto`：默认值, 以背景图本身大小显示。
- `cover`：按比例缩放背景图，以完全覆盖铺满元素（背景图片部分可能看不见）。
- `contain`：按比例缩放背景图，宽度或者高度铺满元素（图片会显示完整）。
- \<percentage\>：百分比，相对于背景区（background positioning area）
- \<length\>：具体的大小，比如 `100px 100px`，第一个值宽度，第二个值高度。

语法总结：`[ <length-percentage> | auto ]{1,2} | cover | contain`

### 4.background-position 属性

`background-position` 属性，用于设置背景图片在水平、垂直方向上的具体位置。

- 可以设置具体的数值，比如 `20px 30px`，第一个值表示水平方向，第二个值表示垂直方向。
- 第一个值（水平方向）还可以设值：`left`、`center`、`right`。
- 第二个值（垂直方向）还可以设值：`top`、`center`、`bottom`。

如果只设置了 1 个方向，另一个方向默认是 `center`。

浏览器缩放，背景图片总是展示中间部分的案例。

```css
.box {
  height: 489px;
  background-image: url(../images/mhxy.jpg);
  background-position: center;
}
```

### 5.background-attachment 属性

`background-attachment` 属性，用于决定背景图像的位置是在视口内固定，还是随着包含它的区块滚动。

- `scroll`：表示背景相对于元素本身固定， 而不是随着它的内容滚动。
- `local`：表示背景相对于元素的内容固定。如果一个元素拥有滚动机制，背景将会随着元素的内容滚动。
- `fixed`：表示背景相对于视口固定。即使一个元素拥有滚动机制，背景也不会随着元素的内容滚动。

### 6.background 属性缩写

background 缩写属性的格式：

- `background-size` 可以省略，如不省略，`background-size` 必须紧跟在 `background-position` 的后面
- 其他属性也都可以省略，而且顺序任意。
