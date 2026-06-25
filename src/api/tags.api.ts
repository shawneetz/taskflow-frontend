import api from './axios'
import type { Tag, TagCreate } from '@/types/tag.types'

export const tagsApi = {
  getAll: () => api.get<Tag[]>('/tags'),
  create: (data: TagCreate) => api.post<Tag>('/tags', data),
  update: (id: string, data: Partial<TagCreate>) => api.patch<Tag>(`/tags/${id}`, data),
  delete: (id: string) => api.delete(`/tags/${id}`),
}
