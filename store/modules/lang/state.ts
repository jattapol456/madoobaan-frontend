export interface State {
  locales: string[]
  locale: string
}

export const state = (): State => ({
  locales: ['th'],
  locale: 'th',
})

export default state
