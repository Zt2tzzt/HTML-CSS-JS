# ECMA文档术语回顾

JavaScript的执行过程中，ECMAScript文档的描述术语。

- 执行上下文栈：Execution Context Stack，用于执行上下文的栈结构；
- 执行上下文：Execution Context，代码
- 执行之前会先创建对应的执行上下文；
- 变量对象：Variable Object，上下文关联的VO对象，用于记录函数和变量声明；
- 全局对象：Global Object，全局执行上下文关联的VO对象；
- 激活对象：Activation Object，函数执行上下文关联的VO对象；
- 作用域链：scope chain，作用域链，用于关联执行上下文的变量查找；

-----

新的ECMAScript描述中（ES5之后），对于代码执行流程描述发生了变化。


- 执行上下文栈和执行上下文是相同的；
- 执行上下文，通常会关联对应的词法环境和变量环境。

-----

# 新ECMA描述内存图

理解新ECMA描述内存图。

![新ECMAScript描述内存图](NodeAssets/新ECMAScript描述内存图.jpg)

-----

# 词法环境

什么是词法环境（Lexical Environments）？

- 是一种规范类型，用于词法嵌套结构中定义关联的变量、函数等标识符；
- 词法环境是由**环境记录**（Environment Record）和一个**外部词法环境**（outer Lexical Environment）组成；
- 词法环境经常用于关联一个函数声明、代码块语句、try-catch语句，当它们的代码被执行时，词法环境被创建出来。

-----

ES5之后，一个执行上下文会关联2个环境。

- **词法环境**（Lexical Environment）用于处理 let、const 声明的标识符，会生成暂时性死区（社区定义的词）：
- **变量环境**（Variable Environment）用于处理 var 和 function 声明的标识符，产生作用域提升。：

-----

# 环境记录

什么是环境记录（Environment Record）？

- 最新规范中有两种主要的环境记录值:**声明式环境记录**（decelerative Environment）和**对象环境记录**（object Environment）。
- 声明式环境记录：用于定义ECMAScript语言语法元素的效果，如函数声明、变量声明和直接将标识符绑定与 ECMAScript 语言值关联起来的 Catch 子句。
- 对象式环境记录：用于定义ECMAScript元素的效果，例如 WithStatement（with语句），它将标识符绑定与某些对象的属性关联起来。

获取环境记录中的值时，如果获取的是用 var 定义的值，会直接返回。如果获取的是用 let / const 定义的值，会判断该值有没有被初始化，如果没有则会报错。

-----

# let / const

什么是暂时性死区（TDZ）

- 从块作用域的顶部一直到变量声明完成之前，这个变量处在暂时性死区（TDZ，temporal dead zone）,不能被访问。

-----

let / const 的区别。
1. 重复声明的区别: 用 var 声明的变量可以进行重复声明, let / const 则不行。
2. 作用域提升的区别: 用 var 声明的变量会进行作用于提升, let / const 则不会
   
   - 用 var 声明的变量, 在声明之前访问不会报错, let/const 在声明之前**虽然已经创建**, 但访问会报错。
3. 存放位置的区别: 
   - 早期ECMA官方文档中: 每一个执行上下文会被关联到一个变量对象（variable object, VO）, 在源代码中的变量，函数以及函数的参数声明会被作为属性添加到VO中，
   - 最新的文档：每一个执行上下文会关联2个环境，在执行代码中变量和函数的声明会作为环境记录（Environment Record），添加到关联的环境中。
   - V8 引擎通过 variableMap 的一个 hashmap 来实现它们的存储。
   - window 对象是早期的 GO 对象，在最新的实现中仅仅是浏览器添加的全局对象，并且一直保留了 window 和 var 之间值的相等性。

4. 块级作用域的区别：
   - 用 var 声明的标识符，没有快级作用域。
   - 用 let, const, function, class 声明的标识符是有块级作用域的 （为兼容 ES6 以下的语法，JS引擎会对 function 声明进行特殊处理，允许像 var 那样提升, 但不能提前访问）。

   ```javascript
	foo() // 会报错
   {
     var message = "Hello World"
     let age = 18
     function foo() {
      console.log("foo function")
     }
   }
   foo() // 正常调用
   ```

-----

 ES5 中产生 作用域的两种情况：

 1. 全局作用域
 2. 函数作用域

-----

ES6 中的块级作用域应用场景举例：

- for循环
- if(){}
- switch
- 代码块{}

-----

理解全局代码块执行内存图（上课画图）

- 每个代码块，都会关联一个词法环境。
- 代码执行完后，如果关联的词法环境，没有被其他地方引用，那么会被销毁。

![全局代码块执行内存图](NodeAssets/全局代码执行时词法环境.png)

-----

理解块级作用域应用内存图（上课画图）

- 每个function 都关联了词法环境，其中有 let 定义的 i 变量。

![块级作用域应用内存图](NodeAssets/块级作用域应用内存图.png)