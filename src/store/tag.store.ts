import { create } from 'zustand'
import { tagsApi } from '@/api/tags.api'
import type { Tag, TagCreate } from '@/types/tag.types'

interface TagState {
  tags: Tag[]
  fetchTags: () => Promise<void>
  addTag: (data: TagCreate) => Promise<Tag>
  updateTag: (id: string, data: Partial<TagCreate>) => Promise<void>
  deleteTag: (id: string) => Promise<void>
}

export const useTagStore = create<TagState>((set) => ({
  tags: [],

  fetchTags: async () => {
    const { data } = await tagsApi.getAll()
    set({ tags: data })
  },

  addTag: async (data) => {
    const { data: tag } = await tagsApi.create(data)
    set((s) => ({ tags: [...s.tags, tag] }))
    return tag
  },

  updateTag: async (id, data) => {
    const { data: updated } = await tagsApi.update(id, data)
    set((s) => ({ tags: s.tags.map((t) => (t.id === id ? updated : t)) }))
  },

  deleteTag: async (id) => {
    await tagsApi.delete(id)
    set((s) => ({ tags: s.tags.filter((t) => t.id !== id) }))
  },
}))
