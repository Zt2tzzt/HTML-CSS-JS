# XHR 请求

## 如何获取 XHR 的 readyStatus？

- 通过 `xhr.readyState` 获取。

```JavaScript
const xhr = new XMLHttpRequest()
// 监听四种状态
xhr.onreadystatechange = function() {
	// 1.如果状态不是 DONE 状态, 直接返回
	if (xhr.readyState !== XMLHttpRequest.DONE) return
	console.log(xhr.response)
}
xhr.open("get", "http://123.207.32.32:8000/home/multidata")
xhr.send()
```

有哪些值？分别代表什么含义。

| 值  | 状态             | 描述                                              |
| --- | ---------------- | ------------------------------------------------- |
| 0   | UNSENT           | 代理被创建，但尚未调用                            |
| 1   | OPENED           | open() 方法。 open() 方法已经被调用。             |
| 2   | HEADERS_RECEIVED | send() 方法已经被调用，并且头部和状态已经可获得。 |
| 3   | LOADING          | 下载中；responseText 属性已经包含部分数据。       |
| 4   | DONE             | 下载操作已完成。                                  |

> 这个状态并非是 HTTP 的响应状态，而是记录的 XMLHttpRequest 对象的状态变化。

## 如何使用 XHR 发送同步请求。

```javascript
const xhr = new XMLHttpRequest()
// 传入第3个参数 false，发送同步请求
xhr.open('get', 'http://123.207.32.32:8000/home/multidata', false)
xhr.send()
// 同步必须等到有结果后, 才会继续执行
console.log(xhr.response)
```

> 在开发中如何选择：一定选择异步。

## XHR 的其它事件监听

除了 `onreadystatechange` 之外，XHR 的其它事件监听有哪些？

- `loadstart`：请求开始。
- `progress`：一个响应数据包到达，此时整个 response body 都在 response 中。
- `abort`：调用 xhr.abort() 取消了请求。
- `error`：发生连接错误，例如，域错误。不会发生诸如 404 这类的 HTTP 错误。
- `load`：请求成功完成。
- `timeout`：由于请求超时而取消了该请求（仅发生在设置了 timeout 的情况下）。
- `loadend`：在 load，error，timeout 或 abort 之后触发。

监听 `load` 事件。

```javascript
const xhr = new XMLHttpRequest()
// onload 监听数据加载完成
xhr.onload = function () {
  console.log('onload')
}
xhr.open('get', 'http://123.207.32.32:8000/home/multidata')
xhr.send()
```

## XHR 响应结果处理

默认情况下，为什么响应头中设置了 `content-type: application/json`，拿到的却是文本类型。

- 发送了请求后，我们需要获取对应的结果：`response` 属性
- XMLHttpRequest `response` 属性返回响应的正文内容；
- 返回的类型取决于`responseType` 的属性设置；

```javascript
const xhr = new XMLHttpRequest()
xhr.onload = function () {
  // 响应头中设置 content-type: application/json，而 resposeType 设置为空字符串，则必须这样写。
  const resJSON = JSON.parse(xhr.response)
  // 如果 resposeType = "json"，则可以直接获取 JSON 对象。
  xhr.response
  // 如果 responseType = 'text' / 空字符串，则可以通过 resposeText 获取文本返回内容。
  xhr.responseText
  // 如果 responseType = 'xml'，则可以通过 resposeXML 获取返回内容。
  xhr.responseXML
}

// 3.告知 xhr 获取到的数据的类型
xhr.responseType = 'json'
// xhr.responseType = 'text'
// xhr.responseType = 'xml'

// 4.配置网络请求
// 4.1.json类型的接口
// xhr.open("get", "http://123.207.32.32:8000/home/multidata")
// 4.2.json类型的接口
xhr.open('get', 'http://123.207.32.32:1888/01_basic/hello_json')
// 4.3.text类型的接口
// xhr.open("get", "http://123.207.32.32:1888/01_basic/hello_text")
// 4.4.xml类型的接口
// xhr.open("get", "http://123.207.32.32:1888/01_basic/hello_xml")
xhr.send()
```

### xhr 对象的 resposeType 属性有什么用？

- 通过 `responseType` 可以设置获取数据的类型，如果设置为空字符串，则会使用 `text` 作为默认值。

### xhr 对象的 resposeText，resposeXML 有什么用？

- 早期通常服务器返回的数据是普通的文本和 XML，所以我们通常会通过 responseText、 responseXML 来获取响应结果，再将它们转化成 JavaScript 对象形式；
- 目前服务器基本返回的都是 json 数据，直接将 resposeType 设置为 json 即可；

### 如何通过 XHR 获取 HTTP 状态码？

- `xhr.status` - 获取状态码。
- `xhr.statusText` - 获取状态描述

### 如何区分 XHR 请求的成功与失败？

- 使用状态码区分。

