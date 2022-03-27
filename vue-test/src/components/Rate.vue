<template>
  <div :style="fontStyle">
    <slot></slot>
    <div class="rate" @mouseout="mouseOut">
      <span  @mouseover="mouseOver(num)" v-for="num in 5" :key="num">☆</span>
      <span class="hollow" :style="fontWidth">
        <span @click="onRate(num)" @mouseover="mouseOver(num)" v-for="num in 5" :key="num">★</span>
      </span>
    </div>
  </div>
  <div>{{ props.modelValue }}</div>
</template>

<script setup>
import { defineProps, computed, ref, defineEmits, watchEffect } from 'vue'

const props = defineProps({
  modelValue: Number,
  theme: { type: String, default: 'orange'}
})

console.log('props :>> ', props);

// const rate = computed(() => "★★★★★☆☆☆☆☆".slice(5 - props.value, 10 - props.value))
const themeObj = {
  'black': '#00', 
  'white': '#fff', 
  'red': '#f5222d', 
  'orange': '#fa541c', 
  'yellow': '#fadb14', 
  'green': '#73d13d', 
  'blue': '#40a9ff',
}
const width = ref(props.modelValue)
const fontStyle = computed(() => {
  return `color: ${themeObj[props.theme]};`
})
const fontWidth = computed(() => `width: ${width.value}em;`)
// const emits = defineEmits('update-rate')
const emits = defineEmits(['update:modelValue'])

function mouseOver (i) {
  width.value = i
}

function mouseOut () {
  width.value = props.modelValue
}

function onRate (num) {
  // emits('update-rate', num)
  emits('update:modelValue', num)
}

// 此处记得 props改变了 子组件是用了ref来接受了props里的值，如果不用下面方法，会导致子组件并没有更新
watchEffect(()=> {
  width.value = props.modelValue
})
</script>

<style scoped>
.rate {
  position: relative;
  display: inline-block;
}

.rate > span.hollow {
  position: absolute;
  display: inline-block;
  top: 0;
  left: 0;
  width: 0;
  overflow: hidden;
}
</style>