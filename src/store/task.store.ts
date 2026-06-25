import { create } from 'zustand'
import { tasksApi } from '@/api/tasks.api'
import type { Task, TaskStatus, TaskPriority } from '@/types/task.types'

const COLUMNS: TaskStatus[] = ['todo', 'in_progress', 'in_review', 'done']

const empty = (): Record<TaskStatus, Task[]> =>
  ({
    todo: [],
    in_progress: [],
    in_review: [],
    done: [],
  })

interface TaskState {
  tasks: Record<TaskStatus, Task[]>
  isLoading: boolean
  fetchTasks: (params?: { status?: TaskStatus; priority?: TaskPriority; search?: string; tag_id?: string }) => Promise<void>
  addTask: (task: Task) => void
  updateTask: (task: Task) => void
  deleteTask: (taskId: string) => void
  moveTask: (taskId: string, from: TaskStatus, to: TaskStatus, newPos: number) => Promise<void>
}

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: empty(),
  isLoading: false,

  fetchTasks: async (params) => {
    set({ isLoading: true })
    const { data } = await tasksApi.getAll(params)
    const grouped = empty()
    data.forEach((t) => grouped[t.status].push(t))
    COLUMNS.forEach((c) => grouped[c].sort((a, b) => a.position - b.position))
    set({ tasks: grouped, isLoading: false })
  },

  addTask: (task) =>
    set((s) => ({ tasks: { ...s.tasks, [task.status]: [task, ...s.tasks[task.status]] } })),

  updateTask: (task) =>
    set((s) => ({
      tasks: {
        ...s.tasks,
        [task.status]: s.tasks[task.status].map((t) => (t.id === task.id ? task : t)),
      },
    })),

  deleteTask: (id) =>
    set((s) => {
      const tasks = empty()
      COLUMNS.forEach((c) => {
        tasks[c] = s.tasks[c].filter((t) => t.id !== id)
      })
      return { tasks }
    }),

  moveTask: async (taskId, from, to, newPos) => {
    const snapshot = get().tasks
    set((s) => {
      const next = { ...s.tasks, [from]: [...s.tasks[from]], [to]: [...s.tasks[to]] }
      const idx = next[from].findIndex((t) => t.id === taskId)
      if (idx === -1) return s
      const [task] = next[from].splice(idx, 1)
      task.status = to
      next[to].splice(newPos, 0, task)
      return { tasks: next }
    })
    try {
      await tasksApi.reorder({ task_id: taskId, new_status: to, new_position: newPos })
    } catch {
      set({ tasks: snapshot })
      throw new Error('Reorder failed')
    }
  },
}))
