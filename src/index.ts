import { emptyStyle, Query as $ } from './helper/query'
import { AbstractNavigation } from '@/module/navigation/AbstractNavigation'
import { ImageNavigation } from '@/module//navigation/ImageNavigation'
import { INavigation } from '@/module/navigation/INavigation'
import { Rectangle, Point } from './gemo/index'
import './assets/style/global.less' // 项目样式
import { Emitter, MoonEvent } from './event/index'
import { Events } from './event/Events'
import { createNode, debounce, epsilon } from './utils'
import MooboxImageTracker from '@/module/MooboxImageTracker'
import MooboxToolbar from './module/MooboxToolbar'
import { ImageLoader } from './helper/loader'
import { IMoonModule, IToolbar } from './module'
import ResizeWatcher from './helper/ResizeWatcher'
import { Animate, AnimateOption } from './helper/animate'

export type MooboxData = {
  images: Array<string>
  thumbs?: Array<string>
}
export type MooboxOption = {
  /**
   * Moobox数据
   */
  data?: MooboxData | (() => MooboxData) | (() => Promise<MooboxData>)
  /**
   * 是否允许全屏
   */
  allowFullScreen?: boolean
  /**
   * 是否开启缩放
   */
  zoom?: boolean
  initScale?: number
  minScale?: number
  maxScale?: number
  /**
   * 缩放的阀值
   */
  zoomStep?: number
  wheelFactor?: number
  wheelLimit?: number

  /**
   * 配置迷你导航模块
   */
  navigation?: INavigation
  toolbar?: IToolbar
  selectedIndex?: number
  width?: number
  height?: number
  ratio?: number
}

export class Moobox extends Emitter {
  static ImageNavigation = AbstractNavigation
  static Toolbar = MooboxToolbar

  container: HTMLElement | null = null
  _initialzed: boolean = false
  /**
   * 顶部工具
   */
  toolbar: HTMLElement | null = null
  imageviewer: HTMLElement | null = null
  /**
   * 中间内容区
   */
  viewport: HTMLElement | null = null
  nav: HTMLElement | null = null
  /**
   * 缩略图
   */
  thumbs: HTMLElement | null = null
  /**
   * viewport中的 图片展示模块
   */
  track: HTMLElement | null = null

  /**
   * Moobox所在的根节点
   */
  root: HTMLElement
  /**
   * 默认选中的项
   */
  _selectedIndex = 0
  _option: MooboxOption
  _data: MooboxData = Moobox.generateDefaultConfig()
  _oldTracker: MooboxImageTracker | null = null;
  $content: any

  tracks: Record<string, MooboxImageTracker> = {}
  buffer: ImageLoader | unknown

  transformAnimate: Animate | null = null
  transformAnimateRunning: boolean = false
  _debounceAni;
  _debounceResize;
  resizeObject;

  evtOnWheel
  evtOnMoon
  /** 
   * track dom event
   */
  evtOnTrack
  evtOnResize

  /**
   * 动画初始值
   */
  transform = { x: 0, dragstart: new Point(), dragstartTime: new Date().valueOf() }

  containerBox = {
    width: 0,
    height: 0,
  }
  viewportBox = {
    width: 0,
    height: 0,
  }
  /**
   * 内容数据配置
   */
  content: any = {
    origWidth: 0,
    origHeight: 0,
    width: 0,
    height: 0,
    x: 0,
    y: 0,
    scale: 0,
    fitWidth: 0,
    fitHeight: 0,
  }

  progress: HTMLElement | null = null;
  /**
   * 自动播放控制
   */
  _autoplayTimerId: any
  _autoplay: boolean = false;
  _autoplayDuration: number = 0


  constructor(target: HTMLElement, options: MooboxOption) {
    super()
    if (!target) {
      throw new Error('*** 构造时请配置Moobox的父容器 ***')
    }
    this._option = Object.assign(options || {}, Moobox.generateDefaultConfig())

    this.content.scale = this._option.initScale
    this.root = target

    if (typeof this._option.data == 'object') {
      this._data = this._option.data
    } else {
      const callback = this._option?.data;
      if (typeof callback == 'function') {
        this._data = callback() as MooboxData
      } else {
        // try{
        //   this._data = await (callback as Promise<unknown>)() as MooboxData
        // }catch(err){

        // }
      }

    }




  }


