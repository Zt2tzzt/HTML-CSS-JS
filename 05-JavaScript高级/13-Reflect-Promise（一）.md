# Reflect

Reflect 是什么？

- 一个内置对象。

有什么用？

- 提供了很多操作对象的方法，有点像Object中操作对象的方法；

-----

已有 Object 提供对象的操作，为什么还会出现 Reflect

- 这是因为在早期的ECMA规范中没有考虑到这种对**对象本身**的操作如何设计会更加规范，所以将这些 API 放到了 Object 上面； 
- 但是 Object 作为一个**构造函数**，这些操作放到它身上并不合适； 
- 另外还包含一些类似于 `in`、`delete` 操作符，让JS看起来是会有一些奇怪的； 
- 所以在ES6中新增了 `Reflect`，让我们这些操作都集中到了 Reflect 对象上；
- 另外在使用 Proxy 时，可以做到**不操作原对象**；

-----

Reflect 的常见方法。
- `Reflect.getPrototypeOf(target)` - 类似于 Object.getPrototypeOf()。
- `Reflect.setPrototypeOf(target, prototype)` - 设置对象原型的函数. 返回一个 Boolean，如果更新成功，则返回 true。
- `Reflect.isExtensible(target)` - 类似于 Object.isExtensible()
- `Reflect.preventExtensions(target)` - 类似于 Object.preventExtensions()。返回一个Boolean。
- `Reflect.getOwnPropertyDescriptor(target, propertyKey)` - 类似于 Object.getOwnPropertyDescriptor()。如果对象中存在 该属性，则返回对应的属性描述符, 否则返回 undefined.
- `Reflect.defineProperty(target, propertyKey, attributes)` - 和 Object.defineProperty() 类似。如果设置成功就会返回 true
- `Reflect.ownKeys(target)` - 返回一个包含所有自身属性（不包含继承属性）的数组。(类似于 Object.keys(), 但不会受enumerable影响).，相当于 getOwnPropertyName 加上 getOwnPropertySymbol 的效果。
- `Reflect.has(target, propertyKey)` - 判断一个对象是否存在某个属性，和 in 运算符 的功能完全相同。
- `Reflect.get(target, propertyKey[, receiver])` - 获取对象身上某个属性的值，类似于 target[name]。
- `Reflect.set(target, propertyKey, value[, receiver])` - 将值分配给属性的函数。返回一个Boolean，如果更新成功，则返回true。
- `Reflect.deleteProperty(target, propertyKey)` - 作为函数的 delete 操作符，相当于执行 delete target[name]。
- `Reflect.apply(target, thisArgument, argumentsList)` - 对一个函数进行调用操作，同时可以传入一个数组作为调用参数。和 Function.prototype.apply() 功能类似。
- `Reflect.construct(target, argumentsList[, newTarget])` - 对构造函数进行 new 操作，相当于执行 new target(...args)。

-----

Reflect 通常和 Proxy 一起使用，共同完成代理。

-----

使用 Reflect 的好处3点。代码实现。

- 对对象进行操作时，不直接操作原对象。
- 操作方法会返回布尔值，判断是否操作成功。
- 可使用 reciver 参数获取代理对象。将原对象中访问器中的 this 改为代理对象。

```javascript
const obj = {
  _name: "zzt",
  set name(newValue) {
    console.log("this:", this) // 默认是 obj，使用 Reflect 调用该访问器，this 改为 reciver 参数。
    this._name = newValue
  },
  get name() {
    return this._name
  }
}
const objProxy = new Proxy(obj, {
  set: function(target, key, newValue, receiver) {
    // target[key] = newValue
    // 1.好处一: 代理对象的目的: 不再直接操作原对象
    // 2.好处二: Reflect.set 方法有返回 Boolean 值, 可以判断本次操作是否成功
    /*
       3.好处三:
         > receiver 就是外层 Proxy 对象
         > Reflect.set/get 最后一个参数, 可以决定对象访问器 setter / getter 的 this 指向
    */
    console.log("proxy 中设置方法被调用")
    const isSuccess = Reflect.set(target, key, newValue, receiver)
    if (!isSuccess) {
      throw new Error(`set ${key} failure`)
    }
  },
  get: function(target, key, receiver) {
    console.log("proxy中获取方法被调用")
    return Reflect.get(target, key, receiver)
  }
})
objProxy.name = "CR7"
objProxy.name
```

-----

了解使用 Reflect 的 construct 重写借用构造函数继承（理解，不会实际用）。

```javascript
function Person(name, age) {
  this.name = name
  this.age = age
}
function Student(name, age) {
  // Person.call(this, name, age)
  const _this = Reflect.construct(Person, [name, age], Student)
  return _this
}
const stu = new Student("zzt", 18)
```

-----

# Promise

ES5之前异步函数的处理。有什么缺陷？

```javascript
// 1.设计这样的一个函数
function execCode(counter, successCallback, failureCallback) {
  // 异步任务
  setTimeout(() => {
    if (counter > 0) { // counter可以计算的情况 
      let total = 0
      for (let i = 0; i < counter; i++) {
        total += i
      }
      // 在某一个时刻只需要回调传入的函数
      successCallback(counter)
    } else { // 失败情况, counter有问题
      failureCallback(`${counter}值有问题`)
    }
  }, 3000)
}
// 2.ES5之前,处理异步的代码都是这样封装
execCode(100, (value) => {
  console.log("本次执行成功了:", value)
}, (err) => {
  console.log("本次执行失败了:", err)
})
```

