export interface State {
  serverInitContext: boolean
  meta: Record<string, any>
}

export const state = (): State => ({
  serverInitContext: true,
  meta: [],
})

export default state
