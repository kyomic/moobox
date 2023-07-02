import { Emitter } from '../event'

type ImageTask = {
  url: string
  status: number
  callbacks: Array<(url: string) => void>
}
export class ImageLoader extends Emitter {
  /**
   * 设置缓冲偏移值，可以尝试往索引前进加载
   */
  private _bufferOffset: number = 0
  private _maxCacheLength: number = -1
  private _urls: string[]

  private _start: number = -1
  private _allTasks: Array<ImageTask> = []
  /**
   * 执行中任务
   */
  private _tasks: Array<ImageTask> = []
  constructor(
    urls: string[],
    opt: { maxCacheLength?: number; bufferOffset?: number } = {
      maxCacheLength: -1,
      bufferOffset: 0,
    }
  ) {
    super()
    this._urls = urls.concat()

    this._maxCacheLength = (opt.maxCacheLength ?? 0) <= 0 ? this._urls.length : (opt.maxCacheLength ?? 0)
    this._bufferOffset = opt.bufferOffset || 0
    /**
     * 所有任务
     */
    this._allTasks = this._urls.map(item => {
      return {
        url: item,
        status: 0,
        callbacks: [],
      }
    })
  }

  public set maxCacheLength(len: number) {
    this._maxCacheLength = len
    this.retry()
  }
  get maxCacheLength() {
    return this._maxCacheLength
  }

  load(url: string | number, callback?: (url: string) => void) {
    callback = callback || function (url: string) { }
    let index = -1
    let imageUrl: string = ''
    if (typeof url == 'string') {
      imageUrl = url
      index = this._urls.findIndex(item => item === url)
    } else {
      index = url
      imageUrl = this._urls[index]
    }
    if (index == -1 && typeof url == 'string') {
      // 找不到
      this._start = this._urls.length
      this._urls.push(imageUrl)
      this._allTasks.push({
        url: imageUrl,
        status: 0,
        callbacks: [callback],
      })
    } else {
      if (!imageUrl) {
        // 找不到图片，就从头开始
        this._start = 0
      } else {
        this._start = index
      }
    }
    this.updateTasks()
  }

  /**
   * 更新任务缓存
   */
  private updateTasks() {
    let idle = this._tasks.filter(item => {
      return !item.status
    })
    let canLoad = this.maxCacheLength - idle.length
    if (canLoad) {
      const offset = this._bufferOffset
      let tasks: Array<number> = []
      if (offset < 0) {
        // 从 _start 为中心，两边延展式加载
        const minStart = Math.max(0, this._start + offset)
        const maxStart = Math.min(offset + this._start, this._tasks.length - 1)
        tasks = [this._start]
        let i = 1
        while (true) {
          let current = this._start + i
          let prev = this._start - i
          if (tasks.length > this.maxCacheLength) {
            break
          }
          if (current <= maxStart) {
            tasks.push(current)
          }
          if (prev >= minStart) {
            tasks.push(prev)
          }
          i += 1
        }
      } else {
        const maxStart = Math.min(
          this._start + this.maxCacheLength,
          this._urls.length - 1
        )
        for (let i = this._start; i < maxStart; i++) {
          tasks.push(i)
        }
      }
      for (let i = 0; i < tasks.length; i++) {
        const task = this._allTasks[i]
        if (task) {
          if (task.status == 0) {
            // 准备加载
            task.status = 2
          }
        }
      }
      console.log('生成任务:', tasks)
    }
    this.retry()
  }
  /**
   * 重试加载
   */
  private retry() {
    if (this._start < 0) {
      // 还没开始
      return
    }
    let idle = this._allTasks.filter(item => item.status === 2)
    idle.map(item => {
      this.loadTask(item)
    })
  }
  private loadTask(task: ImageTask) {
    console.log(`加载任务:${task.url}`)
    const img: HTMLImageElement = document.createElement('img')
    img.addEventListener('error', (err) => {
      console.error(err)
    })
    img.addEventListener('load', () => { })
    img.setAttribute('src', task.url)
  }
}
