# 函数增强

函数作为对象的2个属性有什么用？

- `name` - 用来访问函数的名称。
- `length` - 用来返回函数参数的形参个数。
	- rest 参数不计入。
	- 有默认值的参数不计入。

```javascript
function test() {
  console.log(arguments)
}
test(111, 222, 333) // 可以给没有形参的函数传实参，传入的实参会存放在 arguments 对象中。
```

-----

# arguments

arguments 是什么？

- arguments 是一个 对应于传递给函数的参数的 **类数组(array-like)** 对象。

意味着什么？

- 不是一个数组类型，而是一个对象类型： 
- 但是它却拥有数组的一些特性，比如说 `length` 属性，比如可以通过 `index` 索引来访问；
- 但是它却没有数组的一些方法，比如 `filter`、 `map` 等；

-----

arguments 转数组的3种方式（slice方法回顾）

-  转化方式一：遍历 arguments，添加到一个新数组中；
	
	```javascript
	function foo() {
	  var newArguments = []
	  for (var arg of arguments) { // 利用 arguments 可迭代对象特性
	    newArguments.push(arg)
	  }
	}
	```
	
-  转化方式二：调用数组 `slice` 函数的 `call / apply` 方法；
	
	```javascript
	function foo() {
	  var newArgs = [].slice.call(arguments) // 利用 arguments 可迭代对象特性
	  var newArgs = Array.prototype.slice.apply(arguments) // 利用 arguments 可迭代对象特性
	}
	```
	
-  转化方式三：ES6中的两个方法 
	- Array.from
	- […arguments]
	
	```javascript
	function foo() {
	  // 利用 arguments 可迭代对象特性
	  var newArgs1 = Array.from(arguments)
	  var newArgs2 = [...arguments]
	}
	```

-----

箭头函数不绑定 arguments，如果要使用会去**上层作用域**查找。

-----

函数剩余（rest）参数的用法，

```javascript
function foo(num1, num2, ...otherNums) {}
foo(20, 30, 111, 222, 333)
```

它和 arguments 的区别。

- 剩余参数只包含那些没有对应形参的实参，而 `arguments` 对象包含了传给函数的所有实参； 
- `arguments` 对象不是一个真正的数组，而 rest 参数是一个真正的数组，可以进行数组的所有操作； 
- `arguments` 是早期的 ECMAScript 中为了方便去获取所有的参数提供的一个数据结构，而 rest 参数是ES6中提供并且希望以此
来替代 arguments 的；

-----

# 纯函数

函数式编程的一个重要概念是纯函数。什么样的函数是纯函数？

- 确定的输入，一定会产生确定的输出； 
- 函数在执行过程中，不能产生副作用；

```javascript
function sum(num1, num2) {
  return num1 + num2
}
```

-----

什么是计算机科学中的副作用？副作用往往是产生 bug 的温床。

- 表示在执行一个函数时，除了返回函数值之外，还对调用函数产生了附加的影响。
- 比如修改了全局变量，修改参数或者改变外部的存储；

-----

纯函数多使用于第三方框架，以及工具函数中。

-----

数组的2个方法举例。

- `slice` ：slice 截取数组时不会对原数组进行任何操作,而是生成一个新的数组； 
- `splice` ：splice 截取数组, 会返回一个新的数组, 也会对原数组进行修改；

```javascript
var names = ["abc", "cba", "nba", "mba"]
// 1.slice: 纯函数
var newNames = names.slice(1, 3)
// 2.splice: 操作数组的利器(不是纯函数)
names.splice(2, 2)
```

-----

纯函数的作用和优势。

- 可以安心的编写和安心的使用； 
- 保证函数的纯度，只是单纯实现自己的业务逻辑即可，不需要关心传入的内容是如何获得的，或者依赖其他的外部变量是否已经发生了修改；
- 使用时，确定输入内容不会被任意篡改，并且确定的输入，一定会有确定的输出；

React 中就要求我们无论是函数还是 class 声明一个组件，这个组件都必须像纯函数一样，保护它们的 props 不被修改：

-----

# 柯里化

函数式编程的一个重要概念是柯里化，什么是柯里化？

- 只传递给函数一部分参数来调用它，让它返回一个函数去处理剩余的参数； 
- 这个过程就称之为柯里化；

-----

写一个柯里化函数的案例，并使用箭头函数优化。

```javascript
function sum1(x) {
	return function (y) {
		return function (z) {
			return x + y + z
		}
	}
}
const sum2 = x => y => z => x + y + z
```

-----

柯里化的优势2点，对应的案例。

- 使函数职责单一。

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

- 函数参数复用。

  ```javascript
  const log = date => type => message => console.log(`[${date.getHours()}:${date.getMinutes()}][${type}]: [${message}]`);
  const nowLog = log(new Date())
  nowLog('DEBUG')('查找到轮播图的bug')
  nowLog('FETURE')('新增了添加用户的权限')
  ```

-----

封装一个自动柯里化的函数。

```javascript
function sum3(x, y, z) {
	return x + y + z
}
function myCurring(fn) {
	function curried(...args1) {
		if (args1.length >= fn.length) {
			return fn.apply(this, args1)
		} else {
			return function(...args2) {
				return curried.apply(this, [...args1, ...args2])
			}
		}
	}
	return curried
}
const currySum = myCurring(sum3)
console.log(currySum(10)(20)(30));
```

-----

# 组合函数

组合函数是JS开发过程中一种对函数的使用技巧，什么是组合函数？

- 将函数组合起来，自动依次调用

-----

组合函数的使用。

