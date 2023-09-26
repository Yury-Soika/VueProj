<script setup lang="ts">
import type { Post } from '@/pages/PostsPage.vue'
import PostItem from './PostItem.vue'
defineProps<{
  posts: Post[]
}>()
const emit = defineEmits(['remove'])
</script>

<template>
  <div v-if="posts.length > 0">
    <h1>Posts list</h1>
    <TransitionGroup name="post-list">
      <PostItem
        v-for="post in posts"
        :key="post.id"
        :post="post"
        @remove="emit('remove', post)"
      ></PostItem>
    </TransitionGroup>
  </div>
  <h2 v-else>List is empty</h2>
</template>

<style scoped>
.post-list-enter-active,
.post-list-leave-active {
  transition: all 0.5s ease;
}
.post-list-enter-from,
.post-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
