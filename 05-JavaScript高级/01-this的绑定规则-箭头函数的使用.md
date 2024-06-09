# Javascript 函数中的 this 指向、箭头函数

## 一、JavaScript 函数中的 this 指向

我们先来看一个让人困惑的问题：

定义一个函数，我们采用三种不同的方式，对它进行调用，它产生了三种不同的结果。

```javascript
function foo() {
  console.log(this)
}

// 调用方式一
foo()

// 调用方式二
var obj = {
  name: 'zzt',
  foo
}
obj.foo()

// 调用方式三
foo.call('abc')
```

这个案例，可以给我们启示：

- JavaScript 函数在调用时，会默认给 `this` 绑定一个值；

### 1.this 绑定的机制

JavaScript 函数中，`this` 绑定的机制如下：

- JavaScript 函数中 `this` 绑定的值，与函数定义的位置（编写的位置）没有关系；
- JavaScript 函数中 `this` 的绑定的值，与函数的调用方式，以及调用的位置有关系；
- JavaScript 函数中 `this` 是在函数被调用（运行）时，被绑定的；

### 2.this 绑定的规则

事实上，JavaScript 函数中的 `this` 有四个绑定规则。

- 绑定一：默认绑定；
- 绑定二：隐式绑定；
- 绑定三：显示绑定；
- 绑定四：new 绑定；

#### 1.默认绑定

当一个独立函数调用时，就会应用默认绑定的规则。

独立的函数调用，可以理解成函数没有被绑定到某个对象上进行调用；

以下 JavaScript 函数调用，是常见的应用 this 默认绑定规则的情况：

案例一：

```javascript
function foo() {
  console.log(this) // window 对象
}

foo()
```

案例二：

```javascript
function test1() {
  console.log(this) // window 对象
  test2()
}

function test2() {
  console.log(this) // window 对象
  test3()
}

function test3() {
  console.log(this) // window 对象
}

test1()
```

案例三：

```javascript
function foo(func) {
  func()
}

var obj = {
  name: 'zzt',
  bar: function () {
    console.log(this) // window 对象
  }
}

foo(obj.bar)
```

this 在全局作用域下的指向，再浏览器环境中是：`window`。NodeJs 环境中是：`{}`

> 在 JS 严格模式（strict）下，独立函数调用（this 默认绑定）时 this 指向 `undefined`，所以在默认绑定的情况下，this 要慎用。

#### 2.隐式绑定

隐式绑定，是一种比较常见的 this 绑定方式，它通过某个对象，进行函数的调用：

> 隐式绑定是《你不知道的 JavaScript》书中提出的概念

以下 JavaScript 函数被对象调用，是常见的应用 this 隐式绑定规则的情况：

案例一：

```javascript
function foo() {
  console.log(this) // obj
}

var obj = {
  name: 'zzt',
  foo
}

obj.foo()
```

案例二：

```javascript
function foo() {
  console.log(this) // obj1
}

var obj1 = {
  name: 'obj1',
  foo
}

var obj2 = {
  name: 'obj2',
  obj1
}

obj2.obj1.foo()
```

案例三，与以上两个案例区分，这是一个函数独立调用，this 绑定应用的是默认绑定规则：

```javascript
function foo() {
  console.log(this) // window
}

var obj1 = {
  name: 'obj1',
  foo
}

var bar = obj1.foo
bar()
```





什么是 this 的 new 绑定。

- 将函数当作构造函数来使用。

```javascript
function Foo() {
  this.name = 'zzt'
}
new Foo()
```

---

new 关键字调用函数执行的 5 步操作。

1. 创建一个空对象；
2. 这个空对象的隐式原型 `__proto__` 会指向构造函数的显示原型 `prototype`；
3. 这个空对象会绑定到函数调用的 this 上（this 的绑定在这个步骤完成）；
4. 执行构造函数中的代码。
5. 如果构造函数没有返回其他对象，表达式会返回这个新对象；

---

