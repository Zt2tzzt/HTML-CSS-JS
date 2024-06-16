# 深入 JS 函数、with 语句、eval 函数、严格模式、深入 JS 对象

## 一、深入 JavaScript 函数

### 1.Javascript 函数的属性

我们知道 JavaScript 中，函数也是一个对象；

对象里面，就有属性。函数对象有以下两个常用属性：

- `name` 属性：一个函数的名称。
- `length` 属性：用于返回函数参数的个数。
  - 它仅返回函数第一个具有默认值的参数，之前的形参个数；
  - rest 参数不计入 `length` 的个数；

可以给没有形参的函数，传实参，传入的实参，会存放在函数内的 `arguments` 对象中。

```javascript
function test() {
  console.log(arguments)
}

test(111, 222, 333) // 可以给没有形参的函数传实参，传入的实参会存放在 arguments 对象中。
```

### 2.JavaScript 函数内的 arguments 对象

arguments 对象，是一个对应于传递给函数的参数的**类数组（array-like）**对象。

- 类数组（array-like）意味着它不是一个数组类型，而是一个对象类型：
- 它拥有数组的一些特性，
  - 比如：`length` 属性；
  - 比如：可以通过 `index` 索引来访问；

- 它没有数组的一些方法：
  - 比如 `filter`、 `map` 高阶方法等；

#### 1.arguments 对象转数组

在开发中，我们经常需要将 arguments 对象转成数组，以便使用数组的一些特性。

arguments 转数组的 3 种方式（slice 方法回顾）

- 转化方式一：利用 arguments 对象，是可迭代对象的特性，遍历 arguments 对象，将遍历的元素，添加到一个新数组中；

  ```javascript
  function foo() {
    var newArguments = []

    for (var arg of arguments) {
      newArguments.push(arg)
    }
  }
  ```

- 转化方式二：利用 arguments 对象，是可迭代对象的特性，调用数组 `slice` 方法的显示绑定（`call / apply`）方法，传入 arguments，作为绑定的 this 参数；

  ```javascript
  function foo() {
    var newArgs = [].slice.call(arguments) // 利用 arguments 可迭代对象特性

    var newArgs = Array.prototype.slice.apply(arguments) // 利用 arguments 可迭代对象特性
  }
  ```

- 转化方式三：同样利用 arguments 是可迭代对象的特性，使用 ES6 中的两个新特性

  - [Array.from()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/from) 方法；
  - 可迭代对象的解构，比如 `[…arguments]`。

  ```javascript
  function foo() {
    var newArgs1 = Array.from(arguments)
  
    var newArgs2 = [...arguments]
  }
  ```

#### 2.arguments 对象和箭头函数

箭头函数不绑定 `arguments` 对象，如果要在其中使用 this，它帮绑定的是**上层作用域**中的 this。

```javascript
console.log(arguments) // 报错：arguments is not defined

var foo = (x, y, z) => {
  console.log(arguments) // // 报错：arguments is not defined
}

foo(10, 20, 30)

function bar(m, n) {
  return (x, y, z) => {
    console.log(arguments) // Arguments(2) [20, 30, callee: ƒ, Symbol(Symbol.iterator): ƒ]
  }
}

var fn = bar(20, 30)

fn(10, 20, 30)
```

#### 3.arguments 对象与函数剩余参数

ES6 中，引用了新特性剩余参数（rest parameter），可以将不定数量的参数，放入到一个数组中：

如果最后一个参数是 `...` 为前缀的，那么它会将函数剩余的实参，作为一个数组放到该参数中。

函数剩余（rest）参数的用法，

```javascript
function foo(num1, num2, ...otherNums) {
  console.log(num1, num2)
  console.log(otherNums)
}

foo(20, 30, 111, 222, 333)
```

剩余参数（rest parameter）和 arguments 的区别。

