import { camelCase } from '.'
export const vendorCssPrefixes = ['Webkit', 'Moz', 'ms']
export const emptyStyle = document.createElement('div').style
let pnumber = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source
let rcssnumber = new RegExp('^(?:([+-])=|)(' + pnumber + ')([a-z%]*)$', 'i')
/**
 * 轻量的类jquery,处理简单的dom事件
 */
export const QueryUtils = {
  /**
   * 有些CSS Props需要转义
   * @param name
   */
  getCssProps(name: string) { },
}
export class QueryInstance {
  selector: string = ''
  context: HTMLElement
  element: HTMLElement | null = null
  constructor(selector: string, context: HTMLElement) {
    this.selector = selector
    this.context = context || document.body
    if (selector) {
      this.element = this.context.querySelector(selector)
    }
  }
  show() {
    if (this.element) {
      Query.css(this.element, 'display', 'block')
    }

  }
  hide() {
    if (this.element) {
      Query.css(this.element, 'display', 'none')
    }

  }
  delegate(selector: string, type: string, handler: () => void) {
    if (this.element) {
      this.element.addEventListener(type, (e: Event) => {
        let node = e.target as HTMLElement
        const ele = this.element?.querySelector(selector);
        let find = false;

        console.log('node', node, ele)
        while (true) {
          if (!ele) {
            break;
          }
          if (!node) {
            break;
          }

          if (node === ele) {
            find = true;
            break;
          } else {
            node = node.parentNode as any;
          }
        }
        if (find) {
          handler();
        }
      })
    }
  }
  on(type: string, handler: () => void) { }
}

const Query = (
  seletor: string | HTMLElement | QueryInstance,
  context?: HTMLElement
) => {
  if (typeof seletor == 'string') {
    return new QueryInstance(seletor, context as any)
  } else {
    const target: any = seletor
    if (target && target.nodeType) {
      let instance = new QueryInstance('', document.body)
      instance.element = target
      return instance
    } else {
      let instance = seletor as QueryInstance
      if (instance) {
        instance.context = context as HTMLElement
        return instance
      } else {
        return new QueryInstance('', document.body)
      }
    }
  }
}

const vendorProps = {}
/**
 * 计算得到真实样式属性名
 * @param name
 */
Query.getFinalPropName = (name: string) => {
  const getVendorCSSName = (name: string) => {
    const verdorName = vendorCssPrefixes
      .map(item => {
        // 首字母大写
        const capName = name.replace(/^\w/gi, function (arg) {
          return arg.toUpperCase()
        })
        return item + capName
      })
      .find(item => {
        if (item in emptyStyle) {
          return item
        }
      })
    return ''
  }
  var final = vendorProps[name]
  if (final) {
    return final
  }
  if (name in emptyStyle) {
    return name
  }
  return (vendorProps[name] = getVendorCSSName(name) || name)
}
/**
 * 判断属性是否可以配置像素值
 * @see https://github.com/jquery/jquery/blob/main/src/css/isAutoPx.js#L26
 * @param name
 */
Query.isPixCssProps = name => {
  var ralphaStart = /^[a-z]/,
    rautoPx =
      /^(?:Border(?:Top|Right|Bottom|Left)?(?:Width|)|(?:Margin|Padding)?(?:Top|Right|Bottom|Left)?|(?:Min|Max)?(?:Width|Height))$/
  return (
    ralphaStart.test(name) &&
    rautoPx.test(name[0].toUpperCase() + name.slice(1))
  )
}
/**
 * 得到组件所有的样式集
 * @param dom
 * @returns
 */
Query.getStyles = (dom: HTMLElement) => {
  return window.getComputedStyle(dom, null)
}
/**
 * CSS 属性名转驼峰写法
 * @param name
 * @returns
 */
Query.cssCamelCase = (name: string) => {
  // IE9
  return camelCase(name.replace(/^-ms-/, 'ms-'))
}
Query.pixelNumber = str => {
  return Number(str.replace(/px/g, '')) || 0
}
Query.css = (
  dom: HTMLElement,
  name: string | Record<string, any>,
  value?: any
) => {
  if (!dom) {
    return
  }
  if (dom.nodeType != 1 || !dom.style) {
    console.warn(`***${dom} 不支持读取/写入样式 ***`)
    return
  }
  let style = dom.style;

  if (typeof name == 'object') {
    for (let k in name) {
      Query.css(dom, k, name[k])
    }
  } else {
    if (typeof value != 'undefined') {
      //setter

      const staticValues = /none|inhert|max|min|content/
      const val = staticValues.exec(value + '')
        ? value
        : value + (Query.isPixCssProps(name) ? 'px' : '')
      //console.log('k====', name, val)
      style[name] = val
    } else {
      // getter 通过 getComputedStyle访问
      style = getComputedStyle(dom);
      if (typeof name == 'string') {
        return style[name]
      }
    }
  }
}

Query.generateClassRegExp = name => {
  return new RegExp('(^|(?<=[^\\w]+))' + name + '(?=[^\\w]|$)', 'ig')
}
Query.hasClass = (dom: HTMLElement, name: string) => {
  if (!dom) {
    return false
  }
  const regex = Query.generateClassRegExp(name)
  return regex.test(dom.className)
}
Query.addClass = (dom: HTMLElement, name: string) => {
  Query.removeClass(dom, name)
  dom.className += ' ' + name
}
Query.removeClass = (dom: HTMLElement, name: string) => {
  let cls = dom.className
  const names = name
    .split(' ')
    .filter(item => {
      return !!item
    })
    .map(item => {
      return Query.generateClassRegExp(item)
    })
    .map((reg: RegExp) => {
      cls = cls.replace(reg, ' ')
    })
  cls = cls.replace(/\s{2,}/gi, ' ')
  dom.className = cls
}
Query.show = (dom: HTMLElement) => {
  if ((dom as any).__hide_val) {
    Query.css(dom, 'display', (dom as any).__hide_val)
  } else {
    Query.css(dom, 'display', 'block')
  }
}
/**
 * 暂只支持display:none进行隐藏
 * @param dom 
 */
Query.hide = (dom: HTMLElement) => {
  const style = Query.css(dom, 'display');
  if (style != 'none') {
    (dom as any).__hide_val = style;
  }
  Query.css(dom, 'display', 'none')

}
Query.toggleVisible = (dom: HTMLElement) => {
  const style = Query.css(dom, 'display');
  if (style == 'none') {
    Query.show(dom)
  } else {
    Query.hide(dom)
  }
}
  ; (window as any).$ = Query
export { Query }