  static generateDefaultConfig() {
    return {
      initScale: 1,
      minScale: 1,
      maxScale: 2,
      zoomStep: 0.5,
      wheelFactor: 42,
      //wheelFactor: 10,
      wheelLimit: 5,

      zoom: true,
      ratio: 1,
      images: []
    }
  }

  open(opt) {
    opt = opt || { index: 0 }
    let index = opt.index;
    if (opt.url) {
      index = this._data.images.findIndex(item => {
        return item === opt.url;
      })
    }
    if (!index || index < 0) index = 0;
    this._selectedIndex = index;
    this.initialize()
  }
  close() {
    this.destroy()

  }

  create() {
    // container -> viewport -> track -... tracks
    this.container = createNode('container', this.root)

    /** 主体结构 */
    this.toolbar = createNode('toolbar', this.container)
    this.progress = createNode('progress', this.container)
    this.imageviewer = createNode('imageviewer', this.container)
    this.viewport = createNode('viewport', this.imageviewer)
    this.nav = createNode('nav', this.imageviewer)
    this.nav.innerHTML = `
     <div class="icon icon-left">
       <svg class="svg-icon" style="width:35px; height:35px;">
         <use xlink:href="#icon-left" fill="#CCCCCC"></use>
       </svg>
     </div>
     <div class="icon icon-right">
         <svg class="svg-icon" style="width: 35px; height:35px;">
         <use xlink:href="#icon-right" fill="#CCCCCC"></use>
       </svg>
     </div>
     `
    this.thumbs = createNode('thumbs', this.container)
    /** 创建 viewport中相关组件 */
    this.track = createNode('track', this.viewport)
  }
  async initialize() {
    if (this._initialzed) {
      return
    }
    this.create()

    /**
     * 配置默认缓存为10张图片
     */
    this.buffer = new ImageLoader(this._data.images, { maxCacheLength: 10 })
    this.evtOnWheel = this.onWheelEvent.bind(this)
    this.evtOnMoon = this.onMoonBoxEvent.bind(this)
    this.evtOnTrack = this.onTrackEvent.bind(this)
    this.evtOnResize = this.onResizeEvent.bind(this)
    if (this.nav) {
      $(this.nav).delegate('.icon-left', 'click', () => {
        this.prev();
      })
      $(this.nav).delegate('.icon-right', 'click', () => {
        this.next();
      })
    }
    this.resizeObject = new ResizeWatcher()
    this.resizeObject.addEventListener('resize', this.evtOnResize)
    this.resizeObject.observe(this.root)

    this.attachEvent()
    if (this.buffer) {
      (this.buffer as ImageLoader).load(0)
    }

    this.setSelectedIndex(this._selectedIndex)

    // 初始化插件模块
    if (this.track) {
      const viewPort = this.getViewPort()
      // this.tracks = Array.from({ length: 3 }).map(item => {
      //   const track = new MooboxImageTracker(
      //     this,
      //     this.track as HTMLElement,
      //     {
      //       width: 100,
      //       height: 200
      //     },
      //     viewPort
      //   )
      //   return track;
      // })
      this.tracks = {};
      this.updateTracks()
    }

    if (this._option.navigation) {
      this._option.navigation.setup(this)
    }
    if (this._option.toolbar) {
      this._option.toolbar.setup(this)
    }
    this.setCursor('grab')
    this.update()

  }

  option(name: string, initValue?: any) {
    const isFunction = typeof this._option[name] == 'function'
    if (isFunction) {
      return this._option[name].call(this)
    }
    return this._option[name] || initValue
  }

  private attachEvent() {
    ;[MoonEvent.ZOOM_WHEEL, MoonEvent.RESIZE, MoonEvent.PAN_END].map(type => {
      this.addEventListener(type, this.onMoonBoxEvent)
    })
    this.track?.addEventListener('mousedown', this.evtOnTrack)
  }

  onWheelEvent(evt: any) {
    this.dispatch(new MoonEvent(MoonEvent.ZOOM_WHEEL, { originEvent: evt }))
  }

