<template>
  <p>{{ message }}</p>
  <!-- 双向绑定 而在React中只能将其变为受控组件 手动更新state -->
  <input v-model="message" />
</template>

<script setup>
import { ref } from 'vue'

const message = ref('placeholder')
</script>