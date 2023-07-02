import { IToolbar, ToolBarItem } from '.'
import { Moobox } from '..'
import { Emitter, MoonEvent } from '../event'
import { createNode } from '../utils'
import Icon from './Icon'
import { Query as $ } from '../helper/query'
import fullapi from '../helper/fullscreen'

export default class MooboxToolbar extends Emitter implements IToolbar {
  public viewport: HTMLElement | null = null
  public moobox: Moobox | null = null;
  public navHeader: HTMLElement | null = null
  public navContainer: HTMLElement | null = null

  private _icons: Array<Icon> = []
  constructor(option: any = null) {
    super()

  }

  create() {
    if (this.moobox) {
      this.viewport = createNode('viewport', this.moobox.toolbar)
      this.navHeader = createNode('nav-header', this.viewport)
      this.navContainer = createNode('nav-container', this.viewport)
    }
    [MoonEvent.PLAY, MoonEvent.PAUSE].map(item => {

      this.moobox?.addEventListener(item, (evt: any) => {
        this.update()
      })
    });
    ['play', 'pause', 'fullscreen', 'fullscreen-exit', 'search', 'list', 'close'].map(item => {
      this.add({
        name: 'icon-' + item
      });
    })
    const play = this.navContainer?.querySelector('.icon-play')
    const pause = this.navContainer?.querySelector('.icon-pause')
    const list = this.navContainer?.querySelector('.icon-list')
    const full = this.navContainer?.querySelector('.icon-fullscreen')
    const fullexit = this.navContainer?.querySelector('.icon-fullscreen-exit')
    const close = this.navContainer?.querySelector('.icon-close')
    play?.addEventListener('click', () => {
      this.moobox?.autoplay()
    })
    pause?.addEventListener('click', () => {
      this.moobox?.autoplay(false)
    })
    list?.addEventListener('click', () => {
      this.moobox?.toggleList()
    })

    full?.addEventListener('click', async () => {
      await fullapi.fullscreen(this.moobox?.root as HTMLElement)
      this.update()
    })
    fullexit?.addEventListener('click', async () => {
      await fullapi.exit()
      this.update()
    })
    close?.addEventListener('click', () => {
      this.moobox?.close()
    })

    //this.onCreated()
    this.update()
  }

  set title(str: string) {
    if (this.navHeader) {
      this.navHeader.innerHTML = str;
    }
  }
  add(toolbar: ToolBarItem) {
    if (this.navContainer) {
      const icon = new Icon(this.navContainer, toolbar.name)
    }

  }
  remove(name: string) { }

  setup(moobox: Moobox) {
    this.moobox = moobox
    this.create()
  }

  redraw(): void {

  }
  update() {
    if (this.moobox) {
      const play = this.navContainer?.querySelector('.icon-play') as HTMLElement
      const pause = this.navContainer?.querySelector('.icon-pause') as HTMLElement
      const full = this.navContainer?.querySelector('.icon-fullscreen') as HTMLElement
      const fullexit = this.navContainer?.querySelector('.icon-fullscreen-exit') as HTMLElement
      [play, pause, full, fullexit].map(item => {
        item && $.hide(item)
      })
      if (this.moobox.isAutoPlay) {
        $.show(pause)
      } else {
        $.show(play)
      }
      if (fullapi.isFullScreen()) {
        $.show(fullexit)
      } else {
        $.show(full)
      }
    }
  }
}
