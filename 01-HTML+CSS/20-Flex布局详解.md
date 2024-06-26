# Flex 布局详解

## 一、flex 布局概念

### 1.flex Container

开启了 flex 布局的元素叫 `flex containerr`。

### 2.flex item 的概念

flex containerr 里面的**直接子元素**叫做 `flex item`。

flex item 具备的 3 点特性：

- flex item 布局受 flex containerr 属性的控制；
- flex item 不再严格区分块级元素和行内级元素（flex containerr 会区分）；
- flex item 默认宽高是包裹内容的宽高，但也可以设置宽高；

### 3.flex 布局设置

元素设置以下属性，则该元素会成为 flex container。

- `display: flex;`：表示 flex containerr 以 block-level 形式存在。
- `display: inline-flex;`：表示 flex containerr 以 inline-level 形式存在。

### 4.flex 布局模型图

理解 flex 布局模型图中的相关概念：

- 主轴（main axis），交叉轴（cross axis）。
- 主轴尺寸（main size），交叉轴尺寸（cross size）。
- 主轴开始位置（mian start），主轴结束位置（main end），
- 交叉轴开始位置（cross start），交叉轴结束位置（cross end）。

![flex布局模型](NodeAssets/flex模型图-主轴-交叉轴.jpg)

## 二、flex container 的属性

flex container 的相关属性：

- `flex-direction`
- `flex-wrap`
- `flex-flow`
- `justify-content`
- `align-items`
- `align-content`

### 1.flex-direction

flex container 的 `flex-direction` 属性，用于决定主轴（main axis）的方向，默认从 main start 到 main end。常用的设值如下：

- `row`：默认值，从 main start 到 main end。
- `row-reverse`：row 反转。
- `column`：从 cross start 到 cross end。
- `column-reverse`：column 反转。

### 2.flex-wrap

flex container 的 `flex-wrap` 属性，用于决定 flex-container 是单行还是多行。常用的设值如下：

- `nowrap`（默认）：单行。
- `wrap`：多行。
- `wrap-reverse`：多行（对比 wrap，cross start 与 cross end 相反）。

### 3.flex-flow

flex container 的 `flex-flow` 属性，是 `flex-direction` 和 `flex-wrap` 的简写，顺序任意，并且都可以省略。

### 4.justify-content

flex container 的 `justify-content` 属性，用于决定了 flex items 在 main axis 上的对齐方式。常用的 6 个设值有：

- `flex-start`：默认值，与 main start 对齐。
- `flex-end`：与 main end 对齐。
- `center`：居中对齐。
- `space-between`：flex items 之间的距离相等，与 main start、main end 两端对齐。
- `space-around`：flex items 之间的距离相等，与 main start、main end 之间的距离是 flex items 之间距离的一半。
- `space-evenly`：flex items 之间的距离相等，与 main start、main end 之间的距离 等于 flex items 之间的距离。

![justify-content的布局模型图](NodeAssets/flexContainer的justify-content属性值.jpg)

### 5.align-item

flex containerr 的 `align-item` 属性，用于决定 flex items 在 cross axis 上的对齐方式

常用的 6 个设置。

- `flex-start`：默认值，flex items 与 cross start 对齐。
- `flex-end`：flex items 与 cross end 对齐。
- `center`：flex items 居中对齐。
- `stretch`：当 flex items 在 cross axis 方向的 height 为 auto 时，会自动拉伸至填充 flex containerr。如果有固定 height，则不会。
- `normal`：在弹性布局中，效果和 stretch 一样。
- `baseline`：与基准线对齐。

![align-item的布局模型图](NodeAssets/flexContainerr的align-item属性.jpg)

### 6.align-content

flex containerr 的 `align-content` 属性，用于决定多行 flex items 在 cross axis 上的对齐方式，用法与 justify-content 类似，

用的较少，因为一般情况外部盒子不会设置固定高度，而是由内容撑开。常用的设值有：

- `flex-start`：与 cross start 对齐。
- `flex-end`：与 cross end 对齐。
- `center`：居中对齐。
- `stretch`：默认值，与 align-items 的 stretch 类似。
- `space-between`：flex items 之间的距离相等，与 cross start、cross end 两端对齐
- `space-around`：flex items 之间的距离相等，与 cross start、cross end 之间的距离是 flex items 之间距离的一半.
- `space-evenly`：flex items 之间的距离相等，与 cross start、cross end 之间的距离等于 flex items 之间的距离

![flexContainerr的align-content属性](NodeAssets/flexContainerr的align-content属性.jpg)

## 三、flex item 的属性

flex items 的相关属性。

- `order`
- `align-self`
- `flex-grow`
- `flex-shrink`
- `flex-basis`
- `flex`

### 1.order

