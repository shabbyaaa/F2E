<template>
  <span class="dustbin">🗑</span>
  <div class="animate-wrap">
    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
      <div class="animate" v-show="animate.show">
        📋
      </div>
    </transition>
  </div>
  <div>
    <h1 @click="add">{{ count }}</h1>
    <input type="text" v-model="title" @keydown.enter="addTodo" />
    <button v-if="active < all" @click="clear">清理</button>
    <ul v-if="todos.length">
      <transition-group name="flip-list" tag="ul">
        <li v-for="(todo, i) in todos" :key="todo.title">
          <input type="checkbox" v-model="todo.done" />
          <span :class="{ done: todo.done }">{{ todo.title }}</span>
          <span class="remove-btn" @click="removeTodo($event, i)">❌</span>
        </li>
      </transition-group>
    </ul>
    <div v-else>暂无数据</div>
    <div>
      全选
      <input type="checkbox" v-model="allDone" />
      <span>{{ active }} / {{ all }}</span>
    </div>
  </div>
  <transition name="modal">
    <div class="info-wrapper" v-if="showModal">
      <div class="info">
        请先输入！
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, reactive } from 'vue'
import useTodos from '../utils/useTodos'

const count = ref(1)
const { title, todos, addTodo, clear, active, all, allDone, showModal } = useTodos()
const color = ref('red')
const animate = reactive({
  show: false,
  el: null
})

function add () {
  count.value++
  color.value = Math.random() > 0.5 ? 'blue' : 'red'
}

function beforeEnter (el) {
  console.log('el: ', el);
  const dom = animate.el
  const rect = dom.getBoundingClientRect()
  const x = window.innerWidth - rect.left - 60
  const y = rect.top - 10

  el.style.transform =  `translate(${-x}px, ${y}px)`
}

function enter (el, done) {
  console.log('el: ', el);
  document.body.offsetHeigth
  el.style.transform = 'translate(0px, 0px)'
  el.addEventListener('transitionend', done)
}

function afterEnter(el){ 
  // 没有执行
  animate.show = false 
  el.style.display = 'none'
  console.log('m: ', animate);
}

function removeTodo(e, i) {
  animate.el = e.target
  animate.show = true
  setTimeout(() => {
    todos.value.splice(i, 1)
  })
}


</script>

<style scoped>
h1 {
  color: v-bind(color);
}

.info-wrapper {
  position: fixed;
  top: 20px;
  width: 200px;
}
.info {
  padding: 20px;
  color: white;
  background: #d88986;
}

.modal-enter-from {
  opacity: 0;
  transform: translateY(-60px);
}

.modal-enter-active {
  transition: all 1s ease;
}

.modal-leave-to {
  opacity: 0;
  transform: translateY(-60px);
}

.modal-leave-active {
  transition: all 1s ease;
}

.flip-list-move {
  transition: transform 0.8s ease;
}

.flip-list-enter-active, .flip-list-leave-active {
  transition: all 1s ease;
}

.flip-list-enter-from, .flip-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.dustbin, .animate-wrap .animate {
  position: fixed;
  right: 10px;
  top: 10px;
  z-index: 100;
  transition: all 5s linear;
}
</style>