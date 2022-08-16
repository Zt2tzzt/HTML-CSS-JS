王者荣耀项目，当页面缩小出现滚动条，header右侧部分没有背景色。怎么解决？

- 页面中宽度最大的元素宽度，设置为 body 的最小宽度。

```css
body {
	min-width: 1300px;
}
```

-----

王者荣耀项目，当页面缩小时，背景图片也跟着缩放，需要设置背景图片固定 size（120% auto;）。

```css
.main {
	background: url(../img/bg-img.jpg) no-repeat center top/120% auto;
}
```

-----

网页使用 div + id/class 元素开发的弊端。

1. 对于浏览器来说这些元素不够语义化；
2. 对于搜索引擎来说, 不利于 SEO 的优化；

HTML5 新增的语义化元素有哪些？

- \<header\>：头部元素
- \<nav\>：导航元素
- \<section\>：定义文档某个区域的元素
- \<article\>：内容元素
- \<aside\>：侧边栏元素
- \<footer\>：尾部元素

它们有什么特点？

- 都为块级元素，默认没有样式。

-----

了解早期 web 如何实现多媒体功能。

- 在HTML5之前是通过 flash 或者其他插件实现的, 但是会有很多问题;
- 比如无法很好的支持 HTML/CSS 特性, 兼容性问题等等;

-----

HTML5新增了2种多媒体类型的支持，

- 音频：\<audio\>
- 视频：\<video\>

使用方法有2个。

- 直接通过元素使用 video 和 audio；
- 通过 JavaScript 的 API 对其进行控制；

-----

video 元素有什么用，它的属性有哪些，怎么使用？

- 用于在HTML或者XHTML文档中嵌入媒体播放器，用于支持文档内的视频播放。

```html
<video src="../video/fcrs.mp4" controls></video> <!-- 默认没有控制栏，需要加上 controls 属性。-->
```

| 常见属性 | 值的类型               | 属性作用                                                     |
| -------- | ---------------------- | ------------------------------------------------------------ |
| src      | url地址                | 视屏地址                                                     |
| width    | pixels（像素）         | 设置video宽度                                                |
| height   | pixels（像素）         | 设置video高度                                                |
| controls | Boolean类型            | 是否显示控制栏（音量，暂停，恢复播放）                       |
| autoplay | Boolean类型            | 是否自动播放（某些浏览器如chrome，为了用户体验需要添加 muted 属性，才有效） |
| muted    | Boolean类型            | 是否静音播放                                                 |
| preload  | none / metadata / auto | 是否需要预加载，metadata 表示加载元数据，如视频时长。常用 auto |
| poster   | url地址                | 一帧海报url                                                  |

-----

了解 video 支持的视屏格式有哪些。

![](NodeAssets/video元素支持的视屏格式.jpg)

-----

video 的兼容性写法2点（针对浏览器不支持此元素时候的降级处理）。

- 通过 \<source\> 元素指定更多视频格式的源;
- 通过 p / div 等元素指定在浏览器不支持 video 元素的情况, 显示的内容;

```html
<video src="./assets/fcrs.mp4" width="600" controls muted>
  <source src="./asset/fcrs.ogg">
  <source src="./asset/fcrs.webm">
  <p>当前您的浏览不支持视频的播放, 请更换更好用的浏览器!</p>
</video>
```

-----

audio 元素有什么用，它的属性有哪些，怎么使用？

- 用于在文档中嵌入音频内容, 和 video 的用法非常类似

```html
<audio src="./assets/yhbk.mp3" controls autoplay muted></audio>
```

| 常见属性 | 值的类型           | 属性作用                                              |
| -------- | ------------------ | ----------------------------------------------------- |
| src      | url地址            | 音频地址                                              |
| controls | Boolean类型        | 是否显示控制栏（音量，暂停，进度播放）                |
| autoplay | Boolean类型        | 是否自动播放（在 chrome 中无效）                      |
| muted    | Boolean类型        | 是否静音播放                                          |
| preload  | none/metadata/auto | 是否需要预加载，metadata 表示加载元数据，如视频时长。 |

-----

audio 一般使用 MP3 的格式。

-----

audio 的兼容性写法类似video。

```html
<audio src="./assets/fcrs.mp3" controls muted>
  <source src="./asset/fcrs.mp3">
  <p>当前您的浏览不支持音频的播放, 请更换更好用的浏览器!</p>
</audio>
```
-----

input 元素在HTML5中扩展的属性。

- placeholder：输入框的占位文字。
- multiple：多个值。
- autofocus：自动聚焦。

```html
<input type="text" placeholder="占位文本" autofocus>
<select multiple size="2">
  <option value="apple">苹果</option>
  <option value="banana">香蕉</option>
  <option value="orange">橘子</option>
</select>
```

input 元素在HTML5中 type 属性值的扩展。

- date
- time
- number
- tel
- color
- email
- range
- https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input

```html
<input type="color">
<input type="date">
<input type="range" min="0" max="1000">
```

-----

HTML5新增全局属性 data-*，有什么用，怎么使用？

- 用于自定义数据属性:
- data 设置的属性可以在 JavaScript 的 DOM 操作中通过 dataset 轻松获取到；
- 通常用于 HTML 和 JavaScript 数据之间的传递；

```html
<div class="box" age="18" data-name="zzt" data-age="18" data-height="1.88"></div>
<script>
  const boxEl = document.querySelector(".box")
  console.log(boxEl.dataset.age) // 18
</script>
```

- 在小程序中，经常使用data-*来传递数据。

-----

CSS属性 white-space 有什么用？

- 用于设置空白处理和换行规则。

它的属性有哪些？

- normal：合并所有连续的空白，允许单词超屏时自动换行。
- nowrap：合并所有连续的空白，不允许单词超屏时自动换行。
- pre：阻止合并所有连续的空白，不允许单词超屏时自动换行。
- pre-wrap：阻止合并所有连续的空白，允许单词超屏时自动换行。
- pre-line：合并所有连续的空白（但保留换行），允许单词超屏时自动换行。
-----

CSS属性 text-overflow 属性有什么用，2个属性值，

- clip：溢出的内容直接裁剪掉（字符可能会显示不完整） 
- ellipsis：溢出那行的结尾处用省略号表示

使用它的前提是什么？

- overflow 不能为 visible。

-----

CSS中已使用的函数有哪些，

- url / rgb / rgba / translate / rotate / scale ...

补充的4个函数有什么用？怎么使用。

- var: 使用CSS定义的变量; 

  - 属性名需要以两个减号（--）开始; 
  - 属性值则可以是任何有效的CSS值;

  ```css
  /* 相当于 html 元素选择器 */
  :root {
    /* 定义了一个变量(CSS属性) */
    /* 只有后代元素可以使用 */
    --main-color: #f00;
  }
  .box {
    color: var(--main-color);
  }
  .title {
    color: var(--main-color);
  }
  ```

- calc: 计算CSS值, 通常用于计算元素的大小或位置; 

  - 计算支持加减乘除的运算，+ 和 - 运算符的两边必须要有空白字符。

  ```css
  .item {
    /* width的百分比相对于包含块(父元素) */
    width: calc(100% - 100px);;
  }
  ```

- blur: 毛玻璃(高斯模糊)效果;（见下一篇） 

- gradient：颜色渐变函数（见下一篇）；

-----

包含块不一定是父元素，如一个绝对定位元素的父元素不是定位元素，那么该绝对定位元素的父元素不是它的包含块。