- 剩余参数（rest parameter）里，只包含那些没有对应形参的实参；`arguments` 对象，包含了传给函数的所有实参；
- 剩余参数（rest parameter）是一个真正的数组，可以进行数组的所有操作；`arguments` 对象不是一个真正的数组，而是一个类数组（array-like）对象；
- 剩余参数（rest parameter）是 ES6 中提供的新特性，希望以此来替代 `arguments` 对象；`arguments` 对象是早期的 ECMAScript 中为了方便去获取函数中所有的参数，而提供的一个数据结构。

剩余参数（rest parameter），必须放到函数形参的最后一个位置，否则会报错。

### 3.JavaScript 纯函数

函数式编程中，有一个非常重要的概念叫**纯函数**；

JavaScript 编程语言，符合函数式编程的范式，所以也有纯函数的概念；

> 在 react 开发中，纯函数是被多次提及的；
>
> - 比如：react 中，组件就被要求像是一个纯函数（为什么是像，因为还有类（class）组件）；
> - 比如：redux 中，有一个 reducer 的概念，也是要求必须是一个纯函数；

掌握纯函数，对于理解很多框架的设计，是非常有帮助的；

纯函数的维基百科定义：在程序设计中，若一个函数，符合以下条件，那么这个函数被称为纯函数：

- 函数在有相同的输入值时，产生相同的输出，即函数的返回值，与输出和输入值以外的其他隐藏信息或状态都无关，也和由 I/O 设备产生的外部输出无关。
- 该函数不能有语义上可观察的函数副作用，
  - 比如：“触发事件”，使输出设备输出，或更改输出值以外物件的内容等。

当然，上面的定义，会过于的晦涩，简单总结一下：

- 确定的输入，一定会产生确定的输出；
- 函数在执行过程中，不能产生副作用；

下面的函数，就是一个纯函数：

```javascript
function sum(num1, num2) {
  return num1 + num2
}
```

> 纯函数，多使用于第三方框架，以及工具函数中。

#### 1.JavaScript 函数的副作用

副作用（side effect）本身是医学的一个概念。

- 比如：我们经常说吃药本意是为了治病，但可能会产生一些其他的副作用；

在计算机科学中，也引用了副作用的概念，表示在执行一个函数时，除了返回函数值之外，还对调用函数以外的事务产生了附加的影响。

- 比如：修改了全局变量；
- 比如：修改参数或者改变外部的存储；

计算机科学中的副作用，往往是产生 bug 的温床。

纯函数要求在执行的过程中，不能产生这样的副作用：

#### 2.JavaScript 纯函数的案例

数组的 [Array.prototype.slice()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/slice) 方法，就是一个纯函数。

- 该方法截取数组时，不会对原数组进行任何操作，而是生成一个新的数组；

```javascript
var names = ['abc', 'cba', 'nba', 'mba']

var newNames = names.slice(1, 3)
```

数组的 [Array.prototype.splice()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/splice) 方法，不是一个纯函数，

- 它截取数组，会返回一个包含了删除的元素的数组，同时也会对原数组进行修改；

```javascript
var names = ['abc', 'cba', 'nba', 'mba']

names.splice(2, 2)
```

下面的函数是否是纯函数？

函数一：是纯函数。

```javascript
function sum(num1, num2) {
  return num1 + num2
}
```

函数二：不是纯函数，

- 确定的输入，不能产生确定的输出。

```javascript
let foo = 5

function add(num) {
  return foo + num
}

console.log(add(5))

foo = 10

console.log(add(5))
```

函数三：不是纯函数。

- 函数有副作用。

```javascript
function printInfo(info) {
  console.log(info.name, info.age)
  info.name = '哈哈哈'
}
```

#### 4.JavaScript 纯函数的优势

那么纯函数在函数式编程中非常重要，它有如下优势：

- 可以安心的编写和安心的使用，不用担心函数的调用，对外部环境产生影响；
- 开发者只需要专注于自己的业务逻辑即可，不需要关心传入函数的内容是如何获得的，或者依赖其他的外部变量是否已经发生了修改；
- 纯函数的可靠性很高，使用时确定输入参数不会被任意篡改，并且确定的输入，一定会有确定的输出；

