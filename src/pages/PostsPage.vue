<script setup lang="ts">
import { onMounted } from 'vue'
import { usePostStore } from '@/stores/PostStore'
import PostForm from '@/components/PostForm.vue'
import PostList from '@/components/PostList.vue'
import MyDialog from '@/components/UI/MyDialog.vue'
import MyButton from '@/components/UI/MyButton.vue'
import MySelect from '@/components/UI/MySelect.vue'
import MyInput from '@/components/UI/MyInput.vue'

export type Post = {
  id: number
  title: string
  body: string
}

const postStore = usePostStore()
const selectedOptions = [
  { value: 'title', name: 'By title' },
  { value: 'body', name: 'By description' }
]

onMounted(() => {
  !postStore.posts.length ? postStore.fetchPosts() : null
})
</script>

<template>
  <div class="posts__page">
    <h1>Posts page</h1>
    <MyInput v-model="postStore.searchQuery" placeholder="Search..."></MyInput>
    <div class="app__btns">
      <MyButton @click="postStore.showDialog">Create post</MyButton>
      <MySelect v-model="postStore.selectedSort" :options="selectedOptions"></MySelect>
    </div>
    <MyDialog v-model:show="postStore.dialogVisible"
      ><PostForm @create="postStore.createPost"></PostForm
    ></MyDialog>
    <PostList
      v-if="!postStore.isPostsLoading"
      :posts="postStore.sortedAndSearchedPosts"
      @remove="postStore.removePost"
    ></PostList>
    <div v-else>Loading...</div>
    <div v-intersecrion="postStore.loadMorePosts" class="observer"></div>
  </div>
</template>

<style scoped>
.posts__page {
  margin: 50px;
}
.app__btns {
  margin: 15px 0;
  display: flex;
  justify-content: space-between;
}

.page__wrapper {
  display: flex;
  margin-top: 15px;
}

.page {
  border: 1px solid black;
  padding: 10px;
}

.current-page {
  border: 2px solid blue;
}
</style>
