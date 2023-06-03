import * as TWEEN from '@tweenjs/tween.js'

export type AnimateOption = {
  from: Record<string, any>
  to: Record<string, any>
  /**
   * 动画时长，单位ms
   */
  duration?: number
  ease?: (amount: number) => number
  onUpdate?: (arg?: any) => void
  onComplete?: (arg?: any) => void
}

export class Animate {
  static defaultOption = {
    from: {},
    to: {},
    duration: 200,
    //ease: TWEEN.Easing.Linear.None,
    ease: TWEEN.Easing.Cubic.Out,
  }
  static create(opt: AnimateOption = Animate.defaultOption) {
    return new Animate(opt)
  }
  private _tween = new TWEEN.Tween({})
  private _option: AnimateOption
  private _animateId: number = -1
  constructor(option: AnimateOption = Animate.defaultOption) {
    this._option = Object.assign(
      Object.assign({}, Animate.defaultOption),
      option || {}
    )
    //console.log('动画配置', option)
    this._tween = new TWEEN.Tween(this._option.from, false)
  }
  start() {
    const option = this._option
    this._tween
      .to(option.to, option.duration)
      .easing(option.ease)
      .onUpdate((...args) => {
        option.onUpdate ? option.onUpdate(option.from) : ''
      })
      .onComplete(() => {
        option.onComplete ? option.onComplete(option.from) : ''
      })

    //
    let animateTime = 0
    const animate = time => {
      animateTime = time
      this._tween.update(time)
      requestAnimationFrame(animate)
    }
    if (isNaN(this._animateId)) {
      this._tween.start()
      this._animateId = requestAnimationFrame(animate)
    } else {
      this._tween.start(performance.now(), true)
      cancelAnimationFrame(this._animateId)
      requestAnimationFrame(animate)
    }
  }
  stop() {
    if (this._tween) {
      this._tween.stop()
    }
  }
  to(to, from?) {
    const option = this._option
    if (from) {
      this._option.from = { ...(from || {}) }
    }
    this._option.to = { ...(to || {}) }
    this.start()
    // const tween = new TWEEN.Tween(this._option)
    // console.log('继续动至:', to)

    // tween.to(to)
    // this._tween.chain( tween )
    // this._tween.start()
  }

  get option() {
    return this._option
  }
}
