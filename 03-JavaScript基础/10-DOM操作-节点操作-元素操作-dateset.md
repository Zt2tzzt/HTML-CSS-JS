# DOM 一 - 基本使用

DOM 意味着 HTML 文件中所有内容都会被抽象成对象，包括文本和注释。

---

Document 类和 document 对象有什么区别？

- Document 类的实例，是全局的 document 对象。
- Document 类不是 Element 的父类。它们都继承自 Node 类

---

document 对象有什么用？

- 对 DOM 的所有操作都是从 document 对象开始的；它是 DOM 的 入口，可以从 document 开始去访问任何节点元素；

```javascript
document.doctype // 获取文档申明
document.documentElement // 获取 html 元素
document.head // 获取 head 元素
document.body // 获取 body 元素
```

---

区分 document 中的节点（Node）和元素（Element），

- 节点（Node）中包含了**元素，文本，注释等**内容。
- 元素（Element）指的是 HTML 中的元素。

---

# 节点操作一 - 节点导航

什么是节点（Node）之间的导航（navigator）？

- 获取到一个节点（Node）对象后，根据这个节点对象去获取其他的节点对象。

有哪些相关 api？

- 父节点：`parentNode`
- 前兄弟节点：`previousSibling`
- 后兄弟节点：`nextSibling`
- 所有子节点：`childNodes`
- 第一个子节点：`firstChild`
- 最后一个子节点：`lastChild`

```javascript
var bodyEl = document.body
var bodyElFirstChild = bodyEl.firstChild // 获取 body 下第一个节点（Node）对象
```

理解图片。

![节点（Node）之间的导航（navigator）](NodeAssets/节点（Node）之间的导航（navigator）.jpg)

---

# 元素操作一 - 元素导航

什么是元素（Element）之间的导航（navigator）？

- 获取到一个元素（Element）对象后，根据这个元素获取其他的元素对象。

有哪些相关 api？

- 父元素：`parentElement`
- 前兄弟节点：`previousElementSibling`
- 后兄弟节点：`nextElementSibling`
- 子节点：`children` 返回一个 array-like 对象。
- 第一个子节点：`firstElementChild`
- 最后一个子节点：`lastElementChild`

```javascript
var bodyEl = document.body
var childElements = bodyEl.children // 获取 body 元素所有子元素(element)对象。
```

理解图片。

![元素（Element）之间的导航（navigator）](NodeAssets/元素（Element）之间的导航（navigator）.jpg)

---

vue，react 框架，底层也要操作 DOM，因为 DOM 操作有回流机制，所以在框架中只需操作一次 DOM 性能更高，

---

了解什么是表格（table）元素的导航（navigator）。

- table 元素支持以下属性：

  - `table.rows` — \<tr\> 元素的集合；
  - `table.caption/tHead/tFoot` — 引用元素 \<caption\>，\<thead\>，\<tfoot\>；
  - `table.tBodies` — \<tbody\> 元素的集合，table 中可能有多个 tbody；

- \<thead\>，\<tfoot\>，\<tbody\> 元素提供了 rows 属性

  - `tbody.rows` — 表格内部 \<tr\> 元素的集合；

- \<tr\>

  - `tr.cells` — 在给定 \<tr\> 中的 \<td\> 和 \<th\> 单元格的集合；
  - `tr.sectionRowIndex` — 给定的 \<tr\> 在封闭的 \<thead\>/\<tbody\>/\<tfoot\> 中的位置（索引）；
  - `tr.rowIndex` — 在整个表格中 \<tr\> 的编号（包括表格的所有行）；

- \<td\> 和 \<th\>：
  - `td.cellIndex` — 在封闭的 \<tr\> 中单元格的编号。

完成案例练习。

```javascript
var tableEl = document.body.firstElementChild
for (var i = 0; i < tableEl.rows.length; i++) {
  var rowEl = tableEl.rows[i]
  var cellEl = rowEl.cells[i]
  cellEl.style.backgroundColor = 'red'
  cellEl.style.color = 'white'
}
```

---

了解增强 VSCode 提示功能的方法，用断言语法，但运行代码时会报错，运行代码时要将它删除。

```javascript
var tableEl = document.body.firstElementChild as HTMLTableElement
tableEl.rows // 有提示
```

---

了解什么是表单（form）元素的导航（navigator）

```html
<form action="">
  <input name="account" type="text" />
</form>
```

- form 元素可以直接通过 document 来获取：`document.forms`

  ```javascript
  var formEl = document.forms[0]
  ```

- form 元素中的内容可以通过 elements 来获取：`form.elements`

  ```javascript
  var elements = formEl.elements
  ```

- form 子元素通过 name 来获取：`elements.[name]`

  ```javascript
  var inputEl = elements.account
  ```

---

