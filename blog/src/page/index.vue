<template>
  <h1>{{ data }}</h1>
  <MarkDonw v-model="data" />
</template>

<script setup>
import { ref } from 'vue'
import MarkDonw from '../components/MarkDonw.vue'

const data = ref('hello world')
</script>