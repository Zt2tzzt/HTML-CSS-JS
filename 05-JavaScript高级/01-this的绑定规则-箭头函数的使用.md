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

#### 3,显示绑定

隐式绑定，有一个前提条件：

- 必须在调用函数的对象内部，有一个对函数的引用（比如一个属性）；
- 正是通过这个引用，间接的将 this 绑定到了这个对象上；

如果我们不希望在对象内部，包含这个函数的引用，同时又希望在这个对象上，对函数进行强制调用，该怎么做呢？

##### 1.call、apply 方法

事实上，JavaScript 所有的函数，都可以使用 `call` 和 `apply` 方法，它们的语法分别是：

- [Function.prototype.call()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call) 方法：`function.call(thisArg, arg1, arg2, ...)`
- [Function.prototype.apply()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply) 方法：`function.apply(thisArg, [argsArray])`

第一个参数是相同的，要求传入一个对象；

- 这个对象，就是要显示绑定的 this。
- 在调用这个函数时，会将 this绑定到这个传入的对象上。

后面的参数，`apply` 方法为数组，`call` 方法为参数列表；

因为上面的过程，我们明确的绑定了this 指向的对象，所以称之为 显式绑定。

```javascript
function foo() {
  console.log(this)
  // window
  // {name: 'zzt'}
  // Number 对象，存放着 123
}

foo.call(window)
foo.call({name: 'zzt'})
foo.call(123)
```

```javascript
function foo(name, age, height) {
  console.log('foo函数被调用:', this)
  console.log('打印参数:', name, age, height)
}
foo.apply('apply', ['kobe', 30, 1.98])
foo.call('call', 'james', 25, 2.05)
```

> 显示绑定原始类型（如 `abc`, `'123'`)，JavaScript 内部会转成包装类对应的对象。所以函数中的 `this`，一般都指向对象。

##### 2.bind 方法

如果我们希望一个函数，总是显示的绑定到一个对象上，应该怎么做呢？

- 事实上，JavaScript 所有的函数，都可以使用 `bind` 方法，它的语法如下：
- [Function.prototype.bind()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind) 方法，`function.bind(thisArg[, arg1[, arg2[, ...]]])`

bind 方法，它返回一个新的绑定函数（bound function，BF）；

- 这个绑定函数，是一个 exotic function object（怪异函数对象，ECMAScript 2015 中的术语）
- 在 `bind` 方法被调用时，这个返回的新函数的 `this` 被指定为 `bind` 方法的第一个参数，而其余参数，将作为新函数的参数，供调用时使用。

```javascript
function foo(name, age, height, address) {
  console.log('foo:', this)
  console.log('参数:', name, age, height, address)
}

const bar = foo.bind(obj, 'kobe', 18, 1.88)

bar('LA') // 传入的是第4个参数，打印结果：kobe, 18, 1.88，LA
```

> apply，call，bind 都称为**方法**，因为它们都在 Function.prototype 中。

##### 3.内置函数的绑定思考

有些时候，我们会调用一些 JavaScript 的内置函数，或者一些第三方库中的内置函数。

- 这些内置函数，会要求我们传入另外一个函数（回调函数）；
- 我们自己并不会显示的调用这些函数，而且 JavaScript内部，或者第三方库内部，会帮助我们执行；
- 这些函数中的 this 又是如何绑定的呢？

`setTimeout` 内置函数、

```javascript
setTimeout(function () {
  console.log('----', this) // 浏览器：window | Node：setTimeout?
}, 0)
```

数组的 `forEach` 方法。

```javascript
;[1].forEach(function (ele) {
  console.log(ele, '^^^', this) // 浏览器：window | Node：global
}, thisArg) // 可指定 this
```

DOM 对象的事件处理函数（比如 div 元素对象的点击（`click`）事件，即对象上的 `onclick` 函数）

```javascript
var btnEl = document.querySelector('button')

btnEl.onclick = function () {
  console.log('btn的点击:', this) // btnEl
}
```

#### 4.new 绑定

JavaScript 中的函数，可以当做一个类的构造函数来使用，也就是结合 `new` 关键字来使用。

当使用 `new` 关键字，来调用函数时，会执行如下的操作：

1. 创建一个新的空对象；
2. 这个空对象的隐式原型 `__proto__` 会指向构造函数的显示原型 `prototype`（即新对象会被执行 prototype 连接；）；
3. 这个空对象会绑定到函数调用的 this 上（this 的绑定在这个步骤完成）；
4. 执行构造函数中的代码。
5. 如果构造函数没有返回其他对象，表达式会返回这个新对象；

```javascript
function Person(name) {
  console.log(this) // Person {}
  this.name = name
}

var p = new Person('zzt')
console.log(p) // Person { name: 'zzt' }
```

### 3.this 绑定规则的优先级

了解了上面四条规则，以后的开发中，我们只需要去判断函数的调用方式和调用位置。应用了哪条规则即可。

然而，如果一个函数调用方式和调用位置，应用了多条规则，优先级从低到高依次是：

