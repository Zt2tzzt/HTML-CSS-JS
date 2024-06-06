# 综合案例、BOM、JSON

## 一、事件处理

### 1.CSS 属性 pointer-events

CSS 属性 `pointer-events: none;` 的主要作用是使元素不可被点击或响应任何指针事件。具体来说：

- **禁用点击事件**：元素不再响应鼠标点击、悬停等指针事件。
- **鼠标穿透**：鼠标事件会传递给其下层的元素，就像这个元素不存在一样。

这个属性在以下场景中非常有用：

- **不可点击的覆盖层**：你可以创建一个覆盖层，防止用户与其下的内容交互，同时允许鼠标事件通过这个层传递到下面的元素。
- **禁用特定元素**：当你想暂时禁用某个元素的交互而不改变其外观时，可以使用这个属性。
- **SVG 中的应用**：在复杂的 SVG 图形中，可以使用该属性来控制哪些部分可以响应鼠标事件。

例如，下面的代码演示了一个覆盖层的应用：

```html
<div class="overlay"></div>
<button>Click Me</button>
```

```css
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  pointer-events: none; /* 禁用指针事件 */
}
```

在这个例子中，`.overlay` 覆盖层将不会响应鼠标点击事件，点击事件会传递到覆盖层下的按钮上。

### 2.王者荣耀轮播图增强

在前面的王者荣耀轮播图案例基础上，实现以下增强功能：

1. 添加定时器，实现轮播图的自动轮播。
2. 代码重构，封装一个切换轮播图的函数。
3. 当鼠标寻停在轮播图上，或者轮播图 title 上时，取消定时器，停止轮播。鼠标离开后，开始轮播。
4. 实现王者荣耀首页轮播图的默认效果，淡入、淡出效果（图片层叠抽取，而不是挨个位移。调整图片样式，做成王者默认轮播效果。）。

