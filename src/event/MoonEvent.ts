import { Events } from './Events'

export default class MoonEvent extends Events {
  static ZOOM_WHEEL: string = 'zoom_wheel'
  static RESIZE:string='resize'
  constructor(type: string, e: any) {
    super(type, e)
  }
}
