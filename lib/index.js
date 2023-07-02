var G = Object.defineProperty;
var Q = (i, e, t) => e in i ? G(i, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : i[e] = t;
var a = (i, e, t) => (Q(i, typeof e != "symbol" ? e + "" : e, t), t);
const K = ["Webkit", "Moz", "ms"], q = document.createElement("div").style;
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
}, Y = {};
c.getFinalPropName = (i) => {
  const e = (s) => (K.map((n) => {
    const r = s.replace(/^\w/gi, function(o) {
      return o.toUpperCase();
    });
    return n + r;
  }).find((n) => {
    if (n in q)
      return n;
  }), "");
  var t = Y[i];
  return t || (i in q ? i : Y[i] = e(i) || i);
};
c.isPixCssProps = (i) => {
  var e = /^[a-z]/, t = /^(?:Border(?:Top|Right|Bottom|Left)?(?:Width|)|(?:Margin|Padding)?(?:Top|Right|Bottom|Left)?|(?:Min|Max)?(?:Width|Height))$/;
  return e.test(i) && t.test(i[0].toUpperCase() + i.slice(1));
};
c.getStyles = (i) => window.getComputedStyle(i, null);
c.cssCamelCase = (i) => dt(i.replace(/^-ms-/, "ms-"));
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
class E {
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
    t && o.push(t), n.map(({ func: l, args: d }, u) => {
      try {
        l.apply(r, o.concat(d || []));
      } catch {
      }
    }), (this._once_events[s] || []).map(({ func: l, args: d }, u) => {
      try {
        l.apply(r, o.concat(d || []));
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
class V extends E {
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
var O = Object.freeze({
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
      return 1 - O.Bounce.Out(1 - i);
    },
    Out: function(i) {
      return i < 1 / 2.75 ? 7.5625 * i * i : i < 2 / 2.75 ? 7.5625 * (i -= 1.5 / 2.75) * i + 0.75 : i < 2.5 / 2.75 ? 7.5625 * (i -= 2.25 / 2.75) * i + 0.9375 : 7.5625 * (i -= 2.625 / 2.75) * i + 0.984375;
    },
    InOut: function(i) {
      return i < 0.5 ? O.Bounce.In(i * 2) * 0.5 : O.Bounce.Out(i * 2 - 1) * 0.5 + 0.5;
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
}), M = function() {
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
      e === void 0 && (e = M()), t === void 0 && (t = !1);
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
), I = {
  Linear: function(i, e) {
    var t = i.length - 1, s = t * e, n = Math.floor(s), r = I.Utils.Linear;
    return e < 0 ? r(i[0], i[1], s) : e > 1 ? r(i[t], i[t - 1], t - s) : r(i[n], i[n + 1 > t ? t : n + 1], s - n);
  },
  Bezier: function(i, e) {
    for (var t = 0, s = i.length - 1, n = Math.pow, r = I.Utils.Bernstein, o = 0; o <= s; o++)
      t += n(1 - e, s - o) * n(e, o) * i[o] * r(s, o);
    return t;
  },
  CatmullRom: function(i, e) {
    var t = i.length - 1, s = t * e, n = Math.floor(s), r = I.Utils.CatmullRom;
    return i[0] === i[t] ? (e < 0 && (n = Math.floor(s = t * (1 + e))), r(i[(n - 1 + t) % t], i[n], i[(n + 1) % t], i[(n + 2) % t], s - n)) : e < 0 ? i[0] - (r(i[0], i[0], i[1], i[1], -s) - i[0]) : e > 1 ? i[t] - (r(i[t], i[t], i[t - 1], i[t - 1], s - t) - i[t]) : r(i[n ? n - 1 : 0], i[n], i[t < n + 1 ? t : n + 1], i[t < n + 2 ? t : n + 2], s - n);
  },
  Utils: {
    Linear: function(i, e, t) {
      return (e - i) * t + i;
    },
    Bernstein: function(i, e) {
      var t = I.Utils.Factorial;
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
), U = new it(), B = (
  /** @class */
  function() {
    function i(e, t) {
      t === void 0 && (t = U), this._object = e, this._group = t, this._isPaused = !1, this._pauseStart = 0, this._valuesStart = {}, this._valuesEnd = {}, this._valuesStartRepeat = {}, this._duration = 1e3, this._isDynamic = !1, this._initialRepeat = 0, this._repeat = 0, this._yoyo = !1, this._isPlaying = !1, this._reversed = !1, this._delayTime = 0, this._startTime = 0, this._easingFunction = O.Linear.None, this._interpolationFunction = I.Linear, this._chainedTweens = [], this._onStartCallbackFired = !1, this._onEveryStartCallbackFired = !1, this._id = st.nextId(), this._isChainStopped = !1, this._propertiesAreSetUp = !1, this._goToEnd = !1;
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
      if (e === void 0 && (e = M()), t === void 0 && (t = !1), this._isPlaying)
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
        var h = e[o], l = Array.isArray(h), d = l ? "array" : typeof h, u = !l && Array.isArray(s[o]);
        if (!(d === "undefined" || d === "function")) {
          if (u) {
            var f = s[o];
            if (f.length === 0)
              continue;
            for (var g = [h], w = 0, p = f.length; w < p; w += 1) {
              var x = this._handleRelativeValue(h, f[w]);
              if (isNaN(x)) {
                u = !1, console.warn("Found invalid interpolation list. Skipping.");
                break;
              }
              g.push(x);
            }
            u && (s[o] = g);
          }
          if ((d === "object" || l) && h && !u) {
            t[o] = l ? [] : {};
            var T = h;
            for (var z in T)
              t[o][z] = T[z];
            n[o] = l ? [] : {};
            var f = s[o];
            if (!this._isDynamic) {
              var $ = {};
              for (var z in f)
                $[z] = f[z];
              s[o] = f = $;
            }
            this._setupProperties(T, t[o], f, n[o], r);
          } else
            (typeof t[o] > "u" || r) && (t[o] = h), l || (t[o] *= 1), u ? n[o] = s[o].slice().reverse() : n[o] = t[o] || 0;
        }
      }
    }, i.prototype.stop = function() {
      return this._isChainStopped || (this._isChainStopped = !0, this.stopChainedTweens()), this._isPlaying ? (this._group && this._group.remove(this), this._isPlaying = !1, this._isPaused = !1, this._onStopCallback && this._onStopCallback(this._object), this) : this;
    }, i.prototype.end = function() {
      return this._goToEnd = !0, this.update(1 / 0), this;
    }, i.prototype.pause = function(e) {
      return e === void 0 && (e = M()), this._isPaused || !this._isPlaying ? this : (this._isPaused = !0, this._pauseStart = e, this._group && this._group.remove(this), this);
    }, i.prototype.resume = function(e) {
      return e === void 0 && (e = M()), !this._isPaused || !this._isPlaying ? this : (this._isPaused = !1, this._startTime += e - this._pauseStart, this._pauseStart = 0, this._group && this._group.add(this), this);
    }, i.prototype.stopChainedTweens = function() {
      for (var e = 0, t = this._chainedTweens.length; e < t; e++)
        this._chainedTweens[e].stop();
      return this;
    }, i.prototype.group = function(e) {
      return e === void 0 && (e = U), this._group = e, this;
    }, i.prototype.delay = function(e) {
      return e === void 0 && (e = 0), this._delayTime = e, this;
    }, i.prototype.repeat = function(e) {
      return e === void 0 && (e = 0), this._initialRepeat = e, this._repeat = e, this;
    }, i.prototype.repeatDelay = function(e) {
      return this._repeatDelayTime = e, this;
    }, i.prototype.yoyo = function(e) {
      return e === void 0 && (e = !1), this._yoyo = e, this;
    }, i.prototype.easing = function(e) {
      return e === void 0 && (e = O.Linear.None), this._easingFunction = e, this;
    }, i.prototype.interpolation = function(e) {
      return e === void 0 && (e = I.Linear), this._interpolationFunction = e, this;
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
      if (e === void 0 && (e = M()), t === void 0 && (t = !0), this._isPaused)
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
          var o = t[r] || 0, h = s[r], l = Array.isArray(e[r]), d = Array.isArray(h), u = !l && d;
          u ? e[r] = this._interpolationFunction(h, n) : typeof h == "object" && h ? this._updateProperties(e[r], o, h, n) : (h = this._handleRelativeValue(o, h), typeof h == "number" && (e[r] = o + (h - o) * n));
        }
    }, i.prototype._handleRelativeValue = function(e, t) {
      return typeof t != "string" ? t : t.charAt(0) === "+" || t.charAt(0) === "-" ? e + parseFloat(t) : parseFloat(t);
    }, i.prototype._swapEndStartRepeatValues = function(e) {
      var t = this._valuesStartRepeat[e], s = this._valuesEnd[e];
      typeof s == "string" ? this._valuesStartRepeat[e] = this._valuesStartRepeat[e] + parseFloat(s) : this._valuesStartRepeat[e] = this._valuesEnd[e], this._valuesEnd[e] = t;
    }, i;
  }()
), y = U;
y.getAll.bind(y);
y.removeAll.bind(y);
y.add.bind(y);
y.remove.bind(y);
y.update.bind(y);
const S = class {
  constructor(e = S.defaultOption) {
    a(this, "_tween", new B({}));
    a(this, "_option");
    a(this, "_animateId", -1);
    this._option = Object.assign(
      Object.assign({}, S.defaultOption),
      e || {}
    ), this._tween = new B(this._option.from, !1);
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
let P = S;
a(P, "defaultOption", {
  from: {},
  to: {},
  duration: 200,
  //ease: TWEEN.Easing.Linear.None,
  ease: O.Cubic.Out
});
const nt = navigator.userAgent.indexOf("Macintosh") !== -1 && navigator.userAgent.indexOf("WebKit") !== -1;
class rt extends E {
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
const C = class extends V {
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
      const d = h > 0 ? l : -l;
      this.highlightTo(d, l);
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
    const n = this._options.maxCount || 0, r = n < 0, o = this._options.minWidth ?? 60, h = this._options.maxWidth ?? o, l = r ? 0 : C.PADDING - 3, d = (this._tracks.length - 1) * o + h;
    if (this.moobox) {
      const u = this.moobox.getViewPort().width, f = Math.min(
        n,
        Math.floor(u / o - 1)
      );
      let g = f > 0 ? (f - 1) * o + h : u;
      s = l, t = -d + g + l;
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
      this.transformAnimate = P.create(r), this.transformAnimate.start();
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
    const n = this._options.maxCount || 0, r = n < 0, o = this._options.minWidth ?? 60, h = this._options.maxWidth ?? o, l = r ? 0 : C.PADDING - 3, d = (this._tracks.length - 1) * o + h;
    if (this._tracks.map((u, f) => {
      var g, w;
      f === this.highlightIndex ? (u.setSelected(!0), s ? (g = this.moobox) == null || g.switchIndex(f) : (w = this.moobox) == null || w.updateIndex(f)) : u.setSelected(!1), c.css(u.container, "width", o);
    }), this._currentDebounce = j(() => {
      const u = this._tracks[this.highlightIndex];
      u && c.css(u.container, "width", h);
    }, t, this)(), this.moobox) {
      const u = this.moobox.getViewPort().width, f = Math.min(
        n,
        Math.floor(u / o - 1)
      );
      let g = f > 0 ? (f - 1) * o + h : u;
      const w = this.moobox.getViewPort().width / 2;
      let p = Math.max(o, h) / 2, x = w - this.highlightIndex * o - p;
      x = -this.highlightIndex * o + g / 2 - p, x += l, x = Math.min(l, x), x = Math.max(-d + g + l, x), this.scrollview && c.css(this.scrollview, {
        width: d,
        left: x
      });
      let T = u / 2 - g / 2 - l;
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
let D = C;
/**
 * 左右的同间距，用于显示上一页，下一页
 */
a(D, "PADDING", 15);
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
class at extends E {
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
      let l = this._moobox.option("wheelFactor"), d = n * (100 + s * l) / 100;
      if (s < 0 && Math.abs(n - r) < 0.01 || s > 0 && Math.abs(n - o) < 0.01 ? (this.changedDelta += Math.abs(s), d = n) : (this.changedDelta = 0, d = Math.max(Math.min(d, o), r)), this.changedDelta < h && (e.preventDefault(), d !== n)) {
        const u = this._content.getBoundingClientRect(), f = Math.min(
          this.viewPort.x + this._size.width,
          Math.max(this.viewPort.x, e.clientX)
        ), g = Math.min(
          this.viewPort.y + this._size.height,
          Math.max(this.viewPort.y, e.clientY)
        );
        let w = f - u.left, p = g - u.top;
        s > 0 && this._moobox.swapTop(!0), this.zoomTo(d, new m(w, p), { duration: 30 });
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
    let r = this.transform.oldX, o = this.transform.oldY, h = this._size.width / 2, l = this._size.height / 2, d = (h + r - t.x) * (e / n) - (h - t.x), u = (l + o - t.y) * (e / n) - (l - t.y);
    e <= 1.005 && (u = 0, d = 0), this.setCursor("grab"), this.panTo(e, new m(d, u), s);
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
        s && s.duration && (n.duration = s.duration), this.transformAnimate = P.create(n), this.transformAnimate.start();
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
const X = class extends E {
  constructor(t, s, n = X.defaultOption) {
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
let R = X;
a(R, "defaultOption", {
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
class Z extends E {
  constructor(t = null) {
    super();
    a(this, "viewport", null);
    a(this, "moobox", null);
    a(this, "navHeader", null);
    a(this, "navContainer", null);
    a(this, "_icons", []);
  }
  create() {
    var l, d, u, f, g, w;
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
    const t = (l = this.navContainer) == null ? void 0 : l.querySelector(".icon-play"), s = (d = this.navContainer) == null ? void 0 : d.querySelector(".icon-pause"), n = (u = this.navContainer) == null ? void 0 : u.querySelector(".icon-list"), r = (f = this.navContainer) == null ? void 0 : f.querySelector(".icon-fullscreen"), o = (g = this.navContainer) == null ? void 0 : g.querySelector(".icon-fullscreen-exit"), h = (w = this.navContainer) == null ? void 0 : w.querySelector(".icon-close");
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
    this.navContainer && new R(this.navContainer, t.name);
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
      const o = (t = this.navContainer) == null ? void 0 : t.querySelector(".icon-play"), h = (s = this.navContainer) == null ? void 0 : s.querySelector(".icon-pause"), l = (n = this.navContainer) == null ? void 0 : n.querySelector(".icon-fullscreen"), d = (r = this.navContainer) == null ? void 0 : r.querySelector(".icon-fullscreen-exit");
      [o, h, l, d].map((u) => {
        u && c.hide(u);
      }), this.moobox.isAutoPlay ? c.show(h) : c.show(o), W.isFullScreen() ? c.show(d) : c.show(l);
    }
  }
}
class lt extends E {
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
          let d = this._start + l, u = this._start - l;
          if (r.length > this.maxCacheLength)
            break;
          d <= h && r.push(d), u >= o && r.push(u), l += 1;
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
class ut extends E {
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
const L = class extends E {
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
    a(this, "_data", L.generateDefaultConfig());
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
    if (this._option = Object.assign(s || {}, L.generateDefaultConfig()), this.content.scale = this._option.initScale, this.root = t, typeof this._option.data == "object")
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
    })), this.resizeObject = new ut(), this.resizeObject.addEventListener("resize", this.evtOnResize), this.resizeObject.observe(this.root), this.attachEvent(), this.buffer && this.buffer.load(0), this.setSelectedIndex(this._selectedIndex), this.track && (this.getViewPort(), this.tracks = {}, this.updateTracks()), this._option.navigation && this._option.navigation.setup(this), this._option.toolbar && this._option.toolbar.setup(this), this.setCursor("grab"), this.update());
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
    var r = s, o = n, h = this.content.fitWidth * this.content.scale, l = this.content.fitHeight * this.content.scale, d = r > 0 && h ? r / h : 0, u = o > 0 && l ? o / l : 0, f = this.content.fitWidth * t, g = this.content.fitHeight * t;
    const w = (f - h) * d, p = (g - l) * u;
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
      const d = this.currentTracker;
      this._oldTracker = d;
      const u = this.getViewPort().width;
      for (let g in this.tracks)
        this.tracks[g].hide();
      [this.prevTracker, d, this.nextTracker].map((g, w) => {
        if (g) {
          g.show();
          const p = g.container;
          let x = g.index * u;
          console.log("vw==", u), c.css(p, "left", x);
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
      onUpdate: (d) => {
        this.transformAnimateRunning = !0, this.transform = { ...this.transform, ...d }, this.update();
      },
      onComplete: (d) => {
        var f, g;
        this.transform = { ...this.transform, ...d }, this.transformAnimateRunning = !1, this.update(), this.updateTracks(), this.dispatch(_.PAN_END);
        let u = ((f = this._option.navigation) == null ? void 0 : f.currentIndex) ?? 0;
        (u < r || u > n) && (u < r && (u = n), u > n && (u = r), (g = this._option.navigation) == null || g.reviseIndex(u), this.transform.x = -u * o, this.update());
      }
    };
    this.transformAnimate = P.create(l), this.transformAnimate.start();
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
    this.transformAnimate = P.create(s), this.transformAnimate.start();
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
        let d = r.index * n;
        c.css(l, "left", d);
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
let k = L;
a(k, "ImageNavigation", V), a(k, "Toolbar", Z);
k.Toolbar = Z;
k.ImageNavigation = D;
const H = "[data-moobox]", dt = (i) => i.replace(/-([a-z])/g, (e, t) => t.toUpperCase()), gt = () => {
  console.log("auto install");
  const i = document.querySelectorAll(H);
  for (let t of i)
    t.addEventListener("click", (s) => {
      s.stopImmediatePropagation(), s.stopPropagation(), s.preventDefault();
      const n = t.getAttribute("href") || "";
      e(document.body, n);
    });
  const e = (t, s) => {
    var d;
    const n = [], r = [], o = document.querySelectorAll(H);
    for (let u of o)
      n.push(u.getAttribute("href") || ""), r.push(((d = u.querySelector("img")) == null ? void 0 : d.getAttribute("src")) || "");
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