> React 开发中，就要求开发者无论是使用函数还是类（class）来声明的组件，这个组件都必须像纯函数一样，保护它们的 props 不被修改。

### 4.JavaScript 函数柯里化

柯里化，也是属于函数式编程里面，一个非常重要的概念。

- 这是一种关于函数的高阶技术；
- 它不仅被用于 JavaScript，还被用于其他编程语言；

维基百科对柯里化的解释：

- 在计算机科学中，**柯里化（Currying）**，又译为**卡瑞化**或**加里化**；
- 是把接收多个参数的函数，变成接受一个单一参数（最初函数的第一个参数）的函数，并且返回接受余下的参数，而且返回
结果是新函数的技术。

柯里化声称 “如果你固定某些参数，你将得到接受余下参数的一个函数”；

上面的概念非常的抽象，这里做一个总结：

- 只传递给函数一部分参数来调用它，让它返回一个函数去处理剩余的参数；这个过程就称之为**柯里化**；

**柯里化**是一种函数的转换，将一个函数，从可调用的 `f(a, b, c)` 转换为可调用的 `f(a)(b)(c)`。

**柯里化**不会调用函数。它只是对函数进行转换。

现有一个函数

```javascript
function add1(x, y, z) {
  return x + y + z
}
```

将上面的函数，进行柯里化，

```javascript
function sum1(x) {
  return function (y) {
    return function (z) {
      return x + y + z
    }
  }
}
```

使用箭头函数，优化上面的代码。

```javascript
const sum2 = x => y => z => x + y + z
```

#### 1.JavaScript 函数柯里化的优势

##### 1.使函数职责单一

在函数式编程中，我们其实往往希望一个函数，处理的问题尽可能的单一，而不是将一大堆的处理逻辑，交给一个函数来完成；

柯里化能做的，就是将每次传入的参数，在单一的函数中进行处理，处理完后，在下一个函数中使用处理后的结果；

上面的案例，我们进行一个修改：传入的函数，需要分别被进行如下处理：

- 第一个参数 + 2
- 第二个参数 * 2
- 第三个参数 ** 2

```javascript
function handle(x) {
  x += 2

  return function (y) {
    y *= 2

    return function (z) {
      z **= 2

      return x + y + z
    }
  }
}
```

##### 2.使函数参数复用

另外一个使用柯里化的场景，是可以帮助我们复用函数的参数逻辑：比如下方案例：

- `makeAdder` 函数，要求我们传入一个 `num` 参数，并且如果我们需要的话，可以在这里对 `num` 参数进行一些修改；
- 在之后使用返回的函数时，我们不需要再继续传入`num` 参数了；

```javascript
function makeAdder(num) {

  return function (count) {
    return num + count
  }
}

var add5 = makeAdder(5)
console.log(add5(10))
console.log(add5(100))

var add10 = makeAdder(10)
console.log(add10(10))
console.log(add10(100))

```

再比如下方的日志打印函数案例，也是一个道理。

  ```javascript
  const log = date => type => message =>
    console.log(`[${date.getHours()}:${date.getMinutes()}][${type}]: [${message}]`)

  const nowLog = log(new Date())

  nowLog('DEBUG')('查找到轮播图的bug')
  nowLog('FEATURE')('新增了添加用户的权限')
  ```

#### 2.自动柯里化的函数封装

封装一个自动柯里化的函数，将传入的参数进行柯里化。

```javascript
function sum3(x, y, z) {
  return x + y + z
}

function ztCurring(fn) {
  function curried(...args1) {
    if (args1.length >= fn.length) {
      return fn.apply(this, args1)
    } else {
      return function (...args2) {
        return curried.apply(this, [...args1, ...args2])
      }
    }
  }

  return curried
}

const currySum = ztCurring(sum3)

console.log(currySum(10)(20)(30))
```

