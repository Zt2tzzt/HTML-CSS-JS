# 网格系统

网格系统为什么从 16 列转为 12 列：

- 因为 12 可以被 12、6、4、3、2、1 整除，而 16 列网格只能被 16、8、4、2、1 整除，所以 12 列网格能够在一行中表示更多种列数组合情况。

---

网格系统的原理是怎样的？

- 网格系统由 container、row、col 三部分组成，底层使用 flexbox 来布局，支持 12 列网格布局。
- container 或 container-fluid 是布局容器，网格系统中必用的容器（也会用在：内容居中或包含其它内容时），它们有以下 CSS 声明。
  - `width: 100% / 某个断点的宽;` - 布局的宽。
  - `padding-right: 15px;` - 让包含内容不会靠在布局右边缘。
  - `padding-left: 15px;` - 让包含内容不会靠在布局左边缘。
  - `margin-right: auto;` - 布局居中。
  - `margin-left: auto;` - 布局居中。
- row 是网格系统中的每一行，row 是存放在 container 容器中。 如果给里面的 col 指定列宽，那么最多可以存放 12 列，超出列数会换行。它有以下 CSS 声明：
  - `display: flex;` - 指定 row 为弹性布局（并支持 12 列网格布局）
  - `flex-wrap: wrap;` - 支持多行展示 flex item。
  - `margin-right: -15px;` - 抵消 container 右边 15px 的 padding。
  - `margin-left: -15px;` - 抵消 container 左边 15px 的 padding。
- col 是网格系统的每一列，col 是存放在 row 容器中
  - `position: relative;` - 相对定位布局。
  - `flex-grow: 1 / flex:0 0 x%;` - 自动拉伸布局或占百分比。
  - `max-width: 100% / max-width: x%;` - 最大的宽。
  - `padding-right: 15px;` - 让包含内容不会靠右边缘。
  - `padding-left: 15px;` - 让包含内容不会靠左边缘。

---

网格系统中，container，col 为什么设值了 `padding: 15px;`

- 为了让容器包含的内容不紧靠网格边缘。

网格系统中 row，为什么设置了 `margin-right/left: -15px;`？

- 为了抵消 container，col 的 `padding-right/left: 15px;`
- 当网格系统在嵌套的时候，col 也可以充当容器 container-fluid 来使用。

---

网格系统如何嵌套使用？

- 列 col 可以嵌套另外一个网格系统，因为它可以充当一个 container-fluid 容器来使用。
- 如果额外添加 container 会增加 `padding: 15px;`

---

通过嵌套实现 8 列的网格系统（等列宽，指定列宽）。

等列宽

```html
<div class="container">
	<!-- flex: 列宽是自动拉伸 -->
	<div class="row">
		<div class="col item">1</div>
		<div class="col item">2</div>
		<div class="col item">3</div>
		<div class="col item">4</div>
		<div class="col item">5</div>
		<div class="col item">6</div>
		<div class="col item">7</div>
		<div class="col item">8</div>
	</div>
</div>
```

指定列宽

```html
<div class="container">
	<div class="row">
		<div class="col-6 item">
			<!-- 嵌套网格系统( 嵌套的时候是可以省略 container ) -->
			<div class="row">
				<div class="col-3 item">1</div>
				<div class="col-3 item">2</div>
				<div class="col-3 item">3</div>
				<div class="col-3 item">4</div>
			</div>
		</div>
		<div class="col-6 item">
			<div class="row">
				<div class="col-3 item">1</div>
				<div class="col-3 item">2</div>
				<div class="col-3 item">3</div>
				<div class="col-3 item">4</div>
			</div>
		</div>
	</div>
</div>
```

---

网格布局自动布局的 3 个概念。案例理解。

- col : 等宽列（Equal-width）

  - 底层是 `flex-grow: 1`, `max-width: 100%`。该类网格系统仅用 flexbox 布局。

- col-auto : 列的宽为 auto (Variable width content),

  - 底层是 `flex: 0 0 auto;` `width: auto;`

  ```html
  <div class="container">
  	<div class="row">
  		<div class="col-auto item">auto layout layout layout</div><!--该列的宽度，由内容决定，不会拉伸-->
  		<div class="col item">1</div>
  		<div class="col item">2</div>
  		<div class="col item">3</div>
  	</div>
  </div>
  ```
  
- col-{num}: 指定某个列的宽（支持 12 列网格）。

  - 底层是 `flex: 0 0 x%`，`max-width: x%`

---

网格系统响应式类的概念和使用。

- 5个断点（Breakpoints）
  - `none(xs)` : <576px 、`sm` : >=576px、`md` : >=768px、 `lg` : >=992、 `xl` : >=1200px
