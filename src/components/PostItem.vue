<script setup lang="ts">
import MyButton from './UI/MyButton.vue'
import type { Post } from '@/pages/PostsPage.vue'
defineProps<{
  post: Post
}>()

const emit = defineEmits(['remove'])
</script>

<template>
  <div class="post" v-if="post">
    <div>
      <div><strong>Id: </strong>{{ post.id }}</div>
      <div><strong>Title: </strong>{{ post.title }}</div>
      <div><strong>Description: </strong>{{ post.body }}</div>
    </div>
    <div class="posts__btns">
      <MyButton @click="$router.push(`/posts/${post.id}`)">Open</MyButton>
      <MyButton @click="emit('remove', post)">Delete</MyButton>
    </div>
  </div>
</template>

<style scoped>
.post {
  padding: 15px;
  border: 3px solid blue;
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.posts__btns {
  display: flex;
}
</style>