> CSS 中，绝对定位元素的 `left` 属性，百分数相对于定位父元素宽度。

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>王者荣耀-main-news</title>
    <link rel="stylesheet" href="./css/reset.css" />
    <link rel="stylesheet" href="./css/common.css" />

    <style>
      .main {
        height: 100px;
      }

      .news-section {
        display: flex;
        height: 342px;
      }

      .news-section .banner {
        width: 605px;
        background-color: #000;
        overflow: hidden;
      }

      .news-section .banner .image-list {
        position: relative;
        display: flex;
        width: 604px;
        height: 298px;
      }

      .news-section .banner .image-list .item {
        position: absolute;
        left: 100%;
        flex-shrink: 0;
        width: 100%;
      }

      .news-section .banner .image-list .item:first-child {
        left: 0;
        transition: left 300ms ease;
      }

      .news-section .banner .image-list .item a {
        display: block;
      }

      .news-section .banner .image-list .item a img {
        width: 100%;
      }

      .news-section .banner .title-list {
        display: flex;
        height: 44px;
        line-height: 44px;
      }

      .news-section .banner .title-list .item {
        flex: 1;
        text-align: center;
      }

      .news-section .banner .title-list .item a {
        display: block;
        font-size: 14px;
        color: #b1b2be;
      }
      .news-section .banner .title-list .item.active a,
      .news-section .banner .title-list .item a:hover {
        color: #f3c258;
        background-color: rgba(255, 255, 255, 0.15);
      }

      .news-section .news {
        flex: 1;
        background-color: purple;
      }

      .news-section .download {
        width: 236px;
        background-color: skyblue;
      }

      .news-section .download a {
        display: block;
        background: url(./img/main_sprite.png) no-repeat;
      }

      .news-section .download a.download-btn {
        height: 128px;
        background-position: 0 -219px;
      }

      .news-section .download a.guard-btn {
        height: 106px;
        background-position: 0 -350px;
      }

      .news-section .download a.experience-btn {
        height: 108px;
        background-position: 0 -461px;
      }
    </style>
  </head>
  <body>
    <div class="main main_wrapper">
      <div class="news-section">
        <div class="banner">
          <ul class="image-list">
            <li class="item">
              <a href="">
                <img src="./img/banner_01.jpeg" alt="" />
              </a>
            </li>
            <li class="item">
              <a href="">
                <img src="./img/banner_02.jpeg" alt="" />
              </a>
            </li>
            <li class="item">
              <a href="">
                <img src="./img/banner_03.jpeg" alt="" />
              </a>
            </li>
            <li class="item">
              <a href="">
                <img src="./img/banner_04.jpeg" alt="" />
              </a>
            </li>
            <li class="item">
              <a href="">
                <img src="./img/banner_05.jpeg" alt="" />
              </a>
            </li>
          </ul>
          <ul class="title-list">
            <li class="item active">
              <a href="#">桑启的旅途故事</a>
            </li>
            <li class="item">
              <a href="#">启示之音抢先听</a>
            </li>
            <li class="item">
              <a href="#">谁成为版本之子</a>
            </li>
            <li class="item">
              <a href="#">观赛体验升级</a>
            </li>
            <li class="item">
              <a href="#">季后赛开战</a>
            </li>
          </ul>
        </div>
        <div class="news"></div>
        <div class="download">
          <a class="download-btn" href="#"></a>
          <a class="guard-btn" href="#"></a>
          <a class="experience-btn" href="#"></a>
        </div>
      </div>
    </div>

    <script></script>

    <script>
      // 获取元素
      var titleListEl = document.querySelector('.title-list')
      var imageListEl = document.querySelector('.image-list')
      var bannerEl = document.querySelector('.banner')

      var activeTitleEl = titleListEl.querySelector('.active')
      var currentIndex = 0 // 记录当前轮播图
      var previousIndex = 0
      var timerId = null

      // 底部 titles 的切换, 同时进行轮播
      titleListEl.onmouseover = function (event) {
        // 确定发生鼠标进入的元素
        var itemEl = event.target.parentElement
        if (!itemEl.classList.contains('item')) return

        var index = Array.from(titleListEl.children).findIndex(function (item) {
          return item === itemEl
        })

        previousIndex = currentIndex
        currentIndex = index

        switchBanner()
      }

      startTimer()

      // 经停 banner 的事件
      bannerEl.onmouseenter = function () {
        clearInterval(timerId)
      }
      bannerEl.onmouseleave = function () {
        startTimer()
      }

      // 代码重构，封装一个切换轮播图的函数。
      function switchBanner() {
        for (var i = 0; i < imageListEl.children.length; i++) {
          var itemEl = imageListEl.children[i]

          if (i === currentIndex) {
            // 当前要展示的轮播图
            itemEl.style.transition = 'left 300ms ease'

            itemEl.style.left = '0'
          } else if (i < currentIndex) {
            // 需要放在左侧的轮播图
            if (i !== previousIndex) {
              itemEl.style.transition = 'none'
            }

            itemEl.style.left = '-100%'
          } else {
            // 需要放在右侧的轮播图
            if (i !== previousIndex) {
              itemEl.style.transition = 'none'
            }

            itemEl.style.left = '100%'
          }
        }

        // 排他思想
        activeTitleEl.classList.remove('active')

        var currentItemEl = titleListEl.children[currentIndex]
        currentItemEl.classList.add('active')

        activeTitleEl = currentItemEl
      }

      // 1.添加定时器，实现轮播图的自动轮播。
      function startTimer() {
        timerId = setInterval(function () {
          previousIndex = currentIndex
          currentIndex++

          if (currentIndex === titleListEl.children.length) currentIndex = 0

          switchBanner()
        }, 1000)
      }
    </script>
  </body>
</html>
```

---

书籍购物车案例实现。

```html
<body>
  <table>
    <thead>
      <tr>
        <th>编号</th>
        <th>书籍名称</th>
        <th>出版日期</th>
        <th>价格</th>
        <th>购买数量</th>
        <th>操作</th>
      </tr>
    </thead>
    <tbody></tbody>
  </table>
  <h2 class="price">总价格: ¥<span class="price-count">0</span></h2>
  <script>
    // 1.从服务器获取数据 ajax/fetch
    var books = [
      { id: 1, name: '《算法导论》', date: '2006-09', price: 85.0, count: 3 },
      { id: 2, name: '《UNIX编程艺术》', date: '2006-02', price: 59.0, count: 2 },
      { id: 3, name: '《编程珠玑》', date: '2008-10', price: 39.0, count: 5 },
      { id: 4, name: '《代码大全》', date: '2006-03', price: 128.0, count: 8 }
    ]
    // 2.对数据展示
    // 到底通过 html 直接编写, 还是通过 JavaScriptDOM 操作创建元素
    // 1> 对于固定的, 直接通过 html 编写(能通过 html 编写, 尽量通过 html 直接编写)
    // 2> 对于那些大量的数据, 有规律的数据, 可以通过 JavaScript 编写
    var tbodyEl = document.querySelector('tbody')
    // 2.2. 动态添加 tr 以及内部数据
    for (var i = 0; i < books.length; i++) {
      var trowEl = document.createElement('tr')
      // 2.3. 放具体数据
      var book = books[i]
      var bookKeys = Object.keys(book)
      for (var j = 0; j < bookKeys.length; j++) {
        var key = bookKeys[j]
        var value = book[key]
        var tdEl = document.createElement('td')
        tdEl.textContent = key === 'price' ? '¥' + value : value
        trowEl.append(tdEl)
      }
      // 2.4. 添加删除按钮
      var deleteTdEl = document.createElement('td')
      var deleteBtnEl = document.createElement('button')
      deleteBtnEl.textContent = '删除'
      deleteTdEl.append(deleteBtnEl)
      trowEl.append(deleteTdEl)
      // 2.5.监听删除按钮的点击
      deleteBtnEl.onclick = function () {
        // 1.删除对应的 row
        var deleteTRowEl = this.parentElement.parentElement
        var deleteTrIndex = deleteTRowEl.sectionRowIndex // 先拿到删除行的索引，再进行删除
        deleteTRowEl.remove()
        // 2.删除对应books中的数据
        books.splice(deleteTrIndex, 1)
        // 3.重新计算一次价格
        calcTotalPrice()
      }
      tbodyEl.append(trowEl)
    }
    // 3.计算总价格
    var priceCountEl = document.querySelector('.price-count')
    calcTotalPrice()
    // 封装计算价格的函数
    function calcTotalPrice() {
      var totalPrice = books.reduce((accumulate, item) => accumulate + item.count * item.price, 0)
      priceCountEl.textContent = totalPrice
    }
  </script>
