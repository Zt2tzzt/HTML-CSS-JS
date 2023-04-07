# this 面试题

this 相关的 4 道面试题。

---

# 网页解析过程图解

理解网页被解析过程图解。

![网页被解析过程](NodeAssets/网页被解析过程.jpg)

---

# 高级语言分为 2 类

高级语言分为编译型和解释型：

- 编译型：如 C, C++, Java 把代码编译成可执行文件再执行。
- 解释型：如 JavaScript, Python 边读源代码边做解释，再执行。

---

# 浏览器内核

网页解析由浏览器内核完成，常见的浏览器内核有哪些，

- Gecko（壁虎）：早期被 NetScape 和 Mozilla FireFox 浏览器使用。
- Trident （三叉戟）：微软开发，被 IE4-IE11 使用，edge 已转向 Blink
- Presto（急板乐曲）-> Blink （眨眼）：Opera
- Webkit ：苹果基于 KHTML 开发，开源的，用于 Safari,，早期的 Google Chrome。
- Webkit -> Blink ：是 Webkit 的一个分支，由 Google 开发，应用于 Chrome，edge，opera 等

浏览器内核的别称。

- 排版引擎（layout engine）。
- 浏览器引擎（browser engine）。
- 页面渲染引擎（rendering engine）。
- 样版引擎。

---

# JavaScript 引擎

常见的 JavaScript 引擎 4 个

- SpiderMonkey：第一款 JavaScript 引擎，由 Brendan Eich 开发（也是 Javascript 作者）。
- Chakra：微软开发，用于 IE 浏览器。
- JavaScriptCore：WebKit 中的 Javascript 引擎，Apple 公司开发。
- V8：Google 开发的强大的 Javascript 引擎，也帮助 Chrome 从众多浏览器中脱颖而出。

---

# 浏览器内核渲染页面的流程。

![浏览器内核渲染页面的流程1](NodeAssets/浏览器内核渲染页面的流程1.jpg)

![浏览器内核渲染页面的流程2](NodeAssets/浏览器内核渲染页面的流程2.jpg)

说明 6 步解析。

1. 默认情况下，服务器给浏览器返回 index.html，解析 HTML 是所有步骤的开始，解析 HTML，构建 DOM Tree。
2. 解析 HTML 时遇到 CSS 的 link 元素，由浏览器异步的下载对应的 CSS 文件（不会影响 DOM 的解析），
3. 下载完 CSS 文件后，解析 CSS，生成对应的规则树，可称为 CSSOM（CSS 对象模型）。
4. 当有了 DOM Tree 和 CSSOM Tree 后，就可以两个结合来构建 Render Tree 了。
5. 在 Render Tree 上运行布局（Layout）以计算每个节点的几何体（尺寸，位置信息）。
6. 将每个节点绘制（Paint）到屏幕上，浏览器将布局阶段计算的每个 frame 转为屏幕上实际的像素点，包括将元素的可见部分进行绘制，比如文本、颜色、边框、阴影、替换元素（比如 img）。

![布局和绘制](NodeAssets/布局和绘制.jpg)

> - link 元素不会阻塞 DOM Tree 的构建过程，但是会阻塞 Render Tree 的构建过程，因为 Render Tree 在构建时，需要对应的 CSSOM Tree（当加载时间过长，浏览器会做一定优化，先展示 DOM Tree，不会一直等待。）
> - Render Tree 和 DOM Tree 并不是一一对应的关系，比如对于 `display: none;` 的元素，压根不会出现在 Render Tree 中；

---

# 回流

什么是回流（reflow）？

- 第一次确定节点的大小和位置，称之为布局（layout）。
- 之后对节点的大小、位置修改后重新计算称之为回流。

什么情况下会引起回流？

- DOM 结构发生改变（添加新的节点或者移除节点）；
- 改变了布局（修改了 width、height、padding、font-size 等值）
- 窗口 resize（修改了窗口的尺寸等）
- 调用 `getComputedStyle` 方法获取尺寸、位置信息；

---

# 重绘

什么是重绘（repaint）？

