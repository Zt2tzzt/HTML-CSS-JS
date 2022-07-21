元素的隐藏方法4种，如何使用。

1. `display: none` 
	- 元素显示, 不占据任何空间。
	- 浏览器调试时，代码中还是存在该元素。
2. `visibility: hidden`
	- 设为`hidden`, 元素不可见, 但会占据本应占据的空间; 
	- 默认`visible`, 元素是可见的;
3. rgba 设置颜色, 将a的值设置为0 
	- rgba 的 a 设置的是 alpha 值, 可以设置透明度, 不影响子元素（一次只能设置文本或背景的一种）;
	- 透明度的一种写法：`rgba(0,0,0, .5)`
	- rgba，十六进制写法，#ff0000ff：完全不透明，#ff000088：半透明。这种写法，是 color module 中比较新的写法，可能有些浏览器不支持。
	- 通常元素的背景颜色默认值是 `background: transparent;` 相当于 `rgba(0, 0, 0, 0)`
4. `opacity: 0;`
	- 设置整个元素的透明度, 会影响所有的子元素（包括元素背景色和内容）;

------

`overflow` 属性可设置的4个值，有什么作用。

- `visible`：溢出的内容照样可见 ，默认值。
- `hidden`：溢出的内容直接裁剪。
- `scroll`：溢出的内容被裁剪，但可以通过滚动机制查看 ，会一直显示滚动条区域，滚动条区域占用的空间属于width、height 
- `auto`：自动根据内容是否溢出来决定是否提供滚动机制。

------

CSS属性不生效，可能有哪些原因。

1. 选择器的优先级太低 
2. 选择器没选中对应的元素（写错）
3. CSS属性的使用形式不对 
	- 元素不支持此CSS属性，比如 span 默认是不支持 width 和 height 的 
	- 浏览器不支持此CSS属性，比如旧版本的浏览器不支持一些 css module3 的某些属性 
	- 被同类型的CSS属性覆盖，比如 font 覆盖 font-size

充分利用浏览器的开发者工具进行调试（增加、修改样式）、查错。

------

HTML中每一个元素都可看作是一个盒子模型，具备4个属性。

- 内容（content），元素的内容 width / height
- 内边距（padding），元素和内容之间的间距
- 边框（border），元素自己的边框
- 外边距（margin），元素和其他元素之间的间距

------

盒子模型有4边，所以 `padding`，`border`，`margin` 都包含 `top`, `right`, `bottom`, `left` 四个边。

------

在浏览器开发者工具中，使用 computed 查看盒子模型。

------

内容的高度，宽度设置，3个方面注意事项。

- 设置内容是通过宽度和高度设置的: 
	- 宽度设置: width （元素未设置 width，默认值是 auto。块级元素是父元素一行的宽度，行内级元素是包裹内容的宽度）
	- 高度设置: height
	- 注意: 对于行内级非替换元素来说, 设置宽高是无效的（再次强调）。
- 另外我们还可以设置如下属性: 
	- min-width：最小宽度，无论内容多少，宽度都大于或等于 min-width （如果浏览器视口小于最小宽度，会出现进度条）
	- max-width：最大宽度，无论内容多少，宽度都小于或等于 max-width 
	- 移动端适配时, 可以设置最大宽度和最小宽度
- 下面两个属性不常用: 
	- min-height：最小高度，无论内容多少，高度都大于或等于min-height 
	- max-height：最大高度，无论内容多少，高度都小于或等于max-height

------

内边距 padding 有什么用？

- 用于设置边框与盒子的距离。不要使用 inline 元素设置 padding，会有问题（padding-top，padding-bottom 有问题，后续讲）。

2种写法。

- `padding` 包括四个方向, 所以有如下的取值: 
	- `padding-top`：上内边距 
	- `padding-right`：右内边距 
	- `padding-bottom`：下内边距 
	- `padding-left`：左内边距

- padding 的缩写属性：

  - `padding-top`、`padding-right`、`padding-bottom`、`padding-left` 的简写属性（顺时钟方向）

	| padding值的个数 | padding属性声明               | 代表含义                                         |
	| --------------- | ----------------------------- | ------------------------------------------------ |
	| 4               | padding: 10px 20px 30px 40px; | top: 10px, right: 20px, bottom: 30px, left: 40px |
	| 3               | padding: 10px 20px 30px;      | top: 10px, right / left: 20px, bottom: 30px      |
	| 2               | padding: 10px 20px;           | top / bottom: 10px, right / left: 20px           |
	| 1               | padding: 10px;                | top / right / bottom / left: 10px                |

------

border 用于设置盒子的边框，3个方面。

- 设置边框宽度 width; 
- 设置边框样式 style; 
- 设置边框颜色 color;
- border-top-[width / style / color]、border-right-[width / style / color]、border-bottom-[width / style / color]、border-left-[width / style / color]

简写形式。

- border-[width / style / color]: xxx xxx xxx xxx; （顺时钟顺序）
- border-[top / right / bottom/ left]: xxx xxx xxx;

总体的缩写语法

- border 总体的缩写语法，`<line-width> || <line-style> || <color>`，顺序可互换，style 不能省略，其它两个可以省略。

------

边框样式可设置的值有哪些，代表什么意思。

- solid，实线 （常用）
- dashed，长虚线 （常用）
- dotted，点虚线
- double，双边框

------

border-radius 用于设置盒子的圆角。2种设置方式。

- 数值: 通常用来设置小的圆角, 比如6px; 
- 百分比: 通常用来设置一定的弧度或者圆形;
  - 百分数，水平方向相对于border-box（内容 + padding + border），也就是 box width + border width，垂直方向相对于 box height + border width。两个方向计算出的实际值不相同，效果可能是不圆润的。
  - 设置百分比，常用于圆形。border-radius: 50%; 超过50%，效果一样。

------

border-radius事实上是一个**缩写属性**，理解2点。

- 将这四个属性 `border-top-left-radius`、`border-top-right-radius`、`border-bottom-right-radius`，和`border-bottom-left-radius` 简写为一个属性。
- 可以设置两个值（如`border-top-left-radius: 5px 10px;`），代表水平方向和垂直方向，两个值不一样，效果不圆润。