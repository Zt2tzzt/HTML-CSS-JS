jQuery 元素对象中对 attributes 和 property 的操作。

- `.attr(attributeName)`

	- 获取匹配元素集合中第一个元素的属性值，底层调用了原生的 `getAttribute()` API
	- 自定义属性也能拿到，如 data-xxx=“xxxx”

	```javascript
	$('ul').attr('id')
	$('ul').attr('data-xxx') // 自定义属性也能拿到
	```

- `.attr(attributeName, value)、.attr(attributesObj)`

	- 为每个匹配元素设置一个或多个属性，底层调用了原生的 `setAttribute()` API

	```javascript
	$('ul').attr('id', 'box')
	$('ul').attr({ // 设置多个属性
	  id: 'container',
	  class: "panel",
	  name: 'coder'
	})
	```

- `.removeAttr(attributeName)`
	- 在匹配到元素的集合中，给每个元素删除一个属性。底层调用了原生的 `removeAttribute()` API

	```javascript
	$('ul').removeAttr('id')
	```

- `.prop(propertyName)`

	- 获取匹配到元素集合中第一个元素的属性值。

	```javascript
	$('ul').prop('id')
	$('ul').prop('nodeName') // UL
	```

- `.prop(propertyName，value)、.prop(propertiesObj)`

	- 为每个匹配元素设置一个或多个属性。

	```javascript
	$('input').prop('disabled', true)
	$('input').prop({
	  disabled: true,
	  placeholder: '请输入用户名',
	  jQuery_zzt_123: '自定义的属性' // 缓存 click  data
	})
	```

- `removeProp(propertyName)`

	- 删除匹配元素集的属性,( 只能删除用户自定义添加的 prop，不能删除元素本身的属性 )。

	```javascript
	$('input').removeProp('jQuery_zzt_123') // 只能删除 自定义的属性
	```
-----

jQuery 元素对象中对自定义 data-xxx 属性的操作。理解该操作中缓存的作用。

- `.data()`、`.data(key)`

	- 获取匹配元素集中第一个元素的自定义属性的值。
	- 为减少 DOM 操作，方便对象的拷贝，会先**设置缓存**，在缓存中查找对应的属性值。如果没有，再去DOM元素上查找，**并设置到缓存中**。缓存存放在元素 DOM Element 对象上的属性中。

	```html
	<ul id="list" data-name="zzt" data-age="18"></ul>
	<script>
	  $('ul').data()  //  {age: 18, name: 'zzt'}
	  $('ul').data('age') // 18
	</script>
	```

- `.data(key, value) 、.data(obj) `

	- 为每个匹配元素设置一个或多个自定义属性。

	```javascript
	// 调用data()函数只能修改 缓存中的数据
	$('ul').data('name', 'coder')
	$('ul').data({
	  name: 'coder',
	  age: '18',
	  height: '1.86'  // 动态添加的 data-xxx 属性
	})
	```

- `.removeData([name]) `
	- 会删除 data() 函数在**缓存中**给匹配元素属性添加的数据和 data() 函数在缓存中绑定的自定义属性。
	- data 函数添加的属性会被移除，但是如果属性同时在元素标签上定义了就不会被移除。

	````javascript
	$('ul').removeData('name')  // 只能删除 缓存中的数据
	$('ul').removeData(['name', 'age', 'height'])  // 只能删除 缓存中的数据
	````

-----

jQuery 元素对象 DOM 操作，插入内容（一）。5种方式。

- `.append(content [, content] ) 、append( function )`
	- 将参数的内容插入到匹配元素集中每个元素的子元素末尾。
- `.prepend(content [, content] ) 、prepend( function )`
	- 将参数的内容插入到匹配元素集中每个元素的子元素开头。
- `.after(content [, content] ) 、after( function )`
	- 在匹配元素集中的每个元素之后，插入由参数指定的内容。
- `.before(content [, content])、before( function )`
	- 在匹配元素集中的每个元素之前，插入由参数指定的内容。

content 的类型: 1.DOM element, 2.text node, 3.array of elements and text nodes, 4.HTML string, 5.jQuery object

```javascript
// 方式一: 在ul的尾部插入文本
$('ul').append('文本')
// 方式二: 插入html字符串
$('ul').append(`
	<li class="li-6">我是li-6</li>
	<li class="li-7">我是li-7</li>
`)
// 方式三: 插入的是jQuery对象
var $li = $('<li>').addClass('li-6').text('我是li-6')
$('ul').append($li)
// 方式四: 插入的是元素对象
var liEl = document.createElement('li')
liEl.className = 'li-6'
liEl.innerText = '我是li-6'
$('ul').append(liEl)
//  方式五: 选中页面上的元素插入到ul中
$('ul').append( $('.li-6') ) // move, 不是 clone
```

-----

jQuery 元素对象 DOM 操作，插入内容（二）。3种方式。

- `.appendTo(target) `
	- 将匹配元素集中的每个元素插入到目标元素的子元素的末尾。
- `.prependTo(target) `
	- 将匹配元素集中的每个元素插入到目标元素的子元素的开头。
- `.insertAfter(target) `
	- 在目标元素之后，插入匹配元素集中的每个元素。
- `.insertBefore(target)`
	- 在目标元素之前，插入匹配元素集中的每个元素。

target 的类型：1.A selector, 2.DOM element, 3.HTML string, 4.array of elements, 5.jQuery object。

