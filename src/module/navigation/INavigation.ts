import { Moobox } from '@/index'
import { IMoonModule } from '..'

export interface INavigation extends IMoonModule {
  highlight(index: number)
  get currentIndex(): number
  prev: () => Promise<any>
  next: () => Promise<any>

  setup(context: Moobox)
  redraw(): void

  reviseIndex(index: number): void
}
