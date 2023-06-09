父类也称**超类**，子类也称**派生类**。

# extends 关键字

编写 class，使用 extends 关键字实现继承。

```javascript
class Person {}
class Student extends Person {}
```

# super 关键字

## 使用方法

super 关键字的 2 种使用。

- `super(...)` 来调用一个父类 constructor（只能在子类 constructor 中调用）
- `super.method(...)` 来调用一个父类方法。

## 调用时机

super 的调用时机。在子（派生）类的构造函数 constructor 中，**使用 this** 以及**返回默认对象之前**，必须先通过 `super` 调用父类的构造函数！

## 使用场景

super 的使用位置 3 个。

- 子类的构造函数、
- 实例方法、
- 静态方法

## 基本使用

编写 class，使用 super 关键字。

```javascript
class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }
  running() {
    console.log(this.name, 'running~')
  }
  eating() {
    console.log(this.name, 'eating~')
  }
  static sleeping() {
    console.log('sleeping~')
  }
}
class Student extends Person {
  constructor(name, age, sno, score) {
    super(name, age)
    this.sno = sno
    this.score = score
  }
  studying() {
    super.eating()
    console.log('studying~')
  }
  static rest() {
    console.log('student rest')
    super.sleeping() // 只能在子类的静态方法中使用 super 调用父类的静态方法。
  }
}
```

# 类的方法重写

什么是方法的重写，代码实现，重写实例方法和静态方法。

```javascript
class Animal {
  running() {
    console.log('running')
  }
  eating() {
    console.log('eating')
  }
  static sleep() {
    console.log('static animal sleep')
  }
}
class Dog extends Animal {
  // 子类如果对于父类的方法实现不满意(继承过来的方法)，重新实现称之为重写(父类方法的重写)
  running() {
    console.log('dog四条腿')
    super.running()
  }
  static sleep() {
    console.log('趴着')
    super.sleep()
  }
}
```

# 使用继承对内置类进行扩展

```javascript
// 1.创建一个新的类, 继承自Array进行扩展
class ZtArray extends Array {
  get lastItem() {
    return this[this.length - 1]
  }
  get firstItem() {
    return this[0]
  }
}
const arr = new ZtArray(10, 20, 30)
arr.lastItem
```

与利用原型做扩展对比。

```javascript
Array.prototype.lastItem = function () {
  return this[this.length - 1]
}
const arr = new Array(10, 20, 30)
arr.lastItem()
```

# 类的局限性

JavaScript 中类不能实现多继承，不能实现接口。使用混入实现类似效果（一种思想，开发中基本不用）。

```javascript
function mixinSwimming(BaseClass) {
  return class extends BaseClass {
    running() {
      console.log('running~')
    }
  }
}
function mixinFlying(BaseClass) {
  return class extends BaseClass {
    flying() {
      console.log('flying~')
    }
  }
}
class Bird {
  eating() {
    console.log('eating~')
  }
}
const NewBird1 = mixinSwimming(mixinFlying(Bird))
class NewBird2 extends mixinRunner(mixinAnimal(Bird)) {}
```

# 认识 babel

babel 是什么？有什么用？

- Babel 是一个工具链，最早用于在旧浏览器或环境中将 ES6+代码转成向后兼容的版本。
- 现在主要用于语法转换，源代码转换等。

- Babel 本质上是一个编译器。

---

## 纯函数标记

`/*#__PURE__*/` 标记为纯函数，有利于做 tree shaking。

```javascript
var Person = /*#__PURE__*/ (function () { ... })
```

---

理解使用 babel 将 ES6 中 class 编写的代码转成 ES5 代码的过程。

---

# ES5 中实现类（静态）方法的继承

```javascript
function cerateObj2(obj) {
  function Fn() {}
  Fn.prototype = obj
  return new Fn()
}
function inherit(Subtype, Supertype) {
  Subtype.prototype = createObject2(Supertype.prototype)
  Object.defineProperty(Subtype.prototype, 'constructor', {
    configurable: true,
    writable: true,
    value: Subtype
  })
  Object.setPrototypeOf(Subtype, Supertype) // 实现类（静态）方法的继承
}
```