1. 需要自行设计回调函数、回调函数的名称、回调函数的使用等； 
2. 对于不同的开发者、不同的框架设计出来的方案是不同的，那么调用者必须耐心去看别人的源码或者文档，以便理解函数到底怎么用；

-----

什么是 Promise？

- 一个内置类。

如何使用？

1. 通过 new 创建 Promise 对象时，我们需要传入一个回调函数，我们称之为 `executor` 
2. 这个回调函数会被立即执行，并且给传入另外两个回调函数`resolve`、`reject`； 
3. 当我们调用 `resolve` 回调函数时，会执行 Promise 对象的 `then` 方法传入的回调函数；
4. 当我们调用 `reject` 回调函数时，会执行 Promise 对象的 `catch` 方法传入的回调函数；

-----

使用 Promise 对上面代码做重构。

```javascript
function execCode(counter) {
  const promise = new Promise((resolve, reject) => {
    // 异步任务
    setTimeout(() => {
      if (counter > 0) { // counter可以计算的情况 
        let total = 0
        for (let i = 0; i < counter; i++) {
          total += i
        }
        // 成功的回调
        resolve(total)
      } else { // 失败情况, counter有问题
        // 失败的回调
        reject(`${counter}有问题`)
      }
    }, 3000)
  })
  return promise
}
execCode(255).then(value => {
  console.log("成功:", value)
}).catch(err => {
  console.log("失败:", err)
})
```

-----

Promise 的使用过程可以划分为3个状态。

- 待定（`pending`）: 初始状态，既没有被兑现，也没有被拒绝；当执行 executor 中的代码时，处于该状态；
- 已兑现（`fulfilled`）: 意味着操作成功完成；执行了 resolve 时，处于该状态，Promise 已经被兑现；
- 已拒绝（`rejected`）: 意味着操作失败；执行了 reject 时，处于该状态，Promise 已经被拒绝；

Promise 的状态一旦确定下来，就不会再更改。

-----

什么是 Promise 中的 executor？

- 是在创建 Promise 时需要传入的一个回调函数。

如何在 executor 中确定状态。

- 通过 `resolve`，可以兑现（fulfilled）Promise 的状态，也可以称之为已决议（resolved）； 
- 通过 `reject`，可以拒绝（reject）Promise 的状态；

-----

resolve 中传入3种不同值的区别。

- 如果 resolve 传入一个普通的值或者对象，那么这个值会作为 then 回调的参数； 
- 如果 resolve 中传入的是另外一个 Promise，那么这个新 Promise 会决定原 Promise 的状态： 
- 如果 resolve 中传入的是一个对象，并且这个对象有实现 `then` 方法，那么会执行该 then 方法，并且根据 then 方法的结
果来决定 Promise 的状态：

```javascript
const p = new Promise((resolve) => {
  // setTimeout(resolve, 2000)
  setTimeout(() => {
    resolve("p的resolve")
  }, 2000)
})
const promise = new Promise((resolve, reject) => {
  // ------- 伪代码 ----------
  // 1.普通值
  resolve([
    {name: "macbook", price: 9998, intro: "有点贵"},
    {name: "iPhone", price: 9.9, intro: "有点便宜"},
  ])
  // 2.resolve(promise)，如果resolve的值本身Promise对象, 那么当前的Promise的状态会有传入的Promise来决定
  resolve(p)
  // 3.resolve(thenable对象)
  resolve({
    name: "kobe",
    then: function(resolve) {
      resolve(11111)
    }
  })
  // ------- 伪代码 ----------
})
promise.then(res => {
  console.log("then中拿到结果:", res)
})
```

-----

什么是 then 方法？

- Promise 的实例方法，`Promise.prototype.then()`

then 方法接收2个参数的写法。

- fulfilled 的回调函数：当状态变成 fulfilled 时会回调的函数；
- rejected 的回调函数：当状态变成 rejected 时会回调的函数；

```javascript
promise.then(res => {
  console.log("成功回调~", res)
}, err => {
  console.log("失败回调~", err)
})
```
-----

then 方法多次调用的写法。

-  一个 Promise 的 then 方法是可以被多次调用的：
- 每次调用我们都可以传入对应的 fulfilled 回调；
-  当 Promise 的状态变成 fulfilled 的时候，这些回调函数都会被执行；

```javascript
promise.then(res => {
  console.log("成功回调~", res)
})
promise.then(res => {
  console.log("成功回调~", res)
})
promise.then(res => {
  console.log("成功回调~", res)
})
// ...
```

-----

如果有 Promise 会出现 rejected 状态，那么一般监听 then 方法，都要监听 catch（在 then 方法后链式调用，或者在 then 方法中传第二个参数），否则 rejected 后会报错。

错误写法：

```javascript
const promise = new Promise((resolve, reject) => {
	reject("failure")
})
promise.then(res => console.log(res)) // 即使下面有 catch 方法，还是会报错。
promise.catch(err => console.log(err))
```

正确写法：

```javascript
const promise = new Promise((resolve, reject) => {
  reject("failure")
})
promise.then(res => {
  console.log("成功的回调:", res)
}).catch(err => {
  console.log("失败的回调:", err)
})
// 或者
promise.then(res => {
  console.log("成功回调~", res)
}, err => {
  console.log("失败回调~", err)
})
```

