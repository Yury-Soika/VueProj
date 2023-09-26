<script setup lang="ts">
import { usePostStore } from '@/stores/PostStore'
import { useRoute } from 'vue-router'

const postStore = usePostStore()
const route = useRoute()
const post = postStore.posts.find((p) => p.id === Number(route.params.id))
</script>

<template>
  <div v-if="post" class="main_div">
    <h1>Post ID: {{ post.id }}</h1>
    <h2>Post Title: {{ post.title }}</h2>
    <p>Post Description: {{ post.body }}</p>
  </div>
  <div v-else>
    <h1>This post not found</h1>
  </div>
</template>

<style scoped>
.main_div {
  border: 1px solid gray;
  margin-left: auto;
  margin-right: auto;
  width: 90%;
  background-color: #d0f0f6;
  text-align: center;
  padding: 8px;
}
</style>
