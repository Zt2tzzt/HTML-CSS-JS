# CSS文本属性、包含快、块级元素水平居中2种方案、CSS字体属性

## 一、CSS 文本属性

### ⓵ text-decoration 属性

`text-decoration` 属性用于设置文字的装饰线。常用的 4 个值。

- `none`：无任何装饰线，可以去除 `<a>` 元素默认的下划线，常用于做重置。
- `underline`：下划线。
- `overline`：上划线。
- `line-through`：中划线（删除线）

> `<a>` 元素有下划线，本质也是加了 `text-decoration: underline;` 属性，可通过 CSS 层叠覆盖。

### ⓶ text-transform 属性

`text-transform` 属性，用于设置文字的大小写转换。常用的 4 个值。

- `capitalize`：将每个单词的首字符变为大写 。
- `uppercase`：将每个单词的所有字符变为大写 。
- `lowercase`：将每个单词的所有字符变为小写 。
- `none`：没有任何影响。

实际开发中使用 JS 设置比较多。

### ⓷ text-indent 属性

`text-indent` 属性，用于设置第一行文本的缩进。

> `em` 单位可以表示一个文字宽度单位。

```html
<style>
  div {
    text-indent: 2em; /* 表示缩进2个文字的宽度 */
  }
</style>
```

### ⓸ text-align 属性

`text-align` 属性，用于行内级元素，行内可替换元素（如 img，input  元素），行内块级元素，相对于它的父级元素定位。常用的 4 个属性如下：

- `left`：左对齐。
- `right`：右对齐。
- `center`：正中间显示。
- `justify`：两端对齐，使得两端没有多余的空隙。多行才能看到效果，默认最后一行不生效，如果需要最后一行生效，设置 `text-align-last: justify;`。

## 二、包含快的概念

包含块，一般指的是父元素；

元素设置 position 绝对定位后，元素的包含快，指的是是最近的相对定位元素。

## 三、块级元素在盒子里水平居中

设置快级元素在盒子中的水平居中 2 种方案：

方案一：设置 `dispaly: inline-block;` + `text-align: center;`

方案二：设置具体的宽度 + `margin: 0 auto;`

## 四、CSS字体属性

### ⓵ letter-spacing 、word-spacing 属性

`letter-spacing`（对汉字有效）和 `word-spacing`（对英文字符有效），用于分别设置字母，单词之间的间距，默认 0，可以设置负数。

### ⓶ font-size 属性

`font-size` 属性，用于设置字体大小。常用的设置为：具体数值+单位

- px 单位，比如 100px 。
- em 单位（不推荐）。

> em：如果没有设置所在元素字体大小，会从父元素继承字体大小，再相对于该字体大小，计算值。
>
> 1em 代表 100%，2em 代表 200%，0.5em 代表 50%。

- 百分比：基于父元素的 font-size 计算，比如 50% 表示等于父元素 font-size 的一半。

> CSS 中，每个属性的百分比，相对的对象不同。在 MDN 文档中查找 font-size 属性设置百分比相对的就是父元素。

### ⓷ font-family 属性

`font-family` 属性，用于设置文字的字体。

可以设置 1 个或者多个字体名称，浏览器会选择第一个该计算机上有安装的字体;，或者是通过 `@font-face` 指定的可以直接下载的网络字体。

```css
/* \5B8B\4F53，Unicode编码，用于防止浏览器对字体解析出错，字体一般也可使用单引号或双引号包裹。 */
font: 12px/1.5 Microsoft YaHei, Heiti SC, tahoma, arial, Hiragino Sans GB, '\5B8B\4F53', sans-serif;
```

### ⓸ font-weight 属性

`font-weight` 属性，用于设置文字的粗细。常用的取值。

- 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 ：每一个数字表示一个重量；
- `normal`：等于 400；
- `bold`：等于 700；

strong, b, h1-h6, 等元素，font-weight 属性的默认值是 bold。

### ⓹ font-style 属性

`font-style` 属性，用于设置文字的常规，斜体显示。

- `normal`：常规显示；
- `italic` (斜体)：用字体的斜体显示（通常用于专门的字体）；
- `oblique` (倾斜)：文本倾斜显示（仅仅是让文字倾斜）；

### ⓺ font-variant 属性

`font-variant` 属性，可以影响小写字母的展示形式。

- `normal`：常规显示；
- `small-caps`：将小写字母替换为缩小过的大写字母。

### ⓻ line-height 属性

`line-height` 属性，用于设置文本的行高。

行高的定义是：两行文字基线（baseline）之间的间距。基线指的是：与小写字母 x 最底部对齐的线。一行文本有顶线，中线，基线，底线。两行文本基线与基线的间距等于行高。

使用 `line-height` 属性让文字在 div 垂直居中，仅限于文字。

```html
<head>
  <style>
    /* 设置行高高度与盒子高度相同 */
    .box {
      height: 100px;
      background-color: #f00;
      color: #fff;
      line-height: 100px;
    }
  </style>
</head>

<body>
  <div class="box">我是div元素</div>
</body>
```