```javascript
// 1.创建对象
const xhr = new XMLHttpRequest()
// 2.监听结果
xhr.onload = function () {
  console.log(xhr.status, xhr.statusText) // 200 ok
  // 根据 http 的状态码判断是否请求成功
  if (xhr.status >= 200 && xhr.status < 300) {
    console.log(`请求成功`, xhr.response)
  } else {
    console.log(`请求失败`, xhr.status, xhr.statusText)
  }
}
// 3.设置响应类型
xhr.responseType = 'json'
// 4.配置网络请求
// xhr.open("get", "http://123.207.32.32:8000/abc/cba/aaa")
xhr.open('get', 'http://123.207.32.32:8000/home/multidata')
// 5.发送网络请求
xhr.send()
```

### 常用的 GET / POST 请求传递参数的 4 种方式。

1. GET 请求的 query 参数
2. POST 请求 x-www-form-urlencoded 格式
3. POST 请求 FormData 格式，默认情况下，Request header 中的 content-type 是 formData 格式，所以不用额外设置 content-type。
4. POST 请求 JSON 格式

```html
<form class="info">
  <input type="text" name="username" />
  <input type="password" name="password" />
</form>
<button class="send">发送请求</button>

<script>
  const formEl = document.querySelector('.info')
  const sendBtn = document.querySelector('.send')
  sendBtn.onclick = function () {
    // 创建 xhr 对象
    const xhr = new XMLHttpRequest()
    // 监听数据响应
    xhr.onload = function () {
      console.log(xhr.response)
    }
    // 配置请求
    xhr.responseType = 'json'

    //---------------------------伪代码------------------------
    // 1.传递参数方式一: get -> query
    xhr.open('get', 'http://123.207.32.32:1888/02_param/get?name=zzt&age=18&address=广州市')
    xhr.send()

    // 2.传递参数方式二: post -> urlencoded
    xhr.open('post', 'http://123.207.32.32:1888/02_param/posturl')
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    xhr.send('name=zzt&age=18&address=广州市')

    // 3.传递参数方式三: post -> formdata
    xhr.open('post', 'http://123.207.32.32:1888/02_param/postform')
    const formData = new FormData(formEl) // formElement 对象转成 FormData 对象
    xhr.send(formData)

    // 4.传递参数方式四: post -> json
    xhr.open('post', 'http://123.207.32.32:1888/02_param/postjson')
    xhr.setRequestHeader('Content-type', 'application/json')
    xhr.send(JSON.stringify({ name: 'zzt', age: 18, height: 1.88 }))
    //---------------------------伪代码------------------------
  }
</script>
```

### XHR 超时设置

- 当达到超时时间后依然没有获取到数据，那么这个请求会自动被取消掉；
- 默认值为 0，表示没有设置超时时间；

### XHR 的取消请求

- `xhr.abort()` - 强制取消请求。

可以通过 abort 方法强制取消请求；

```javascript
const xhr = new XMLHttpRequest()
xhr.onload = function () {
  console.log(xhr.response)
}
xhr.onabort = function () {
  console.log('请求被取消掉了')
}
// 1.超时时间的回调函数设置
xhr.ontimeout = function () {
  console.log('请求过期: timeout')
}
xhr.responseType = 'json'
// timeout: 浏览器达到过期时间还没有获取到对应的结果时, 取消本次请求
xhr.timeout = 3000
xhr.open('get', 'http://123.207.32.32:1888/01_basic/timeout')
xhr.send()
// 2.手动取消结果
const cancelBtn = document.querySelector('button')
cancelBtn.onclick = function () {
  xhr.abort()
}
```

## 封装基本的 ajax 网络请求。

```javascript
function hyajax({
  url,
  method = 'get',
  data = {},
  timeout = 10000,
  headers = {} // token
} = {}) {
  // 1.创建对象
  const xhr = new XMLHttpRequest()
  // 2.创建 Promise
  const promise = new Promise((resolve, reject) => {
    // 2.监听数据
    xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(xhr.response)
      } else {
        reject({ status: xhr.status, message: xhr.statusText })
      }
    }
    // 3.设置类型
    xhr.responseType = 'json'
    xhr.timeout = timeout
    // 4.open，send 方法
    if (method.toUpperCase() === 'GET') {
      const queryStrings = []
      Object.keys(data).forEach(key => {
        queryStrings.push(`${key}=${data[key]}`)
      })
      url = url + '?' + queryStrings.join('&')
      xhr.open(method, url)
      xhr.send()
    } else {
      xhr.open(method, url)
      xhr.setRequestHeader('Content-type', 'application/json')
      xhr.send(JSON.stringify(data))
    }
  })
  // 5.给返回的 promise 对象上加上 xhr 属性，方便取消功能
  promise.xhr = xhr
  return promise
}
```

# Fetch 函数

## Fetch 与 XHR 相比有什么优势？

