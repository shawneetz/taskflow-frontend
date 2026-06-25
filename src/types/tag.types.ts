export interface Tag {
  id: string
  name: string
  color: string
  created_at: string
}

export interface TagCreate {
  name: string
  color: string
}
