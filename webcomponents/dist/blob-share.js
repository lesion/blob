function E() {
}
function I(t) {
  return t();
}
function O() {
  return /* @__PURE__ */ Object.create(null);
}
function N(t) {
  t.forEach(I);
}
function ee(t) {
  return typeof t == "function";
}
function le(t, e) {
  return t != t ? e == e : t !== e || t && typeof t == "object" || typeof t == "function";
}
let L;
function q(t, e) {
  return L || (L = document.createElement("a")), L.href = e, t === L.href;
}
function ie(t) {
  return Object.keys(t).length === 0;
}
function g(t, e) {
  t.appendChild(e);
}
function k(t, e, l) {
  t.insertBefore(e, l || null);
}
function x(t) {
  t.parentNode.removeChild(t);
}
function te(t, e) {
  for (let l = 0; l < t.length; l += 1)
    t[l] && t[l].d(e);
}
function _(t) {
  return document.createElement(t);
}
function j(t) {
  return document.createTextNode(t);
}
function z() {
  return j(" ");
}
function re() {
  return j("");
}
function u(t, e, l) {
  l == null ? t.removeAttribute(e) : t.getAttribute(e) !== l && t.setAttribute(e, l);
}
function oe(t) {
  return Array.from(t.childNodes);
}
function U(t, e) {
  e = "" + e, t.wholeText !== e && (t.data = e);
}
function w(t, e, l) {
  t.classList[l ? "add" : "remove"](e);
}
function ae(t) {
  const e = {};
  for (const l of t)
    e[l.name] = l.value;
  return e;
}
let A;
function $(t) {
  A = t;
}
function se() {
  if (!A)
    throw new Error("Function called outside component initialization");
  return A;
}
function ce(t) {
  se().$$.on_mount.push(t);
}
const C = [], F = [], R = [], P = [], fe = Promise.resolve();
let B = !1;
function ue() {
  B || (B = !0, fe.then(b));
}
function H(t) {
  R.push(t);
}
const T = /* @__PURE__ */ new Set();
let M = 0;
function b() {
  const t = A;
  do {
    for (; M < C.length; ) {
      const e = C[M];
      M++, $(e), de(e.$$);
    }
    for ($(null), C.length = 0, M = 0; F.length; )
      F.pop()();
    for (let e = 0; e < R.length; e += 1) {
      const l = R[e];
      T.has(l) || (T.add(l), l());
    }
    R.length = 0;
  } while (C.length);
  for (; P.length; )
    P.pop()();
  B = !1, T.clear(), $(t);
}
function de(t) {
  if (t.fragment !== null) {
    t.update(), N(t.before_update);
    const e = t.dirty;
    t.dirty = [-1], t.fragment && t.fragment.p(t.ctx, e), t.after_update.forEach(H);
  }
}
const he = /* @__PURE__ */ new Set();
function ge(t, e) {
  t && t.i && (he.delete(t), t.i(e));
}
function me(t, e, l, n) {
  const { fragment: r, on_mount: o, on_destroy: i, after_update: f } = t.$$;
  r && r.m(e, l), n || H(() => {
    const a = o.map(I).filter(ee);
    i ? i.push(...a) : N(a), t.$$.on_mount = [];
  }), f.forEach(H);
}
function be(t, e) {
  const l = t.$$;
  l.fragment !== null && (N(l.on_destroy), l.fragment && l.fragment.d(e), l.on_destroy = l.fragment = null, l.ctx = []);
}
function _e(t, e) {
  t.$$.dirty[0] === -1 && (C.push(t), ue(), t.$$.dirty.fill(0)), t.$$.dirty[e / 31 | 0] |= 1 << e % 31;
}
function pe(t, e, l, n, r, o, i, f = [-1]) {
  const a = A;
  $(t);
  const c = t.$$ = {
    fragment: null,
    ctx: null,
    props: o,
    update: E,
    not_equal: r,
    bound: O(),
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(e.context || (a ? a.$$.context : [])),
    callbacks: O(),
    dirty: f,
    skip_bound: !1,
    root: e.target || a.$$.root
  };
  i && i(c.root);
  let p = !1;
  if (c.ctx = l ? l(t, e.props || {}, (h, v, ...y) => {
    const d = y.length ? y[0] : v;
    return c.ctx && r(c.ctx[h], c.ctx[h] = d) && (!c.skip_bound && c.bound[h] && c.bound[h](d), p && _e(t, h)), v;
  }) : [], c.update(), p = !0, N(c.before_update), c.fragment = n ? n(c.ctx) : !1, e.target) {
    if (e.hydrate) {
      const h = oe(e.target);
      c.fragment && c.fragment.l(h), h.forEach(x);
    } else
      c.fragment && c.fragment.c();
    e.intro && ge(t.$$.fragment), me(t, e.target, e.anchor, e.customElement), b();
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
    this.$$.on_disconnect = t.map(I).filter(ee);
    for (const e in this.$$.slotted)
      this.appendChild(this.$$.slotted[e]);
  }
  attributeChangedCallback(t, e, l) {
    this[t] = l;
  }
  disconnectedCallback() {
    N(this.$$.on_disconnect);
  }
  $destroy() {
    be(this, 1), this.$destroy = E;
  }
  $on(t, e) {
    const l = this.$$.callbacks[t] || (this.$$.callbacks[t] = []);
    return l.push(e), () => {
      const n = l.indexOf(e);
      n !== -1 && l.splice(n, 1);
    };
  }
  $set(t) {
    this.$$set && !ie(t) && (this.$$.skip_bound = !0, this.$$set(t), this.$$.skip_bound = !1);
  }
});
function D(t) {
  const e = {
    weekday: "long",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  };
  return new Date(t).toLocaleString(void 0, e);
}
function V(t, e, l) {
  const n = t.slice();
  return n[12] = e[l], n;
}
function G(t, e, l) {
  const n = t.slice();
  return n[15] = e[l], n;
}
function J(t) {
  let e;
  return {
    c() {
      e = _("link"), u(e, "rel", "stylesheet"), u(e, "href", t[4]);
    },
    m(l, n) {
      k(l, e, n);
    },
    p(l, n) {
      n & 16 && u(e, "href", l[4]);
    },
    d(l) {
      l && x(e);
    }
  };
}
function K(t) {
  let e, l, n = t[1] && t[3] === "true" && Q(), r = t[5], o = [];
  for (let i = 0; i < r.length; i += 1)
    o[i] = Z(V(t, r, i));
  return {
    c() {
      e = _("div"), n && n.c(), l = z();
      for (let i = 0; i < o.length; i += 1)
        o[i].c();
      u(e, "id", "blobShare"), w(e, "dark", t[2] === "true"), w(e, "light", t[2] !== "true"), w(e, "sidebar", t[3] === "true"), w(e, "nosidebar", t[3] !== "true");
    },
    m(i, f) {
      k(i, e, f), n && n.m(e, null), g(e, l);
      for (let a = 0; a < o.length; a += 1)
        o[a].m(e, null);
    },
    p(i, f) {
      if (i[1] && i[3] === "true" ? n || (n = Q(), n.c(), n.m(e, l)) : n && (n.d(1), n = null), f & 41) {
        r = i[5];
        let a;
        for (a = 0; a < r.length; a += 1) {
          const c = V(i, r, a);
          o[a] ? o[a].p(c, f) : (o[a] = Z(c), o[a].c(), o[a].m(e, null));
        }
        for (; a < o.length; a += 1)
          o[a].d(1);
        o.length = r.length;
      }
      f & 4 && w(e, "dark", i[2] === "true"), f & 4 && w(e, "light", i[2] !== "true"), f & 8 && w(e, "sidebar", i[3] === "true"), f & 8 && w(e, "nosidebar", i[3] !== "true");
    },
    d(i) {
      i && x(e), n && n.d(), te(o, i);
    }
  };
}
function Q(t) {
  return { c: E, m: E, d: E };
}
function W(t) {
  let e, l, n, r, o, i, f;
  return {
    c() {
      e = _("a"), l = _("div"), n = _("img"), u(n, "style", "aspect-ratio=1.7778;"), u(n, "alt", r = t[12].title), q(n.src, o = t[12].image ? t[12].image : t[0] + "/noimg.svg") || u(n, "src", o), u(n, "loading", "lazy"), u(l, "class", "img"), u(e, "href", i = t[0] + "/item/" + (t[12].slug || t[12].id)), u(e, "title", f = t[12].title), u(e, "target", "_blank");
    },
    m(a, c) {
      k(a, e, c), g(e, l), g(l, n);
    },
    p(a, c) {
      c & 32 && r !== (r = a[12].title) && u(n, "alt", r), c & 33 && !q(n.src, o = a[12].image ? a[12].image : a[0] + "/noimg.svg") && u(n, "src", o), c & 33 && i !== (i = a[0] + "/item/" + (a[12].slug || a[12].id)) && u(e, "href", i), c & 32 && f !== (f = a[12].title) && u(e, "title", f);
    },
    d(a) {
      a && x(e);
    }
  };
}
function X(t) {
  let e, l = t[12].tags, n = [];
  for (let r = 0; r < l.length; r += 1)
    n[r] = Y(G(t, l, r));
  return {
    c() {
      e = _("div");
      for (let r = 0; r < n.length; r += 1)
        n[r].c();
      u(e, "class", "tags");
    },
    m(r, o) {
      k(r, e, o);
      for (let i = 0; i < n.length; i += 1)
        n[i].m(e, null);
    },
    p(r, o) {
      if (o & 32) {
        l = r[12].tags;
        let i;
        for (i = 0; i < l.length; i += 1) {
          const f = G(r, l, i);
          n[i] ? n[i].p(f, o) : (n[i] = Y(f), n[i].c(), n[i].m(e, null));
        }
        for (; i < n.length; i += 1)
          n[i].d(1);
        n.length = l.length;
      }
    },
    d(r) {
      r && x(e), te(n, r);
    }
  };
}
function Y(t) {
  let e, l, n = t[15].name + "", r;
  return {
    c() {
      e = _("span"), l = j("#"), r = j(n), u(e, "class", "tag");
    },
    m(o, i) {
      k(o, e, i), g(e, l), g(e, r);
    },
    p(o, i) {
      i & 32 && n !== (n = o[15].name + "") && U(r, n);
    },
    d(o) {
      o && x(e);
    }
  };
}
function Z(t) {
  let e, l, n, r, o = D(t[12].date) + "", i, f, a, c = t[12].title + "", p, h, v, y, d = t[3] !== "true" && W(t), s = t[12].tags.length && X(t);
  return {
    c() {
      e = _("div"), d && d.c(), l = z(), n = _("div"), r = _("div"), i = j(o), f = z(), a = _("a"), p = j(c), v = z(), s && s.c(), y = z(), u(r, "class", "subtitle"), u(a, "class", "title"), u(a, "href", h = t[12].URL), u(n, "class", "content"), u(e, "class", "item");
    },
    m(m, S) {
      k(m, e, S), d && d.m(e, null), g(e, l), g(e, n), g(n, r), g(r, i), g(n, f), g(n, a), g(a, p), g(n, v), s && s.m(n, null), g(e, y);
    },
    p(m, S) {
      m[3] !== "true" ? d ? d.p(m, S) : (d = W(m), d.c(), d.m(e, l)) : d && (d.d(1), d = null), S & 32 && o !== (o = D(m[12].date) + "") && U(i, o), S & 32 && c !== (c = m[12].title + "") && U(p, c), S & 32 && h !== (h = m[12].URL) && u(a, "href", h), m[12].tags.length ? s ? s.p(m, S) : (s = X(m), s.c(), s.m(n, null)) : s && (s.d(1), s = null);
    },
    d(m) {
      m && x(e), d && d.d(), s && s.d();
    }
  };
}
function ke(t) {
  let e, l, n = t[4] && J(t), r = t[5].length && K(t);
  return {
    c() {
      n && n.c(), e = z(), r && r.c(), l = re(), this.c = E;
    },
    m(o, i) {
      n && n.m(o, i), k(o, e, i), r && r.m(o, i), k(o, l, i);
    },
    p(o, [i]) {
      o[4] ? n ? n.p(o, i) : (n = J(o), n.c(), n.m(e.parentNode, e)) : n && (n.d(1), n = null), o[5].length ? r ? r.p(o, i) : (r = K(o), r.c(), r.m(l.parentNode, l)) : r && (r.d(1), r = null);
    },
    i: E,
    o: E,
    d(o) {
      n && n.d(o), o && x(e), r && r.d(o), o && x(l);
    }
  };
}
function xe(t, e, l) {
  let { baseurl: n = "" } = e, { title: r = "" } = e, { maxlength: o = !1 } = e, { tags: i = "" } = e, { places: f = "" } = e, { blob: a = 4 } = e, { dark: c = "false" } = e, { sidebar: p = "true" } = e, { external_style: h = "" } = e, v = !1, y = [];
  function d() {
    !v || fetch(`${n}/api/post/${a}`).then((s) => s.json()).then((s) => {
      l(5, y = s);
    }).catch((s) => {
      console.error("Error loading Blob API -> ", s);
    });
  }
  return ce(() => {
    v = !0, d();
  }), t.$$set = (s) => {
    "baseurl" in s && l(0, n = s.baseurl), "title" in s && l(1, r = s.title), "maxlength" in s && l(6, o = s.maxlength), "tags" in s && l(7, i = s.tags), "places" in s && l(8, f = s.places), "blob" in s && l(9, a = s.blob), "dark" in s && l(2, c = s.dark), "sidebar" in s && l(3, p = s.sidebar), "external_style" in s && l(4, h = s.external_style);
  }, t.$$.update = () => {
    t.$$.dirty & 974 && d(o && r && f && i && c && show_recurrent && p && a);
  }, [
    n,
    r,
    c,
    p,
    h,
    y,
    o,
    i,
    f,
    a
  ];
}
class ve extends ne {
  constructor(e) {
    super(), this.shadowRoot.innerHTML = `<style>#blobShare{font-family:ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
      "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif,
      "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
      "Noto Color Emoji";overflow-x:hidden;width:100%;box-sizing:content-box;margin:0 auto;font-size:1rem;text-align:left}.nosidebar{max-width:1200px}.sidebar{max-width:500px;box-shadow:rgba(60, 64, 67, 0.4) 0px 1px 2px 0px,
      rgba(60, 64, 67, 0.25) 0px 1px 3px 1px;border-radius:5px;font-size:1rem}.item .img{width:450px;max-height:250px;aspect-ratio:1.7778;flex:1 0 auto}@media screen and (max-width: 800px){.item{flex-wrap:wrap}.item .img{max-width:100%}}.item img{object-fit:cover;border-radius:15px;width:100%;height:100%;box-shadow:rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
      rgba(0, 0, 0, 0.3) 0px 3px 7px -3px}.nosidebar .item{margin-bottom:2rem}.nosidebar .content{margin-left:1rem;margin-top:5px;text-align:left}.sidebar .content{flex-grow:1}.tags{margin-top:2px}.item{display:flex}a{text-decoration:none;color:var(--text-color);padding:8px 20px;margin:0;line-height:1.275rem;font-weight:400;font-size:0.875rem;position:relative;transition:background-color 0.3s cubic-bezier(0.25, 0.8, 0.5, 1), padding 0.3s;box-sizing:content-box;display:block}.dark{--bg-odd-color:#161616;--bg-even-color:#222;--bg-hover-color:#333;--text-color:white;--title-color:white;--line-color:rgba(120, 120, 120, 0.2)}.light{--bg-odd-color:#f5f5f5;--bg-even-color:#fafafa;--bg-hover-color:#eee;--text-color:#222;--title-color:black;--line-color:rgba(220, 220, 220, 0.9)}.sidebar a{background-color:var(--bg-even-color);border-bottom:1px solid var(--line-color)}.sidebar a:hover,.sidebar a:focus,.sidebar a:active{background-color:var(--bg-hover-color);padding-left:15px;padding-right:25px}.title{color:var(--title-color);font-weight:bold;font-size:1.3rem;line-height:1.1em}.nosidebar .title{font-size:1.9em;line-height:1.1em}.subtitle{font-size:1rem;line-height:1.1em;color:var(--title-color);opacity:0.9}.tag{margin-right:10px;display:inline-block}</style>`, pe(
      this,
      {
        target: this.shadowRoot,
        props: ae(this.attributes),
        customElement: !0
      },
      xe,
      ke,
      le,
      {
        baseurl: 0,
        title: 1,
        maxlength: 6,
        tags: 7,
        places: 8,
        blob: 9,
        dark: 2,
        sidebar: 3,
        external_style: 4
      },
      null
    ), e && (e.target && k(e.target, this, e.anchor), e.props && (this.$set(e.props), b()));
  }
  static get observedAttributes() {
    return [
      "baseurl",
      "title",
      "maxlength",
      "tags",
      "places",
      "blob",
      "dark",
      "sidebar",
      "external_style"
    ];
  }
  get baseurl() {
    return this.$$.ctx[0];
  }
  set baseurl(e) {
    this.$$set({ baseurl: e }), b();
  }
  get title() {
    return this.$$.ctx[1];
  }
  set title(e) {
    this.$$set({ title: e }), b();
  }
  get maxlength() {
    return this.$$.ctx[6];
  }
  set maxlength(e) {
    this.$$set({ maxlength: e }), b();
  }
  get tags() {
    return this.$$.ctx[7];
  }
  set tags(e) {
    this.$$set({ tags: e }), b();
  }
  get places() {
    return this.$$.ctx[8];
  }
  set places(e) {
    this.$$set({ places: e }), b();
  }
  get blob() {
    return this.$$.ctx[9];
  }
  set blob(e) {
    this.$$set({ blob: e }), b();
  }
  get dark() {
    return this.$$.ctx[2];
  }
  set dark(e) {
    this.$$set({ dark: e }), b();
  }
  get sidebar() {
    return this.$$.ctx[3];
  }
  set sidebar(e) {
    this.$$set({ sidebar: e }), b();
  }
  get external_style() {
    return this.$$.ctx[4];
  }
  set external_style(e) {
    this.$$set({ external_style: e }), b();
  }
}
customElements.define("blob-share", ve);
