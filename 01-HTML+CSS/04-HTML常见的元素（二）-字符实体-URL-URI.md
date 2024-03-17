# HTML常见的元素（二）、字符实体、URL/URI

## 一、a 元素

锚点链接可以实现跳转到网页中的具体位置，分 2 步。代码实现。

1. 在要跳到的元素上定义一个 `id` 属性。
2. 定义 a 元素，并且 a 元素的 href 指向对应的 id

```html
<a href="#haha" target="_blank">跳转</a>
<div id="haha">hhh</div>
```

a 元素和 img 元素一起使用，实现图片链接。

```html
<a href="https://www.mi.com/redmik50" target="_blank">
  <img
    src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/0ab8e5096ac6f08bd632e4d5a15d1792.jpg?w=632&h=340"
    alt="一张广告图片"
  />
</a>
```

a 元素可链接到其它 URL 地址，如下载压缩文件；发送邮件。

```html
<!-- 指向链接: zip压缩包 -->
<a href="https://github.com/coderwhy/HYMiniMall/archive/master.zip">下载zip包</a>

<!-- 指向其他协议地址: mailto -->
<a href="mailto:123@qq.com">发邮件给123@qq.com</a>
```

## 二、iframe 元素

iframe 元素，用于在一个 HTML 文档中，嵌入其它 HTML 文档。

在 iframe 中它打开淘宝：

```html
<!-- width, height 已不推荐作为属性使用。 -->
<iframe src="http://www.taobao.com" width="800" height="600" frameborder="0"></iframe>
```

怎么禁止网页在 iframe 中请求：在响应头中设置 `x-frame-option: sameorigin`，表示只能在同源的网络环境中加载。

iframe 元素 `frameborder` 属性的作用：用于规定是否显示边框：`1` 显示，`0` 不显示。

iframe 元素与 a 元素结合，理解 a 元素 `targe`t 属性 2 个值的效果。

- `_parent`：在父窗口中打开 URL。
- `_top`：在顶层窗口中打开 URL。

```html
<!-- 一层嵌套 -->
<iframe src="./other/iframe元素所在的页面.html" frameborder="1"></iframe>
```

other / iframe 元素所在的页面.html

```html
<!-- 二层嵌套 -->
<iframe src="./a元素所在的网页.html" frameborder="1"></iframe>
```

other / a 元素所在的网页.html

```html
<!-- 三层嵌套，_top 在顶层打开url -->
<a href="http://www.taobao.com" target="_top">打开淘宝</a>
```

## 三、HTML 历史

理解 HTML 元素的历史，

1. 早期没有 css，必须通过不同的 HTML 元素，来告诉浏览器一段文字如何显示（一个极端）。
2. 然后出现了 css，网页的结构和样式分离，此时 HTML 只需要负责搭建网页结构即可。
3. 出现了 `<div>`，`<span>` 元素来编写 HTML 结构，此时一个页面，可仅用 div 来开发（另一个极端）。
4. 现在，更推荐使用语义化的 HTML 元素，来编写 HTML 文档，当样式不满足要求时，再使用 css 来调整。

## 四、div, span

div 是 division 的缩写，表示分开，分配；span 表示跨域，涵盖。

div 元素和 span 元素，都是“纯粹的”容器，也可把它们理解为“盒子”，他们都是用来包裹内容的。

无所用，无所不用；

结合 css，页面中可以没有 div，span；也可以全部是 div，span

理解 div 和 span 元素的作用和区别。

多个 div 元素中，包裹的内容会在**不同行**显示。

1. 一般作为其它元素的父容器，把其他元素包住，代表一个整体。
2. 用于把网页分割为多个独立的部分。

多个 span 元素中，包裹的内容会在**同一行**。

1. 默认情况下，跟普通文本没有区别。
2. 用于区分特殊文本和普通文本，比如用来显示一些关键字。

## 五、其它常见元素

了解 4 个已被淘汰的元素。

`<strong>`：内容加粗，强调。

`<i>`：内容倾斜。

`<code>`：用于使用等宽的字体显示代码。

`<br>`：换行元素，已不再使用。

[更多元素](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element)

## 六、全局属性

了解 HTML 元素中常见的 4 个全局属性。

`id`：定义唯一标识符，其值在整个文档中是唯一的，目的是精确标识元素。

`class`：其值是以空格分割，允许 css 或 JavaScript 通过类选择器或 DOM 方法来选择和访问特定的元素。

`style`：给元素添加内联样式。

`title`：包含表示与其所属元素相关信息的文本，这些信息通常作为提示呈现给用户，不是必须的。

[更多属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes)

## 七、字符实体

字符实体，就是以连字号 `&` 开头，以分号 `;` 结尾的文本。

它主要用于：显示保留字符（这些字符会被解析为 HTML 代码）和不可见的字符（如“不换行空格”），以代替其它难以用标准键盘键入的字符。

常见的 3 个字符实体的写法。

- `<`：`&lt;`
- `>`：`&gt;`
- 空格：`&nbsp;`

## 八、URL

URL 的全称是 Uniform Resource Locator。意为**统一资源定位符**，它主要指的是：一个给定的独特资源，在 web 上的地址，用于标识 web 技术使用的逻辑或物理资源。每个有效的 URL 都指向一个唯一的资源，可以是一个 HTML 页面，一个 CSS 文档，一个图像等等。

URL 的标准格式：`[协议类型]://[用户信息]@[服务器地址]:[端口号]/[文件路径]/[文件名]?[查询(query)]#[片段ID(fragment)]`

query 有什么用：

- 给服务器传递额外的参数。
- 在前端路由中应用，组件之间传递数据。

fragment 有什么用：
- 可理解为前端的锚点。

## 九、URI

URI 的全称是 Uniform Resource Identifier。意为**统一资源标识符**。表示在某一规则下，能把一个资源独一无二的表示出来。

URL 是 URI 的子集。
