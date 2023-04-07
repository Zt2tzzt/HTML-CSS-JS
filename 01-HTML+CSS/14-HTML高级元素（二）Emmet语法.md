使用 Emmet 写法写一个表格结构。

```html
table > (tr > td * 5) * 3
```

---

使用结构伪类选中表格的前 2 行。

```css
table tr:nth-child(-n + 2) {
  font-weight: 700;
  font-size: 20px;
}
```

---

理解课程表案例的实现过程（结构伪类，跨行/跨列的使用）。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Document</title>
    <style>
      table {
        border-collapse: collapse;
        text-align: center;
      }
      /* n的取值: 0和整数  */
      /* 0, 1, 2, 3, 4, 5, 6......... */
      table tr:nth-child(-n + 2) {
        /* 选中表格前两行 */
        font-weight: 700;
        font-size: 20px;
      }
      /* 属性选择器 */
      table tr td[rowspan] {
        font-weight: 700;
        font-size: 18px;
      }
      td {
        border: 1px solid red;
        width: 100px;
        height: 30px;
      }
    </style>
  </head>
  <body>
    <table>
      <tr>
        <td colspan="6">课程表</td>
      </tr>
      <tr>
        <td></td>
        <td>星期一</td>
        <td>星期二</td>
        <td>星期三</td>
        <td>星期四</td>
        <td>星期五</td>
      </tr>
      <tr>
        <td rowspan="4">上午</td>
        <td>数学</td>
        <td>数学</td>
        <td>数学</td>
        <td>数学</td>
        <td>数学</td>
      </tr>
      <tr>
        <td>数学</td>
        <td>数学</td>
        <td>数学</td>
        <td>数学</td>
        <td>数学</td>
      </tr>
      <tr>
        <td>数学</td>
        <td>数学</td>
        <td>数学</td>
        <td>数学</td>
        <td>数学</td>
      </tr>
      <tr>
        <td>数学</td>
        <td>数学</td>
        <td>数学</td>
        <td>数学</td>
        <td>数学</td>
      </tr>
      <tr>
        <td rowspan="4">下午</td>
        <td>数学</td>
        <td>数学</td>
        <td>数学</td>
        <td>数学</td>
        <td>数学</td>
      </tr>
      <tr>
        <td>数学</td>
        <td>数学</td>
        <td>数学</td>
        <td>数学</td>
        <td>数学</td>
      </tr>
      <tr>
        <td>数学</td>
        <td>数学</td>
        <td>数学</td>
        <td>数学</td>
        <td>数学</td>
      </tr>
      <tr>
        <td>数学</td>
        <td>数学</td>
        <td>数学</td>
        <td>数学</td>
        <td>数学</td>
      </tr>
      <tr>
        <td rowspan="2">晚自习</td>
        <td>数学</td>
        <td>数学</td>
        <td>数学</td>
        <td>数学</td>
        <td>数学</td>
      </tr>
      <tr>
        <td>数学</td>
        <td>数学</td>
        <td>数学</td>
        <td>数学</td>
        <td>数学</td>
      </tr>
    </table>
  </body>
</html>
```

---

用于表单的常见元素。

- form，表单, 一般情况下，其他表单相关元素都是它的后代元素
- input，单行文本输入框、单选框、复选框、按钮等元素
- textarea，多行文本框
- select、option，下拉选择框
- button，按钮
- label，表单元素的标题

---

input 元素`type`属性有哪些值？有什么用？

- text：文本输入框（明文输入）
- password：文本输入框（密文输入）
- radio：单选框
- checkbox：复选框
- button：按钮
- reset：重置
- submit：提交表单数据给服务器
- file：文件上传
- date：日期

Input 元素有哪些属性。

- readonly：只读（布尔属性）
- disabled：禁用（布尔属性）
- autofocus：当页面加载时，自动聚焦（布尔属性）
- checked：默认被选中，只有当 type 为 radio 或 checkbox 时可用（布尔属性）
- name：名字，在提交数据给服务器时，可用于区分数据类型
- value：取值

---

布尔属性在 HTML 元素中的写法。

- 常见的布尔属性有`disabled、checked、readonly、autofocus、multiple、selected`
- 布尔属性可以没有属性值，写上属性名就代表使用这个属性，如果要给布尔属性设值，值就是属性名本身

---

input 元素是否为可替换元素？定义比较模糊，原因。

- imput 元素不好定义，它是否是可替换元素，取决于它的 type，或者不同的浏览器。大多数情况下，可把它看作是一个可替换元素。

---

使用 input 来实现表单按钮 3 个。

- 普通按钮（type="button"）：使用 value 属性设置按钮文字 。
- 重置按钮（type="reset"）：重置它所属 form 的所有表单元素（包括 input、textarea、select） 。
- 提交按钮（type="submit"）：提交它所属 form 的表单数据给服务器（包括 input、textarea、select）。

注意事项。

- 放到 form 元素中，才有效果。

使用 button 实现相同效果。

```html
<form action="/abc">
  <input type="text" />
  <input type="date" />
  <div>
    <input type="button" value="普通按钮" />
    <button>普通按钮</button>
  </div>
  <div>
    <input type="reset" value="重置按钮" />
    <button type="reset">重置按钮</button>
  </div>
  <div>
    <input type="submit" value="提交按钮" />
    <button type="submit">提交按钮</button>
  </div>