1. 默认绑定的优先级最低

   - 毫无疑问，默认规则的优先级是最低的，因为存在其他规则时，就会通过其他规则的方式来绑定 this。

2. 显示绑定优先级，高于隐式绑定，通过以下代码可验证。

   ```javascript
   var obj = {
     name: 'zzt',
     eat: function () {
       console.log(this.name, 'eatting') // kobe eating
     }
   }

   obj.eat.call({ name: 'kobe' })
   ```

3. new 绑定优先级，高于隐式绑定，通过i以下代码可验证：

   ```javascript
   function Person() {
     this.name = 'zzt'
     this.age = 18
   }

   var obj = {
     name: 'kobe',
     person: Person
   }

   var p = new obj.person()
   console.log(p) // Person {name: 'zzt', age: 18}
   ```

4. 显示绑定中，`bind` 方法优先级高于 `apply`，`call` 方法。通过以下代码可验证：

   ```javascript
   function foo() {
     console.log(this)
     // zzt
     // zzt
   }

   var bar = foo.bind({ name: 'zzt' })
   bar.call({ name: 'kobe' })
   bar.apply({ name: 'kobe' })
   ```

5. new 绑定优先级高于 bind

   - `new` 操作符和 `call`、`apply` 方法，是不允许同时使用的，所以不存在谁的优先级更高。
   - `new` 操作符可以和 `bind` 一起使用，`new` 绑定优先级要高于 `bind` 方法的显示绑定，通过以下代码可验证：

   ```javascript
   function Person() {
     this.name = 'zzt'
     this.age = 18
   }

   var person = Person.bind({ name: 'kobe', age: 35 })

   var p = new person()
   console.log(p) // Person {name: 'zzt', age: 18}
   ```

### 4.this 绑定规则之外

上面介绍的规则，已经足以应付平时的开发，但是总有一些语法，超出了我们的规则之外。

#### 1.忽略显示绑定

使用 `apply`、`call`、`bind` 方法，传入 `null`，`undefined` 最为 thisArg 进行显示绑定。

那么将会使用默认绑定的规则，即当成独立函数调用。

```javascript
function foo() {
  console.log(this)
}

foo.apply(null)
```

#### 2.间接函数引用

创建一个函数的间接引用，这种情况，使用默认绑定规则。

- 赋值 (obj2.foo = obj1.foo) 的结果是foo函数；
- foo 函数被直接调用，那么应用的是默认绑定的规则。

这时《你不知道的 JavaScript》书中提出的概念，

```javascript
function foo() {
  console.log(this)
}

var obj1 = {
  name: 'obj1',
  foo
}

var obj2 = {
  name: 'obj2'
}

obj1.foo() // {name: 'obj1', foo: ƒ}

;(obj2.foo = obj1.foo)() // window
```

> 在 JavaScript 中，一行代码开头如果是大括号 `{` 或者中括号 `[` 或者小括号 `(`，那么上一行代码末尾要加分号。
>
> ```javascript
> var bar = 'abc'
> ;(function foo() {
>   console.log('Hello world')
> })()
> ```

## 二、箭头函数

箭头函数是 ES6 之后增加的一种编写函数的方法，并且它比函数表达式要更加简洁，它有如下特性：

- 箭头函数不会绑定 `this`、没有 `arguments` 属性；
- 箭头函数不能作为构造函数来使用（不能和 `new` 操作符一起来使用，会抛出异常）；

箭头函数如何编写呢？

```javascript
var foo = (name, age) => {
  console.log(name, age)
}
```

- `()`: 里面是函数的参数。
- `{}`: 里面是函数的执行体。

### 1.箭头函数写法优化

优化一: 如果只有一个参数 `()` 可以省略：

```javascript
var nums = ['abc', 'cba', 'nba']

nums.forEach(item => ())
```

优化二：如果函数执行体中，只有一行代码，那么可以省略大括号。

- 并且这行代码的返回值会作为整个函数的返回值

```javascript
var nums = [123, 456, 789]

nums.forEach(item => console.log(item))

nums.filter(item => true)
```

优化三：如果函数执行体只有返回一个对象，并采用省略大括号的写法，那么需要给这个对象加上 `()`

```javascript
var foo = () => {
  return { name: 'zzt' }
}

// 等同于 👇

var bar = () => ({name: 'zzt'})
```

### 2.箭头函数中使用 this

首先，箭头函数本身不绑定 `this`

箭头函数中的 `this`，指向的是层作用域中的 `this`。

箭头函数不绑定 this 的好处，案例理解：

- 这里使用 `request` 方法，来模拟网络请求，请求到数据后，存放到 `obj.names` 中。
- 我们需要拿到 `obj` 对象，设置 `data`；
- 但是，根据 `request` 函数中，传入的 `callbackFn` 函数的调用位置，直接拿到的 `this`·是 `window` 对象，
- 我们需要在外层定义：`var that = this`
- 在 `request` 的回调函数中，使用 `that` 就代表了 ·`obj`· 对象

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
