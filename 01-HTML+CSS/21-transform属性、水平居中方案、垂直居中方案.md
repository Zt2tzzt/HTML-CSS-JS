# transform属性、水平居中方案、垂直居中方案

## 一、transform 属性

transform 属性，用于对元素进行形变，包括平移，旋转，缩放，倾斜等。

> transform 对于行内级元素、table columns / table colums-group 是无效的；

## 二、transform 常见函数

平移：`translate(x, y)`

缩放：`scale(x, y)`

旋转：`rotate(deg)`

倾斜：`skew(deg, deg)`

### 1.translate 函数

translate 函数，用于移动元素在平面上的位置。

语法：`none | <transform-function>+`；

> 上面的语法中，`+`  代表可写一个或多个值，以空格区分。
>
> ```css
> .box {
>   transform: translate(50px) scale(1.2) rotate(45deg);
> }
> ```
>
> `#`  代表可写一个或多个，以逗号区分。
>
> ```css
> .box {
>  box-shadow: 1px 1px 1px 1px #f00, 5px 5px 5px #ccc;
> }
> ```

可设值个数，

- 一个值，设置 x 轴上的位移。
- 二个值，设置 x 轴，y 轴上的位移。

可设值类型。

- 数字：如 100px
- 百分比：参照元素本身（refer to the size of bounding box）。

#### 1.translateX 和 translateY

`translate` 函数是 `translateX` 和 `translateY` 函数的简写（translate3d 后续了解）；

百分比可以完成一个元素的水平、垂直居中，下面以垂直居中为例：

```css
.box1 {
  position: relative;
}

.box1 .box3 {
  width: 100px;
  height: 100px;
  background-color: #f00;

  /* 2步:
      1.让元素向下位移包含快的 50%
      2.让元素向上位移自身的 50%
  */
  /* margin-top 的百分比是相对于包含块（父元素）的宽度，所以不能用 margin-top，而是使用绝对定位和 top */
  position: absolute;
  top: 50%; /* 相对于包含快的高度，包含快必须有高度 */

  transform: translate(0, -50%); /* 相对于自身向上位移 50% */
}
```

#### 2.translate 相比 flex

`translate` 函数，相对于 flex 布局的兼容性会好一点点。

#### 3.translate 相比 position

`translate` 函数是浏览器渲染时，做了位移，而 `position` 定位元素，实际改变了元素位置。

### 2.scale 函数

transform 属性 scale 函数，用于改变元素的大小。

可设值个数：

- 一个值，设置 x 轴上的缩放。
- 二个值，设置 x 轴和 y 轴上的缩放。

可设值类型；

- 数字：1 保持不变，2 放大一倍，0.5 缩小一半.
- 百分比：百分比不常用。

`scale(xxx, xxx)`是 `scaleX(xxx)` 和 `scaleY(xxx)` 的缩写。

### 3.rotate 函数

transform 属性 rotate 函数作用：旋转元素。

可设值个数：

- 一个值时，表示旋转的角度。

可设值类型：

- 常用单位 deg：表示旋转的角度（ degrees ）。**正数为顺时针。负数为逆时针**。

`rotate` 函数是 `rotateZ` 函数的简写写法（`rotate3d` 后续了解）。

`rotate` 函数的其他单位：

- 度（degrees）；
- 百分度（gradians，90deg = 100grad）；
- 弧度（radians）
- 圈数（tums）。

### 4.skew 函数

transform 属性 skew 函数，用于定义一个元素在二维平面上的倾斜转换。

可设值的个数：

- 一个值时，表示 x 轴上的倾斜。
- 二个值时，表示 x 轴和 y 轴上的倾斜。

可设值的类型：

- deg：倾斜的角度。正数为顺时针。负数为逆时针。

```css
.box {
  transform: skew(10deg, -10deg); /* 相当于 .box 逆时钟旋转 10 度 rotate(-10deg) */
}
```