### 5.JavaScript 组合函数

JavaScript 组合（Compose）函数，是一种对函数的使用技巧、模式。

- 我们现在需要对某一个数据，进行函数的调用，执行两个函数 `fn1` 和 `fn2`，这两个函数是依次执行的；
- 那么，如果每次我们都需要进行两个函数的调用，操作上就会显得重复；
- 将这两个函数组合起来，自动依次调用呢？
- 这个过程就是对函数的组合，我们称之为**组合函数（Compose Function）**；

#### 1.自动组合函数封装

封装一个自动组合函数的函数 `myCompose`，在其中传入函数参数，将它们自动组合。

```javascript
function myCompose(...fns) {
  const length = fns.length

  // 遍历函数所有的参数，如果不是函数，那么直接报错
  for (var i = 0; i < length; i++) {
    var fn = fns[i]

    if (typeof fn !== 'function') {
      throw new TypeError('Expected a function')
    }
  }

  // 取出所有的函数，依次进行调用。
  return function (...args) {
    var index = 0

    var result = length ? fns[index].apply(this, args) : args

    while (++index < length) {
      result = fns[index].call(this, result)
    }

    return result
  }
}

const newFn2 = myCompose(double, square)

console.log(newFn2(10))
```

## 二、with 语句

with 语句，用于扩展一个语句的作用域链。

现在的 JavaScript 开发中，已不建议使用它，因为它可能是混淆代码错误和兼容性问题的根源。

```javascript
const obj = { name: 'zzt', age: 18 }

with (obj) {
  console.log(name)
  console.log(age)
}
```

## 三、eval 函数

eval 是内建（内置）函数，它用于将传入的字符串，当做 JavaScript 代码来运行；并会将最后一句执行语句的结果，作为函数返回值；

```javascript
var codeString = `var name = "zzt"; console.log(name); console.log(message); "abc";`

var result = eval(codeString) // abc
```

现代 JavaScript 开发中，eval 内建函数，同样不建议使用，因为：

- eval 函数代码的可读性非常差。
- eval 函数传入的是一个字符串，那么可能在执行的过程中被篡改，可能造成被攻击的风险。
- eval 函数的执行，必须经过 JS 解释器，不能被 JS 引擎优化。

## 四、严格模式

理解严格模式，要先理解 JavaScript 历史的局限性：

- 长久以来，JavaScript 不断向前发展，并未带来任何兼容性问题；
- 新的特性被加入，旧的功能也没有改变，这么做有利于兼容旧代码；
- 但缺点是 JavaScript 早期存在的错误，或不完善的规范，也将永远被保留在 JavaScript 语言中；

在 ECMAScript5 标准的约束下中，JavaScript 提出了**严格模式（Strict Mode）**的概念：

- 严格模式很好理解，是一种具有限制性的 JavaScript 模式，从而使代码隐式的脱离了”**懒散模式（sloppy Model）**“；
- 支持严格模式的浏览器，在检测到代码中有严格模式时，会以更加严格的方式，对代码进行检测和执行；

前端工程化项目中，打包后的代码，一般都会开启严格模式。

### 1.严格模式的优势

严格模式，能对正常的 JavaScript 语义，进行了一些限制：

- 严格模式，通过抛出错误，来消除一些静默（slient）的错误。
- 严格模式，让 JS 引擎在执行代码时，可以进行更多的优化（不需要对一些特殊的语法进行处理）。
- 严格模式，禁用了在 ECMAScript 未来版本中，可能会定义的一些语法（超前的一些新特性，babel 甚至都还不能做转化）。

### 2.严格模式的开启

严格模式，支持粒度化的迁移，如何开启严格模式。

- 在 js 文件中，开启严格模式，只要在文件开头，写上 `'use strict';` 语句；

  ```javascript
  'use strict';
  ```

