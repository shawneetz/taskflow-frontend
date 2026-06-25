import api from './axios'
import type { Task, TaskCreate, TaskUpdate, TaskReorder, TaskStatus, TaskPriority } from '@/types/task.types'

export const tasksApi = {
  getAll: (params?: { status?: TaskStatus; priority?: TaskPriority; search?: string; tag_id?: string }) =>
    api.get<Task[]>('/tasks', { params }),
  getById: (id: string) => api.get<Task>(`/tasks/${id}`),
  create: (data: TaskCreate) => api.post<Task>('/tasks', data),
  update: (id: string, data: TaskUpdate) => api.patch<Task>(`/tasks/${id}`, data),
  delete: (id: string) => api.delete(`/tasks/${id}`),
  reorder: (data: TaskReorder) => api.patch<Task>('/tasks/reorder', data),
}
