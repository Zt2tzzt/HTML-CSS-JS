# DOM 基本使用（ 二）、事件

## 一、元素操作

### 1.创建、插入元素

前面我们使用过 `document.write` 方法，写入一个元素：

- 这种方式写起来非常便捷，但是对于复杂的内容、元素关系拼接并不方便；
- 它是在早期没有 DOM 的时候使用的方案，目前依然被保留了下来；

前面我们也使用过节点属性 `innerHTML`，写入一个元素，这种方式：

- 会增加解析字符串的步骤；
- 插入的对象还要重新获取。

```javascript
var boxEl = document.querySelector('.box')

boxEl.innerHTML = `<h2 class="title">我是标题</h2>`
```

那么目前我们想要通过 DOM 创建（插入）一个元素，通常会按照如下步骤：

1. 使用 Document 类的静态方法 [Document.createElement()](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/createElement) 创建一个元素；
2. 将元素插入到 DOM 的某一个位置；

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>demo</title>

  <style>
    .title {
      color: red;
    }
  </style>
</head>
<body>
  <div class="box"></div>

  <script>
    var boxEl = document.querySelector('.box')

    // 创建元素对象。
    var h2El = document.createElement('h2')

    h2El.innerHTML = '我是标题！'
    h2El.classList.add('title')

    boxEl.append(h2El)
  </script>
</body>
</html>
```

插入元素的 5 个方法，它们有什么作用？

- [Element.append()](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/append)`node.append(...nodes or strings)`，在 node 子元素末尾插入节点，
- [Element.prepend()](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/prepend) `node.prepend(...nodes or strings)`，在 node 子元素开头插入节点，
- [Element.before()](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/before) `node.before(...nodes or strings)`，在 node 前面插入节点，
- [Element.after()](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/after) `node.after(...nodes or strings)`，在 node 后面插入节点，
- [Element.replaceWith()](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/replaceWith) `node.replaceWith(...nodes or strings)`，将 node 替换为给定的节点。

这些方法之间的关系，如下图所示。

![插入元素的4种方法](NodeAssets/插入元素的4种方法.jpg)

在一些地方我们可能会看到一些早期的元素插入操作方法，现在已经用的很少，这里仅作了解：

- `parentElem.appendChild(node)`，在 parentElem 父元素最后位置添加一个子元素
- `parentElem.insertBefore(node, nextSibling)`，在 parentElem 的后兄弟节点（nextSibling）前面插入一个子元素；
- `parentElem.replaceChild(node, oldChild)`，在 parentElem 中，新元素替换之前的 oldChild 元素；
- `parentElem.removeChild(node)`，在 parentElem 中，移除某一个元素；

### 2.移除元素

移除元素，可以调用元素本身的 [Element.remove()](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/remove) 方法。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>demo</title>
  </head>
  <body>
    <div class="box">哈哈</div>
    <button class="remove-btn">remove</button>

    <script>
      var boxEl = document.querySelector('.box')
      var btnEl = document.querySelector('.remove-btn')

      btnEl.onclick = function () {
        boxEl.remove()
      }
    </script>
  </body>
</html>
```

### 3.克隆元素

如果我们想要复制一个现有的元素，可以通过元素对象本身的 [Node.cloneNode](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/cloneNode) 方法：

- 可以传入一个 Boolean 类型的值，来决定是否是深度克隆；
- 深度克隆会克隆对应元素的子元素，否则不会；

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>demo</title>
  </head>
  <body>
    <div class="box">哈哈</div>
    <button class="clone-btn">clone</button>

    <script>
      var boxEl = document.querySelector('.box')
      var cloneBtnEl = document.querySelector('.clone-btn')

      cloneBtnEl.onclick = function () {
        var newNode = boxEl.cloneNode(true)
        boxEl.after(newNode)
      }
    </script>
  </body>
</html>
```

## 二、元素案例练习

### 1.动态创建列表

通过 prompt 接收用户的输入，根据输入创建一个列表：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>demo</title>
  </head>
  <body>
    <ul class="list"></ul>
    <button class="in">输入</button>

    <script>
      var ulEl = document.querySelector('.list')
      var btnEl = document.querySelector('.in')

      btnEl.onclick = function () {
        var result = prompt('请输入列表元素：')
        
        var liEl = document.createElement('li')
        liEl.textContent = result

        ulEl.append(liEl)
      }
    </script>
  </body>
</html>
```

### 2.计数器案例

