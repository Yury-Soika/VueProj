<script setup lang="ts">
import MyButton from '@/UI/MyButton.vue'
import { useAuthStore } from '@/stores/AuthStore.ts'

const authStore = useAuthStore()
</script>

<template>
  <nav v-show="authStore.user">
    <div style="cursor: pointer" @click="$router.push('/')">My Vue 3 app</div>
    <div class="navbar__btns">
      <MyButton @click="$router.push('/posts')">Posts</MyButton>
      <MyButton @click="authStore.logout()" class="nav-item nav-link">Logout</MyButton>
    </div>
  </nav>
</template>

<style scoped>
nav {
  display: flex;
  background-color: lightgray;
  box-shadow: 2px 2px 4px gray;
  align-items: center;
  justify-content: space-around;
  padding: 0 15px;
}

.navbar__btns {
  margin: 10px 0;
  margin-left: auto;
  display: flex;
  width: 190px;
  justify-content: space-between;
}
</style>
