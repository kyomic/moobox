import { Moobox } from '@/index'
import { Emitter } from '@/event/Emitter'
import { createNode } from '@/utils'
import { INavigation } from './INavigation'
import { IMoonModule } from '..';
export class AbstractNavigation extends Emitter implements INavigation, IMoonModule {
  private _context: Moobox | null = null;
  protected _highlightIndex: number = -1
  public viewport: HTMLElement | null = null
  public scrollview: HTMLElement | null = null
  public pl: HTMLElement | null = null
  public pr: HTMLElement | null = null
  constructor(opt: any = null) {
    super()
  }

  setup(context: Moobox) {
    this._context = context
    this.create()
  }
  create() {
    if (this.moobox) {
      this.viewport = createNode('viewport', this.moobox.thumbs)
      this.scrollview = createNode('scrollview', this.viewport)
      this.pl = createNode('scrollview-pl', this.viewport)
      this.pr = createNode('scrollview-pr', this.viewport)
      createNode('shadow', this.pl)
      createNode('shadow', this.pr)
      this.onCreated()
    }

  }

  // 抽象函数
  onCreated() {
    // tobe override
  }
  render(delay: number = 0) {
    // tobe override
  }

  get currentIndex() {
    return this._highlightIndex
  }
  reviseIndex(index: number) {

  }
  redraw() { }
  get highlightIndex() {
    return this._highlightIndex
  }
  get moobox() {
    return this._context
  }
  highlight(index: number, delay: number = 0) {
    if (index != this._highlightIndex) {
      this._highlightIndex = index
      this.render(delay)
    }



  }
  async prev() { }
  async next() { }


}
