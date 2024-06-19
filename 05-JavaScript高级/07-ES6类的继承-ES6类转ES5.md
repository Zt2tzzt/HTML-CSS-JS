# ES6 Class 类继承、ES6 Class 类转 ES5 构造函数

前面我们花了很大的篇幅，讨论了在 ES5 中构造函数实现继承的方案，

虽然最终实现了相对满意的继承机制，但是过程却是非常繁琐的。

- 其中包括实例属性，实例方法的继承。

> 类的继承有两个概念：父类（也称**超类**），子类（也称**派生类**）。

## 一、ES6 Class 类的继承

在 ES6 class 类上，新增了 `extends` 关键字，可以方便的帮助我们实现继承：

### 1.extends 关键字

编写 class 类，使用 `extends` 关键字实现继承。

```javascript
class Person {

}

class Student extends Person {

}
```

### 2.super 关键字

Class 类里面，还可以使用 `super` 关键字：

#### 1.super 使用位置和方式

`super` 关键字的使用位置有三个：

- 子类的 `constructor` 构造函数；执行 `super(...)` 来调用一个父类 `constructor`构造函数。
  - 注意：在子类的 `constructor` 构造函数中，使用 `this` 或者返回默认对象之前，必须先通过 `super` 调用父类的构造函数！

- 子类的实例方法；执行 `super.method(...)` 来调用一个父类方法；
- 子类的静态方法。执行 `super.method(...)` 来调用一个父类方法；

编写 class，使用 `extends` 和 `super` 关键字，实现继承。

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

## 二、ES6 Class 类实例方法、静态方法重写

代码实现 ES6 Class 类的继承，在子类中重写父类的实例方法和静态方法。

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

## 三、ES6 Class 类继承内置类

可使用 ES6 Class 类的继承，对 JavaScript 内置类进行扩展，如下方代码所示：

```javascript
// 1.创建一个 class 类, 继承自 Array 内酯类
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

在 ES5 中，只能在内置类的显示原型上，进行扩展，如下方代码所示：

```javascript
Array.prototype.lastItem = function () {
  return this[this.length - 1]
}

const arr = new Array(10, 20, 30)

arr.lastItem()
```

## 四、ES6 Class 类的混入（mixin）

ES6 Class 的类，只支持单继承，也就是只能有一个父类；不能实现接口：

这个时候我们可以使用混入（mixin），实现类似效果；

- 这是一种思想，在实际开发中基本不用。

```javascript
function mixinSwimming(BaseClass) {
  return class extends BaseClass {
    swimming() {
      console.log('swimming~')
    }
  }
}

function mixinRunning(BaseClass) {
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

## 五、babel ES6 转 ES5

Babel 是一个工具链，最早用于在旧浏览器或环境中，将 ES6+ 规范的代码，转成向后兼容的版本。

现在主要用于语法转换，源代码转换等。

Babel 本质上是一个编译器。

### 1.纯函数标记

`/*#__PURE__*/` 标记为纯函数，有利于在代码转换打包的过程中做 tree shaking。

```javascript
var Person = /*#__PURE__*/ (function () { ... })
```

> 使用 [Babel 线上环境](https://babeljs.io/) 理解 ES6 class 类转成 ES5 代码的过程。

## 六、ES5 构造函数静态方法的继承

使用原型式继承的寄生式继承实现方式，实现构造函数静态方法的继承，

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
