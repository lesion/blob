function C() {
}
function I(t) {
  return t();
}
function O() {
  return /* @__PURE__ */ Object.create(null);
}
function L(t) {
  t.forEach(I);
}
function ee(t) {
  return typeof t == "function";
}
function ne(t, e) {
  return t != t ? e == e : t !== e || t && typeof t == "object" || typeof t == "function";
}
let M;
function q(t, e) {
  return M || (M = document.createElement("a")), M.href = e, t === M.href;
}
function ie(t) {
  return Object.keys(t).length === 0;
}
function v(t, e) {
  t.appendChild(e);
}
function g(t, e, l) {
  t.insertBefore(e, l || null);
}
function _(t) {
  t.parentNode.removeChild(t);
}
function te(t, e) {
  for (let l = 0; l < t.length; l += 1)
    t[l] && t[l].d(e);
}
function x(t) {
  return document.createElement(t);
}
function w(t) {
  return document.createTextNode(t);
}
function $() {
  return w(" ");
}
function oe() {
  return w("");
}
function m(t, e, l) {
  l == null ? t.removeAttribute(e) : t.getAttribute(e) !== l && t.setAttribute(e, l);
}
function re(t) {
  return Array.from(t.childNodes);
}
function z(t, e) {
  e = "" + e, t.wholeText !== e && (t.data = e);
}
function E(t, e, l) {
  t.classList[l ? "add" : "remove"](e);
}
function se(t) {
  const e = {};
  for (const l of t)
    e[l.name] = l.value;
  return e;
}
let N;
function A(t) {
  N = t;
}
function ae() {
  if (!N)
    throw new Error("Function called outside component initialization");
  return N;
}
function fe(t) {
  ae().$$.on_mount.push(t);
}
const j = [], F = [], T = [], P = [], ce = Promise.resolve();
let B = !1;
function ue() {
  B || (B = !0, ce.then(y));
}
function H(t) {
  T.push(t);
}
const U = /* @__PURE__ */ new Set();
let R = 0;
function y() {
  const t = N;
  do {
    for (; R < j.length; ) {
      const e = j[R];
      R++, A(e), de(e.$$);
    }
    for (A(null), j.length = 0, R = 0; F.length; )
      F.pop()();
    for (let e = 0; e < T.length; e += 1) {
      const l = T[e];
      U.has(l) || (U.add(l), l());
    }
    T.length = 0;
  } while (j.length);
  for (; P.length; )
    P.pop()();
  B = !1, U.clear(), A(t);
}
function de(t) {
  if (t.fragment !== null) {
    t.update(), L(t.before_update);
    const e = t.dirty;
    t.dirty = [-1], t.fragment && t.fragment.p(t.ctx, e), t.after_update.forEach(H);
  }
}
const he = /* @__PURE__ */ new Set();
function me(t, e) {
  t && t.i && (he.delete(t), t.i(e));
}
function be(t, e, l, n) {
  const { fragment: o, on_mount: s, on_destroy: i, after_update: u } = t.$$;
  o && o.m(e, l), n || H(() => {
    const r = s.map(I).filter(ee);
    i ? i.push(...r) : L(r), t.$$.on_mount = [];
  }), u.forEach(H);
}
function ge(t, e) {
  const l = t.$$;
  l.fragment !== null && (L(l.on_destroy), l.fragment && l.fragment.d(e), l.on_destroy = l.fragment = null, l.ctx = []);
}
function _e(t, e) {
  t.$$.dirty[0] === -1 && (j.push(t), ue(), t.$$.dirty.fill(0)), t.$$.dirty[e / 31 | 0] |= 1 << e % 31;
}
function pe(t, e, l, n, o, s, i, u = [-1]) {
  const r = N;
  A(t);
  const f = t.$$ = {
    fragment: null,
    ctx: null,
    props: s,
    update: C,
    not_equal: o,
    bound: O(),
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(e.context || (r ? r.$$.context : [])),
    callbacks: O(),
    dirty: u,
    skip_bound: !1,
    root: e.target || r.$$.root
  };
  i && i(f.root);
  let h = !1;
  if (f.ctx = l ? l(t, e.props || {}, (d, c, ...a) => {
    const b = a.length ? a[0] : c;
    return f.ctx && o(f.ctx[d], f.ctx[d] = b) && (!f.skip_bound && f.bound[d] && f.bound[d](b), h && _e(t, d)), c;
  }) : [], f.update(), h = !0, L(f.before_update), f.fragment = n ? n(f.ctx) : !1, e.target) {
    if (e.hydrate) {
      const d = re(e.target);
      f.fragment && f.fragment.l(d), d.forEach(_);
    } else
      f.fragment && f.fragment.c();
    e.intro && me(t.$$.fragment), be(t, e.target, e.anchor, e.customElement), y();
  }
  A(r);
}
let le;
typeof HTMLElement == "function" && (le = class extends HTMLElement {
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
    L(this.$$.on_disconnect);
  }
  $destroy() {
    ge(this, 1), this.$destroy = C;
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
  return n[10] = e[l], n;
}
function G(t, e, l) {
  const n = t.slice();
  return n[13] = e[l], n;
}
function J(t) {
  let e;
  return {
    c() {
      e = x("link"), m(e, "rel", "stylesheet"), m(e, "href", t[4]);
    },
    m(l, n) {
      g(l, e, n);
    },
    p(l, n) {
      n & 16 && m(e, "href", l[4]);
    },
    d(l) {
      l && _(e);
    }
  };
}
function K(t) {
  let e, l, n = t[1] && t[3] && Q(t), o = t[5], s = [];
  for (let i = 0; i < o.length; i += 1)
    s[i] = Z(V(t, o, i));
  return {
    c() {
      e = x("div"), n && n.c(), l = $();
      for (let i = 0; i < s.length; i += 1)
        s[i].c();
      m(e, "id", "blobShare"), E(e, "dark", t[2]), E(e, "light", !t[2]), E(e, "sidebar", t[3]), E(e, "nosidebar", !t[3]);
    },
    m(i, u) {
      g(i, e, u), n && n.m(e, null), v(e, l);
      for (let r = 0; r < s.length; r += 1)
        s[r].m(e, null);
    },
    p(i, u) {
      if (i[1] && i[3] ? n ? n.p(i, u) : (n = Q(i), n.c(), n.m(e, l)) : n && (n.d(1), n = null), u & 41) {
        o = i[5];
        let r;
        for (r = 0; r < o.length; r += 1) {
          const f = V(i, o, r);
          s[r] ? s[r].p(f, u) : (s[r] = Z(f), s[r].c(), s[r].m(e, null));
        }
        for (; r < s.length; r += 1)
          s[r].d(1);
        s.length = o.length;
      }
      u & 4 && E(e, "dark", i[2]), u & 4 && E(e, "light", !i[2]), u & 8 && E(e, "sidebar", i[3]), u & 8 && E(e, "nosidebar", !i[3]);
    },
    d(i) {
      i && _(e), n && n.d(), te(s, i);
    }
  };
}
function Q(t) {
  let e;
  return {
    c() {
      e = w(t[1]);
    },
    m(l, n) {
      g(l, e, n);
    },
    p(l, n) {
      n & 2 && z(e, l[1]);
    },
    d(l) {
      l && _(e);
    }
  };
}
function W(t) {
  let e, l, n, o, s, i, u;
  return {
    c() {
      e = x("a"), l = x("div"), n = x("img"), m(n, "style", "aspect-ratio=1.7778;"), m(n, "alt", o = t[10].title), q(n.src, s = t[10].image ? t[10].image : t[0] + "/noimg.svg") || m(n, "src", s), m(n, "loading", "lazy"), m(l, "class", "img"), m(e, "href", i = t[0] + "/item/" + (t[10].slug || t[10].id)), m(e, "title", u = t[10].title), m(e, "target", "_blank");
    },
    m(r, f) {
      g(r, e, f), v(e, l), v(l, n);
    },
    p(r, f) {
      f & 32 && o !== (o = r[10].title) && m(n, "alt", o), f & 33 && !q(n.src, s = r[10].image ? r[10].image : r[0] + "/noimg.svg") && m(n, "src", s), f & 33 && i !== (i = r[0] + "/item/" + (r[10].slug || r[10].id)) && m(e, "href", i), f & 32 && u !== (u = r[10].title) && m(e, "title", u);
    },
    d(r) {
      r && _(e);
    }
  };
}
function X(t) {
  let e, l = t[10].tags, n = [];
  for (let o = 0; o < l.length; o += 1)
    n[o] = Y(G(t, l, o));
  return {
    c() {
      e = x("div");
      for (let o = 0; o < n.length; o += 1)
        n[o].c();
      m(e, "class", "tags");
    },
    m(o, s) {
      g(o, e, s);
      for (let i = 0; i < n.length; i += 1)
        n[i].m(e, null);
    },
    p(o, s) {
      if (s & 32) {
        l = o[10].tags;
        let i;
        for (i = 0; i < l.length; i += 1) {
          const u = G(o, l, i);
          n[i] ? n[i].p(u, s) : (n[i] = Y(u), n[i].c(), n[i].m(e, null));
        }
        for (; i < n.length; i += 1)
          n[i].d(1);
        n.length = l.length;
      }
    },
    d(o) {
      o && _(e), te(n, o);
    }
  };
}
function Y(t) {
  let e, l = t[13].name + "", n;
  return {
    c() {
      e = x("span"), n = w(l), m(e, "class", "tag");
    },
    m(o, s) {
      g(o, e, s), v(e, n);
    },
    p(o, s) {
      s & 32 && l !== (l = o[13].name + "") && z(n, l);
    },
    d(o) {
      o && _(e);
    }
  };
}
function Z(t) {
  let e, l, n, o, s = D(t[10].date) + "", i, u, r, f = t[10].title + "", h, d, c, a, b = !t[3] && W(t), p = t[10].tags.length && X(t);
  return {
    c() {
      e = x("div"), b && b.c(), l = $(), n = x("div"), o = x("div"), i = w(s), u = $(), r = x("a"), h = w(f), c = $(), p && p.c(), a = $(), m(o, "class", "subtitle"), m(r, "class", "title"), m(r, "href", d = t[10].URL), m(n, "class", "content"), m(e, "class", "item");
    },
    m(k, S) {
      g(k, e, S), b && b.m(e, null), v(e, l), v(e, n), v(n, o), v(o, i), v(n, u), v(n, r), v(r, h), v(n, c), p && p.m(n, null), v(e, a);
    },
    p(k, S) {
      k[3] ? b && (b.d(1), b = null) : b ? b.p(k, S) : (b = W(k), b.c(), b.m(e, l)), S & 32 && s !== (s = D(k[10].date) + "") && z(i, s), S & 32 && f !== (f = k[10].title + "") && z(h, f), S & 32 && d !== (d = k[10].URL) && m(r, "href", d), k[10].tags.length ? p ? p.p(k, S) : (p = X(k), p.c(), p.m(n, null)) : p && (p.d(1), p = null);
    },
    d(k) {
      k && _(e), b && b.d(), p && p.d();
    }
  };
}
function ke(t) {
  let e, l, n, o, s, i = typeof t[3], u, r, f, h = t[4] && J(t), d = t[5].length && K(t);
  return {
    c() {
      h && h.c(), e = $(), l = w(t[2]), n = w(" -  "), o = w(t[3]), s = $(), u = w(i), r = $(), d && d.c(), f = oe(), this.c = C;
    },
    m(c, a) {
      h && h.m(c, a), g(c, e, a), g(c, l, a), g(c, n, a), g(c, o, a), g(c, s, a), g(c, u, a), g(c, r, a), d && d.m(c, a), g(c, f, a);
    },
    p(c, [a]) {
      c[4] ? h ? h.p(c, a) : (h = J(c), h.c(), h.m(e.parentNode, e)) : h && (h.d(1), h = null), a & 4 && z(l, c[2]), a & 8 && z(o, c[3]), a & 8 && i !== (i = typeof c[3]) && z(u, i), c[5].length ? d ? d.p(c, a) : (d = K(c), d.c(), d.m(f.parentNode, f)) : d && (d.d(1), d = null);
    },
    i: C,
    o: C,
    d(c) {
      h && h.d(c), c && _(e), c && _(l), c && _(n), c && _(o), c && _(s), c && _(u), c && _(r), d && d.d(c), c && _(f);
    }
  };
}
function ve(t, e, l) {
  let { baseurl: n = "" } = e, { title: o = "" } = e, { maxlength: s = !1 } = e, { blob: i = 4 } = e, { dark: u = null } = e, { sidebar: r = null } = e, { external_style: f = "" } = e, h = !1, d = [];
  function c() {
    !h || fetch(`${n}/api/post/${i}`).then((a) => a.json()).then((a) => {
      l(5, d = a);
    }).catch((a) => {
      console.error("Error loading Blob API -> ", a);
    });
  }
  return fe(() => {
    h = !0, c();
  }), t.$$set = (a) => {
    "baseurl" in a && l(0, n = a.baseurl), "title" in a && l(1, o = a.title), "maxlength" in a && l(6, s = a.maxlength), "blob" in a && l(7, i = a.blob), "dark" in a && l(2, u = a.dark), "sidebar" in a && l(3, r = a.sidebar), "external_style" in a && l(4, f = a.external_style);
  }, t.$$.update = () => {
    t.$$.dirty & 128 && c();
  }, [n, o, u, r, f, d, s, i];
}
class xe extends le {
  constructor(e) {
    super(), this.shadowRoot.innerHTML = `<style>#blobShare{font-family:ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
      "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif,
      "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
      "Noto Color Emoji";overflow-x:hidden;width:100%;box-sizing:content-box;margin:0 auto;font-size:1rem;text-align:left;background-color:var(--bg-even-color)}.nosidebar{max-width:1200px}.sidebar{max-width:500px;box-shadow:rgba(60, 64, 67, 0.4) 0px 1px 2px 0px,
      rgba(60, 64, 67, 0.25) 0px 1px 3px 1px;border-radius:5px;font-size:1rem}.item{display:flex;gap:0.2rem;padding:0.5rem}.sidebar .item{flex-wrap:wrap}.item .img{width:450px;max-height:250px;aspect-ratio:1.7778;flex:1 0 auto}.item img{object-fit:cover;border-radius:15px;width:100%;height:100%;box-shadow:rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
      rgba(0, 0, 0, 0.3) 0px 3px 7px -3px}.nosidebar .item{margin-bottom:2rem}.nosidebar .content{margin-left:1rem;margin-top:5px;text-align:left}.sidebar .content{flex-grow:1}.tags{margin-top:2px}a{text-decoration:none;color:var(--text-color);margin:0;line-height:1.275rem;font-weight:400;font-size:0.875rem;position:relative;transition:background-color 0.3s cubic-bezier(0.25, 0.8, 0.5, 1), padding 0.3s;box-sizing:content-box;display:block}.dark{--bg-odd-color:#161616;--bg-even-color:#222;--bg-hover-color:#333;--text-color:white;--title-color:white;--line-color:rgba(120, 120, 120, 0.2)}.light{--bg-odd-color:#f5f5f5;--bg-even-color:#fafafa;--bg-hover-color:#eee;--text-color:#222;--title-color:black;--line-color:rgba(220, 220, 220, 0.9)}.sidebar .item{padding:1rem;border-bottom:1px solid var(--line-color)}.sidebar .item:hover,.sidebar .item:focus,.sidebar .item:active{background-color:var(--bg-hover-color)}.title{color:var(--title-color);font-weight:bold;font-size:1.3rem;line-height:1.1em}.nosidebar .title{font-size:1.9em;line-height:1.1em}.subtitle{font-size:0.9rem;line-height:1.1em;color:var(--title-color);opacity:0.9}.tags{display:flex;flex-wrap:wrap;gap:3px;justify-items:left}.tag{display:inline-block;border:1px solid orangered;background-color:#ff9999;padding:3px 5px;border-radius:3px;font-size:0.8rem}</style>`, pe(
      this,
      {
        target: this.shadowRoot,
        props: se(this.attributes),
        customElement: !0
      },
      ve,
      ke,
      ne,
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
    ), e && (e.target && g(e.target, this, e.anchor), e.props && (this.$set(e.props), y()));
  }
  static get observedAttributes() {
    return ["baseurl", "title", "maxlength", "blob", "dark", "sidebar", "external_style"];
  }
  get baseurl() {
    return this.$$.ctx[0];
  }
  set baseurl(e) {
    this.$$set({ baseurl: e }), y();
  }
  get title() {
    return this.$$.ctx[1];
  }
  set title(e) {
    this.$$set({ title: e }), y();
  }
  get maxlength() {
    return this.$$.ctx[6];
  }
  set maxlength(e) {
    this.$$set({ maxlength: e }), y();
  }
  get blob() {
    return this.$$.ctx[7];
  }
  set blob(e) {
    this.$$set({ blob: e }), y();
  }
  get dark() {
    return this.$$.ctx[2];
  }
  set dark(e) {
    this.$$set({ dark: e }), y();
  }
  get sidebar() {
    return this.$$.ctx[3];
  }
  set sidebar(e) {
    this.$$set({ sidebar: e }), y();
  }
  get external_style() {
    return this.$$.ctx[4];
  }
  set external_style(e) {
    this.$$set({ external_style: e }), y();
  }
}
customElements.define("blob-share", xe);
