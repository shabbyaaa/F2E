<script>
//import { ref } from 'vue'

// defineProps({
//   title: String,
//   // todos: String[Array]
// })

export default {
  data() {
    return {
      title: "",
      todos: [{
        title: '吃饭', done: false 
      }, {
        title: '睡觉', done: true
      }]
    }
  },

  methods: {
    // 数据驱动页面
    addTodo() {
      this.todos.push({
        title: this.title,
        done: false
      })
      console.log('this.todos :>> ', this.todos);
      this.title = ''
    },
    clear() {
      this.todos = this.todos.filter(v => !v.done)
    }
  },

  computed: {
    active() {
      return this.todos.filter(x => !x.done).length
    },
    all() {
      return this.todos.length
    },
    // 不是函数 而是一个对象 返回两个方法
    allDone: {
      get: function () {
        return this.active === 0
      },
      set: function (v) {
        console.log('v :>> ', v)
        this.todos.forEach(x => {
          x.done = v
        })
      }
    }
  }
}



//const count = ref(0)
</script>

<template>
  <div id="">
    <h2>{{ title }}</h2>
    <input type="text" v-model="title" @keydown.enter="addTodo">
    <button v-if="active<all" @click="clear">清理</button>
    <ul>
      <li v-for="todo in todos" v-bind:key="todo.title">
        <input type="checkbox" v-model="todo.done">
        <span :class="{done: todo.done}">{{ todo.title }}</span>
      </li>
    </ul>
    <div>
      全选
      <input type="checkbox" v-model="allDone">
      {{ active }} / {{ all }}
      </div>
  </div>
</template>

<style scoped>
  .done {
    color: gray;
    text-decoration: line-through;
  }
</style>
