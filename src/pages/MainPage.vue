<script setup lang="ts"></script>
<template>
  <div class="main_div">
    <h1>Hello world</h1>
    <h2>This is my test Vue 3 application</h2>
    <h3>It uses Vue 3, Composition API, Pinia, Typescript</h3>
    <p>
      Click <b @click="$router.push('/posts')" style="cursor: pointer">Posts</b> button to check
      main functionality
    </p>
    <p>Click <b>My Vue 3 app</b> to return to this page</p>
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
