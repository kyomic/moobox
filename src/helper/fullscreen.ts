const getVendorObject = (name: string, context: any) => {
  context = context || globalThis
  const vendor = ['', 'moz', 'webkit', 'ms']
  const obj = vendor.map(item => {
    if (item) {
      name = name.replace(/^\w/, (key) => {
        return key.toString().toUpperCase()
      })
    }
    return context[item + name]
  }).find(item => !!item)
  return obj;
}
let api = {
  fullscreen: async (dom: HTMLElement) => {
    const func = getVendorObject('requestFullscreen', dom)
    try {
      await func.apply(dom)
    } catch (err) {
      alert(err)
    }

  },
  exit: async () => {
    const func = getVendorObject('exitFullscreen', document);
    try {
      await func.apply(document)
    } catch (err) { }
  },
  isFullScreen: () => {
    return !!getVendorObject('fullscreenElement', document)
  },
  /**
   * 是否支持全屏
   * @returns 
   */
  isSupport: () => {
    return !!getVendorObject('fullscreenEnabled', document)
  }
}
export default api;
