import { usePostStore } from '@/stores/PostStore'

export const vIntersection = {
  mounted: (el: any, binding: any) => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      const postStore = usePostStore()

      if (entries[0].isIntersecting) {
        binding.value() && postStore.page < postStore.totalPages
      }
    }

    const observer = new IntersectionObserver(handleIntersection)
    observer.observe(el)
  },
  name: 'intersecrion'
}