  onMoonBoxEvent(evt: Events) {
    const type = typeof evt == 'string' ? evt : evt.type
    //console.log('evt===', evt)
    switch (type) {
      case MoonEvent.ZOOM_WHEEL:
        //this.currentTracker.zoomIn
        break
      case MoonEvent.RESIZE:
        if (this._option.navigation) {
          this._debounceResize = debounce(() => {
            for (let key in this.tracks) {
              try {
                const track = this.tracks[key];
                const viewPortWidth = this.getViewPort().width


                track.updateViewPort(this.getViewPort())
                if (track.index != this._selectedIndex) {
                  $.css(track.container, 'left', viewPortWidth * track.index)
                }

                // 更新track位置 
                this.transform.x = -viewPortWidth * this._selectedIndex
                this.update()
              } catch (err) { }
            }
            const navigation = this._option.navigation
            navigation && navigation.redraw()
          }, 300, this)()

        }
        break;
      case MoonEvent.PAN_END:
        if (this._autoplay) {
          this.autoplay(true)
        }
        break;
    }
  }
  onTrackEvent(evt: MouseEvent) {
    const viewPortWidth = this.getViewPort().width
    const currentPos = - this._selectedIndex * viewPortWidth
    let offset = new Point()
    switch (evt.type) {
      case 'mousedown':
        if (this.currentTracker && this.currentTracker.canPan()) {
          // 当前track正处理放大平移状态，阻止 moobox的翻页功能
          return
        }
        if (this.currentTracker) {
          this.currentTracker.setCursor('')
        }
        this.transform.dragstart = new Point(evt.clientX, evt.clientY)
        this.transform.dragstartTime = new Date().valueOf()
        document.addEventListener('mouseup', this.evtOnTrack)
        document.addEventListener('mousemove', this.evtOnTrack)
        break
      case 'mousemove':
        this.setCursor('grabbing')
        offset = new Point(
          evt.clientX - this.transform.dragstart.x,
          evt.clientY - this.transform.dragstart.y
        )
        this.transform.x = currentPos + offset.x;
        this.update()
        break
      case 'mouseup':
        this.setCursor('grab')
        offset = new Point(
          evt.clientX - this.transform.dragstart.x,
          evt.clientY - this.transform.dragstart.y
        )
        let willSwapp = Math.abs(offset.x) > viewPortWidth / 3
        const speed = Math.abs(offset.x) / (new Date().valueOf() - this.transform.dragstartTime)
        if (speed > 0.6) {
          willSwapp = true
        }
        if (willSwapp) {
          if (offset.x < 0) {
            this.next();
          } else {
            this.prev()
          }
        } else {
          this.panTo(new Point(currentPos, 0))
        }

        document.removeEventListener('mouseup', this.evtOnTrack)
        document.removeEventListener('mousemove', this.evtOnTrack)
        break
    }
  }

  onResizeEvent(e) {
    this.dispatch(new MoonEvent(MoonEvent.RESIZE, e))
  }
  /**
   * 当前的Moobox 的应用宽度
   * @returns
   */
  getViewPort(): Rectangle {
    if (this.viewport) {
      this.viewport = this.viewport as HTMLElement
      const bound = this.viewport.getBoundingClientRect()
      return new Rectangle(
        0,
        0,
        bound.width, bound.height
        // this.viewport.offsetWidth,
        // this.viewport.offsetHeight
      )
    } else {
      return new Rectangle()
    }
  }

  get viewPortPadding() {
    return new Point(100, 30);
  }

  zoomIn(scale) {
    this.zoomTo(this.content.scale + (scale || this._option.initScale || 1))
  }

  zoomTo(scale: number, pt: Point = new Point()) {
    if (!isNaN(scale) || !Number.isFinite(scale)) {
      scale = this._option.initScale || 1
    }
    scale = Math.max(
      this._option.minScale || 1,
      Math.min(scale, this.option('maxScale'))
    )
    scale = epsilon(scale)
  }

  getZoomDelta(scale, x = 0, y = 0) {
    var e = x,
      i = y,
      n = this.content.fitWidth * this.content.scale,
      o = this.content.fitHeight * this.content.scale,
      a = e > 0 && n ? e / n : 0,
      s = i > 0 && o ? i / o : 0,
      r = this.content.fitWidth * scale,
      l = this.content.fitHeight * scale
    const deltaX = (r - n) * a
    const deltaY = (l - o) * s
    return {
      deltaX,
      deltaY,
    }
  }