```javascript
$('<li>')
	.addClass('li-6')
	.css('color', 'red')
	.text('我是li-6')  // 创建一个li元素(必须是一个jQuery对象)
	// 方式一: 支持 jQuery对象
	.appendTo( $('ul') )
	// 方式二: 支持 字符串类型的选择器
	.appendTo( 'ul' )
	// 方式三: 支持 元素对象
	.appendTo( document.querySelector('ul') )
```

-----

jQuery 元素对象 DOM 操作，移除，替换，克隆元素。

- `.empty()`: 
  - 删除匹配元素集的所有子节点，自身不会删除。
	```javascript
	$('ul').empty()
	```
	
- `.remove() 、.remove( [selector] ) `
	
	- 删除匹配的元素集，自身也会删除。
	- selector参数：字符串类型选择器。筛选匹配元素集的元素来删除
	
	```javascript
	$('ul').remove()
	$('ul li').remove('.li-1, .li-2') // 支持
	$('ul li').remove(['.li-1', '.li-2'])  // 不支持
	```
	
- `.replaceAll(target)`: 
  
  - 用匹配到的元素集替换每个目标元素。
  - target 参数类型: 1.字符串类型的选择器  2. jQuery对象  3. 元素对象
  
  ```javascript
  $('<span>')
    .addClass('content')
    .text('我是span')
    .css('color', 'red') // 创建一个span元素( jQuery对象 )
    .replaceAll( 'ul li' ) // 将li元素集替换为span 
  ```
  
- `.replaceWith(newContent)、.replaceWith( function ) `
	
	- 用新内容替换匹配元素集中的每个元素，并返回被移除的元素集。 
	- newConten 参数的类型：1.HTML string, 2.DOM element, 3.array of DOM elements, 4.jQuery object
	
	```javascript
	// 将 li 替换为 span元素 .replaceWidh( content )
	var $span = $('<span>').text('我是span')
	$('ul li').replaceWith( $span )
	$('ul li').replaceWith('<span>我是span</span>')
	```
	
- `.clone()、.clone( withDataAndEvents )`
	- 对匹配的元素集执行深度复制，底层是调用了 elem.cloneNode( true ) 来复制元素。
	- withDataAndEvents 参数 : 布尔值，是否复制该元素的事件处理程序和数据，默认值为 false。
	
	```javascript
	$('.li-6').clone().appendTo('ul')
	// 将li-6克隆到 ul元素的尾部( 将li-6的事件处理函数和data自定义属性一起拷贝过去 )
	$('.li-6')
	  .data({
	    name: 'zzt',
	    age: '17'
	  })
	  .click(function() {
	    console.log( 'li-6' )
	  })
	  // 开始克隆
	  .clone(true)
	  .appendTo('ul')
	```

-----

什么是事件？

- Web页面经常需要和用户之间进行交互，而交互的过程中我们可能想要捕捉这个交互的过程

原生事件监听方法3种。

1. 在 script 中直接监听（很少使用）。 
	```html
   <button onclick="console.log('按钮1发生了点击~');">按钮1</button>
   ```
2. DOM 属性，通过元素的 on 来监听事件。
3. 通过 EventTarget 中的 addEventListener 来监听。

jQuery 元素对象事件监听方法2种。

1. 直接调用 jQuery 对象中的事件处理函数来监听，例如：click，mouseenter....。 
	```javascript
	$('ul').click(function() {
		console.log('click1')
	})
	$('ul').mouseenter(function() {
		console.log('mouseenter')
	})
	```
2. 调用 jQuery 对象中的 on 函数来监听，使用 off 函数来取消监听。
	```javascript
	$('ul').on('click', function() {
		console.log('click1')
	})
	$('.cancel').click(function() {
		$('ul').off() // 取消 ul 元素上所有的事件
		$('ul').off('click') // 取消 ul 元素上所有的 click 事件。
	})
	```

-----

jQuery 元素对象自动触发事件的方法。

```javascript
$('ul').trigger('click')  // 模拟用户点击了ul元素
$('ul').trigger('mouseenter')
```

-----

click 方法和 on 方法有什么区别？

- click 是 on 的简写。它们重复监听，不会出现覆盖情况，都支持事件委托，底层用的是 addEventListener。 

- 如果 on 没有使用 selector 的话，那么和使用 click 是一样的。 

- on 函数可以接受一个 selector 参数，用于过滤触发事件的后代元素。

  ```javascript
  // 伪代码
  $('ul').on('click', '字符串类型的选择器', function() { })
  ```

- on 函数支持给事件添加命名空间。可以利用名命空间，取消事件监听。
	```javascript
	$('ul').on('click.zzt', function() { // 给事件添加名命空间 zzt
		console.log('click1')
	})
	$('.cancel').click(function() {
		$('ul').off('click.zzt') // 根据命名空间取消 click 对应的事件。
	})
	```

-----

click 方法和 on 方法中 this 的指向。

- 都是指向原生的 DOM Element

```javascript
$('ul li').click(function() {
  console.log(this) // DOM Element -> UL
})
// 底层实现的原理
var liEls = $('ul li').get() // [li, li, li]
for(var liEL of liEls ){
  liEL.addEventListener('click', function() {
    console.log(this)
  })
}
$('ul li').click(() => {
  console.log(this) // window
})
```

