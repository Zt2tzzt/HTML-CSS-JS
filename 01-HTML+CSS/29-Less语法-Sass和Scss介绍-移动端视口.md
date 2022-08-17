# Less 语法

less 语法一，兼容CSS。

- 我们可以在 Less 文件中编写所有的 CSS 代码。

-----

less 语法二，定义变量。

- 使用如下格式定义变量：`@变量名：变量值`

```less
@mainColor: #a40011;
.box {
  color: @mainColor;
}
```

-----

less 语法三，结构嵌套。特殊符号&的使用。

```html
<ul class="list">
  <li class="item">1</li>
  <li class="item">2</li>
  <li class="item">3</li>
  <li class="item">4</li>
  <li class="item">5</li>
</ul>
```

```less
.list {
  .item {
    font-size: 20px;
    // & 表示当前选择器的父级，也就是.item
    &:hover {
      color: @mainColor;
    }
    &:nth-child(1) {
      color: orange;
    }
    &:nth-child(2) {
      color: #00f;
    }
  }
}
```

-----

less 语法四，运算。

- 算术运算符 +、-、*、/ 可以对任何数字、颜色或变量进行运算。
- 算术运算符在加、减或比较之前会进行单位换算，计算的结果以最左侧操作数的单位类型为准；
- 如果单位换算无效或失去意义，则忽略单位；

```less
.box {
  width: 100px + 10%; // 110px
  background-color: #ff0000 + #00ff00;
}
```

-----

less 语法五，混入，基本使用，

```less
// 将这些代码进行抽取到一个独立的地方，任何选择器都可以进行复用；
.nowrap_ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.box1 {
  background-color: #f00;
  .nowrap_ellipsis(); // 混入在没有参数的情况下，小括号可以省略，但是不建议这样使用；
}
```

传递参数，

```less
// 给参数设置默认值。
.box_border(@borderWidth: 5px, @borderColor: purple) {
  border: @borderWidth solid @borderColor;
}
.box {
  .box_border(1px, #f00);
}
```

映射。

```less
.box_size {
  width: 100px;
  height: 100px;
}
.box1 {
  width: .box_size()[width]; // 100px
  background-color: #f00;
}
```

-----

less 语法六，混入中传参和映射结合，可编写自定义函数。

```less
.pxToRem(@px) {
  result: (@px / @htmlFontSize) * 1rem;
}
.box {
  width: .pxToRem(100)[result];
  font-size: .pxToRem(18)[result];
}
```

-----

less 语法七，继承。

- 和 mixins 作用类似，用于复用代码；
- 和 mixins 相比，继承代码最终会转化成并集选择器；

```less
.box_border {
  border: 5px solid #f00;
}
.box {
  width: 100px;
  &:extend(.box_border);
}
// 以上会被转化为以下代码
.box_border, .box {
  border: 5px solid #f00;
}
.box {
  width: 100px;
}
```

-----

less 语法八，内置函数。

- Less 内置了多种函数用于转换颜色、处理字符串、算术运算等。
- 内置函数手册：https://less.bootcss.com/functions/

```less
.box {
  color: color(skyblue); // 将颜色关键字，转成16进制的颜色。
  width: convert(100px, "in"); // 单位转换
  font-size: ceil(18.5px); // 取最大整数
}
```

-----

less 语法九，作用域。

```less
.box {
  @mainColor: #0f0;
  .item {
    span {
      color: @mainColor; // 使用的是 #00f
      @mainColor: #00f;
    }
  }
}
```

-----

less 语法十，注释。

- 在Less中，块注释 `/* */` 和行注释 `//` 都可以使用；

-----

less 语法十一，导入。

- 导入的方式和CSS的用法是一致的；
- 导入一个 .less 文件，此文件中的所有变量就可以全部使用了；
- 如果导入的文件是 .less 扩展名，则可以将扩展名省略掉；

```less
@import url(./demo2.less);
// 或者可写成
@import url(./demo2);
```

-----

# Sass / Scss 的介绍

- Sass 的语法使用的是类似于 Ruby 的语法，没有花括号，没有分号，具有严格的缩进。
- 后来官方推出了全新的语法SCSS，意思是Sassy CSS，他是完全兼容CSS的；
  - SCSS 的语法也包括变量、嵌套、混入、函数、操作符、作用域等。
  - SCSS 通常也包括更为强大的控制语句、更灵活的函数、插值语法等。

-----

# 移动端适配

移动端开发包含3类。

- 原生App开发（iOS、Android、RN、uniapp、Flutter等）。
- 小程序开发（原生小程序、uniapp、Taro等）。
- Web 页面（移动端的 Web 页面，可以使用浏览器或者 webview 浏览）。

移动端适配的2个概念。

- 自适应：根据不同的设备屏幕大小来自动调整尺寸、大小； 
- 响应式：会随着屏幕的实时变动而自动调整，是一种自适应；

-----

移动端与PC端视口的区别。

- 在PC端的页面中，不需要对视口进行区分，因为布局视口和视觉视口是同一个；
- 在移动端，不太一样，布局的视口一般大于视觉视口。

-----

在移动端可将视口分为3类。如何理解？

- 布局视口（layout viewport）
	- 大部分浏览器，布局视口默认宽度为 980px，
	- 在移动端，为了完整的显示在页面中，会对整个页面进行缩小。
- 视觉视口（visual viewport）
	- 手机上显示的区域，就是视觉视口。
- 理想视口（ideal viewport）
	- 对布局视口进行宽度缩放设置，以满足正常在一个移动端窗口的布局。

理想视口设置，设置 meta 中的 viewport。

| 值            | 可能的附加值                           | 描述                                                         |
| ------------- | -------------------------------------- | ------------------------------------------------------------ |
| width         | 一个正整数，或者字符串 `device-width`  | 定义 ideal viewport 的宽度。                                 |
| height        | 一个正整数，或者字符串 `device-height` | 定义 ideal viewport 的高度。未被任何浏览器使用。             |
| initial-scale | 一个 0.0 和 10.0 之间的正数            | 定义设备宽度与 ideal viewport 大小之间的缩放比例。           |
| maxinum-scale | 一个 0.0 和 10.0 之间的正数            | 定义缩放的最小值，必须小于等于 maximum-scale，否则表现将不可预测。 |
| minimun-scale | 一个 0.0 和 10.0 之间的正数            | 定义缩放的最大值，必须大于等于 minimum-scale，否则表现将不可预测。 |
| user-scalable | yes 或者 no                            | 默认为 yes，如果设置为 no，将无法缩放当前页面。浏览器可以忽略此规则； |

```html
<!-- 默认情况，width=980px -->
<!-- 下面的代码，意为理想视口为视觉视口，且视口不可缩放 -->
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
```