# DOM 二 - 节点搜索

DOM 中获取任意元素的 2 种方式。

- 通过 DOM 导航属性（navigation property）

- document 对象上，获取元素的方法。5 种：

| 方法名                         | 搜索方式     | 在元素上调用（查找该元素后代） | 返回的对象是实时的 |
| ------------------------------ | ------------ | ------------------------------ | ------------------ |
| querySelector                  | CSS-selector | ✔                              | ❌                 |
| querySelectorAll               | CSS-selector | ✔                              | ❌                 |
| getElementById                 | id           | ❌                             | ❌                 |
| getElementsByName（不常用）    | name         | ❌                             | ✔                  |
| getElementsByTagName（偶尔用） | tag or \*    | ✔                              | ✔                  |
| getElementsByClassName         | class        | ✔                              | ✔                  |

- querySelectorAll（返回 NodeList 对象，不是数组，但可用 `forEach` 方法）

开发中如何选择？

- 当元素彼此靠近或相邻时，或需要拿一组数据时，选择导航的方式。
- 当需要任意的精确的获取某一个元素，选择使用 document 对象上，搜索元素的 5 种方法。

---

# 节点操作二 - 节点属性

节点（Node）的属性 `nodeType` 有什么用？

- 获取节点类型的属性；它有一个数值型值（numeric value）；

| 常量                    | 值  | 描述                                                                      |
| ----------------------- | --- | ------------------------------------------------------------------------- |
| Node.ELEMENT_NODE       | 1   | 一个元素节点，例如 \<p\> 和 \<div\>                                       |
| Node.TEXT_NODE          | 3   | Element 或者 Attr 中实际的 文字                                           |
| Node.COMMENT_NODE       | 8   | 一个 Comment 节点.                                                        |
| Node.DOCUMENT_NODE      | 9   | 一个 Document 节点。                                                      |
| Node.DOCUMENT_TYPE_NODE | 10  | 描述文档类型的 DocumentType 节点。例如 <!DOCTYPEhtml> 就是用于 HTML5 的。 |

---

节点（Node）的属性 `nodeName ` 和 `tagName ` 有什么不同？

- tagName，属性仅适用于 Element 节点，获取元素的标签名。
- nodeName，是为任意 Node 节点定义的，获取节点的名称。
  - 对于元素，它的意义与 tagName 相同，所以使用哪一个都是可以的；
  - 对于其他节点类型（text，comment 等），它拥有一个对应节点类型的字符串；

---

节点（Node）的属性 `data`（`nodeValue`），`innerHTML`，`outerHTML`，`textContent `有什么用，

- data（nodeValue）
  - 针对非元素的节点，获取数据。与 nodeValue 效果相同。
- innerHTML 属性
  - 将元素中的 HTML 获取为字符串形式；
  - 也可设置元素中的内容；
- outerHTML 属性
  - 包含了元素的完整 HTML
  - innerHTML 加上元素本身一样；
- textContent 属性

  - 仅仅获取元素中的文本内容；

innerHTML 和 textContent 有什么区别？

- 使用 innerHTML 设值时，将值“作为 HTML 代码”插入，带有所有 HTML 标签。
- 使用 textContent 设值时，将值“作为文本”插入，所有符号（symbol）均按字面意义处理。

```javascript
divNode.innerHTML = '<h2>呵呵呵呵</h2>'
divNode.textContent = '<h2>嘿嘿嘿嘿</h2>'
```

---

节点（Node）的属性 `hidden`，同时也是 HTML 元素的全局属性（布尔类型）。

```html
<body>
  <div id="box">哈哈哈哈哈</div>
  <button class="btn">切换</button>
  <script>
    // 1.获取元素
    var boxEl = document.querySelector('#box')
    var btnEl = document.querySelector('.btn')
    // 2.监听btn的点击
    btnEl.onclick = function () {
      boxEl.hidden = !boxEl.hidden
    }
  </script>
</body>
```

---

# 元素操作二 - 元素属性

节点元素（Element）还有哪些属性，例举 3 个。

- value，href，id

---

## Attribute

HTML 元素上的属性（attribute）可分为 2 类。

- 标准的 attribute：某些 attribute 属性是标准的，比如 id、class、title、href、type、value 等；
- 非标准的 attribute：某些 attribute 属性是自定义的，比如 abc、age、height 等；

```html
<div id="abc" class="box" title="box" age="18" height="1.88"></div>
```

---

元素（Element）对象针对所有的 attribute （标准/非标准）都有的操作：

- `elem.hasAttribute(name)` — 检查属性是否存在。
- `elem.getAttribute(name)` — 获取这个属性值。
- `elem.setAttribute(name, value)` — 设置这个属性值。
- `elem.removeAttribute(name) `— 移除这个属性。
- `elem.attributes`：- attr 对象的集合，每个对象具有 `name`、`value` 属性；

