<template>
  <div id="mavon-editor-id">
    <mavon-editor v-model="editor_value" @change="change" />
  </div>
</template>

<script setup>
import { defineProps, defineEmits, watchEffect, ref } from "vue";

const emits = defineEmits(['update:modelValue'])
const editor_value = ref(props.modelValue) 
const props = defineProps({
  modelValue: String
})

watchEffect(() => {
  editor_value.value = props.modelValue
})

function change (v) {
  emits('update:modelValue', v)
}
</script>