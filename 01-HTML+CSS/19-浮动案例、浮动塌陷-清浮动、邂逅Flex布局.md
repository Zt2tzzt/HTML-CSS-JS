# 浮动案例、浮动塌陷-清浮动、邂逅Flex布局

## 一、浮动案例

### 1.京东商城频道广场

浮动案例-京东商城频道广场布局实现。

知识点总结：

- 浮动的使用。
- margin 负值的使用（父元素中设置 margin 负值，抵消子元素中的 margin 正值）。

01-HTML+CSS\demo-project\float案例联系-京东商城频道广场.html

```html
<head>
  <title>Document</title>
  <style>
    .content {
      width: 1190px;
      margin: 0 auto;
      background-color: #f00;
      height: 1000px;
    }
    .content > .wrapper {
      margin-right: -10px; /* 使用 margin 负值，将 wrapper 的宽度拉伸 */
    }
    .content > .wrapper > .item {
      width: 290px;
      background-color: purple;
      margin-bottom: 10px;
      float: left;
      margin-right: 10px;
    }
    .content > .wrapper > .item.left {
      height: 370px;
    }
    .content > .wrapper > .item.right {
      height: 180px; /* 高度为left的一半+间隙10px */
    }
  </style>
</head>
<body>
  <div class="content">
    <div class="wrapper">
      <div class="item left"></div>
      <div class="item left"></div>
      <div class="item right"></div>
      <div class="item right"></div>
      <div class="item right"></div>
      <div class="item right"></div>
    </div>
  </div>
</body>
```

### 2.考拉商品边框处理

浮动案例-考拉商品边框处理，实现子元素在父容器中紧挨着布局。

- 思路一：包裹盒子加 bordre，放入小盒子，小盒子仅加右边的 border。需要做很多微调实现起来麻烦（不推荐）。
- 思路二：小盒子四边都加 border，使用 margin 负数值，将重复的 border 进行覆盖。这么做在最后会多出 1px，
  - 将所有小盒子平分宽度后，加 1px，表示边框；将某一个小盒子（一般是最后一个或者第一个）减去 1px（保持原来的平分宽度）。

知识点总结：

- 使用 margin 负值进行边框的重叠。

01-HTML+CSS\demo-project\float案例联系-考拉商品边框处理.html

```html
<head>
  <title>Document</title>
  <style>
    .content {
      width: 1100px;
      margin: 0 auto;
      height: 800px;
      background: #ccc;
    }
    .item {
      width: 221px;
      height: 168px;
      background: orange;
      color: #fff;
      float: left;
      border: 1px solid #000;
      margin-right: -1px; /* 使用负值，使上一个元素右边框覆盖下一个元素的左边框 */
      box-sizing: border-box;
    }
    .item.first {
      width: 220px; /* 给第一个小盒子，宽度减去1px，即保持平分的宽度 220px */
    }
  </style>
</head>

<body>
  <div class="content">
    <div class="box">
      <div class="item first">1</div>
      <div class="item">2</div>
      <div class="item">3</div>
      <div class="item">4</div>
      <div class="item">5</div>
    </div>
  </div>
</body>
```

## 二、浮动元素的塌陷、清浮动

浮动元素的塌陷，指的是浮动元素脱离了标准流，不再向父元素汇报高度，父元素计算高度时，导致了高度坍塌的问题。

清浮动，指的是父元素在计算总高度时，把浮动子元素高度算进去。

### 1.CSS clear 属性

CSS clear 属性，用于指定一个元素，是否必须移动到在它之前的浮动元素下面，常用的 4 个取值。

- `left`：元素的顶部低于之前生成的所有左浮动元素的底部。
- `right`：元素的顶部低于之前生成的所有右浮动元素的底部。
- `both`：元素的顶部低于之前生成的所有浮动元素的底部。
- `none`：默认值，无特殊要求。

### 2.清浮动四种方法

清除浮动的 3 种方法。

方法一：给父元素设置固定高度（不推荐），扩展性不好。

方法二：在父元素最后增加一个空的块级子元素，并给它声明 CSS 属性 `clear: both`（不推荐）。这么做，会增加很多无意义的空标签，维护麻烦；并违反了结构与样式分离的原则。

方法三：给父元素添加一个伪元素（推荐），编写好后，通过添加类名，轻松实现清除浮动。

- 方法三伪元素的兼容性写法如下：

```css
.clear_fix::after {
  content: '';
  clear: both;
  display: block; /* 伪元素 ::after 默认在后面添加行内级元素，将他改为块级元素 */
  /* 浏览器兼容 */
  visibility: hidden;
  height: 0;
}
.clear_fix {
  /* 浏览器兼容，IE6/7，缩放大小 */
  *zoom: 1;
}
```

```html
<div class="content">
  <!-- 给包裹元素添加清浮动类 -->
  <div class="wrapper clear_fix">
    <div class="item left"></div>
    <div class="item left"></div>
    <div class="item right"></div>
    <div class="item right"></div>
    <div class="item right"></div>
    <div class="item right"></div>
    <!-- 方法二的做法： <div class="line"></div> -->
  </div>
</div>
```

方法四：利用 BFC 的特性清除浮动。

01-HTML+CSS/demo-project/16-BFC解决浮动元素高度塌陷.html

```html
```



## 六、布局方案总结

截至目前所学的布局方案总结。

| 定位方案                         | 应用场景 |
| -------------------------------- | -------- |
| normal flow（标准流）            | 垂直布局 |
| absolute positioning（绝对定位） | 层叠布局 |
| float（浮动）                    | 水平布局 |

## 七、flex 布局

flex 布局（ flexible 布局，弹性布局），是使用 flexbox 来进行布局的方案。在移动端已完全普及，PC 几乎完全普及，少数网站依然在用浮动来布局，以提高兼容性。

长久以来，CSS 布局可跨浏览器兼容的布局工具只有 floats 和 positioning，他们实现的布局又 3 点痛点。

- 无法在父容器里面，垂直居中一个块内容。
- 无法使容器的所有子项，等分可用宽度/高度，而不管有多少宽度/高度可用。
- 无法使容器中多列布局的所有列，等分相同的高度，而不管它们包含的内容量多少。

使用 flex 布局的容器，称为弹性盒子（flexbox），是一种用于按行或列布局元素的一维布局盒子。

二维布局方法，grid，比 flex 强大，但兼容性较差。

弹性盒子中的元素，可以膨胀填充额外的空间, 收缩适应更小的空间。
