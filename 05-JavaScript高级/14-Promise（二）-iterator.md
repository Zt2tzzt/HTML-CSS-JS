# then 方法

then 方法的返回值是一个 `promise`；该返回值处于什么状态3种情况。链式调用代码理解。

- 当 then 方法中的回调函数本身在执行的时候，那么它处于 pending 状态；
- 当 then 方法中的回调函数返回一个结果时，
	- 返回一个普通的值；那么 then 方法返回的 promise 处于 fulfilled 状态，并且会将结果作为 resolve 的参数；
	- 返回一个 Promise；由新的 promise 的状态来决定。
	- 返回一个 thenable 值；执行 then 方法，决定状态。
- 当 then 方法抛出一个异常时，那么 then 方法返回的 promise 处于 reject 状态；

```javascript
const newPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("why")
  }, 3000)
})
promise.then(res => {
  console.log("第一个Promise的then方法:", res)
  // --------- 伪代码 -----------
  // 1.普通值
  return "bbbbbbb"
  // 2.新的Promise
  return newPromise
  // 3.thenable的对象
  return {
    then: function(resolve) {
      resolve("thenable")
    }
  }
  throw new Error('error message') // catch 方法中的回调函数会执行。
  // --------- 伪代码 -----------
}).then(res => {
  console.log("第二个Promise的then方法:", res)
})
```

-----

# catch 方法

Promise 如果被拒绝，会回调最近一个相关联的 catch 方法。代码理解。

```javascript
const p = new Promise((resolve, reject) => {
  reject('failure')
})
p.then(res => {
  console.log('res1', res)
}).then(res => {
  console.log('res2', res)
}).catch(err => {
  console.log('err1', err) // 后打印
})
p.catch(err => {
  console.log('err2', err) // 先打印
})
```

-----

catch 方法的返回值也是一个 `promise`，链式调用代码理解。

```javascript
const p = new Promise((resolve, reject) => {
  reject('failure')
})
p.catch(err => {
  console.log('err1', err) // 会打印，failure
}).catch(err => {
  console.log('err2', err)
}).then(res => {
  console.log('res1', res) // 会打印，undefined
})
```

-----

catch 方法的多次调用，代码理解。

```javascript
const p = new Promise((resolve, reject) => {
  reject('failure')
})
p.catch(err => {
  console.log('err1', err) // 会打印，faliure
})
p.catch(err => {
  console.log('err2', err) // 会打印，faliure
})
```

-----

finally 方法是什么？

- ES9新特性，`Promise.prototype.finally()`

有什么用？

- finally 传入的回调函数不接收参数，无论 promise 是 fulfilled 状态，还是 rejected 状态，它都会执行。

```javascript
const promise = new Promise((resolve, reject) => {
  resolve("aaaa")
})
promise.then(res => {
  console.log("then:", res)
}).catch(err => {
  console.log("catch:", err)
}).finally(() => {
  console.log("哈哈哈哈")
})
```

-----

# Promise 静态方法

resolve 方法有什么用，怎么用？

- Promise.resolve 的用法相当于 new Promise，并且执行 resolve 操作。
- Promise.resolve 传入的参数也分3种情况，见 resolve 回调函数传入的3种类型值。

```javascript
const p = Promise.resolve('abc')
p.then(res => {
  console.log('res', res) // abc
})
```

-----

reject 方法有什么用，怎么用？

- 用法类似于 resolve，相当于 new Promise，并在 executor 中调用 rejected。
- Promise.reject 传入的参数无论是什么形态，都会直接作为 reject 状态的参数传递到 catch 的回调函数中。

```javascript
const p = Promise.reject("rejected error")
p.catch(err => {
  console.log("err:", err)
})
```
函数参数占位的规范写法。

```javascript
new Promise((_, reject) => {...}) // 使用 “_” 占位
```

-----

all 方法有什么用，怎么用？

- 将多个 Promise 包裹在一起形成一个新的 Promise。
- 新的 Promise 状态由包裹的所有 Promise 共同决定：
	- 当所有的 Promise 状态都变成 fulfilled 状态时，新的 Promise 状态为 fulfilled，并且会将所有 Promise 的返回值组成一个数组；
	- 当有一个 Promise 状态为 reject 时，新的 Promise 状态为 reject，并且会将第一个 reject 的返回值作为参数；

```javascript
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("p1 reject error")
  }, 3000)
})
const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("p2 resolve")
  }, 2000)
})
const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("p3 resolve")
  }, 5000)
})
Promise.all([p1, p2, p3]).then(res => {
  console.log("all promise res:", res)
}).catch(err => {
  console.log("all promise err:", err)
})
```

-----

allSettled 方法有什么用，怎么用？

- ES11新特性，
- 该方法会在所有的 Promise 都有结果（settled），无论是 fulfilled，还是 rejected 时，才会有最终的状态；
- 并且这个 Promise 的**结果一定是 fulfilled 的**；
- allSettled 的结果是一个数组，数组中存放着每一个 Promise 的结果，并且是对应一个对象的；
- 这个对象中包含 status 状态，以及对应的 value 值或 reason 值；

