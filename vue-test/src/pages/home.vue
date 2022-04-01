<template>
  <h1>index</h1>
  <!-- <TodoList2 /> -->
  <h1>你的评分是{{ score }}</h1>
  <!-- v-model 双向绑定 -->
  <Rate v-model="score"></Rate>
  <Rate v-model="score">ss</Rate>
</template>

<script setup>
import { ref, reactive } from 'vue'
import TodoList2 from '../components/TodoList2.vue'
import Rate from '../components/Rate.vue'

const score = ref(4)

// function update (num) {
//   console.log('num: ', num);
//   score.value = num
// }
</script>