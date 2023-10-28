import { defineStore } from 'pinia'
import { ref } from 'vue'
import router from '@/router'
import { fetchWrapper } from '@/helpers/fetchWrapper'

const baseUrl = `${import.meta.env.VITE_API_URL}/users`

export const useAuthStore = defineStore('authStore', () => {
  const user = ref()
  const returnUrl = ref()

  const login = async (username: string, password: string) => {
    user.value = { loading: true }

    try {
      const userData = await fetchWrapper.post(`${baseUrl}/authenticate`, {
        username,
        password
      })

      user.value = userData
      localStorage.setItem('user', JSON.stringify(userData))
      router.push(returnUrl.value || '/')
    } catch (error) {
      user.value = { error }
      console.error(error)
    }
  }

  const logout = () => {
    user.value = null
    localStorage.removeItem('user')
    router.push('/login')
  }

  const storedUser = localStorage.getItem('user')
  if (storedUser) {
    user.value = JSON.parse(storedUser)
  }

  return {
    user,
    returnUrl,
    login,
    logout
  }
})
