# 数组-高阶函数-Date-DOM

## 一、数组

### 1.length 属性

修改数组时，`length` 属性会自动更新，同时它是可写的。

```javascript
var arr = ['abc', 'cba', 'nba']
arr.push('mba') // arr.length 更新为 4
arr.length = 10 // arr.length 扩充到 10
arr.length = 2 // arr length 缩小到 2，数组截取了前两个元素。
```

清空数组最简单的方法：`arr.length = 0`

### 2.三种遍历方式

数组的 3 种遍历方式。

```javascript
// 1. 普通的for循环
for (var i = 0; i < arr.length; i++) {
  console.log(arr[i])
}
// 2. for..in
for (var i in arr) {
  console.log(i, arr[i])
}
// 3. for..of
for (var item of arr) {
  console.log(item)
}
```

### 3.三个纯函数方法

数组的 3 个操作方法。

`arr.slice([begin[, end]])`：创建一个新数组，用于对数组进行截取，包含 bigin 元素，但是不包含 end 元素；

`arr.concat(value1[, value2[, ...[, valueN]]])`：创建一个新数组，其中包含来自于其他数组和其他项的值。

`arr.join([separator])`： 将一个数组的所有元素连接成一个字符串并返回这个字符串。

`concat` 方法和 `push` 方法有何区别？

- `push` 方法会修改原数组；
- `push` 方法会将参数中的数组，作为一个元素，加入到调用的数组对象末尾。

```javascript
var arr = ['abc']
var newArr = arr.concat(['123', '321']) // newArr: ['abc', ‘123’，’321‘]
arr.push(['456', '654']) // arr: ['abc', ['456', '654']]
```

### 4.手写 forEach 方法

```javascript
Array.prototype.ztForEach = function (fn, thisArgs) {
  for (var i = 0; i < this.length; i++) {
    fn(this[i], i, this)
  }
}
```

### 5.手写 find 方法

```javascript
Array.prototype.ztFind = function (fn) {
  for (var i = 0; i < this.length; i++) {
    var isFlag = fn(this[i], i, this)
    if (isFlag) return this[i]
  }
}
```

### 6.三个查找元素的方法

数组的 3 个查找元素的方法

`arr.indexOf(searchElement[, fromIndex])` 查找某个元素的索引（**多用于查找原始类型，查找引用类型有局限性**）。

- 从 `fromIndex` 开始查找，如果找到返回对应的索引，没有找到返回-1；
- 也有对应的从最后位置开始查找的 `lastIndexOf` 方法。

`arr.includes(valueToFind[, fromIndex])` 判断数组是否包含某个元素（**多用于查找原始类型，查找引用类型有局限性**）。

- 从索引 `fromIndex` 开始搜索 item，如果找到则返回 true（如果没找到，则返回 false）。

`arr.find(callback(currentValue [, index [, array]])[, thisArg])` 查找元素（ES6 之后新增的语法）

`arr.findIndex(callback(currentValue [, index [, array]])[, thisArg])` 查找元素的索引（ES6 之后新增的语法）

### 7.两个排序方法

数组的 2 个排序函数。

`arr.sort([compareFunction])` 高阶函数，用于对数组进行排序，并且生成一个排序后的新数组：

- 如果 `compareFunction(a, b) < 0` ，a 排 b 前；
- 如果 `compareFunction(a, b) = 0` ，a 和 b 的相对位置不变；
- 如果 `compareFunction(a, b) > 0` ，b 排 a 前；
- 也就是说，`compareFunction(a, b)` 函数中。运算 `a - b` ，那么小在前（升序）排列。运算 `b - a` ，那么大在前（降序）排列

```javascript
var students = [
  { id: 100, name: 'zzt', age: 18 },
  { id: 101, name: 'kobe', age: 30 },
  { id: 102, name: 'james', age: 25 },
  { id: 103, name: 'curry', age: 22 }
]
// 按照年龄，升序排列。
students.sort((item1, item2) => item1.age - item2.age)
```

`arr.reverse()` 将数组中元素的位置颠倒，并返回该数组。

> 了解常用的排序算法。
>
> - 冒泡排序、插入排序、选择排序、堆排序、希尔排序、快速排序等。

### 8.四个高阶函数

数组的其他高阶方法 4 个。

`arr.forEach(callback(currentValue [, index [, array]])[, thisArg])` 遍历数组，并且让数组中每一个元素都执行一次对应的方法；

`arr.map(callback(currentValue[, index[, array]])[, thisArg])` 创建一个新数组，由原数组中的每个元素都调用一次提供的函数后的返回值组成；

`arr.filter(callback(element[, index[, array]])[, thisArg])`创建一个新数组，只包含每个元素调用函数返回为 true 的元素；

`arr.reduce(callback(accumulation, currentValue[, currentIndex[, array]])[, initialValue])` 每一次运行 reducer 会将先前元素的计算结果作为参数传入，最后将其结果汇总为单个返回值；

reduce 案例练习。

```javascript
var products = [
  { name: '鼠标', price: 88, count: 3 },
  { name: '键盘', price: 200, count: 2 },
  { name: '耳机', price: 9.9, count: 10 }
]
var totalPrice = products.reduce((accumulation, item) => accumulation + item.price * item.count, 0)
```

综合案例练习。

```javascript
// 过滤所有的偶数, 映射所有偶数的平方, 并且计算他们的和
var total = nums
  .filter(item => item % 2 === 0)
  .map(item => item ** 2)
  .reduce((accumulate, item) => accumulate + item, 0)
```

