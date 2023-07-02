import { Emitter, MoonEvent } from '@/event'
import { createNode, debounce, throttle } from '@/utils'
import { AbstractNavigation } from './AbstractNavigation'
import { Query as $ } from '@/helper/query'
import { Animate, AnimateOption } from '@/helper/animate'

const isMacWebkit =
  navigator.userAgent.indexOf('Macintosh') !== -1 &&
  navigator.userAgent.indexOf('WebKit') !== -1

export type ImageNavigationOption = {
  maxCount?: number
  minWidth?: number
  maxWidth?: number
}

export class ImageTrack extends Emitter {
  public track: HTMLElement
  public url: string
  public image: HTMLElement
  public selected: boolean = false;
  constructor(root: HTMLElement, url: string) {
    super()
    this.track = createNode('track', root)
    this.url = url
    this.image = createNode('img', this.track)
    $.css(this.image, {
      'background-image': `url(${this.url}`,
    })
    this.track.addEventListener('click', () => {
      this.dispatch('click')
    })
  }
  get container() {
    return this.track
  }
  setSelected(bol: boolean) {
    this.selected = bol;
    if (bol) {
      $.addClass(this.track, 'track-selected')
    } else {
      $.removeClass(this.track, 'track-selected')
    }
  }
}
export class ImageNavigation extends AbstractNavigation {
  static generateDefaultOption() {
    return {
      maxCount: -1,
      maxWidth: 100,
    }
  }
  /**
   * 左右的同间距，用于显示上一页，下一页
   */
  static PADDING: number = 15
  changedDelta: number = 0
  private _options: ImageNavigationOption = ImageNavigation.generateDefaultOption()
  /**
   * 所有缩略图
   */
  private _tracks: Array<ImageTrack> = []
  /**
   * 选中当前节流
   */
  private _currentDebounce
  private _wheelThrottle
  private _wheelDebounce
  transform = {
    index: 0
  }
  transformAnimate: Animate | null = null
  transformAnimateRunning: boolean = false
  private dragging = {
    virualOffsetX: 0,
    virualOffsetY: 0
  }
  constructor(opt: ImageNavigationOption = ImageNavigation.generateDefaultOption()) {
    super()
    this._options = Object.assign(
      Object.assign(
        {},
        ImageNavigation.generateDefaultOption(),
        opt || {}
      )
    )
    //this._options.maxCount = 5
  }

  onCreated() {
    if (!this.moobox) {
      return;
    }
    this._wheelThrottle = throttle(this.onWheel, 300, this)
    this._wheelDebounce = debounce(this.onWheelEnd, 100, this)

    const datas = this.moobox.getData()
    const arr = datas.thumbs || datas.images
      ; (arr || []).map((item, idx) => {
        if (this.scrollview) {
          const track = new ImageTrack(this.scrollview, item)
          track.addEventListener('click', () => {
            this.moobox?.setSelectedIndex(idx)
          })
          this._tracks.push(track)
        }

      })
    if (this.pl && this.pr) {
      $.css(this.pl, {
        width: ImageNavigation.PADDING,
      })

      $.css(this.pr, 'width', ImageNavigation.PADDING)
    }
    if (this.viewport) {
      this.viewport.addEventListener('wheel', (e: any) => {
        const evt = e as Event
        // 阻止页面内容的滚动
        evt.stopPropagation()
        evt.stopImmediatePropagation()
        evt.preventDefault()
        if (this.transformAnimateRunning) {
          //return
        }
        // mac 的delta更敏感
        let deltaX = e.deltaX * -30 || e.wheelDeltaX / 4 || 0
        let deltaY = e.deltaY * -30 || e.wheelDeltaY / 4 || 0
        if (isMacWebkit) {
          deltaX /= 30
          deltaY /= 30
        }


        const delta = Math.max(
          -1,
          Math.min(1, -e.deltaX || e.wheelDelta || -e.detail)
        )

        let velocity = Math.min(20, Math.abs(deltaX)) / 15;
        velocity = (100 + velocity * 40) / 100
        const index = this.transform.index;
        const newIndex = delta > 0 ? velocity : -velocity
        this.highlightTo(newIndex, velocity)

        //this._wheelThrottle(delta)
        // this._wheelDebounce(this)
      })
    }

    this.render(0, false)
  }
  onWheel(delta) {
    let index = this.highlightIndex
    if (delta > 0) {
      index += 1
    } else {
      index -= 1
    }
    index = Math.min(this._tracks.length - 1, Math.max(0, index))
    this.highlight(index)
  }
  onWheelEnd(delta) {
    this.moobox?.setSelectedIndex(this.highlightIndex)
  }

  /**
   * 得到最大，最小 水平坐标
   */
  getMinMax() {
    let minX = 0, maxX = 0;
    // 是否全屏显示slider(占满整个屏宽)
    const optionMaxCount = this._options.maxCount || 0
    const isFullSlider = optionMaxCount < 0
    const minWidth = this._options.minWidth ?? 60

    const maxWidth = this._options.maxWidth ?? minWidth
    // fix: 去除3px内间距
    const padding = isFullSlider ? 0 : ImageNavigation.PADDING - 3
    const scrollWidth = (this._tracks.length - 1) * minWidth + maxWidth

    if (this.moobox) {
      const viewPortWidth = this.moobox.getViewPort().width
      const maxCount = Math.min(
        optionMaxCount,
        Math.floor(viewPortWidth / minWidth - 1)
      )
      /**
       * 当前slider 的宽度
       */
      let width =
        maxCount > 0 ? (maxCount - 1) * minWidth + maxWidth : viewPortWidth
      maxX = padding;
      minX = -scrollWidth + width + padding

    }
    return {
      minX,
      maxX
    }
  }

