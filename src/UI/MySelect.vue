<script setup lang="ts">
const { modelValue, options } = defineProps(['modelValue', 'options'])

const emit = defineEmits(['update:modelValue'])

const changeOption = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLSelectElement).value)
}
</script>

<template>
  <select :value="modelValue" @change="changeOption">
    <option disabled value="">Choose from the list</option>
    <option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.name }}
    </option>
  </select>
</template>

<style scoped></style>
