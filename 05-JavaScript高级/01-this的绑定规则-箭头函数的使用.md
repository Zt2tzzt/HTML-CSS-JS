# this的绑定规则

this 在全局作用域下的指向

- 浏览器：`window`。Node：`{}`

-----

this 绑定的机制3点。

1. this 的绑定和函数定义的位置没有关系。

2. this 绑定和函数的调用方式，调用位置有关系。

3. this 是在函数调用（运行）时被绑定的。

-----

this 绑定的4个规则。

1. 默认绑定
2. 隐式绑定
3. 显示绑定
4. new 绑定

> 严格模式下，独立函数调用（this 默认绑定）时 this 指向 `undefined`，所以在默认绑定的情况下，this 要慎用。

-----

什么是 this 的默认绑定？

- 独立函数调用。

```javascript
function foo() {
  console.log("foo:", this)
}
foo()
```

-----

什么是 this 的隐式绑定（《你不知道的JavaScript》提出的概念）

- 通过某个对象发起函数调用。

```javascript
var obj = {
  bar: function() {
    console.log("foo函数:", this)
  }
}
obj.bar()
```

-----

什么是 this 的 new 绑定。

- 将函数当作构造函数来使用。

```javascript
function Foo() {
  this.name = "zzt"
}
new Foo()
```

-----

new 关键字调用函数执行的5步操作。

1. 创建一个空对象； 
2. 这个空对象的隐式原型 `__proto__` 会指向构造函数的显示原型 `prototype`； 
3. 这个空对象会绑定到函数调用的 this 上（this 的绑定在这个步骤完成）；
4. 执行构造函数中的代码。
5. 如果构造函数没有返回其他对象，表达式会返回这个新对象；

-----

什么是 this 的显示绑定，

- 使用 `apply`，`call`，`bind` 明确地给函数绑定 this 所指向的对象。

显示绑定原始类型（如 `abc`, `'123'`)，JavaScript 内部会转成包装类对应的对象。所以 this 一般都指向对象。

-----

# apply, call, bind

apply 方法和 call 方法为绑定 this 而生，它们有什么区别。

- apply：`function.apply(thisArg, [argArray])`
- call：`function.call(thisArg, arg1, arg2, ...)`

```javascript
function foo(name, age, height) {
  console.log("foo函数被调用:", this)
  console.log("打印参数:", name, age, height)
}
foo.apply("apply", ["kobe", 30, 1.98])
foo.call("call", "james", 25, 2.05)
```

-----

bind 方法有什么用？

- 返回一个绑定函数 bund function（怪异函数对象 exotic function object），将这个函数的 this 总是显示的绑定到一个对象上。

如何使用：`funciton.bind(thisArg[, arg1[, arg2[, ...]]])`

```javascript
function foo(name, age, height, address) {
  console.log("foo:", this)
  console.log("参数:", name, age, height, address) 
}
const bar = foo.bind(obj, "kobe", 18, 1.88)
bar("LA") // 传入的是第4个参数，打印结果：kobe, 18, 1.88，LA
```

> apply，call，bind 都称为**方法**，因为它们都在 Function.prototype 中。

-----

内置函数绑定 this 的3种情况（forEach 的第二个参数使用）。

```javascript
setTimeout(function() {
	console.log('----', this); // 浏览器：window | Node：setTimeout?
}, 0);

[1].forEach(function(ele) {
	console.log(ele, '^^^', this); // 浏览器：window | Node：global
}, thisArg) // 可指定 this

var btnEl = document.querySelector("button")
btnEl.onclick = function() {
  console.log("btn的点击:", this) // btnEl
}
```

-----

this 绑定的优先级（显示绑定中，bind 与 apply，call 比较优先级）。

 1. 默认绑定优先级最低
 2. 显示绑定优先级高于隐式绑定（bind 优先级高于 apply / call）。
 3. new 绑定优先级高于隐式绑定
  4. new 绑定优先级高于bind

> new 绑定和 call、apply 不允许同时使用，所以不存在谁的优先级高。

-----

this 绑定规则之外2点。

- 显示绑定，传入 `null` / `undefined`，那么将会使用默认规则，即当成函数独立调用。

  ```javascript
  foo.apply(null) // 当成默认绑定
  ```

- 间接函数引用（《你不知道的JavaScript》提出的概念）

  ```javascript
  // 当成默认绑定
  (foo = obj1.foo)()
  (obj2.foo = obj1.foo)()
  ```

-----

一行代码开头如果是大括号{，中括号[，小括号(，上一行代码末尾要加分号。

```javascript
var bar= 'abc';
(function foo() {
  console.log('Hello world')
})()
```

-----

# 箭头函数的使用

箭头函数的2个规则。

- 箭头函数不会绑定 this、没有 arguments 属性； 
- 箭头函数不能作为构造函数来使用（不能和 new 一起来使用，会抛出错误）；

-----

箭头函数一行代码返回对象的写法。

```javascript
const bar = () => ({ name: 'zzt', age: 18 })
```

-----

箭头函数中 this 的使用。

- 箭头函数使用外层作用域中的 this

-----

箭头函数不绑定 this 的好处，案例理解，早期的写法。

```javascript
// 网络请求的工具函数
function request(url, callbackFn) {
  var results = ["abc", "cba", "nba"]
  callbackFn(results)
}
// 实际操作的位置(业务)
var obj = {
  names: [],
  network: function() {
    // 1.早期的时候
    var that = this
    request("/names", function(res) {
      that.names = [].concat(res)
    })
    // 2.箭头函数写法
    request("/names", (res) => {
      this.names = [].concat(res)
    })
  }
}
obj.network()
console.log(obj)
```

