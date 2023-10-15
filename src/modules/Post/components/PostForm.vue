<script setup lang="ts">
import { ref } from 'vue'
import MyButton from '@/UI/MyButton.vue'
import MyInput from '@/UI/MyInput.vue'

const emit = defineEmits(['create'])

const post = ref({
  id: 0,
  title: '',
  body: ''
})

const createPost = () => {
  post.value.id = Date.now()
  emit('create', post.value)
  post.value = {
    id: 0,
    title: '',
    body: ''
  }
}
</script>

<template>
  <form @submit.prevent>
    <h1>Create post</h1>
    <MyInput v-model="post.title" placeholder="Title"></MyInput>
    <MyInput v-model="post.body" placeholder="Description"></MyInput>
    <MyButton class="btn__create" @click="createPost">Create</MyButton>
  </form>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}
</style>