flex item 的 `order` 属性，用于决定 flex item 的排布顺序。可以设置任意整数（正整数、负整数、0），值越小就越排在前面，默认值是 0

### 2.align-self

flex-item 的 `align-self` 属性，用于覆盖 flex container 设置的 `align-items`，效果与它一致。常用的设值有：

- `flex-start`
- `flex-end`
- `center`
- `stretch`
- `baseline`

![align-self布局模型](NodeAssets/flexItem的align-self属性.jpg)

### 3.flex-grow

flex item 的 `flex-grow` 属性，用于决定 flex items 如何拉伸

可以设置任意非负数字（正小数、正整数），默认值是 0。

当 flex container 在 main axis 方向上有剩余 size 时，flex-grow 属性才会有效。

- flex items 的 flex-grow 总和 sum 超过 1，每个 flex item 扩展的 size 为：
  - flex container 的剩余 size \* ( flex-grow / flex-grow sum )。
- flex items 扩展后的最终 size 不能超过 max-width \ max-height。

![flex-grow布局模型](NodeAssets/flexItem的flex-grow属性.jpg)

### 4.flex-shrink

flex item 的 `flex-shrink` 属性，用于决定 flex items 如何收缩。

可以设置任意非负数字（正小数、正整数、0），默认值是 1。

当 flex items 在 main axis 方向上超过了 flex container 的 size，flex-shrink 属性才会有效

- 如果所有 flex items 的 flex-shrink 总和 sum 超过 1，每个 flex item 收缩的 size 为：
  - flex items 超出 flex container 的 size \* (flex-shrink / flex-shrink sum)
- flex items 收缩后的最终 size 不能小于 min-width \ min-height

### 5.flex-basis

flex item 的 `flex-basis` 属性，用于设置 flex items 在 main axis 方向上的 base size。默认值 auto、表示具体的宽度数值（如 100px）。

使用场景：将很长的英文单词显示出来，用来扩展宽度。

决定 flex items 最终宽高的因素，从优先级高到低：

1. max-width \ max-height \ min-width \ min-height
2. flex-basis
3. width \ height
4. 内容本身的 size

### 6.flex

flex item 的 `flex` 属性，是 `flex-grow`、`flex-shrink`、`flex-basis` 的简写，

flex 属性可以指定 1 个，2 个或 3 个值。语法如下：

- `none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]]`

单值语法：

- 无单位，被当作 `flex-grow`，有单位，被当作 `flex-basis`；
- 可设置关键字：`none`（相当于 0 0 auto），`auto`（相当于 1 1 auto），`initial`（相当于 0 1 auto）

双值语法：

- 第一个值必须为一个无单位数，并且它会被当作 `flex-grow` 的值。
- 第二个值必须为以下之一：
  - 一个无单位数：它会被当作 `flex-shrink` 的值。
  - 一个有单位的值: 它会被当作 `flex-basis` 的值。

三值语法：

- 第一个值必须为一个无单位数，并且它会被当作 `flex-grow` 的值。
- 第二个值必须为一个无单位数，并且它会被当作 `flex-shrink` 的值。
- 第三个值必须为一个有效的宽度值， 并且它会被当作 `flex-basis` 的值

## 四、解决 justify-content: space-between; 最后一行显示不对齐的问题

如何解决 `justify-content: space-between;` 布局后，最后一行显示不对齐的问题，如图所示。案例理解。

![](NodeAssets/justify-content space-between布局后的问题.jpg)

解决办法：添加 (列数- 2) 个没有高度的元素，可以是 i、span 等等。

01-HTML+CSS/demo-project/10-justify-content:-space-between最后一行显示不对齐的问题.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Demo</title>
    <style>
      .container {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        width: 700px;
        background-color: orange;
      }
      .item {
        width: 110px; /* 比较container的宽度可知，每一行会有4个container */
        height: 140px;
      }
      .container > i {
        /* i元素成为 flex item 后，不严格区分行内级元素，可设置宽度 */
        width: 110px; /* 占位元素需要有宽度 */
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="item">1</div>
      <div class="item">2</div>
      <div class="item">3</div>
      <div class="item">1</div>
      <div class="item">2</div>
      <div class="item">3</div>
      <div class="item">1</div>
      <div class="item">2</div>
      <div class="item">3</div>
      <div class="item">3</div>
      <div class="item">3</div>
      <div class="item">3</div>
      <div class="item">3</div>
      <div class="item">3</div>
      <!-- 添加 i 的个数是列数减2，也就是 6-2=4个 -->
      <i></i>
      <i></i>
      <i></i>
      <i></i>
    </div>

    <script>
      // Get all elements with class "item"
      const items = document.querySelectorAll('.item');

      // Set a random background color for each item
      items.forEach(item => {
          const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
          item.style.backgroundColor = randomColor;
      });
  </script>
  </body>
</html>
```
