import { ref, computed } from 'vue'
import { useStorage } from '@vueuse/core'
import { Guid } from 'guid-typescript'
import type { Page } from '../types'

export function usePageManager() {
  const pages = useStorage<Page[]>('whiteboard-pages', [{
    id: Guid.create().toString(),
    name: "",
    isCurrent: true,
    widgets: [],
    createdAt: new Date(),
    updatedAt: new Date()
  }])
  
  const currIndex = ref(0)
  const currentPage = computed(() => pages.value[currIndex.value])

  const addPage = () => {
    pages.value.push({
      id: Guid.create().toString(),
      name: `page${pages.value.length + 1}`,
      isCurrent: false,
      widgets: [],
      createdAt: new Date(),
      updatedAt: new Date()
    })
  }

  const deletePage = (pageToDelete: Page) => {
    if (pages.value.length <= 1) {
      return false
    }

    const index = pages.value.findIndex(p => p.id === pageToDelete.id)
    if (index === -1) return false

    if (pageToDelete.isCurrent) {
      const newCurrentIndex = index === 0 ? 1 : index - 1
      pages.value[newCurrentIndex].isCurrent = true
    }

    pages.value = pages.value.filter(p => p.id !== pageToDelete.id)
    refreshCurrentPage()
    return true
  }

  const selectPage = (page: Page) => {
    pages.value.forEach(p => {
      p.isCurrent = p.name === page.name
    })
    refreshCurrentPage()
  }

  const refreshCurrentPage = () => {
    pages.value.forEach((page, index) => {
      if (page.isCurrent) {
        currIndex.value = index
      }
    })
  }

  return {
    pages,
    currentPage,
    currIndex,
    addPage,
    deletePage,
    selectPage,
    refreshCurrentPage
  }
} 