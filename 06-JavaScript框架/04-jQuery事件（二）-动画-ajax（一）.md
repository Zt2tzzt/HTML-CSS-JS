什么是事件冒泡？

- 默认情况下事件从最内层向外依次传递，称之为事件冒泡（Event Bubble）;

什么是事件捕获？

- 事件从外层到内层（如：body -> span），称之为事件捕获（Event Capture）

为什么产生两种不同的处理流？

- 这是因为早期在浏览器开发时，不管是 IE 还是 Netscape 公司都发现了这个问题;
- 他们采用了相反的事件流来对事件进行了传递；
- IE<9 仅采用了事件冒泡的方式，Netscape 采用了事件捕获的方式；
- IE9+ 和现在所有主流浏览器都已支持这两种方式。

-----

jQuery 为了更好的兼容老版本的IE，底层并**没有实现事件捕获**。

-----

jQuery 事件对象的特点，

- 原生事件对象的大多数属性都被复制到新的 jQuery 事件对象上。如，
> altKey, clientX, clientY, currentTarget, data, detail, key, keyCode, offsetX, offsetY, originalTarget, pageX, pageY, relatedTarget, screenX, screenY, target, ......
- jQuery 事件对象通用的属性（以下属性已实现跨浏览器的兼容）：
> target、relatedTarget、pageX、pageY、which、metaKey

jQuery 事件对象，有哪些常用属性和方法？

- 属性：`originalEvent`：获取原生对象。
- 方法：`preventDefault()`：取消事件的默认行为（例如，a标签、表单事件等）
- 方法：`stopPropagation()` : 阻止事件的进一步传递（例如，事件冒泡）。

```html
<div class="box">
	div
	<span class="content">span</span>
</div>
<script src="../libs/jquery-3.6.0.js"></script>
<script>
	// jQuery 对象的事件冒泡
	$('.content').on('click', function() {
		console.log('span') // 第一个打印
	})
	$('.box').on('click', function() {
		console.log('div') // 第二个打印
	})
	$('body').on('click', function() {
		console.log('body') // 第三个打印
	})
	// 通过 jQuery 事件对象，获取原生对象
	$('.box').click(function($event) {
		$event.originalEvent
	})
	// jQuery 事件对象中方法的使用
	$('a').click(function($event) {
		$event.preventDefault()  // 阻止a元素的默认行为
	})
	$('.content').click(function($event) {
		$event.stopPropagation() // 阻止事件的冒泡
	})
</script>
```

-----

什么是事件委托？

- 事件冒泡在某种情况下可以帮助我们实现强大的事件处理模式 – 事件委托模式（也是一种设计模式）

使用 jQuery 实现事件委托（结合 on 函数的第二个参数 selector）。

```html
<ul id="list" class="panel">
	<li class="li-1">li-1
		<p class="p1">我是p元素</p>
	</li>
</ul>
<script src="../libs/jquery-3.6.0.js"></script>
<script>
$(function() {
	// 仅仅监听li中p元素的点击事件 )
	$('ul').on('click', 'li p' , function(event) {
		console.log(event.target)  // p
	})
})
</script>
```

-----

jQuery 中的常见事件，用法参考 DOM Element 原生事件。

- 鼠标事件（Mouse Events）
	- `.click() 、.dblclick()、.hover()、.mousedown() 、.mouseup() `
	- `.mouseenter()、.mouseleave()`（不支持冒泡）`.mousemove() `
	- `.mouseover()、.mouseout()`（支持冒泡）` .contextmenu()、.toggle()`
- 键盘事件（Keyboard Events）
	- `.keydown() 、.keypress()、.keyup()`
- 文档事件（Document Loading Events）
	- `load()、ready()、.unload()`
- 表单事件（Form Events）
	- `.blur() 、.focus()、.change()、.submit()、.select()`
- 浏览器事件（Browser Events）
	- `.resize()、.scroll()`

案例理解

```javascript
// 1.hover 底层使用的是: mouseenter or mouseleaver
$('ul').hover(function() {
	console.log('鼠标悬浮在ul')
}, function() {
	console.log('鼠标离开ul')
})
// 2.监听浏览器resize事件 ( throttle 节流 )
$(window).resize(function() {
	console.log('resize')
})
// 3.表单事件
$('input').focus(function() {
	console.log('input focus事件')
})
$('input').blur(function() {
	console.log('input blur事件')
})
$('input').on('input', function() {
	console.log( $(this).val() )
})
```

