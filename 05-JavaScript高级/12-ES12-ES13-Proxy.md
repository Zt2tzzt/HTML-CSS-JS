# ES12的5个新特性

1. `FinalizationRegistry` 类，用于在对象被回收时请求一个回调。

   ```javascript
   const finalRegistry = new FinalizationRegistry(value => { // 传入一个清理回调（finalizer）
   	console.log(`注册在 finalRegistry 的对象，${value}被销毁`); // 注册在 finalRegistry 的对象，lingz 被销毁
   })
   let obj = { name: 'lingz' }
   finalRegistry.register(obj, 'lingz')
   obj = null
   ```

2. `WeakRef` 类，用于弱引用一个对象。

   ```javascript
   let obj = { name: 'zzt', age: 19 }
   let info = new WeakRef(obj)
   obj = null
   info.deref()?.name
   ```

3. Logical assignment operators, 3个逻辑赋值运算符。

   ```javascript
   msg ||= 'default message' // 逻辑或赋值运算符，相当于 msg = msg || 'default message
   msg ??= 'default message' // 逻辑与赋值运算符，相当于 msg = msg ?? 'default message
   obj &&= obj.msg // 逻辑空赋值运算符，相当于 obj = obj && obj.msg
   ```

4. 数字分割符，Numeric Seperator。

   ```javascript
   const num = 100_000_000
   ```

5. `String.prototype.replaceAll()`

   ```javascript
   const message = "my name is zzt, zzt age is 18"
   const newMessage = message.replace("zzt", "CR7") // my name is CR7, zzt age is 18
   const newMessage2 = message.replaceAll("zzt", "CR7") // my name is CR7, CR7 age is 18
   ```

# ES13的3个新特性

1. `Array.prototype.at()` -  接收一个整数值并返回该索引的元素，允许正数和负数。

   ```javascript
   const arr = ['abc', 'cba', 'nba']
   const item1 = arr.at(1) // 'cba'
   const item2 = arr.at(-1) // 'nba'
   ```

2. `Object.hasOwn(obj, propKey)` - 用于判断一个对象中是否有某个自己的属性；

   - 与 `Object.prototype.hasOwnProperty()`相比的主要优势：
		1. 防止对象内部有重写 hasOwnProperty 
	  2. 对于隐式原型指向 null 的对象，hasOwnProperty 无法进行判断

   ```javascript
   const obj = {
     name: "zzt",
     age: 18,
     // 1.和 hasOwnProperty 的区别一: 防止对象中也有一个自己的 hasOwnProperty 方法
     hasOwnProperty: function() {
       return "abc"
     }
   }
    // 2.和 hasOwnProperty 的区别二:
   const info = Object.create(null)
   info.name = "zzt"
   Object.hasOwn(info, "name") // true
   ```

3. New members of classes 对象中的新成员

    - Instance public fields 公共实例属性。

      ```javascript
      class Foo {
        msg = '' // 公共实例属性
        constructor() {
          this.msg = 'Hello'
        }
      }
      ```

    - Static public fields 公共静态属性

      ```javascript
      class Person {
        static total = '70亿' // 公共静态属性
        constructor() {}
      }
      ```

    - Instance private fields 私有实例属性

      ```javascript
      class Foo {
        #intro = '' // 私有实例属性
        constructor() {
          this.#intro = 'my name is zzt'
        }
      }
      const foo = new Foo
      foo.#intro // 报错
      ```

    - static private fields 私有静态属性

      ```javascript
      class Foo {
        static #intro = '' // 私有静态属性
        constructor() {}
      }
      Foo.#intro // 报错
      ```

    - static block - 静态代码块

      ```javascript
      class Foo {
        static {
          // new 操作 Foo 时，会先执行进行一些初始化操作...
        }
      }
      ```

# Vue2 响应式原理



## 基本实现

使用ES5写一个对象属性捕获器案例（Vue2 响应式原理实现）。

```javascript
var obj = { name: 'lingz', age: 29 }
Object.keys(obj).forEach(key => {
	(function (prop) {
		var value = obj[prop]
		Object.defineProperty(obj, prop, {
			get: function () {
				console.log('监听到obj对象' + prop + '属性被访问');
				return value
			},
			set: function (newValue) {
        console.log('监听到obj对象' + prop + '属性被设置为' + newValue);
				value = newValue
			}
		})
	})(key)
})
console.log(obj.name);
```

