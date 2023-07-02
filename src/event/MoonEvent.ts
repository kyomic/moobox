import { Events } from './Events'

export default class MoonEvent extends Events {
  static ZOOM_WHEEL: string = 'zoom_wheel'
  static PAN_END: string = 'pan_end'
  static RESIZE: string = 'resize'

  /**
   * 播放开始
   */
  static PLAY: string = 'play'
  static PAUSE: string = 'pause'
  constructor(type: string, e: any) {
    super(type, e)
  }
}