- 响应式列布局的类
  - `col-sm` : 默认 width:100%，当屏幕>=576px 该类启用（flexbox 布局）, 启用：flex-grow: 1，max-width: 100%。
  - `col-md` :: 默认 width:100%，当屏幕>=768px 该类启用（flexbox 布局），启用：flex-grow: 1，max-width: 100%。
  - `col-lg` : 默认 width:100%，当屏幕>=992px 该类启用（flexbox 布局），启用：flex-grow: 1，max-width: 100%。
  - `col-xl` : 默认 width:100%，当屏幕>=1200px 该类启用（flexbox 布局）, 启用：flex-grow: 1，max-width: 100%。
  - `col-sm-{num}` : 默认 width:100%，当屏幕>=576px 该类启用(支持 12 列网格), 启用： flex: 0 0 x%。
  - `col-md-{num}` : 默认 width:100%，当屏幕>=768px 该类启用 (支持 12 列网格), 启用： flex: 0 0 x%。
  - `col-lg-{num}` : 默认 width:100%，当屏幕>=992px 该类启用 (支持 12 列网格), 启用： flex: 0 0 x%。
  - `col-xl-{num}` : 默认 width:100%，当屏幕>=1200px 该类启用(支持 12 列网格) , 启用： flex: 0 0 x%。

在 xl 屏幕显示 6 列，在 lg 屏幕显示 4 列，在 md 屏幕显示 3 列，在 sm 屏幕显示 2 列，特小屏(none)显示 1 列。

```html
<div class="container">
	<div class="row">
		<div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 item">1</div>
		<div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 item">2</div>
		<div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 item">3</div>
		<div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 item">4</div>
		<div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 item">5</div>
		<div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 item">6</div>
	</div>
</div>
```

---

# 响应式工具类

响应式工具类的使用场景。

- 某个功能在 PC 端可见，但是在移动端不可见。
- 因为移动端的屏幕比较小，是不能把 PC 端中所有的内容都展示出来，所以有些不重要的内容在移动端需要被简化。

如何使用？

- 隐藏元素可以给某个元素添加 .d-none 类或 .d-{sm,md,lg,xl,xxl}-none 类中的任何一个。
- 显示元素可以给某个元素添加 .d-block 类或 .d-{sm,md,lg,xl,xxl}-block 类中的任何一个。

---

响应式工具类 display 的使用，实现 3 个需求。

```html
<!-- 1.某个元素只在 lg(>=992px) 和 xl 屏显示 -->
<h1 class="d-none d-lg-block">某个元素只在lg(>=992px) 和 xl 屏显示</h1>
<!-- 2.某个元素只在 lg(>=992px) 和 xl 屏隐藏 -->
<h1 class="d-block d-lg-none">某个元素只在lg(>=992px) 和 xl 屏隐藏</h1>
<!-- 3.某个元素只在 md(>=768px)，小于 lg 时屏隐藏；-->
<h1 class="d-block d-md-none d-lg-block">
	某个元素只在大于 md(768px)，小于 lg（992） 时 屏隐藏；
</h1>
```

---

还有哪些常用的实用工具类？

- 快速浮动（Float）
  - `float-left`、`float-right`
- 文本（Text）
  - `text-left`、`text-right`、`text-center`
  - `text-{sm、md、lg、xl}-left`
- 边框
  - `borde border-top border-left` ....
  - `border border-primary border-success`
- 截断文本
  - `text-truncate`

---

了解什么是可访问性辅助类？

- 屏幕阅读器的适配（专门针对残障人士设备的适配）
  - `.sr-only`，可以对屏幕阅读器以外的设备隐藏内容，即对屏幕阅读辅助器可见。
  - `.sr-only-focusable` 和 .`sr-only` 联合使用的话可以在元素有焦点的时候再次显示出来（例如，使用键盘导航的用户）。对于需遵循可访问性的网站来说是很有必要的。
- 增强可访问性的辅助类（针对残障人使用的设备的适配，同时增强语义化）
  - ``role=”xxx”` : 定义用户界面元素的类型，作用增强 Web 可访问性，使残障人士可以更好的使用 Web 内容。
  - `aria-*=”xxx”`: 增强可访问性，当与 role=“xxx”结合使用时，当元素的状态和属性发生变化时会触发辅助技术发出通知，并将信息传达给用户。

---

组件的使用：navbar 组件的使用。

```html
<h1>1.Brand</h1>
<nav class="navbar navbar-dark bg-dark">
	<a class="navbar-brand" href="#">
		<img
			src="https://v4.bootcss.com/docs/4.6/assets/brand/bootstrap-solid.svg"
			width="30"
			height="30"
			alt=""
		/>
	</a>
</nav>

<h1>2.Nav Link</h1>
<nav class="navbar navbar-expand-lg navbar-light bg-light">
	<div class="container">
		<a class="navbar-brand" href="#">Brand</a>
		<button
			class="navbar-toggler"
			type="button"
			data-toggle="collapse"
			data-target="#navbarNav"
		>
			<span class="navbar-toggler-icon"></span>
		</button>
		<div class="collapse navbar-collapse" id="navbarNav">
			<ul class="navbar-nav">
				<li class="nav-item active">
					<a class="nav-link" href="#"
						>Home <span class="sr-only">(current)</span></a
					>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="#">Features</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="#">Pricing</a>
				</li>
				<li class="nav-item">
					<a class="nav-link disabled">Disabled</a>
				</li>
			</ul>
		</div>
	</div>
</nav>
```

---

项目实战，项目搭建。

---

项目实战，顶部 navbar 搭建。

---

项目实战：轮播图的搭建。

---

项目实战：轮播图的小屏适配，加载小的图片。

---

项目实战：目标客户区域搭建。实现多屏适配。
