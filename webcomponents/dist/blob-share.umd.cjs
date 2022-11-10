(function(p){typeof define=="function"&&define.amd?define(p):p()})(function(){"use strict";function p(){}function L(t){return t()}function O(){return Object.create(null)}function z(t){t.forEach(L)}function R(t){return typeof t=="function"}function te(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}let $;function U(t,e){return $||($=document.createElement("a")),$.href=e,t===$.href}function ne(t){return Object.keys(t).length===0}function b(t,e){t.appendChild(e)}function k(t,e,n){t.insertBefore(e,n||null)}function x(t){t.parentNode.removeChild(t)}function q(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function v(t){return document.createElement(t)}function E(t){return document.createTextNode(t)}function S(){return E(" ")}function ie(){return E("")}function u(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function le(t){return Array.from(t.childNodes)}function T(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function w(t,e,n){t.classList[n?"add":"remove"](e)}function re(t){const e={};for(const n of t)e[n.name]=n.value;return e}let j;function C(t){j=t}function oe(){if(!j)throw new Error("Function called outside component initialization");return j}function ae(t){oe().$$.on_mount.push(t)}const N=[],F=[],A=[],P=[],se=Promise.resolve();let B=!1;function fe(){B||(B=!0,se.then(_))}function H(t){A.push(t)}const I=new Set;let M=0;function _(){const t=j;do{for(;M<N.length;){const e=N[M];M++,C(e),ce(e.$$)}for(C(null),N.length=0,M=0;F.length;)F.pop()();for(let e=0;e<A.length;e+=1){const n=A[e];I.has(n)||(I.add(n),n())}A.length=0}while(N.length);for(;P.length;)P.pop()();B=!1,I.clear(),C(t)}function ce(t){if(t.fragment!==null){t.update(),z(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(H)}}const ue=new Set;function de(t,e){t&&t.i&&(ue.delete(t),t.i(e))}function he(t,e,n,i){const{fragment:r,on_mount:o,on_destroy:l,after_update:c}=t.$$;r&&r.m(e,n),i||H(()=>{const a=o.map(L).filter(R);l?l.push(...a):z(a),t.$$.on_mount=[]}),c.forEach(H)}function ge(t,e){const n=t.$$;n.fragment!==null&&(z(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function me(t,e){t.$$.dirty[0]===-1&&(N.push(t),fe(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function be(t,e,n,i,r,o,l,c=[-1]){const a=j;C(t);const s=t.$$={fragment:null,ctx:null,props:o,update:p,not_equal:r,bound:O(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(a?a.$$.context:[])),callbacks:O(),dirty:c,skip_bound:!1,root:e.target||a.$$.root};l&&l(s.root);let y=!1;if(s.ctx=n?n(t,e.props||{},(m,h,...g)=>{const d=g.length?g[0]:h;return s.ctx&&r(s.ctx[m],s.ctx[m]=d)&&(!s.skip_bound&&s.bound[m]&&s.bound[m](d),y&&me(t,m)),h}):[],s.update(),y=!0,z(s.before_update),s.fragment=i?i(s.ctx):!1,e.target){if(e.hydrate){const m=le(e.target);s.fragment&&s.fragment.l(m),m.forEach(x)}else s.fragment&&s.fragment.c();e.intro&&de(t.$$.fragment),he(t,e.target,e.anchor,e.customElement),_()}C(a)}let D;typeof HTMLElement=="function"&&(D=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){const{on_mount:t}=this.$$;this.$$.on_disconnect=t.map(L).filter(R);for(const e in this.$$.slotted)this.appendChild(this.$$.slotted[e])}attributeChangedCallback(t,e,n){this[t]=n}disconnectedCallback(){z(this.$$.on_disconnect)}$destroy(){ge(this,1),this.$destroy=p}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const i=n.indexOf(e);i!==-1&&n.splice(i,1)}}$set(t){this.$$set&&!ne(t)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}});function V(t){const e={weekday:"long",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit"};return new Date(t.date).toLocaleString(void 0,e)}function G(t,e,n){const i=t.slice();return i[12]=e[n],i}function J(t,e,n){const i=t.slice();return i[15]=e[n],i}function K(t){let e;return{c(){e=v("link"),u(e,"rel","stylesheet"),u(e,"href",t[4])},m(n,i){k(n,e,i)},p(n,i){i&16&&u(e,"href",n[4])},d(n){n&&x(e)}}}function Q(t){let e,n,i=t[1]&&t[3]==="true"&&W(),r=t[5],o=[];for(let l=0;l<r.length;l+=1)o[l]=ee(G(t,r,l));return{c(){e=v("div"),i&&i.c(),n=S();for(let l=0;l<o.length;l+=1)o[l].c();u(e,"id","blobShare"),w(e,"dark",t[2]==="true"),w(e,"light",t[2]!=="true"),w(e,"sidebar",t[3]==="true"),w(e,"nosidebar",t[3]!=="true")},m(l,c){k(l,e,c),i&&i.m(e,null),b(e,n);for(let a=0;a<o.length;a+=1)o[a].m(e,null)},p(l,c){if(l[1]&&l[3]==="true"?i||(i=W(),i.c(),i.m(e,n)):i&&(i.d(1),i=null),c&41){r=l[5];let a;for(a=0;a<r.length;a+=1){const s=G(l,r,a);o[a]?o[a].p(s,c):(o[a]=ee(s),o[a].c(),o[a].m(e,null))}for(;a<o.length;a+=1)o[a].d(1);o.length=r.length}c&4&&w(e,"dark",l[2]==="true"),c&4&&w(e,"light",l[2]!=="true"),c&8&&w(e,"sidebar",l[3]==="true"),c&8&&w(e,"nosidebar",l[3]!=="true")},d(l){l&&x(e),i&&i.d(),q(o,l)}}}function W(t){return{c:p,m:p,d:p}}function X(t){let e,n,i,r,o,l,c;return{c(){e=v("a"),n=v("div"),i=v("img"),u(i,"style","aspect-ratio=1.7778;"),u(i,"alt",r=t[12].title),U(i.src,o=t[12].image?t[12].image:t[0]+"/noimg.svg")||u(i,"src",o),u(i,"loading","lazy"),u(n,"class","img"),u(e,"href",l=t[0]+"/item/"+(t[12].slug||t[12].id)),u(e,"class","item"),u(e,"title",c=t[12].title),u(e,"target","_blank")},m(a,s){k(a,e,s),b(e,n),b(n,i)},p(a,s){s&32&&r!==(r=a[12].title)&&u(i,"alt",r),s&33&&!U(i.src,o=a[12].image?a[12].image:a[0]+"/noimg.svg")&&u(i,"src",o),s&33&&l!==(l=a[0]+"/item/"+(a[12].slug||a[12].id))&&u(e,"href",l),s&32&&c!==(c=a[12].title)&&u(e,"title",c)},d(a){a&&x(e)}}}function Y(t){let e,n=t[12].tags,i=[];for(let r=0;r<n.length;r+=1)i[r]=Z(J(t,n,r));return{c(){e=v("div");for(let r=0;r<i.length;r+=1)i[r].c();u(e,"class","tags")},m(r,o){k(r,e,o);for(let l=0;l<i.length;l+=1)i[l].m(e,null)},p(r,o){if(o&32){n=r[12].tags;let l;for(l=0;l<n.length;l+=1){const c=J(r,n,l);i[l]?i[l].p(c,o):(i[l]=Z(c),i[l].c(),i[l].m(e,null))}for(;l<i.length;l+=1)i[l].d(1);i.length=n.length}},d(r){r&&x(e),q(i,r)}}}function Z(t){let e,n,i=t[15].name+"",r;return{c(){e=v("span"),n=E("#"),r=E(i),u(e,"class","tag")},m(o,l){k(o,e,l),b(e,n),b(e,r)},p(o,l){l&32&&i!==(i=o[15].name+"")&&T(r,i)},d(o){o&&x(e)}}}function ee(t){let e,n,i,r=V(t[12])+"",o,l,c,a=t[12].title+"",s,y,m,h=t[3]!=="true"&&X(t),g=t[12].tags.length&&Y(t);return{c(){h&&h.c(),e=S(),n=v("div"),i=v("div"),o=E(r),l=S(),c=v("div"),s=E(a),y=S(),g&&g.c(),m=S(),u(i,"class","subtitle"),u(c,"class","title"),u(n,"class","content")},m(d,f){h&&h.m(d,f),k(d,e,f),k(d,n,f),b(n,i),b(i,o),b(n,l),b(n,c),b(c,s),b(n,y),g&&g.m(n,null),b(n,m)},p(d,f){d[3]!=="true"?h?h.p(d,f):(h=X(d),h.c(),h.m(e.parentNode,e)):h&&(h.d(1),h=null),f&32&&r!==(r=V(d[12])+"")&&T(o,r),f&32&&a!==(a=d[12].title+"")&&T(s,a),d[12].tags.length?g?g.p(d,f):(g=Y(d),g.c(),g.m(n,m)):g&&(g.d(1),g=null)},d(d){h&&h.d(d),d&&x(e),d&&x(n),g&&g.d()}}}function _e(t){let e,n,i=t[4]&&K(t),r=t[5].length&&Q(t);return{c(){i&&i.c(),e=S(),r&&r.c(),n=ie(),this.c=p},m(o,l){i&&i.m(o,l),k(o,e,l),r&&r.m(o,l),k(o,n,l)},p(o,[l]){o[4]?i?i.p(o,l):(i=K(o),i.c(),i.m(e.parentNode,e)):i&&(i.d(1),i=null),o[5].length?r?r.p(o,l):(r=Q(o),r.c(),r.m(n.parentNode,n)):r&&(r.d(1),r=null)},i:p,o:p,d(o){i&&i.d(o),o&&x(e),r&&r.d(o),o&&x(n)}}}function pe(t,e,n){let{baseurl:i=""}=e,{title:r=""}=e,{maxlength:o=!1}=e,{tags:l=""}=e,{places:c=""}=e,{blob:a=12}=e,{dark:s="false"}=e,{sidebar:y="true"}=e,{external_style:m=""}=e,h=!1,g=[];function d(){!h||fetch(`${i}/api/post/${a}`).then(f=>f.json()).then(f=>{n(5,g=f)}).catch(f=>{console.error("Error loading Blob API -> ",f)})}return ae(()=>{h=!0,d()}),t.$$set=f=>{"baseurl"in f&&n(0,i=f.baseurl),"title"in f&&n(1,r=f.title),"maxlength"in f&&n(6,o=f.maxlength),"tags"in f&&n(7,l=f.tags),"places"in f&&n(8,c=f.places),"blob"in f&&n(9,a=f.blob),"dark"in f&&n(2,s=f.dark),"sidebar"in f&&n(3,y=f.sidebar),"external_style"in f&&n(4,m=f.external_style)},t.$$.update=()=>{t.$$.dirty&974&&d(o&&r&&c&&l&&s&&show_recurrent&&y&&a)},[i,r,s,y,m,g,o,l,c,a]}class ke extends D{constructor(e){super(),this.shadowRoot.innerHTML=`<style>#blobShare{font-family:ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
      "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif,
      "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
      "Noto Color Emoji";overflow-x:hidden;width:100%;box-sizing:content-box;margin:0 auto;font-size:1rem;text-align:left}.nosidebar{max-width:1200px}.sidebar{max-width:500px;box-shadow:rgba(60, 64, 67, 0.4) 0px 1px 2px 0px,
      rgba(60, 64, 67, 0.25) 0px 1px 3px 1px;border-radius:5px;font-size:1rem}.item .img{width:100%;max-width:450px;max-height:250px;aspect-ratio:1.7778;flex:1 0 auto}@media screen and (max-width: 800px){.item{flex-wrap:wrap}.item .img{max-width:100%}}.item img{object-fit:cover;border-radius:15px;width:100%;height:100%;box-shadow:rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
      rgba(0, 0, 0, 0.3) 0px 3px 7px -3px}.nosidebar .item{margin-bottom:2rem}.nosidebar .content{margin-left:1rem;margin-top:5px;text-align:left}.tags{margin-top:2px}a{text-decoration:none;color:var(--text-color);display:flex;padding:8px 20px;margin:0;line-height:1.275rem;font-weight:400;font-size:0.875rem;position:relative;transition:background-color 0.3s cubic-bezier(0.25, 0.8, 0.5, 1),
      padding 0.3s;box-sizing:content-box}.dark{--bg-odd-color:#161616;--bg-even-color:#222;--bg-hover-color:#333;--text-color:white;--title-color:white;--line-color:rgba(120, 120, 120, 0.2)}.light{--bg-odd-color:#f5f5f5;--bg-even-color:#fafafa;--bg-hover-color:#eee;--text-color:#222;--title-color:black;--line-color:rgba(220, 220, 220, 0.9)}.sidebar a{background-color:var(--bg-even-color);border-bottom:1px solid var(--line-color)}.sidebar a:hover,.sidebar a:focus,.sidebar a:active{background-color:var(--bg-hover-color);padding-left:15px;padding-right:25px}.title{color:var(--title-color);font-weight:bold;font-size:1.3rem;line-height:1.1em}.nosidebar .title{font-size:1.9em;line-height:1.1em}.subtitle{font-size:1rem;line-height:1.1em;color:var(--title-color);opacity:0.9}.tag{margin-right:10px;display:inline-block}</style>`,be(this,{target:this.shadowRoot,props:re(this.attributes),customElement:!0},pe,_e,te,{baseurl:0,title:1,maxlength:6,tags:7,places:8,blob:9,dark:2,sidebar:3,external_style:4},null),e&&(e.target&&k(e.target,this,e.anchor),e.props&&(this.$set(e.props),_()))}static get observedAttributes(){return["baseurl","title","maxlength","tags","places","blob","dark","sidebar","external_style"]}get baseurl(){return this.$$.ctx[0]}set baseurl(e){this.$$set({baseurl:e}),_()}get title(){return this.$$.ctx[1]}set title(e){this.$$set({title:e}),_()}get maxlength(){return this.$$.ctx[6]}set maxlength(e){this.$$set({maxlength:e}),_()}get tags(){return this.$$.ctx[7]}set tags(e){this.$$set({tags:e}),_()}get places(){return this.$$.ctx[8]}set places(e){this.$$set({places:e}),_()}get blob(){return this.$$.ctx[9]}set blob(e){this.$$set({blob:e}),_()}get dark(){return this.$$.ctx[2]}set dark(e){this.$$set({dark:e}),_()}get sidebar(){return this.$$.ctx[3]}set sidebar(e){this.$$set({sidebar:e}),_()}get external_style(){return this.$$.ctx[4]}set external_style(e){this.$$set({external_style:e}),_()}}customElements.define("blob-share",ke)});
