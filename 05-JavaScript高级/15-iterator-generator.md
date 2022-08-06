# iterator

有哪些对象是原生可迭代对象？代码体现。

- String、Array、Map、Set、arguments对象、NodeList集合

-----

可迭代对象可应用于哪些场景。

- JavaScript中语法：`for ...of`、展开语法（spread syntax）、`yield*`（后面讲）、解构赋值（Destructuring_assignment）；
- 创建一些对象时：`new Map([Iterable])`、`new WeakMap([iterable])`、`new Set([iterable])`、`new WeakSet([iterable])`;
- 一些方法的调用：`Promise.all(iterable)`、`Promise.race(iterable)`、`Array.from(iterable)`

-----

封装一个类，使它创建出来的实例对象都是可迭代对象。

```javascript
class Classroom {
	constructor(name, address, students) {
		this.name = name
		this.address = address
		this.students = students
	}
	[Symbol.iterator]() {
		let index = 0
		return {
			next: () => {
				return index < this.students.length ? {
					done: false, value: this.students[index++]
				} : {
					done: true
				}
			}
		}
	}
}
```

-----

哪些情况会中断迭代器的遍历？

- 比如遍历的过程中通过 `break`、`return`、`throw` 中断了循环操作；
- 比如在解构的时候，没有解构所有的值；

如何实现迭代器对象中断的监听。

- 给迭代器对象添加 `return` 方法。

```javascript
class Classroom {
	constructor(name, address, students) {
		this.name = name
		this.address = address
		this.students = students
	}
	[Symbol.iterator]() {
		let index = 0
		return {
			next: () => {
				return index < this.students.length ? {
					done: false, value: this.students[index++]
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
const classromm = new Classroom('一年二班', '5栋505号', ['abc', 'cba', 'nba'])
for (const stu of classromm) {
	if (stu === 'cba') {
		break
	}
}
```
-----

# generator

什么是生成器？

- 生成器是ES6中新增的一种**函数控制、使用**的方案。

生成器有什么用？

- 可以更加灵活的控制函数什么时候继续执行、暂停执行。

-----

什么是生成器函数？

- 用于生成生成器对象的函数。

它与普通函数有什么区别。

1. 生成器函数需要在 `function` 的后面加一个符号：`*`
2. 生成器函数可以通过 `yield` 关键字来控制函数的执行流程：
3. 生成器函数的返回值是一个Generator（生成器）：
	- 生成器事实上是一种特殊的迭代器；（它既是迭代器，又是一个可迭代对象）
	- MDN：Instead, they return a special type of iterator, called a Generator.

-----

生成器函数的执行流程是怎样的。

1. 生成器函数调用后不会执行，而是返回一个生成器对象。
2. 通过调用生成器对象的 `next` 方法来执行生成器函数中的代码。
3. 在生成器函数中使用 `yield` 操作符来暂停函数执行，并为生成器的 `next` 方法返回值。

写一个生成器函数，使用 yield 控制执行流程（基本使用）。

```javascript
// 1.定义了一个生成器函数
function* foo() {
  console.log("1111")
  console.log("2222")
  yield
  console.log("3333")
  console.log("4444")
  yield
  console.log("5555")
  console.log("6666")
	yield
}
// 2.调用生成器函数, 返回一个生成器对象
const generator = foo()
// 调用next方法
generator.next() // {value: undefined, done: false}
generator.next() // {value: undefined, done: false}
generator.next() // {value: undefined, done: false}
generator.next() // {value: undefined, done: true}
```
-----

在生成器函数中使用 return，返回值是怎样的？。

```javascript
function* foo() {
	console.log("1111")
	console.log("2222")
	yield 'aaa'
	console.log("3333")
	console.log("4444")
	yield 'bbb'
	return
	console.log("5555")
	console.log("6666")
	yield 'ccc'
}
const generator = foo()
generator.next() // {value: 'aaa', done: false}
generator.next() // {value: 'bbb', done: false}
generator.next() // {value: undefined, done: true}
generator.next() // {value: undefined, done: true}
```