- 对某一个函数开启严格模式，在函数内第一行代码写上 `'use strict';` 语句。

  ```javascript
  function foo {
    'use strict';
    // ...
  }
  ```

> - JavaScript 中，没有类似于 "no use strict" 这样的指令，可以使程序返回默认模式。
> - 现代 JavaScript 支持 “class” 和 “module”，它们会自动启用 use strict；

### 3.严格模式对语法的限制

① 在严格模式中，意外的创建全局变量，会抛出异常。

```javascript
msg = 'Hello'
```

② 在严格模式中，引起静默失败的赋值操作，会抛出异常,

```javascript
true.name = 'abc' // 报错

var obj = { name: 'zzt' }

Object.defineProperty(obj, 'name', {
  writable: false
})

obj.name = 'kobe' // 报错
```

③ 在严格模式中，试图删除不可删除的属性，会抛出异常。

```javascript
var obj = {
  name: "why"
}

Object.defineProperty(obj, "name", {
  configurable: false
})

delete obj.name = "kobe" // 报错
```

④ 在严格模式中，不允许函数参数有相同名称。

```javascript
function foo(num, num) {}
```

⑤ 在严格模式中，不允许 0 的八进制语法，如 0100。

```javascript
var foo = 0100
```

⑥ 在严格模式中，不允许使用 with 语句。

⑦ 在严格模式中，eval 函数，不再为上层引用变量

```javascript
eval(`var message = "Hello World"`)

console.log(message) // 无法访问 message
```

⑧ 在严格模式中，this 显示绑定，不会默认转成对象：

- 比如：显示绑定值类型，不会转成对象，`foo.apply('123')`
- 这会影响 this 绑定规则之外的一条规律，即通过显示绑定 `foo.apply/call(null/undefined)`，那么 this 原本应指向全局对象，现在就是 `null` / `undefined`。

⑨ this 默认绑定（独立函数的调用），指向 `undefined`。

## 五、深入 JS 对象

在前面的介绍中，对象的属性，都是直接定义在对象内部，或者直接添加到对象内部的：

这样来做的时候，我们就不能对这个属性，进行一些限制：

- 比如：这个属性，是否是可以通过 `delete` 操作符删除。
- 比如：这个属性，是否可以在 for...in 遍历的时候，被遍历出来。

如果我们想要对一个对象中的属性，进行比较精准的操作控制，那么我们就可以使用属性描述符。

- 通过属性描述符，可以精准的添加或修改对象的属性；
- 属性描述符，需要使用 [Object.defineProperty()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) 方法，来对属性进行添加或者修改；

### 1.Object.defineProperty()

`Object.defineProperty()` 方法，语法：`Object.defineProperty(obj, prop, descriptor)`

它会直接在一个对象上，定义一个新属性，或者修改一个对象的现有属性，并返回此对象。

它可接收三个参数：

- 第一个参数，`obj` 要定义属性的对象；
- 第二个参数，`prop` 要定义或修改的属性的名称（可以是 Symbol 类型的值）；
- 第三个参数，`descriptor` 要定义或修改的**属性描述符**；

返回值：就是传递给函数的对象。

### 2.属性描述符

属性描述符，用于对一个对象中的属性，进行比较精准的操作控制；

通过属性描述符，可以精准的添加或修改对象的属性；

属性描述符的类型有两种：

- **数据属性描述符（Data Properties Descriptor）**；
- **存取属性描述符**（Accessor 访问器 Properties）；

|                | configurable | enumerable | value | writable | get | set |
| -------------- | ------------ | ---------- | ----- | -------- | --- | --- |
| 数据属性描述符 | ✔            | ✔          | ✔     | ✔        | ❌  | ❌  |
| 存取属性描述符 | ✔            | ✔          | ❌    | ❌       | ✔   | ✔   |

