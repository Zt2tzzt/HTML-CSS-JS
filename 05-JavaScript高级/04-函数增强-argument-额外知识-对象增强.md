# 深入 JS 函数、with 语句、eval 函数、严格模式、深入 JS 对象

## 一、深入 JavaScript 函数

### 1.Javascript 函数的属性

我们知道 JavaScript 中，函数也是一个对象，那么对象里面，就可以有属性和方法。函数对象有以下两个常用属性：

- `name` 属性：一个函数的名称。
- `length` 属性：用于返回函数参数的个数。
  - 它仅返回函数第一个具有默认值的参数，之前的形参个数；
  - rest 参数不计入 `length` 的个数的；

可以给没有形参的函数传实参，传入的实参，会存放在函数内的 `arguments` 对象中。

```javascript
function test() {
  console.log(arguments)
}

test(111, 222, 333) // 可以给没有形参的函数传实参，传入的实参会存放在 arguments 对象中。
```

### 2.JavaScript 函数内的 arguments 对象

arguments 对象，是一个对应于传递给函数的参数的 **类数组(array-like)** 对象。

- 类数组（array-like）意味着它不是一个数组类型，而是一个对象类型：
- 它拥有数组的一些特性，比如说 `length` 属性，比如可以通过 `index` 索引来访问；
- 它没有数组的一些方法，比如 `filter`、 `map` 等；

#### 1.arguments 对象转数组

在开发中，我们经常需要将 arguments 对象转成数组，以便使用数组的一些特性。

arguments 转数组的 3 种方式（slice 方法回顾）

- 转化方式一：利用 arguments 是可迭代对象特性，遍历 arguments 对象，添加到一个新数组中；

  ```javascript
  function foo() {
    var newArguments = []

    for (var arg of arguments) {
      newArguments.push(arg)
    }
  }
  ```

- 转化方式二：调用数组 `slice` 函数的 `call / apply` 方法；

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

箭头函数不绑定 `arguments` 对象，如果要使用，会去**上层作用域**查找。

```javascript
console.log(arguments) // arguments is not defined

var foo = (x, y, z) => {
  console.log(arguments) // arguments is not defined
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

如果最后一个参数是 `...` 为前缀的，那么它会将剩余的参数，作为一个数组放到该参数中。

函数剩余（rest）参数的用法，

```javascript
function foo(num1, num2, ...otherNums) {
  console.log(num1, num2)
	console.log(otherNums)
}

foo(20, 30, 111, 222, 333)
```

剩余参数（rest parameter）和 arguments 的区别。

- 剩余参数里，只包含那些没有对应形参的实参；而 `arguments` 对象包含了传给函数的所有实参；
- 剩余参数（rest parameter）是一个真正的数组，可以进行数组的所有操作；`arguments` 对象不是一个真正的数组，而是一个类数组（array-like）对象；
- 剩余参数（rest parameter）是 ES6 中提供的新特性，希望以此来替代 `arguments` 对象的；`arguments` 对象是早期的 ECMAScript 中为了方便去获取函数中所有的参数，而提供的一个数据结构。

剩余参数（rest parameter），必须放到函数形参的最后一个位置，否则会报错。

### 3.JavaScript 纯函数

函数式编程中，有一个非常重要的概念叫纯函数；

JavaScript 编程语言，符合函数式编程的范式，所以也有纯函数的概念；

> 在 react 开发中，纯函数是被多次提及的；
>
> - 比如：react 中组件就被要求像是一个纯函数（为什么是像，因为还有类（class）组件）；
> - 比如：redux 中有一个 reducer 的概念，也是要求必须是一个纯函数；

掌握纯函数，对于理解很多框架的设计，是非常有帮助的；

纯函数的维基百科定义：在程序设计中，若一个函数符合以下条件，那么这个函数被称为纯函数：

- 此函数在相同的输入值时，需产生相同的输出。
- 函数的返回值，与输出和输入值以外的其他隐藏信息或状态无关，也和由 I/O 设备产生的外部输出无关。
- 该函数不能有语义上可观察的函数副作用，
  - 诸如“触发事件”，使输出设备输出，或更改输出值以外物件的内容等。

当然，上面的定义，会过于的晦涩，所以我简单总结一下：

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

- 比如：我们经常说吃药本意是为了治病，可能会产生一些其他的副作用；

在计算机科学中，也引用了副作用的概念，表示在执行一个函数时，除了返回函数值之外，还对调用函数以外的事务产生了附加的影响。

- 比如：修改了全局变量；
- 比如：修改参数或者改变外部的存储；

计算机科学中的副作用，往往是产生 bug 的温床。

纯函数要求在执行的过程中，不能产生这样的副作用：

#### 2.JavaScript 纯函数的案例

数组的 [Array.prototype.slice()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/slice) 方法，就是一个纯函数。该方法截取数组时，不会对原数组进行任何操作，而是生成一个新的数组；

```javascript
var names = ['abc', 'cba', 'nba', 'mba']

