
import { Moobox } from '..'
import { MoonEvent } from '../event'
import { Point, Rectangle } from '../gemo'
import { Animate, AnimateOption } from '../helper/animate'
import { Gesture } from '../helper/gesture'
import { Query as $ } from '../helper/query'
import { epsilon, debounce } from '../utils'
export default class MooboxImageTracker {
  public index: number = 0;
  private _moobox: Moobox
  private _container: HTMLElement
  private _url: string = ''

  private _content: HTMLElement
  private _image: HTMLImageElement
  private _loading: HTMLElement
  private $content: any

  private _size: Rectangle = new Rectangle()
  private _originSize: Rectangle = new Rectangle()
  private _gesture: Gesture = new Gesture()
  private _zoomDebounce

  private _debug = document.createElement('div')
  changedDelta: number = 0

  /**
   * 缩放变化
   */
  transform = {
    x: 0,
    y: 0,
    scale: 1,
    oldScale: 1,
    oldX: 0,
    oldY: 0,
  }
  evtContentDragEvent
  dragging = {
    /**
     * 是否按信住鼠标拖拽过
     */
    dragged: false,
    /**
     * 鼠标的屏幕坐标+画布偏移坐标
     */
    start: { x: 0, y: 0 },
    /**
     * 拖动后的偏移
     */
    offset: { x: 0, y: 0 },
  }
  transformAnimate: Animate | null = null
  transformAnimateRunning: boolean = false
  private _originRatio = 1
  /**
   * 可视化视图大小
   */
  private _viewPort: Rectangle = new Rectangle()
  private _isDragPan: boolean = false;
  /**
   * 
   * @param moonbox Moobox实例
   * @param root 父容器
   * @param option 配置参数
   * @param {Rectangle} viewport 显示的区域信息
   */
  constructor(
    moonbox: Moobox,
    root: HTMLElement,
    option: { width?: number; height?: number; url?: string } = {},
    viewport: Rectangle = new Rectangle()
  ) {
    this._moobox = moonbox
    this._container = this.createNode('image-track', root)
    this._content = this.createNode('content', this._container)
    this._image = this.createNode('', this._content, 'img') as HTMLImageElement
    this._loading = this.createNode('div', this._content)
    this._loading.className = 'loading'
    this._loading.innerHTML = '<div class="box"></div>'
    this._viewPort = viewport
    this._size = new Rectangle(0, 0, option.width, option.height)
    this._url = option.url || ''
    // init
    this.attachEvent()
    if (this._url) {
      this._image.setAttribute('src', this._url)
    }

    this.resize(this._size.width, this._size.height)
    // this._debug.className = 'debug'
    // this._zoomDebounce = debounce(this.onZoomEnd, 200, this)
    // document.body.appendChild(this._debug)
    this.setCursor('zoomin')
  }
  attachEvent() {
    this.evtContentDragEvent = this.onContentDragEvent.bind(this)
    this._image.addEventListener('load', evt => {
      this._loading.parentNode?.removeChild(this._loading)
      const target = evt.target as HTMLImageElement
      this._originSize = new Rectangle(
        0,
        0,
        target.naturalWidth || target.width,
        target.naturalHeight || target.height
      )
      this._originRatio = this._originSize.width / this._originSize.height
      this.updateViewPort(this._viewPort)
      $.addClass(this.container, 'index_' + this.index)

    })
    this._content.addEventListener('mouseup', evt => {
      console.log('mouse up')
    })
    let debounceFun = debounce(arg => {
      this._gesture.wheelEnd(arg)
    }, 300)
    this._content.addEventListener('mousewheel', evt => {
      this._gesture.wheel(evt as WheelEvent)
      //debounceFun(evt)
    })
    this._content.addEventListener('touchstart', (evt: TouchEvent) => {
      console.log('touchstart', evt)
      const touches = evt.touches
      if (touches.length > 1) {
        //evt.preventDefault()
      }
    })
    this._container.addEventListener('mousedown', evt => {

      this.dragging.start = new Point(
        evt.clientX - this.transform.x,
        evt.clientY - this.transform.y
      )

      // this.dragging.transform = {
      //   ...this.transform,
      // }
      console.log('draging', JSON.stringify(this.dragging))
      document.addEventListener('mousemove', this.evtContentDragEvent)
      document.addEventListener('mouseup', this.evtContentDragEvent)
    })
    this._content.addEventListener('touchmove', evt => {
      console.log('touchMove', evt)
    })
    this._content.addEventListener('touchend', evt => { })

    this._container.addEventListener('wheel', (evt: MouseEvent) => {
      const e = evt as any
      // 阻止页面内容的滚动
      evt.stopPropagation()
      evt.stopImmediatePropagation()
      evt.preventDefault()
      if (this.transformAnimateRunning) {
        return
      }
      const delta = Math.max(
        -1,
        Math.min(1, -e.deltaY || -e.deltaX || e.wheelDelta || -e.detail)
      )
      if (!this.changedDelta) {
        this.changedDelta = 0
      }
      let scale = this.transform.scale
      const minScale = this._moobox.option('minScale')
      const maxScale = this.maxScale
      const wheelLimit = this._moobox.option('wheelLimit')
      let wheelFactor = this._moobox.option('wheelFactor')
      //wheelFactor = 10
      //console.log('delta', delta)
      let newScale = (scale * (100 + delta * wheelFactor)) / 100

      //console.log('newScale', newScale)
      if (
        (delta < 0 && Math.abs(scale - minScale) < 0.01) ||
        (delta > 0 && Math.abs(scale - maxScale) < 0.01)
      ) {
        this.changedDelta += Math.abs(delta)
        newScale = scale
      } else {
        this.changedDelta = 0
        newScale = Math.max(Math.min(newScale, maxScale), minScale)
      }
      //console.log('changeDelta', this.changedDelta, 'minScale',minScale,'maxScale',maxScale,'scale', scale)
      if (
        (this.changedDelta < wheelLimit) &&
        (evt.preventDefault(), newScale !== scale)
      ) {
        const bound: DOMRect = this._content.getBoundingClientRect()

        const x = Math.min(
          this.viewPort.x + this._size.width,
          Math.max(this.viewPort.x, evt.clientX)
        )
        const y = Math.min(
          this.viewPort.y + this._size.height,
          Math.max(this.viewPort.y, evt.clientY)
        )
        // const x = evt.clientX
        // const y = evt.clientY
        let offsetX = x - bound.left
        let offsetY = y - bound.top
        //this.zoomTo(newScale, new Point(offsetX, offsetY), { duration: 30 })
        this.zoomTo(newScale, new Point(offsetX, offsetY), { duration: 30 })
      }
      this._moobox.dispatch(
        new MoonEvent(MoonEvent.ZOOM_WHEEL, { origin: evt, delta })
      )
      this._zoomDebounce()
    })
  }
  // TODO
  conentFitToBound(content: HTMLElement | Rectangle, rect: Rectangle): Point {
    let target: Rectangle
    if (content instanceof Rectangle) {
      target = content
    } else {
      const bound: DOMRect = content.getBoundingClientRect()
      target = new Rectangle(bound.x, bound.y, bound.width, bound.height)
    }

    const x = 0
    const y = 0
    return new Point(x, y)
  }
  onContentDragEvent(evt: MouseEvent) {
    let offset: Point = new Point()
    switch (evt.type) {
      case 'mousemove':
        this.dragging.dragged = true
        offset = new Point(
          evt.clientX - this.dragging.start.x,
          evt.clientY - this.dragging.start.y
        )

        if (!this.canPan()) {

          return
        }
        this.setCursor('grabbing')

        console.log('move', this.dragging)

        this.panTo(this.transform.scale, offset, { duration: 50 })
        this.updateDebug()
        break
      case 'mouseup':
        document.removeEventListener('mousemove', this.evtContentDragEvent)
        document.removeEventListener('mouseup', this.evtContentDragEvent)

        offset = new Point(
          evt.clientX - this.dragging.start.x,
          evt.clientY - this.dragging.start.y
        )
        const distance = offset.distance(new Point(this.transform.x, this.transform.y));
        this.transform.x = offset.x
        this.transform.y = offset.y

        // this.transform.x -= this.dragging.start.x - evt.clientX
        // this.transform.y -= this.dragging.start.y - evt.clientY
        this.dragging.offset = offset.clone()
        // this.dragging.transform.x = offset.x
        // this.dragging.transform.y = offset.y
        //this.dragging.start = { ...this.transform }

        //console.log('点击开始X', this.dragging.start.x, '当前X', evt.clientX)



        if (distance < 0.003 && !this.dragging.dragged) {
          // 点击缩放
          const rect: DOMRect = this._content.getClientRects()[0]
          const pt: Point = new Point(
            evt.clientX - rect.left,
            evt.clientY - rect.top
          )
          const rectangle = new Rectangle(rect.x, rect.y, rect.width, rect.height)
          const inContent = rectangle.contains(new Point(evt.clientX, evt.clientY))
          this.toggleZoom(pt, inContent)

        }
        this.setCursor('grab')
        this.dragging.dragged = false
        this.updateDebug()

        break
    }
  }
  /**
   * 点击切换缩放
   * @param pt 图片中的相对坐标
   */
  toggleZoom(pt: Point, inContent = false) {
    const maxScale = this.maxScale
    const initScale = this._moobox.option('initScale')
    const currentScale = this.transform.scale
    let newScale = initScale
    console.log('toggleZOm...', currentScale, initScale)
    if (currentScale <= initScale && inContent) {
      console.log('zoomIn')
      this.setCursor('zoomout')
      // zoom in
      newScale =
        this.transform.scale > initScale + 0.5 * (maxScale - initScale)
          ? initScale
          : maxScale
    } else {
      console.log('zoomOut')
      this.setCursor('zoomin')
      newScale = initScale
      //reset center
      this.transform.x = 0
      this.transform.y = 0
      pt = new Point(0, 0)
    }
    if (epsilon(newScale) == epsilon(this.transform.scale)) {
      return
    }
    this.zoomTo(newScale, pt, { duration: 200 })
  }
  onZoomEnd() {
    console.log('zooEnd')

    //this.onPanToEnd()
  }