- `configurable`: 表示属性是否能通过 `delete` 操作符删除，是否可以修改它的特性，或者是否可以将它修改为存取属性描述符（通过属性描述符做配置）。
  - 当可以直接在一个对象上定义这个属性时。默认值是  `true`：
  - 当我们通过属性描述符定义这个属性时，默认值是 `false`。
- `enumerable`: 表示属性能否通过 `for...in` / `Object.keys()` 返回该属性。
  - 当我们直接在一个对象上定义这个属性时，默认值时 `true`,
  - 当我们通过属性描述符定义这个属性时，默认值是`false`
- `writable`: 表示属性值是否可被修改
  - 当直接在一个对象上定义这个属性时，默认值是 `true`；
  - 当通过属性描述符，来定义这个属性时，默认值是 `false`。
- `value`: 表示属性的值，读取属性时会返回该值，修改属性时会对其进行修改；
  - 默认情况下值：`undefined`
- `get`: 表示获取属性时，会执行的函数，
  - 默认为 `undefined`
- `set`: 表示设置属性时，会执行的函数，
  - 默认为 `undefined`

#### 1.数据属性描述符

```javascript
var obj = {
  name: 'cr7', // configurable: true
  age: 18
}

Object.defineProperty(obj, 'name', {
  configurable: false, // 告诉 js 引擎, obj 对象的 name 属性不可以被删除
  enumerable: false, // 告诉 js 引擎, obj 对象的 name 属性不可枚举（for..in、Object.keys 等方式都无法遍历）
  writable: false, // 告诉 js 引擎, obj 对象的 name 属性不可写入（只读属性 readonly）
  value: 'zzt' // 告诉 js 引擎, 返回这个 value
})
```

#### 2.存取属性描述符

```javascript
var obj = {
  _name: 'zzt'
}

// 对 obj 对象中的 name 添加描述符（存取属性描述符）
Object.defineProperty(obj, 'name', {
  configurable: true,
  enumerable: false,
  set: function (value) {
    console.log('set 方法被调用了', value)
    this._name = value
  },
  get: function () {
    console.log('get 方法被调用了')
    return this._name
  }
})

obj.name = 'cr7'
```

### 3.给多个属性同时添加属性描述符

```javascript
var obj = {
  name: 'why',
  age: 18,
  height: 1.88
}

// 新增的方法
Object.defineProperties(obj, {
  name: {
    configurable: true,
    enumerable: true,
    writable: false
  },
  age: {
    // ...
  },
  height: {
    // ...
  }
})
```

## 六、JavaScript 中常用的对象方法

### 1.获取对象的属性描述符

[Object.getOwnPropertyNames()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyNames) 方法，返回一个数组，其包含给定对象中所有自有属性（包括不可枚举属性，但不包括使用 symbol 值作为名称的属性）

[Object.getOwnPropertyDescriptor()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor) 方法，语法：`Object.getOwnPropertyDescriptor(obj, prop)`

[Object.getOwnPropertyDescriptors()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptors) 方法，语法：`Object.getOwnPropertyDescriptors(obj)`，返回一个对象，该对象包含目标对象自身所有属性的描述符（包括不可枚举属性和符号属性）

### 2.禁止对象扩展新属性

[Object.preventExtensions()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/preventExtensions) 方法，语法：`Object.preventExtensions(obj)`。不允许给一个对象添加新的属性（在严格模式下会报错）；

### 3.密封对象

[Object.seal()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/seal) 方法，语法：`Object.seal(obj)`，不允许配置和删除属性：

- 实际是调用 `preventExtensions` 方法。
- 并且将所有属性的属性描述符设置为 `configurable:false`。

### 4.冻结对象

[Object.freeze()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze) 方法，语法：`Object.freeze(obj)`，不允许修改现有属性：

- 实际上是调用 `seal` 方法。
- 并且将所有属性的属性描述符设置为 `writable: false`。

### 5.对象是否存在某个属性

[Object.prototype.hasOwnProperty()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty) 语法：`Object.prototype.hasOwnProperty(prop)` 对象中是否存在某个属性。
