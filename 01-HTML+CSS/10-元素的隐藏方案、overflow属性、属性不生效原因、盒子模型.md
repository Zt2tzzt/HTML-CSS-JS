# 元素的隐藏方案、overflow属性、属性不生效原因、盒子模型

## 一、元素的隐藏方案

元素的隐藏，有 4 种方案：

方案一：`display: none;`

- 元素不显示, 不占据任何空间。
- 浏览器调试时，html 代码中还是存在该元素。

方式二：`visibility: hidden;`

- 元素不显示， 但会占据空间;
- `visibility` 属性，默认值是 `visible`，表示元素是可见的;。

方式三：将 rgba 颜色的 alpha 值设置为 0。

- rgba 的 a 设置的是 alpha 值, 用于设置透明度, ==该设置不影响子元素==；
- 这种方式，一次只能设置文本或背景的一种。
- 透明度 rgba CSS 函数写法：`rgba(0,0,0, .5)`
- 透明度 rgba，十六进制写法，
  - `#ff0000ff`：完全不透明；
  - `#ff000088`：半透明；
  - 这种写法，是 CSS3 color module 中比较新的写法，可能有些浏览器不支持。
- 一般元素的背景颜色默认值是 `background: transparent;` 相当于 `rgba(0, 0, 0, 0)`。

方式四：`opacity: 0;`，设置整个元素的透明度，==会影响该元素所有的子元素==，也包括元素背景色和内容。

## 二、overflow 属性

`overflow` 属性，用于设置超出元素内容的显示方式：

- `visible`：默认值，表示溢出的内容照样可见 。
- `hidden`：表示溢出的内容直接裁剪。
- `scroll`：表示溢出的内容被裁剪，但可以通过滚动机制查看 ，会一直显示滚动条区域，滚动条区域占用的空间属于 width、height。
- `auto`：表示自动根据内容是否溢出来决定是否提供滚动机制。

## 三、CSS 属性不生效的原因

CSS 属性不生效，可能有如下原因，依次进行排查：

1. 选择器的优先级太低。
2. 选择器没选中对应的元素（写错）。
3. CSS 属性的使用形式不对：
   - 元素不支持此 CSS 属性，比如 span 默认是不支持 width 和 height 的；
   - 浏览器不支持此 CSS 属性，比如旧版本的浏览器不支持一些 CSS3 module 的某些属性；
   - 被同类型的 CSS 属性覆盖，比如 font 属性，覆盖 font-size 属性。

充分利用浏览器的开发者工具进行调试（增加、修改样式）、查错。

## 四、盒子模型

HTML 中每一个元素都可看作是一个盒子模型，具备 4 个属性。

- 内容（content），元素的内容 width、height。
- 内边距（padding），元素和内容之间的间距。
- 边框（border），元素自己的边框。
- 外边距（margin），元素和其他元素之间的间距。

盒子模型有 4 边，所以 `padding`，`border`，`margin` 都包含 `top`, `right`, `bottom`, `left` 四个边。

在浏览器开发者工具中，使用 computed 查看盒子模型。

### 1.content 内容

设置内容的宽度，高度:

- 宽度设置，使用 width 属性。
  - width 默认值是 auto；
  - 块级元素是父元素一行的宽度；
  - 行内级元素是包裹内容的宽度。
- 高度设置，使用 height 属性。

> 注意: 对于行内级元素来说, 设置宽、高是无效的（再次强调）。

设置内容的最小、最大宽度，最小、最大高度:

- `min-width`：最小宽度，无论内容多少，宽度都大于或等于 `min-width` （如果浏览器视口小于最小宽度，会出现滚动条）
- `max-width`：最大宽度，无论内容多少，宽度都小于或等于 `max-width`。

> 常在移动端适配时, 设置最大宽度和最小宽度

设置内容的最小、最大高度:，这种设置不常用，一般由内容撑开高度：

- `min-height`：最小高度，无论内容多少，高度都大于或等于 `min-height`。
- `max-height`：最大高度，无论内容多少，高度都小于或等于 `max-height`。

### 2.padding 内边距

内边距 padding，用于设置边框与盒子的距离。

不要给行内元素设置 padding，会有问题（主要是 padding-top，padding-bottom 有问题）。

padding 包括四个方向, 所以有如下的取值:

- `padding-top`：上内边距；
- `padding-right`：右内边距；
- `padding-bottom`：下内边距；
- `padding-left`：左内边距；

padding 的缩写属性：

| padding 值的个数 | padding 属性声明              | 代表含义                                         |
| ---------------- | ----------------------------- | ------------------------------------------------ |
| 4                | padding: 10px 20px 30px 40px; | top: 10px, right: 20px, bottom: 30px, left: 40px |
| 3                | padding: 10px 20px 30px;      | top: 10px, right / left: 20px, bottom: 30px      |
| 2                | padding: 10px 20px;           | top / bottom: 10px, right / left: 20px           |
| 1                | padding: 10px;                | top / right / bottom / left: 10px                |

### 3.border 边框

border 属性，用于设置盒子的边框，它可以：

- 设置边框宽度 width;
- 设置边框样式 style;
- 设置边框颜色 color;

可进行如下设置：

- border-[width / style / color]: xxx xxx xxx xxx; （top，right，bottom，left 按照顺时钟顺序）
- border-[top / right / bottom/ left]: xxx xxx xxx;；（width，style，color）

bordr 总体缩写语法：`border: <line-width> || <line-style> || <color>;`，顺序可互换，style 不能省略，其它两个可以省略。

边框样式（vorder-style）可设置的值有哪些，代表什么意思。

- `solid`，实线 （常用）；
- `dashed`，长虚线 （常用）；
- `dotted`，点虚线；
- `double`，双边框。

### 4.border-radius 属性

border-radius 属性，用于设置盒子的圆角。2 种设置方式。

- 数值: 通常用来设置小的圆角, 比如 6px；
- 百分比: 通常用来设置一定的弧度或者圆形；
  - 水平方向相对于 border-box（内容 + padding + border），也就是 box width + border width；
  - 垂直方向相对于 border-box（内容 + padding + border），也就是 box height + border width。
  - 两个方向计算出的实际值不相同，效果可能是不圆润的。
  - 设置百分比，常用于圆形。border-radius: 数值超过 50%，效果一样。

border-radius 事实上是一个**缩写属性**，理解 2 点。

- 将这四个属性 `border-top-left-radius`、`border-top-right-radius`、`border-bottom-right-radius`，和`border-bottom-left-radius` 简写为一个属性。
- 可以设置两个值（如 `border-top-left-radius: 5px 10px;`），代表水平方向、垂直方向，两个值不一样，效果不圆润。
