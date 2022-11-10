function w() {
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
function Y(t) {
  return typeof t == "function";
}
function te(t, e) {
  return t != t ? e == e : t !== e || t && typeof t == "object" || typeof t == "function";
}
let $;
function R(t, e) {
  return $ || ($ = document.createElement("a")), $.href = e, t === $.href;
}
function ne(t) {
  return Object.keys(t).length === 0;
}
function _(t, e) {
  t.appendChild(e);
}
function k(t, e, n) {
  t.insertBefore(e, n || null);
}
function x(t) {
  t.parentNode.removeChild(t);
}
function Z(t, e) {
  for (let n = 0; n < t.length; n += 1)
    t[n] && t[n].d(e);
}
function p(t) {
  return document.createElement(t);
}
function S(t) {
  return document.createTextNode(t);
}
function E() {
  return S(" ");
}
function le() {
  return S("");
}
function d(t, e, n) {
  n == null ? t.removeAttribute(e) : t.getAttribute(e) !== n && t.setAttribute(e, n);
}
function ie(t) {
  return Array.from(t.childNodes);
}
function T(t, e) {
  e = "" + e, t.wholeText !== e && (t.data = e);
}
function y(t, e, n) {
  t.classList[n ? "add" : "remove"](e);
}
function re(t) {
  const e = {};
  for (const n of t)
    e[n.name] = n.value;
  return e;
}
let C;
function j(t) {
  C = t;
}
function oe() {
  if (!C)
    throw new Error("Function called outside component initialization");
  return C;
}
function ae(t) {
  oe().$$.on_mount.push(t);
}
const z = [], U = [], M = [], q = [], se = Promise.resolve();
let B = !1;
function ce() {
  B || (B = !0, se.then(b));
}
function H(t) {
  M.push(t);
}
const L = /* @__PURE__ */ new Set();
let A = 0;
function b() {
  const t = C;
  do {
    for (; A < z.length; ) {
      const e = z[A];
      A++, j(e), fe(e.$$);
    }
    for (j(null), z.length = 0, A = 0; U.length; )
      U.pop()();
    for (let e = 0; e < M.length; e += 1) {
      const n = M[e];
      L.has(n) || (L.add(n), n());
    }
    M.length = 0;
  } while (z.length);
  for (; q.length; )
    q.pop()();
  B = !1, L.clear(), j(t);
}
function fe(t) {
  if (t.fragment !== null) {
    t.update(), N(t.before_update);
    const e = t.dirty;
    t.dirty = [-1], t.fragment && t.fragment.p(t.ctx, e), t.after_update.forEach(H);
  }
}
const ue = /* @__PURE__ */ new Set();
function de(t, e) {
  t && t.i && (ue.delete(t), t.i(e));
}
function he(t, e, n, l) {
  const { fragment: r, on_mount: o, on_destroy: i, after_update: f } = t.$$;
  r && r.m(e, n), l || H(() => {
    const a = o.map(I).filter(Y);
    i ? i.push(...a) : N(a), t.$$.on_mount = [];
  }), f.forEach(H);
}
function ge(t, e) {
  const n = t.$$;
  n.fragment !== null && (N(n.on_destroy), n.fragment && n.fragment.d(e), n.on_destroy = n.fragment = null, n.ctx = []);
}
function me(t, e) {
  t.$$.dirty[0] === -1 && (z.push(t), ce(), t.$$.dirty.fill(0)), t.$$.dirty[e / 31 | 0] |= 1 << e % 31;
}
function be(t, e, n, l, r, o, i, f = [-1]) {
  const a = C;
  j(t);
  const s = t.$$ = {
    fragment: null,
    ctx: null,
    props: o,
    update: w,
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
  i && i(s.root);
  let v = !1;
  if (s.ctx = n ? n(t, e.props || {}, (m, h, ...g) => {
    const u = g.length ? g[0] : h;
    return s.ctx && r(s.ctx[m], s.ctx[m] = u) && (!s.skip_bound && s.bound[m] && s.bound[m](u), v && me(t, m)), h;
  }) : [], s.update(), v = !0, N(s.before_update), s.fragment = l ? l(s.ctx) : !1, e.target) {
    if (e.hydrate) {
      const m = ie(e.target);
      s.fragment && s.fragment.l(m), m.forEach(x);
    } else
      s.fragment && s.fragment.c();
    e.intro && de(t.$$.fragment), he(t, e.target, e.anchor, e.customElement), b();
  }
  j(a);
}
let ee;
typeof HTMLElement == "function" && (ee = class extends HTMLElement {
  constructor() {
    super(), this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    const { on_mount: t } = this.$$;
    this.$$.on_disconnect = t.map(I).filter(Y);
    for (const e in this.$$.slotted)
      this.appendChild(this.$$.slotted[e]);
  }
  attributeChangedCallback(t, e, n) {
    this[t] = n;
  }
  disconnectedCallback() {
    N(this.$$.on_disconnect);
  }
  $destroy() {
    ge(this, 1), this.$destroy = w;
  }
  $on(t, e) {
    const n = this.$$.callbacks[t] || (this.$$.callbacks[t] = []);
    return n.push(e), () => {
      const l = n.indexOf(e);
      l !== -1 && n.splice(l, 1);
    };
  }
  $set(t) {
    this.$$set && !ne(t) && (this.$$.skip_bound = !0, this.$$set(t), this.$$.skip_bound = !1);
  }
});
function F(t) {
  const e = {
    weekday: "long",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  };
  return new Date(t.date).toLocaleString(void 0, e);
}
function P(t, e, n) {
  const l = t.slice();
  return l[12] = e[n], l;
}
function D(t, e, n) {
  const l = t.slice();
  return l[15] = e[n], l;
}
function V(t) {
  let e;
  return {
    c() {
      e = p("link"), d(e, "rel", "stylesheet"), d(e, "href", t[4]);
    },
    m(n, l) {
      k(n, e, l);
    },
    p(n, l) {
      l & 16 && d(e, "href", n[4]);
    },
    d(n) {
      n && x(e);
    }
  };
}
function G(t) {
  let e, n, l = t[1] && t[3] === "true" && J(), r = t[5], o = [];
  for (let i = 0; i < r.length; i += 1)
    o[i] = X(P(t, r, i));
  return {
    c() {
      e = p("div"), l && l.c(), n = E();
      for (let i = 0; i < o.length; i += 1)
        o[i].c();
      d(e, "id", "blobShare"), y(e, "dark", t[2] === "true"), y(e, "light", t[2] !== "true"), y(e, "sidebar", t[3] === "true"), y(e, "nosidebar", t[3] !== "true");
    },
    m(i, f) {
      k(i, e, f), l && l.m(e, null), _(e, n);
      for (let a = 0; a < o.length; a += 1)
        o[a].m(e, null);
    },
    p(i, f) {
      if (i[1] && i[3] === "true" ? l || (l = J(), l.c(), l.m(e, n)) : l && (l.d(1), l = null), f & 41) {
        r = i[5];
        let a;
        for (a = 0; a < r.length; a += 1) {
          const s = P(i, r, a);
          o[a] ? o[a].p(s, f) : (o[a] = X(s), o[a].c(), o[a].m(e, null));
        }
        for (; a < o.length; a += 1)
          o[a].d(1);
        o.length = r.length;
      }
      f & 4 && y(e, "dark", i[2] === "true"), f & 4 && y(e, "light", i[2] !== "true"), f & 8 && y(e, "sidebar", i[3] === "true"), f & 8 && y(e, "nosidebar", i[3] !== "true");
    },
    d(i) {
      i && x(e), l && l.d(), Z(o, i);
    }
  };
}
function J(t) {
  return { c: w, m: w, d: w };
}
function K(t) {
  let e, n, l, r, o, i, f;
  return {
    c() {
      e = p("a"), n = p("div"), l = p("img"), d(l, "style", "aspect-ratio=1.7778;"), d(l, "alt", r = t[12].title), R(l.src, o = t[12].image ? t[12].image : t[0] + "/noimg.svg") || d(l, "src", o), d(l, "loading", "lazy"), d(n, "class", "img"), d(e, "href", i = t[0] + "/item/" + (t[12].slug || t[12].id)), d(e, "class", "item"), d(e, "title", f = t[12].title), d(e, "target", "_blank");
    },
    m(a, s) {
      k(a, e, s), _(e, n), _(n, l);
    },
    p(a, s) {
      s & 32 && r !== (r = a[12].title) && d(l, "alt", r), s & 33 && !R(l.src, o = a[12].image ? a[12].image : a[0] + "/noimg.svg") && d(l, "src", o), s & 33 && i !== (i = a[0] + "/item/" + (a[12].slug || a[12].id)) && d(e, "href", i), s & 32 && f !== (f = a[12].title) && d(e, "title", f);
    },
    d(a) {
      a && x(e);
    }
  };
}
function Q(t) {
  let e, n = t[12].tags, l = [];
  for (let r = 0; r < n.length; r += 1)
    l[r] = W(D(t, n, r));
  return {
    c() {
      e = p("div");
      for (let r = 0; r < l.length; r += 1)
        l[r].c();
      d(e, "class", "tags");
    },
    m(r, o) {
      k(r, e, o);
      for (let i = 0; i < l.length; i += 1)
        l[i].m(e, null);
    },
    p(r, o) {
      if (o & 32) {
        n = r[12].tags;
        let i;
        for (i = 0; i < n.length; i += 1) {
          const f = D(r, n, i);
          l[i] ? l[i].p(f, o) : (l[i] = W(f), l[i].c(), l[i].m(e, null));
        }
        for (; i < l.length; i += 1)
          l[i].d(1);
        l.length = n.length;
      }
    },
    d(r) {
      r && x(e), Z(l, r);
    }
  };
}
function W(t) {
  let e, n, l = t[15].name + "", r;
  return {
    c() {
      e = p("span"), n = S("#"), r = S(l), d(e, "class", "tag");
    },
    m(o, i) {
      k(o, e, i), _(e, n), _(e, r);
    },
    p(o, i) {
      i & 32 && l !== (l = o[15].name + "") && T(r, l);
    },
    d(o) {
      o && x(e);
    }
  };
}
function X(t) {
  let e, n, l, r = F(t[12]) + "", o, i, f, a = t[12].title + "", s, v, m, h = t[3] !== "true" && K(t), g = t[12].tags.length && Q(t);
  return {
    c() {
      h && h.c(), e = E(), n = p("div"), l = p("div"), o = S(r), i = E(), f = p("div"), s = S(a), v = E(), g && g.c(), m = E(), d(l, "class", "subtitle"), d(f, "class", "title"), d(n, "class", "content");
    },
    m(u, c) {
      h && h.m(u, c), k(u, e, c), k(u, n, c), _(n, l), _(l, o), _(n, i), _(n, f), _(f, s), _(n, v), g && g.m(n, null), _(n, m);
    },
    p(u, c) {
      u[3] !== "true" ? h ? h.p(u, c) : (h = K(u), h.c(), h.m(e.parentNode, e)) : h && (h.d(1), h = null), c & 32 && r !== (r = F(u[12]) + "") && T(o, r), c & 32 && a !== (a = u[12].title + "") && T(s, a), u[12].tags.length ? g ? g.p(u, c) : (g = Q(u), g.c(), g.m(n, m)) : g && (g.d(1), g = null);
    },
    d(u) {
      h && h.d(u), u && x(e), u && x(n), g && g.d();
    }
  };
}
function _e(t) {
  let e, n, l = t[4] && V(t), r = t[5].length && G(t);
  return {
    c() {
      l && l.c(), e = E(), r && r.c(), n = le(), this.c = w;
    },
    m(o, i) {
      l && l.m(o, i), k(o, e, i), r && r.m(o, i), k(o, n, i);
    },
    p(o, [i]) {
      o[4] ? l ? l.p(o, i) : (l = V(o), l.c(), l.m(e.parentNode, e)) : l && (l.d(1), l = null), o[5].length ? r ? r.p(o, i) : (r = G(o), r.c(), r.m(n.parentNode, n)) : r && (r.d(1), r = null);
    },
    i: w,
    o: w,
    d(o) {
      l && l.d(o), o && x(e), r && r.d(o), o && x(n);
    }
  };
}
function pe(t, e, n) {
  let { baseurl: l = "" } = e, { title: r = "" } = e, { maxlength: o = !1 } = e, { tags: i = "" } = e, { places: f = "" } = e, { blob: a = 12 } = e, { dark: s = "false" } = e, { sidebar: v = "true" } = e, { external_style: m = "" } = e, h = !1, g = [];
  function u() {
    !h || fetch(`${l}/api/post/${a}`).then((c) => c.json()).then((c) => {
      n(5, g = c);
    }).catch((c) => {
      console.error("Error loading Blob API -> ", c);
    });
  }
  return ae(() => {
    h = !0, u();
  }), t.$$set = (c) => {
    "baseurl" in c && n(0, l = c.baseurl), "title" in c && n(1, r = c.title), "maxlength" in c && n(6, o = c.maxlength), "tags" in c && n(7, i = c.tags), "places" in c && n(8, f = c.places), "blob" in c && n(9, a = c.blob), "dark" in c && n(2, s = c.dark), "sidebar" in c && n(3, v = c.sidebar), "external_style" in c && n(4, m = c.external_style);
  }, t.$$.update = () => {
    t.$$.dirty & 974 && u(o && r && f && i && s && show_recurrent && v && a);
  }, [
    l,
    r,
    s,
    v,
    m,
    g,
    o,
    i,
    f,
    a
  ];
}
class ke extends ee {
  constructor(e) {
    super(), this.shadowRoot.innerHTML = `<style>#blobShare{font-family:ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
      "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif,
      "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
      "Noto Color Emoji";overflow-x:hidden;width:100%;box-sizing:content-box;margin:0 auto;font-size:1rem;text-align:left}.nosidebar{max-width:1200px}.sidebar{max-width:500px;box-shadow:rgba(60, 64, 67, 0.4) 0px 1px 2px 0px,
      rgba(60, 64, 67, 0.25) 0px 1px 3px 1px;border-radius:5px;font-size:1rem}.item .img{width:100%;max-width:450px;max-height:250px;aspect-ratio:1.7778;flex:1 0 auto}@media screen and (max-width: 800px){.item{flex-wrap:wrap}.item .img{max-width:100%}}.item img{object-fit:cover;border-radius:15px;width:100%;height:100%;box-shadow:rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
      rgba(0, 0, 0, 0.3) 0px 3px 7px -3px}.nosidebar .item{margin-bottom:2rem}.nosidebar .content{margin-left:1rem;margin-top:5px;text-align:left}.tags{margin-top:2px}a{text-decoration:none;color:var(--text-color);display:flex;padding:8px 20px;margin:0;line-height:1.275rem;font-weight:400;font-size:0.875rem;position:relative;transition:background-color 0.3s cubic-bezier(0.25, 0.8, 0.5, 1),
      padding 0.3s;box-sizing:content-box}.dark{--bg-odd-color:#161616;--bg-even-color:#222;--bg-hover-color:#333;--text-color:white;--title-color:white;--line-color:rgba(120, 120, 120, 0.2)}.light{--bg-odd-color:#f5f5f5;--bg-even-color:#fafafa;--bg-hover-color:#eee;--text-color:#222;--title-color:black;--line-color:rgba(220, 220, 220, 0.9)}.sidebar a{background-color:var(--bg-even-color);border-bottom:1px solid var(--line-color)}.sidebar a:hover,.sidebar a:focus,.sidebar a:active{background-color:var(--bg-hover-color);padding-left:15px;padding-right:25px}.title{color:var(--title-color);font-weight:bold;font-size:1.3rem;line-height:1.1em}.nosidebar .title{font-size:1.9em;line-height:1.1em}.subtitle{font-size:1rem;line-height:1.1em;color:var(--title-color);opacity:0.9}.tag{margin-right:10px;display:inline-block}</style>`, be(
      this,
      {
        target: this.shadowRoot,
        props: re(this.attributes),
        customElement: !0
      },
      pe,
      _e,
      te,
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
customElements.define("blob-share", ke);
