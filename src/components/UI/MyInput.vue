<template>
  <div>
    <input
      :value="modelValue"
      :placeholder="placeholder"
      @input="updateInput"
      class="input"
      type="text"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string | number
  placeholder?: string
}>()
const emit = defineEmits(['update:model-value'])

const updateInput = (event: Event) => {
  emit('update:model-value', (event.target as HTMLInputElement).value)
}
</script>

<style scoped>
.input {
  width: 100%;
  border: 1px solid blue;
  padding: 10px 15px;
  margin-top: 15px;
}
</style>