</body>
```

---

# BOM

BOM 全称：浏览器对象模型（Browser Object Model）

它是什么？

- 由浏览器提供的用于处理文档（document）之外的所有内容的其他对象；
- 连接 JavaScript 脚本与浏览器窗口的桥梁。

---

BOM 主要包括哪些对象模型？

- `window`：包括全局属性、方法，控制浏览器窗口相关的属性、方法；
- `location`：浏览器连接到的对象的位置（URL）；
- `history`：操作浏览器的历史；
- `navigator`：用户代理（浏览器）的状态和标识（很少用到）；
- `screen`：屏幕窗口信息（很少用到）；

---

## window

看待 window 对象的两个角度。

1. 全局对象（在 Node 中是 `global`，浏览器和 Node 中都可以用 `globalThis` 表示）。
2. 浏览器窗口对象，提供了浏览器操作相关的 API。

---

window 对象包含哪 4 方面内容？

1. 包含大量的属性，localStorage、console、location、history、screenX、scrollY 等等（大概 60+个属性）；
2. 包含大量的方法，alert、scrollTo，close、open 等等（大概 40+个方法）；
3. 包含大量的事件，focus、blur、load、hashchange 等等（大概 30+个事件）；
4. 包含从 EventTarget 继承过来的方法，addEventListener、removeEventListener、dispatchEvent 方法；

---

MDN 文档中 API 前面的 3 种符号。

- 删除符号：表示这个 API 已经废弃，不推荐继续使用了；
- 点踩符号(感叹号)：表示这个 API 不属于 W3C 规范，某些浏览器有实现（有兼容性的问题）；
- 实验符号：该 API 是实验性特性，以后可能会修改，并且存在兼容性问题；

---

window 对象中的 open 和 close 方法 。

```javascript
var openBtnEl = document.querySelector('button')
var closeBtnEl = document.querySelector('.close')
openBtnEl.onclick = function () {
  window.open('./page/new.html', '_blank')
}
closeBtnEl.onclick = function () {
  window.close() // 只能关闭由 open 方法打开的页面
}
```

---

window 上的事件 focus，blur，hashchange

```javascript
window.onfocus = function () {
  console.log('窗口获取到焦点')
}
window.onblur = function () {
  console.log('窗口失去了焦点')
}
window.onhashchange = function () {
  console.log('hash值发生改变')
}
```

---

## location

location 对象有什么用，

- 用于表示 window 上当前链接到的 URL 信息。

它有哪些属性？

- `href`: 当前 window 对应的超链接 URL, 整个 URL；
- `protocol`: 当前的协议；
- `host`: 主机地址；
- `hostname`: 主机地址(不带端口)；
- `port`: 端口；
- `pathname`: 路径；
- `search`: 查询字符串；
- `hash`: 哈希值；
- username：URL 中的 username（很多浏览器已经禁用）；
- password：URL 中的 password（很多浏览器已经禁用）

理解 location 是 URL 抽象图解。

![location是URL的抽象理解](NodeAssets/location是URL的抽象理解.jpg)

---

location 的 3 个方法，有什么用，代码演示。

- `assign`：赋值一个新的 URL，并且跳转到该 URL 中；
- `replace`：打开一个新的 URL，并且跳转到该 URL 中（不同的是不会在浏览记录中留下之前的记录）；
- `reload`：重新加载页面，可以传入一个 Boolean 类型；

```javascript
var btns = document.querySelectorAll('button')
btns[0].onclick = function () {
  location.assign('http://www.baidu.com')
}
btns[1].onclick = function () {
  location.replace('http://www.baidu.com')
}
btns[2].onclick = function () {
  location.reload()
}
```

---

`URLSearchParams` 构造函数（类）有什么用，

- 定义了一些实用的方法来处理 URL 的查询字符串

它有哪些方法？

- `get`：获取搜索参数的值；
- `set`：设置一个搜索参数和值；
- `append`：追加一个搜索参数和值；
- `has`：判断是否有某个搜索参数；
- `toString`：将对象转成字符串。

```javascript
var searchParams = new URLSearchParams('?name=zzt&age=18&height=1.88')
searchParams.get('name')
searchParams.append('address', '广州市')
searchParams.toString()
```

---

URL 中如果有中文，会使用 `encodeURIComponent` 和 `decodeURIComponent` 进行编码和解码。

```javascript
encodeURIComponent('深圳市') // '%E6%B7%B1%E5%9C%B3%E5%B8%82'
decodeURIComponent('%E6%B7%B1%E5%9C%B3%E5%B8%82') // 深圳市
```

---

## history

前端路由的核心概念：修改了 URL（history / hash），但页面不刷新。

---

history 对象（HTML5 新特性）

2 个属性

- `length`：会话中的记录条数；
- `state`：当前保留的状态值；

5 个方法。案例实现。

- `back()`：返回上一页，等价于 history.go(-1)；
- `forward()`：前进下一页，等价于 history.go(1)；
- `go()`：加载历史中的某一页；
- `pushState()`：打开一个指定的地址；页面不刷新。
- `replaceState()`：打开一个新的地址，并且使用 replace；不能后退，页面不刷新。

```javascript
var btnEl = document.querySelector('button')
btnEl.onclick = function () {
  /**
   * arg1：状态对象
   * arg2：标题，大多数浏览器忽略，一般传空字符串。
   * arg3：url
   */
  // history.pushState({ name: "zzt", age: 18 }, "", "/zzt")
  history.replaceState({ name: 'zzt', age: 18 }, '', '/zzt')
}
```

---

## navigator & screen

了解 navigator 和 screen 对象有什么用。

- navigator 对象表示用户代理的状态和标识等信息。
- screen 主要记录的是浏览器窗口外面的客户端显示器的信息
  - 如屏幕的逻辑像素 `screen.width`、`screen.height`；

---

# JSON

什么是 JSON（JavaScript Object Notation）

- 一种数据格式，不是编程语言，算是 JavaScript 的一个子集。

除了 JSON 还有什么传输格式？

- XML：在早期的网络传输进行数据交换，在解析、传输等各方面都弱于 JSON，目前已很少被使用；（多见于后端框架配置文件）
- Protobuf：在网络传输中目前已经越来越多使用的传输格式，直到 2021 年的 3.x 版本才支持 JavaScript，目前在前端使用的较少；

JSON 的使用场景。

- 网络数据的传输；
- 项目的某些配置文件；
- 非关系型数据库（NoSQL）将 json 作为存储格式；

---

JSON 的顶层支持 3 种类型的值。

- 简单值：数字（Number）、字符串（String，不支持单引号）、布尔类型（Boolean）、null 类型；**没有 undefined**
- 对象值：由 key、value 组成，key 是字符串类型，必须加双引号，值可以是简单值、对象值、数组值；
- 数组值：数组的值可以是简单值、对象值、数组值；

---

什么是 JSON 的序列化和反序列化？

- 对象类型转化成 JSON 格式的字符串，将 JSON 格式字符串转成对象类型。

对应的方法。（JSON 是 ES5 中的全局对象）

- JSON.stringify()：将 JavaScript 类型转成对应的 JSON 字符串；
- JSON.parse()：解析 JSON 字符串，转回对应的 JavaScript 对象类型；

---

JSON.stringify() 的 replace 参数，space 参数，

- `JSON.stringify(obj[, replace[, space]])`
- replace，可传函数或数组，用于序列化时做处理。
- space，可传字符或数字。用于格式化生成的字符串，

JSON 对象的 `toJSON` 方法。

```javascript
var obj = {
  name: 'zzt',
  age: 18,
  friend: {
    name: 'CR7'
  },
  toJSON: function () {
    return '123'
  }
}
// 1.replacer参数
var objJSONString = JSON.stringify(obj, (key, value) => (key === 'name' ? 'zt2tzzt' : value), 2) // 123
```

---

JSON.parse() 的 reviver 参数。

- `JSON.parse(text[, reviver])`
- reviver，只能传入函数，用于反序列化时做处理

```javascript
var newObj = JSON.parse(str, (key, value) => (key === 'age' ? value * 2 : value))
```
