import { Moobox } from '..'

export const MOOBOX_DOM_TAG = '[data-moobox]'

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
  const eles = document.querySelectorAll(MOOBOX_DOM_TAG)
  for (let item of eles) {
    item.addEventListener('click', e => {
      e.stopImmediatePropagation()
      e.stopPropagation()
      e.preventDefault()
      const url = item.getAttribute('href') || ''
      lanuch(document.body, url)
    })
  }
  const lanuch = (root: HTMLElement, current: string) => {
    const images: string[] = []
    const thumbs: string[] = []
    const eles = document.querySelectorAll(MOOBOX_DOM_TAG)
    for (let item of eles) {
      images.push(item.getAttribute('href') || '')
      thumbs.push(item.querySelector('img')?.getAttribute('src') || '')
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
    moobox.open({
      url: current
    })
  }

}
