`text-decoration` 属性有什么用？

- 用于设置文字的装饰线。

常用的 4 个值。

- `none`：无任何装饰线，可以去除 a 元素默认的下划线，用于做重置。
- `underline`：下划线
- `overline`：上划线
- `line-through`：中划线（删除线）

---

a 元素有下划线，本质也是加了 `text-decoration` 属性，可通过 CSS 层叠覆盖。

---

`text-transform` 属性有什么用？

- 用于设置文字的大小写转换。

常用的 4 个值。

- `capitalize`：(使首字母大写, 资本化的意思)将每个单词的首字符变为大写 。
- `uppercase`：(大写字母)将每个单词的所有字符变为大写 。
- `lowercase`：(小写字母)将每个单词的所有字符变为小写 。
- `none`：没有任何影响。

实际开发中使用 JS 设置比较多。

---

`text-indent` 属性有什么用？

- 用于设置第一行文本的缩进。

`em` 单位可以表示一个文字宽度单位。

```html
<style>
  div {
    text-indent: 2em; /* 表示缩进2个文字的宽度 */
  }
</style>
```

---

`text-align` 属性有什么用？

- 使行内（块）级元素，行内可替换元素（如 img，input ），相对于它的父级元素定位。

常用的 4 个属性的作用？

- `left`：左对齐
- `right`：右对齐
- `center`：正中间显示
- `justify`：两端对齐，使得两端没有多余的空隙（多行才能看到效果，默认最后一行不生效，如果需要最后一行生效，设置 `text-align-last: justify;`）。

---

设置快级元素在盒子中的水平居中 2 种方案：

1. `dispaly: inline-block;` + `text-align: center;`
2. `margin: 0 auto;`

---

`letter-spacing`（对汉字有效）和 `word-spacing` 有什么用。

- 分别设置字母，单词之间的间距，默认 0，可以设置负数。

---

包含块的概念一般是父元素，position 绝对定位后，包含快是最近的相对定位元素。

---

`font-size` 属性常用的设置，以及它们的注意事项。

- 具体数值+单位

  - 比如 100px 。
  - 也可以使用 em 单位(不推荐)：1em 代表 100%，2em 代表 200%，0.5em 代表 50%。

  > em：如果没有设置所在元素字体大小，会从父元素继承字体大小，再相对于该字体大小，计算值。

- 百分比

  - 基于父元素的 font-size 计算，比如 50%表示等于父元素 font-size 的一半。

  > 百分比根据不同的属性，相对的对象不同，推荐查文档，在 MDN 中查找 font-size 属性设置百分比相对的就是父元素。

---

`font-family` 属性的作用？

- 用于设置文字的字体名称。

使用注意事项 3 点，

- 可以设置 1 个或者多个字体名称;
- 浏览器会选择列表中第一个该计算机上有安装的字体;
- 或者是通过 `@font-face` 指定的可以直接下载的字体。

```css
/* \5B8B\4F53，Unicode编码，用于防止浏览器对字体解析出错，字体一般也可使用单引号或双引号包裹。 */
font: 12px/1.5 Microsoft YaHei, Heiti SC, tahoma, arial, Hiragino Sans GB, '\5B8B\4F53', sans-serif;
```

---

`font-weight` 属性的作用。

- 用于设置文字的粗细。

常用的取值。

- 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 ：每一个数字表示一个重量
- `normal`：等于 400
- `bold`：等于 700

有哪些元素默认添加了该属性。

- strong, b, h1-h6, 默认值是 bold。

---

`font-style` 属性的作用。

- 用于设置文字的常规，斜体显示。

常用的值的作用。

- `normal`：常规显示
- `italic` (斜体)：用字体的斜体显示(通常会有专门的字体)
- `oblique` (倾斜)：文本倾斜显示(仅仅是让文字倾斜)

---

`font-variant` 属性的作用了解。

- 可以影响小写字母的展示形式。

常用的值的作用。

- normal：常规显示
- small-caps：将小写字母替换为缩小过的大写字母

---

`line-height` 属性有什么用？

- 用于设置文本的行高。

行高的定义是什么？

- 两行文字基线（baseline）之间的间距

什么是基线？

- 与小写字母 x 最底部对齐的线
- 一行文本有顶线，中线，基线，底线。两行文本基线与基线的间距等于行高

---

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