  /**
   * 如果当前的缩放值小于1，则无允许平移
   */
  canPan() {
    if (!this.transformAnimateRunning && this.transform.scale >= 1.005) {
      return true
    }
    return false
  }

  zoomTo(scale, pt: Point, option = { duration: 200 }) {
    //console.log('zoomTo', scale, pt.x, pt.y)
    const width = scale * this._size.width
    const height = scale * this._size.height
    const oldScale = this.transform.oldScale

    let offsetX = this.transform.oldX
    let offsetY = this.transform.oldY
    // offsetX = this.transform.x
    // offsetY = this.transform.y

    //const x = (pt.x - this._size.width / 2) * (1 - scale) - offsetX
    let centerX = this._size.width / 2 //- this.dragging.transform.x
    let centerY = this._size.height / 2 //- this.dragging.transform.y

    // pt.x -= this.dragging.transform.x / 2
    let x = (centerX + offsetX - pt.x) * (scale / oldScale) - (centerX - pt.x)
    let y = (centerY + offsetY - pt.y) * (scale / oldScale) - (centerY - pt.y)

    if (scale <= 1.005) {
      y = 0
      x = 0
    }
    this.setCursor('grab')
    //console.log('y===', y, scale)
    this.panTo(scale, new Point(x, y), option)
    // $.css(this._image, {
    //   'max-width': 'none',
    //   'max-height': 'none',
    //   transform: `translate3d(${x}px,${y}px,0px) scale(${scale})`,
    // })
    // const newTransform = { x, y, scale }
    // console.log('newTranform', newTransform)
    // this.transform.scale = scale
  }
  /**
   * 动画结束，更新历史位置
   */
  onPanToEnd() {
    this.transform.oldScale = this.transform.scale
    this.transform.oldX = this.transform.x
    this.transform.oldY = this.transform.y
    const viewPortWidth = this.viewPort.width;
    console.log("VW====", viewPortWidth)
    $.css(this.container, 'left', viewPortWidth * this.index)
    console.log("动画结束")
    if (!this.canPan()) {
      this.setCursor('zoomin')
    }
    this.updateDebug()
  }

