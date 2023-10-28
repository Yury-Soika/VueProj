import { defineStore } from 'pinia'
import { ref } from 'vue'
import { fetchWrapper } from '@/helpers/fetchWrapper'

const baseUrl = `${import.meta.env.VITE_API_URL}/users`

export const useUsersStore = defineStore('usersStore', () => {
  const users = ref({})

  const getAll = async () => {
    users.value = { loading: true }

    try {
      const fetchedUsers = await fetchWrapper.get(baseUrl)
      users.value = fetchedUsers
    } catch (error) {
      users.value = { error }
      console.error(error)
    }
  }

  return {
    users,
    getAll
  }
})
