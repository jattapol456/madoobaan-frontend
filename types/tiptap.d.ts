/* eslint-disable no-empty-pattern */

declare module 'tiptap' {
  import Vue from 'vue'

  export interface onUpdateFunctionState {
    getHTML: () => string
  }

  export type onUpdateFunction = (state: onUpdateFunctionState) => void

  export class Editor {
    public constructor({}: { content?: string; onUpdate?: onUpdateFunction })

    public setOptions({}): void
    public setContent(content: string, emitUpdate?: boolean): void
    public getHTML(): string
    public destroy(): void
  }

  export class EditorMenuBar extends Vue {}

  export class EditorContent extends Vue {}
}
