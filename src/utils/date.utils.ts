import { format, isPast, isWithinInterval, addHours } from 'date-fns'

export function isOverdue(due_date: string | null, status: string): boolean {
  if (!due_date || status === 'done') return false
  return isPast(new Date(due_date))
}

export function isDueSoon(due_date: string | null): boolean {
  if (!due_date) return false
  return isWithinInterval(new Date(due_date), { start: new Date(), end: addHours(new Date(), 24) })
}

export function formatDueDate(due_date: string): string {
  return format(new Date(due_date), 'MMM d')
}
