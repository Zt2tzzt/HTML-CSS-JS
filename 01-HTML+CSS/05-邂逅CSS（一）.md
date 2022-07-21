什么是元素的语义化？

- 用正确的元素做正确的事。

------

理解 span 元素添加`display: block;`属性后，与 div 元素的区别。

- div 元素默认有 display:block 属性，在浏览器调试中，类型是 user agent stylesheet，相对的 span 元素，手动添加 display:block; 属性后，在浏览器调试中可勾选属性。

------

浏览器调试时，computed 选项的使用，可查看元素在浏览器中应用的样式。

------

元素语义化的好处4点。

1. 方便代码维护。
2. 减少让开发者之间的沟通成本。
3. 能让语音合成工具正确的识别网页元素的用途，以便做出正确的反应。
4. 有利于 SEO

------

什么是SEO？理解搜索引擎的原理图。

- 搜索引擎优化，Search Engine Optimization，通过了解搜索引擎的运作规则来调整网站，以及提高网站在有关搜索引擎内排名的方式。

------

后台管理系统推荐使用 SPA(simple page application) 开发模式，门户网站推荐使用 SSR 开发模式。

------

计算机只能存储和处理 0、1 组成的二进制数字，底层硬件实现是用电路的开和闭两个状态表示0和1两个数字的。

------

为了在计算机上处理文字，符号或者更复杂的内容，需要将这些字符（或更复杂内容）转换成二进制数字，

理解字符编码和解码过程。

- 文字（自然语言） -> 字符编码, encode（ASCLL/UTF8/GBK） -> 计算机语言（0110101） -> 字符解码, decode（ASCLL/UTF8/GBK） -> 文字（自然语言）

------

CSS 的全称是 Cascading Style Sheet，意为层叠样式表。CSS 是**样式表语言，计算机语言**，不是编程语言。

------

理解CSS的历史。

- 早期的网页都是通过HTML来编写的，但是我们希望HTML页面可以更加丰富，这个时候就增加了很多具备特殊样式的元素：比如 i、strong、del 等等； 
- 后来也有不同的浏览器实现各自的样式语言，但是没有统一的规划； 
- 1994年，哈肯·维姆·莱和伯特·波斯合作设计CSS，在1996年的时候发布了CSS1； 
- 直到1997年初，W3C组织才专门成立了CSS的工作组，1998年5月发布了CSS2； 
- 在2006~2009非常流行 “DIV+CSS”布局的方式来替代所有的 html 标签； 
- 从CSS3开始，所有的CSS分成了不同的模块（modules），每一个“modules”都有相对CSS2中额外增加的功能，以及向后兼容。（没有真正意义上的CSS3版本，现在是分模块发布的。）
- 直到2011年6月7日，CSS 3 Color Module 终于发布为 W3C Recommendation。（第一个CSS3模块发布）

------

CSS 美化 HTML 的2种方式。

1. 为HTML添加各种各样的样式，比如颜色、字体、大小、下划线等等； 
2. 对HTML进行布局，按照某种结构显示（CSS进行布局 – 浮动、flex、grid）

------

编写CSS的格式是什么。

- 一个声明（Declaration），单独的CSS规则的写法：[属性名]: [属性值];
- 属性名（Property name）：要添加的css规则的名称；
- 属性值（Property value）：要添加的css规则的值；

------

CSS的3种形式。

- 内联样式（inline style），也称为行内样式。
- 内部样式表（internal style sheet）、文档样式表（document style sheet）、内嵌样式表（embed style sheet）
- 外部样式表（external style sheet）

------

什么是内联样式，写法。

- 存在于HTML元素的 style 属性之中

```html
<div style="color: red; font-size: 30px;">我是div元素</div>
```

------

什么是内部样式表，写法（使用元素选择器，类选择器）。

- 将CSS放在HTML元素`<head>`元素里的`<style>`元素之中
- 在Vue的开发过程中，每个组件也会有一个style元素，和内部样式表非常的相似（原理并不相同）；

```html
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    /* 两个div都可以找到 */
    div {
      color: red; 
      font-size: 30px; 
      background-color: orange;
    }
    /* 找到class为.div-one的元素 */
    .div-one {
      color: red; 
      font-size: 30px; 
      background-color: orange;
    }
  </style>
</head>
<body>
  <div class="div-one">我是div元素</div>
  <div>我也是div元素</div>
</body>
</html>
```

------

什么是外部样式表，写法。

- 将CSS编写在一个独立的文件中，并且通过`<link>`元素（单标签元素）引入进来。

./css/style.css

```css
.title {
  font-size: 30px;
  color: red;
  background-color: purple;
}
```

./demo.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <!-- link元素是用来引入资源 -->
  <link rel="stylesheet" href="./css/style.css">
</head>
<body>
  <div class="title">我是01中的title</div>
</body>
</html>
```

@import 的用法：

./css/index.css

```css
/* 可以通过 @import 引入其他的css资源，url()，是css里的函数。*/
@import url('./style.css');
/* 在顶层使用 @import url(XXX) 和 @import 'XXX' 效果一样。*/
@import './test.css';
```

./demo.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <link rel="stylesheet" href="./css/index.css">
</head>
<body>
  <h1>我是h1元素</h1>
  <div class="title">我是title</div>
</body>
</html>
```

------

CSS的注释的写法，注释会增加文件大小，但实际用户使用的代码经过打包工具打包优化，将对代码运行无用的内容，如注释会删除掉。

```css
/* 注释 */
```

------

了解常见的CSS，必须掌握的CSS思维导图。

------

CSS文档优先推荐MDN，

[MDN CSS]: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference

如有描述不准确，可看W3C官方文档。

[W3C CSS]: https://www.w3.org/TR/?tag=css

了解查询CSS兼容性的网站。

[caniuse]: https://caniuse.com/