## 有什么缺点2点。

- `Object.defineProperty` 设计的初衷，不是为了去捕获一个对象中所有对属性的操作的。
- 如果我们想监听更加丰富的操作，比如**新增属性**、**删除属性**，那么 Object.defineProperty 是无能为力的。

# Proxy

什么是 Proxy，

- ES6中新增的内置类。

它有什么用？

- 用于创建一个代理对象，对原对象的所有操作，都通过代理对象来完成。

使用 Proxy 的2个步骤。

1. 通过 `new Proxy` 传入需要侦听的对象以及一个处理对象，可以称之为 handler； 

	```javascript
	const p = new Proxy(target, handler)
	```

2. 之后的操作都是直接对创建出的代理对象的操作，而不是原有的对象，并在 `handler` 里面进行侦听；

## 基本使用

Proxy 的 get 和 set 捕获器如何使用，代码实现？

- set 函数有四个参数（新增一个属性并赋值，也会在 proxy 中的 set 捕获器中监听）：
	- `target`：目标对象（侦听的对象）； 
	- `property`：将被设置的属性 key； 
	- `value`：新属性值； 
	- `receiver`：调用的代理对象；
- get 函数有三个参数： 
	- `target`：目标对象（侦听的对象）； 
	- `property`：被获取的属性key；
	- `receiver`：调用的代理对象；

```javascript
const objProxy = new Proxy(obj, {
  set: function(target, key, newValue) {
    console.log(`监听: 监听${key}的设置值: `, newValue)
    target[key] = newValue
  },
  get: function(target, key) {
    console.log(`监听: 监听${key}的获取`)
    return target[key]
  }
})
```

## Proxy 的13个捕获器。

- `handler.getPrototypeOf()` - Object.getPrototypeOf 方法的捕捉器。
- `handler.setPrototypeOf()` - Object.setPrototypeOf 方法的捕捉器。
- `handler.isExtensible()` - Object.isExtensible 方法的捕捉器(判断是否可以新增属性)。
- `handler.preventExtensions()` - Object.preventExtensions 方法的捕捉器。
- `handler.getOwnPropertyDescriptor()` - Object.getOwnPropertyDescriptor 方法的捕捉器。
- `handler.defineProperty()` - Object.defineProperty 方法的捕捉器。
- `handler.ownKeys()` - Object.getOwnPropertyNames 方法和 Object.getOwnPropertySymbols 方法的捕捉器。
- `handler.has()` - in 操作符的捕捉器。
- `handler.get()` - 属性读取操作的捕捉器。
- `handler.set()` - 属性设置操作的捕捉器。
- `handler.deleteProperty()` - delete 操作符的捕捉器。
- `handler.apply()` - 函数调用操作的捕捉器。
- `handler.construct()` - new 操作符的捕捉器。

## Vue3 响应式原理（简略版）

使用 Proxy 常用的4个捕获器，对对象属性进行捕获（Vue3 响应式原理）。

```javascript
const objProxy = new Proxy(obj, {
  set: function(target, key, newValue) {
    console.log(`监听: 监听${key}的设置值: `, newValue)
    target[key] = newValue
  },
  get: function(target, key) {
    console.log(`监听: 监听${key}的获取`)
    return target[key]
  },
  deleteProperty: function(target, key) {
    console.log(`监听: 监听删除${key}属性`)
    delete target.key
  },
  has: function(target, key) {
    console.log(`监听: 监听in判断 ${key}属性`)
    return key in target
  }
})
```

## 函数对象的操作捕获

使用 Proxy 的2个捕获器，捕获函数对象的操作。

```javascript
function foo(num1, num2) {
  console.log(this, num1, num2)
}
const fooProxy = new Proxy(foo, {
  apply: function(target, thisArg, otherArgs) {
    console.log("监听执行了 apply 操作")
    target.apply(thisArg, otherArgs)
  },
  construct: function(target, otherArray) {
    console.log("监听执行了 new 操作")
    console.log(target, otherArray)
    return new target(...otherArray)
  }
})
```