-----

给生成器函数传递参数，next 函数，第一次一般不传，使用函数调用传参。

- 使用 `next` 给每个函数片段传递参数。
- 在 `next` 中传递的参数，会作为上一个 yield 语句的返回值。

```javascript
function* foo(name1) {
  console.log("执行内部代码:1111", name1) // name1
  console.log("执行内部代码:2222", name1) // name1
  const name2 = yield "aaaa"
  console.log("执行内部代码:3333", name2) // name2
  console.log("执行内部代码:4444", name2) // name2
  const name3 = yield "bbbb"
  console.log("执行内部代码:5555", name3) // name3
  console.log("执行内部代码:6666", name3) // name3
  yield "cccc"
}
const generator = foo('name1')
generator.next() // {value: ‘aaa’, done: false}
generator.next('name2') // {value: 'bbb', done: false}
generator.next('name3') // {value: 'ccc', done: false}
generator.next('name4') // {value: undefined, done: true}
```

-----

生成器函数提前结束，`return` 函数的使用，使用 `return` 传递参数。

- return 传值后这个生成器函数就会结束，之后调用 next 不会继续生成值了；

```javascript
function* foo(name1) {
	console.log("执行内部代码:1111", name1) // name1
	console.log("执行内部代码:2222", name1) // name1
	const name2 = yield "aaaa"
	console.log("执行内部代码:3333", name2) // 不会打印
	console.log("执行内部代码:4444", name2) // 不会打印
	const name3 = yield "bbbb"
	console.log("执行内部代码:5555", name3) // 不会打印
	console.log("执行内部代码:6666", name3) // 不会打印
	yield "cccc"
}
const generator = foo('name1')
generator.next() // {value: 'aaa', done: false}
generator.return('name3') // {value: ‘name3', done: true}
generator.next('name4') // {value: undefined, done: true}
```

-----

生成器函数抛出异常，`throw` 函数的使用。

- 抛出异常后我们可以在生成器函数中捕获异常； 
- 在 catch 语句中不能继续 yield 新的值了，但是可以在 catch 语句外使用 yield 继续中断函数的执行；

```javascript
function* foo(name1) {
	console.log(name1) // name1
	console.log(name1) // name1
  let name2
  try {
    name2 = yield "aaaa"
  } catch (err) {
    console.log('err', err) // name3 error
  }
  console.log(name2) // undefined
  console.log(name2) // undefined
  const name3 = yield "bbbb"
	console.log(name3) // name3
	console.log(name3) // name3
	yield "cccc"
}
const generator = foo('name1')
generator.next() // {value: ‘aaaa’, done: false}
generator.throw(new Error('name2 error')) // {value: 'bbb', done: false}
generator.next('name3') // {value: 'ccc', done: false}
```

-----

使用生成器，替代迭代器，工厂函数生成生成器代码重构。

```javascript
const names = ["abc", "cba", "nba"]
function* createArrayIterator(arr) {
  for(let i = 0; i < arr.length; i++) {
    yield arr[i]
  }
}
const namesIterator = createArrayIterator(names)
namesIterator.next()
namesIterator.next()
// ...
```

-----

`yield*` 语法有什么用？

- 一种  yield 的语法糖，会依次迭代后面可迭代对象，每次迭代其中的一个值。

对以上代码做重构。

```javascript
const names = ["abc", "cba", "nba"]
function* createArrayIterator(arr) {
  yield* arr
}
const namesIterator = createArrayIterator(names)
namesIterator.next()
namesIterator.next()
// 。。。
```
-----

使用 `yield*` 语法，重构生成可迭代对象的类。

```javascript
class Classroom {
	constructor(name, address, students) {
		this.name = name
		this.address = address
		this.students = students
	}
	*[Symbol.iterator]() {
		yield* this.students
	}
}
```