- 第一次渲染内容称之为绘制（paint）。
- 之后重新渲染称之为重绘。

什么情况下会引起重绘？

- 修改背景色、文字颜色、边框颜色、等样式；
- 回流一定会引起重绘，所以回流是一件很消耗性能的事情。

---

# 如何避免回流、重绘

开发应尽量避免回流，重绘，采取的措施。

1. 修改样式时尽量一次性修改
   - 比如通过 `cssText` 修改，比如通过动态添加 class 修改。
2. 尽量避免频繁的操作 DOM
   - 我们可以在一个 DocumentFragment 或者父元素中 将要操作的 DOM 操作完成，再一次性的操作（前端框架中的虚拟 DOM 很好的做到了这一点）
3. 尽量避免通过 `getComputedStyle` 获取尺寸、位置等信息；
4. 对某些元素使用 `position: absolute / fixed`
   - 会引起回流，但是开销相对较小，不会对其他元素造成影响。

---

# 合成层

什么是 composite 合成。合成层的特性，

- 绘制的过程，可以将布局后的元素绘制到多个合成图层中。这是浏览器的一种优化手段；
- 默认情况下，标准流中的内容都是被绘制在同一个图层（Layer）中；
- 而一些特殊的属性，会创建一个新的合成层（CompositingLayer ），并且新的图层可以利用 GPU 来加速绘制；
- 因为每个合成层都是单独渲染的；

哪些属性会形成新的合成层。

- 3D transforms

  ```css
  .container {
    transform: translateZ(0);
  }
  ```

- video、canvas、iframe

- animation 或 transition 设置了 opacity、transform；动画转换时；

  ```css
  .container {
    transition: opacity 1s ease;
  }
  ```

- position: fixed

- will-change：一个实验性的属性，提前告诉浏览器元素可能发生哪些变化；

  ```css
  .container {
    will-change: transform;
  }
  ```

> 分层确实可以提高性能，但是它以内存管理为代价，因此不应作为 web 性能优化策略的一部分过度使用。

---

在浏览器中查看图层模型。

- 浏览器调试工具 -> 右上角 3 点 -> More tools -> Layers

---

# JavaScript 解析

script 元素和页面解析的关系 3 点。

1. 浏览器在解析 HTML 的过程中，遇到 script 元素，不会继续构建 DOM 树；
2. 它会首先下载 JavaScript 代码，并且执行 JavaScript 的脚本；
3. 只有等到 JavaScript 脚本执行结束后，才会继续解析 HTML，构建 DOM 树；

为什么会有这样的关系？

- 这是因为 JavaScript 的作用之一就是操作 DOM，并且可以修改 DOM；
- 如果我们等到 DOM 树构建完成并且渲染再执行 JavaScript，会造成严重的回流和重绘，影响页面的性能；
- 所以会在遇到 script 元素时，优先下载和执行 JavaScript 代码，再继续构建 DOM 树；

---

script 元素和页面解析关系，引出 2 个问题。

1. 在目前的开发模式中（比如 Vue、React），脚本往往比 HTML 页面更“重”，处理时间需要更长；
2. 所以会造成页面的解析阻塞，在脚本下载、执行完成之前，用户在界面上什么都看不到；

---

## \<script\> 上的 defer & async

script 提供的 2 个属性（attribute）是什么，有什么用？

- `defer` 属性：告诉浏览器不要等待脚本下载，而继续解析 HTML，构建 DOM Tree
  - 如果脚本提前下载好了，它会等待 DOM Tree 构建完成，在 `DOMContentLoaded` 事件之前先执行 defer 中的代码。
  - 多个带 defer 的脚本是可以保持正确的顺序执行的。
  - 适用于外部脚本引入，对于 script 默认内容会被忽略。
- `async` 属性：与 defer 有些类似，它也能够让脚本不阻塞页面
  - 脚本不能保证顺序，它是独立下载、独立运行，不会等待其他脚本；
  - 不能保证在 `DOMContentLoaded` 之前或者之后执行；

使用场景。