```javascript
Promise.allSettled([p1, p2, p3]).then(res => {
  console.log("all settled:", res)
})
/* res: [
		{status: 'rejected', reason: 'p1 reject error'},
		{status: 'fulfilled', value: 'p2 resolve'},
		{status: 'fulfilled', value: 'p3 resolve'}
	 ]
*/
```

-----

race 方法有什么用？怎么用？

- 多个 Promise 相互竞争，谁先有结果，那么就使用谁的结果（无论这个结果是 fulfilled 还是 rejected ）；

```javascript
Promise.race([p1, p2, p3]).then(res => {
  console.log("race promise:", res)
}).catch(err => {
  console.log("race promise err:", err)
})
```

-----

any 方法有什么用？怎么用？

- ES12新特性。
- any 方法会等到一个 fulfilled 状态，才会决定新 Promise 的状态； 
- 如果所有的 Promise 都是 reject 的，那么也会等到所有的 Promise 都变成 rejected 状态；并会报一个 AggregateError 的错误。

```javascript
Promise.any([p1, p2, p3]).then(res => {
  console.log("any promise res:", res)
}).catch(err => {
  console.log("any promise err:", err)
})
```

-----

# iterator

什么是迭代器（iterator）？

- 使容器（数组，列表，哈希表，树结构，...）能够遍访的对象。
- 使用迭代器遍历对象，无需关心对象的内部实现细节。
- 其行为像数据库中的光标，迭代器最早出现在1974年设计的CLU编程语言中； 
- 在各种编程语言的实现中，迭代器的实现方式各不相同，但是基本都有迭代器，比如 Java、Python 等；

-----

在JavaScript中，迭代器指的是什么？

- 一个具体的对象，这个对象需要符合**迭代器协议**（iterator protocol）。
- 迭代器协议定义了产生一系列值（无论是有限还是无限个）的标准方式；
- 在 JavaScript 中这个标准就是一个特定的 next 方法；

-----

迭代协议中 `next` 方法有什么要求。

- 一个无参数或者一个参数的函数，返回一个应当拥有以下两个属性的对象： 
- done（boolean） 
	- 如果迭代器可以产生序列中的下一个值，则为 false（这等价于没有指定 done 这个属性） 
	- 如果迭代器已将序列迭代完毕，则为 true。这种情况下，value 是可选的，如果它依然存在，即为迭代结束之后的默认返回值。
- value
	- 迭代器返回的任何 JavaScript 值。done 为 true 时可省略。

-----

为一个数组创建一个迭代器。

```javascript
const names = ["abc", "cba", "nba"]
// 给数组 names 创建一个迭代器(迭代器: names 的迭代器)
let index = 0
const namesIterator = {
  next: function() {
    if (index < names.length) {
      return { done: false, value: names[index++] }
    } else {
      return { done: true }
    }
  }
}
console.log(namesIterator.next()) // { done: false, value: 'abc' }
console.log(namesIterator.next()) // { done: false, value: 'cba' }
console.log(namesIterator.next()) // { done: false, value: 'nba' }
console.log(namesIterator.next()) // { done: true, value: undefined }
```

-----

将以上代码封装在一个工厂函数中。

```javascript
const names = ["abc", "cba", "nba"]
function createArrayIterator(arr) {
  let index = 0
  const iterator = {
    next: function() {
      if (index < arr.length) {
        return { done: false, value: arr[index++] }
      } else {
        return { done: true }
      }
    }
  }
  return iterator
}
const namesIterator = createArrayIterator(names)
console.log(namesIterator.next())
console.log(namesIterator.next())
// ...
```

-----

什么是可迭代对象？

- 它和迭代器是不同的概念； 
- 当一个对象实现了**可迭代协议** iterable protocol 时，它就是一个可迭代对象；
- 这个对象的要求是必须实现 @@iterator 方法，在代码中我们使用 `Symbol.iterator` 访问该属性，获取该对象（容器）的迭代器；

它有什么好处？

- 当一个对象变成一个可迭代对象的时候，就可以进行某些迭代操作； 
- 比如 for...of 操作时，其实就会调用它的 @@iterator 方法；

-----

创建一个可迭代对象。

```javascript
const iterableObj = {
	names: ['abc', 'cba', 'nba'],
	[Symbol.iterator]() {
		let index = 0
		return {
			next: () => {
				return index < this.names.length ? {
					done: false, value: this.names[index++]
				} : {
					done: true
				}
			},
			return: () => { // 可迭代协议中，也可实现 return 方法。
				console.log('监听到迭代器终止运行');
				return { done: true }
			}
		}
	}
}
```
-----

数组是一个可迭代对象，获取数组中的迭代器。

```javascript
const names = ["abc", "cba", "nba"]
const namesIterator = names[Symbol.iterator]()
namesIterator.next()
namesIterator.next()
// ...
```

-----

将一个对象变为可迭代对象。

```javascript
const infos = {
  name: "zzt",
  age: 18,
  height: 1.88,
  [Symbol.iterator]: function() {
    // const keys = Object.keys(this)
    // const values = Object.values(this)
    const entries = Object.entries(this)
    let index = 0
    const iterator = {
      next: function() {
        if (index < entries.length) {
          return { done: false, value: entries[index++] }
        } else {
          return { done: true }
        }
      }
    }
    return iterator
  }
}
for (const [key, value] of infos) {
  // ...
}
```