  /**
   * 选中一个图片
   * @param index
   */
  setSelectedIndex(index: number) {
    if (this._option.navigation) {
      this._option.navigation.highlight(index)
    }
    if (this._option.toolbar) {
      this._option.toolbar.title = `${index + 1} / ${this._data.images.length}`
    }
  }

  next() {
    const navigation = this._option.navigation;
    if (navigation) {
      navigation.next()
    }
  }
  prev() {
    const navigation = this._option.navigation;
    if (navigation) {
      navigation.prev()
    }
  }
  /**
   * 直接的方式更新index
   * @param index 
   */
  updateIndex(index: number) {
    // this._selectedIndex = index;
    // if (this._option.toolbar) {
    //   this._option.toolbar.title = `${this._selectedIndex + 1} / ${this._data.images.length}`
    // }
  }
  /**
   * 动画的方式修改当前选中项
   * @param index 
   */
  switchIndex(index: number) {
    const needTween = index != this._selectedIndex

    this._selectedIndex = index;
    const maxIndex = this.trackCount - 1
    const minIndex = 0
    if (this.track) {
      if (this._oldTracker) {
        this._oldTracker.reset();
      }
      const current = this.currentTracker;
      this._oldTracker = current;

      const viewWidth = this.getViewPort().width
      const prev = (index - 1) < 0 ? maxIndex : (index - 1)
      const next = (index + 1) > maxIndex ? minIndex : (index + 1)


      for (let i in this.tracks) {
        this.tracks[i].hide();
      }
      const frames = [this.prevTracker, current, this.nextTracker]
      const length = frames.length;
      frames.map((item, i) => {
        if (item) {
          item.show()

          if (i == 0) {
            // item.load(this._data.images[prev])
          } else if (i == 1) {
            // item.load( this._data.images[index])
          } else {
            //item.load(this._data.images[next])
          }
          // if( i==0){
          //   item.load( this._data.images[index])
          // }
          const container = item.container;

          let left = item.index * viewWidth
          console.log('vw==', viewWidth)
          $.css(container, 'left', left)
        }
      })

    }
    const viewPortWidth = this.getViewPort().width


    this.transformAnimateRunning = true
    if (!needTween) {
      return
    }
    console.log('目标位置：', -index * viewPortWidth, '当前位置 :', this.transform.x)

    let x = -viewPortWidth * index
    if (Math.abs(x - this.transform.x) <= 0.01) {
      return
    }
    const opt: AnimateOption = {
      duration: 1000,
      from: { x: this.transform.x },
      to: { x },
      onUpdate: props => {
        this.transformAnimateRunning = true;
        this.transform = { ...this.transform, ...props }
        this.update();
      },
      onComplete: props => {
        this.transform = { ...this.transform, ...props }
        this.transformAnimateRunning = false
        this.update()
        this.updateTracks()

        this.dispatch(MoonEvent.PAN_END)
        let index = this._option.navigation?.currentIndex ?? 0;
        if (index < minIndex || index > maxIndex) {
          // 自动切换头和尾索引
          if (index < minIndex) index = maxIndex;
          if (index > maxIndex) index = minIndex;
          // 到边界了
          this._option.navigation?.reviseIndex(index)
          // 直接修正x
          this.transform.x = - index * viewPortWidth
          this.update()
        }


      },
    }

    this.transformAnimate = Animate.create(opt)
    this.transformAnimate.start()

  }