```javascript
function double(num) {
	return num * 2
}
function square(num) {
	return num ** 2
}
function composeFn(fn1, fn2) {
	return function(count) {
		return fn2(fn1(count))
	}
}
const newFn = composeFn(double, square)
console.log(newFn(10));
```

-----

封装一个自动组合的函数。

```javascript
function myCompose(...fns) {
	const length = fns.length
  if (fns.some(fn => typeof fn !== 'function'))
    throw new TypeError("Expected arguments are functions")
  
	return function (...args) {
		let i = 0
		let result = length ? fns[i].apply(this, args) : args
    while(i < length) {
			result = fns[i++].call(this, result)
    }
		return result
	}
}
const newFn2 = myCompose(double, square)
console.log(newFn2(10));
```

-----

# with语句

with 语句有什么用？

- 用于扩展一个语句的作用域链。

不建议使用，为什么？

- 因为它可能是混淆错误和兼容性问题的根源。

```javascript
const obj = { name: 'zzt', age: 18 }
with (obj) {
	console.log(name);
	console.log(age);
}
```
-----

# eval函数

eval是内建（内置）函数，它有什么用？

- 可以将传入的字符串当做JavaScript代码来运行； 
- 会将最后一句执行语句的结果，作为返回值；

```javascript
var codeString = `var name = "why"; console.log(name); console.log(message); "abc";`
var result = eval(codeString) // abc
```

不建议使用，为什么？

1. eval代码的可读性非常差
2. eval传入的是一个字符串，那么可能在执行的过程中被篡改，可能造成被攻击的风险
3. eval的执行必须经过JS解释器，不能被JS引擎优化

-----

# 严格模式

什么是严格模式？ 

- 一种具有限制性的JavaScript模式，从而使代码隐式的脱离了懒散（sloppy）模式
- 前端工程化项目中，打包后的代码，一般都会开启严格模式。

严格模式的优势。

1. 严格模式通过抛出错误，来消除一些静默（slient）的错误
2. 严格模式让JS引擎在执行代码时可以进行更多的优化（不需要对一些特殊的语法进行处理）
3. 严格模式禁用了在ECMAScript未来版本中可能会定义的一些语法（超前的一些新特性，babel 甚至都还不能做转化）。

-----

严格模式支持粒度化的迁移，如何开启严格模式。

1. 可以支持在js文件中开启严格模式； 
2. 也支持对某一个函数开启严格模式；

```javascript
'use strict';

function foo {
  'use strict';
  // ...
}
```

注意事项2项。

- 没有类似于 "no use strict" 这样的指令可以使程序返回默认模式。
- 现代 JavaScript 支持“class” 和“module” ，它们会自动启用 use strict；

------

严格模式语法限制的8种场景。
1. 意外的创建全局变量会报错。

   ```javascript
   msg = 'Hello'
   ```

2. 引起静默失败的赋值操作会抛出异常,

   ```javascript
   true.name = 'abc' // 报错
   
   var obj = { name: "why" }
   Object.defineProperty(obj, "name", {
     writable: false,
   })
   obj.name = "kobe" // 报错
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

5. 不允许0的八进制语法，如 0100。

   ```javascript
   var foo = 0100
   ```

6. 不允许使用 with 语句。

7. eval不再为上层引用变量

   ```javascript
   eval(`var message = "Hello World"`)
   console.log(message) // 无法访问 message
   ```

8. this绑定不会默认转成对象：显示绑定值类型，不会转成对象，`foo.apply('123')`

  9. 默认绑定，this 指向 undefined。
     
       2. this 绑定规则之外，通过显示绑定 `foo.apply/call(null/undefined)`，那么 this 就是 null / undefined。

-----

# 属性描述符

什么是属性描述符？

- 对一个属性进行比较精准的操作控制，通过属性描述符可以精准的添加或修改对象的属性；

如何使用？

`Object.defineProperty(obj, prop, descriptor)` 会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象。

- obj 要定义属性的对象； 
- prop 要定义或修改的属性的名称或 Symbol；
- descriptor 要定义或修改的属性描述符；

-----

属性描述符分为2类。各配置项的意义和默认值。如何使用？

|                | configurable | enumerable | value | writable | get  | set  |
| -------------- | ------------ | ---------- | ----- | -------- | ---- | ---- |
| 数据属性描述符 | ✔            | ✔          | ✔     | ✔        | ❌    | ❌    |
| 存取属性描述符 | ✔            | ✔          | ❌     | ❌        | ✔    | ✔    |

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

数据属性描述符

```javascript
var obj = {
  name: "cr7", // configurable: true
  age: 18
}
Object.defineProperty(obj, "name", {
  configurable: false, // 告诉js引擎, obj对象的name属性不可以被删除
  enumerable: false, // 告诉js引擎, obj对象的name属性不可枚举(for in/Object.keys)
  writable: false, // 告诉js引擎, obj对象的name属性不写入(只读属性 readonly)
  value: "zzt" // 告诉js引擎, 返回这个value
})
```

存取属性描述符

```javascript
var obj = {
  _name: "zzt"
}
// 对obj对象中的name添加描述符(存取属性描述符)
Object.defineProperty(obj, "name", {
  configurable: true,
  enumerable: false,
  set: function(value) {
    console.log("set方法被调用了", value)
    this._name = value
  },
  get: function() {
    console.log("get方法被调用了")
    return this._name
  }
})
obj.name = "cr7"
```

-----

给多个属性同时添加属性描述符。

````javascript
var obj = {
  name: "why",
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
````
-----

对象方法的补充7个。
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