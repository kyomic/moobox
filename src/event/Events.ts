class ABC {}
const ProxyEvents = new Proxy(ABC, {
  get: function (target, attr) {
    console.log('get-----', attr)
    return target[attr] // obj["a"]
  },
})

export class Events {
  private _type: string
  private _originEvent: any
  private _data: any
  constructor(type: string, evt: any) {
    this._type = type
    this._originEvent = evt?.originEvent
    this._data = evt
  }
  get originEvent() {
    return this._originEvent
  }
  get type(): string {
    return this._type
  }
  get data(): any {
    return this._data || {}
  }
}
