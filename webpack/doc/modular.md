# 模块化

模块化是指把一个复杂的系统分解到多个模块以方便编码。

## CommonJS

核心思想时通过`require`方法来同步的加载依赖的其他模块，通过
`module.export`导出需要暴露的接口。`CommonJS`规范的流行得益于
`Node.js`采用了这种方式。

```js
const moduleA = require('./moduleA')

module.exports = moduleA.someFunc;
```

优点在于

- 代码可复用于`Node.js`环境下并运行，例如做同构应用
- 通过`NPM`发布的很多第三方模块都采用了`CommonJS`规范

`CommonJS`的缺点在于这样的代码无法直接运行在浏览器环境中，必须通
过工具转换成标准的ES5

## AMD

AMD也是一种JavaScript模块化规范，与`CommonJS`最大的不同在于它采用异步的方式去加载依赖的模块。AMD规范主要是为了解决针对浏览器环境的模块化问题，最具代表性的实现时`requirejs`

```js
// 定义一个模块
define('module', ['dep'], function (dep) {
  return exports;
})

//导入和使用
require(['module'], function (module) {})
```

AMD优点

- 可在不转换代码的情况下直接在浏览器中运行
- 可异步加载依赖
- 可并行加载多个依赖
- 代码可运行在浏览器环境和Node.js环境下

AMD的缺点在于JavaScript运行环境没有原生支持AMD，需要先导入实现了
AMD的库之后才能正常使用

## ES6模块化

ECMA提出的JavaScript模块化规范，它在语言的层面上实现了模块化。浏
览器厂商和Node.js都宣布要原生支持该规范。它将逐渐取代Commonjs和
AMD规范，成为浏览器和服务器通用的模块解决方案

```js
import { readFile } form 'fs'

export default function hello () {}
```

ES6模块虽然是终极模块化方案，但它的缺点在于目前无法直接运行再大部
分JavaScript运行环境下，必须工具转换成标准的ES5之后才能正常运行


## 样式文件中的模块化

以SCSS为例，把一些通用的样式片段放进一个通用的文件里，再在另一个文件里通过`@import`语法去导入和使用这些样式片段。

```scss
// 定义样式片段  util.scss
@mixin center {
  // 水平竖直居中
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
}

// main.scss 文件

// 导入和使用 util.scss 中定义的样式片段
@import "util";

#box{
  @include center;
}
```