-----

使用 jQuery 实现选项卡切换案例理解。

```html
<div class="nav">
	<div class="nav-bar" >
		<div class="item active">首页</div>
		<div class="item">9块9包邮</div>
		<div class="item">超值大额券</div>
		<div class="item">降温急救穿搭</div>
	</div>
</div>
<script src="../libs/jquery-3.6.0.js"></script>
<script>
$(function() {
	$('.item').on('click', function() {
		$(this).addClass('active').siblings().removeClass('active')
	})
})
</script>
```

-----

jQuery 的动画操作 animate 实现，传4个参数的写法，传2个参数的写法。

- `.animate()`：执行一组 CSS属性的自定义动画，允许支持数字的CSS属性上创建动画
- `.animate( properties [, duration ] [, easing ] [, complete ] )`
  - duration 也支持关键字，`slow`：600ms；`fast`：200ms
  - easing 只支持两个关键字，`linear`：匀速；`swing`：先慢后快再慢。
- `.animate( properties, options )`
- propertys 参数的支持：
> 数值：number 、string
关键字：'show'、'hide'和'toggle'
相对值：+= 、 -=
支持 em 、% 单位（可能会进行单位转换，保证参考元素有具体数值）。

```javascript
// 4个参数
$('.hide').click(function() {
	// 需要一个隐藏的动画
	$('.box').animate({
		height: 0, // 原高度 -> 0px
		// height: '0',  // string
		// height: '100%',  // 百分比相对于父元素  50%（自动计算出执行动画之前，子元素相对于父元素的百分比） -> 100% ; 比如，子元素执行动画前为100px，父元素为200px，执行动画后，子元素从 100px 变为 200px
		// height: 'toggle' // 关键字: show  hide  toggle(切换)
		// height: '-=40px' // 100px -> 60px
		width: 0, // 原宽度 -> 0px
		opacity: 0 // 1 -> 0
	}, 2000, 'swing' , function() {
		console.log('动画执行完毕之后会回调')
	})
})
// 2个参数
$('.show').click(function() { // duration 和 easing 两参数，使用了默认值。
	$('.box').animate({
		height: 100,
		width: 200,
		opacity: 1
	}, function() {
		console.log('动画执行完毕之后会回调')
	})
})
('.show').animate({ // 第二种写法，第二个参数传对象
  height: 100,
  width: 200,
  opacity: 1
}, {
  duration: 'slow',
  complete: function() {
    console.log('动画执行完毕之后会回调')
  }
})
// 传3个参数的写法，easing 可省略，默认为 linear。
$('.show').click(function() {
  $('.box').animate({
    opacity: 1,
    height: 100,
    width: 200
  }, 'fast', function() {
    console.log('动画执行完成')
  })
})
$('.toggle').click(function() {
  $('.box').animate({
    opacity: 'toggle',
    height: 'toggle',
    width: 'toggle'
  }, 400, function() {
    console.log('动画执行完成')
  })
})
```

-----

jQuery 封装好的常见动画函数，用法。

- .显示和隐藏匹配的元素 
	- `.hide() 、.hide( [duration ] [, complete ] )、.hide( options )` - 隐藏元素 
	- `.show() 、.show( [duration ] [, complete ] )、.show( options )` - 显示元素 
	- `.toggle() 、.toggle( [duration ] [, complete ] )、.toggle( options )` -显示或者隐藏元素
	
	```javascript
	$('.hide').click(function() {
	  $('.box').hide('slow', function() {
	    console.log('动画执行完成')
	  })
	})
	$('.show').click(function() {
	  $('.box').show('fast', function() {
	    console.log('动画执行完成')
	  })
	})
	$('.toggle').click(function() {
	  // $('.box').toggle(2000)
	  $('.box').toggle({
	    duration: 3000,
	    complete: function() {
	      console.log('动画执行完成')
	    }
	  })
	})
	```
	
- 淡入淡出 
	- `.fadeIn()、.fadeIn( [duration ] [, complete ] )、.fadeIn( options )` - 淡入动画 
	- `.fadeOut()、.fadeOut( [duration ] [, complete ] )、.fadeOut( options )` -淡出动画 
	- `.fadeToggle()、.fadeToggle( [duration ] [, complete ] )、.fadeToggle( options )` - 淡入淡出的切换
	- `.fadeTo( duration, opacity [, complete ] )` - 渐变到

