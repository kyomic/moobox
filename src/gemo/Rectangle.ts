import Point from "./Point"

export default class Rectangle {
  x: number = 0
  y: number = 0
  width: number = 0
  height: number = 0
  constructor(
    x: number = 0,
    y: number = 0,
    width: number = 0,
    height: number = 0
  ) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
  }
  /**
   * 是否与目标矩形相等
   * @param rect 
   * @returns 
   */
  equal(rect: Rectangle) {
    return rect.width === this.width && rect.height === this.height
  }
  /**
   * 宽度减去相应的值
   * @param pt 
   * @returns 
   */
  subtract(pt: Point) {
    this.width -= pt.x;
    this.height -= pt.y;
    return this;
  }
  clone(): Rectangle {
    return new Rectangle(this.x, this.y, this.width, this.height)
  }
  /**
   * 是否0宽/高
   * @returns 
   */
  isZero() {
    return this.width === 0 && this.height === 0
  }

  /**
   * 将矩形缩放显示至目标视图
   * @param target 目标视图
   * @param type
   */
  scaleTo(
    target: Rectangle,
    type: 'contain' | 'fill' | 'cover' = 'contain'
  ): Rectangle {
    const targetRatio = target.width / target.height
    const ratio = this.width / this.height
    const rect: Rectangle = target.clone()
    switch (type) {
      case 'contain':
        if (targetRatio > ratio) {
          rect.height = rect.height
          rect.width = ratio * rect.height
        } else {
          rect.width = rect.width
          rect.height = (1 / ratio) * rect.width
        }
        break
      case 'cover':
        if (targetRatio > ratio) {
          rect.width = target.width
          rect.height = (1 / ratio) * target.width
        } else {
          rect.height = target.height
          rect.width = ratio * target.height
        }
        break
      default:
        break
    }
    return rect
  }

  /**
   * 判断点是否在矩形内
   * @param pt 测试点
   * @returns 
   */
  contains(pt: Point) {
    return this.x <= pt.x && this.y <= pt.y && (this.x + this.width) >= pt.x && (this.y + this.height >= pt.y)
  }
}