  panTo(pt: Point) {
    this.transformAnimateRunning = true
    const viewWidth = this.getViewPort().width

    const opt: AnimateOption = {
      duration: 1000,
      from: { x: this.transform.x },
      to: { x: pt.x },
      onUpdate: props => {
        this.transformAnimateRunning = true;
        this.transform = { ...this.transform, ...props }
        this.update();
      },
      onComplete: props => {
        this.transform = { ...this.transform, ...props }
        this.transformAnimateRunning = false
        this.update()
        this.updateTracks()
      },
    }

    this.transformAnimate = Animate.create(opt)
    this.transformAnimate.start()
  }
  /**
   * 更新重绘
   */
  update() {
    if (this._option.toolbar) {
      this._option.toolbar.title = `${this._selectedIndex + 1} / ${this._data.images.length}`
    }
    const x = this.transform.x;
    if (this.track) {
      $.css(this.track, {
        'transform': `translate3d(${x}px, 0px, 0px) scale(1)`
      })
    }
    if (!this._autoplay) {
      this.progress && (this.progress && (this.progress.style.cssText = `width:0%;transition:none;`))
    }

  }
  updateTracks() {
    const frames = [this.prevTracker, this.currentTracker, this.nextTracker]
    const length = frames.length;
    const index = this._selectedIndex
    const maxIndex = this._data.images.length - 1
    const minIndex = 0
    const viewWidth = this.getViewPort().width;
    //debugger

    frames.map((item, i) => {
      if (item) {
        const prev = (index - 1) < 0 ? maxIndex : (index - 1)
        const next = (index + 1) > maxIndex ? minIndex : (index + 1)
        // if (i == 0) {
        //   item.load(this._data.images[prev])
        // } else if (i == 1) {
        //   item.load(this._data.images[index])
        // } else {
        //   item.load(this._data.images[next])
        // }
        // if( i==0){
        //   item.load( this._data.images[index])
        // }
        const loadIndex = item.index < 0 ? maxIndex : (item.index > maxIndex ? 0 : item.index)
        item.load(this._data.images[loadIndex])
        const container = item.container;

        //let left = (index - 1) * viewWidth + i * viewWidth
        let left = item.index * viewWidth
        $.css(container, 'left', left)
      }
    })

  }
  getData() {
    return this._data
  }
  setCursor(type: string) {
    ['grab', 'grabbing'].map(item => {
      this.track && $.removeClass(this.track, `cursor-${item}`)
    })
    this.track && $.addClass(this.track, `cursor-${type}`)
  }
  swapTop(bol: boolean = true) {
    if (this.imageviewer) {
      if (bol) {
        $.css(this.imageviewer, 'z-index', 100)
      } else {
        $.css(this.imageviewer, 'z-index', '')
      }
    }
  }

  autoplay(bol: boolean = true) {
    this._autoplay = bol
    clearInterval(this._autoplayTimerId);
    if (bol) {
      const duration = 2 * 1000;
      const step = 100;
      this._autoplayTimerId = setInterval(() => {
        if (this._autoplayDuration > duration) {
          this._autoplayDuration = 0;
          clearInterval(this._autoplayTimerId)
          this.next();
          // this._autoplayDuration = 0
          // this.progress && (this.progress.style.cssText = `width:0%;transition:none;`)
          return
        }

        this._autoplayDuration += step;
        const scale = this._autoplayDuration / duration * 100
        if (this.progress) {
          this.progress.style.cssText = `width:${scale}%`
        }

      }, step)
    }

    if (this._autoplay) {
      this.dispatch(new MoonEvent(MoonEvent.PLAY, {}))
    } else {

      this.dispatch(new MoonEvent(MoonEvent.PAUSE, {}))
    }
    this.update()

  }
  get isAutoPlay() {
    return this._autoplay
  }
  toggleList() {
    if (this.thumbs) {
      $.toggleVisible(this.thumbs);
    }
    this.update()
    // 这块不能放到update
    if (this.currentTracker) {
      this.currentTracker.reset()
    }
  }
  /**
   * 图片数据个数
   */
  get trackCount() {
    return this._data.images.length;
  }
  genernateTrack(index) {
    // if (index <= -2) {
    //   // 处理边界问题
    //   index = this._data.images.length - 1;
    // }
    // index = Math.max(0, index);
    // index = Math.min(0, this._data.images.length - 1);
    let track = this.tracks[index] || new MooboxImageTracker(
      this,
      this.track as HTMLElement,
      {
        // width: 100,
        // height: 200
      },
      this.getViewPort()
    )
    // 设置索引
    track.index = index;
    this.tracks[index] = track;
    return track;
  }
  get currentTracker() {
    return this.genernateTrack(this._selectedIndex)
  }
  get prevTracker() {
    return this.genernateTrack(this._selectedIndex - 1)
  }
  get nextTracker() {
    return this.genernateTrack(this._selectedIndex + 1)
  }
  destroy() {
    if (this.resizeObject) {
      this.resizeObject.removeEventListener('resize', this.evtOnResize)
      this.resizeObject.unobserver(this.root);
      this.resizeObject = null;
    }
    console.log('root===', this.root)
    this.root.parentNode?.removeChild(this.root)
    this.autoplay(false)
  }
}
Moobox.Toolbar = MooboxToolbar
Moobox.ImageNavigation = ImageNavigation
