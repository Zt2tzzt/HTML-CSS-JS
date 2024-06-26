# CSS元素定位-zindex、float浮动-margin负值、行内及元素之间空格处理

## 一、sticky 粘性定位

粘性定位 `position: sticky;` 是较新的属性. 可能存在兼容性问题。它可看做相对定位和固定（绝对）定位的结合体。被定位的元素，表现得像相对定位一样，直到它滚动到某个阈值点时，变成固定（绝对）定位。相对于最近的滚动祖先包含的滚动视口（the nearest ancestor scroll container’s scrollport）

```css
.box > .topbar {
  background-color: #f00;
  position: sticky;
  top: 0; /* 距离视口顶部 0px 时，达到阔值点，元素变为固定定位 */
}
```

## 二、CSS z-index 属性

CSS 属性 z-index，用来设置**定位元素**的层叠顺序（仅对定位元素有效），取值可以是正数，负数，0。默认值是 auto，实际上是 0。

z-index 比较原则 2 点。

- 兄弟关系比较原则：

  - z-index 越大，层叠在越上面。
  - z-index 相等，写在后面的那个元素层叠在上面。

- 非兄弟关系比较原则：

  - 相比较的元素各自从**元素自己**以及**祖先元素**中，找出最邻近的 2 个定位元素进行比较，这 2 个定位元素必须有设置 z-index 的具体数值

## 三、float 浮动

浮动 float 属性，用于指定元素沿其容器的左侧或右侧放置，允许**文本**和**内联元素**环绕它。

浮动 float 的历史地位和作用：

- 最初只用于在一段文本内浮动图像, 实现文字环绕的效果。
- 早期 CSS 标准中，没有提供左右布局方案, 因此在一段时间里 float 成为网页多列布局的最常用工具。

绝对定位、浮动，都会让元素**脱离标准流**。

float 常用的 3 个取值：

- `none`：默认值，表示不浮动。
- `left`：表示向左浮动。
- `right`：表示向右浮动。

浮动规则：

- 规则一：元素浮动后, 脱离标准流：
  - **定位元素**会层叠在浮动元素上面。
  - 浮动元素不会向父元素汇报高度（这是引起“塌陷”的原因），
  - 不严格区分行内级、块级元素，
  - 可设置宽高，宽高默认由内容决定。
- 规则二：元素浮动，不能超出包含块的左（右）边界。
- 规则三：浮动元素之间不能层叠：
  - 如果前一个浮动元素已就位，后浮动的元素将紧贴着前一个浮动元素。
  - 如果水平方向剩余的空间不够显示浮动元素，浮动元素将向下移动，直到有充足的空间为止。
- 规则四：浮动元素不能与行内级元素层叠，行内级元素将会被浮动元素推出。
  - 比如：行内级元素、行内块级元素、块级元素的文字内容。
- 规则五：浮动只能向左或向右浮动，不能向上或下浮动，如有需求，需要改变元素的位置。
- 规则六：行内级元素、行内块级元素浮动后，其顶部将与所在行的顶部对齐。

## 四、行内及元素之间的空格处理

将多个行内级元素之间代码换行，造成的空格，去掉的方法 4 个。

- 方法一：删除换行符(不推荐)，会导致代码阅读性差。
- 方法二：给父级元素设置 `font-size: 0;` 但是需要子元素设置回来（因为子元素会继承 font-size 属性）。
- 方法三：将行内级元素统一向一个方向浮动。
- 方法四：flex 布局。

## 五、float 浮动案例练习

### 1.百度页码

知识点总结：

- a、ui、li 元素的样式重置。
- float 的使用。

01-HTML+CSS\demo-project\float案例练习-百度页码.html

```html
<head>
  <title>Document</title>
  <style>
    /* 重置样式 */
    a {
      text-decoration: none;
      color: #333;
    }
    ul,
    li {
      padding: 0;
      margin: 0;
      list-style: none;
    }
    
    /* 全局样式 */
    body {
      background-color: #f5f5f5;
    }
    
    /* 普通样式 */
    li {
      background-color: #fff;
      width: 36px;
      height: 36px;
      float: left;
      margin-right: 12px;
      text-align: center;
      line-height: 36px;
    }
    li > a {
      display: inline-block;
      width: 100%;
      height: 100%;
      color: #3951b3;
      border-radius: 6px;
    }
    li > a:hover {
      color: #fff;
      background-color: #3951b3;
    }
    .next {
      width: 80px;
    }
  </style>
</head>
<body>
  <div class="box">
    <ul>
      <li><a href="#">1</a></li>
      <li><a href="#">2</a></li>
      <li><a href="#">3</a></li>
      <li><a href="#">4</a></li>
      <li><a href="#">5</a></li>
      <li><a href="#">6</a></li>
      <li><a href="#">7</a></li>
      <li><a href="#">8</a></li>
      <li><a href="#">9</a></li>
      <li><a href="#">10</a></li>
      <li class="next"><a href="#">下一页</a></li>
    </ul>
  </div>
</body>
```

### 2.京东商品（margin 负值的使用）

理解浮动案例，京东商品的实现过程，理解 margin 负值的作用。

- 依据公式：父元素的宽度 = 子元素的宽度 + margin-right + margin-left（以下案例中，box 相对于 content 是子元素）。
- 块级子元素的宽度：默认值是 auto，也就是父元素的宽度，设置 margin-right 负值后，宽度强行拉伸。

01-HTML+CSS\demo-project\float案例联系-京东商品.html

```html
<head>
  <title>Document</title>
  <style>
    /* 公共的 class */
    .content {
      width: 1190px;
      margin: 0 auto;
      background-color: orange;
      height: 800px;
    }
    /* 布局样式 */
    .box {
      /* 父容器 .box 设置 margin 负值，用于抵消子元素中的 margin 正值 */
      /* x = 230 * 5 + 10 * 5 + (-10) = 1200 ，意为 box 的宽度被撑开 10px 后成为 1200px */
      margin-right: -10px;
    }
    .item {
      width: 230px;
      height: 322px;
      background-color: purple;
      color: #fff;
      /* 浮动 */
      float: left;
      margin-right: 10px;
    }
  </style>
</head>

<body>
  <div class="content">
    <div class="box">
      <div class="item">1</div>
      <div class="item">2</div>
      <div class="item">3</div>
      <div class="item">4</div>
      <div class="item">5</div>
    </div>
  </div>
</body>
```