</form>
```

---

input 和 lable 之间的关系，它们结合使用。

- label 元素一般跟 input 配合使用，用来表示 input 的标题。
- label 可以跟某个 input 绑定，点击 label 就可以激活对应的 input 变成选中。
- 给 input 添加**id 属性**，给 label 元素添加**for 属性**，将它们关联起来，

```html
<form>
  <div>
    <label for="username">
      用户:
      <input id="username" type="text" />
    </label>
  </div>
  <div>
    <label for="password">
      密码:
      <input id="password" type="password" />
    </label>
  </div>
</form>
```

---

使用 input 来实现表单单选框（radio）。结合 label 使用。

- label 的 for 属性，关联 input 的 id 属性，input 使用 name 做唯一区分。通过 value 定义值。

```html
<form action="/abc">
  <label for="male"> <input id="male" type="radio" name="sex" value="male" />男 </label>
  <label for="female"> <input id="female" type="radio" name="sex" value="female" />女 </label>
  <button type="submit">提交按钮</button>
</form>
```

---

在表单中提交按钮 radio 选中的值。观察 url 变化。`127.0.0.1:5500/abc?sex=male`

---

checkbox 属性的使用，结合 label 元素，name，value 属性提交表单。

- 属于同一种类型的 checkbox，name 值要保持一致

```html
<form action="/cba">
  <div>
    您的爱好:
    <label for="basketball">
      <!-- 布尔类型 checked 表示默认选中。 -->
      <input id="basketball" type="checkbox" name="hobby" value="basketball" checked />篮球
    </label>
    <label for="football">
      <input id="football" type="checkbox" name="hobby" value="football" />足球
    </label>
  </div>
  <input type="submit" />
</form>
<!-- http://127.0.0.1:5500/abc?hobby=basketball&hobby=football -->
```

---

textarea 元素的使用，2 个属性的作用。

- cols：列数 。
- rows：行数。

缩放的 CSS 的设置。

- 禁止缩放：resize: none;
- 水平缩放：resize: horizontal;
- 垂直缩放：resize: vertical;
- 水平垂直缩放：resize: both;

```html
<form action="/abc">
  <label for="info">
    个人描述:
    <textarea id="info" name="info" cols="10" rows="6"></textarea>
  </label>
</form>
```

```css
textarea {
  resize: vertical;
}
```

---

select 和 option 的使用，

select 的 2 个常用属性。

- multiple：可以多选 。
- size：显示多少项。

option 的 1 个常用属性。

- selected：默认被选中。

```html
<label for="fruits">
  <select id="fruits" name="fruits" multiple size="2">
    <option value="apple" selected>苹果</option>
    <option value="banana">香蕉</option>
    <option value="orange">橘子</option>
  </select>
</label>
<!-- http://127.0.0.1:5500/abc?fruits=apple&fruits=banana -->
```

---

form 元素有什么用 3 点？

- form 可以将整个表单作为一个整体来进行操作;
- 比如对整个表单进行重置;
- 比如对整个表单的数据进行提交;

常见的 3 个属性。

- action，用于提交表单数据的请求 URL
- method，请求方法（get 和 post），默认是 get
- target，在什么地方打开 URL（参考 a 元素的 target）

```html
<form action="http://hongyuancoder.com/abc" method="post" target="_blank">...</form>
```

实现百度搜索案例理解。

```html
<form action="http://www.baidu.com/s">
  <input type="text" name="wd" />
  <button type="submit">百度一下</button>
</form>
```

---

后端服务器应该记录密码的密文而不是明文。

---

什么是 Emmet 语法？生成 HTML5 代码结构，使用`!`。

- Emmet (前身为 Zen Coding) 是一个能大幅度提高前端开发效率的一个工具。
- VsCode 内置了 Emmet 语法,在后缀为`.html/.css`中输入缩写后按 Tab/Enter 键即会自动生成相应代码。

---

Emmet 的 6 个语法细节（正式写法中不要有空格）。

1. `>`子代，`+`兄弟

   ```html
   h2 + div > ul > li
   ```

2. `*`多个，`^`上一级（最多到 body 元素）

   ```html
   div + div > p * 2 > span ^ h1
   ```

3. `()`分租

   ```html
   div > ( header > ul > li * 2 > a ) + footer > p
   ```

4. 属性（`#`id 属性、`.`class 属性、`[xxx]`普通属性）， {}（内容）

   ```html
   #header + #main > .container > a[href=https://www.baidu.com]{百度一下} //
   这里使用了隐藏标签的写法
   ```

5. `$`数字，$$$表示从 001 开始的数字。

   ```html
   ul > li.item$ * 5
   ```

6. 隐藏标签

   ```html
   .box =>
   <div class="box"></div>
   ```

---

CSS Emmet 的 5 种写法。

- w100

  ```css
  div {
    width: 100px;
  }
  ```

- w20+h20+m40+p50

  ```css
  div {
    width: 20px;
    height: 20px;
    margin: 40px;
    padding: 50px;
  }
  ```

- m20-30-40-50

  ```css
  div {
    margin: 20px 30px 40px 50px;
  }
  ```

- dib

  ```css
  display: inline-block;
  ```

- bd1#fffs

  ```css
  div {
    border: 1px #fff solid;
  }
  ```
