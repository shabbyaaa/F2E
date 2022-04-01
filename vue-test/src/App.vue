<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
// import HelloWorld from './components/HelloWorld.vue'
// import TodoList from './container/TodoList.vue'
</script>

<template>
  <!-- <HelloWorld msg="大头" /> -->
  <!-- <TodoList /> -->
  <!-- <div>
    <router-link to="/">首页</router-link>
    <router-link to="/about">关于</router-link>
  </div>  -->
  <!-- 通过v-slot获取渲染的组件并复制给Component -->
  <!-- <router-view v-slot="{ Component }">
    <transition name="route" modae="out-in">
      内置组件component的 is 属性动态渲染组件
      <component :is="Component" /> 
    </transition>
  </router-view> -->

  <router-view :key="$route.path" />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center;
  color: #2c3e50;
  margin-top: 60px; */
}
</style>
