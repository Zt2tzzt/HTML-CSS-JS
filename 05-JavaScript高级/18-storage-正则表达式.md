# Storage

什么是 WebStorage？它有什么用？

- 浏览器的一种缓存机制，提供一种比 cookie 更直观的 key、value 存储方式：

分为哪 2 种，有什么用？

- `localStorage`：本地存储，提供的是一种永久性的存储方法，在关闭掉网页重新打开时，存储的内容依然保留；
- `sessionStorage`：会话存储，提供的是本次会话的存储，在关闭掉会话时，存储的内容会被清除；

---

使用 storage 保存 token 的模拟，代码理解。

```javascript
localStorage.setItem('token', token)
```

---

localStorage 和 sessionStorage 的区别。

- 关闭网页后重新打开，localStorage 会保留，而 sessionStorage 会被删除；
- 在页面内实现跳转，localStorage 会保留，sessionStorage 也会保留；
- 在页面外实现跳转（打开新的网页），localStorage 会保留，sessionStorage 不会被保留；

---

storage 常见的属性和方法。

属性：

- `Storage.length`：只读属性，返回一个整数，表示存储在 Storage 对象中的数据项数量；

方法：

- `Storage.key(n)`：该方法接受一个数值 n 作为参数，返回存储中的第 n 个 key 名称；
- `Storage.getItem(key)`：该方法接受一个 key 作为参数，并且返回 key 对应的 value；
- `Storage.setItem(key, value)`：该方法接受一个 key 和 value，并且会把 key 和 value 添加到存储中。如果 key 已存储，则更新其对应的值；
- `Storage.removeItem(key)`：该方法接受一个 key 作为参数，并把该 key 从存储中删除；
- `Storage.clear()`：该方法的作用是清空存储中的所有 key；

---

storage 中只能存放字符串。

---

使用 storage 封装一个缓存类。

```javascript
class Cache {
	constructor(isLocal = true) {
		this.storage = isLocal ? localStorage : sessionStorage
	}
	get length() {
		return this.storage.length
	}
	setCache(key, value) {
		if (value !== undefined && value !== null) {
			this.storage.setItem(key, JSON.stringify(value))
		} else {
			throw new Error('value error: value必须有值!')
		}
	}
	getCache(key) {
		const result = this.storage.getItem(key)
		if (result !== undefined && result !== null) {
			return JSON.parse(result)
		}
	}
	removeCache(key) {
		this.storage.removeItem(key)
	}
	clear() {
		this.storage.clear()
	}
}
const localCache = new Cache()
```

---

# 正则表达式

什么是正则表达式？有什么用？

- 正则表达式（英语：Regular Expression，常简写为 regex、regexp 或 RE），又称正则表示式、正则表示法、规则表达式、常规表示法，是计算机科学的一个概念；
- 正则表达式使用单个字符串来描述、匹配一系列某个句法规则的字符串。
- 许多程序设计语言都支持利用正则表达式进行字符串操作。

总结：

- 正则表达式是一种字符串匹配利器，可以帮助我们搜索、获取、替代字符串；

---

JavaScript 创建正则表达式的 2 种方式。构造函数和字面量。

```javascript
/**
 * 第一个参数，匹配的模式 patterns
 * 第二个参数，修饰符 flags
 */
const re1 = new RegExp('abc', 'ig') // 构造函数
const re2 = /abc/gi // 字面量创建
```

---

正则表达式由 2 部分组成：模式（patterns）和修饰符（flags）

---

正则表达式常见的修饰符有哪些。

| flag | 含义       |
| ---- | ---------- |
| g    | 匹配全部的 |
| i    | 忽略大小写 |
| m    | 多行匹配   |

```javascript
const message = 'fdabc123 faBC323 dfABC222 A2324aaBc'
// 需求: 将所有的abc(忽略大小写)换成cba
// const newMessage = message.replaceAll("abc", "cba") // 这样写，只能匹配小写”abc“
const newMessage = message.replace(/abc/gi, 'cba')
console.log(newMessage) // fdcba123 fcba323 dfcba222 A2324acba
// 需求: 将字符串中数字全部删除
const newMessage2 = message.replaceAll(/\d+/g, '')
console.log(newMessage2) // fdabc faBC dfABC AaaBc
```

---

# 正则相关方法

正则表达式经常用于哪些方法？怎么用，案例理解。

- JavaScript 中的正则表达式被用于 RegExp 的 exec 和 test 方法；

  - `RegExp.prototype.exec()` - 一个在字符串中执行查找匹配的 RegExp 方法，它返回一个数组（未匹配到则返回 null）

    ```javascript
    const regexp = /abc/gi
    const message = 'fdabc123 faBC323 dfABC222 A2324aaBc'
    regexp.exec(message) // ['abc', index: 2, input: 'fdabc123 faBC323 dfABC222 A2324aaBc', groups: undefined]
    ```

  - `RegExp.prototype.test()`（常用）- 一个在字符串中测试是否匹配的 RegExp 方法，它返回 true 或 false。

    ```javascript
    // 类似于 webpack -> loader -> test: 匹配文件名
    regexp.test(message) // true
    ```

