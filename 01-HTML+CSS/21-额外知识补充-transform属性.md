# transform 属性

transform 属性有什么用？

- 允许对某一个元素进行某些形变, 包括平移，旋转，缩放，倾斜等。

> transform 对于行内级非替换元素，table columns / table colums-group 是无效的；

# transform translate 函数

> `none | <transform-function>+`

- +: 代表可写一个或多个值，以空格区分。

  ```css
  .box {
    transform: translate(50px) scale(1.2) rotate(45deg);
  }
  ```

- #: 代表可写一个或多个，以逗号区分。

  ```css
  .box {
    box-shadow: 1px 1px 1px 1px #f00, 5px 5px 5px #ccc
  }
  ```

常见的 transform 函数。

- 平移：`translate(x, y)`
- 缩放：`scale(x, y)`
- 旋转：`rotate(deg)`
- 倾斜：`skew(deg, deg)`

-----

transform 属性 translate 函数的作用，

- 用于移动元素在平面上的位置。

可设值个数，

- 一个值，设置x轴上的位移。
- 二个值，设置x轴，y轴上的位移。

值类型。

- 数字：如100px
- 百分比：参照元素本身（ refer to the size of bounding box ）。

-----

transform 属性 translate 函数的特性补充4点。
- 是 `translateX` 和 `translateY`函数的简写。

	- translate3d 后续了解；

- 百分比可以完成一个元素的水平和垂直居中：

  ```css
  .box3 {
    width: 100px;
    height: 100px;
    background-color: #f00;
    /* 2步:
        1.让元素向下位移包含快的50%
        2.让元素向上位移自身的50%
    */
    /* margin-top 的百分比是相对于包含块(父元素)的宽度，所以不能用 margin-top */
    position: relative;
    top: 50%; /* 相对于包含快的高度，包含快必须有高度 */
    transform: translate(0, -50%); /* 相对于自身向上位移50% */
  }
  ```
  
- translate 函数相对于 flex 布局的兼容性会好一点点。

- position 定位元素，实际改变了元素位置，而 translate 函数是浏览器渲染时，做了位移。

-----

# 水平居中方案5点总结：

1. 行内级元素:
	* 设置父元素的 `text-align: center;`
2. 块级元素:
	* 设置当前块级元素(宽度) `margin: 0 auto;`
3. 定位元素 + left + translate
4. 绝对定位
   - 元素有宽度情况下, `left: 0; right: 0; margin: 0 auto;`
5. flex
   - `justify-content: center;`

# 垂直居中方案3点总结，

缺点有哪些？

1. 绝对定位
	* 元素有高度情况下, `top: 0; bottom: 0; margin: auto 0;`
	- 弊端：1. 必须使用定位（脱离标准流）；2. 必须给元素设置高度。
	
2. flex布局，

   - 设置 flex container 属性 `align-item: center;`，设置 flex item 属性 `align-self: center;
   
3. 定位元素 + top + translate

-----

# transform scale函数

transform 属性 scale 函数作用，

- 改变元素的大小。

设值个数，

- 一个值，设置x轴上的缩放。
- 二个值，设置x轴和y轴上的缩放。

类型；
- 数字：1保持不变，2放大一倍，0.5缩小一半.
- 百分比：百分比不常用。

是 `scaleX` 和 `scaleY` 的缩写。

-----

# transform rotate 函数

transform 属性 rotate 函数作用：

- 旋转元素。

设值个数，

- 一个值时，表示旋转的角度。

类型。

- 常用单位deg：旋转的角度（ degrees ）。
- 正数为顺时针。
- 负数为逆时针。

-----

transform 属性 rotate 函数的2点补充：

1. rotate 函数是 rotateZ 函数的简写写法。
    - rotate3d 后续了解。
2. rotate 函数的其他单位。
    - 度（degrees），百分度（gradians，90deg = 100grad），弧度（radians）或圈数（tums）

-----

# transform-origin 属性

transform-origin 属性的作用，

- 设置元素形变的原点，如在进行 scale 缩放，rotate 旋转，skew 倾斜时，都会有一个原点。

设值的个数，代表的含义：

- 一个值：设置x轴的原点
- 两个值：设置x轴和y轴的原点

值的类型。

- left, center, right, top, bottom关键字。
- length：从左上角开始计算。
- 百分比：参考元素本身宽高大小。

```css
.box {
  transform-origin: center 25%;
}
```

-----

# transform skew 函数

transform 属性 skew 函数的作用：

- 定义了一个元素在二维平面上的倾斜转换。

设值的个数，代表的含义：

- 一个值时，表示x轴上的倾斜。
- 二个值时，表示x轴和y轴上的倾斜。

值的类型。

- deg：倾斜的角度。
- 正数为顺时针。
- 负数为逆时针。

```css
.box {
  transform: skew(10deg, -10deg); /* 相当于.box逆时钟旋转10度 rotate(-10deg) */
}
```

倾斜的原点受 transform-origin 的影响

