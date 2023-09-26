<script setup lang="ts">
import MyButton from './UI/MyButton.vue'
</script>

<template>
  <nav>
    <div style="cursor: pointer" @click="$router.push('/')">My Vue 3 app</div>
    <div class="navbar__btns">
      <MyButton @click="$router.push('/posts')" style="margin-left: 20px">Posts</MyButton>
    </div>
  </nav>
</template>

<style scoped>
nav {
  display: flex;
  height: 50px;
  background-color: lightgray;
  box-shadow: 2px 2px 4px gray;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 0 15px;
}

.navbar__btns {
  margin-left: auto;
}
</style>