- Fetch 可以看做是早期的 XMLHttpRequest 的替代方案。
- 返回值是一个 Promise，提供了一种更加优雅的处理结果方式
  - 在请求发送成功时，调用 resolve 回调 then；
  - 在请求发送失败时，调用 reject 回调 catch；
- 不像 XMLHttpRequest，所有的操作都在一个对象上；

## Fetch 如何使用？

- `Promise<Response> fetch(input[, init]);`

- input：定义要获取的资源地址，可以是一个 URL 字符串，也可以使用一个 Request 对象（实验性特性）类型；
- init：其他初始化参数
  - method: 请求使用的方法，如 GET、POST；
  - headers: 请求的头信息；
  - body: 请求的 body 信息；

```javascript
fetch('http://123.207.32.32:8000/home/multidata')
  .then(response => {
    response.json().then(res => {
      console.log('res:', res)
    })
  })
  .catch(err => {
    console.log('err:', err)
  })
```

## Fetch 数据的相应处理，2 个阶段。：

1. 当服务器返回了响应（response）
   - fetch 返回的 promise 就使用内建的 Response class 对象来对响应头进行解析；
   - 在这个阶段，我们可以通过检查响应头，来检查 HTTP 状态以确定请求是否成功；
   - 如果 fetch **无法建立**一个 HTTP 请求，例如网络问题，亦或是请求的网址不存在，那么 promise 就会 reject；
   - 异常的 HTTP 状态，例如 404 或 500，**不会导致出现 error**；
   - 我们可以在 response 的属性中看到 HTTP 状态：
     - `response.status`：HTTP 状态码，例如 200；
     - `response.ok`：布尔值，如果 HTTP 状态码为 200-299，则为 true；
2. 为了获取 response body，我们需要使用一个其他的方法调用。
   - `response.text()`：读取 response，并以文本形式返回 response；
   - `response.json()`：将 response 解析为 JSON；

## Fetch 使用的优化 3 个

优化一：

```javascript
fetch('http://123.207.32.32:8000/home/multidata')
  .then(response => {
    return response.json() // 返回的数据类型是 promise，交给下一次 then 方法处理。
  })
  .then(res => {
    console.log('res:', res)
  })
  .catch(err => {
    console.log('err:', err)
  })
```

优化二：

```java
async function getData() {
  const response = await fetch("http://123.207.32.32:8000/home/multidata")
  const res = await response.json()
  console.log("res:", res)
}
getData()
```

优化三：

```javascript
// post 请求，并且提交 json 类型的参数
async function getData1() {
  const response = await fetch('http://123.207.32.32:1888/02_param/postjson', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: 'zzt',
      age: 18
    })
  })
}
getData1()
// post 请求并且提交 formData 类型的参数。
async function getData2() {
  const formData = new FormData()
  formData.append('name', 'zzt')
  formData.append('age', 18)
  const response = await fetch('http://123.207.32.32:1888/02_param/postform', {
    method: 'post',
    body: formData
  })
  // 获取response状态
  console.log(response.ok, response.status, response.statusText)
  const res = await response.json()
  console.log('res:', res)
}
getData2()
```

## 使用 Fetch 发送 POST 请求。

- method：HTTP 方法，例如 `POST`，
- body：request body：
  - 字符串（例如 JSON 编码的，`JSON.stringfy(xxx)`），
  - FormData 对象，以 `multipart/form-data` 形式发送数据

# 前端文件上传的 2 点注意事项。

- XMLHttpRequest 可以监听文件上传的进度。
- 文件上传如果不使用 base64 格式，都是使用 POST 请求。

## 使用 XHR 进行文件上传。进度监听。

```html
<input class="file" type="file" />
<button class="upload">上传文件</button>

<script>
  // 表单
  const fileEl = document.querySelector('.file')
  const uploadBtn = document.querySelector('.upload')

  const file = fileEl.files[0]
  const formData = new FormData()
  formData.append('avatar', file)

  uploadBtn.onclick = function () {
    // 1.创建对象
    const xhr = new XMLHttpRequest()
    // 2.监听结果
    xhr.onload = function () {
      console.log(xhr.response)
    }
    xhr.onprogress = function (event) {
      // 监听上传进度
      console.log(event)
    }
    xhr.responseType = 'json'
    xhr.open('post', 'http://123.207.32.32:1888/02_param/upload')
    xhr.send(formData)
  }
</script>
```

## 使用 Fetch 进行文件上传。

```html
<input class="file" type="file" />
<button class="upload">上传文件</button>

<script>
  // 表单
  const fileEl = document.querySelector('.file')
  const uploadBtn = document.querySelector('.upload')

  const file = fileEl.files[0]
  const formData = new FormData()
  formData.append('avatar', file)

  uploadBtn.onclick = async function () {
    // 发送 fetch 请求
    const response = await fetch('http://123.207.32.32:1888/02_param/upload', {
      method: 'post',
      body: formData
    })
    const res = await response.json()
    console.log('res:', res)
  }
</script>
```
