import { IinsertAnnounce } from '@/types/announces'
export interface State {
  serverInitContext: boolean
  meta: Record<string, any>
  annouces: IinsertAnnounce | null
  post: IinsertAnnounce | null
}

export const state = (): State => ({
  serverInitContext: true,
  meta: [],
  annouces: null,
  post: null,
})

export default state
