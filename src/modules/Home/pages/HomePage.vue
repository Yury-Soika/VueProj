<script setup lang="ts">
import { storeToRefs } from 'pinia'

import { useUsersStore } from '../stores/UsersStore.ts'
import { useAuthStore } from '@/stores/AuthStore'

const authStore = useAuthStore()
const { user: authUser } = storeToRefs(authStore)

const usersStore = useUsersStore()
const { users } = storeToRefs(usersStore)

usersStore.getAll()
</script>

<template>
  <div class="main_div">
    <h1>Hi {{ authUser?.firstName }}!</h1>
    <h2>This is my test Vue 3 application</h2>
    <h3>It uses Vue 3, Composition API, Pinia, Typescript</h3>
    <p>
      Click <b @click="$router.push('/posts')" style="cursor: pointer">Posts</b> button to check
      main functionality
    </p>
    <p>Click <b>My Vue 3 app</b> to return to this page</p>
    <p>List of saved users</p>
    <ul v-if="users.length">
      <li v-for="user in users" :key="user.id">{{ user.firstName }} {{ user.lastName }}</li>
    </ul>
    <div v-if="users.loading" class="spinner-border spinner-border-sm"></div>
    <div v-if="users.error" class="text-danger">Error loading users: {{ users.error }}</div>
  </div>
</template>

<style scoped>
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
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
