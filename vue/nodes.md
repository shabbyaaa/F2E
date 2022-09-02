# vue

## computed和方法的区别
```js
computed: {
  reverseMessage: function () {
    return this.message.split('').reverse().join('')
  }
},
methods: {
  reverseMessage: function() {
    return this.message.split(''.reverse().join(''))
  }
}
```
computed是基于它的响应式以来进行缓存的，只有在相关响应式发生改变时它们才会重新求值。
method中的返回返回 每次触发重新渲染时，调用方法总会再次执行函数

## watch

当需要在数据变化时执行异步或开销较大的操作时

## v-show 和 v-if

v-if是真正的条件渲染，因为它会确保在切换过程中条件快内的事件监听器和子组件适当地被销毁和重建

v-if也是惰性的：如果在初始渲染时条件为假，则什么也不做 直到条件第一次变为真时，才会开始渲染条件块

相比之下 v-show就简单的多，不管初始条件是什么，元素总会被渲染，并且只是简单地基于css进行切换（display）

一般来说，v-if有更高的切换开销，而v-show有更高的初始渲染开销。因此如果需要非常频繁的切换，用v-show好，反之亦然。

## v-if 与 v-for 不推荐一起使用

v-for具有比v-if更高的优先级