var newNames = names.slice(1, 3)
```

数组的 [Array.prototype.splice()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/splice) 方法，不是一个纯函数，它截取数组，会返回一个包含了删除的元素的数组，同时也会对原数组进行修改；

```javascript
var names = ['abc', 'cba', 'nba', 'mba']

names.splice(2, 2)
```

下面的函数是否是纯函数？

函数一：是纯函数

```javascript
function sum(num1, num2) {
  return num1 + num2
}
```

函数二：是纯函数

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

维基百科的概念非常的抽象，这里做一个总结：

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

上面的案例，我们进行一个修改：传入的函数，需要分别被进行如下处理

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

---

# 组合函数

## 认识组合函数

组合函数是 JS 开发过程中一种对函数的使用技巧，什么是组合函数？

- 将函数组合起来，自动依次调用

## 基本使用

组合函数的使用。

```javascript
function double(num) {
  return num * 2
}
function square(num) {
  return num ** 2
}
function composeFn(fn1, fn2) {
  return function (count) {
    return fn2(fn1(count))
  }
}
const newFn = composeFn(double, square)
console.log(newFn(10))
```

## 封装一个自动组合的函数

```javascript
function myCompose(...fns) {
  const length = fns.length
  if (fns.some(fn => typeof fn !== 'function')) {
    throw new TypeError('Expected arguments are functions')
  }

  return function (...args) {
    let i = 0
    let result = length ? fns[i].apply(this, args) : args
    while (i < length) {
      result = fns[i++].call(this, result)
    }
    return result
  }
}
const newFn2 = myCompose(double, square)
console.log(newFn2(10))
```

---

# with 语句

with 语句有什么用？

- 用于扩展一个语句的作用域链。

不建议使用，为什么？

- 因为它可能是混淆错误和兼容性问题的根源。

```javascript
const obj = { name: 'zzt', age: 18 }
with (obj) {
  console.log(name)
  console.log(age)
}
```

---

# eval 函数

eval 是内建（内置）函数，它有什么用？

- 可以将传入的字符串当做 JavaScript 代码来运行；
- 会将最后一句执行语句的结果，作为返回值；

```javascript
var codeString = `var name = "zzt"; console.log(name); console.log(message); "abc";`
var result = eval(codeString) // abc
```

不建议使用，为什么？

1. eval 代码的可读性非常差
2. eval 传入的是一个字符串，那么可能在执行的过程中被篡改，可能造成被攻击的风险
3. eval 的执行必须经过 JS 解释器，不能被 JS 引擎优化

---

# 严格模式

## 认识严格模式

- 一种具有限制性的 JavaScript 模式，从而使代码隐式的脱离了懒散（sloppy）模式
- 前端工程化项目中，打包后的代码，一般都会开启严格模式。

## 严格模式的优势

1. 严格模式通过抛出错误，来消除一些静默（slient）的错误
2. 严格模式让 JS 引擎在执行代码时可以进行更多的优化（不需要对一些特殊的语法进行处理）
3. 严格模式禁用了在 ECMAScript 未来版本中可能会定义的一些语法（超前的一些新特性，babel 甚至都还不能做转化）。

---

## 如何开启

严格模式支持粒度化的迁移，如何开启严格模式。

1. 可以支持在 js 文件中开启严格模式；
2. 也支持对某一个函数开启严格模式；

```javascript
'use strict';

