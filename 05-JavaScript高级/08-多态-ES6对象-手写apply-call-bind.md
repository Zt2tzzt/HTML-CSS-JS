# 多态

多态的概念，

- 维基百科：多态（polymorphism）指为不同数据类型的实体提供统一的接口，或使用一个单一的符号 来表示多个不同的类型。
- 个人总结：不同的数据类型进行同一个操作，表现出不同的行为，就是多态的体现。

-----

传统的面向对象，多态的3个前提。

 1. 必须有继承（或实现接口）
 2. 必须有重写（子类方法重写父类方法）
 3. 必须有父类引用指向子类对象。

-----

从维基百科定义的角度，JS中到处都是多态，代码体现。

```javascript
// 表现一
function sum(a1, a2) {
  return a1 + a2
}
sum(20, 30)
sum("abc", "cba")
//表现二
var foo = 123
foo = "Hello World"
foo.split()
foo = { running: function() {} }
foo.running()
foo = []
foo.length
```

-----

# ES6对象增强

ES6对象字面量增强包含3部分。

- 属性的简写：Property Shorthand 
- 方法的简写：Method Shorthand
- 计算属性名：Computed Property Names

```javascript
const nam = 'zzt'
const age = 18
const obj = {
	nam, // 属性的简写
	foo() { // 方法的简写
		console.log(this)
	},
	[nam + 123]: '哈哈' // 计算属性名
}
```

-----

数组的基本解构，顺序解构，解构出新数组，解构赋默认值。

```javascript
const names = ['abc', 'cba', 'nba']
const [i1, i2, i3] = names // 基本解构
const [, , iz] = names // 顺序解构
const [ix, ...newArr] = names // 解构出新数组
const [ia, ib, ic, id = 'aaa'] = names // 解构赋默认值
```

-----

对象的基本解构，任意顺序解构，解构并重命名，解构赋默认值。解构出新对象。

```javascript
const obj = { name: 'zzt', age: 18, height: 1.88 }
const { name, age, height } = obj // 基本解构
const { height, name, age } = obj // 任意顺序解构
const { name: newName } = obj // 解构并重命名
const { address: newAddress = '广州市' } = obj // 解构赋默认值
const { name, ...newObj } = obj // 解构出新对象
```

-----

# 手写apply，call，bind方法

手写apply,  call 方法，并进行封装

```javascript
// 1.2. 封装原型中
Function.prototype.ztexec = function(thisArg, otherArgs) {
  // 1.获取thisArg, 并且确保是一个对象类型
  thisArg = (thisArg === null || thisArg === undefined) ? window : Object(thisArg)
  // thisArg.fn = this
  Object.defineProperty(thisArg, "fn", {
    configurable: true,
    value: this
  })
  const res = thisArg.fn(...otherArgs)
  delete thisArg.fn
  return res
}
// 1.给函数对象添加方法: ztapply
Function.prototype.ztapply = function(thisArg, otherArgs) {
  return this.ztexec(thisArg, otherArgs)
}
// 2.给函数对象添加方法: ztcall
Function.prototype.ztcall = function(thisArg, ...otherArgs) {
  return this.ztexec(thisArg, otherArgs)
}
```

手写 bind 方法

```javascript
Function.prototype.ztbind = function(thisArg, ...otherArgs) {
  // console.log(this) // -> foo函数对象
  thisArg = (thisArg === null || thisArg === undefined) ? window : Object(thisArg)
  Object.defineProperty(thisArg, "fn", {
    value: this
  })
  return (...newArgs) => {
    return thisArg.fn(...otherArgs, ...newArgs) // 不能删除 fn 属性，因为返回的函数可能还会被调用。
  }
}
```
