理解盒子模型案例一小米商城商品，实现过程。

css/reset.css

```css
body, p, h3 {
  margin: 0;
  padding: 0;
}
body {
  background-color: #f5f5f5;
  font: 12px/1.5 Helvetica Neue,Helvetica,Arial,Microsoft Yahei,Hiragino Sans GB,Heiti SC,WenQuanYi Micro Hei,sans-serif;
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

demo1.html

```html
<head>
  <link rel="stylesheet" href="./css/reset.css">
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
      box-shadow:  0 2px 20px 5px rgba(0, 0, 0, .1)
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
    <img src="../images/xiaomi01.webp" alt="">
    <h3 class="title">小米平板5 Pro</h3>
    <p class="desc">
      全新12代英特尔处理器，CNC一体精雕工艺，2.5K 120Hz高清屏，可选MX550独立显卡
    </p>
    <div class="price">
      <span class="new-price">2399元起</span>
      <span class="old-price">2499元</span>
    </div>
  </a>
</body>
```

5个注意事项。

1. 浏览器调试，使用`:hov`选项，调试元素的伪类状态。

2. 网站背景偏灰，通常设置颜色`#f5f5f5`。

3. 给案例引入重置样式。

4. 多文本单行显示省略号的方案。固定写法。

   ```css
   .item .desc {
     white-space: nowrap; /* 设置后不会换行 */
     overflow: hidden;
     text-overflow: ellipsis; /* ellipsis 省略的意思 */
   }
   ```

5. 使用选择器时，如后代选择器，不推荐超过4个。

------

理解盒子模型案例二头条新闻热搜条目，实现过程。

```html
<head>
  <title>Document</title>
  <link rel="stylesheet" href="./css/reset.css">
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
        <img src="https://i0.hdslb.com/bfs/archive/9c763bf06b7765462eac62cc0a9a34b260d3f9c8.jpg@672w_378h_1c.webp" referrerpolicy="no-referrer" alt="">
      </a>
    </div>
    <div class="info">
      <a href="#">
        <p>萌化了！谁会不喜欢毛茸茸的小懒懒呢？萌化了！谁会不喜欢毛茸茸的小懒懒呢？萌化了！谁会不喜欢毛茸茸的小懒懒呢？萌化了！谁会不喜欢毛茸茸的小懒懒呢？</p>
      </a>
      <a class="anchor" href="#">
        <span class="nickname">Muxi慕喜咩</span>
        <span class="time">3-20</span>
      </a>
    </div>
  </div>
</body>
```

4个注意事项
1. 解决b站视频封面url无法正常显示的方法：给img元素设置属性`referrerpolicy="no-referrer"`。

2. 插入图片的3种方案，

     1. img元素。
     2. 空元素 + background-img。
     3. 伪元素。

3. 多文本2行显示省略号方案。固定写法。

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

4. a元素设置 inline-block，包裹的p元素内容无限延申解决方案，
     1. 给a元素设置`width: 100%;`，意为占据父元素宽度，这样a元素就有了具体宽度。
     2. 给a元素设置`display: block;` 让a元素占据父元素的宽度，这样a元素就有了具体的宽度。

------

`background-image` 属性有什么用？

- 用于设置元素的背景图片。

设置多张图片方法，

- 设置的第一张图片将显示在最上面，其它图片按顺序层叠在下面。

```css
.box {
  background-image: url(../images/kobe01.jpg), url(../images/kobe02.png);
}
```

1个注意事项。

- 如果元素没有设置宽高，背景图片是不会显示出来的。

------

`background-repeat` 属性有什么用？

- 用于设置背景图片是否要平铺。

常见的设置4个。

- `repeat`：平铺
- `no-repeat`：不平铺
- `repeat-x`：只在水平方向平铺
- `repeat-y`：只在垂直平方向平铺

理解背景墙案例。

- 一张小图片，结合平铺属性，实现背景墙效果。

```css
.box {
  width: 600px;
  height: 600px;
  background-image: url(../images/wall.png);
  background-repeat: repeat;
}
```

------

`background-size` 属性有什么用？

- 用于设置背景图片的大小。

常见的设置5个。

- `auto`：默认值, 以背景图本身大小显示。
- `cover`：缩放背景图，以完全覆盖铺满元素,可背景图片部分看不见。
- `contain`：缩放背景图，宽度或者高度铺满元素，但是图片保持宽高比。
- \<percentage\>：百分比，相对于背景区（background positioning area）
- \<length\>：具体的大小，比如100px，第一个值宽度，第二个值高度。

理解语法。

- `[ <length-percentage> | auto ]{1,2} | cover | contain`

------

`background-position` 有什么用？

- 用于设置背景图片在水平垂直方向上的具体位置。

常用的设置3个。

- 可以设置具体的数值，比如 `20px` `30px`;
- 水平方向还可以设值：`left`、`center`、`right`
- 垂直方向还可以设值：`top`、`center`、`bottom`

1个注意事项。

- 如果只设置了1个方向，另一个方向默认是 `center`

------

浏览器缩放，背景图片总是展示中间部分的案例。

```css
.box {
  height: 489px;
  background-image: url(../images/mhxy.jpg);
  background-position: center;
}
```

------

`background-attachment` 属性有什么用？

- 决定背景图像的位置是在视口内固定，或者随着包含它的区块滚动。

常用的3个值。

- `scroll`：表示背景相对于元素本身固定， 而不是随着它的内容滚动。
- `local`：表示背景相对于元素的内容固定。如果一个元素拥有滚动机制，背景将会随着元素的内容滚动。
- `fixed`：表示背景相对于视口固定。即使一个元素拥有滚动机制，背景也不会随着元素的内容滚动。

------

理解 background 缩写属性的格式。

- `background-size` 可以省略，如果不省略，`background-size` 必须紧跟在 `background-position` 的后面
- 其他属性也都可以省略，而且顺序任意

------

`background-image` 和 `<img>` 元素的比较。

|                        | img              | background-image |
| ---------------------- | ---------------- | ---------------- |
| 性质                   | HTML元素         | CSS样式          |
| 图片是否占用空间       | ✔                | ❌                |
| 浏览器右键直接查看地址 | ✔                | ❌                |
| 支持 CSS Sprite 精灵图 | ❌                | ✔                |
| 更有可能被搜索引擎收录 | ✔（结合alt属性） | ❌                |

适用场景分别有哪些。

- img，作为网页内容的重要组成部分，比如广告图片、LOGO图片、文章配图、产品图片
- background-image，可有可无。有，能让网页更加美观。无，也不影响用户获取完整的网页内容信息