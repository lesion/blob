function N() {
}
function D(t) {
  return t();
}
function F() {
  return /* @__PURE__ */ Object.create(null);
}
function L(t) {
  t.forEach(D);
}
function ie(t) {
  return typeof t == "function";
}
function re(t, e) {
  return t != t ? e == e : t !== e || t && typeof t == "object" || typeof t == "function";
}
let T;
function C(t, e) {
  return T || (T = document.createElement("a")), T.href = e, t === T.href;
}
function oe(t) {
  return Object.keys(t).length === 0;
}
function d(t, e) {
  t.appendChild(e);
}
function p(t, e, i) {
  t.insertBefore(e, i || null);
}
function k(t) {
  t.parentNode.removeChild(t);
}
function le(t, e) {
  for (let i = 0; i < t.length; i += 1)
    t[i] && t[i].d(e);
}
function g(t) {
  return document.createElement(t);
}
function j(t) {
  return document.createTextNode(t);
}
function z() {
  return j(" ");
}
function ae() {
  return j("");
}
function c(t, e, i) {
  i == null ? t.removeAttribute(e) : t.getAttribute(e) !== i && t.setAttribute(e, i);
}
function se(t) {
  return Array.from(t.childNodes);
}
function O(t, e) {
  e = "" + e, t.wholeText !== e && (t.data = e);
}
function S(t, e, i) {
  t.classList[i ? "add" : "remove"](e);
}
function ce(t) {
  const e = {};
  for (const i of t)
    e[i.name] = i.value;
  return e;
}
let M;
function $(t) {
  M = t;
}
function fe() {
  if (!M)
    throw new Error("Function called outside component initialization");
  return M;
}
function ue(t) {
  fe().$$.on_mount.push(t);
}
const A = [], P = [], I = [], V = [], de = Promise.resolve();
let U = !1;
function he() {
  U || (U = !0, de.then(_));
}
function q(t) {
  I.push(t);
}
const R = /* @__PURE__ */ new Set();
let B = 0;
function _() {
  const t = M;
  do {
    for (; B < A.length; ) {
      const e = A[B];
      B++, $(e), ge(e.$$);
    }
    for ($(null), A.length = 0, B = 0; P.length; )
      P.pop()();
    for (let e = 0; e < I.length; e += 1) {
      const i = I[e];
      R.has(i) || (R.add(i), i());
    }
    I.length = 0;
  } while (A.length);
  for (; V.length; )
    V.pop()();
  U = !1, R.clear(), $(t);
}
function ge(t) {
  if (t.fragment !== null) {
    t.update(), L(t.before_update);
    const e = t.dirty;
    t.dirty = [-1], t.fragment && t.fragment.p(t.ctx, e), t.after_update.forEach(q);
  }
}
const me = /* @__PURE__ */ new Set();
function be(t, e) {
  t && t.i && (me.delete(t), t.i(e));
}
function _e(t, e, i, l) {
  const { fragment: n, on_mount: o, on_destroy: r, after_update: u } = t.$$;
  n && n.m(e, i), l || q(() => {
    const a = o.map(D).filter(ie);
    r ? r.push(...a) : L(a), t.$$.on_mount = [];
  }), u.forEach(q);
}
function pe(t, e) {
  const i = t.$$;
  i.fragment !== null && (L(i.on_destroy), i.fragment && i.fragment.d(e), i.on_destroy = i.fragment = null, i.ctx = []);
}
function ke(t, e) {
  t.$$.dirty[0] === -1 && (A.push(t), he(), t.$$.dirty.fill(0)), t.$$.dirty[e / 31 | 0] |= 1 << e % 31;
}
function xe(t, e, i, l, n, o, r, u = [-1]) {
  const a = M;
  $(t);
  const f = t.$$ = {
    fragment: null,
    ctx: null,
    props: o,
    update: N,
    not_equal: n,
    bound: F(),
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(e.context || (a ? a.$$.context : [])),
    callbacks: F(),
    dirty: u,
    skip_bound: !1,
    root: e.target || a.$$.root
  };
  r && r(f.root);
  let x = !1;
  if (f.ctx = i ? i(t, e.props || {}, (m, w, ...v) => {
    const y = v.length ? v[0] : w;
    return f.ctx && n(f.ctx[m], f.ctx[m] = y) && (!f.skip_bound && f.bound[m] && f.bound[m](y), x && ke(t, m)), w;
  }) : [], f.update(), x = !0, L(f.before_update), f.fragment = l ? l(f.ctx) : !1, e.target) {
    if (e.hydrate) {
      const m = se(e.target);
      f.fragment && f.fragment.l(m), m.forEach(k);
    } else
      f.fragment && f.fragment.c();
    e.intro && be(t.$$.fragment), _e(t, e.target, e.anchor, e.customElement), _();
  }
  $(a);
}
let ne;
typeof HTMLElement == "function" && (ne = class extends HTMLElement {
  constructor() {
    super(), this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    const { on_mount: t } = this.$$;
    this.$$.on_disconnect = t.map(D).filter(ie);
    for (const e in this.$$.slotted)
      this.appendChild(this.$$.slotted[e]);
  }
  attributeChangedCallback(t, e, i) {
    this[t] = i;
  }
  disconnectedCallback() {
    L(this.$$.on_disconnect);
  }
  $destroy() {
    pe(this, 1), this.$destroy = N;
  }
  $on(t, e) {
    const i = this.$$.callbacks[t] || (this.$$.callbacks[t] = []);
    return i.push(e), () => {
      const l = i.indexOf(e);
      l !== -1 && i.splice(l, 1);
    };
  }
  $set(t) {
    this.$$set && !oe(t) && (this.$$.skip_bound = !0, this.$$set(t), this.$$.skip_bound = !1);
  }
});
function H(t, e = "long") {
  const i = e === "long" ? {
    weekday: "long",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  } : { hour: "2-digit", minute: "2-digit" };
  return new Date(t * 1e3).toLocaleString(void 0, i);
}
function G(t) {
  return t.multidate ? H(t.start_datetime) + " - " + H(t.end_datetime) : H(t.start_datetime) + (t.end_datetime ? "-" + H(t.end_datetime, "short") : "");
}
function J(t, e, i) {
  const l = t.slice();
  return l[12] = e[i], l;
}
function K(t, e, i) {
  const l = t.slice();
  return l[15] = e[i], l;
}
function Q(t) {
  let e;
  return {
    c() {
      e = g("link"), c(e, "rel", "stylesheet"), c(e, "href", t[4]);
    },
    m(i, l) {
      p(i, e, l);
    },
    p(i, l) {
      l & 16 && c(e, "href", i[4]);
    },
    d(i) {
      i && k(e);
    }
  };
}
function W(t) {
  let e, i, l = t[1] && t[3] === "true" && X(t), n = t[5], o = [];
  for (let r = 0; r < n.length; r += 1)
    o[r] = te(J(t, n, r));
  return {
    c() {
      e = g("div"), l && l.c(), i = z();
      for (let r = 0; r < o.length; r += 1)
        o[r].c();
      c(e, "id", "blobShare"), S(e, "dark", t[2] === "dark"), S(e, "light", t[2] === "light"), S(e, "sidebar", t[3] === "true"), S(e, "nosidebar", t[3] !== "true");
    },
    m(r, u) {
      p(r, e, u), l && l.m(e, null), d(e, i);
      for (let a = 0; a < o.length; a += 1)
        o[a].m(e, null);
    },
    p(r, u) {
      if (r[1] && r[3] === "true" ? l ? l.p(r, u) : (l = X(r), l.c(), l.m(e, i)) : l && (l.d(1), l = null), u & 41) {
        n = r[5];
        let a;
        for (a = 0; a < n.length; a += 1) {
          const f = J(r, n, a);
          o[a] ? o[a].p(f, u) : (o[a] = te(f), o[a].c(), o[a].m(e, null));
        }
        for (; a < o.length; a += 1)
          o[a].d(1);
        o.length = n.length;
      }
      u & 4 && S(e, "dark", r[2] === "dark"), u & 4 && S(e, "light", r[2] === "light"), u & 8 && S(e, "sidebar", r[3] === "true"), u & 8 && S(e, "nosidebar", r[3] !== "true");
    },
    d(r) {
      r && k(e), l && l.d(), le(o, r);
    }
  };
}
function X(t) {
  let e, i, l, n, o, r, u;
  return {
    c() {
      e = g("a"), i = g("div"), l = g("div"), n = j(t[1]), o = z(), r = g("img"), c(l, "class", "title"), c(r, "id", "logo"), c(r, "alt", "logo"), C(r.src, u = t[0] + "/logo.png") || c(r, "src", u), c(i, "class", "content"), c(e, "href", t[0]), c(e, "target", "_blank"), c(e, "id", "header");
    },
    m(a, f) {
      p(a, e, f), d(e, i), d(i, l), d(l, n), d(i, o), d(i, r);
    },
    p(a, f) {
      f & 2 && O(n, a[1]), f & 1 && !C(r.src, u = a[0] + "/logo.png") && c(r, "src", u), f & 1 && c(e, "href", a[0]);
    },
    d(a) {
      a && k(e);
    }
  };
}
function Y(t) {
  let e;
  function i(o, r) {
    return o[12].image ? ye : ve;
  }
  let l = i(t), n = l(t);
  return {
    c() {
      e = g("div"), n.c(), c(e, "class", "img");
    },
    m(o, r) {
      p(o, e, r), n.m(e, null);
    },
    p(o, r) {
      l === (l = i(o)) && n ? n.p(o, r) : (n.d(1), n = l(o), n && (n.c(), n.m(e, null)));
    },
    d(o) {
      o && k(e), n.d();
    }
  };
}
function ve(t) {
  let e, i, l;
  return {
    c() {
      e = g("img"), c(e, "style", "aspect-ratio=1.7778;"), c(e, "alt", i = t[12].title), C(e.src, l = t[0] + "/noimg.svg") || c(e, "src", l), c(e, "loading", "lazy");
    },
    m(n, o) {
      p(n, e, o);
    },
    p(n, o) {
      o & 32 && i !== (i = n[12].title) && c(e, "alt", i), o & 1 && !C(e.src, l = n[0] + "/noimg.svg") && c(e, "src", l);
    },
    d(n) {
      n && k(e);
    }
  };
}
function ye(t) {
  let e, i;
  return {
    c() {
      e = g("img"), C(e.src, i = t[12].image) || c(e, "src", i), c(e, "loading", "lazy");
    },
    m(l, n) {
      p(l, e, n);
    },
    p(l, n) {
      n & 32 && !C(e.src, i = l[12].image) && c(e, "src", i);
    },
    d(l) {
      l && k(e);
    }
  };
}
function Z(t) {
  let e, i = t[12].tags, l = [];
  for (let n = 0; n < i.length; n += 1)
    l[n] = ee(K(t, i, n));
  return {
    c() {
      e = g("div");
      for (let n = 0; n < l.length; n += 1)
        l[n].c();
      c(e, "class", "tags");
    },
    m(n, o) {
      p(n, e, o);
      for (let r = 0; r < l.length; r += 1)
        l[r].m(e, null);
    },
    p(n, o) {
      if (o & 32) {
        i = n[12].tags;
        let r;
        for (r = 0; r < i.length; r += 1) {
          const u = K(n, i, r);
          l[r] ? l[r].p(u, o) : (l[r] = ee(u), l[r].c(), l[r].m(e, null));
        }
        for (; r < l.length; r += 1)
          l[r].d(1);
        l.length = i.length;
      }
    },
    d(n) {
      n && k(e), le(l, n);
    }
  };
}
function ee(t) {
  let e, i, l = t[15].name + "", n;
  return {
    c() {
      e = g("span"), i = j("#"), n = j(l), c(e, "class", "tag");
    },
    m(o, r) {
      p(o, e, r), d(e, i), d(e, n);
    },
    p(o, r) {
      r & 32 && l !== (l = o[15].name + "") && O(n, l);
    },
    d(o) {
      o && k(e);
    }
  };
}
function te(t) {
  let e, i, l, n, o = G(t[12]) + "", r, u, a, f = t[12].title + "", x, m, w, v, y, s = t[3] !== "true" && Y(t), b = t[12].tags.length && Z(t);
  return {
    c() {
      e = g("a"), s && s.c(), i = z(), l = g("div"), n = g("div"), r = j(o), u = z(), a = g("div"), x = j(f), m = z(), b && b.c(), w = z(), c(n, "class", "subtitle"), c(a, "class", "title"), c(l, "class", "content"), c(e, "href", v = t[0] + "/item/" + (t[12].slug || t[12].id)), c(e, "class", "item"), c(e, "title", y = t[12].title), c(e, "target", "_blank");
    },
    m(h, E) {
      p(h, e, E), s && s.m(e, null), d(e, i), d(e, l), d(l, n), d(n, r), d(l, u), d(l, a), d(a, x), d(l, m), b && b.m(l, null), d(e, w);
    },
    p(h, E) {
      h[3] !== "true" ? s ? s.p(h, E) : (s = Y(h), s.c(), s.m(e, i)) : s && (s.d(1), s = null), E & 32 && o !== (o = G(h[12]) + "") && O(r, o), E & 32 && f !== (f = h[12].title + "") && O(x, f), h[12].tags.length ? b ? b.p(h, E) : (b = Z(h), b.c(), b.m(l, null)) : b && (b.d(1), b = null), E & 33 && v !== (v = h[0] + "/item/" + (h[12].slug || h[12].id)) && c(e, "href", v), E & 32 && y !== (y = h[12].title) && c(e, "title", y);
    },
    d(h) {
      h && k(e), s && s.d(), b && b.d();
    }
  };
}
function we(t) {
  let e, i, l = t[4] && Q(t), n = t[5].length && W(t);
  return {
    c() {
      l && l.c(), e = z(), n && n.c(), i = ae(), this.c = N;
    },
    m(o, r) {
      l && l.m(o, r), p(o, e, r), n && n.m(o, r), p(o, i, r);
    },
    p(o, [r]) {
      o[4] ? l ? l.p(o, r) : (l = Q(o), l.c(), l.m(e.parentNode, e)) : l && (l.d(1), l = null), o[5].length ? n ? n.p(o, r) : (n = W(o), n.c(), n.m(i.parentNode, i)) : n && (n.d(1), n = null);
    },
    i: N,
    o: N,
    d(o) {
      l && l.d(o), o && k(e), n && n.d(o), o && k(i);
    }
  };
}
function Ee(t, e, i) {
  let { baseurl: l = "" } = e, { title: n = "" } = e, { maxlength: o = !1 } = e, { tags: r = "" } = e, { places: u = "" } = e, { blob: a = "" } = e, { theme: f = "light" } = e, { sidebar: x = "true" } = e, { external_style: m = "" } = e, w = !1, v = [];
  function y() {
    console.error("sono dentro update!"), w && fetch(`${l}/api/cohort/93`).then((s) => s.json()).then((s) => {
      i(5, v = s);
    }).catch((s) => {
      console.error("Error loading Blob API -> ", s);
    });
  }
  return ue(() => {
    console.error("ma veramente ?"), w = !0, y();
  }), t.$$set = (s) => {
    "baseurl" in s && i(0, l = s.baseurl), "title" in s && i(1, n = s.title), "maxlength" in s && i(6, o = s.maxlength), "tags" in s && i(7, r = s.tags), "places" in s && i(8, u = s.places), "blob" in s && i(9, a = s.blob), "theme" in s && i(2, f = s.theme), "sidebar" in s && i(3, x = s.sidebar), "external_style" in s && i(4, m = s.external_style);
  }, t.$$.update = () => {
    t.$$.dirty & 462 && y(o && n && u && r && f && show_recurrent && x);
  }, [
    l,
    n,
    f,
    x,
    m,
    v,
    o,
    r,
    u,
    a
  ];
}
class Se extends ne {
  constructor(e) {
    super(), this.shadowRoot.innerHTML = `<style>#blobShare{font-family:ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
      "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif,
      "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
      "Noto Color Emoji";overflow-x:hidden;width:100%;box-sizing:content-box;margin:0 auto;font-size:1rem;text-align:left}.nosidebar{max-width:1200px}#header{padding:1.2rem 1rem;background-color:var(--bg-odd-color)}.sidebar{max-width:500px;box-shadow:rgba(60, 64, 67, 0.4) 0px 1px 2px 0px,
      rgba(60, 64, 67, 0.25) 0px 1px 3px 1px;border-radius:5px;font-size:1rem}.item .img{width:100%;max-width:450px;max-height:250px;aspect-ratio:1.7778;flex:1 0 auto}@media screen and (max-width: 800px){.item{flex-wrap:wrap}.item .img{max-width:100%}}.item img{object-fit:cover;border-radius:15px;width:100%;height:100%;box-shadow:rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
      rgba(0, 0, 0, 0.3) 0px 3px 7px -3px}.nosidebar .item{margin-bottom:2rem}.nosidebar .content{margin-left:1rem;margin-top:5px;text-align:left}.tags{margin-top:2px}#logo{position:absolute;top:10px;right:10px;height:40px}a{text-decoration:none;color:var(--text-color);display:flex;padding:8px 20px;margin:0;line-height:1.275rem;font-weight:400;font-size:0.875rem;position:relative;transition:background-color 0.3s cubic-bezier(0.25, 0.8, 0.5, 1),
      padding 0.3s;box-sizing:content-box}a:hover .title,a:focus .title,a:active .title{text-decoration:underline}.dark{--bg-odd-color:#161616;--bg-even-color:#222;--bg-hover-color:#333;--text-color:white;--title-color:white;--line-color:rgba(120, 120, 120, 0.2)}.light{--bg-odd-color:#f5f5f5;--bg-even-color:#fafafa;--bg-hover-color:#eee;--text-color:#222;--title-color:black;--line-color:rgba(220, 220, 220, 0.9)}.sidebar a{background-color:var(--bg-even-color);border-bottom:1px solid var(--line-color)}.sidebar a:hover,.sidebar a:focus,.sidebar a:active{background-color:var(--bg-hover-color);padding-left:15px;padding-right:25px}.title{color:var(--title-color);font-weight:bold;font-size:1.3rem;line-height:1.1em}.nosidebar .title{font-size:1.9em;line-height:1.1em}.subtitle{font-size:1rem;line-height:1.1em;color:var(--title-color);opacity:0.9}.tag{margin-right:10px;display:inline-block}</style>`, xe(
      this,
      {
        target: this.shadowRoot,
        props: ce(this.attributes),
        customElement: !0
      },
      Ee,
      we,
      re,
      {
        baseurl: 0,
        title: 1,
        maxlength: 6,
        tags: 7,
        places: 8,
        blob: 9,
        theme: 2,
        sidebar: 3,
        external_style: 4
      },
      null
    ), e && (e.target && p(e.target, this, e.anchor), e.props && (this.$set(e.props), _()));
  }
  static get observedAttributes() {
    return [
      "baseurl",
      "title",
      "maxlength",
      "tags",
      "places",
      "blob",
      "theme",
      "sidebar",
      "external_style"
    ];
  }
  get baseurl() {
    return this.$$.ctx[0];
  }
  set baseurl(e) {
    this.$$set({ baseurl: e }), _();
  }
  get title() {
    return this.$$.ctx[1];
  }
  set title(e) {
    this.$$set({ title: e }), _();
  }
  get maxlength() {
    return this.$$.ctx[6];
  }
  set maxlength(e) {
    this.$$set({ maxlength: e }), _();
  }
  get tags() {
    return this.$$.ctx[7];
  }
  set tags(e) {
    this.$$set({ tags: e }), _();
  }
  get places() {
    return this.$$.ctx[8];
  }
  set places(e) {
    this.$$set({ places: e }), _();
  }
  get blob() {
    return this.$$.ctx[9];
  }
  set blob(e) {
    this.$$set({ blob: e }), _();
  }
  get theme() {
    return this.$$.ctx[2];
  }
  set theme(e) {
    this.$$set({ theme: e }), _();
  }
  get sidebar() {
    return this.$$.ctx[3];
  }
  set sidebar(e) {
    this.$$set({ sidebar: e }), _();
  }
  get external_style() {
    return this.$$.ctx[4];
  }
  set external_style(e) {
    this.$$set({ external_style: e }), _();
  }
}
customElements.define("blob-share", Se);
