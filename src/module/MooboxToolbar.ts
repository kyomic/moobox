import { IToolbar, ToolBarItem } from '.'
import { Moobox } from '..'
import { Emitter } from '../event'
import { createNode } from '../utils'
import Icon from './Icon'

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
    ['play', 'fullscreen', 'fullscreen-exit', 'search', 'list', 'close'].map(item => {
      this.add({
        name: 'icon-' + item
      });
    })
    //this.onCreated()
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
}