实现计数器案例。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>demo</title>
  </head>
  <body>
    <h2>0</h2>
    <button class="add">+</button>
    <button class="sub">-</button>

    <script>
      let count = 0
      
      const h2El = document.querySelector(`h2`)
      const btnAddEl = document.querySelector(`.add`)
      const btnSubEl = document.querySelector(`.sub`)

      btnAddEl.onclick = function () {
        h2El.textContent = ++count
      }
      btnSubEl.onclick = function () {
        h2El.textContent = --count
      }
    </script>
  </body>
</html>
```

### 3.动态显示当前时间

了解 [String.prototype.padStart()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/padStart) 方法，用另一个字符串填充当前字符串（如果需要会重复填充），直到达到给定的长度。填充是从当前字符串的开头开始的。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>demo</title>
  </head>
  <body>
    <h1 class="time">2022-05-19 11:14:30</h1>

    <script>
      /** 封装的工具函数
       * content，要格式化的内容。
       * count，要补全的字符位数。
       * padStr，要补全的字符。
       */
      function padLeft(content, count = 2, padStr = '0') {
        return String(content).padStart(count, padStr)
      }

      // 1.获取时间的元素
      var timeEl = document.querySelector('.time')

      // 每隔1s执行一次
      setInterval(function () {
        // 2.获取具体的时间并且进行格式化
        var date = new Date()
        var year = date.getFullYear()
        var month = padLeft(date.getMonth() + 1)
        var day = padLeft(date.getDate())
        var hour = padLeft(date.getHours())
        var minute = padLeft(date.getMinutes())
        var second = padLeft(date.getSeconds())

        // 3.将时间放到timeEl中
        timeEl.textContent = `${year}-${month}-${day} ${hour}:${minute}:${second}`
      }, 1000)
    </script>
  </body>
</html>
```

### 4.时间倒计时

在页面展示当前时间，到今天结束的倒计时。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>demo</title>

    <style>
      .time {
        display: inline-block;
        width: 36px;
        height: 36px;
        border-radius: 5px;
        text-align: center;
        line-height: 36px;
        color: #fff;
        background-color: red;
      }
    </style>
  </head>
  <body>
    <div class="countdown">
      <span class="time hour">00</span>
      <span class="split">:</span>
      <span class="time minute">00</span>
      <span class="split">:</span>
      <span class="time second">00</span>
    </div>

    <script>
      // 工具函数
      function padLeft(content, count = 2, padStr = '0') {
        return String(content).padStart(count, padStr)
      }
    </script>

    <script>
      // 1.获取元素
      var hourEl = document.querySelector('.hour')
      var minuteEl = document.querySelector('.minute')
      var secondEl = document.querySelector('.second')

      // 创建一天的结束时间对象（24点）
      var nowDate1 = new Date()
      var endTime = nowDate1.setHours(24, 0, 0, 0)


      // 每隔 1s，计算结束时间 - 当前时间
      setInterval(function () {
        var nowDate2 = new Date()
        var nowTime = nowDate2.getTime()

        var intervalTime = Math.floor((endTime - nowTime) / 1000) // 结束时间 - 当前时间，获取间隔秒数

        var hour = Math.floor(intervalTime / 3600) // 获取间隔小时
        var minute = Math.floor(intervalTime / 60) % 60 // 获取间隔分钟
        var second = intervalTime % 60 // 获取间隔秒钟

        // 2.设置内容
        hourEl.textContent = padLeft(hour)
        minuteEl.textContent = padLeft(minute)
        secondEl.textContent = padLeft(second)
      }, 1000)
    </script>
  </body>