具备 2 点特性。

- 它们的名字是大小写不敏感的（id 与 ID 相同）。
- 它们的值总是字符串类型的（对于布尔类型的 attribute 如 `checked`，拿到的是空字符串，除非给布尔类型属性赋值）。

```html
<body>
  <div id="abc" class="box" title="box" age="18" height="1.88">我是box</div>
  <input type="checkbox" checked />

  <script>
    var boxEl = document.querySelector('.box')
    // 1.所有的attribute都支持的操作
    boxEl.hasAttribute('AGE')
    boxEl.hasAttribute('abc')
    boxEl.getAttribute('AGE')
    boxEl.getAttribute('abc')
    boxEl.setAttribute('id', 'cba')
    boxEl.removeAttribute('id')

    var boxAttributes = boxEl.attributes
    for (var attr of boxAttributes) {
      console.log(attr.name, attr.value)
    }

    // 2.getAttribute() 返回的是字符串类型
    var inputEl = document.querySelector('input')
    console.log(inputEl.getAttribute('checked')) // 空字符串
  </script>
</body>
```

---

## property

JavaScript 中对象上的属性称为 property。它与 attribute 的关系。

- **标准的 **attribute，会在 DOM 对象上创建与其对应的 property 属性
- **非标准的** attribute，则不会。

```javascript
var boxEl = document.querySelector('.box')
// id 、title 等标准的 attribute，在 DOM 对象上都有对应的 property
console.log(boxEl.id, boxEl.title)
```

---

JavaScript 中，通过 class 的 property，动态修改样式的 2 个方法。

- 在 CSS 中编写好对应的样式，动态的添加 class；

  ```css
  .active {
    color: red;
    font-size: 24px;
    background-color: green;
  }
  ```

  ```javascript
  var boxEl = document.querySelector('.box')
  boxEl.className = 'active' // 这样做不好，会覆盖掉原有的 class 名，推荐使用 classList
  boxEl.classList.add('active')
  ```

- 动态的修改 style 属性；

  ```javascript
  var boxEl = document.querySelector('.box')
  var counter = 1
  boxEl.onclick = function () {
    boxEl.style.width = 100 * counter++ + 'px'
  }
  ```

开发中如何选择？

- 大多数情况下，优先使用动态修改 class。
- 对于特殊情况，如精准修改某个 css 属性的值时，那么就修改 style 属性；

---

元素（Element）对象的 property `className`，为什么不叫 class？

- JavaScript 早期是不允许使用 class 这种保留字（现为关键字）来作为对象的属性，所以 DOM 规范使用了 className；
- 虽然现在 JavaScript 已经没有这样的限制，但是并不推荐这么做，并且依然在使用 className 这个名称；

---

元素（Element）对象的 property `className` 和 `classList` 有什么区别，

- 对 className 进行赋值，它会替换整个 class 中的字符串。
- 使用 classList 属性，可以添加或者移除单个的 class。

classList 的用法。

- `elem.classList.add(class)` ：添加一个类
- `elem.classList.remove(class)`：添加/移除类。
- `elem.classList.toggle(class)` ：如果类不存在就添加类，存在就移除它。
- `elem.classList.contains(class)`：检查给定类，返回 true / false。

```javascript
var boxEl = document.querySelector('.box')
var btnEl = document.querySelector('.btn')
btnEl.onclick = function () {
  boxEl.classList.toggle('active')
}
```

---

元素（Element）对象的 property `style` 使用时需要注意的 3 点。

- 对于多词（multi-word）属性，使用驼峰式 camelCase

  ```javascript
  boxEl.style.fontSize = '26px'
  ```

- 设置为空字符串，那么会使用 CSS 的默认样式：

  ```javascript
  boxEl.style.fontSize = '' // 使用默认 fontSize
  ```

- 多个样式的写法，使用 cssText 属性，不推荐，它会替换原来的行内样式。

  ```javascript
  boxEl.style.cssText = 'font-size: 30px; color: red;'
  ```

---

全局函数 `getComputedStyle` 用于读取元素样式计算值（可获取行内样式以外的样式值）。

```javascript
var boxEl = document.querySelector('.box')
boxEl.style.backgroundColor // 获取行内样式中设值的 background-color
getComputedStyle(boxEl).fontSize // 获取所有样式中 font-size 的计算值。
```

---

HTML5 中的 data-\* 如何使用？

```html
<body>
  <div id="abc" class="box" data-age="18" data-height="1.88"></div>
  <script>
    var boxEl = document.querySelector('.box')
    // 小程序开发中常使用
    console.log(boxEl.dataset.age)
    console.log(boxEl.dataset.height)
  </script>
</body>
```
