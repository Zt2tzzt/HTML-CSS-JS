# 移动端适配-rem-vw、grid

## 一、移动端适配

### 1.移动端适配的场景

移动端屏幕尺寸繁多，在不同尺寸的屏幕上**自适应**显示不同大小，甚至做到**响应式**的效果。

### 2.移动端适配的 4 种方案

- 方案一：百分比设置（用的很少），因为不同属性百分比值，相对的是不同参照物，所以百分比往往很难统一；
- 方案二：rem 单位 + html 的动态 font-size（重要）；
- 方案三：vw 单位（重要）；
- 方案四：flex 的弹性布局。

## 二、rem 适配方案

rem 适配方案，具体是通过 rem 单位 + html 的动态 font-size 进行适配，实现步骤 2 步。

1. 针对不同的屏幕，设置不同的 html font-size 样式；
2. 将原来要设置的尺寸单位，转化成 rem 单位；

### 1.html font-size 动态改变

html font-size 动态改变，有以下两种方案：

#### 1.媒体查询

使用媒体查询，来设置不同尺寸范围内的屏幕 html 的 font-size 尺寸；它有如下弊端：

- 需要针对不同的屏幕编写大量的媒体查询；
- 如果动态改变尺寸，不会做到“响应式”级别的更新；

```css
@media screen and (min-width: 320px) {
  html {
    font-size: 20px;
  }
}
@media screen and (min-width: 375px) {
  html {
    font-size: 24px;
  }
}
@media screen and (min-width: 414px) {
  html {
    font-size: 28px;
  }
}
@media screen and (min-width: 480px) {
  html {
    font-size: 32px;
  }
}
```

#### 2.js 代码

在 js 中，监听页面的宽度的改变，并重新设置 font-size 的大小到 html 上。做到当屏幕尺寸改变时，html 的 font-size 也可以实时更改。

01-HTML+CSS/demo-project/my_flexible.js

```js
// 1.获取 html 的元素
const htmlEl = document.documentElement

function setRemUnit() {
  // 2.获取 html 的宽度（视口的宽度）
  const htmlWidth = htmlEl.clientWidth

  // 3.根据宽度计算一个 html 的 font-size 的大小
  const htmlFontSize = htmlWidth / 10

  // 4.将 font-size 设置到 html 上
  htmlEl.style.fontSize = htmlFontSize + 'px'
}

// 保证第一次执行时, 可以设置一次 font-size
setRemUnit()

// 当屏幕尺寸发生变化时, 实时来修改 html 的 font-size
window.addEventListener('resize', setRemUnit)
```

01-HTML+CSS/demo-project/17-移动端适配-rem方案-demo.html

```html
<script src="./js/my_flexible.js"></script>
<style>
  .box {
    width: 5rem;
    height: 5rem;
  }
</style>
```

#### 3.lib-flexible 库

阿里早期开发的库。

本质上也是通过 js 来做响应式缩放，考虑了更多边界情况。

### 2.rem 单位换算

#### 1.rem 手动换算

如有一个宽度为 375px 的设计稿，一般将 html 的 font-size 设置为 37.5px，这样 1rem 正好是屏幕宽度的十分之一（10%）。

那么设计稿上 100px 换算成 rem 单位就是：100 / 37.5 = 2.6667 rem。

#### 2.rem less / scss 函数换算

利用 less / scss 语法中的混入，传参，映射等特性，这里以 less 举例。

```less
.pxToRem(@px) {
  // 与手动计算的原理相同，这里的 @htmlFontSize 也是根据设计稿不同而变化的
  result: (@px / @htmlFontSize) * 1rem;
}
.box {
  width: .pxToRem(100) [result];
  font-size: .pxToRem(18) [result];
}
```

#### 3.postcss-pxtorem

目前在前端的工程化开发中，我们可以借助于 webpack 工具，来完成自动的转化（后续介绍）；

#### 4.VSCode 插件 px to rem

安装 px to rem 的插件，在编写 rem 单位时自动转化；

## 三、vw 适配方案

### 1.vw 与 rem 的比较

vw 适配方案；是目前最推荐的移动端适配方案。

rem 与 vw 两方案之间的的关系。

- 1vw = 1% 的设计稿宽度。
- 设计稿宽度为 375px，且 html 的 font-size 为 37.5px，那么 1rem = 10% 的设计稿宽度。

由此可知，rem 事实上是作为一种过渡的方案，它使用的也是 vw 的思想。

vw 相较于 rem 的优势：

- 不需要去计算、设置 html 的 font-size；也不会因为设置 html 的 font-size 大小，而必须给 body 再设置一个 font-size，防止继承；
- 因为不依赖 font-size 的尺寸，所以不用担心某些原因 html 的 font-size 尺寸被篡改，页面尺寸混乱；
- vw 相比于 rem 更加语义化，1vw 是 1% 的 viewport 宽度大小;

vw 相较于 rem 的弊端：

- 无法设置缩放的阔值。

### 1.vw 单位换算

#### 1.vw 手动换算

如有一个宽度为 375px 的设计稿。

那么设计稿上 100px 换算成 vw 单位就是：100 / 3.75 = 26.667vw。

#### 2.vw less / scss 函数换算

利用 less / scss 语法中的混入，传参，映射等特性，这里以 less 举例。

```less
.pxToRem(@px) {
  // @htmlFontSize 为设计稿宽度的 1%。
  result: (@px / @htmlFontSize) * 1rem;
}
.box {
  width: .pxToRem(100) [result];
  font-size: .pxToRem(18) [result];
}
```

#### 3.postcss-px-to-viewport-8-plugin

和 rem 一样，在前端工程化开发中，我们可以借助于 webpack 的工具来完成自动的转化（后续学习） ；

#### 4.VSCode 插件 px to vw

px to vw 的插件，在编写时自动转化；

## 四、grid 知识点了解

自行了解