  /**
   * 动画移动
   * @param scale
   * @param pt
   */
  panTo(scale: number, pt: Point, option?: any) {
    //console.log('scaleTo',scale)
    if (this.transformAnimateRunning) {
      return
    }
    // this.setTransform({ scale, x: pt.x, y: pt.y })
    // this.onPanToEnd()
    // return
    this.transformAnimateRunning = true
    if (!this.transformAnimate) {
      const opt: AnimateOption = {
        from: { ...this.transform },
        to: { scale, x: pt.x, y: pt.y },
        onUpdate: props => {
          this.transformAnimateRunning = true
          this.setTransform(props)
        },
        onComplete: props => {
          this.transform = { ...props }
          //console.log('动画完成', this.transform)
          this.transformAnimateRunning = false
          this.onPanToEnd()
        },
      }
      if (option && option.duration) {
        opt.duration = option.duration
      }
      //console.log('创建劝画:',opt)
      this.transformAnimate = Animate.create(opt)
      this.transformAnimate.start()
    } else {
      if (option && option.duration) {
        this.transformAnimate.option.duration = option.duration
      }
      this.transformAnimate.to({ scale, x: pt.x, y: pt.y })
    }
  }
  setTransform(transform) {
    const { x, y, scale } = transform
    $.css(this._image, {
      'max-width': 'none',
      'max-height': 'none',
      transform: `translate3d(${x}px,${y}px,0px) scale(${scale})`,
    })
    this.transform = { ...this.transform, ...transform }

    this.updateDebug()
    //this.onPanToEnd()
    //console.log('动画结束,tranform', this.transform)
  }
  updateMetrics(trigger: boolean = false) {
    return;
    const { x, y, scale } = this.transform
    $.css(this._image, {
      'max-width': 'none',
      'max-height': 'none',
      transform: `translate3d(${x}px,${y}px,0px) scale(${scale})`,
    })
    this.updateDebug()
  }
  updateDebug() {
    return
    const html = `
      <div>transform:${JSON.stringify(this.transform)}</div>
      <div>dragging:${JSON.stringify(this.dragging)}</div>
    `
    this._debug.innerHTML = html
  }
  /**
   * 创建节点
   * @param id
   * @param parent
   * @param tag
   * @returns
   */
  createNode(id: string, parent, tag: string = '') {
    const div = document.createElement(tag || 'div')
    if (id) {
      div.className = id
    }
    if (parent) {
      parent.appendChild(div)
    }
    return div
  }
  /**
   * 调整大小
   * @param width
   * @param height
   */
  resize(width: number, height: number) {
    this._size = new Rectangle(0, 0, width, height)
    const viewPort = this.viewPort;
    const toolbarHeight = this._moobox?.toolbar?.offsetHeight ?? 0;
    //console.log('top=====', viewPort, this._size)
    const top = toolbarHeight + this._viewPort.height / 2 - this._size.height / 2
    $.css(this._content, {
      width: this._size.width,
      height: this._size.height,
      top: top
    })
  }

