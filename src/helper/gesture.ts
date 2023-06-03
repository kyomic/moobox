import { Emitter } from '../event'
const isMacWebkit =
  navigator.userAgent.indexOf('Macintosh') !== -1 &&
  navigator.userAgent.indexOf('WebKit') !== -1
/**
 *d
 */
export class Gesture extends Emitter {
  private _delta: Array<{ x; y }> = []
  wheel(e: any) {
    // mac 的delta更敏感
    let deltaX = e.deltaX * -30 || e.wheelDeltaX / 4 || 0
    let deltaY = e.deltaY * -30 || e.wheelDeltaY / 4 || 0
    if (isMacWebkit) {
      deltaX /= 30
      deltaY /= 30
    }
    this._delta.push({
      x: deltaX,
      y: deltaY,
    })

    const info = this.gestureDirection
    // console.log(info)
    // console.log('deltaX', deltaX, deltaY, e.wheelDeltaY)
  }
  wheelEnd(e: any) {
    this._delta = []
  }
  get gestureDirection() {
    const sumX =
      this._delta.reduce((pre, current, index) => {
        return current.x + pre
      }, 0) / this._delta.length
    const sumY =
      this._delta.reduce((pre, current, index) => {
        return current.y + pre
      }, 0) / this._delta.length

    const horizontal = Math.abs(sumX / sumY) > 0.5
    let direction = ''
    if (horizontal) {
      if (sumX > 0) {
        direction = 'right'
      } else {
        direction = 'left'
      }
    } else {
      if (sumY > 0) {
        direction = 'bottom'
      } else {
        direction = 'top'
      }
    }
    return {
      direction,
    }
  }
}