</html>
```

> 在上面的案例中，一般将 DOM 对象放在全局，而不是放在某个回调函数中，以提高性能。

## 三、元素对象属性（property）

了解元素的大小，滚动对应的属性。

### 1.元素大小属性

- `clientWidth`：contentWith + padding（不包含滚动条）。
- `clientHeight`：contentHeight + padding。
- `offsetWidth`：元素完整的宽度。
- `offsetHeight`：元素完整的高度。
- `offsetLeft`：距离最近定位元素左侧的长度。
- `offsetTop`：距离最近定位元素的上面的长度。
- `clientTop`：border-top 的宽度。
- `clientLeft`：border-left 的宽度。

### 2.元素滚动属性

- `scrollHeight`：整个可滚动的区域高度。
- `scrollTop`：滚动部分的高度。

理解图片

![元素的大小，滚动对应的属性](NodeAssets/元素的大小，滚动对应的属性.jpg)

## 四、window 对象属性

window 对象，表示整个浏览器窗口（文档、页面）。

### 1.window 对象大小属性

window 的宽度、高度应该怎么获取：

- window 对象的 `innerWidth`、`innerHeight` 属性：用于获取 window 窗口的宽度和高度（包含滚动条）。
- window 对象的 `outerWidth`、`outerHeight` 属性：用于获取 window 窗口的整个宽度和高度（包括调试工具、工具栏）

> 在 HTML 文档中，获取 html 元素的宽高，应使用 html 元素对象的属性 `clientHeight`、`clientWidth`。
>
> 使用全局对象 `documentElement` 获取 html 元素对象：
>
> ```javascript
> documentElement.clientHeight
> 
> documentElement.clientWidth
> ```

### 2.window 对象滚动属性

获取 window 窗口（文档、页面）垂直，水平方向滚动的位置的像素值，有如下两个属性：

- `scrollX`：X 轴滚动的位置（别名 pageXOffset）
- `scrollY`：Y 轴滚动的位置（别名 pageYOffset）

### 3.window 对象滚动方法

window 对象，也有提供对应的滚动方法：

- 方法 `scrollBy(x, y)`：将页面滚动至相对于当前位置的 (x, y) 位置；
- 方法 `scrollTo(pageX, pageY)`： 将页面滚动至绝对坐标；

## 五、window 对象案例练习

### 1.回到顶部

当窗口向下滚动 400px 后，显示“回到顶部”按钮；点击该按钮，回到顶部。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>demo</title>

    <style>
      div {
        width: 233px;
        height: 1999px;
        background-color: orange;
      }
      .scroll-btn {
        position: fixed;
        right: 20px;
        bottom: 20px;
      }
    </style>
  </head>
  <body>
    <div class="haha">哈哈</div>
    <button class="scroll-btn">回到顶部</button>

    <script>
      var scrollBtnEl = document.querySelector('.scroll-btn')

      window.onscroll = function () {
        scrollBtnEl.hidden = window.scrollY < 600
      }

      scrollBtnEl.onclick = function () {
        window.scrollTo(0, 0)
      }
    </script>
  </body>
</html>
```

window 对象包含了整个浏览器，但它的事件只能在显示内容区域监听。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>demo</title>

    <style>
      div.box {
        background-color: orange;
        height: 443px;
        overflow: auto;
      }
      div.haha {
        width: 233px;
        height: 533px;
        background-color: red;
      }
    </style>
  </head>
  <body>
    <div class="box">
      <div class="haha">哈哈</div>
    </div>

    <script>
      var boxEl = document.querySelector('.box')

      window.onclick = function () {
        console.log(boxEl.scrollTop)
      }
    </script>
  </body>
