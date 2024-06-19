# JS多态、ES6新特性、手写apply，call，bind 方法

## 一、JavaScript 多态

面向对象的三大特性是：**封装**、**继承**、**多态**。

前面两个特性我们已经详细分析过了，接下来我们讨论一下 JavaScript 的**多态**。

多态的概念，

- 维基百科：多态（polymorphism）指为不同数据类型的实体提供统一的接口，或使用一个单一的符号 来表示多个不同的类型。
- 个人总结：不同的数据类型进行同一个操作，表现出不同的行为，就是多态的体现。

### 1.广义上的多态

那么从维基百科的定义来看，JavaScript 是一定存在多态的。

表现一：为不同数据类型的实体提供统一的接口

```javascript
function sum(a1, a2) {
  return a1 + a2
}

sum(20, 30)

sum('abc', 'cba')
```

表现二：用一个单一的符号 来表示多个不同的类型

```javascript
var foo = 123

foo = 'Hello World'

foo.split()

foo = { running: function () {} }

foo.running()

foo = []

foo.length
```

### 2.面向对象的多态

传统的面向对象编程语言中，多态的 3 个前提是：

1. 必须有**继承**（或**实现接口**）
2. 必须有**重写**，即子类方法重写父类方法。
3. 必须有**父类引用指向子类对象**。

## 二、ES6 新特性

### 1.对象增强

ES6 对象字面量增强包含 3 部分。

- 属性的简写：Property Shorthand

  ```javascript
  var name = 'zzt'

  var obj = {
    name
  }
  ```

- 方法的简写：Method Shorthand

  ```javascript
  var obj = {
    name: 'zzt',
    foo() {
      console.log('哈哈')
    }
  }
  ```

- 计算属性名：Computed Property Names

  ```javascript
  const nam = 'zzt'

  const obj = {
    [nam + 123]: '哈哈'
  }
  ```

### 2.解构（Destructuring）

ES6 中新增了一个从数组或对象中，方便获取数据的方法，称之为**解构（Destructuring）**。

解构赋值，是一种特殊的语法，它使我们可以将数组或对象“拆包”至一系列变量中。

#### 1.数组解构

- 基本解构过程

  ```javascript
  const names = ['abc', 'cba', 'nba']

  const [i1, i2, i3] = names // 基本解构
  ```

- 顺序解构

  ```javascript
  const names = ['abc', 'cba', 'nba']

  const [, , iz] = names // 顺序解构
  ```

- 解构出数组：使用 `…` 语法

  ```javascript
  const names = ['abc', 'cba', 'nba']

  const [ix, ...newArr] = names // 解构出新数组
  ```

- 解构并赋默认值

  ```javascript
  const names = ['abc', 'cba', 'nba']

  const [ia, ib, ic, id = 'aaa'] = names // 解构赋默认值
  ```

#### 2.对象解构

- 基本解构；

  ```javascript
  const obj = { name: 'zzt', age: 18, height: 1.88 }

  const { name, age, height } = obj // 基本解构
  ```

- 任意顺序解构；

  ```javascript
  const obj = { name: 'zzt', age: 18, height: 1.88 }

  const { height, name, age } = obj // 任意顺序解构
  ```

- 解构并重命名；

  ```javascript
  const obj = { name: 'zzt', age: 18, height: 1.88 }

  const { name: newName } = obj // 解构并重命名
  ```

- 解构赋默认值；

  ```javascript
  const obj = { name: 'zzt', age: 18, height: 1.88 }

  const { address: newAddress = '广州市' } = obj // 解构赋默认值
  ```

- 解构出新对象。

  ```javascript
  const obj = { name: 'zzt', age: 18, height: 1.88 }

  const { name, ...newObj } = obj // 解构出新对象
  ```

解构的应用场景非常多，比如：

- 对象结构，获取对象中的属性，并赋值给同名的变量。
- 函数参数的解构。

## 三、手写 apply，call，bind 方法

手写 apply, call 方法，并进行封装

```javascript
// 1.2. 封装原型中
Function.prototype.ztexec = function (thisArg, otherArgs) {
  // 1.获取 thisArg, 并且确保是一个对象类型
  thisArg = thisArg === null || thisArg === undefined ? window : Object(thisArg)

  // thisArg.fn = this
  Object.defineProperty(thisArg, 'fn', {
    configurable: true,
    value: this
  })

  const res = thisArg.fn(...otherArgs)

  delete thisArg.fn

  return res
}

// 1.给函数对象添加方法: ztapply
Function.prototype.ztapply = function (thisArg, otherArgs) {
  return this.ztexec(thisArg, otherArgs)
}

// 2.给函数对象添加方法: ztcall
Function.prototype.ztcall = function (thisArg, ...otherArgs) {
  return this.ztexec(thisArg, otherArgs)
}
```

手写 bind 方法

```javascript
Function.prototype.ztbind = function (thisArg, ...args) {
  // console.log(this) // -> foo 函数对象
  thisArg = thisArg === null || thisArg === undefined ? window : Object(thisArg)

  Object.defineProperty(thisArg, 'fn', {
    value: this
  })

  return (...newArgs) => {
    return thisArg.fn(...args, ...newArgs) // 不能删除 fn 属性，因为返回的函数可能还会被调用。
  }
}
```
