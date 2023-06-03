export interface IEventDispatcher {
  /**
   * 广播事件
   */
  dispatch: (type: string, data?: any) => void
  addEventListener: (
    type: string,
    handler: Function,
    ...args: Array<any>
  ) => void
  removeEventListener: (type: string, handler?: Function) => void
  //extend
  on: (type: string, handler: Function, ...args: Array<any>) => void
  once: (type: string, handler: Function, ...args: Array<any>) => void
  off: (type: string, handler?: Function) => void
}
