# a元素

锚点链接可以实现跳转到网页中的具体位置，分2步。代码实现。

1. 在要跳到的元素上定义一个id属性。
2. 定义a元素，并且a元素的 href 指向对应的 id

```html
	<a href="#haha" target="_blank">跳转</a>
	<div id="haha">hhh</div>
```

------

a元素和img元素一起使用，实现图片链接。

```html
<a href="https://www.mi.com/redmik50" target="_blank">
  <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/0ab8e5096ac6f08bd632e4d5a15d1792.jpg?w=632&h=340" alt="一张广告图片">
</a>
```

------

a元素可链接到其它URL地址，如下载压缩文件；发送邮件。

```html
<!-- 指向链接: zip压缩包 -->
<a href="https://github.com/coderwhy/HYMiniMall/archive/master.zip">下载zip包</a>
<!-- 指向其他协议地址: mailto -->
<a href="mailto:123@qq.com">发邮件给123@qq.com</a>
```

------

# iframe元素

iframe元素有什么用？

- 在一个HTML文档中，嵌入其它HTML文档。

使用它打开淘宝案例，

```html
<!-- width, height已不推荐作为属性使用。 -->
<iframe src="http://www.taobao.com" width="800" height="600" frameborder="0"></iframe>
```

怎么禁止网页在iframe中请求。

- 在响应头中设置 x-frame-option: sameorigin，意为只能在同源的网络环境中加载。

------

iframe 元素 frameborder 属性的作用。

- 用于规定是否显示边框：“1”显示，“0”不显示。

------

iframe元素与a元素结合，理解a元素target属性2个值的效果。

- _parent：在父窗口中打开URL。
- _top：在顶层窗口中打开URL。

```html
<!-- 一层嵌套 -->
<iframe src="./other/iframe元素所在的页面.html" frameborder="1"></iframe>
```

other/iframe元素所在的页面.html

```html
<!-- 二层嵌套 -->
<iframe src="./a元素所在的网页.html" frameborder="1"></iframe>
```

other/a元素所在的网页.html

```html
<!-- 三层嵌套，_top 在顶层打开url -->
<a href="http://www.taobao.com" target="_top">打开淘宝</a>
```

------

# HTML历史

理解HTML元素的历史，

1. 早期没有css，必须通过不同的HTML元素，来告诉浏览器一段文字如何显示（一个极端）。
2. 出现了css，结构和样式分离，此时HTML只需要负责结构即可。
3. 出现了div，span元素来编写HTML结构，此时一个页面，可仅用div来开发（另一个极端）。
4. 现在，更推荐使用语义化的HTML元素来编写hHTML文档，当样式不满足要求时，再使用css来调整。

------

# div, span

理解 div （division分开，分配）和 span （跨域，涵盖） 元素的意思和定位。

div元素和span元素都是“纯粹的”容器，也可把它们理解为“盒子”，他们都是用来包裹内容的。

无所用，无所不用。

结合css，页面中可以没有div，span，也可以全部是div，span

------

理解div和span元素的作用和区别。

div

- 多个div元素中包裹的内容会在**不同行**显示。

1. 一般作为其它元素的父容器，把其他元素包住，代表一个整体。
2. 用于把网页分割为多个独立的部分。

span

- 多个span元素中包裹的内容会在**同一行**。

1. 默认情况下，跟普通文本没有区别。
2. 用于区分特殊文本和普通文本，比如用来显示一些关键字。

------

# 其它常见元素

理解4个不常用元素的作用。

- strong：内容加粗，强调。
- i：内容倾斜。
- code：用于使用等宽的字体显示代码。
- br：换行元素，已不再使用。

[更多元素]: https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element	"更多元素"

------

# 全局属性

HTML元素中常见的全局属性4个，理解他们的作用。

- id：定义唯一标识符，在整个文档中是唯一的，目的是在使用链接（使用片段标识符），脚本或样式（使用css）时标识元素。
- class：一个以空格分割的元素的类名（classes）列表，允许css或JavaScript通过类选择器或DOM方法来选择和访问特定的元素。
- style：给元素添加内联样式。
- title：包含表示与其所属元素相关信息的文本，这些信息通常作为提示呈现给用户，不是必须的。

[更多属性]: https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes	"更多属性"

------

# 字符实体

什么是字符实体，

- 以连字号（&）开头，以分号（;）结尾的文本。

它有什么用。

- 显示保留字符（这些字符会被解析为HTML代码）和不可见的字符（如“不换行空格”）。
- 代替其它难以用标准键盘键入的字符。

常见的3个字符实体的写法。

- `<`：`&lt;`
- `>`：`&gt;`
- 空格：`&nbsp;`

------

# URL / URI

什么是URL，它的全称是 Uniform Resource Locator。意为统一资源定位符。

- 一个给定的独特资源在web上的地址，用于标识web技术使用的逻辑或物理资源。
- 每个有效的URL都指向一个唯一的资源，可以是一个HTML页面，一个CSS文档，一个图像等等。

URL的标准格式是什么，

- `[协议类型]://[用户信息]@[服务器地址]:[端口号]/[文件路径]/[文件名]?[查询]#[片段ID]`

理解query和fragment的作用。

- query：
  1. 给服务器传递额外的参数。
  2. 在前端路由中应用，组件之间传递数据。
- fragment：
  - 可理解为前端的锚点。

------

什么是URI，它的全称是 Uniform Resource Identifier。意为统一资源标识符。

- 在某一规则下，能把一个资源独一无二的表示出来。

它和URL的区别。

- URL是URI的子集。