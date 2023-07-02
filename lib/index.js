var G = Object.defineProperty;
var Q = (i, e, t) => e in i ? G(i, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : i[e] = t;
var a = (i, e, t) => (Q(i, typeof e != "symbol" ? e + "" : e, t), t);
if (typeof window < "u") {
  let i = function() {
    var e = document.body, t = document.getElementById("__svg__icons__dom__");
    t || (t = document.createElementNS("http://www.w3.org/2000/svg", "svg"), t.style.position = "absolute", t.style.width = "0", t.style.height = "0", t.id = "__svg__icons__dom__", t.setAttribute("xmlns", "http://www.w3.org/2000/svg"), t.setAttribute("xmlns:link", "http://www.w3.org/1999/xlink")), t.innerHTML = '<symbol class="icon" viewBox="0 0 1024 1024"  id="icon-close"><path d="M265.28 310.72a32 32 0 0 1 45.44-45.44l448 448a32 32 0 0 1-45.44 45.44z" /><path d="M713.28 265.28a32 32 0 0 1 45.44 45.44l-448 448a32 32 0 0 1-45.44-45.44z" /></symbol><symbol class="icon" viewBox="0 0 1024 1024"  id="icon-download"><path d="M768 352a224 224 0 0 1 0 448h-32a32 32 0 0 1 0-64h32a160 160 0 0 0 0-320 147.2 147.2 0 0 0-27.84 2.56 32 32 0 0 1-38.08-27.52 192 192 0 0 0-380.16 0 32 32 0 0 1-38.08 27.52A147.2 147.2 0 0 0 256 416a160 160 0 0 0 0 320h32a32 32 0 0 1 0 64h-32a224 224 0 0 1 0-448h8.32a256 256 0 0 1 495.36 0z" fill="gray" /><path d="M480 608a32 32 0 0 1 64 0v288a32 32 0 0 1-64 0z" fill="gray" /><path d="M600 746.88a32 32 0 0 1 48 42.24l-112 128a32 32 0 0 1-48 0l-112-128a32 32 0 1 1 48-42.24l88 100.48z" fill="gray" /></symbol><symbol class="icon" viewBox="0 0 1024 1024"  id="icon-fullscreen-exit"><path d="M896 640a42.667 42.667 0 0 1 4.992 85.035l-4.992.298H759.296c-40.917 0-73.088 27.307-76.373 60.288l-.256 5.547V896a42.667 42.667 0 0 1-85.035 4.992l-.299-4.992V791.168c0-81.707 68.694-146.859 153.43-150.955l8.533-.213H896zm-630.016 0c85.077 0 155.99 62.379 160.427 142.635l.256 8.106V896a42.667 42.667 0 0 1-85.035 4.992l-.299-4.992V790.699c0-33.366-29.568-62.166-68.736-65.11l-6.613-.256H128a42.667 42.667 0 0 1-4.992-85.034L128 640h137.984zM640 128a42.667 42.667 0 0 1 42.368 37.675l.299 4.992v132.096c0 43.05 30.976 77.653 69.504 80.981l6.144.256H896a42.667 42.667 0 0 1 4.992 85.035l-4.992.298H758.315c-86.614 0-156.502-70.4-160.768-158.037l-.214-8.533V170.667A42.667 42.667 0 0 1 640 128zm-256 0a42.667 42.667 0 0 1 42.368 37.675l.299 4.992v108.416c0 79.957-67.883 143.36-151.339 147.37l-8.405.214H128a42.667 42.667 0 0 1-4.992-85.035l4.992-.299h138.923c39.722 0 70.826-25.856 74.112-56.746l.298-5.504V170.667A42.667 42.667 0 0 1 384 128z" /></symbol><symbol class="icon" viewBox="0 0 1024 1024"  id="icon-fullscreen"><path d="M85.333 682.667v128a128 128 0 0 0 128 128h128a42.667 42.667 0 0 0 0-85.334h-128a42.667 42.667 0 0 1-42.666-42.666v-128a42.667 42.667 0 0 0-85.334 0zm597.334 256h128a128 128 0 0 0 128-128v-128a42.667 42.667 0 0 0-85.334 0v128a42.667 42.667 0 0 1-42.666 42.666h-128a42.667 42.667 0 0 0 0 85.334zm256-597.334v-128a128 128 0 0 0-128-128h-128a42.667 42.667 0 0 0 0 85.334h128a42.667 42.667 0 0 1 42.666 42.666v128a42.667 42.667 0 0 0 85.334 0zm-597.334-256h-128a128 128 0 0 0-128 128v128a42.667 42.667 0 0 0 85.334 0v-128a42.667 42.667 0 0 1 42.666-42.666h128a42.667 42.667 0 0 0 0-85.334z" /></symbol><symbol class="icon" viewBox="0 0 1024 1024"  id="icon-help"><path d="M473.536 593.408v-7.04c0-22.656 3.84-42.24 12.704-58.112 8.288-17.12 32.448-42.208 71.84-75.84l10.816-11.616c11.456-14.08 17.792-28.768 17.792-44.64 0-21.44-6.336-37.92-18.432-50.176-12.704-12.224-31.136-18.336-54.016-18.336-28.64 0-49.6 8.576-62.304 26.304-11.36 14.528-17.056 35.072-17.184 61.6a31.616 31.616 0 0 1 .192 3.584c0 17.856-14.976 32.32-33.472 32.32-18.496 0-33.472-14.464-33.472-32.32a31.68 31.68 0 0 1 .128-2.816H368c0-44.64 13.344-79.488 40.064-105.184C434.752 284.832 471.616 272 518.688 272c40.672 0 73.728 10.4 99.168 32.416C643.296 325.824 656 355.168 656 391.872c0 29.952-8.256 55.04-24.16 74.592-5.728 6.72-23.52 22.656-53.408 47.712a102.4 102.4 0 0 0-26.688 31.808 79.648 79.648 0 0 0-10.176 40.352v10.4h-.064c-.8 17.504-15.712 31.456-34.016 31.456-18.784 0-34.016-14.72-34.016-32.896 0-.64 0-1.28.064-1.92zM512 960C264.576 960 64 759.424 64 512S264.576 64 512 64s448 200.576 448 448-200.576 448-448 448zm0-64c212.064 0 384-171.936 384-384S724.064 128 512 128 128 299.936 128 512s171.936 384 384 384zm-4.768-231.456c13.344 0 24.8 3.68 33.696 12.224 8.896 7.968 13.344 18.368 13.344 31.2s-5.088 23.232-13.984 31.808A48.8 48.8 0 0 1 507.232 752c-12.704 0-24.16-4.288-33.056-12.832a41.664 41.664 0 0 1-13.344-31.2c0-12.832 4.448-23.232 13.344-31.2 8.896-8.544 20.352-12.224 33.056-12.224z" /></symbol><symbol class="icon" viewBox="0 0 1024 1024"  id="icon-info"><path d="M480 672V480h-64c-17.664 0-32-14.208-32-32 0-17.664 14.208-32 32-32h96a31.904 31.904 0 0 1 32 31.84V672h64.096c17.6 0 31.904 14.208 31.904 32 0 17.664-14.496 32-31.904 32H415.904A31.872 31.872 0 0 1 384 704c0-17.664 14.496-32 31.904-32H480zm32 288C264.576 960 64 759.424 64 512S264.576 64 512 64s448 200.576 448 448-200.576 448-448 448zm0-64c212.064 0 384-171.936 384-384S724.064 128 512 128 128 299.936 128 512s171.936 384 384 384zm-64-592c0-26.496 21.312-48 48-48 26.496 0 48 21.312 48 48 0 26.496-21.312 48-48 48-26.496 0-48-21.312-48-48z" /></symbol><symbol class="icon" viewBox="0 0 1024 1024"  id="icon-left"><path d="M693.44 776.32a32 32 0 0 1-42.88 47.36l-320-288a32 32 0 0 1 0-47.36l320-288a32 32 0 1 1 42.88 47.36L399.68 512z" /></symbol><symbol class="icon" viewBox="0 0 1024 1024"  id="icon-list"><path d="M192 352a32 32 0 0 1-32-32V192a32 32 0 0 1 32-32h128a32 32 0 0 1 32 32v128a32 32 0 0 1-32 32zm32-64h64v-64h-64zm224 64a32 32 0 0 1-32-32V192a32 32 0 0 1 32-32h128a32 32 0 0 1 32 32v128a32 32 0 0 1-32 32zm32-64h64v-64h-64zm224 64a32 32 0 0 1-32-32V192a32 32 0 0 1 32-32h128a32 32 0 0 1 32 32v128a32 32 0 0 1-32 32zm32-64h64v-64h-64zM192 608a32 32 0 0 1-32-32V448a32 32 0 0 1 32-32h128a32 32 0 0 1 32 32v128a32 32 0 0 1-32 32zm32-64h64v-64h-64zm224 64a32 32 0 0 1-32-32V448a32 32 0 0 1 32-32h128a32 32 0 0 1 32 32v128a32 32 0 0 1-32 32zm32-64h64v-64h-64zm224 64a32 32 0 0 1-32-32V448a32 32 0 0 1 32-32h128a32 32 0 0 1 32 32v128a32 32 0 0 1-32 32zm32-64h64v-64h-64zM192 864a32 32 0 0 1-32-32V704a32 32 0 0 1 32-32h128a32 32 0 0 1 32 32v128a32 32 0 0 1-32 32zm32-64h64v-64h-64zm224 64a32 32 0 0 1-32-32V704a32 32 0 0 1 32-32h128a32 32 0 0 1 32 32v128a32 32 0 0 1-32 32zm32-64h64v-64h-64zm224 64a32 32 0 0 1-32-32V704a32 32 0 0 1 32-32h128a32 32 0 0 1 32 32v128a32 32 0 0 1-32 32zm32-64h64v-64h-64z" /></symbol><symbol class="icon" viewBox="0 0 1024 1024"  id="icon-pause"><path d="M320 128a64 64 0 0 0-64 64v640a64 64 0 0 0 128 0V192a64 64 0 0 0-64-64zm384 0a64 64 0 0 0-64 64v640a64 64 0 0 0 128 0V192a64 64 0 0 0-64-64z" /></symbol><symbol class="icon" viewBox="0 0 1024 1024"  id="icon-play"><path d="M798.58 553.363 270.865 897.201c-28.647 18.857-67.084 9.068-67.084-45.987v-677.02c0-55.415 35.836-62.965 67.084-45.914L798.58 472.046c29.55 19.832 30.417 59.787 0 81.317zM259.378 828.708 760.07 512.723 259.378 196.7v632.007z" /></symbol><symbol class="icon" viewBox="0 0 1024 1024"  id="icon-right"><path d="M330.56 247.68a32 32 0 0 1 42.88-47.36l320 288a32 32 0 0 1 0 47.36l-320 288a32 32 0 0 1-42.88-47.36L624.32 512z" /></symbol><symbol class="icon" viewBox="0 0 1024 1024"  id="icon-search"><path d="M836.48 496A340.48 340.48 0 1 0 496 836.48 340.8 340.8 0 0 0 836.48 496zm75.52 0A416 416 0 1 1 496 80a416 416 0 0 1 416 416z" /><path d="M761.28 806.72a32 32 0 0 1 45.44-45.44l128 128a32 32 0 0 1-45.44 45.44z" /></symbol>', e.insertBefore(t, e.lastChild);
  };
  document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", i) : i();
}
(function() {
  console.log("polyfill");
})();
const K = ["Webkit", "Moz", "ms"], H = document.createElement("div").style;
class N {
  constructor(e, t) {
    a(this, "selector", "");
    a(this, "context");
    a(this, "element", null);
    this.selector = e, this.context = t || document.body, e && (this.element = this.context.querySelector(e));
  }
  show() {
    this.element && c.css(this.element, "display", "block");
  }
  hide() {
    this.element && c.css(this.element, "display", "none");
  }
  delegate(e, t, s) {
    this.element && this.element.addEventListener(t, (n) => {
      var l;
      let r = n.target;
      const o = (l = this.element) == null ? void 0 : l.querySelector(e);
      let h = !1;
      for (console.log("node", r, o); !(!o || !r); )
        if (r === o) {
          h = !0;
          break;
        } else
          r = r.parentNode;
      h && s();
    });
  }
  on(e, t) {
  }
}
const c = (i, e) => {
  if (typeof i == "string")
    return new N(i, e);
  {
    const t = i;
    if (t && t.nodeType) {
      let s = new N("", document.body);
      return s.element = t, s;
    } else {
      let s = i;
      return s ? (s.context = e, s) : new N("", document.body);
    }
  }
}, X = {};
c.getFinalPropName = (i) => {
  const e = (s) => (K.map((n) => {
    const r = s.replace(/^\w/gi, function(o) {
      return o.toUpperCase();
    });
    return n + r;
  }).find((n) => {
    if (n in H)
      return n;
  }), "");
  var t = X[i];
  return t || (i in H ? i : X[i] = e(i) || i);
};
c.isPixCssProps = (i) => {
  var e = /^[a-z]/, t = /^(?:Border(?:Top|Right|Bottom|Left)?(?:Width|)|(?:Margin|Padding)?(?:Top|Right|Bottom|Left)?|(?:Min|Max)?(?:Width|Height))$/;
  return e.test(i) && t.test(i[0].toUpperCase() + i.slice(1));
};
c.getStyles = (i) => window.getComputedStyle(i, null);
c.cssCamelCase = (i) => ut(i.replace(/^-ms-/, "ms-"));
c.pixelNumber = (i) => Number(i.replace(/px/g, "")) || 0;
c.css = (i, e, t) => {
  if (!i)
    return;
  if (i.nodeType != 1 || !i.style) {
    console.warn(`***${i} 不支持读取/写入样式 ***`);
    return;
  }
  let s = i.style;
  if (typeof e == "object")
    for (let n in e)
      c.css(i, n, e[n]);
  else if (typeof t < "u") {
    const r = /none|inhert|max|min|content/.exec(t + "") ? t : t + (c.isPixCssProps(e) ? "px" : "");
    s[e] = r;
  } else if (s = getComputedStyle(i), typeof e == "string")
    return s[e];
};
c.generateClassRegExp = (i) => new RegExp("(^|(?<=[^\\w]+))" + i + "(?=[^\\w]|$)", "ig");
c.hasClass = (i, e) => i ? c.generateClassRegExp(e).test(i.className) : !1;
c.addClass = (i, e) => {
  c.removeClass(i, e), i.className += " " + e;
};
c.removeClass = (i, e) => {
  let t = i.className;
  e.split(" ").filter((s) => !!s).map((s) => c.generateClassRegExp(s)).map((s) => {
    t = t.replace(s, " ");
  }), t = t.replace(/\s{2,}/gi, " "), i.className = t;
};
c.show = (i) => {
  i.__hide_val ? c.css(i, "display", i.__hide_val) : c.css(i, "display", "block");
};
c.hide = (i) => {
  const e = c.css(i, "display");
  e != "none" && (i.__hide_val = e), c.css(i, "display", "none");
};
c.toggleVisible = (i) => {
  c.css(i, "display") == "none" ? c.show(i) : c.hide(i);
};
window.$ = c;
class z {
  constructor() {
    a(this, "_events", {});
    a(this, "_once_events", {});
  }
  /**
   * 触发事件
   * @param {string} type - 事件类型
   */
  dispatch(e, t) {
    const s = typeof e == "string" ? e : e.type, n = this._events[s] || [];
    let r = this, o = [e, r];
    t && o.push(t), n.map(({ func: l, args: u }, d) => {
      try {
        l.apply(r, o.concat(u || []));
      } catch {
      }
    }), (this._once_events[s] || []).map(({ func: l, args: u }, d) => {
      try {
        l.apply(r, o.concat(u || []));
      } catch {
      }
    }), this._once_events[s] = [];
  }
  /**
   * 添加一个事件
   * @param {string} type - 事件类型
   * @param {function} handler - 事件处理函数
   * @param {arguments} args - 事件参数（可选）
   */
  addEventListener(e, t, ...s) {
    const n = this._events[e] || [];
    n.push({
      func: t,
      args: s || []
    }), this._events[e] = n;
  }
  /**
   * 移除事件
   * @param {string} type - 事件类型
   * @param {function} handler - 事件处理函数（可选）
   */
  removeEventListener(e, t) {
    const s = this._events[e] || [];
    if (t) {
      const n = s.findIndex((r) => r.func == t);
      n && (s.splice(n, 1), this._events[e] = s);
    } else
      this._events[e] = [];
  }
  on(e, t) {
    this.addEventListener(e, t);
  }
  off(e, t) {
    this.removeEventListener(e, t);
  }
  once(e, t, ...s) {
    const n = this._once_events[e] || [];
    n.push({
      func: t,
      args: s || []
    }), this._once_events[e] = n;
  }
}
const F = (i, e = 1e3) => (i = (typeof i == "number" ? i : parseFloat(i)) || 0, Math.round((i + Number.EPSILON) * e) / e), j = (i, e, t) => {
  let s;
  return function() {
    let n = arguments;
    s && clearTimeout(s), s = setTimeout(() => {
      i.apply(t, n);
    }, e);
  };
}, J = (i, e, t) => {
  let s;
  return function() {
    let n = t, r = arguments;
    s || (s = setTimeout(() => {
      s = null, i.apply(n, r);
    }, e));
  };
}, v = (i, e, t = "") => {
  const s = document.createElement(t || "div");
  return i && (s.className = i), e && e.appendChild(s), s;
};
class Y extends z {
  constructor(t = null) {
    super();
    a(this, "_context", null);
    a(this, "_highlightIndex", -1);
    a(this, "viewport", null);
    a(this, "scrollview", null);
    a(this, "pl", null);
    a(this, "pr", null);
  }
  setup(t) {
    this._context = t, this.create();
  }
  create() {
    this.moobox && (this.viewport = v("viewport", this.moobox.thumbs), this.scrollview = v("scrollview", this.viewport), this.pl = v("scrollview-pl", this.viewport), this.pr = v("scrollview-pr", this.viewport), v("shadow", this.pl), v("shadow", this.pr), this.onCreated());
  }
  // 抽象函数
  onCreated() {
  }
  render(t = 0) {
  }
  get currentIndex() {
    return this._highlightIndex;
  }
  reviseIndex(t) {
  }
  redraw() {
  }
  get highlightIndex() {
    return this._highlightIndex;
  }
  get moobox() {
    return this._context;
  }
  highlight(t, s = 0) {
    t != this._highlightIndex && (this._highlightIndex = t, this.render(s));
  }
  async prev() {
  }
  async next() {
  }
}
class tt {
}
new Proxy(tt, {
  get: function(i, e) {
    return console.log("get-----", e), i[e];
  }
});
class et {
  constructor(e, t) {
    a(this, "_type");
    a(this, "_originEvent");
    a(this, "_data");
    this._type = e, this._originEvent = t == null ? void 0 : t.originEvent, this._data = t;
  }
  get originEvent() {
    return this._originEvent;
  }
  get type() {
    return this._type;
  }
  get data() {
    return this._data || {};
  }
}
class _ extends et {
  constructor(e, t) {
    super(e, t);
  }
}
a(_, "ZOOM_WHEEL", "zoom_wheel"), a(_, "PAN_END", "pan_end"), a(_, "RESIZE", "resize"), /**
 * 播放开始
 */
a(_, "PLAY", "play"), a(_, "PAUSE", "pause");
var M = Object.freeze({
  Linear: Object.freeze({
    None: function(i) {
      return i;
    },
    In: function(i) {
      return this.None(i);
    },
    Out: function(i) {
      return this.None(i);
    },
    InOut: function(i) {
      return this.None(i);
    }
  }),
  Quadratic: Object.freeze({
    In: function(i) {
      return i * i;
    },
    Out: function(i) {
      return i * (2 - i);
    },
    InOut: function(i) {
      return (i *= 2) < 1 ? 0.5 * i * i : -0.5 * (--i * (i - 2) - 1);
    }
  }),
  Cubic: Object.freeze({
    In: function(i) {
      return i * i * i;
    },
    Out: function(i) {
      return --i * i * i + 1;
    },
    InOut: function(i) {
      return (i *= 2) < 1 ? 0.5 * i * i * i : 0.5 * ((i -= 2) * i * i + 2);
    }
  }),
  Quartic: Object.freeze({
    In: function(i) {
      return i * i * i * i;
    },
    Out: function(i) {
      return 1 - --i * i * i * i;
    },
    InOut: function(i) {
      return (i *= 2) < 1 ? 0.5 * i * i * i * i : -0.5 * ((i -= 2) * i * i * i - 2);
    }
  }),
  Quintic: Object.freeze({
    In: function(i) {
      return i * i * i * i * i;
    },
    Out: function(i) {
      return --i * i * i * i * i + 1;
    },
    InOut: function(i) {
      return (i *= 2) < 1 ? 0.5 * i * i * i * i * i : 0.5 * ((i -= 2) * i * i * i * i + 2);
    }
  }),
  Sinusoidal: Object.freeze({
    In: function(i) {
      return 1 - Math.sin((1 - i) * Math.PI / 2);
    },
    Out: function(i) {
      return Math.sin(i * Math.PI / 2);
    },
    InOut: function(i) {
      return 0.5 * (1 - Math.sin(Math.PI * (0.5 - i)));
    }
  }),
  Exponential: Object.freeze({
    In: function(i) {
      return i === 0 ? 0 : Math.pow(1024, i - 1);
    },
    Out: function(i) {
      return i === 1 ? 1 : 1 - Math.pow(2, -10 * i);
    },
    InOut: function(i) {
      return i === 0 ? 0 : i === 1 ? 1 : (i *= 2) < 1 ? 0.5 * Math.pow(1024, i - 1) : 0.5 * (-Math.pow(2, -10 * (i - 1)) + 2);
    }
  }),
  Circular: Object.freeze({
    In: function(i) {
      return 1 - Math.sqrt(1 - i * i);
    },
    Out: function(i) {
      return Math.sqrt(1 - --i * i);
    },
    InOut: function(i) {
      return (i *= 2) < 1 ? -0.5 * (Math.sqrt(1 - i * i) - 1) : 0.5 * (Math.sqrt(1 - (i -= 2) * i) + 1);
    }
  }),
  Elastic: Object.freeze({
    In: function(i) {
      return i === 0 ? 0 : i === 1 ? 1 : -Math.pow(2, 10 * (i - 1)) * Math.sin((i - 1.1) * 5 * Math.PI);
    },
    Out: function(i) {
      return i === 0 ? 0 : i === 1 ? 1 : Math.pow(2, -10 * i) * Math.sin((i - 0.1) * 5 * Math.PI) + 1;
    },
    InOut: function(i) {
      return i === 0 ? 0 : i === 1 ? 1 : (i *= 2, i < 1 ? -0.5 * Math.pow(2, 10 * (i - 1)) * Math.sin((i - 1.1) * 5 * Math.PI) : 0.5 * Math.pow(2, -10 * (i - 1)) * Math.sin((i - 1.1) * 5 * Math.PI) + 1);
    }
  }),
  Back: Object.freeze({
    In: function(i) {
      var e = 1.70158;
      return i === 1 ? 1 : i * i * ((e + 1) * i - e);
    },
    Out: function(i) {
      var e = 1.70158;
      return i === 0 ? 0 : --i * i * ((e + 1) * i + e) + 1;
    },
    InOut: function(i) {
      var e = 2.5949095;
      return (i *= 2) < 1 ? 0.5 * (i * i * ((e + 1) * i - e)) : 0.5 * ((i -= 2) * i * ((e + 1) * i + e) + 2);
    }
  }),
  Bounce: Object.freeze({
    In: function(i) {
      return 1 - M.Bounce.Out(1 - i);
    },
    Out: function(i) {
      return i < 1 / 2.75 ? 7.5625 * i * i : i < 2 / 2.75 ? 7.5625 * (i -= 1.5 / 2.75) * i + 0.75 : i < 2.5 / 2.75 ? 7.5625 * (i -= 2.25 / 2.75) * i + 0.9375 : 7.5625 * (i -= 2.625 / 2.75) * i + 0.984375;
    },
    InOut: function(i) {
      return i < 0.5 ? M.Bounce.In(i * 2) * 0.5 : M.Bounce.Out(i * 2 - 1) * 0.5 + 0.5;
    }
  }),
  generatePow: function(i) {
    return i === void 0 && (i = 4), i = i < Number.EPSILON ? Number.EPSILON : i, i = i > 1e4 ? 1e4 : i, {
      In: function(e) {
        return Math.pow(e, i);
      },
      Out: function(e) {
        return 1 - Math.pow(1 - e, i);
      },
      InOut: function(e) {
        return e < 0.5 ? Math.pow(e * 2, i) / 2 : (1 - Math.pow(2 - e * 2, i)) / 2 + 0.5;
      }
    };
  }
}), O = function() {
  return performance.now();
}, it = (
  /** @class */
  function() {
    function i() {
      this._tweens = {}, this._tweensAddedDuringUpdate = {};
    }
    return i.prototype.getAll = function() {
      var e = this;
      return Object.keys(this._tweens).map(function(t) {
        return e._tweens[t];
      });
    }, i.prototype.removeAll = function() {
      this._tweens = {};
    }, i.prototype.add = function(e) {
      this._tweens[e.getId()] = e, this._tweensAddedDuringUpdate[e.getId()] = e;
    }, i.prototype.remove = function(e) {
      delete this._tweens[e.getId()], delete this._tweensAddedDuringUpdate[e.getId()];
    }, i.prototype.update = function(e, t) {
      e === void 0 && (e = O()), t === void 0 && (t = !1);
      var s = Object.keys(this._tweens);
      if (s.length === 0)
        return !1;
      for (; s.length > 0; ) {
        this._tweensAddedDuringUpdate = {};
        for (var n = 0; n < s.length; n++) {
          var r = this._tweens[s[n]], o = !t;
          r && r.update(e, o) === !1 && !t && delete this._tweens[s[n]];
        }
        s = Object.keys(this._tweensAddedDuringUpdate);
      }
      return !0;
    }, i;
  }()
), P = {
  Linear: function(i, e) {
    var t = i.length - 1, s = t * e, n = Math.floor(s), r = P.Utils.Linear;
    return e < 0 ? r(i[0], i[1], s) : e > 1 ? r(i[t], i[t - 1], t - s) : r(i[n], i[n + 1 > t ? t : n + 1], s - n);
  },
  Bezier: function(i, e) {
    for (var t = 0, s = i.length - 1, n = Math.pow, r = P.Utils.Bernstein, o = 0; o <= s; o++)
      t += n(1 - e, s - o) * n(e, o) * i[o] * r(s, o);
    return t;
  },
  CatmullRom: function(i, e) {
    var t = i.length - 1, s = t * e, n = Math.floor(s), r = P.Utils.CatmullRom;
    return i[0] === i[t] ? (e < 0 && (n = Math.floor(s = t * (1 + e))), r(i[(n - 1 + t) % t], i[n], i[(n + 1) % t], i[(n + 2) % t], s - n)) : e < 0 ? i[0] - (r(i[0], i[0], i[1], i[1], -s) - i[0]) : e > 1 ? i[t] - (r(i[t], i[t], i[t - 1], i[t - 1], s - t) - i[t]) : r(i[n ? n - 1 : 0], i[n], i[t < n + 1 ? t : n + 1], i[t < n + 2 ? t : n + 2], s - n);
  },
  Utils: {
    Linear: function(i, e, t) {
      return (e - i) * t + i;
    },
    Bernstein: function(i, e) {
      var t = P.Utils.Factorial;
      return t(i) / t(e) / t(i - e);
    },
    Factorial: function() {
      var i = [1];
      return function(e) {
        var t = 1;
        if (i[e])
          return i[e];
        for (var s = e; s > 1; s--)
          t *= s;
        return i[e] = t, t;
      };
    }(),
    CatmullRom: function(i, e, t, s, n) {
      var r = (t - i) * 0.5, o = (s - e) * 0.5, h = n * n, l = n * h;
      return (2 * e - 2 * t + r + o) * l + (-3 * e + 3 * t - 2 * r - o) * h + r * n + e;
    }
  }
}, st = (
  /** @class */
  function() {
    function i() {
    }
    return i.nextId = function() {
      return i._nextId++;
    }, i._nextId = 0, i;
  }()
), B = new it(), $ = (
  /** @class */
  function() {
    function i(e, t) {
      t === void 0 && (t = B), this._object = e, this._group = t, this._isPaused = !1, this._pauseStart = 0, this._valuesStart = {}, this._valuesEnd = {}, this._valuesStartRepeat = {}, this._duration = 1e3, this._isDynamic = !1, this._initialRepeat = 0, this._repeat = 0, this._yoyo = !1, this._isPlaying = !1, this._reversed = !1, this._delayTime = 0, this._startTime = 0, this._easingFunction = M.Linear.None, this._interpolationFunction = P.Linear, this._chainedTweens = [], this._onStartCallbackFired = !1, this._onEveryStartCallbackFired = !1, this._id = st.nextId(), this._isChainStopped = !1, this._propertiesAreSetUp = !1, this._goToEnd = !1;
    }
    return i.prototype.getId = function() {
      return this._id;
    }, i.prototype.isPlaying = function() {
      return this._isPlaying;
    }, i.prototype.isPaused = function() {
      return this._isPaused;
    }, i.prototype.to = function(e, t) {
      if (t === void 0 && (t = 1e3), this._isPlaying)
        throw new Error("Can not call Tween.to() while Tween is already started or paused. Stop the Tween first.");
      return this._valuesEnd = e, this._propertiesAreSetUp = !1, this._duration = t, this;
    }, i.prototype.duration = function(e) {
      return e === void 0 && (e = 1e3), this._duration = e, this;
    }, i.prototype.dynamic = function(e) {
      return e === void 0 && (e = !1), this._isDynamic = e, this;
    }, i.prototype.start = function(e, t) {
      if (e === void 0 && (e = O()), t === void 0 && (t = !1), this._isPlaying)
        return this;
      if (this._group && this._group.add(this), this._repeat = this._initialRepeat, this._reversed) {
        this._reversed = !1;
        for (var s in this._valuesStartRepeat)
          this._swapEndStartRepeatValues(s), this._valuesStart[s] = this._valuesStartRepeat[s];
      }
      if (this._isPlaying = !0, this._isPaused = !1, this._onStartCallbackFired = !1, this._onEveryStartCallbackFired = !1, this._isChainStopped = !1, this._startTime = e, this._startTime += this._delayTime, !this._propertiesAreSetUp || t) {
        if (this._propertiesAreSetUp = !0, !this._isDynamic) {
          var n = {};
          for (var r in this._valuesEnd)
            n[r] = this._valuesEnd[r];
          this._valuesEnd = n;
        }
        this._setupProperties(this._object, this._valuesStart, this._valuesEnd, this._valuesStartRepeat, t);
      }
      return this;
    }, i.prototype.startFromCurrentValues = function(e) {
      return this.start(e, !0);
    }, i.prototype._setupProperties = function(e, t, s, n, r) {
      for (var o in s) {
        var h = e[o], l = Array.isArray(h), u = l ? "array" : typeof h, d = !l && Array.isArray(s[o]);
        if (!(u === "undefined" || u === "function")) {
          if (d) {
            var f = s[o];
            if (f.length === 0)
              continue;
            for (var g = [h], w = 0, p = f.length; w < p; w += 1) {
              var x = this._handleRelativeValue(h, f[w]);
              if (isNaN(x)) {
                d = !1, console.warn("Found invalid interpolation list. Skipping.");
                break;
              }
              g.push(x);
            }
            d && (s[o] = g);
          }
          if ((u === "object" || l) && h && !d) {
            t[o] = l ? [] : {};
            var T = h;
            for (var I in T)
              t[o][I] = T[I];
            n[o] = l ? [] : {};
            var f = s[o];
            if (!this._isDynamic) {
              var U = {};
              for (var I in f)
                U[I] = f[I];
              s[o] = f = U;
            }
            this._setupProperties(T, t[o], f, n[o], r);
          } else
            (typeof t[o] > "u" || r) && (t[o] = h), l || (t[o] *= 1), d ? n[o] = s[o].slice().reverse() : n[o] = t[o] || 0;
        }
      }
    }, i.prototype.stop = function() {
      return this._isChainStopped || (this._isChainStopped = !0, this.stopChainedTweens()), this._isPlaying ? (this._group && this._group.remove(this), this._isPlaying = !1, this._isPaused = !1, this._onStopCallback && this._onStopCallback(this._object), this) : this;
    }, i.prototype.end = function() {
      return this._goToEnd = !0, this.update(1 / 0), this;
    }, i.prototype.pause = function(e) {
      return e === void 0 && (e = O()), this._isPaused || !this._isPlaying ? this : (this._isPaused = !0, this._pauseStart = e, this._group && this._group.remove(this), this);
    }, i.prototype.resume = function(e) {
      return e === void 0 && (e = O()), !this._isPaused || !this._isPlaying ? this : (this._isPaused = !1, this._startTime += e - this._pauseStart, this._pauseStart = 0, this._group && this._group.add(this), this);
    }, i.prototype.stopChainedTweens = function() {
      for (var e = 0, t = this._chainedTweens.length; e < t; e++)
        this._chainedTweens[e].stop();
      return this;
    }, i.prototype.group = function(e) {
      return e === void 0 && (e = B), this._group = e, this;
    }, i.prototype.delay = function(e) {
      return e === void 0 && (e = 0), this._delayTime = e, this;
    }, i.prototype.repeat = function(e) {
      return e === void 0 && (e = 0), this._initialRepeat = e, this._repeat = e, this;
    }, i.prototype.repeatDelay = function(e) {
      return this._repeatDelayTime = e, this;
    }, i.prototype.yoyo = function(e) {
      return e === void 0 && (e = !1), this._yoyo = e, this;
    }, i.prototype.easing = function(e) {
      return e === void 0 && (e = M.Linear.None), this._easingFunction = e, this;
    }, i.prototype.interpolation = function(e) {
      return e === void 0 && (e = P.Linear), this._interpolationFunction = e, this;
    }, i.prototype.chain = function() {
      for (var e = [], t = 0; t < arguments.length; t++)
        e[t] = arguments[t];
      return this._chainedTweens = e, this;
    }, i.prototype.onStart = function(e) {
      return this._onStartCallback = e, this;
    }, i.prototype.onEveryStart = function(e) {
      return this._onEveryStartCallback = e, this;
    }, i.prototype.onUpdate = function(e) {
      return this._onUpdateCallback = e, this;
    }, i.prototype.onRepeat = function(e) {
      return this._onRepeatCallback = e, this;
    }, i.prototype.onComplete = function(e) {
      return this._onCompleteCallback = e, this;
    }, i.prototype.onStop = function(e) {
      return this._onStopCallback = e, this;
    }, i.prototype.update = function(e, t) {
      if (e === void 0 && (e = O()), t === void 0 && (t = !0), this._isPaused)
        return !0;
      var s, n, r = this._startTime + this._duration;
      if (!this._goToEnd && !this._isPlaying) {
        if (e > r)
          return !1;
        t && this.start(e, !0);
      }
      if (this._goToEnd = !1, e < this._startTime)
        return !0;
      this._onStartCallbackFired === !1 && (this._onStartCallback && this._onStartCallback(this._object), this._onStartCallbackFired = !0), this._onEveryStartCallbackFired === !1 && (this._onEveryStartCallback && this._onEveryStartCallback(this._object), this._onEveryStartCallbackFired = !0), n = (e - this._startTime) / this._duration, n = this._duration === 0 || n > 1 ? 1 : n;
      var o = this._easingFunction(n);
      if (this._updateProperties(this._object, this._valuesStart, this._valuesEnd, o), this._onUpdateCallback && this._onUpdateCallback(this._object, n), n === 1)
        if (this._repeat > 0) {
          isFinite(this._repeat) && this._repeat--;
          for (s in this._valuesStartRepeat)
            !this._yoyo && typeof this._valuesEnd[s] == "string" && (this._valuesStartRepeat[s] = // eslint-disable-next-line
            // @ts-ignore FIXME?
            this._valuesStartRepeat[s] + parseFloat(this._valuesEnd[s])), this._yoyo && this._swapEndStartRepeatValues(s), this._valuesStart[s] = this._valuesStartRepeat[s];
          return this._yoyo && (this._reversed = !this._reversed), this._repeatDelayTime !== void 0 ? this._startTime = e + this._repeatDelayTime : this._startTime = e + this._delayTime, this._onRepeatCallback && this._onRepeatCallback(this._object), this._onEveryStartCallbackFired = !1, !0;
        } else {
          this._onCompleteCallback && this._onCompleteCallback(this._object);
          for (var h = 0, l = this._chainedTweens.length; h < l; h++)
            this._chainedTweens[h].start(this._startTime + this._duration, !1);
          return this._isPlaying = !1, !1;
        }
      return !0;
    }, i.prototype._updateProperties = function(e, t, s, n) {
      for (var r in s)
        if (t[r] !== void 0) {
          var o = t[r] || 0, h = s[r], l = Array.isArray(e[r]), u = Array.isArray(h), d = !l && u;
          d ? e[r] = this._interpolationFunction(h, n) : typeof h == "object" && h ? this._updateProperties(e[r], o, h, n) : (h = this._handleRelativeValue(o, h), typeof h == "number" && (e[r] = o + (h - o) * n));
        }
    }, i.prototype._handleRelativeValue = function(e, t) {
      return typeof t != "string" ? t : t.charAt(0) === "+" || t.charAt(0) === "-" ? e + parseFloat(t) : parseFloat(t);
    }, i.prototype._swapEndStartRepeatValues = function(e) {
      var t = this._valuesStartRepeat[e], s = this._valuesEnd[e];
      typeof s == "string" ? this._valuesStartRepeat[e] = this._valuesStartRepeat[e] + parseFloat(s) : this._valuesStartRepeat[e] = this._valuesEnd[e], this._valuesEnd[e] = t;
    }, i;
  }()
), y = B;
y.getAll.bind(y);
y.removeAll.bind(y);
y.add.bind(y);
y.remove.bind(y);
y.update.bind(y);
const S = class {
  constructor(e = S.defaultOption) {
    a(this, "_tween", new $({}));
    a(this, "_option");
    a(this, "_animateId", -1);
    this._option = Object.assign(
      Object.assign({}, S.defaultOption),
      e || {}
    ), this._tween = new $(this._option.from, !1);
  }
  static create(e = S.defaultOption) {
    return new S(e);
  }
  start() {
    const e = this._option;
    this._tween.to(e.to, e.duration).easing(e.ease).onUpdate((...s) => {
      e.onUpdate && e.onUpdate(e.from);
    }).onComplete(() => {
      e.onComplete && e.onComplete(e.from);
    });
    const t = (s) => {
      this._tween.update(s), requestAnimationFrame(t);
    };
    isNaN(this._animateId) ? (this._tween.start(), this._animateId = requestAnimationFrame(t)) : (this._tween.start(performance.now(), !0), cancelAnimationFrame(this._animateId), requestAnimationFrame(t));
  }
  stop() {
    this._tween && this._tween.stop();
  }
  to(e, t) {
    this._option, t && (this._option.from = { ...t || {} }), this._option.to = { ...e || {} }, this.start();
  }
  get option() {
    return this._option;
  }
};
let E = S;
a(E, "defaultOption", {
  from: {},
  to: {},
  duration: 200,
  //ease: TWEEN.Easing.Linear.None,
  ease: M.Cubic.Out
});
const nt = navigator.userAgent.indexOf("Macintosh") !== -1 && navigator.userAgent.indexOf("WebKit") !== -1;
class rt extends z {
  constructor(t, s) {
    super();
    a(this, "track");
    a(this, "url");
    a(this, "image");
    a(this, "selected", !1);
    this.track = v("track", t), this.url = s, this.image = v("img", this.track), c.css(this.image, {
      "background-image": `url(${this.url}`
    }), this.track.addEventListener("click", () => {
      this.dispatch("click");
    });
  }
  get container() {
    return this.track;
  }
  setSelected(t) {
    this.selected = t, t ? c.addClass(this.track, "track-selected") : c.removeClass(this.track, "track-selected");
  }
}
const C = class extends Y {
  constructor(t = C.generateDefaultOption()) {
    super();
    a(this, "changedDelta", 0);
    a(this, "_options", C.generateDefaultOption());
    /**
     * 所有缩略图
     */
    a(this, "_tracks", []);
    /**
     * 选中当前节流
     */
    a(this, "_currentDebounce");
    a(this, "_wheelThrottle");
    a(this, "_wheelDebounce");
    a(this, "transform", {
      index: 0
    });
    a(this, "transformAnimate", null);
    a(this, "transformAnimateRunning", !1);
    a(this, "dragging", {
      virualOffsetX: 0,
      virualOffsetY: 0
    });
    this._options = Object.assign(
      Object.assign(
        {},
        C.generateDefaultOption(),
        t || {}
      )
    );
  }
  static generateDefaultOption() {
    return {
      maxCount: -1,
      maxWidth: 100
    };
  }
  onCreated() {
    if (!this.moobox)
      return;
    this._wheelThrottle = J(this.onWheel, 300, this), this._wheelDebounce = j(this.onWheelEnd, 100, this);
    const t = this.moobox.getData();
    (t.thumbs || t.images || []).map((n, r) => {
      if (this.scrollview) {
        const o = new rt(this.scrollview, n);
        o.addEventListener("click", () => {
          var h;
          (h = this.moobox) == null || h.setSelectedIndex(r);
        }), this._tracks.push(o);
      }
    }), this.pl && this.pr && (c.css(this.pl, {
      width: C.PADDING
    }), c.css(this.pr, "width", C.PADDING)), this.viewport && this.viewport.addEventListener("wheel", (n) => {
      const r = n;
      r.stopPropagation(), r.stopImmediatePropagation(), r.preventDefault(), this.transformAnimateRunning;
      let o = n.deltaX * -30 || n.wheelDeltaX / 4 || 0;
      n.deltaY * -30 || n.wheelDeltaY / 4, nt && (o /= 30);
      const h = Math.max(
        -1,
        Math.min(1, -n.deltaX || n.wheelDelta || -n.detail)
      );
      let l = Math.min(20, Math.abs(o)) / 15;
      l = (100 + l * 40) / 100, this.transform.index;
      const u = h > 0 ? l : -l;
      this.highlightTo(u, l);
    }), this.render(0, !1);
  }
  onWheel(t) {
    let s = this.highlightIndex;
    t > 0 ? s += 1 : s -= 1, s = Math.min(this._tracks.length - 1, Math.max(0, s)), this.highlight(s);
  }
  onWheelEnd(t) {
    var s;
    (s = this.moobox) == null || s.setSelectedIndex(this.highlightIndex);
  }
  /**
   * 得到最大，最小 水平坐标
   */
  getMinMax() {
    let t = 0, s = 0;
    const n = this._options.maxCount || 0, r = n < 0, o = this._options.minWidth ?? 60, h = this._options.maxWidth ?? o, l = r ? 0 : C.PADDING - 3, u = (this._tracks.length - 1) * o + h;
    if (this.moobox) {
      const d = this.moobox.getViewPort().width, f = Math.min(
        n,
        Math.floor(d / o - 1)
      );
      let g = f > 0 ? (f - 1) * o + h : d;
      s = l, t = -u + g + l;
    }
    return {
      minX: t,
      maxX: s
    };
  }
  offsetToIndex(t) {
    const s = this._options.minWidth ?? 60, n = this._options.maxWidth ?? s;
    let r = Math.max(s, n) / 2, h = this.moobox ? this.moobox.getViewPort().width : 0, l = (-t + h / 2 - r) / s;
    this.highlight(Math.floor(l));
  }
  highlightTo(t, s) {
    if (this.transformAnimateRunning)
      return;
    this.transformAnimateRunning = !0;
    const n = t + this._highlightIndex;
    if (Math.abs(n - this.transform.index) < 0.01) {
      setTimeout(() => {
        this.transformAnimateRunning = !1;
      }, 300);
      return;
    }
    if (this.transformAnimate)
      this.transformAnimate.to({ index: t + this._highlightIndex });
    else {
      const r = {
        duration: 150,
        from: { index: this.transform.index },
        to: { index: n },
        onUpdate: (o) => {
          var l;
          this.transformAnimateRunning = !0;
          let h = Math.round(o.index);
          h = Math.min(Math.max(h, 0), this._tracks.length - 1), (l = this.moobox) == null || l.switchIndex(h);
        },
        onComplete: (o) => {
          var l;
          this.transform = { ...o }, this.transformAnimateRunning = !1;
          let h = Math.round(o.index);
          h = Math.min(Math.max(h, 0), this._tracks.length - 1), console.log("动画结束"), (l = this.moobox) == null || l.switchIndex(h), this.highlight(h, 300);
        }
      };
      this.transformAnimate = E.create(r), this.transformAnimate.start();
    }
  }
  // panTo( offset:number ){
  //   if( this.scrollview){
  //     const x = $.pixelNumber($.css(this.scrollview,'left'))
  //     const minmax = this.getMinMax();
  //     console.log('minmx',minmax)
  //     this.dragging.virualOffsetX += offset
  //     this.offsetToIndex(this.dragging.virualOffsetX)
  //     const newx = Math.max(Math.min(minmax.maxX,offset+x), minmax.minX)
  //     $.css(this.scrollview, {
  //       left: newx,
  //     })
  //   }
  // }
  render(t = 0, s = !0) {
    const n = this._options.maxCount || 0, r = n < 0, o = this._options.minWidth ?? 60, h = this._options.maxWidth ?? o, l = r ? 0 : C.PADDING - 3, u = (this._tracks.length - 1) * o + h;
    if (this._tracks.map((d, f) => {
      var g, w;
      f === this.highlightIndex ? (d.setSelected(!0), s ? (g = this.moobox) == null || g.switchIndex(f) : (w = this.moobox) == null || w.updateIndex(f)) : d.setSelected(!1), c.css(d.container, "width", o);
    }), this._currentDebounce = j(() => {
      const d = this._tracks[this.highlightIndex];
      d && c.css(d.container, "width", h);
    }, t, this)(), this.moobox) {
      const d = this.moobox.getViewPort().width, f = Math.min(
        n,
        Math.floor(d / o - 1)
      );
      let g = f > 0 ? (f - 1) * o + h : d;
      const w = this.moobox.getViewPort().width / 2;
      let p = Math.max(o, h) / 2, x = w - this.highlightIndex * o - p;
      x = -this.highlightIndex * o + g / 2 - p, x += l, x = Math.min(l, x), x = Math.max(-u + g + l, x), this.scrollview && c.css(this.scrollview, {
        width: u,
        left: x
      });
      let T = d / 2 - g / 2 - l;
      g += l * 2, r && (g = this.moobox.getViewPort().width), this.viewport && (c.css(this.viewport, {
        //width: `width:${width}px`,
        transform: `translate3d(${T}px, 0px, 0px) scale(1)`,
        width: g
      }), c.removeClass(this.viewport, "viewport-mini"), r || c.addClass(this.viewport, "viewport-mini"));
    }
    r && this.pr && this.pl && (c(this.pr).hide(), c(this.pl).hide());
  }
  redraw() {
    this.render();
  }
  async next() {
    var t;
    this._highlightIndex += 1, (t = this.moobox) == null || t.switchIndex(this._highlightIndex), this.render();
  }
  async prev() {
    var t;
    this._highlightIndex -= 1, (t = this.moobox) == null || t.switchIndex(this._highlightIndex), this.render();
  }
  /**
   * 修正hightIndex(navigation到边界了)
   * @param index 
   */
  reviseIndex(t) {
    this._highlightIndex = t, this.render(0, !1);
  }
  get options() {
    return this._options;
  }
};
let L = C;
/**
 * 左右的同间距，用于显示上一页，下一页
 */
a(L, "PADDING", 15);
class m {
  constructor(e = 0, t = 0) {
    a(this, "x", 0);
    a(this, "y", 0);
    this.x = e, this.y = t;
  }
  plus(e) {
    this.x += e.x, this.y += e.y;
  }
  multiply(e) {
    return this.x *= e, this.y *= e, this;
  }
  clone() {
    return new m(this.x, this.y);
  }
  isZero() {
    return this.x === 0 && this.y === 0;
  }
  distance(e) {
    return Math.sqrt((e.x - this.x) * (e.x - this.x) + (e.y - this.y) * (e.y - this.y));
  }
}
class b {
  constructor(e = 0, t = 0, s = 0, n = 0) {
    a(this, "x", 0);
    a(this, "y", 0);
    a(this, "width", 0);
    a(this, "height", 0);
    this.x = e, this.y = t, this.width = s, this.height = n;
  }
  /**
   * 是否与目标矩形相等
   * @param rect 
   * @returns 
   */
  equal(e) {
    return e.width === this.width && e.height === this.height;
  }
  /**
   * 宽度减去相应的值
   * @param pt 
   * @returns 
   */
  subtract(e) {
    return this.width -= e.x, this.height -= e.y, this;
  }
  clone() {
    return new b(this.x, this.y, this.width, this.height);
  }
  /**
   * 是否0宽/高
   * @returns 
   */
  isZero() {
    return this.width === 0 && this.height === 0;
  }
  /**
   * 将矩形缩放显示至目标视图
   * @param target 目标视图
   * @param type
   */
  scaleTo(e, t = "contain") {
    const s = e.width / e.height, n = this.width / this.height, r = e.clone();
    switch (t) {
      case "contain":
        s > n ? (r.height = r.height, r.width = n * r.height) : (r.width = r.width, r.height = 1 / n * r.width);
        break;
      case "cover":
        s > n ? (r.width = e.width, r.height = 1 / n * e.width) : (r.height = e.height, r.width = n * e.height);
        break;
    }
    return r;
  }
  /**
   * 判断点是否在矩形内
   * @param pt 测试点
   * @returns 
   */
  contains(e) {
    return this.x <= e.x && this.y <= e.y && this.x + this.width >= e.x && this.y + this.height >= e.y;
  }
}
const ot = navigator.userAgent.indexOf("Macintosh") !== -1 && navigator.userAgent.indexOf("WebKit") !== -1;
class at extends z {
  constructor() {
    super(...arguments);
    a(this, "_delta", []);
  }
  wheel(t) {
    let s = t.deltaX * -30 || t.wheelDeltaX / 4 || 0, n = t.deltaY * -30 || t.wheelDeltaY / 4 || 0;
    ot && (s /= 30, n /= 30), this._delta.push({
      x: s,
      y: n
    }), this.gestureDirection;
  }
  wheelEnd(t) {
    this._delta = [];
  }
  get gestureDirection() {
    const t = this._delta.reduce((o, h, l) => h.x + o, 0) / this._delta.length, s = this._delta.reduce((o, h, l) => h.y + o, 0) / this._delta.length, n = Math.abs(t / s) > 0.5;
    let r = "";
    return n ? t > 0 ? r = "right" : r = "left" : s > 0 ? r = "bottom" : r = "top", {
      direction: r
    };
  }
}
class ht {
  /**
   * 
   * @param moonbox Moobox实例
   * @param root 父容器
   * @param option 配置参数
   * @param {Rectangle} viewport 显示的区域信息
   */
  constructor(e, t, s = {}, n = new b()) {
    a(this, "index", 0);
    a(this, "_moobox");
    a(this, "_container");
    a(this, "_url", "");
    a(this, "_content");
    a(this, "_image");
    a(this, "_loading");
    a(this, "$content");
    a(this, "_size", new b());
    a(this, "_originSize", new b());
    a(this, "_gesture", new at());
    a(this, "_zoomDebounce");
    a(this, "_debug", document.createElement("div"));
    a(this, "changedDelta", 0);
    /**
     * 缩放变化
     */
    a(this, "transform", {
      x: 0,
      y: 0,
      scale: 1,
      oldScale: 1,
      oldX: 0,
      oldY: 0
    });
    a(this, "evtContentDragEvent");
    a(this, "dragging", {
      /**
       * 是否按信住鼠标拖拽过
       */
      dragged: !1,
      /**
       * 鼠标的屏幕坐标+画布偏移坐标
       */
      start: { x: 0, y: 0 },
      /**
       * 拖动后的偏移
       */
      offset: { x: 0, y: 0 }
    });
    a(this, "transformAnimate", null);
    a(this, "transformAnimateRunning", !1);
    a(this, "_originRatio", 1);
    /**
     * 可视化视图大小
     */
    a(this, "_viewPort", new b());
    a(this, "_isDragPan", !1);
    this._moobox = e, this._container = this.createNode("image-track", t), this._content = this.createNode("content", this._container), this._image = this.createNode("", this._content, "img"), this._loading = this.createNode("div", this._content), this._loading.className = "loading", this._loading.innerHTML = '<div class="box"></div>', this._viewPort = n, this._size = new b(0, 0, s.width, s.height), this._url = s.url || "", this.attachEvent(), this._url && this._image.setAttribute("src", this._url), this.resize(this._size.width, this._size.height), this.setCursor("zoomin");
  }
  attachEvent() {
    this.evtContentDragEvent = this.onContentDragEvent.bind(this), this._image.addEventListener("load", (e) => {
      var s;
      (s = this._loading.parentNode) == null || s.removeChild(this._loading);
      const t = e.target;
      this._originSize = new b(
        0,
        0,
        t.naturalWidth || t.width,
        t.naturalHeight || t.height
      ), this._originRatio = this._originSize.width / this._originSize.height, this.updateViewPort(this._viewPort), c.addClass(this.container, "index_" + this.index);
    }), this._content.addEventListener("mouseup", (e) => {
      console.log("mouse up");
    }), this._content.addEventListener("mousewheel", (e) => {
      this._gesture.wheel(e);
    }), this._content.addEventListener("touchstart", (e) => {
      console.log("touchstart", e), e.touches.length > 1;
    }), this._container.addEventListener("mousedown", (e) => {
      this.dragging.start = new m(
        e.clientX - this.transform.x,
        e.clientY - this.transform.y
      ), console.log("draging", JSON.stringify(this.dragging)), document.addEventListener("mousemove", this.evtContentDragEvent), document.addEventListener("mouseup", this.evtContentDragEvent);
    }), this._content.addEventListener("touchmove", (e) => {
      console.log("touchMove", e);
    }), this._content.addEventListener("touchend", (e) => {
    }), this._container.addEventListener("wheel", (e) => {
      const t = e;
      if (e.stopPropagation(), e.stopImmediatePropagation(), e.preventDefault(), this._moobox.autoplay(!1), this.transformAnimateRunning)
        return;
      const s = Math.max(
        -1,
        Math.min(1, -t.deltaY || -t.deltaX || t.wheelDelta || -t.detail)
      );
      this.changedDelta || (this.changedDelta = 0);
      let n = this.transform.scale;
      const r = this._moobox.option("minScale"), o = this.maxScale, h = this._moobox.option("wheelLimit");
      let l = this._moobox.option("wheelFactor"), u = n * (100 + s * l) / 100;
      if (s < 0 && Math.abs(n - r) < 0.01 || s > 0 && Math.abs(n - o) < 0.01 ? (this.changedDelta += Math.abs(s), u = n) : (this.changedDelta = 0, u = Math.max(Math.min(u, o), r)), this.changedDelta < h && (e.preventDefault(), u !== n)) {
        const d = this._content.getBoundingClientRect(), f = Math.min(
          this.viewPort.x + this._size.width,
          Math.max(this.viewPort.x, e.clientX)
        ), g = Math.min(
          this.viewPort.y + this._size.height,
          Math.max(this.viewPort.y, e.clientY)
        );
        let w = f - d.left, p = g - d.top;
        s > 0 && this._moobox.swapTop(!0), this.zoomTo(u, new m(w, p), { duration: 30 });
      }
      this._moobox.dispatch(
        new _(_.ZOOM_WHEEL, { origin: e, delta: s })
      );
    });
  }
  // TODO
  conentFitToBound(e, t) {
    if (!(e instanceof b)) {
      const r = e.getBoundingClientRect();
      new b(r.x, r.y, r.width, r.height);
    }
    const s = 0, n = 0;
    return new m(s, n);
  }
  onContentDragEvent(e) {
    let t = new m();
    switch (e.type) {
      case "mousemove":
        if (this.dragging.dragged = !0, t = new m(
          e.clientX - this.dragging.start.x,
          e.clientY - this.dragging.start.y
        ), !this.canPan())
          return;
        this.setCursor("grabbing"), console.log("move", this.dragging), this.panTo(this.transform.scale, t, { duration: 50 }), this.updateDebug();
        break;
      case "mouseup":
        document.removeEventListener("mousemove", this.evtContentDragEvent), document.removeEventListener("mouseup", this.evtContentDragEvent), t = new m(
          e.clientX - this.dragging.start.x,
          e.clientY - this.dragging.start.y
        );
        const s = t.distance(new m(this.transform.x, this.transform.y));
        if (this.transform.x = t.x, this.transform.y = t.y, this.dragging.offset = t.clone(), s < 3e-3 && !this.dragging.dragged) {
          const n = this._content.getClientRects()[0], r = new m(
            e.clientX - n.left,
            e.clientY - n.top
          ), h = new b(n.x, n.y, n.width, n.height).contains(new m(e.clientX, e.clientY));
          this.toggleZoom(r, h);
        }
        this.setCursor("grab"), this.dragging.dragged = !1, this.updateDebug();
        break;
    }
  }
  /**
   * 点击切换缩放
   * @param pt 图片中的相对坐标
   */
  toggleZoom(e, t = !1) {
    const s = this.maxScale, n = this._moobox.option("initScale"), r = this.transform.scale;
    let o = n;
    console.log("toggleZOm...", r, n), this._moobox.autoplay(!1), r <= n && t ? (console.log("zoomIn"), this.setCursor("zoomout"), o = this.transform.scale > n + 0.5 * (s - n) ? n : s) : (console.log("zoomOut"), this.setCursor("zoomin"), o = n, this.transform.x = 0, this.transform.y = 0, e = new m(0, 0)), F(o) != F(this.transform.scale) && this.zoomTo(o, e, { duration: 200 });
  }
  onZoomEnd() {
    console.log("zooEnd");
  }
  /**
   * 如果当前的缩放值小于1，则无允许平移
   */
  canPan() {
    return !this.transformAnimateRunning && this.transform.scale >= 1.005;
  }
  zoomTo(e, t, s = { duration: 200 }) {
    e * this._size.width, e * this._size.height;
    const n = this.transform.oldScale;
    let r = this.transform.oldX, o = this.transform.oldY, h = this._size.width / 2, l = this._size.height / 2, u = (h + r - t.x) * (e / n) - (h - t.x), d = (l + o - t.y) * (e / n) - (l - t.y);
    e <= 1.005 && (d = 0, u = 0), this.setCursor("grab"), this.panTo(e, new m(u, d), s);
  }
  /**
   * 动画结束，更新历史位置
   */
  onPanToEnd() {
    this.transform.oldScale = this.transform.scale, this.transform.oldX = this.transform.x, this.transform.oldY = this.transform.y;
    const e = this.viewPort.width;
    c.css(this.container, "left", e * this.index), console.log("动画结束"), this.canPan() || (this.setCursor("zoomin"), this._moobox.swapTop(!1)), this.updateDebug();
  }
  /**
   * 动画移动
   * @param scale
   * @param pt
   */
  panTo(e, t, s) {
    if (!this.transformAnimateRunning)
      if (this.transformAnimateRunning = !0, this.transformAnimate)
        s && s.duration && (this.transformAnimate.option.duration = s.duration), this.transformAnimate.to({ scale: e, x: t.x, y: t.y });
      else {
        const n = {
          from: { ...this.transform },
          to: { scale: e, x: t.x, y: t.y },
          onUpdate: (r) => {
            this.transformAnimateRunning = !0, this.setTransform(r);
          },
          onComplete: (r) => {
            this.transform = { ...r }, this.transformAnimateRunning = !1, this.onPanToEnd();
          }
        };
        s && s.duration && (n.duration = s.duration), this.transformAnimate = E.create(n), this.transformAnimate.start();
      }
  }
  setTransform(e) {
    const { x: t, y: s, scale: n } = e;
    c.css(this._image, {
      "max-width": "none",
      "max-height": "none",
      transform: `translate3d(${t}px,${s}px,0px) scale(${n})`
    }), this.transform = { ...this.transform, ...e }, this.updateDebug();
  }
  updateMetrics(e = !1) {
  }
  updateDebug() {
  }
  /**
   * 创建节点
   * @param id
   * @param parent
   * @param tag
   * @returns
   */
  createNode(e, t, s = "") {
    const n = document.createElement(s || "div");
    return e && (n.className = e), t && t.appendChild(n), n;
  }
  /**
   * 调整大小
   * @param width
   * @param height
   */
  resize(e, t) {
    var r, o;
    this._size = new b(0, 0, e, t), this.viewPort;
    const n = (((o = (r = this._moobox) == null ? void 0 : r.toolbar) == null ? void 0 : o.offsetHeight) ?? 0) + this._viewPort.height / 2 - this._size.height / 2;
    c.css(this._content, {
      width: this._size.width,
      height: this._size.height,
      top: n
    });
  }
  load(e) {
    this._url = e, this._image.setAttribute("src", this._url);
  }
  updateViewPort(e) {
    this._viewPort = e;
    const t = this._moobox.viewPortPadding.multiply(2);
    if (this._viewPort && this._viewPort.width && this._viewPort.height) {
      const s = this._viewPort.clone().subtract(t), n = this._originSize.scaleTo(s, "contain");
      this.resize(n.width, n.height);
    }
    this._viewPort.x = this.viewPort.width / 2 - this._size.width / 2, this._viewPort.y = this.viewPort.height / 2 - this._size.height / 2, this._image && !this._originSize.isZero() && c.css(this._image, {
      width: this._size.width,
      height: this._size.height
    }), this.updateMetrics();
  }
  setCursor(e) {
    ["zoomin", "zoomout", "grab", "grabbing"].map((t) => {
      this._content && c.removeClass(this._content, `cursor-${t}`);
    }), this._content && c.addClass(this._content, `cursor-${e}`);
  }
  /**
   * 由当前图片自动生成scale
   */
  get maxScale() {
    return this._image && !this._originSize.isZero() ? this._originSize.width / this._size.width * 2 : this._moobox._option.maxScale || 1;
  }
  get viewPort() {
    return this._viewPort;
  }
  get container() {
    return this._container;
  }
  reset() {
    this.updateViewPort(this._moobox.getViewPort()), this.panTo(1, new m(), { duration: 500 });
  }
  show() {
  }
  hide() {
  }
}
const V = class extends z {
  constructor(t, s, n = V.defaultOption) {
    super();
    a(this, "container");
    a(this, "name");
    a(this, "icon");
    a(this, "style");
    this.container = t, this.name = s, this.style = Object.assign({}, n || {}), this.icon = v("icon", this.container), c.addClass(this.icon, s);
    let r = `
    <svg class="svg-icon" style="width: ${this.style.width}px; height:${this.style.height}px; color: ${this.style.color}">
    <use xlink:href="#${this.name}" fill="${this.style.color}" />
  </svg>
    `;
    this.icon.innerHTML = r;
  }
};
let D = V;
a(D, "defaultOption", {
  width: 20,
  height: 20,
  color: "#FFFFFF"
});
const A = (i, e) => (e = e || globalThis, ["", "moz", "webkit", "ms"].map((n) => (n && (i = i.replace(/^\w/, (r) => r.toString().toUpperCase())), e[n + i])).find((n) => !!n));
let W = {
  fullscreen: async (i) => {
    const e = A("requestFullscreen", i);
    try {
      await e.apply(i);
    } catch (t) {
      alert(t);
    }
  },
  exit: async () => {
    const i = A("exitFullscreen", document);
    try {
      await i.apply(document);
    } catch {
    }
  },
  isFullScreen: () => !!A("fullscreenElement", document),
  /**
   * 是否支持全屏
   * @returns 
   */
  isSupport: () => !!A("fullscreenEnabled", document)
};
class Z extends z {
  constructor(t = null) {
    super();
    a(this, "viewport", null);
    a(this, "moobox", null);
    a(this, "navHeader", null);
    a(this, "navContainer", null);
    a(this, "_icons", []);
  }
  create() {
    var l, u, d, f, g, w;
    this.moobox && (this.viewport = v("viewport", this.moobox.toolbar), this.navHeader = v("nav-header", this.viewport), this.navContainer = v("nav-container", this.viewport)), [_.PLAY, _.PAUSE].map((p) => {
      var x;
      (x = this.moobox) == null || x.addEventListener(p, (T) => {
        this.update();
      });
    }), ["play", "pause", "fullscreen", "fullscreen-exit", "search", "list", "close"].map((p) => {
      this.add({
        name: "icon-" + p
      });
    });
    const t = (l = this.navContainer) == null ? void 0 : l.querySelector(".icon-play"), s = (u = this.navContainer) == null ? void 0 : u.querySelector(".icon-pause"), n = (d = this.navContainer) == null ? void 0 : d.querySelector(".icon-list"), r = (f = this.navContainer) == null ? void 0 : f.querySelector(".icon-fullscreen"), o = (g = this.navContainer) == null ? void 0 : g.querySelector(".icon-fullscreen-exit"), h = (w = this.navContainer) == null ? void 0 : w.querySelector(".icon-close");
    t == null || t.addEventListener("click", () => {
      var p;
      (p = this.moobox) == null || p.autoplay();
    }), s == null || s.addEventListener("click", () => {
      var p;
      (p = this.moobox) == null || p.autoplay(!1);
    }), n == null || n.addEventListener("click", () => {
      var p;
      (p = this.moobox) == null || p.toggleList();
    }), r == null || r.addEventListener("click", async () => {
      var p;
      await W.fullscreen((p = this.moobox) == null ? void 0 : p.root), this.update();
    }), o == null || o.addEventListener("click", async () => {
      await W.exit(), this.update();
    }), h == null || h.addEventListener("click", () => {
      var p;
      (p = this.moobox) == null || p.close();
    }), this.update();
  }
  set title(t) {
    this.navHeader && (this.navHeader.innerHTML = t);
  }
  add(t) {
    this.navContainer && new D(this.navContainer, t.name);
  }
  remove(t) {
  }
  setup(t) {
    this.moobox = t, this.create();
  }
  redraw() {
  }
  update() {
    var t, s, n, r;
    if (this.moobox) {
      const o = (t = this.navContainer) == null ? void 0 : t.querySelector(".icon-play"), h = (s = this.navContainer) == null ? void 0 : s.querySelector(".icon-pause"), l = (n = this.navContainer) == null ? void 0 : n.querySelector(".icon-fullscreen"), u = (r = this.navContainer) == null ? void 0 : r.querySelector(".icon-fullscreen-exit");
      [o, h, l, u].map((d) => {
        d && c.hide(d);
      }), this.moobox.isAutoPlay ? c.show(h) : c.show(o), W.isFullScreen() ? c.show(u) : c.show(l);
    }
  }
}
class lt extends z {
  constructor(t, s = {
    maxCacheLength: -1,
    bufferOffset: 0
  }) {
    super();
    /**
     * 设置缓冲偏移值，可以尝试往索引前进加载
     */
    a(this, "_bufferOffset", 0);
    a(this, "_maxCacheLength", -1);
    a(this, "_urls");
    a(this, "_start", -1);
    a(this, "_allTasks", []);
    /**
     * 执行中任务
     */
    a(this, "_tasks", []);
    this._urls = t.concat(), this._maxCacheLength = (s.maxCacheLength ?? 0) <= 0 ? this._urls.length : s.maxCacheLength ?? 0, this._bufferOffset = s.bufferOffset || 0, this._allTasks = this._urls.map((n) => ({
      url: n,
      status: 0,
      callbacks: []
    }));
  }
  set maxCacheLength(t) {
    this._maxCacheLength = t, this.retry();
  }
  get maxCacheLength() {
    return this._maxCacheLength;
  }
  load(t, s) {
    s = s || function(o) {
    };
    let n = -1, r = "";
    typeof t == "string" ? (r = t, n = this._urls.findIndex((o) => o === t)) : (n = t, r = this._urls[n]), n == -1 && typeof t == "string" ? (this._start = this._urls.length, this._urls.push(r), this._allTasks.push({
      url: r,
      status: 0,
      callbacks: [s]
    })) : r ? this._start = n : this._start = 0, this.updateTasks();
  }
  /**
   * 更新任务缓存
   */
  updateTasks() {
    let t = this._tasks.filter((n) => !n.status);
    if (this.maxCacheLength - t.length) {
      const n = this._bufferOffset;
      let r = [];
      if (n < 0) {
        const o = Math.max(0, this._start + n), h = Math.min(n + this._start, this._tasks.length - 1);
        r = [this._start];
        let l = 1;
        for (; ; ) {
          let u = this._start + l, d = this._start - l;
          if (r.length > this.maxCacheLength)
            break;
          u <= h && r.push(u), d >= o && r.push(d), l += 1;
        }
      } else {
        const o = Math.min(
          this._start + this.maxCacheLength,
          this._urls.length - 1
        );
        for (let h = this._start; h < o; h++)
          r.push(h);
      }
      for (let o = 0; o < r.length; o++) {
        const h = this._allTasks[o];
        h && h.status == 0 && (h.status = 2);
      }
      console.log("生成任务:", r);
    }
    this.retry();
  }
  /**
   * 重试加载
   */
  retry() {
    if (this._start < 0)
      return;
    this._allTasks.filter((s) => s.status === 2).map((s) => {
      this.loadTask(s);
    });
  }
  loadTask(t) {
    console.log(`加载任务:${t.url}`);
    const s = document.createElement("img");
    s.addEventListener("error", (n) => {
      console.error(n);
    }), s.addEventListener("load", () => {
    }), s.setAttribute("src", t.url);
  }
}
class ct {
  constructor(e) {
    a(this, "_callback");
    a(this, "_target", null);
    a(this, "_evtOnResize");
    this._callback = e, this._evtOnResize = this.onResize.bind(this);
  }
  observe(e) {
    this._target = e, window.addEventListener("resize", this._evtOnResize);
  }
  unobserver(e) {
  }
  disconnect() {
    window.removeEventListener("resize", this._evtOnResize);
  }
  onResize(e) {
    this._target && this._callback({
      contentRect: this._target.getBoundingClientRect(),
      target: this._target
    });
  }
}
class dt extends z {
  constructor() {
    super();
    a(this, "_target", null);
    a(this, "_observer");
    if ("ResizeObserver" in window) {
      const t = window.ResizeObserver;
      this._observer = new t((s) => {
        console.log(s), this.dispatch("resize");
      });
    } else
      this._observer = new ct((t) => {
        console.log(t), this.dispatch("resize");
      });
  }
  observe(t) {
    this._target = t, this._observer.observe(t);
  }
  unobserver(t) {
    this._observer.unobserve(t);
  }
  disconnect() {
    this._observer.unobserve(this._target);
  }
}
const R = class extends z {
  constructor(t, s) {
    var n;
    super();
    a(this, "container", null);
    a(this, "_initialzed", !1);
    /**
     * 顶部工具
     */
    a(this, "toolbar", null);
    a(this, "imageviewer", null);
    /**
     * 中间内容区
     */
    a(this, "viewport", null);
    a(this, "nav", null);
    /**
     * 缩略图
     */
    a(this, "thumbs", null);
    /**
     * viewport中的 图片展示模块
     */
    a(this, "track", null);
    /**
     * Moobox所在的根节点
     */
    a(this, "root");
    /**
     * 默认选中的项
     */
    a(this, "_selectedIndex", 0);
    a(this, "_option");
    a(this, "_data", R.generateDefaultConfig());
    a(this, "_oldTracker", null);
    a(this, "$content");
    a(this, "tracks", {});
    a(this, "buffer");
    a(this, "transformAnimate", null);
    a(this, "transformAnimateRunning", !1);
    a(this, "_debounceAni");
    a(this, "_debounceResize");
    a(this, "resizeObject");
    a(this, "evtOnWheel");
    a(this, "evtOnMoon");
    /** 
     * track dom event
     */
    a(this, "evtOnTrack");
    a(this, "evtOnResize");
    /**
     * 动画初始值
     */
    a(this, "transform", { x: 0, dragstart: new m(), dragstartTime: (/* @__PURE__ */ new Date()).valueOf() });
    a(this, "containerBox", {
      width: 0,
      height: 0
    });
    a(this, "viewportBox", {
      width: 0,
      height: 0
    });
    /**
     * 内容数据配置
     */
    a(this, "content", {
      origWidth: 0,
      origHeight: 0,
      width: 0,
      height: 0,
      x: 0,
      y: 0,
      scale: 0,
      fitWidth: 0,
      fitHeight: 0
    });
    a(this, "progress", null);
    /**
     * 自动播放控制
     */
    a(this, "_autoplayTimerId");
    a(this, "_autoplay", !1);
    a(this, "_autoplayDuration", 0);
    if (!t)
      throw new Error("*** 构造时请配置Moobox的父容器 ***");
    if (this._option = Object.assign(s || {}, R.generateDefaultConfig()), this.content.scale = this._option.initScale, this.root = t, typeof this._option.data == "object")
      this._data = this._option.data;
    else {
      const r = (n = this._option) == null ? void 0 : n.data;
      typeof r == "function" && (this._data = r());
    }
  }
  static generateDefaultConfig() {
    return {
      initScale: 1,
      minScale: 1,
      maxScale: 2,
      zoomStep: 0.5,
      wheelFactor: 42,
      //wheelFactor: 10,
      wheelLimit: 5,
      zoom: !0,
      ratio: 1,
      images: []
    };
  }
  open(t) {
    t = t || { index: 0 };
    let s = t.index;
    t.url && (s = this._data.images.findIndex((n) => n === t.url)), (!s || s < 0) && (s = 0), this._selectedIndex = s, this.initialize();
  }
  close() {
    this.destroy();
  }
  create() {
    this.container = v("container", this.root), this.toolbar = v("toolbar", this.container), this.progress = v("progress", this.container), this.imageviewer = v("imageviewer", this.container), this.viewport = v("viewport", this.imageviewer), this.nav = v("nav", this.imageviewer), this.nav.innerHTML = `
     <div class="icon icon-left">
       <svg class="svg-icon" style="width:35px; height:35px;">
         <use xlink:href="#icon-left" fill="#CCCCCC"></use>
       </svg>
     </div>
     <div class="icon icon-right">
         <svg class="svg-icon" style="width: 35px; height:35px;">
         <use xlink:href="#icon-right" fill="#CCCCCC"></use>
       </svg>
     </div>
     `, this.thumbs = v("thumbs", this.container), this.track = v("track", this.viewport);
  }
  async initialize() {
    this._initialzed || (this.create(), this.buffer = new lt(this._data.images, { maxCacheLength: 10 }), this.evtOnWheel = this.onWheelEvent.bind(this), this.evtOnMoon = this.onMoonBoxEvent.bind(this), this.evtOnTrack = this.onTrackEvent.bind(this), this.evtOnResize = this.onResizeEvent.bind(this), this.nav && (c(this.nav).delegate(".icon-left", "click", () => {
      this.prev();
    }), c(this.nav).delegate(".icon-right", "click", () => {
      this.next();
    })), this.resizeObject = new dt(), this.resizeObject.addEventListener("resize", this.evtOnResize), this.resizeObject.observe(this.root), this.attachEvent(), this.buffer && this.buffer.load(0), this.setSelectedIndex(this._selectedIndex), this.track && (this.getViewPort(), this.tracks = {}, this.updateTracks()), this._option.navigation && this._option.navigation.setup(this), this._option.toolbar && this._option.toolbar.setup(this), this.setCursor("grab"), this.update());
  }
  option(t, s) {
    return typeof this._option[t] == "function" ? this._option[t].call(this) : this._option[t] || s;
  }
  attachEvent() {
    var t;
    [_.ZOOM_WHEEL, _.RESIZE, _.PAN_END].map((s) => {
      this.addEventListener(s, this.onMoonBoxEvent);
    }), (t = this.track) == null || t.addEventListener("mousedown", this.evtOnTrack);
  }
  onWheelEvent(t) {
    this.dispatch(new _(_.ZOOM_WHEEL, { originEvent: t }));
  }
  onMoonBoxEvent(t) {
    switch (typeof t == "string" ? t : t.type) {
      case _.ZOOM_WHEEL:
        break;
      case _.RESIZE:
        this._option.navigation && (this._debounceResize = j(() => {
          for (let r in this.tracks)
            try {
              const o = this.tracks[r], h = this.getViewPort().width;
              o.updateViewPort(this.getViewPort()), o.index != this._selectedIndex && c.css(o.container, "left", h * o.index), this.transform.x = -h * this._selectedIndex, this.update();
            } catch {
            }
          const n = this._option.navigation;
          n && n.redraw();
        }, 300, this)());
        break;
      case _.PAN_END:
        this._autoplay && this.autoplay(!0);
        break;
    }
  }
  onTrackEvent(t) {
    const s = this.getViewPort().width, n = -this._selectedIndex * s;
    let r = new m();
    switch (t.type) {
      case "mousedown":
        if (this.currentTracker && this.currentTracker.canPan())
          return;
        this.currentTracker && this.currentTracker.setCursor(""), this.transform.dragstart = new m(t.clientX, t.clientY), this.transform.dragstartTime = (/* @__PURE__ */ new Date()).valueOf(), document.addEventListener("mouseup", this.evtOnTrack), document.addEventListener("mousemove", this.evtOnTrack);
        break;
      case "mousemove":
        this.setCursor("grabbing"), r = new m(
          t.clientX - this.transform.dragstart.x,
          t.clientY - this.transform.dragstart.y
        ), this.transform.x = n + r.x, this.update();
        break;
      case "mouseup":
        this.setCursor("grab"), r = new m(
          t.clientX - this.transform.dragstart.x,
          t.clientY - this.transform.dragstart.y
        );
        let o = Math.abs(r.x) > s / 3;
        Math.abs(r.x) / ((/* @__PURE__ */ new Date()).valueOf() - this.transform.dragstartTime) > 0.6 && (o = !0), o ? r.x < 0 ? this.next() : this.prev() : this.panTo(new m(n, 0)), document.removeEventListener("mouseup", this.evtOnTrack), document.removeEventListener("mousemove", this.evtOnTrack);
        break;
    }
  }
  onResizeEvent(t) {
    this.dispatch(new _(_.RESIZE, t));
  }
  /**
   * 当前的Moobox 的应用宽度
   * @returns
   */
  getViewPort() {
    if (this.viewport) {
      this.viewport = this.viewport;
      const t = this.viewport.getBoundingClientRect();
      return new b(
        0,
        0,
        t.width,
        t.height
        // this.viewport.offsetWidth,
        // this.viewport.offsetHeight
      );
    } else
      return new b();
  }
  get viewPortPadding() {
    return new m(100, 30);
  }
  zoomIn(t) {
    this.zoomTo(this.content.scale + (t || this._option.initScale || 1));
  }
  zoomTo(t, s = new m()) {
    (!isNaN(t) || !Number.isFinite(t)) && (t = this._option.initScale || 1), t = Math.max(
      this._option.minScale || 1,
      Math.min(t, this.option("maxScale"))
    ), t = F(t);
  }
  getZoomDelta(t, s = 0, n = 0) {
    var r = s, o = n, h = this.content.fitWidth * this.content.scale, l = this.content.fitHeight * this.content.scale, u = r > 0 && h ? r / h : 0, d = o > 0 && l ? o / l : 0, f = this.content.fitWidth * t, g = this.content.fitHeight * t;
    const w = (f - h) * u, p = (g - l) * d;
    return {
      deltaX: w,
      deltaY: p
    };
  }
  /**
   * 选中一个图片
   * @param index
   */
  setSelectedIndex(t) {
    this._option.navigation && this._option.navigation.highlight(t), this._option.toolbar && (this._option.toolbar.title = `${t + 1} / ${this._data.images.length}`);
  }
  next() {
    const t = this._option.navigation;
    t && t.next();
  }
  prev() {
    const t = this._option.navigation;
    t && t.prev();
  }
  /**
   * 直接的方式更新index
   * @param index 
   */
  updateIndex(t) {
  }
  /**
   * 动画的方式修改当前选中项
   * @param index 
   */
  switchIndex(t) {
    const s = t != this._selectedIndex;
    this._selectedIndex = t;
    const n = this.trackCount - 1, r = 0;
    if (this.track) {
      this._oldTracker && this._oldTracker.reset();
      const u = this.currentTracker;
      this._oldTracker = u;
      const d = this.getViewPort().width;
      for (let g in this.tracks)
        this.tracks[g].hide();
      [this.prevTracker, u, this.nextTracker].map((g, w) => {
        if (g) {
          g.show();
          const p = g.container;
          let x = g.index * d;
          console.log("vw==", d), c.css(p, "left", x);
        }
      });
    }
    const o = this.getViewPort().width;
    if (this.transformAnimateRunning = !0, !s)
      return;
    console.log("目标位置：", -t * o, "当前位置 :", this.transform.x);
    let h = -o * t;
    if (Math.abs(h - this.transform.x) <= 0.01)
      return;
    const l = {
      duration: 1e3,
      from: { x: this.transform.x },
      to: { x: h },
      onUpdate: (u) => {
        this.transformAnimateRunning = !0, this.transform = { ...this.transform, ...u }, this.update();
      },
      onComplete: (u) => {
        var f, g;
        this.transform = { ...this.transform, ...u }, this.transformAnimateRunning = !1, this.update(), this.updateTracks(), this.dispatch(_.PAN_END);
        let d = ((f = this._option.navigation) == null ? void 0 : f.currentIndex) ?? 0;
        (d < r || d > n) && (d < r && (d = n), d > n && (d = r), (g = this._option.navigation) == null || g.reviseIndex(d), this.transform.x = -d * o, this.update());
      }
    };
    this.transformAnimate = E.create(l), this.transformAnimate.start();
  }
  panTo(t) {
    this.transformAnimateRunning = !0, this.getViewPort().width;
    const s = {
      duration: 1e3,
      from: { x: this.transform.x },
      to: { x: t.x },
      onUpdate: (n) => {
        this.transformAnimateRunning = !0, this.transform = { ...this.transform, ...n }, this.update();
      },
      onComplete: (n) => {
        this.transform = { ...this.transform, ...n }, this.transformAnimateRunning = !1, this.update(), this.updateTracks();
      }
    };
    this.transformAnimate = E.create(s), this.transformAnimate.start();
  }
  /**
   * 更新重绘
   */
  update() {
    this._option.toolbar && (this._option.toolbar.title = `${this._selectedIndex + 1} / ${this._data.images.length}`);
    const t = this.transform.x;
    this.track && c.css(this.track, {
      transform: `translate3d(${t}px, 0px, 0px) scale(1)`
    }), this._autoplay || this.progress && this.progress && (this.progress.style.cssText = "width:0%;transition:none;");
  }
  updateTracks() {
    const t = [this.prevTracker, this.currentTracker, this.nextTracker];
    this._selectedIndex;
    const s = this._data.images.length - 1, n = this.getViewPort().width;
    t.map((r, o) => {
      if (r) {
        const h = r.index < 0 ? s : r.index > s ? 0 : r.index;
        r.load(this._data.images[h]);
        const l = r.container;
        let u = r.index * n;
        c.css(l, "left", u);
      }
    });
  }
  getData() {
    return this._data;
  }
  setCursor(t) {
    ["grab", "grabbing"].map((s) => {
      this.track && c.removeClass(this.track, `cursor-${s}`);
    }), this.track && c.addClass(this.track, `cursor-${t}`);
  }
  swapTop(t = !0) {
    this.imageviewer && (t ? c.css(this.imageviewer, "z-index", 100) : c.css(this.imageviewer, "z-index", ""));
  }
  autoplay(t = !0) {
    this._autoplay = t, clearInterval(this._autoplayTimerId), t && (this._autoplayTimerId = setInterval(() => {
      if (this._autoplayDuration > 2e3) {
        this._autoplayDuration = 0, clearInterval(this._autoplayTimerId), this.next();
        return;
      }
      this._autoplayDuration += 100;
      const r = this._autoplayDuration / 2e3 * 100;
      this.progress && (this.progress.style.cssText = `width:${r}%`);
    }, 100)), this._autoplay ? this.dispatch(new _(_.PLAY, {})) : this.dispatch(new _(_.PAUSE, {})), this.update();
  }
  get isAutoPlay() {
    return this._autoplay;
  }
  toggleList() {
    this.thumbs && c.toggleVisible(this.thumbs), this.update(), this.currentTracker && this.currentTracker.reset();
  }
  /**
   * 图片数据个数
   */
  get trackCount() {
    return this._data.images.length;
  }
  genernateTrack(t) {
    let s = this.tracks[t] || new ht(
      this,
      this.track,
      {
        // width: 100,
        // height: 200
      },
      this.getViewPort()
    );
    return s.index = t, this.tracks[t] = s, s;
  }
  get currentTracker() {
    return this.genernateTrack(this._selectedIndex);
  }
  get prevTracker() {
    return this.genernateTrack(this._selectedIndex - 1);
  }
  get nextTracker() {
    return this.genernateTrack(this._selectedIndex + 1);
  }
  destroy() {
    var t;
    this.resizeObject && (this.resizeObject.removeEventListener("resize", this.evtOnResize), this.resizeObject.unobserver(this.root), this.resizeObject = null), (t = this.root.parentElement) == null || t.removeChild(this.root), this.autoplay(!1);
  }
};
let k = R;
a(k, "ImageNavigation", Y), a(k, "Toolbar", Z);
k.Toolbar = Z;
k.ImageNavigation = L;
const q = "[data-moobox]", ut = (i) => i.replace(/-([a-z])/g, (e, t) => t.toUpperCase()), gt = () => {
  console.log("auto install");
  const i = document.querySelectorAll(q);
  for (let t of i)
    t.addEventListener("click", (s) => {
      s.stopImmediatePropagation(), s.stopPropagation(), s.preventDefault();
      const n = t.getAttribute("href") || "";
      e(document.body, n);
    });
  const e = (t, s) => {
    var u;
    const n = [], r = [], o = document.querySelectorAll(q);
    for (let d of o)
      n.push(d.getAttribute("href") || ""), r.push(((u = d.querySelector("img")) == null ? void 0 : u.getAttribute("src")) || "");
    const h = document.createElement("div");
    h.setAttribute("id", "moobox-" + Math.floor(Math.random() * 1e3)), h.className = "moobox", t.append(h), new k(h, {
      selectedIndex: 0,
      //images.length - 1,
      data: () => ({
        images: n,
        thumbs: r
      }),
      toolbar: new k.Toolbar({}),
      navigation: new k.ImageNavigation({
        maxCount: -1
      })
    }).open({
      url: s
    });
  };
};
export {
  gt as autoInstall
};