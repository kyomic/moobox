import { IEventDispatcher } from './IEventDispatcher'

type EventCache = {
  [evt: string]: Array<{
    func: Function
    args: Array<any>
  }>
}
class Emitter implements IEventDispatcher {
  private _events: EventCache = {}
  private _once_events: EventCache = {}

  constructor() {}

  /**
   * 触发事件
   * @param {string} type - 事件类型
   */
  dispatch(evt: string | any, data?: any) {
    const type = typeof evt == 'string' ? evt : evt.type
    const events = this._events[type] || []
    let context = this
    let arg: Array<any> = [evt, context]
    if (data) {
      arg.push(data)
    }
    events.map(({ func, args }, index) => {
      try {
        func.apply(context, arg.concat(args || []))
      } catch (err) {}
    })
    //once
    const once_events = this._once_events[type] || []
    once_events.map(({ func, args }, index) => {
      try {
        func.apply(context, arg.concat(args || []))
      } catch (err) {}
    })
    this._once_events[type] = []
  }
  /**
   * 添加一个事件
   * @param {string} type - 事件类型
   * @param {function} handler - 事件处理函数
   * @param {arguments} args - 事件参数（可选）
   */
  addEventListener(type: string, handler: Function, ...args: any[]) {
    const events = this._events[type] || []
    events.push({
      func: handler,
      args: args || [],
    })
    this._events[type] = events
  }
  /**
   * 移除事件
   * @param {string} type - 事件类型
   * @param {function} handler - 事件处理函数（可选）
   */
  removeEventListener(type: string, handler?: Function) {
    const events = this._events[type] || []
    if (handler) {
      const idx: number = events.findIndex(item => item.func == handler)
      if (idx) {
        events.splice(idx, 1)
        this._events[type] = events
      }
    } else {
      this._events[type] = []
    }
  }

  on(type: string, handler: Function) {
    this.addEventListener(type, handler)
  }

  off(type: string, handler?: Function) {
    this.removeEventListener(type, handler)
  }

  once(type: string, handler: Function, ...args: any[]) {
    const events = this._once_events[type] || []
    events.push({
      func: handler,
      args: args || [],
    })
    this._once_events[type] = events
  }
}

export default Emitter
export { Emitter }