## 二、Date

### 1.GMT

GMT（Greenwich Mean Time），英国伦敦的皇家格林威治（ Greenwich ）天文台的标准时间。

GMT 东时区和西时区的表示方式：往东的时区（GMT+hh:mm），往西的时区（GMT-hh:mm）；

适用场景：GMT 主要用于表示的是某个时区中的时间。

了解时区对比图。

![时区对比图](NodeAssets/时区对比图.jpg)

### 2.UTC

地球公转有一定的误差，也会造成 GMT 的时间有一定的误差

于是，就提出了根据“原子钟”计算的标准时间 UTC（Coordinated Universal Time）

适用场景：UTC 用于表示标准的时间。

### 3.两种日期表示标准

日期的表示标准，有 2 种:

**RFC2822**，Date 对象，打印默认输出该格式，如 `Sat Jun 04 2022 21:12:33 GMT+0800`；

**ISO8601**，Date 对象使用 `toISOString()`，转为 ISO 格式如 `2022-06-04T13:12:03.999Z`；格式常表示为：`YYYY-MM-DDTHH:mm:ss.sssZ`

- `YYYY`：年份，0000 ~ 9999
- `MM`：月份，01 ~ 12
- `DD`：日，01 ~ 31
- `T`：分隔日期和时间，没有特殊含义，可以省略
- `HH`：小时，00 ~ 24
- `mm`：分钟，00 ~ 59
- `ss`：秒，00 ~ 59
- `.sss`：毫秒
- `Z`：时区

### 4.四种方式创建 Date 对象

```javascript
new Date();

new Date(timestamp); // timestamp - 时间戳(ms)

new Date(dateString); // dateString - 符合 RFC2822 或 ISO8601 标准的字符串，如 '2036-10-19'

new Date(year, monthIndex [, day [, hours [, minutes [, seconds [, milliseconds]]]]]);
```

### 5.八个方法获取 Date 对象时间信息

`getFullYear()`：获取年份（4 位数）；

`getMonth()`：获取**月份索引**，**从 0 到 11**；

`getDate()`：获取当月的具体日期，从 1 到 31（方法名字有点迷）；

`getHours()`：获取小时；

`getMinutes()`：获取分钟；

`getSeconds()`：获取秒钟；

`getMilliseconds()`：获取毫秒；

`getDay()`：获取一周中的第几天，从 0（星期日）到 6（星期六）；

### 6.八个方法设置 Date 对象时间信息

`setFullYear(year, [month], [date])`

`setMonth(month, [date])`

`setDate(date)`

`setHours(hour, [min], [sec], [ms])`

`setMinutes(min, [sec], [ms])`

`setSeconds(sec, [ms])`

`setMilliseconds(ms)`

`setTime(milliseconds)：传入时间戳`

> 理解设置时间的自动校准：`date.setDate(32)`，会校准为下个月 1 号。
>

### 7.时间戳

时间戳是一个整数值，表示自 1970 年 1 月 1 日 00:00:00 UTC 以来的毫秒数。

#### 1.data 对象转时间戳

利用 Date 对象，获取**当前时间**的时间戳的方式 3 种。

```javascript
new Date().getTime()

new Date().valueOf() + new Date() // 将 Date 对象拼接 + 号组成表达式。返回时间戳

Date.now()
```

用时间戳来测试代码性能

```javascript
function testPerformance(fn) {
  var startTime = Date.now()
  fn()
  var endTime = Date.now()
  console.log('耗时', endTime - startTime, 'ms')
}
```

#### 2.字符串转时间戳

`Date.parse()` 用于从一个字符串中，读取日期，并且输出对应的 Unix 时间戳。

作用等同于 `new Date(dateString).getTime()` 操作；

传入的字符串，需要符合 **RFC2822** 或 **ISO8601** 日期格式，比如 `YYYY-MM-DDTHH:mm:ss.sssZ`。其他格式也许也支持，但结果不能保证一定正常；

如果输入的格式不能被解析，那么会返回 `NaN`；

## 三、DOM

### 1.window 对象

window 对象包含了这些内容

![window对象包含的内容](NodeAssets/window对象包含的内容.jpg)

### 2.DOM 是什么？

DOM 将 HTML 中的每个元素（Element），抽象成了一个对象；

DOM 是 JavaScript 与 HTML 页面中元素的桥梁。

### 3.BOM 是什么？

BOM 是由浏览器提供的用于处理文档（document）之外的所有其他内容的对象，

比如：`navigator`、`location`、`history` 等对象

### 3.DOM 的使用

使用 `document` 对象获取 `<html>` 元素，`<body>` 元素，`<head>` 元素。

```javascript
document.documentElement // html 元素
document.body
document.head
```

### 4.DOM Tree 是什么？

在 HTML 结构，抽象成 DOM 对象的时候，会形成一个树结构，称之为 DOM Tree；

### 5.DOM 知识点梳理

DOM 知识点学习顺序。

1. DOM 元素之间的关系；
2. 获取 DOM 元素；
3. DOM 节点的 `type`、`tag`、`content`；
4. DOM 节点的 `attributes`、`properies`；
5. DOM 节点的创建、插入、克隆、删除
6. DOM 节点的样式、类
7. DOM 元素 / window 的大小、滚动、坐标

### 6.DOM 的继承关系图

![DOM的继承关系图](NodeAssets/DOM的继承关系图.jpg)
