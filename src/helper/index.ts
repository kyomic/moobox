import { Moobox } from '..'

export const MOOBOX_DOM_TAG = '[data-fancybox]'

/**
 * 将字符转成驼峰式
 * @example
 * camelCase('ab-xb')
 * // AbXb
 * @param str
 */
export const camelCase = (str: string) => {
  return str.replace(/-([a-z])/g, (matched, arg1) => {
    return arg1.toUpperCase()
  })
}

export const autoInstall = () => {
  console.log('auto install')
  const context = globalThis
  const install = (root: HTMLElement) => {
    const eles = root.querySelectorAll(MOOBOX_DOM_TAG)
    const images: string[] = []
    const thumbs: string[] = []
    for (let item of eles) {
      item.addEventListener('click', e => {
        e.stopImmediatePropagation()
        e.stopPropagation()
        e.preventDefault()
      })
      const thumb = item.querySelector('img')?.getAttribute('src')
      if (thumb) {
        thumbs.push(thumb)
        images.push(item.getAttribute('href') || '')
      }
    }
    const container = document.createElement('div')
    container.setAttribute('id', 'moobox-' + Math.floor(Math.random() * 1000))
    container.className = 'moobox'
    root.append(container)
    const moobox = new Moobox(container, {
      selectedIndex: 0,//images.length - 1,
      data: () => {
        return {
          images,
          thumbs,
        }
      },
      toolbar: new Moobox.Toolbar({}),
      navigation: new Moobox.ImageNavigation({
        maxCount: -1,
      }),
    })
  }
  if (context && context.document) {
    if (context.document.body) {
      install(context.document.body)
    } else {
      context.document.addEventListener('DOMContentLoaded', () => {
        install(context.document.body)
      })
    }
  } else {
    throw new Error('*** Moobox不支持当前环境 ***')
  }
}