-----

什么是 jQuery 元素中的动画队列？

-  jQuery 匹配元素中的 animate 和 delay 动画是通过一个动画队列 (queue) 来维护的。

```javascript
$('.start').click(function() {
	// 以下两个动画队列，是同步执行的。
	$box.animate({
		top: 100
	}, 5000)
	$box.animate({
		left: 100
	}, 5000)
})
```

如何查看。如何停止。

- `.queue()`：查看当前选中元素中的动画队列。 

```javascript
$('.queue').click(function() {
	console.log( $box.queue() )  // 查看动画队列
})
```
- `.stop( [clearQueue ] [, jumpToEnd ] )`：停止匹配元素上当前正在运行的动画。 
	- `clearQueue `：一个布尔值，指示是否也删除排队中的动画。默认为 false
	- `jumpToEnd `：一个布尔值，指示是否立即完成当前动画。默认为 false

```javascript
$('.stop').click(function() {
	// stop(false, false) // 默认值
	$box.stop()  // 停止当前动画队列( 停止当前执行的动画,还会继续执行动画队列中其它的动画 )
	$box.stop(true) // 停止所有的动画, 清空了动画队列
	$box.stop(true, true) // 清空了动画队列, 立即执行完当前的动画
})
```

-----

jQuery 实现隐藏侧边广告栏动画

```html
<div class="box">
  <span class="close"></span>
  <div class="top">
    <img src="./images/top.png" alt="">
  </div>
  <div class="bottom">
    <img src="./images/bottom.png" alt="">
  </div>
</div>
<script src="../libs/jquery-3.6.0.js"></script>
<script>
  // 1.监听文档完全解析完成
  $(function() {
    $('.close').click(function() {
      // bottom 和 box 不是同一个元素，所以不能使用动画队列。
      $('.bottom').animate({height: 0}, 600, function() {
        $('.box').animate({width: 0}, 600, function() {
          $('.box').css('display', 'none')
        })
      })
    })
  })
</script>
```

-----

jQuery 的遍历方式2种：
- `.each( function )`：遍历一个 jQuery 对象，为每个匹配的元素执行一个回调函数。 
	
	- function 参数: Function( index, element )，
	- 函数中返回 false 会终止循环。
	
	```javascript
	// 1.遍历jQuery对象 ( 该对象已经实现了迭代器协议，可用 for...of )，对象中的 each 底层调用的 jQuery 函数上的 each 方法
	$('ul li').each(function(index, element) {
	  console.log(index, element)
	})
	```
	
- `jQuery.each( array | object , callback )` : jQuery 函数的静态方法，一个通用的迭代器函数，可以用来无缝地迭代对象和数组。 
	
	- array 参数：支持数组（array）或者类数组（array-like）,底层使用for循环。 
	- object 参数: 支持普通的对象 object 和 JSON对象等，底层用 for in 循环。 
	- function 参数: Function( index, element )，函数中返回 false 会终止循环。
	
	```javascript
	jQuery.each( $('ul li') , function(index, element) {
	  console.log(index, element)
	  return false // 意为遍历到第一个元素就结束遍历
	})
	```

它们有什么区别。

- `.each()` 是 jQuery 对象上的方法，用于遍历 jQuery 对象。
- `jQuery.each()` 是 jQuery 函数上的方法，可以遍历对象、数组、类数组等，它是一个通用的工具函数。

-----

什么是AJAX？

- 发起异步请求获取数据来更新页面的技术。

AJAX 请求方法（Method）：

- GET、POST：普通软件架构模式。
- GET、POST、PUT、PACTH、DELETE 等：RESTful 软件架构模式。

-----

jQuery 对原生 AJAX 技术提供的 api （XMLHttpRequest）进行了封装，有哪些方法？请求参数的含义。

- `$.ajax( [settings ] ) ` - 默认用 GET 请求从服务器加载数据，会返回 jQXHR 对象，可以利用该对象的 `abort` 方法来取消请求。 
- `$.get( url [, data ] [, success ] [, dataType ] ) ` - 发起 GET 请求，底层调用的还是 $ajax()
- `$.post( url [, data ] [, success ] [, dataType ] ) ` - 发起 POST 请求，底层调用的还是 $ajax()