function foo {
  'use strict';
  // ...
}
```

> - 没有类似于 "no use strict" 这样的指令可以使程序返回默认模式。
> - 现代 JavaScript 支持“class” 和“module” ，它们会自动启用 use strict；

---

严格模式语法限制的 8 种场景。

1. 意外的创建全局变量会报错。

   ```javascript
   msg = 'Hello'
   ```

2. 引起静默失败的赋值操作会抛出异常,

   ```javascript
   true.name = 'abc' // 报错
   var obj = { name: 'zzt' }
   Object.defineProperty(obj, 'name', {
     writable: false
   })
   obj.name = 'kobe' // 报错
   ```

3. 试图删除不可删除的属性会报错。

   ```javascript
   var obj = {
     name: "why"
   }
   Object.defineProperty(obj, "name", {
     configurable: false
   })
   delete obj.name = "kobe" // 报错
   ```

4. 不允许函数参数有相同名称。

   ```javascript
   function foo(num, num) {}
   ```

5. 不允许 0 的八进制语法，如 0100。

   ```javascript
   var foo = 0100
   ```

6. 不允许使用 with 语句。

7. eval 不再为上层引用变量

   ```javascript
   eval(`var message = "Hello World"`)
   console.log(message) // 无法访问 message
   ```

8. this 显示绑定不会默认转成对象：显示绑定值类型，不会转成对象，`foo.apply('123')`

   - this 绑定规则之外，通过显示绑定 `foo.apply/call(null/undefined)`，那么 this 就是 null / undefined。

9. this 默认绑定，指向 undefined。

---

# 属性描述符

## 认识属性描述符

什么是属性描述符？

- 对一个属性进行比较精准的操作控制，通过属性描述符可以精准的添加或修改对象的属性；

## 如何使用

`Object.defineProperty(obj, prop, descriptor)` 会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象。

- obj 要定义属性的对象；
- prop 要定义或修改的属性的名称或 Symbol；
- descriptor 要定义或修改的属性描述符；

---

## 属性描述符分为 2 类

各配置项的意义和默认值。如何使用？

|                | configurable | enumerable | value | writable | get | set |
| -------------- | ------------ | ---------- | ----- | -------- | --- | --- |
| 数据属性描述符 | ✔            | ✔          | ✔     | ✔        | ❌  | ❌  |
| 存取属性描述符 | ✔            | ✔          | ❌    | ❌       | ✔   | ✔   |

- `configurable`: 表示属性是否能通过 delete 运算符删除，能否通过属性描述符做配置。
  - 默认值：直接定义，`true`,
  - 默认值，通过属性描述符定义：`false`
- `enumerable`: 表示属性能否通过 `for...in` / `Object.keys()` 返回该属性
  - 默认值：直接定义，`true`,
  - 默认值，通过属性描述符定义：`false`
- `writable`: 表示属性值是否可被修改
  - 默认值：直接定义，`true`,
  - 默认值，通过属性描述符定义：`false`
- `value`: 表示属性的值
  - 默认值：`undefined`
- `get`: 获取属性时会执行的函数，
  - 默认为 `undefined`
- `set`: 设置属性时会执行的函数，
  - 默认为 `undefined`

## 数据属性描述符

```javascript
var obj = {
  name: 'cr7', // configurable: true
  age: 18
}
Object.defineProperty(obj, 'name', {
  configurable: false, // 告诉js引擎, obj对象的name属性不可以被删除
  enumerable: false, // 告诉js引擎, obj对象的name属性不可枚举(for in/Object.keys)
  writable: false, // 告诉js引擎, obj对象的name属性不写入(只读属性 readonly)
  value: 'zzt' // 告诉js引擎, 返回这个value
})
```

## 存取属性描述符

```javascript
var obj = {
  _name: 'zzt'
}
// 对 obj 对象中的 name 添加描述符(存取属性描述符)
Object.defineProperty(obj, 'name', {
  configurable: true,
  enumerable: false,
  set: function (value) {
    console.log('set方法被调用了', value)
    this._name = value
  },
  get: function () {
    console.log('get方法被调用了')
    return this._name
  }
})
obj.name = 'cr7'
```

---

给多个属性同时添加属性描述符。

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

---

# 对象方法的补充 7 个。

- 获取对象的属性描述符：
  - `Object.getOwnPropertyDescriptor(obj, prop) `
  - `Object.getOwnPropertyDescriptors(obj)`
- 禁止对象扩展新属性：`Object.preventExtensions(obj)`
  - 给一个对象添加新的属性会失败（在严格模式下会报错）；
- 密封对象，不允许配置和删除属性：`Object.seal(obj)`
  - 实际是调用 preventExtensions
  - 并且将现有属性的 configurable:false
- 冻结对象，不允许修改现有属性： `Object.freeze(obj)`
  - 实际上是调用 seal
  - 并且将现有属性的 writable: false
- `Object.prototype.hasOwnProperty(prop)` 对象中是否存在某个属性。
