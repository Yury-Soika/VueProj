import axios from 'axios'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { Post } from '@/modules/Post/constants'

export const limit = 10
const postsUrl = 'https://jsonplaceholder.typicode.com/posts'

export const usePostStore = defineStore('postStore', () => {
  const posts = ref<Post[]>([])
  const dialogVisible = ref(false)
  const isPostsLoading = ref(true)
  const page = ref(1)
  const totalPages = ref(0)
  const selectedSort = ref<keyof Post>('id')
  const searchQuery = ref('')

  const sortedPosts = computed(() => {
    if (!selectedSort.value) {
      return [...posts.value]
    }

    return [...posts.value].sort((post1: Post, post2: Post) => {
      const value1 = post1[selectedSort.value]
      const value2 = post2[selectedSort.value]

      if (typeof value1 === 'string' && typeof value2 === 'string') {
        return value1.localeCompare(value2)
      }

      if (typeof value1 === 'number' && typeof value2 === 'number') {
        return value1 - value2
      }

      return 0 // Default case if types are not string or number
    })
  })

  const sortedAndSearchedPosts = computed(() =>
    sortedPosts.value.filter((post) =>
      post.title.toLowerCase().includes(searchQuery.value.toLocaleLowerCase())
    )
  )

  const getPosts = (url: string) => {
    return axios.get(url, {
      params: {
        _page: page.value,
        _limit: limit
      }
    })
  }

  const createPost = (post: Post) => {
    posts.value.push(post)
    dialogVisible.value = false
  }
  const removePost = (post: Post) => {
    posts.value = posts.value.filter((p) => p.id !== post.id)
  }
  const showDialog = () => (dialogVisible.value = true)

  const fetchData = async (url: string, pageIncrement = 0, loading = false) => {
    try {
      isPostsLoading.value = loading
      const response = await getPosts(`${url}?_page=${page.value + pageIncrement}&_limit=${limit}`)
      if (pageIncrement === 0) {
        totalPages.value = Math.ceil(response.headers['x-total-count'] / limit)
        posts.value = response.data
      } else {
        posts.value = [...posts.value, ...response.data]
      }
    } catch (e) {
      console.error(e)
    } finally {
      isPostsLoading.value = false
    }
  }

  const fetchPosts = async () => {
    fetchData(postsUrl, 0, true)
  }

  const loadMorePosts = async () => {
    page.value += 1
    fetchData(postsUrl, 1)
  }

  return {
    posts,
    dialogVisible,
    isPostsLoading,
    page,
    totalPages,
    selectedSort,
    searchQuery,
    sortedPosts,
    sortedAndSearchedPosts,
    createPost,
    removePost,
    showDialog,
    fetchPosts,
    loadMorePosts
  }
})
