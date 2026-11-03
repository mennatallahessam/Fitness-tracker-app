import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useAuthStore } from './auth'
import { apiFetch, type ApiResponse } from '../api/session'
import type { Activity } from '../types'

export type { Activity }
export { formatDistance, formatDuration, formatPace, sumStat } from '../utils/formatters'

export const useActivitiesStore = defineStore('activities', () => {
  const activities = ref<Activity[]>([])
  const loading = ref(false)
  const totalCount = ref(0)
  const currentOffset = ref(0)
  const hasMore = ref(true)

  // ── Time-filtered getters (Extra Credit Statistics) ──────────────────────
  const todayActivities = computed(() => {
    const authStore = useAuthStore()
    if (!authStore.currentUser) return []
    const todayStr = new Date().toISOString().split('T')[0] || ''
    return activities.value.filter(
      a => a.date?.startsWith(todayStr)
    )
  })

  // ... (Other computed stays similar but filtered by date/user if not already filtered by API)
  
  const thisWeekActivities = computed(() => {
    const sevenDaysAgo = new Date(Date.now() - 86400000 * 7).toISOString().split('T')[0] || ''
    return activities.value.filter(
      a => a.date >= sevenDaysAgo
    )
  })

  const allTimeActivities = computed(() => {
    return activities.value
  })

  async function fetchMyActivities(isInitial = true, limit = 10) {
    if (loading.value) return
    loading.value = true
    
    if (isInitial) {
      currentOffset.value = 0
      activities.value = []
      hasMore.value = true
    }

    try {
      const response = await apiFetch<ApiResponse<Activity[]> & { total: number }>(
        `/activities/me?limit=${limit}&offset=${currentOffset.value}`
      )
      
      const newActivities = response.data || []
      activities.value = isInitial ? newActivities : [...activities.value, ...newActivities]
      totalCount.value = response.total || 0
      
      currentOffset.value += newActivities.length
      hasMore.value = activities.value.length < totalCount.value
    } finally {
      loading.value = false
    }
  }

  async function fetchUserActivities(userId: string) {
    const response = await apiFetch<ApiResponse<Activity[]>>(`/activities/user/${userId}`)
    return response.data || []
  }

  async function addActivity(activity: Omit<Activity, 'id'>) {
    const response = await apiFetch<ApiResponse<Activity>>('/activities', {
      method: 'POST',
      body: JSON.stringify(activity)
    })
    if (response.data) {
      activities.value.push(response.data)
      totalCount.value++
    }
  }

  async function updateActivity(id: string, updates: Partial<Activity>) {
    const response = await apiFetch<ApiResponse<Activity>>(`/activities/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updates)
    })
    const index = activities.value.findIndex(a => a.id === id)
    if (index !== -1 && response.data) {
      activities.value[index] = response.data
    }
  }

  async function deleteActivity(id: string) {
    await apiFetch(`/activities/${id}`, { method: 'DELETE' })
    activities.value = activities.value.filter(a => a.id !== id)
    totalCount.value--
  }

  async function searchUsers(query: string) {
    const response = await apiFetch<ApiResponse<any[]>>(`/users/search?q=${query}`)
    return response.data || []
  }

  return {
    activities,
    loading,
    totalCount,
    hasMore,
    todayActivities,
    thisWeekActivities,
    allTimeActivities,
    fetchMyActivities,
    fetchUserActivities,
    searchUsers,
    addActivity,
    updateActivity,
    deleteActivity
  }
})

