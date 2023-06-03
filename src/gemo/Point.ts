export default class Point {
  public x: number = 0
  public y: number = 0
  constructor(x: number = 0, y: number = 0) {
    this.x = x
    this.y = y
  }

  plus(pt: Point) {
    this.x += pt.x
    this.y += pt.y
  }
  multiply(n: number) {
    this.x *= n;
    this.y *= n
    return this;
  }
  clone() {
    return new Point(this.x, this.y)
  }
  isZero() {
    return this.x === 0 && this.y === 0
  }
  distance(pt: Point) {
    return Math.sqrt((pt.x - this.x) * (pt.x - this.x) + (pt.y - this.y) * (pt.y - this.y))
  }
}