  load(url: string) {
    this._url = url
    this._image.setAttribute('src', this._url)
  }

  updateViewPort(viewport) {
    this._viewPort = viewport
    const padding: Point = this._moobox.viewPortPadding.multiply(2)
    if (this._viewPort && this._viewPort.width && this._viewPort.height) {
      const newPort = this._viewPort.clone().subtract(padding)
      //const rect = this._originSize.scaleTo(this._viewPort, 'contain')
      const rect = this._originSize.scaleTo(newPort, 'contain')
      this.resize(rect.width, rect.height)
    }
    this._viewPort.x = this.viewPort.width / 2 - this._size.width / 2;
    this._viewPort.y = this.viewPort.height / 2 - this._size.height / 2// + toolbarHeight
    if (this._image && !this._originSize.isZero()) {
      $.css(this._image, {
        width: this._size.width,
        height: this._size.height,
      })
    }
    // let offset = this._size.x / 2 - this._viewPort.width / 2
    // console.log('offsetx', offset / 1.5)
    // offset = 100
    // let scale = 1.5
    // this.transform.oldScale = scale
    // this.transform.oldX = offset
    //this.dragging.offset.x = offset * (1 * scale)
    // this.setTransform({
    //   x: offset,
    //   y: 0,
    //   scale,
    // })
    this.updateMetrics()
  }

  setCursor(type: string) {
    ['zoomin', 'zoomout', 'grab', 'grabbing'].map(item => {
      this._content && $.removeClass(this._content, `cursor-${item}`)
    })
    this._content && $.addClass(this._content, `cursor-${type}`)
  }
  /**
   * 由当前图片自动生成scale
   */
  get maxScale() {
    if (this._image && !this._originSize.isZero()) {
      return (this._originSize.width / this._size.width) * 2
    }
    return this._moobox._option.maxScale || 1
  }

  get viewPort() {
    return this._viewPort
  }

  get container() {
    return this._container
  }
  reset() {
    this.updateViewPort(this._moobox.getViewPort())
    this.panTo(1, new Point(), { duration: 500 })
  }
  show() {
    //$.css(this._container, 'display', 'flex')
  }
  hide() {
    //$.css(this._container, 'display', 'none')
  }
}
