function z() {
}
function P(t) {
  return t();
}
function Q() {
  return /* @__PURE__ */ Object.create(null);
}
function R(t) {
  t.forEach(P);
}
function q(t) {
  return typeof t == "function";
}
function ue(t, e) {
  return t != t ? e == e : t !== e || t && typeof t == "object" || typeof t == "function";
}
let T;
function W(t, e) {
  return T || (T = document.createElement("a")), T.href = e, t === T.href;
}
function de(t) {
  return Object.keys(t).length === 0;
}
function d(t, e) {
  t.appendChild(e);
}
function y(t, e, n) {
  t.insertBefore(e, n || null);
}
function w(t) {
  t.parentNode && t.parentNode.removeChild(t);
}
function fe(t, e) {
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
function he() {
  return j("");
}
function f(t, e, n) {
  n == null ? t.removeAttribute(e) : t.getAttribute(e) !== n && t.setAttribute(e, n);
}
function me(t) {
  return Array.from(t.childNodes);
}
function L(t, e) {
  e = "" + e, t.wholeText !== e && (t.data = e);
}
function E(t, e, n) {
  t.classList[n ? "add" : "remove"](e);
}
function ge(t) {
  const e = {};
  for (const n of t)
    e[n.name] = n.value;
  return e;
}
let A;
function N(t) {
  A = t;
}
function be() {
  if (!A)
    throw new Error("Function called outside component initialization");
  return A;
}
function _e(t) {
  be().$$.on_mount.push(t);
}
const C = [], X = [], H = [], Y = [], pe = Promise.resolve();
let D = !1;
function ke() {
  D || (D = !0, pe.then(x));
}
function F(t) {
  H.push(t);
}
const O = /* @__PURE__ */ new Set();
let B = 0;
function x() {
  const t = A;
  do {
    for (; B < C.length; ) {
      const e = C[B];
      B++, N(e), ve(e.$$);
    }
    for (N(null), C.length = 0, B = 0; X.length; )
      X.pop()();
    for (let e = 0; e < H.length; e += 1) {
      const n = H[e];
      O.has(n) || (O.add(n), n());
    }
    H.length = 0;
  } while (C.length);
  for (; Y.length; )
    Y.pop()();
  D = !1, O.clear(), N(t);
}
function ve(t) {
  if (t.fragment !== null) {
    t.update(), R(t.before_update);
    const e = t.dirty;
    t.dirty = [-1], t.fragment && t.fragment.p(t.ctx, e), t.after_update.forEach(F);
  }
}
const xe = /* @__PURE__ */ new Set();
function ye(t, e) {
  t && t.i && (xe.delete(t), t.i(e));
}
function we(t, e, n, l) {
  const { fragment: r, after_update: o } = t.$$;
  r && r.m(e, n), l || F(() => {
    const i = t.$$.on_mount.map(P).filter(q);
    t.$$.on_destroy ? t.$$.on_destroy.push(...i) : R(i), t.$$.on_mount = [];
  }), o.forEach(F);
}
function $e(t, e) {
  const n = t.$$;
  n.fragment !== null && (R(n.on_destroy), n.fragment && n.fragment.d(e), n.on_destroy = n.fragment = null, n.ctx = []);
}
function Ee(t, e) {
  t.$$.dirty[0] === -1 && (C.push(t), ke(), t.$$.dirty.fill(0)), t.$$.dirty[e / 31 | 0] |= 1 << e % 31;
}
function Se(t, e, n, l, r, o, i, u = [-1]) {
  const a = A;
  N(t);
  const s = t.$$ = {
    fragment: null,
    ctx: [],
    props: o,
    update: z,
    not_equal: r,
    bound: Q(),
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(e.context || (a ? a.$$.context : [])),
    callbacks: Q(),
    dirty: u,
    skip_bound: !1,
    root: e.target || a.$$.root
  };
  i && i(s.root);
  let k = !1;
  if (s.ctx = n ? n(t, e.props || {}, (m, v, ...c) => {
    const p = c.length ? c[0] : v;
    return s.ctx && r(s.ctx[m], s.ctx[m] = p) && (!s.skip_bound && s.bound[m] && s.bound[m](p), k && Ee(t, m)), v;
  }) : [], s.update(), k = !0, R(s.before_update), s.fragment = l ? l(s.ctx) : !1, e.target) {
    if (e.hydrate) {
      const m = me(e.target);
      s.fragment && s.fragment.l(m), m.forEach(w);
    } else
      s.fragment && s.fragment.c();
    e.intro && ye(t.$$.fragment), we(t, e.target, e.anchor, e.customElement), x();
  }
  N(a);
}
let ce;
typeof HTMLElement == "function" && (ce = class extends HTMLElement {
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
    $e(this, 1), this.$destroy = z;
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
    this.$$set && !de(t) && (this.$$.skip_bound = !0, this.$$set(t), this.$$.skip_bound = !1);
  }
});
function Z(t) {
  const e = {
    weekday: "long",
    month: "long",
    day: "numeric"
  };
  return new Date(t).toLocaleDateString(void 0, e);
}
function ee(t, e, n) {
  const l = t.slice();
  return l[10] = e[n], l;
}
function te(t, e, n) {
  const l = t.slice();
  return l[13] = e[n], l;
}
function le(t) {
  let e;
  return {
    c() {
      e = _("link"), f(e, "rel", "stylesheet"), f(e, "href", t[4]);
    },
    m(n, l) {
      y(n, e, l);
    },
    p(n, l) {
      l & 16 && f(e, "href", n[4]);
    },
    d(n) {
      n && w(e);
    }
  };
}
function ne(t) {
  let e, n, l = t[1] && t[3] && ie(t), r = t[5], o = [];
  for (let i = 0; i < r.length; i += 1)
    o[i] = se(ee(t, r, i));
  return {
    c() {
      e = _("div"), l && l.c(), n = S();
      for (let i = 0; i < o.length; i += 1)
        o[i].c();
      f(e, "id", "blobShare"), E(e, "dark", t[2]), E(e, "light", !t[2]), E(e, "sidebar", t[3]), E(e, "nosidebar", !t[3]);
    },
    m(i, u) {
      y(i, e, u), l && l.m(e, null), d(e, n);
      for (let a = 0; a < o.length; a += 1)
        o[a].m(e, null);
    },
    p(i, u) {
      if (i[1] && i[3] ? l ? l.p(i, u) : (l = ie(i), l.c(), l.m(e, n)) : l && (l.d(1), l = null), u & 41) {
        r = i[5];
        let a;
        for (a = 0; a < r.length; a += 1) {
          const s = ee(i, r, a);
          o[a] ? o[a].p(s, u) : (o[a] = se(s), o[a].c(), o[a].m(e, null));
        }
        for (; a < o.length; a += 1)
          o[a].d(1);
        o.length = r.length;
      }
      u & 4 && E(e, "dark", i[2]), u & 4 && E(e, "light", !i[2]), u & 8 && E(e, "sidebar", i[3]), u & 8 && E(e, "nosidebar", !i[3]);
    },
    d(i) {
      i && w(e), l && l.d(), fe(o, i);
    }
  };
}
function ie(t) {
  let e;
  return {
    c() {
      e = j(t[1]);
    },
    m(n, l) {
      y(n, e, l);
    },
    p(n, l) {
      l & 2 && L(e, n[1]);
    },
    d(n) {
      n && w(e);
    }
  };
}
function re(t) {
  let e, n, l, r, o, i, u;
  return {
    c() {
      e = _("a"), n = _("div"), l = _("img"), f(l, "style", "aspect-ratio=1.7778;"), f(l, "alt", r = t[10].title), W(l.src, o = t[10].image ? `${t[0]}/media/${t[10].image}` : t[0] + "/blob.png") || f(l, "src", o), f(l, "loading", "lazy"), f(n, "class", "img"), f(e, "href", i = t[10].URL), f(e, "title", u = t[10].title), f(e, "target", "_blank"), f(e, "rel", "noreferrer");
    },
    m(a, s) {
      y(a, e, s), d(e, n), d(n, l);
    },
    p(a, s) {
      s & 32 && r !== (r = a[10].title) && f(l, "alt", r), s & 33 && !W(l.src, o = a[10].image ? `${a[0]}/media/${a[10].image}` : a[0] + "/blob.png") && f(l, "src", o), s & 32 && i !== (i = a[10].URL) && f(e, "href", i), s & 32 && u !== (u = a[10].title) && f(e, "title", u);
    },
    d(a) {
      a && w(e);
    }
  };
}
function oe(t) {
  let e, n = t[10].tags, l = [];
  for (let r = 0; r < n.length; r += 1)
    l[r] = ae(te(t, n, r));
  return {
    c() {
      e = _("div");
      for (let r = 0; r < l.length; r += 1)
        l[r].c();
      f(e, "class", "tags");
    },
    m(r, o) {
      y(r, e, o);
      for (let i = 0; i < l.length; i += 1)
        l[i].m(e, null);
    },
    p(r, o) {
      if (o & 33) {
        n = r[10].tags;
        let i;
        for (i = 0; i < n.length; i += 1) {
          const u = te(r, n, i);
          l[i] ? l[i].p(u, o) : (l[i] = ae(u), l[i].c(), l[i].m(e, null));
        }
        for (; i < l.length; i += 1)
          l[i].d(1);
        l.length = n.length;
      }
    },
    d(r) {
      r && w(e), fe(l, r);
    }
  };
}
function ae(t) {
  let e, n = t[13].name + "", l, r;
  return {
    c() {
      e = _("a"), l = j(n), f(e, "class", "tag"), f(e, "href", r = t[0] + "/tag/" + t[13].id);
    },
    m(o, i) {
      y(o, e, i), d(e, l);
    },
    p(o, i) {
      i & 32 && n !== (n = o[13].name + "") && L(l, n), i & 33 && r !== (r = o[0] + "/tag/" + o[13].id) && f(e, "href", r);
    },
    d(o) {
      o && w(e);
    }
  };
}
function se(t) {
  var J;
  let e, n, l, r, o = Z(t[10].date) + "", i, u, a, s, k = t[10].source.name + "", m, v, c, p, U = t[10].title + "", I, M, V, G, g = !t[3] && re(t), b = ((J = t[10].tags) == null ? void 0 : J.length) && oe(t);
  return {
    c() {
      e = _("div"), g && g.c(), n = S(), l = _("div"), r = _("div"), i = j(o), u = _("br"), a = S(), s = _("a"), m = j(k), c = S(), p = _("a"), I = j(U), V = S(), b && b.c(), G = S(), f(s, "href", v = t[0] + "/s/" + t[10].source.id), f(r, "class", "subtitle"), f(p, "class", "title"), f(p, "href", M = t[10].URL), f(p, "target", "_blank"), f(p, "rel", "noreferrer"), f(l, "class", "content"), f(e, "class", "item");
    },
    m(h, $) {
      y(h, e, $), g && g.m(e, null), d(e, n), d(e, l), d(l, r), d(r, i), d(r, u), d(r, a), d(r, s), d(s, m), d(l, c), d(l, p), d(p, I), d(l, V), b && b.m(l, null), d(e, G);
    },
    p(h, $) {
      var K;
      h[3] ? g && (g.d(1), g = null) : g ? g.p(h, $) : (g = re(h), g.c(), g.m(e, n)), $ & 32 && o !== (o = Z(h[10].date) + "") && L(i, o), $ & 32 && k !== (k = h[10].source.name + "") && L(m, k), $ & 33 && v !== (v = h[0] + "/s/" + h[10].source.id) && f(s, "href", v), $ & 32 && U !== (U = h[10].title + "") && L(I, U), $ & 32 && M !== (M = h[10].URL) && f(p, "href", M), (K = h[10].tags) != null && K.length ? b ? b.p(h, $) : (b = oe(h), b.c(), b.m(l, null)) : b && (b.d(1), b = null);
    },
    d(h) {
      h && w(e), g && g.d(), b && b.d();
    }
  };
}
function je(t) {
  let e, n, l = t[4] && le(t), r = t[5].length && ne(t);
  return {
    c() {
      l && l.c(), e = S(), r && r.c(), n = he(), this.c = z;
    },
    m(o, i) {
      l && l.m(o, i), y(o, e, i), r && r.m(o, i), y(o, n, i);
    },
    p(o, [i]) {
      o[4] ? l ? l.p(o, i) : (l = le(o), l.c(), l.m(e.parentNode, e)) : l && (l.d(1), l = null), o[5].length ? r ? r.p(o, i) : (r = ne(o), r.c(), r.m(n.parentNode, n)) : r && (r.d(1), r = null);
    },
    i: z,
    o: z,
    d(o) {
      l && l.d(o), o && w(e), r && r.d(o), o && w(n);
    }
  };
}
function ze(t, e, n) {
  let { baseurl: l = "" } = e, { title: r = "" } = e, { maxlength: o = !1 } = e, { blob: i = null } = e, { dark: u = null } = e, { sidebar: a = null } = e, { external_style: s = "" } = e, k = !1, m = [];
  function v() {
    k && i && fetch(`${l}/api/post/${i}`).then((c) => c.json()).then((c) => {
      n(5, m = c);
    }).catch((c) => {
      console.error("Error loading Blob API -> ", c);
    });
  }
  return _e(() => {
    k = !0, v();
  }), t.$$set = (c) => {
    "baseurl" in c && n(0, l = c.baseurl), "title" in c && n(1, r = c.title), "maxlength" in c && n(6, o = c.maxlength), "blob" in c && n(7, i = c.blob), "dark" in c && n(2, u = c.dark), "sidebar" in c && n(3, a = c.sidebar), "external_style" in c && n(4, s = c.external_style);
  }, t.$$.update = () => {
    t.$$.dirty & 128 && v();
  }, [l, r, u, a, s, m, o, i];
}
class Ce extends ce {
  constructor(e) {
    super(), this.shadowRoot.innerHTML = `<style>#blobShare{font-family:ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
      "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif,
      "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
      "Noto Color Emoji";overflow-x:hidden;width:100%;box-sizing:content-box;margin:0 auto;font-size:1rem;text-align:left}.nosidebar{max-width:1200px}.sidebar{max-width:500px;box-shadow:rgba(60, 64, 67, 0.4) 0px 1px 2px 0px,
      rgba(60, 64, 67, 0.25) 0px 1px 3px 1px;border-radius:5px;font-size:1rem}.item{display:flex;gap:0.2rem;padding:0.5rem}.sidebar .item{flex-wrap:wrap}.item .img{width:450px;max-height:250px;aspect-ratio:1.7778;flex:1 0 auto}.item img{object-fit:cover;border-radius:15px;width:100%;height:100%;box-shadow:rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
      rgba(0, 0, 0, 0.3) 0px 3px 7px -3px}.nosidebar .item{margin-bottom:2rem}.nosidebar .content{margin-left:1rem;margin-top:5px;text-align:left}.sidebar .content{flex-grow:1}.tags{margin-top:2px}a{text-decoration:none;color:var(--text-color);margin:0;line-height:1.275rem;font-weight:400;font-size:0.875rem;position:relative;transition:background-color 0.3s cubic-bezier(0.25, 0.8, 0.5, 1), padding 0.3s}a:hover,a:focus{text-decoration:underline}.dark{--bg-odd-color:#161616;--bg-even-color:#222;--bg-hover-color:#333;--text-color:#8fa4ea;--title-color:white;--line-color:rgba(120, 120, 120, 0.2)}.light{--bg-odd-color:#f5f5f5;--bg-even-color:#fafafa;--bg-hover-color:#eee;--text-color:#3f51b5;--title-color:black;--line-color:rgba(220, 220, 220, 0.9)}.sidebar .item{padding:1rem;border-bottom:1px solid var(--line-color)}.sidebar .item:hover,.sidebar .item:focus,.sidebar .item:active{background-color:var(--bg-hover-color)}.title{color:var(--title-color);font-weight:bold;font-size:1.3rem;line-height:1.1em}.nosidebar .title{font-size:1.9em;line-height:1.1em}.subtitle{font-size:0.9rem;line-height:1.1em;color:var(--title-color);opacity:0.9}.tags{display:flex;flex-wrap:wrap;gap:3px;justify-items:left}.tag{display:inline-block;border:1px solid var(--text-color);color:var(--text-color);padding:0px 3px;border-radius:3px;font-size:0.8rem}</style>`, Se(
      this,
      {
        target: this.shadowRoot,
        props: ge(this.attributes),
        customElement: !0
      },
      ze,
      je,
      ue,
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
    ), e && (e.target && y(e.target, this, e.anchor), e.props && (this.$set(e.props), x()));
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
customElements.define("blob-share", Ce);