- `defer` 通常用于需要在文档解析后操作 DOM 的 JavaScript 代码，并且对多个 script 文件有顺序要求的；(推荐在 head 元素中的 script 中使用)
- `async` 通常用于独立的脚本，对其他脚本，甚至 DOM 没有依赖的；

```html
<head>
  <script src="./js/test.js" defer></script>
  <script src="./js/demo.js" async></script>
</head>
```

---

## 浏览器内核包含 2 部分，以 webkit 为例

- WebCore：负责 HTML 解析、布局、渲染等等相关的工作；
- JavaScriptCore：解析、执行 JavaScript 代码；

<img src="NodeAssets/浏览器内核组成.jpg" alt="浏览器内核组成" style="zoom:70%;" />

---

## 什么是 V8 引擎？

- V8 是用 C++ 编写的 Google 开源高性能 JavaScript 和 WebAssembly 引擎，它用于 Chrome 和 Node.js 等。
- 它实现 ECMAScript 和 WebAssembly，并在 Windows7 或更高版本，macOS 10.12+ 和使用 x64，IA-32，ARM 或 MIPS 处理器的 Linux 系统上运行（跨平台运行）。
- V8 可以独立运行，也可以嵌入到任何 C++ 应用程序中。

---

## JS 在 V8 中的执行流程

理解 V8 引擎执行原理图。

![V8引擎原理图](NodeAssets/V8引擎原理图.jpg)

---

理解 V8 引擎的架构。

- `Parse` 模块会将 Javascript 代码转成 AST 抽象语法树，这是因为解释器并不直接认识 Javascript 代码。
  - 如果函数没有被调用，是不会转成 AST 的。
- `Ignition` 是一个解释器，将 AST 编译成字节码（ByteCode）
  - 同时会收集 TurboFan 优化所需要信息（如函数的参数类型信息，有了类型才能进行真实的运算。
  - 如果函数只执行一次，ignition 会执行解释，执行 bytecode
- `Turbofan` 是一个编译器，它将字节码编译成 CPU 可以直接执行的机器码
  - 如果一个函数被多次调用，那么会被标记为**热点函数**，会经过 Turbofan 转换成优化的机器码，提高代码的执行性能。
  - 但是，机器码实际上也会被还原为 Bytecode，这是因为如果后续执行函数的过程中，函数参数类型发生了变化，之前优化的机器码并不能正确的处理运算，就会逆向的转换成字节码

---

理解 V8 引擎的解析图，

![V8引擎解析图](NodeAssets/V8引擎解析图.jpg)

什么是词法分析，语法分析？

- 词法分析（lexical analysis）
  - 将字符序列转换成 token 序列的过程。token 是记号化 （tokenization）的缩写。
  - 词法分析器（lexical analyzer，简称 lexer），也叫扫描器（scanner）
- 语法分析（syntactic analysis，也叫 parsing）
  - 语法分析器也可以称之为 parser。

---

说说 V8 执行 JavaScript 的细节 4 点。

1.  Blink 将源码交给 V8 引擎，Stream 获取到源码并进行编码转换。
2.  Scanner 会进行词法分析（lexical analysis），词法分析会将代码转换成 tokens。
3.  经过 Parser 和 PreParser，tokens 会转换成 AST 树结构。
    1.  Parser 就是直接将 tokens 转成 AST 树结构。
    2.  PreParser 称之为预解析，为什么需要预解析。
        1.  因为并非所有 JS 代码，在一开始就会执行，对所有 JS 代码解析，必然会影响网页的运行速度。
        2.  V8 引擎实现了 Lazy Parsing（延迟解析）的方案，它的作用是将不必要的函数进行预解析，而对函数的全量解析是在函数被调用时才会进行
4.  生成的 AST 树，会被 ignition 转成字节码（bytecode），之后的过程就是代码的执行过程

---

JavaScript 代码执行原理 3 个版本。

- ECMAScript3 版本 - 学习 JavaScript 执行原理、作用域、作用域链、闭包
- ECMAScript5 版本 - 学习块级作用域、let、const。
- TC39 版本（ECMAScript 未来版本）
