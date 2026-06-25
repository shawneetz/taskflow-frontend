import type { Tag } from './tag.types'

export type TaskStatus = 'todo' | 'in_progress' | 'in_review' | 'done'
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent'

export interface Task {
  id: string
  title: string
  description: string | null
  status: TaskStatus
  priority: TaskPriority
  due_date: string | null
  position: number
  tags: Tag[]
  created_at: string
  updated_at: string
}

export interface TaskCreate {
  title: string
  description?: string
  status?: TaskStatus
  priority?: TaskPriority
  due_date?: string
  tag_ids?: string[]
}

export interface TaskUpdate extends Partial<TaskCreate> {}

export interface TaskReorder {
  task_id: string
  new_status: TaskStatus
  new_position: number
}
