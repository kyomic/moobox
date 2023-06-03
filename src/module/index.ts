import { Moobox } from '..'

export type ToolBarItem = {
  name: string
  icon?: string
  action?: () => void
}
export interface IToolbar extends IMoonModule {
  add(toolbar: ToolBarItem)
  remove(name: string)
  set title(str:string)
}

export interface IMoonModule {
  setup(moobox: Moobox)
  /**
   * 重绘
   */
  redraw():void
}