倾斜的原点受 `transform-origin` 属性的影响。

## 三、transform-origin 属性

transform-origin 属性，用于设置元素形变的原点，如在进行 scale 缩放，rotate 旋转，skew 倾斜时，都会有一个原点。

可设值的个数：

- 一个值：设置 x 轴的原点。
- 两个值：设置 x 轴和 y 轴的原点。

可设值的类型：

- 关键字：`left`，`center`，`right`，`top`，`bottom`
- 带单位的数值：从左上角开始计算。
- 百分比：参考元素本身宽、高大小。

```css
.box {
  transform-origin: center 25%;
}
```

## 四、水平居中方案 5 点总结

方案一：将要居中的元素，设为行内级元素，或行内块级元素，再为父元素设置 `text-align: center;`。

方案二：将要居中的元素，设为块级元素，再为当前块级元素设置 `margin: 0 auto;`。

方案三：向左位移父元素的 50%，在向右位移自身的 50%，可以有如下实现方式：

- 将要居中的元素，设为块级元素，再设置  `margin-left: 50%` 和 `transform: translate(-50%)`。
- 将要居中的元素设为相对定位元素，再设置  `margin-left: 50%` 和 `left: [元素一半宽度]`。
- 将要居中的元素设为绝对定位元素，再设置 `left: 50%;` 和  `transform: translate(-50%)`。

> 方案三，参考[梦幻西游背景图居中案例](../16-精灵图、cusor属性、HTML标准流、CSS元素定位-图片居中展示.md/#3.relative 相对定位)
>
> ```css
> .box img {
>   margin-left: 50%; /* 向右边移动 .box 的一半 */
>
>   /* ---------伪代码------------ */
>   /* 第一种方案 */
>   position: relative;
>   left: -960px; /* left: 图片的一半宽度 */
>
>   /* 第二种方案 */
>   transform: translate(-50%); /* translate 中的百分比是相对于自己 */
>   /* ---------伪代码------------ */
> }
> ```

方案四：利用子绝父相的特性，将要居中的元素，设为绝对定位元素，在该元素有具体宽度情况下，设置 `left: 0; right: 0; margin: 0 auto;`

```css
.box {
  position: relative;
}

.box img {
  width: 66px;
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
}
```

方案五：设置要居中的元素的父容器，为 flex 布局，并为父容器设置 `justify-content: center;`。

```css
.container {
  width: 500px;
  display: flex;
  justify-content: center;
}
```

## 四、垂直居中方案 3 点总结

方案一：利用子绝父相的特性，将要居中的元素，设为绝对定位元素，在该元素有高度情况下，设置 `top: 0; bottom: 0; margin: auto 0;`。

```css
.box {
  position: absolute;
  top: 0;
  bottom: 0;
  
  width: 66px;
  height: 66px;
  
  margin: auto 0
}
```

方案二：利用子绝父相的特性，将要居中的元素，设为绝对定位元素，并设置 `top: 50%;`，`translateY(-50%);`。

参考[上方案例](#1.translateX 和 translateY)。

```css
.box1 {
  position: relative;
}

.box1 .box3 {
  width: 100px;
  height: 100px;
  background-color: #f00;

  /* 2步:
      1.让元素向下位移包含快的50%
      2.让元素向上位移自身的50%
  */
  /* margin-top 的百分比是相对于包含块（父元素）的**宽度**，所以不能用 margin-top */
  position: absolute;
  top: 50%; /* 相对于包含快的高度，包含快必须有高度 */

  transform: translate(0, -50%); /* 相对于自身向上位移 50% */
}
```

方案二：设置要居中的元素的父容器，为 flex container，

- 为父元素（flex container）设置 `align-item: center;`。
- 或着，为要居中的元素（flex item）设置 `align-self: center;`。

```css
.box {
  display: flex;
  align-item: center;
}

/* 或者 */

.box {
  display: flex
}
.box > .item {
  align-self: center
}
```