</html>
```

## 六、事件处理

Web 页面，需要经常和用户之间进行交互，比如：

- 用户点击了某个按钮；
- 用户在输入框里面输入了某个文本；
- 用户鼠标经过了某个位置；

很多时候，我们想要在 JavaScript 代码中捕捉这个交互的过程。

那么浏览器，就需要搭建一个桥梁连接 JavaScript 代码和浏览器事件；

当某个事件发生时，让 JavaScript 可以做出响应（执行某个函数），所以我们需要针对事件编写处理程序（handler）；

### 1.事件监听

在浏览器中监听事件，有 3 种方式，前两个方式存在的弊端。

- 方式一：在元素对应的 attribute 中写 script 代码直接监听（这么写，阅读性太差了）。

  ```html
  <button onclick="console.log('按钮1发生了点击~');">按钮1</button>
  ```

- 方式二：使用 DOM 操作中，元素对象的属性（property） `onxxx` 来监听事件（这么写，就不能添加多个事件，后一个事件会覆盖前一个事件），

  ```javascript
  btn2El.onclick = function () {
    console.log('按钮2发生了点击~')
  }

  btn2El.onclick = function () {
    console.log('按钮2的第二个处理函数')
  }
  ```

- 方式三：通过实现了 EventTarget 接口的元素对象中的 `addEventListener` 方法来监听（推荐的方法）；

  ```javascript
  btn3El.addEventListener("click", function () {
    console.log("第一个btn3的事件监听~")
  }
  ```

### 2.常见事件

鼠标事件：

- `click`，当鼠标点击一个元素时（触摸屏设备会在点击时生成）。
- `mouseover` / `mouseout`，当鼠标指针移入/离开一个元素时。
- `mousedown` / `mouseup`，当在元素上按下/释放鼠标按钮时。
- `mousemove`，当鼠标移动时。

键盘事件：

- `keydown`，当按下一个按键时。
- `keyup`，当松开一个按键时。

表单（form）元素事件：

- `submit`，当访问者提交了一个 form 时。
- `focus`，当访问者聚焦于一个元素时，例如聚焦于一个 input 元素。

Document 事件：

- `DOMContentLoaded`，当 HTML 的加载和处理都完成，并且 DOM 被完全构建完成时。

CSS 事件：

- `transitionend`，当一个 CSS 动画完成时。

### 2.事件流

对于浏览器中的事件，有一个概念叫做事件流，

我们可以想到一个问题：当我们在浏览器上，点击一个元素时，点击的不仅仅是这个元素本身；而是与它有嵌套关系的所有 HTML 元素；比如：

- 一个 span 元素，放在一个 div 元素里面；
- 这个 div 元素，又放在 body 元素里面；
- body 元素，又放在 html 元素里面；

那么。点击这个 span 元素时，div 元素，body 元素都被点击了，这样就产生了事件流。

#### 1.事件捕获

事件捕获，是一种事件监听的顺序，

- 事件由元素外层，向元素内层传递。
- 元素外层先监听到事件，元素内层后监听到事件。

#### 2.事件冒泡

事件冒泡，也是一种事件监听的顺序，

- 事件由元素内层，向元素外层传递。
- 元素内层先监听到事件，元素外层后监听到事件。

使用实现了 EventTarget 接口的元素对象上的 `addEventListener` 方法，来监听事件，默认在事件冒泡的事件流中监听，

如果要在事件捕获的事件流中监听，要传入第 3 个布尔类型的参数为 `true`，如下方代码所示：

```javascript
spanEl.addEventListener(
  'click',
  function () {
    console.log('span 元素发生了点击~捕获')
  },
  true
)
```

事件流的过程，和事件流中的三个阶段，如下图所示：

1. 捕获阶段（Capturing phase），事件（从 Window）向下走近元素。
2. 目标阶段（Target phase），事件到达目标元素。
3. 冒泡阶段（Bubbling phase），事件从元素上开始冒泡。

![事件流过程](NodeAssets/事件流过程.jpg)

事实上，我们可以通过 event 对象的 `eventPhase` 属性，来获取当前事件的阶段：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>demo</title>

    <style>
      .box {
        background-color: red;
      }
    </style>
  </head>
  <body>
    <div class="box">哈哈</div>

    <script>
      var boxEl = document.querySelector('.box')
      
      boxEl.addEventListener('click', function (event) {
        console.log('event.eventPhase', event.eventPhase) // 2
      })
    </script>
  </body>
</html>
```

开发中通常会在默认事件流事件冒泡中，进行监听。

### 3.事件对象

当一个事件发生时，就会有和这个事件相关的很多信息：比如：

- 事件的类型是什么；
- 事件作用域哪一个元素，
- 事件作用的位置是哪里
- ...

这些信息，会被封装到一个 event 对象中，这个对象由浏览器创建。它给我们提供了一些想要的属性，以及一些操作方法；

event 对象，会在 `addEventListener` 传入的事件处理（event handler）函数回调时，被系统传入，我们可以在回调函数中拿到它；

```javascript
divEl.onclick = function (event) {}

divEl.addEventListener('click', function (event) {})
```

event 对象中的属性。

- `type`：事件的类型；
- `target`：事件发生的元素；
- `currentTarget`：当前处理事件的元素；
- `eventPhase`：事件所处的阶段（事件流）（事件捕获阶段：1；当前元素阶段：2；事件冒泡阶段：3）；
- `offsetX`、`offsetY`：事件发生在元素内的位置；
- `clientX`、`clientY`：事件发生在客户端内的位置；
- `pageX`、`pageY`：用于获取鼠标事件（如 `click`、`mousemove` 等）相对于整个文档的 X 和 Y 坐标，这些属性在处理鼠标事件时非常有用，因为它们提供了鼠标指针在页面上的精确位置。

- `screenX`、`screenY`：事件发生相对于屏幕的位置；

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>demo</title>

    <style>
      #clickArea {
        background-color: red;
      }
    </style>
  </head>

  <body>
    <div id="clickArea" style="width: 500px; height: 500px; border: 1px solid black">
      Click inside this box
    </div>

    <script>
      document.getElementById('clickArea').addEventListener('click', function (event) {
        // 获取 pageX 和 pageY 属性
        var x = event.pageX
        var y = event.pageY

        console.log('Mouse clicked at:', x, y)
        alert('Mouse clicked at: X=' + x + ' Y=' + y)
      })
    </script>
  </body>
