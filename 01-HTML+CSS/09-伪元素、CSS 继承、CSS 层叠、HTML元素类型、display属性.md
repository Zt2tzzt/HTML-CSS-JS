# 伪元素、CSS 继承、CSS 层叠、HTML元素类型、display属性

## 一、伪元素

伪元素，用于选择特定元素的选择器。

伪元素的 2 种写法：以伪元素 before 举例，

- 可写成 `:before`；
- 也可写成 `::before`（推荐的写法，以便和伪类区分）。

> 伪元素和选择器一起使用，相当于使用了交集选择器。

几个伪元素的作用和使用。

- `::first-line`，针对首行文本设置属性。
- `::first-letter`，针对首字母设置属性。

```html
<html lang="en">
  <head>
    <title>Document</title>
    <style>
      .box {
        width: 800px;
        background-color: #f00;
        color: #fff;
      }

      .box::first-line {
        font-size: 30px;
        color: orange;
      }

      .box::first-letter {
        font-size: 50px;
        color: blue;
      }
    </style>
  </head>

  <body>
    <div class="box">
      雁门关，别名西陉关
      ，坐落于我国山西省忻州市代县以北约成员国20千米的雁门山。它是长城上的一个关键大关，与宁武关、偏关并称之为“外三关”。坐落于偏关县大河上，辖四侧墙，总长度数百公里。迄今仍有30千米储存完好无损，所有用砖遮盖，沿堤岸耸立，十分壮阔。“边关丁宁岩，山连紫塞，地控大河北，鑫城携手共进强。”这也是前人对偏关的赞扬。早在春秋战国时代，这儿便是赵武灵王攻克胡林的竞技场。唐朝名将在关东建有九龙庙，宋代建有魏镇、杨三关。现有的关城始建明洪武二十三年，是重点学科文物古迹。
    </div>
  </body>
</html>
```

`::before` 和 `::after` 伪元素，用于在一个元素的内容之前或之后插入其他内容（可以是文字、图片) 。

`content` 属性，用来为一个元素添加修饰性的内容，==不能省略==，否则伪元素中设置的属性无效。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Document</title>
    <style>
      /* 伪元素，给选定元素内容前添加“321”文本 */
      .item::before {
        content: '321';
        color: orange;
        font-size: 20px;
      }

      .item::after {
        /* 插入图片的用法，使用 url 函数引入图片。 */
        content: url('../images/hot_icon.svg');
        color: green;
        font-size: 20px;
        /* 位置不是很好看，使用相对定位做微调 */
        position: relative; /* 相对定位 */
        left: 5px;
        top: 2px;
      }

      /* 额外的补充 */
      .box5::after {
        /* 使用伪元素的过程中, 不要将 content 省略，否则伪元素中设置的属性无效 */
        content: '';
        /* 伪元素是行内（非替换）元素，有时需要设值成行内块级元素，一些样式才会生效。 */
        display: inline-block;
        width: 8px;
        height: 8px;
        background-color: #f00;
      }
    </style>
  </head>

  <body>
    <!-- 伪元素方案 -->
    <div class="box3 item">我是box3</div>
    <div class="box4 item">我是box4</div>
    <!-- 伪元素的补充 -->
    <div class="box5">我是box5</div>
  </body>
</html>
```

## 二、CSS 的继承性

如果一个属性具备继承性, 那么在该元素上设置后, 它的后代元素都可以继承这个属性。

后代元素如有使用该属性，则优先使用后代元素自己的属性（**不管继承过来的属性权重多高**）。

### 1.常见的继承属性

font-weight、font-size、line-height、font-family、color、text-align 等等有关文本，字体的属性都具有继承性；

### 2.判断属性能否被继承

可在浏览器调试工具中，查看继承的属性。

在文档中查阅。

### 3.属性继承的是计算值

属性继承的是计算值，而不是设置值，以 em 单位举例。

```html
<head>
  <style>
    .box {
      color: red;
      /* 浏览器默认 16px */
      font-size: 2em; /* 32px */
    }
    p {
      /* 继承了 font-size: 2em，这里继承的 2em 不是 64px，而是 32px */
    }
  </style>
</head>
<body>
  <div class="box">
    box本身的内容
    <p>我是p元素</p>
  </div>
</body>
```

### 4.属性强制继承

属性强制继承的使用，以 boarder 属性举例。

```html
<head>
  <title>Document</title>
  <style>
    .box {
      color: red;
      border: 2px solid purple;
    }
    .box p {
      /* 很少用 */
      border: inherit; /* border 属性本没有继承，通过设置 inherit 强制继承 */
    }
  </style>
</head>
<body>
  <div class="box">
    <p>我是p元素</p>
    <h1>我是h1元素</h1>
  </div>
</body>
```

## 三、CSS 的层叠性

对于一个元素来说, 相同一个属性，我们可以通过不同的选择器，给它进行多次设置；那么属性会被一层层覆盖上去; 但是最终只有一个会生效。

### 1.判断哪个层叠样式生效

根据选择器的权重判断, 权重大的优先级高。

权重相同时，根据先后顺序判断，后面设置的生效;

### 2.CSS 优先级

选择器的权重，由高到低。是可以累加的。

按照经验，为了方便比较 CSS 属性的优先级，给 CSS 属性所处的环境定义一个权值（权重）

| 选择器                     | 权值  |
| -------------------------- | ----- |
| !important                 | 10000 |
| 内联样式                   | 1000  |
| id 选择器                  | 100   |
| 类选择器、属性选择器、伪类 | 10    |
| 元素选择器、伪元素         | 1     |
| 通配符                     | 0     |

## 四、HTML元素类型

为了区分哪些元素需要独占一行, 哪些元素不需要独占一行, HTML 将元素区分成了两类（本质是通过 CSS 区分的）：

- **块级元素（block-level elements）**: 独占父元素的一行。
- **行内级元素（inline-level elements）**: 多个行内级元素可以在父元素的同一行中显示。

> div 是块级元素，仅仅是因为浏览器默认设置了`display: block;`属性，我们可通过 CSS 样式层叠特性修改。
>
> 编写不同 HTML 元素类型需要注意。
>
> **块级元素**，**行内块级元素**：
>
> - 一般情况下，可以作为盒子包含其他任何元素（比如：其它块级元素、其它行内级元素、其它行内块级元素） 。
> - 特殊情况，p 元素不能包含其他块级元素。
>
> **行内级元素**（如 a, span 元素等等)：
>
> - 一般情况下，作为盒子只能包含行内级元素。

## 五、display 属性

CSS 的 display 属性，可以设置 4 个值，

- `block`：使元素显示为块级元素，这样元素就可以设置宽高（块级元素设置宽度后，还是独占一行，这和块级元素的 margin 有关，默认 margin-right: auto;，此时浏览器会自动将一行右边的宽度分配给 margin-right）。
- `inline`：使元素显示为行内级元素；不能设置宽高，宽高由内容决定。
- `inline-block`：让元素同时具备（对外的）行内级特征，可在同一行显示；（对内的）块级元素特征；可设置宽度和高度。
- `none`：隐藏元素。

> img，input，video 等元素，是**行内可替换元素**，它们可以设置宽、高。

事实上，display 属性还可以设置其他值，如 `flex`，后续介绍。