- 也包括 String 的 match、matchAll、replace、search 和 split 方法；

  - `String.prototype.match()`（常用） - 一个在字符串中执行查找匹配的 String 方法，它返回一个数组，在未匹配到时会返回 null。

    ```javascript
    const regexp1 = /abc/gi
    const message = 'fdabc123 faBC323 dfABC222 A2324aaBc'
  message.match(regexp) //  ['abc', 'aBC', 'ABC', 'aBc']
    const regexp2 = /abc/i
  message.match(regexp) //  [abc', index: 2, input: 'fdabc123 faBC323 dfABC222 A2324aaBc', groups: undefined]
    ```
  
  - `String.prototype.matchAll()` - 一个在字符串中执行查找所有匹配的 String 方法，它返回一个迭代器（iterator）。传入的正则必须有修饰符 `g`
  
    ```javascript
    const result3 = message.matchAll(re1)
  result3.next()
    result3.next()
  // ...
    ```

  - `String.prototype.search()` - 一个在字符串中测试匹配的 String 方法，它返回匹配到的位置索引，或者在失败时返回 -1。
  
  - `String.prototype.replace()` - 一个在字符串中执行查找匹配的 String 方法，并且使用替换字符串替换掉匹配到的子字符串。
  
  - `String.prototype.split()` - 一个使用正则表达式或者一个固定字符串分隔一个字符串，并将分隔后的子字符串存储到数组中的 String 方法。

---

# 字符类（Character classes）

什么是字符类（Character classes）

- 一个特殊的符号，匹配特定集中的任何符号。

正则表达式规则 - 字符类有哪些？有什么用？

| 字符                   | 含义                                                         |
| ---------------------- | ------------------------------------------------------------ |
| \d（“d” 来自 “digit”） | 数字：从 0 到 9 的字符。相当于 `[0-9]`                       |
| \s（“s” 来自 “space”） | 空格符号：包括空格，制表符 \t，换行符 \n 和其他少数稀有字符，例如 \v，\f 和 \r。 |
| \w（“w” 来自 “word”）  | “单字”字符：拉丁字母或数字或下划线 \_。相当于 `[a-zA-Z0-9_]` |
| .（点）                | 点 . 是一种特殊字符类，它与“除换行符之外的任何字符” 匹配     |

```javascript
const message = "fdaa4 22242asfasdf2242"
const re1 = /\d+/g // \d+ 表示匹配1个或多个
console.log(message.match(re1)) //  ['4', '22242', '2242']
const re2 = /\d+/
console.log(message.match(re2)) // ['4', index: 4, input: 'fdaa4 22242asfasdf2242', groups: undefined]
```

反向类（Inverse classes）

- `\D` 非数字：除 \d 以外的任何字符，例如字母。
- `\S` 非空格符号：除 \s 以外的任何字符，例如字母。
- `\W` 非单字字符：除 \w 以外的任何字符，例如非拉丁字母或空格。

---

# 锚点（Anchors）

正则表达式规则 - 锚点（Anchors）有哪些？有什么用？

- 符号 `^` 和符号 `$` 在正则表达式中具有特殊的意义，它们被称为“锚点”。
- 符号 `^` 匹配文本开头；
- 符号 `$` 匹配文本末尾；

```javascript
const message = "My name is ZZT."
// 字符串方法
message.startsWith("my") // false
message.endsWith("zzt") // false
// 正则: 锚点
(/^my/i).test(message) // true
(/zzt\.$/i).test(message) // true
```

```javascript
const re = /^coder$/
const info = "codaaaer"
re.test(info) // false 正则是严格匹配的，如 /^coder$/ 不能匹配 codaaaer
```

---

# 词边界（Word boundary）

什么是词边界（Word boundary）？

- 词边界 `\b` 是一种检查，就像 ^ 和 $ 一样，它会检查字符串中的位置是否是词边界。
- 词边界测试: `\b` 检查位置的一侧是否匹配 `\w`，如匹配，则不是词边界。
- 在字符串 "Hello, Java!" 中，“Hello”和“Java”前后都有词边界。

有什么用？案例理解。

```javascript
// 匹配下面字符串中的时间：
const infos = "now time is 11:56, 12:00 eat food, number is 123:456"
const timeRe = /\b\d\d:\d\d\b/ig
console.log(infos.match(timeRe)) // ['11:56', '12:00']
```