什么是 this 的显示绑定，

- 使用 `apply`，`call`，`bind` 明确地给函数绑定 this 所指向的对象。

显示绑定原始类型（如 `abc`, `'123'`)，JavaScript 内部会转成包装类对应的对象。所以 this 一般都指向对象。

---

# apply, call, bind

apply 方法和 call 方法为绑定 this 而生，它们有什么区别。

- apply：`function.apply(thisArg, [argArray])`
- call：`function.call(thisArg, arg1, arg2, ...)`

```javascript
function foo(name, age, height) {
  console.log('foo函数被调用:', this)
  console.log('打印参数:', name, age, height)
}
foo.apply('apply', ['kobe', 30, 1.98])
foo.call('call', 'james', 25, 2.05)
```

---

bind 方法有什么用？

- 返回一个绑定函数 bund function（怪异函数对象 exotic function object），将这个函数的 this 总是显示的绑定到一个对象上。

如何使用：`funciton.bind(thisArg[, arg1[, arg2[, ...]]])`

```javascript
function foo(name, age, height, address) {
  console.log('foo:', this)
  console.log('参数:', name, age, height, address)
}
const bar = foo.bind(obj, 'kobe', 18, 1.88)
bar('LA') // 传入的是第4个参数，打印结果：kobe, 18, 1.88，LA
```

> apply，call，bind 都称为**方法**，因为它们都在 Function.prototype 中。

---

内置函数绑定 this 的 3 种情况（forEach 的第二个参数使用）。

```javascript
setTimeout(function () {
  console.log('----', this) // 浏览器：window | Node：setTimeout?
}, 0)

;[1].forEach(function (ele) {
  console.log(ele, '^^^', this) // 浏览器：window | Node：global
}, thisArg) // 可指定 this

var btnEl = document.querySelector('button')
btnEl.onclick = function () {
  console.log('btn的点击:', this) // btnEl
}
```

---

this 绑定的优先级（显示绑定中，bind 与 apply，call 比较优先级）。

1.  默认绑定优先级最低
2.  显示绑定优先级高于隐式绑定（bind 优先级高于 apply / call）。
3.  new 绑定优先级高于隐式绑定
4.  new 绑定优先级高于 bind

> new 绑定和 call、apply 不允许同时使用，所以不存在谁的优先级高。

---

this 绑定规则之外 2 点。

- 显示绑定，传入 `null` / `undefined`，那么将会使用默认规则，即当成函数独立调用。

  ```javascript
  foo.apply(null) // 当成默认绑定
  ```

- 间接函数引用（《你不知道的 JavaScript》提出的概念）

  ```javascript
  // 当成默认绑定
  ;(foo = obj1.foo)()((obj2.foo = obj1.foo))()
  ```

---

一行代码开头如果是大括号{，中括号[，小括号(，上一行代码末尾要加分号。

```javascript
var bar = 'abc'
;(function foo() {
  console.log('Hello world')
})()
```

---

# 箭头函数的使用

箭头函数的 2 个规则。

- 箭头函数不会绑定 this、没有 arguments 属性；
- 箭头函数不能作为构造函数来使用（不能和 new 一起来使用，会抛出错误）；

---

箭头函数一行代码返回对象的写法。

```javascript
const bar = () => ({ name: 'zzt', age: 18 })
```

---

箭头函数中 this 的使用。

- 箭头函数使用外层作用域中的 this

---

箭头函数不绑定 this 的好处，案例理解，早期的写法。

```javascript
// 网络请求的工具函数
function request(url, callbackFn) {
  var results = ['abc', 'cba', 'nba']
  callbackFn(results)
}
// 实际操作的位置(业务)
var obj = {
  names: [],
  network: function () {
    // 1.早期的时候
    var that = this
    request('/names', function (res) {
      that.names = [].concat(res)
    })
    // 2.箭头函数写法
    request('/names', res => {
      this.names = [].concat(res)
    })
  }
}
obj.network()
console.log(obj)
```
