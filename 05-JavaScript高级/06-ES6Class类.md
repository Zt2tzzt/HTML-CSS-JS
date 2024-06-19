# ES6 class 类

## 一、class 类

我们会发现，按照上文的构造函数形式创建类，不仅仅和编写普通的函数过于相似，而且代码并不容易理解。

在 ES6（ECMAScript 2015）新的标准中使用了 `class` 关键字，来直接定义类；

- 但是类本质上，依然是前面所讲的构造函数、与原型链结合的语法糖而已；
- 所以理解了前面的构造函数、原型链，更有利于我们理解类的概念和继承关系；

那么，如何使用 `class` 关键字来定义一个类呢？可以使用两种方式来声明类：**类声明**和**类表达式**；

### 1.类声明

类声明的写法如下：

```javascript
class Person {

}
```

### 2.类表达式

类表达式的写法如下：

```javascript
var Student = class {

}
```

> 定义类的大括号 `{}` 中，代表的不是对象，而是一种特殊的语法。
>
> 类中的内容，不能使用逗号分割。
>
> 编写 class 类是高内聚，低耦合思想的体现，

## 二、class 类和 function 构造函数

我们来研究一下类的一些特性：你会发现，它和我们的构造函数的特性，其实是一致的；

```javascript
class Person {}
var p = new Person

console.log(Person) // class Person {}

console.log(Person.prototype) // {}

console.log(Person.prototype.constructor) // class Person {}

console.log(p.__proto__ === Person.prototype) // true

console.log(typeof Person) // function
```

本质上，class 类，是构造函数和原型链的语法糖。

- 它们最明显的区别是，class 类必须用 `new` 操作符调用，而构造函数可以独立调用。

```javascript
class Person {}
var p = new Person

function Student() {}
Student()
```

## 三、class 类的 constructor 构造函数

如果我们希望在创建对象的时候，给类传递一些参数，这个时候应该如何做呢？

- 每个类都可以有一个自己的构造函数（方法），这个方法的名称是固定的，即 `constructor`，如果没有明确指定，使用默认的 `constructor`；
- 每个类只能有一个 `constructor` 构造函数，如果包含多个构造函数，那么会抛出异常；

当我们通过 `new` 关键字，操作类的时候，会调用这个 `constructor` 函数，并且执行如下操作：

1. 在内存中创建一个新的对象（空对象）；
2. 这个对象内部的隐式原型 [[prototype]] 属性，会被赋值为该类的 `prototype` 属性；
3. 构造函数内部的 `this`，会指向创建出来的新对象；
4. 执行构造函数的内部代码（函数体代码）；
5. 如果构造函数没有返回非空对象，则返回创建出来的新对象；

## 四、class 类的属性、实例方法

编写 class 类，定义类的属性，实例方法。

在上面我们定义的属性，都是直接放到了 `this` 上，也就意味着，它是放到了创建出来的新对象中：

- 在前面我们说过对于实例的方法，我们是希望放到原型上的，这样可以被多个实例来共享；
- 这个时候我们可以直接在类中定义；

```javascript
class Person {
  constructor(name, age, height) {
    this.name = name;
    this.age = age;
    this.height = height;
  }

  running() {
    console.log(this.name, 'running~')
  }

  eating() {
    console.log(this.name, 'eating~')
  }
}
```

## 五、function 构造函数的属性、实例方法、静态方法

区分类的实例方法和静态方法（类方法），理解代码。

```javascript
function Person(name, age) {
  this.name = name
  this.age = age
}

// 构造函数的实例方法，定义在构造函数的显示原型上。
Person.prototype.running = function () {}

// 构造函数的静态方法，定义在构造函数对象上。
Person.randomPerson = function () {}
```

## 六、class 类的访问器方法

我们之前介绍对象的属性描述符时，有讲过对象可以添加 setter 和 getter 方法，

那么 class 类也是可以的：

```javascript
class Person {
  constructor(name, age) {
    this._name = name
  }

  set name(value) {
    console.log('调用了 name 的 setter 方法')
    this._name = value
  }

  get name() {
    console.log('调用了 name 的 getter 方法')
    return this._name
  }
}

var p1 = new Person('张三', 18)
console.log(p1.name)
p1.name = '李四'
```

class 类访问器方法的使用场景。

```javascript
class Rectangle {
  constructor(x, y, width, height) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
  }
  
  get position() {
    // 将多个属性作为一个整体暴露出去。
    return { x: this.x, y: this.y }
  }
  
  get size() {
    return { width: this.width, height: this.height }
  }
}

var rect1 = new Rectangle(10, 20, 100, 200)

rect1.position
rect1.size
```

### 1.存取属性描述符的访问器写法

存取属性描述符中，设置访问器属性写法。

```javascript
const obj = { _name: 'zzt', age: 18 } // 程序员之间的约定: 以下划线开头的属性和方法, 不在外界访问

Object.defineProperty(obj, 'name', {
  configurable: true,
  enumerable: true,
  set: function (value) {
    console.log('调用了 name 的 setter 方法')
    this._name = value
  },
  get: function () {
    console.log('调用了 name 的 getter 方法')
    return this._name
  }
})

console.log(obj.name);
obj.name = 'kobe'
```

### 2.对象中的访问器写法

对象中的访问器写法如下（不推荐，阅读性差）。

```javascript
var obj = {
  _name: 'zzt',
  set name(value) {
    console.log('调用了 name 的 setter 方法')
    this._name = value
  },
  get name() {
    console.log('调用了 name 的 getter 方法')
    return this._name
  }
}

console.log(obj.name);
obj.name = 'kobe'
```

## 七、class 类的静态方法

class 类的静态方法，也称为类方法，通常用于定义直接使用类来执行的方法，不需要有类的实例，使用 `static` 关键字来定义：

```java
class Person {
  constructor(age) {
    this.age = age;
  }

  static create() {
    return new Person(Math.floor(Math.random() * 100))
  }
}

var p1 = Person.create()
console.log(p1); // Person {age: 61}
```

### 1.class 类静态方法中 this 指向

编写 class 类，定义类（静态）方法，里面的 this 指向谁？

其中的 `this` 代表 class 类本身，因为静态方法通常直接被 class 类调用，应用的是隐式绑定的规则。

```javascript
var names = ['abc', 'cba', 'nba', 'mba']

class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }

  // 类方法（静态方法）
  static randomPerson() {
    var randomName = names[Math.floor(Math.random() * names.length)]
    
    return new this(randomName, Math.floor(Math.random() * 100)) // 静态方法中 this 代表类，因为静态方法通常被类调用。
  }
}

var randomPerson = Person.randomPerson()
```