</html>
```

event 对象中的方法：

- `preventDefault`：取消事件的默认行为；
- `stopPropagation`：阻止事件的进一步传递（事件冒泡、事件捕获都可以阻止）；

### 4.事件处理函数 this 指向

事件处理函数中，我们也可以通过 this，来获取当前的事件发生元素：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>demo</title>

    <style>
      div {
        background-color: red;
      }
    </style>
  </head>

  <body>
    <div>哈哈</div>

    <script>
      var divEl = document.querySelector('div')

      divEl.onclick = function (event) {
        console.log(this === event.currentTarget) // true

        console.log(event.currentTarget === divEl) // true
      }
    </script>
  </body>
</html>
```

### 5.EventTarget 接口

我们会发现，所有的节点（Node）、元素（Element）都实现了 EventTarget 接口，事实上 window 对象，也实现 EventTarget 接口；

EventTarget 是一个 DOM 接口，主要用于添加、删除、派发 Event 事件；

EventTarget 常见的方法：

- [EventTarget.addEventListener()](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener) `addEventListener`：注册某个事件类型以及事件处理函数；
- [EventTarget.removeEventListener()](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/removeEventListener) `removeEventListener`：移除某个事件类型以及事件处理函数；
- [EventTarget.dispatchEvent()](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/dispatchEvent) `dispatchEvent`：派发某个事件类型到 EventTarget 上；

如何派发事件，代码实现。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>demo</title>

    <style>
      .box {
        background-color: red;
      }
    </style>
  </head>

  <body>
    <div class="box">哈哈</div>

    <script>
      var boxEl = document.querySelector('.box')

      // 监听事件
      window.addEventListener('zzt', function (event) {
        console.log('监听到zzt事件', event)
      })

      boxEl.addEventListener('click', function () {
        // 派发事件
        window.dispatchEvent(new Event('zzt'))
      })
    </script>
  </body>
</html>
```

### 6.事件委托（event delegation）

事件冒泡的事件流，在某种情况下，可以帮助我们实现强大的事件处理模式：**事件委托模式（也是一种设计模式）**。

- 当子元素被点击时，父元素可以通过事件冒泡的事件流，监听到子元素的点击；
- 并且可以通过 `event.target` 获取到事件发生的元素（子元素）对象；

案例：一个 ul 元素中，存放多个 li 元素，点击某一个 li 元素，让它变成红色。

- 方案一：监听每一个 li 的点击，并且做出响应；
- 方案二：在 ul 中监听点击，并且通过 `event.target` 拿到点击的 li 元素，再进行处理，如下方代码所示；该方案不需要遍历每一个 li 元素对象，并给它添加事件监听，所以该方案更加高效；

#### 1.排他思想

点击 li 元素为它添加类 active，其他 li 元素取消类 active。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>demo</title>

    <style>
      .list {
        background-color: yellow;
      }

      .active {
        background-color: red;
      }
    </style>
  </head>

  <body>
    <div class="list">
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
    </div>

    <script>
      var listEl = document.querySelector('.list');

      var currentActive = null

      listEl.addEventListener('click', function (event) {
        currentActive && currentActive.classList.remove('active')

        event.target.classList.add('active')
        currentActive = event.target;
      });
    </script>
  </body>
</html>
```

#### 2.dataset 元素标记

某些事件委托，可能需要对子组件，进行区分，这个时候可使用 `data-*` 对其进行标记

多个按钮的点击，区分点击了哪一个按钮

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>demo</title>
  </head>

  <body>
    <div class="box">
      <button data-action="search">搜索~</button>
      <button data-action="new">新建~</button>
      <button data-action="remove">移除~</button>
      <button>1111</button>
    </div>

    <script>
      var boxEl = document.querySelector('.box')

      boxEl.addEventListener('click', function (event) {
        switch (event.target.dataset.action) {
          case 'remove':
            console.log('点击了移除按钮')
            break
          case 'new':
            console.log('点击了新建按钮')
            break
          case 'search':
            console.log('点击了搜索按钮')
            break
          default:
            console.log('点击了其他')
        }
      })
    </script>
  </body>
</html>
```
