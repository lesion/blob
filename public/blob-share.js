function z() {
}
function P(t) {
  return t();
}
function J() {
  return /* @__PURE__ */ Object.create(null);
}
function R(t) {
  t.forEach(P);
}
function q(t) {
  return typeof t == "function";
}
function fe(t, e) {
  return t != t ? e == e : t !== e || t && typeof t == "object" || typeof t == "function";
}
let T;
function K(t, e) {
  return T || (T = document.createElement("a")), T.href = e, t === T.href;
}
function ce(t) {
  return Object.keys(t).length === 0;
}
function d(t, e) {
  t.appendChild(e);
}
function w(t, e, n) {
  t.insertBefore(e, n || null);
}
function y(t) {
  t.parentNode && t.parentNode.removeChild(t);
}
function ae(t, e) {
  for (let n = 0; n < t.length; n += 1)
    t[n] && t[n].d(e);
}
function _(t) {
  return document.createElement(t);
}
function j(t) {
  return document.createTextNode(t);
}
function S() {
  return j(" ");
}
function ue() {
  return j("");
}
function f(t, e, n) {
  n == null ? t.removeAttribute(e) : t.getAttribute(e) !== n && t.setAttribute(e, n);
}
function de(t) {
  return Array.from(t.childNodes);
}
function N(t, e) {
  e = "" + e, t.wholeText !== e && (t.data = e);
}
function E(t, e, n) {
  t.classList[n ? "add" : "remove"](e);
}
function he(t) {
  const e = {};
  for (const n of t)
    e[n.name] = n.value;
  return e;
}
let L;
function A(t) {
  L = t;
}
function ge() {
  if (!L)
    throw new Error("Function called outside component initialization");
  return L;
}
function me(t) {
  ge().$$.on_mount.push(t);
}
const C = [], Q = [], H = [], W = [], be = Promise.resolve();
let D = !1;
function _e() {
  D || (D = !0, be.then(x));
}
function F(t) {
  H.push(t);
}
const O = /* @__PURE__ */ new Set();
let B = 0;
function x() {
  const t = L;
  do {
    for (; B < C.length; ) {
      const e = C[B];
      B++, A(e), pe(e.$$);
    }
    for (A(null), C.length = 0, B = 0; Q.length; )
      Q.pop()();
    for (let e = 0; e < H.length; e += 1) {
      const n = H[e];
      O.has(n) || (O.add(n), n());
    }
    H.length = 0;
  } while (C.length);
  for (; W.length; )
    W.pop()();
  D = !1, O.clear(), A(t);
}
function pe(t) {
  if (t.fragment !== null) {
    t.update(), R(t.before_update);
    const e = t.dirty;
    t.dirty = [-1], t.fragment && t.fragment.p(t.ctx, e), t.after_update.forEach(F);
  }
}
const ke = /* @__PURE__ */ new Set();
function ve(t, e) {
  t && t.i && (ke.delete(t), t.i(e));
}
function xe(t, e, n, l) {
  const { fragment: r, after_update: o } = t.$$;
  r && r.m(e, n), l || F(() => {
    const i = t.$$.on_mount.map(P).filter(q);
    t.$$.on_destroy ? t.$$.on_destroy.push(...i) : R(i), t.$$.on_mount = [];
  }), o.forEach(F);
}
function we(t, e) {
  const n = t.$$;
  n.fragment !== null && (R(n.on_destroy), n.fragment && n.fragment.d(e), n.on_destroy = n.fragment = null, n.ctx = []);
}
function ye(t, e) {
  t.$$.dirty[0] === -1 && (C.push(t), _e(), t.$$.dirty.fill(0)), t.$$.dirty[e / 31 | 0] |= 1 << e % 31;
}
function $e(t, e, n, l, r, o, i, u = [-1]) {
  const a = L;
  A(t);
  const s = t.$$ = {
    fragment: null,
    ctx: [],
    props: o,
    update: z,
    not_equal: r,
    bound: J(),
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(e.context || (a ? a.$$.context : [])),
    callbacks: J(),
    dirty: u,
    skip_bound: !1,
    root: e.target || a.$$.root
  };
  i && i(s.root);
  let k = !1;
  if (s.ctx = n ? n(t, e.props || {}, (g, v, ...c) => {
    const p = c.length ? c[0] : v;
    return s.ctx && r(s.ctx[g], s.ctx[g] = p) && (!s.skip_bound && s.bound[g] && s.bound[g](p), k && ye(t, g)), v;
  }) : [], s.update(), k = !0, R(s.before_update), s.fragment = l ? l(s.ctx) : !1, e.target) {
    if (e.hydrate) {
      const g = de(e.target);
      s.fragment && s.fragment.l(g), g.forEach(y);
    } else
      s.fragment && s.fragment.c();
    e.intro && ve(t.$$.fragment), xe(t, e.target, e.anchor, e.customElement), x();
  }
  A(a);
}
let se;
typeof HTMLElement == "function" && (se = class extends HTMLElement {
  constructor() {
    super(), this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    const { on_mount: t } = this.$$;
    this.$$.on_disconnect = t.map(P).filter(q);
    for (const e in this.$$.slotted)
      this.appendChild(this.$$.slotted[e]);
  }
  attributeChangedCallback(t, e, n) {
    this[t] = n;
  }
  disconnectedCallback() {
    R(this.$$.on_disconnect);
  }
  $destroy() {
    we(this, 1), this.$destroy = z;
  }
  $on(t, e) {
    if (!q(e))
      return z;
    const n = this.$$.callbacks[t] || (this.$$.callbacks[t] = []);
    return n.push(e), () => {
      const l = n.indexOf(e);
      l !== -1 && n.splice(l, 1);
    };
  }
  $set(t) {
    this.$$set && !ce(t) && (this.$$.skip_bound = !0, this.$$set(t), this.$$.skip_bound = !1);
  }
});
function X(t) {
  return new Date(t).toDateString();
}
function Y(t, e, n) {
  const l = t.slice();
  return l[10] = e[n], l;
}
function Z(t, e, n) {
  const l = t.slice();
  return l[13] = e[n], l;
}
function ee(t) {
  let e;
  return {
    c() {
      e = _("link"), f(e, "rel", "stylesheet"), f(e, "href", t[4]);
    },
    m(n, l) {
      w(n, e, l);
    },
    p(n, l) {
      l & 16 && f(e, "href", n[4]);
    },
    d(n) {
      n && y(e);
    }
  };
}
function te(t) {
  let e, n, l = t[1] && t[3] && le(t), r = t[5], o = [];
  for (let i = 0; i < r.length; i += 1)
    o[i] = oe(Y(t, r, i));
  return {
    c() {
      e = _("div"), l && l.c(), n = S();
      for (let i = 0; i < o.length; i += 1)
        o[i].c();
      f(e, "id", "blobShare"), E(e, "dark", t[2]), E(e, "light", !t[2]), E(e, "sidebar", t[3]), E(e, "nosidebar", !t[3]);
    },
    m(i, u) {
      w(i, e, u), l && l.m(e, null), d(e, n);
      for (let a = 0; a < o.length; a += 1)
        o[a].m(e, null);
    },
    p(i, u) {
      if (i[1] && i[3] ? l ? l.p(i, u) : (l = le(i), l.c(), l.m(e, n)) : l && (l.d(1), l = null), u & 41) {
        r = i[5];
        let a;
        for (a = 0; a < r.length; a += 1) {
          const s = Y(i, r, a);
          o[a] ? o[a].p(s, u) : (o[a] = oe(s), o[a].c(), o[a].m(e, null));
        }
        for (; a < o.length; a += 1)
          o[a].d(1);
        o.length = r.length;
      }
      u & 4 && E(e, "dark", i[2]), u & 4 && E(e, "light", !i[2]), u & 8 && E(e, "sidebar", i[3]), u & 8 && E(e, "nosidebar", !i[3]);
    },
    d(i) {
      i && y(e), l && l.d(), ae(o, i);
    }
  };
}
function le(t) {
  let e;
  return {
    c() {
      e = j(t[1]);
    },
    m(n, l) {
      w(n, e, l);
    },
    p(n, l) {
      l & 2 && N(e, n[1]);
    },
    d(n) {
      n && y(e);
    }
  };
}
function ne(t) {
  let e, n, l, r, o, i, u;
  return {
    c() {
      e = _("a"), n = _("div"), l = _("img"), f(l, "style", "aspect-ratio=1.7778;"), f(l, "alt", r = t[10].title), K(l.src, o = t[10].image ? t[0] + t[10].image : t[0] + "/noimg.svg") || f(l, "src", o), f(l, "loading", "lazy"), f(n, "class", "img"), f(e, "href", i = t[10].URL), f(e, "title", u = t[10].title), f(e, "target", "_blank"), f(e, "rel", "noreferrer");
    },
    m(a, s) {
      w(a, e, s), d(e, n), d(n, l);
    },
    p(a, s) {
      s & 32 && r !== (r = a[10].title) && f(l, "alt", r), s & 33 && !K(l.src, o = a[10].image ? a[0] + a[10].image : a[0] + "/noimg.svg") && f(l, "src", o), s & 32 && i !== (i = a[10].URL) && f(e, "href", i), s & 32 && u !== (u = a[10].title) && f(e, "title", u);
    },
    d(a) {
      a && y(e);
    }
  };
}
function ie(t) {
  let e, n = t[10].tags, l = [];
  for (let r = 0; r < n.length; r += 1)
    l[r] = re(Z(t, n, r));
  return {
    c() {
      e = _("div");
      for (let r = 0; r < l.length; r += 1)
        l[r].c();
      f(e, "class", "tags");
    },
    m(r, o) {
      w(r, e, o);
      for (let i = 0; i < l.length; i += 1)
        l[i].m(e, null);
    },
    p(r, o) {
      if (o & 33) {
        n = r[10].tags;
        let i;
        for (i = 0; i < n.length; i += 1) {
          const u = Z(r, n, i);
          l[i] ? l[i].p(u, o) : (l[i] = re(u), l[i].c(), l[i].m(e, null));
        }
        for (; i < l.length; i += 1)
          l[i].d(1);
        l.length = n.length;
      }
    },
    d(r) {
      r && y(e), ae(l, r);
    }
  };
}
function re(t) {
  let e, n = t[13].name + "", l, r;
  return {
    c() {
      e = _("a"), l = j(n), f(e, "class", "tag"), f(e, "href", r = t[0] + "/tag/" + t[13].id);
    },
    m(o, i) {
      w(o, e, i), d(e, l);
    },
    p(o, i) {
      i & 32 && n !== (n = o[13].name + "") && N(l, n), i & 33 && r !== (r = o[0] + "/tag/" + o[13].id) && f(e, "href", r);
    },
    d(o) {
      o && y(e);
    }
  };
}
function oe(t) {
  let e, n, l, r, o = X(t[10].date) + "", i, u, a, s, k = t[10].source.name + "", g, v, c, p, U = t[10].title + "", I, M, V, G, m = !t[3] && ne(t), b = t[10].tags.length && ie(t);
  return {
    c() {
      e = _("div"), m && m.c(), n = S(), l = _("div"), r = _("div"), i = j(o), u = _("br"), a = S(), s = _("a"), g = j(k), c = S(), p = _("a"), I = j(U), V = S(), b && b.c(), G = S(), f(s, "href", v = t[0] + "/s/" + t[10].source.id), f(r, "class", "subtitle"), f(p, "class", "title"), f(p, "href", M = t[10].URL), f(p, "target", "_blank"), f(p, "rel", "noreferrer"), f(l, "class", "content"), f(e, "class", "item");
    },
    m(h, $) {
      w(h, e, $), m && m.m(e, null), d(e, n), d(e, l), d(l, r), d(r, i), d(r, u), d(r, a), d(r, s), d(s, g), d(l, c), d(l, p), d(p, I), d(l, V), b && b.m(l, null), d(e, G);
    },
    p(h, $) {
      h[3] ? m && (m.d(1), m = null) : m ? m.p(h, $) : (m = ne(h), m.c(), m.m(e, n)), $ & 32 && o !== (o = X(h[10].date) + "") && N(i, o), $ & 32 && k !== (k = h[10].source.name + "") && N(g, k), $ & 33 && v !== (v = h[0] + "/s/" + h[10].source.id) && f(s, "href", v), $ & 32 && U !== (U = h[10].title + "") && N(I, U), $ & 32 && M !== (M = h[10].URL) && f(p, "href", M), h[10].tags.length ? b ? b.p(h, $) : (b = ie(h), b.c(), b.m(l, null)) : b && (b.d(1), b = null);
    },
    d(h) {
      h && y(e), m && m.d(), b && b.d();
    }
  };
}
function Ee(t) {
  let e, n, l = t[4] && ee(t), r = t[5].length && te(t);
  return {
    c() {
      l && l.c(), e = S(), r && r.c(), n = ue(), this.c = z;
    },
    m(o, i) {
      l && l.m(o, i), w(o, e, i), r && r.m(o, i), w(o, n, i);
    },
    p(o, [i]) {
      o[4] ? l ? l.p(o, i) : (l = ee(o), l.c(), l.m(e.parentNode, e)) : l && (l.d(1), l = null), o[5].length ? r ? r.p(o, i) : (r = te(o), r.c(), r.m(n.parentNode, n)) : r && (r.d(1), r = null);
    },
    i: z,
    o: z,
    d(o) {
      l && l.d(o), o && y(e), r && r.d(o), o && y(n);
    }
  };
}
function Se(t, e, n) {
  let { baseurl: l = "" } = e, { title: r = "" } = e, { maxlength: o = !1 } = e, { blob: i = null } = e, { dark: u = null } = e, { sidebar: a = null } = e, { external_style: s = "" } = e, k = !1, g = [];
  function v() {
    k && i && fetch(`${l}/api/post/${i}`).then((c) => c.json()).then((c) => {
      n(5, g = c);
    }).catch((c) => {
      console.error("Error loading Blob API -> ", c);
    });
  }
  return me(() => {
    k = !0, v();
  }), t.$$set = (c) => {
    "baseurl" in c && n(0, l = c.baseurl), "title" in c && n(1, r = c.title), "maxlength" in c && n(6, o = c.maxlength), "blob" in c && n(7, i = c.blob), "dark" in c && n(2, u = c.dark), "sidebar" in c && n(3, a = c.sidebar), "external_style" in c && n(4, s = c.external_style);
  }, t.$$.update = () => {
    t.$$.dirty & 128 && v();
  }, [l, r, u, a, s, g, o, i];
}
class je extends se {
  constructor(e) {
    super(), this.shadowRoot.innerHTML = `<style>#blobShare{font-family:ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
      "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif,
      "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
      "Noto Color Emoji";overflow-x:hidden;width:100%;box-sizing:content-box;margin:0 auto;font-size:1rem;text-align:left}.nosidebar{max-width:1200px}.sidebar{max-width:500px;box-shadow:rgba(60, 64, 67, 0.4) 0px 1px 2px 0px,
      rgba(60, 64, 67, 0.25) 0px 1px 3px 1px;border-radius:5px;font-size:1rem}.item{display:flex;gap:0.2rem;padding:0.5rem}.sidebar .item{flex-wrap:wrap}.item .img{width:450px;max-height:250px;aspect-ratio:1.7778;flex:1 0 auto}.item img{object-fit:cover;border-radius:15px;width:100%;height:100%;box-shadow:rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
      rgba(0, 0, 0, 0.3) 0px 3px 7px -3px}.nosidebar .item{margin-bottom:2rem}.nosidebar .content{margin-left:1rem;margin-top:5px;text-align:left}.sidebar .content{flex-grow:1}.tags{margin-top:2px}a{text-decoration:none;color:var(--text-color);margin:0;line-height:1.275rem;font-weight:400;font-size:0.875rem;position:relative;transition:background-color 0.3s cubic-bezier(0.25, 0.8, 0.5, 1), padding 0.3s}a:hover,a:focus{text-decoration:underline}.dark{--bg-odd-color:#161616;--bg-even-color:#222;--bg-hover-color:#333;--text-color:#8fa4ea;--title-color:white;--line-color:rgba(120, 120, 120, 0.2)}.light{--bg-odd-color:#f5f5f5;--bg-even-color:#fafafa;--bg-hover-color:#eee;--text-color:#3f51b5;--title-color:black;--line-color:rgba(220, 220, 220, 0.9)}.sidebar .item{padding:1rem;border-bottom:1px solid var(--line-color)}.sidebar .item:hover,.sidebar .item:focus,.sidebar .item:active{background-color:var(--bg-hover-color)}.title{color:var(--title-color);font-weight:bold;font-size:1.3rem;line-height:1.1em}.nosidebar .title{font-size:1.9em;line-height:1.1em}.subtitle{font-size:0.9rem;line-height:1.1em;color:var(--title-color);opacity:0.9}.tags{display:flex;flex-wrap:wrap;gap:3px;justify-items:left}.tag{display:inline-block;border:1px solid var(--text-color);color:var(--text-color);padding:0px 3px;border-radius:3px;font-size:0.8rem}</style>`, $e(
      this,
      {
        target: this.shadowRoot,
        props: he(this.attributes),
        customElement: !0
      },
      Se,
      Ee,
      fe,
      {
        baseurl: 0,
        title: 1,
        maxlength: 6,
        blob: 7,
        dark: 2,
        sidebar: 3,
        external_style: 4
      },
      null
    ), e && (e.target && w(e.target, this, e.anchor), e.props && (this.$set(e.props), x()));
  }
  static get observedAttributes() {
    return ["baseurl", "title", "maxlength", "blob", "dark", "sidebar", "external_style"];
  }
  get baseurl() {
    return this.$$.ctx[0];
  }
  set baseurl(e) {
    this.$$set({ baseurl: e }), x();
  }
  get title() {
    return this.$$.ctx[1];
  }
  set title(e) {
    this.$$set({ title: e }), x();
  }
  get maxlength() {
    return this.$$.ctx[6];
  }
  set maxlength(e) {
    this.$$set({ maxlength: e }), x();
  }
  get blob() {
    return this.$$.ctx[7];
  }
  set blob(e) {
    this.$$set({ blob: e }), x();
  }
  get dark() {
    return this.$$.ctx[2];
  }
  set dark(e) {
    this.$$set({ dark: e }), x();
  }
  get sidebar() {
    return this.$$.ctx[3];
  }
  set sidebar(e) {
    this.$$set({ sidebar: e }), x();
  }
  get external_style() {
    return this.$$.ctx[4];
  }
  set external_style(e) {
    this.$$set({ external_style: e }), x();
  }
}
customElements.define("blob-share", je);
