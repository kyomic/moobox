/**
 * see:https://zhuanlan.zhihu.com/p/387970197
 */
export const epsilon = (n: string | number, threshold: number = 1000) => {
  return (
    (n = (typeof n == 'number' ? n : parseFloat(n)) || 0),
    Math.round((n + Number.EPSILON) * threshold) / threshold
  )
}

/**
 * 防抖动
 * @param fn
 * @param delay
 * @param context
 * @returns
 */
export const debounce = (fn, delay, context?:unknown) => {
  let timer:any //借助闭包
  return function () {
    let args = arguments
    if (timer) {
      clearTimeout(timer)
    }
    const callback = () => {
      fn.apply(context, args)
    }
    timer = setTimeout(callback, delay) // 简化写法
  }
}

/**
 * 节流
 */
export const throttle = (fn, delay, content?:unknown) => {
  let timeout:any
  return function () {
    let context :any= content
    let args = arguments
    if (!timeout) {
      timeout = setTimeout(() => {
        timeout = null
        fn.apply(context, args)
      }, delay)
    }
  }
}

/**
 * 创建节点
 * @param id
 * @param parent
 * @param tag
 * @returns
 */
export const createNode = (id: string, parent, tag: string = '') => {
  const div = document.createElement(tag || 'div')
  if (id) {
    div.className = id
  }
  if (parent) {
    parent.appendChild(div)
  }
  return div
}