  offsetToIndex(offset: number) {
    const minWidth = this._options.minWidth ?? 60
    const maxWidth = this._options.maxWidth ?? minWidth
    let halfWidth = Math.max(minWidth, maxWidth) / 2
    const viewPortWidth = this.moobox ? this.moobox.getViewPort().width : 0
    /**
       * 当前slider 的宽度
       */
    let width = viewPortWidth
    let index = (-offset + width / 2 - halfWidth) / minWidth
    this.highlight(Math.floor(index))
  }

  highlightTo(offset, velocity) {
    if (this.transformAnimateRunning) {
      return
    }
    this.transformAnimateRunning = true
    const nextIndex = offset + this._highlightIndex
    if (Math.abs(nextIndex - this.transform.index) < 0.01) {
      setTimeout(() => {
        this.transformAnimateRunning = false;
      }, 300)
      return
    }
    if (!this.transformAnimate) {
      const opt: AnimateOption = {
        duration: 150,
        from: { index: this.transform.index },
        to: { index: nextIndex },
        onUpdate: props => {
          this.transformAnimateRunning = true;
          let index = Math.round(props.index)
          index = Math.min(Math.max(index, 0), this._tracks.length - 1)
          //console.log('更新属性:', props)
          this.moobox?.switchIndex(index)
        },
        onComplete: props => {
          this.transform = { ...props }
          this.transformAnimateRunning = false
          let index = Math.round(props.index)
          index = Math.min(Math.max(index, 0), this._tracks.length - 1)
          console.log('动画结束')
          this.moobox?.switchIndex(index)
          this.highlight(index, 300)

        },
      }

      this.transformAnimate = Animate.create(opt)
      this.transformAnimate.start()
    } else {
      this.transformAnimate.to({ index: offset + this._highlightIndex })
    }
  }
  // panTo( offset:number ){
  //   if( this.scrollview){
  //     const x = $.pixelNumber($.css(this.scrollview,'left'))

  //     const minmax = this.getMinMax();
  //     console.log('minmx',minmax)
  //     this.dragging.virualOffsetX += offset
  //     this.offsetToIndex(this.dragging.virualOffsetX)
  //     const newx = Math.max(Math.min(minmax.maxX,offset+x), minmax.minX)

  //     $.css(this.scrollview, {
  //       left: newx,
  //     })
  //   }
  // }
  render(delay = 0, updateMoon: boolean = true) {

    // 是否全屏显示slider(占满整个屏宽)
    const optionMaxCount = this._options.maxCount || 0
    const isFullSlider = optionMaxCount < 0
    const minWidth = this._options.minWidth ?? 60
    const maxWidth = this._options.maxWidth ?? minWidth
    // fix: 去除3px内间距
    const padding = isFullSlider ? 0 : ImageNavigation.PADDING - 3
    const scrollWidth = (this._tracks.length - 1) * minWidth + maxWidth
    this._tracks.map((item, index) => {
      if (index === this.highlightIndex) {
        item.setSelected(true)
        if (updateMoon) {
          this.moobox?.switchIndex(index)
        } else {
          this.moobox?.updateIndex(index)
        }

      } else {
        item.setSelected(false)
      }
      $.css(item.container, 'width', minWidth)
    })

    this._currentDebounce = debounce(() => {
      const current = this._tracks[this.highlightIndex]
      if (current) {
        $.css(current.container, 'width', maxWidth)
      }
    }, delay, this)()


    if (this.moobox) {
      const viewPortWidth = this.moobox.getViewPort().width
      const maxCount = Math.min(
        optionMaxCount,
        Math.floor(viewPortWidth / minWidth - 1)
      )

      /**
       * 当前slider 的宽度
       */
      let width =
        maxCount > 0 ? (maxCount - 1) * minWidth + maxWidth : viewPortWidth

      // 中心点坐标
      const centerX = this.moobox.getViewPort().width / 2

      let halfWidth = Math.max(minWidth, maxWidth) / 2
      let offsetX = centerX - this.highlightIndex * minWidth - halfWidth
      offsetX = -this.highlightIndex * minWidth + width / 2 - halfWidth
      offsetX += padding
      // 锁定offsetX
      offsetX = Math.min(padding, offsetX)
      offsetX = Math.max(-scrollWidth + width + padding, offsetX)
      const minOffsetX = 0
      if (this.scrollview) {
        $.css(this.scrollview, {
          width: scrollWidth,
          left: offsetX,
        })
      }

      let containerOffsetX = viewPortWidth / 2 - width / 2 - padding
      width += padding * 2
      if (isFullSlider) {
        width = this.moobox.getViewPort().width
      }
      if (this.viewport) {
        $.css(this.viewport, {
          //width: `width:${width}px`,
          transform: `translate3d(${containerOffsetX}px, 0px, 0px) scale(1)`,
          width: width,
        })
        $.removeClass(this.viewport, 'viewport-mini')
        if (!isFullSlider) {
          $.addClass(this.viewport, 'viewport-mini')
        }
      }

    }
    if (isFullSlider) {
      if (this.pr && this.pl) {
        $(this.pr).hide()
        $(this.pl).hide()
      }
    }
  }

  redraw(): void {
    this.render()
  }


  async next() {
    this._highlightIndex += 1;
    this.moobox?.switchIndex(this._highlightIndex)
    this.render()

  }
  async prev() {
    this._highlightIndex -= 1;
    this.moobox?.switchIndex(this._highlightIndex)
    this.render()
  }

  /**
   * 修正hightIndex(navigation到边界了)
   * @param index 
   */
  reviseIndex(index: number) {
    this._highlightIndex = index;
    this.render(0, false)
  }
  get options() {
    return this._options
  }
}
