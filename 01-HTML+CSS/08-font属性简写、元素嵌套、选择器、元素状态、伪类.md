# font属性简写、元素嵌套、选择器、元素状态、伪类

## 一、font 属性简写

font 的缩写属性，用来作为 `font-style`、`font-variant`、`font-weight`、`font-size`/`line-height` 和 `font-family`；

前 3 个属性值可调换顺序，也可省略。之后的属性值不能调换顺序，`line-height` 可省略。

```css
.box {
  /* 关于字体的属性 */
  font-style: italic;
  font-variant: small-caps;
  font-weight: 700;
  font-size: 30px;
  line-height: 30px;
  font-family: serif;

  /* 缩写属性 */
  /* 1.5 的行高是相对于 font-size 的 */
  font: italic small-caps 700 30px/1.5 serif;
}
```

## 二、元素的嵌套

块级元素中，可以嵌套：行内及元素，行内块级元素，块级元素。

> PS：p 元素里不能嵌套 div 等等块级元素。

行内及元素只能嵌套：行内及元素。

## 三、常见选择器

### 1.通用选择器

通用选择器，用于选中所有的元素。

一般用来给所有元素，做一些通用的设置，比如重置内边距，外边距，等等一些样式。

```css
* {
  font-size: 30px;
  margin: 0;
  padding: 0;
}
```

通用选择器的效率低，尽量不要使用。

### 2.元素选择器

元素选择器（type selectors），使用元素名称。

```css
div {
  color: red;
}
```

### 3.类选择器

类选择器（class selectors），使用 `.类名`。

```css
.box {
  color: blue;
}
```

### 4.id 选择器

id 选择器（id selectors），使用 `#id`

```css
#home {
  color: green;
}
```

> 使用以上选择器的一些注意事项：
>
> - 一个 HTML 文档里面的 id 值是唯一的，不能重复 。
> - id、class 值如果由多个单词组成，单词之间可以用连字符（-）、下划线（_）连接，
> - 在HTML中，`id` 和 `class` 属性都被设计为**区分大小写**。也可以使用驼峰标识（大驼峰 AaBb 和小驼峰 aaBb 都可以。用的很少）；
> - 最好不要用标签名作为 id、class 值；

### 5.属性选择器

属性选择器的两种用法。

- 拥有某一个属性。
- 属性等于某个值。

```html
<head>
  <style>
    /* 拥有某一个属性 */
    [title] {
      color: red;
    }

    /* 属性等于某个值 */
    [title=info1] {
      background-color: blue;
    }
  </style>
</head>
<body>
  <div>我是div元素</div>
  <div title="info1">我也是div元素</div>
  <p>我是p元素</p>
  <h2 title="info2">我是h2元素</h2>
</body>
```

### 6.后代选择器，直接后代选择器

后代选择器：所有的后代（包括直接、间接的后代)），选择器之间以空格分割。

直接后代选择器：选择器之间以 `>` 分割;

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Document</title>
    <style>
      /* 后代选择器 */
      .home span {
        color: red;
        font-size: 30px;
      }

      /* .home 的子代的 span 元素设置一个背景 */
      .home > span {
        background-color: green;
      }
    </style>
  </head>

  <body>
    <div class="home">
      <span>啦啦啦啦</span>
      <div class="box">
        <span class="home-item">呵呵呵呵</span>
      </div>
      <div class="content">
        <div class="desc">
          <p>
            <span class="home-item">哈哈哈哈</span>
          </p>
        </div>
      </div>
    </div>
    <!-- 不希望被选中 -->
    <span>嘻嘻嘻</span>
    <div>
      <span>嘿嘿嘿</span>
    </div>
  </body>
</html>
```

### 7.相邻兄弟选择器、普通相抵选择器

兄弟选择器 2 种（仅针对选中元素后面的兄弟），使用方法。

相邻兄弟选择器，使用符号 `+` 连接。

普通兄弟选择器，使用符号 `~` 连接。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Document</title>
    <style>
      /* 相邻兄弟选择器 */
      .box + .content {
        color: red;
      }

      /* 普通兄弟选择器 */
      .box ~ div {
        font-size: 30px;
      }
    </style>
  </head>

  <body>
    <div class="home">
      <div>叽叽叽叽</div>
      <div class="box">呵呵呵呵</div>
      <div class="content">哈哈哈哈</div>
      <div>嘻嘻嘻嘻</div>
      <div>嘿嘿嘿嘿</div>
      <p>我是p元素</p>
    </div>
  </body>
</html>
```

### 8.交集选择器

交集选择器，指的是同时符合两个选择器条件（两个选择器紧密连接）。

用于精准的选择某一个元素;。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Document</title>
    <style>
      /* 交集选择器（元素选择器和类选择器相连） */
      div.box {
        color: red;
        font-size: 30px;
      }
    </style>
  </head>
  <body>
    <div class="box">我是div元素</div>
    <p class="box">我是p元素</p>
  </body>
</html>
```

### 9.并集选择器

并集选择器，符合一个选择器条件即可（两个选择器之间，以逗号分割）。

用于给多个元素设置相同的样式;

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Document</title>
    <style>
      body,
      p,
      h1,
      h2 {
        color: red;
        font-size: 40px;
      }
    </style>
  </head>
  <body>
    <p>我是p元素</p>
    <h1>我是h1元素</h1>
  </body>
</html>
```

## 四、元素的状态

元素是有状态的。比如：鼠标悬浮的元素；点击时的元素；点击后的元素...，这些都是有状态的元素。

## 五、伪类

伪类（pseudo-classes）是选择器的一种，用于选择处于特定状态的元素。

常见的伪类有哪些？

动态伪类（dynamic pseudo-classes）

- :link、:visited、:focus、:hover、:active

目标伪类（target pseudo-classes） 当元素 id，匹配当前 url 的 fragment 时，伪类生效。

- :target

语言伪类（language pseudo-classes） 如设置过 lang="en" 的元素，伪类 `:lang(en)` 生效（ lang 是 html 元素的全局属性）。

- :lang( )

元素状态伪类（UI element states pseudo-classes）

- :enabled、:disabled、:checked

**结构伪类（structural pseudo-classes）**

- :nth-child( )、:nth-last-child( )、:nth-of-type( )、:nth-last-of-type( )
- :first-child、:last-child、:first-of-type、:last-of-type
- :root（多指 html 元素）、:only-child、:only-of-type、:empty

否定伪类（negation pseudo-classes）

- :not()

`<a>` 元素举例，动态伪类的使用。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Document</title>
    <style>
      /* a 元素的链接从来没有被访问过 */
      a:link {
        color: red;
      }

      /* a 元素被访问过了 */
      a:visited {
        color: green;
      }

      /* a/input 元素聚焦(获取焦点)时 */
      a:focus {
        color: yellow;
      }

      /* a元素鼠标放到上面 */
      a:hover {
        color: blue;
      }

      /* a 元素点击时 */
      a:active {
        color: purple;
      }

      /* 所有的状态下同样的样式 */
      a {
        color: orange;
      }
    </style>
  </head>
  <body>
    <a href="http://www.mi.com">小米</a>
    <a href="http://www.baidu.com">百度一下</a>
    <input type="text" />
    <div>我是div元素</div>
  </body>
</html>
```

除了 a 元素，:focus、:hover、:active 也能用在其他元素上。

动态伪类编写顺序建议为 :link、:visited、:focus、:hover、:active。
