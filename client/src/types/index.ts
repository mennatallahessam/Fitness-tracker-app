export type Role = 'admin' | 'user' | 'trainer'

export interface User {
  id: string
  username: string
  email: string
  fullName: string
  full_name?: string
  password?: string
  role: Role
  friends: string[]
  avatar: string
}

export interface ExerciseType {
  id: string
  name: string
  default_calories_per_minute: number
  defaultCaloriesPerMinute?: number
}

export interface Activity {
  id: string
  userId: string | any
  exerciseTypeId: string | any
  type?: string
  duration: number // in minutes
  distance: number // in km
  date: string
  calories: number
  notes?: string
  taggedFriends?: any[]
}

export interface ApiResponse<T = any> {
  status: 'success' | 'fail' | 'error'
  data?: T
  message?: string
  token?: string
}

