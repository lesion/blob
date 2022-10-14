(function(w){typeof define=="function"&&define.amd?define(w):w()})(function(){"use strict";function w(){}function R(t){return t()}function F(){return Object.create(null)}function N(t){t.forEach(R)}function P(t){return typeof t=="function"}function re(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}let T;function A(t,e){return T||(T=document.createElement("a")),T.href=e,t===T.href}function oe(t){return Object.keys(t).length===0}function d(t,e){t.appendChild(e)}function _(t,e,i){t.insertBefore(e,i||null)}function p(t){t.parentNode.removeChild(t)}function V(t,e){for(let i=0;i<t.length;i+=1)t[i]&&t[i].d(e)}function g(t){return document.createElement(t)}function j(t){return document.createTextNode(t)}function C(){return j(" ")}function ae(){return j("")}function c(t,e,i){i==null?t.removeAttribute(e):t.getAttribute(e)!==i&&t.setAttribute(e,i)}function se(t){return Array.from(t.childNodes)}function B(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function E(t,e,i){t.classList[i?"add":"remove"](e)}function ce(t){const e={};for(const i of t)e[i.name]=i.value;return e}let $;function M(t){$=t}function fe(){if(!$)throw new Error("Function called outside component initialization");return $}function ue(t){fe().$$.on_mount.push(t)}const L=[],G=[],H=[],J=[],de=Promise.resolve();let U=!1;function he(){U||(U=!0,de.then(k))}function q(t){H.push(t)}const D=new Set;let I=0;function k(){const t=$;do{for(;I<L.length;){const e=L[I];I++,M(e),ge(e.$$)}for(M(null),L.length=0,I=0;G.length;)G.pop()();for(let e=0;e<H.length;e+=1){const i=H[e];D.has(i)||(D.add(i),i())}H.length=0}while(L.length);for(;J.length;)J.pop()();U=!1,D.clear(),M(t)}function ge(t){if(t.fragment!==null){t.update(),N(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(q)}}const me=new Set;function be(t,e){t&&t.i&&(me.delete(t),t.i(e))}function _e(t,e,i,n){const{fragment:l,on_mount:o,on_destroy:r,after_update:u}=t.$$;l&&l.m(e,i),n||q(()=>{const a=o.map(R).filter(P);r?r.push(...a):N(a),t.$$.on_mount=[]}),u.forEach(q)}function pe(t,e){const i=t.$$;i.fragment!==null&&(N(i.on_destroy),i.fragment&&i.fragment.d(e),i.on_destroy=i.fragment=null,i.ctx=[])}function ke(t,e){t.$$.dirty[0]===-1&&(L.push(t),he(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function xe(t,e,i,n,l,o,r,u=[-1]){const a=$;M(t);const f=t.$$={fragment:null,ctx:null,props:o,update:w,not_equal:l,bound:F(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(a?a.$$.context:[])),callbacks:F(),dirty:u,skip_bound:!1,root:e.target||a.$$.root};r&&r(f.root);let x=!1;if(f.ctx=i?i(t,e.props||{},(m,S,...v)=>{const y=v.length?v[0]:S;return f.ctx&&l(f.ctx[m],f.ctx[m]=y)&&(!f.skip_bound&&f.bound[m]&&f.bound[m](y),x&&ke(t,m)),S}):[],f.update(),x=!0,N(f.before_update),f.fragment=n?n(f.ctx):!1,e.target){if(e.hydrate){const m=se(e.target);f.fragment&&f.fragment.l(m),m.forEach(p)}else f.fragment&&f.fragment.c();e.intro&&be(t.$$.fragment),_e(t,e.target,e.anchor,e.customElement),k()}M(a)}let K;typeof HTMLElement=="function"&&(K=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){const{on_mount:t}=this.$$;this.$$.on_disconnect=t.map(R).filter(P);for(const e in this.$$.slotted)this.appendChild(this.$$.slotted[e])}attributeChangedCallback(t,e,i){this[t]=i}disconnectedCallback(){N(this.$$.on_disconnect)}$destroy(){pe(this,1),this.$destroy=w}$on(t,e){const i=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return i.push(e),()=>{const n=i.indexOf(e);n!==-1&&i.splice(n,1)}}$set(t){this.$$set&&!oe(t)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}});function O(t,e="long"){const i=e==="long"?{weekday:"long",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit"}:{hour:"2-digit",minute:"2-digit"};return new Date(t*1e3).toLocaleString(void 0,i)}function Q(t){return t.multidate?O(t.start_datetime)+" - "+O(t.end_datetime):O(t.start_datetime)+(t.end_datetime?"-"+O(t.end_datetime,"short"):"")}function W(t,e,i){const n=t.slice();return n[12]=e[i],n}function X(t,e,i){const n=t.slice();return n[15]=e[i],n}function Y(t){let e;return{c(){e=g("link"),c(e,"rel","stylesheet"),c(e,"href",t[4])},m(i,n){_(i,e,n)},p(i,n){n&16&&c(e,"href",i[4])},d(i){i&&p(e)}}}function Z(t){let e,i,n=t[1]&&t[3]==="true"&&ee(t),l=t[5],o=[];for(let r=0;r<l.length;r+=1)o[r]=le(W(t,l,r));return{c(){e=g("div"),n&&n.c(),i=C();for(let r=0;r<o.length;r+=1)o[r].c();c(e,"id","blobShare"),E(e,"dark",t[2]==="dark"),E(e,"light",t[2]==="light"),E(e,"sidebar",t[3]==="true"),E(e,"nosidebar",t[3]!=="true")},m(r,u){_(r,e,u),n&&n.m(e,null),d(e,i);for(let a=0;a<o.length;a+=1)o[a].m(e,null)},p(r,u){if(r[1]&&r[3]==="true"?n?n.p(r,u):(n=ee(r),n.c(),n.m(e,i)):n&&(n.d(1),n=null),u&41){l=r[5];let a;for(a=0;a<l.length;a+=1){const f=W(r,l,a);o[a]?o[a].p(f,u):(o[a]=le(f),o[a].c(),o[a].m(e,null))}for(;a<o.length;a+=1)o[a].d(1);o.length=l.length}u&4&&E(e,"dark",r[2]==="dark"),u&4&&E(e,"light",r[2]==="light"),u&8&&E(e,"sidebar",r[3]==="true"),u&8&&E(e,"nosidebar",r[3]!=="true")},d(r){r&&p(e),n&&n.d(),V(o,r)}}}function ee(t){let e,i,n,l,o,r,u;return{c(){e=g("a"),i=g("div"),n=g("div"),l=j(t[1]),o=C(),r=g("img"),c(n,"class","title"),c(r,"id","logo"),c(r,"alt","logo"),A(r.src,u=t[0]+"/logo.png")||c(r,"src",u),c(i,"class","content"),c(e,"href",t[0]),c(e,"target","_blank"),c(e,"id","header")},m(a,f){_(a,e,f),d(e,i),d(i,n),d(n,l),d(i,o),d(i,r)},p(a,f){f&2&&B(l,a[1]),f&1&&!A(r.src,u=a[0]+"/logo.png")&&c(r,"src",u),f&1&&c(e,"href",a[0])},d(a){a&&p(e)}}}function te(t){let e;function i(o,r){return o[12].image?ye:ve}let n=i(t),l=n(t);return{c(){e=g("div"),l.c(),c(e,"class","img")},m(o,r){_(o,e,r),l.m(e,null)},p(o,r){n===(n=i(o))&&l?l.p(o,r):(l.d(1),l=n(o),l&&(l.c(),l.m(e,null)))},d(o){o&&p(e),l.d()}}}function ve(t){let e,i,n;return{c(){e=g("img"),c(e,"style","aspect-ratio=1.7778;"),c(e,"alt",i=t[12].title),A(e.src,n=t[0]+"/noimg.svg")||c(e,"src",n),c(e,"loading","lazy")},m(l,o){_(l,e,o)},p(l,o){o&32&&i!==(i=l[12].title)&&c(e,"alt",i),o&1&&!A(e.src,n=l[0]+"/noimg.svg")&&c(e,"src",n)},d(l){l&&p(e)}}}function ye(t){let e,i;return{c(){e=g("img"),A(e.src,i=t[12].image)||c(e,"src",i),c(e,"loading","lazy")},m(n,l){_(n,e,l)},p(n,l){l&32&&!A(e.src,i=n[12].image)&&c(e,"src",i)},d(n){n&&p(e)}}}function ie(t){let e,i=t[12].tags,n=[];for(let l=0;l<i.length;l+=1)n[l]=ne(X(t,i,l));return{c(){e=g("div");for(let l=0;l<n.length;l+=1)n[l].c();c(e,"class","tags")},m(l,o){_(l,e,o);for(let r=0;r<n.length;r+=1)n[r].m(e,null)},p(l,o){if(o&32){i=l[12].tags;let r;for(r=0;r<i.length;r+=1){const u=X(l,i,r);n[r]?n[r].p(u,o):(n[r]=ne(u),n[r].c(),n[r].m(e,null))}for(;r<n.length;r+=1)n[r].d(1);n.length=i.length}},d(l){l&&p(e),V(n,l)}}}function ne(t){let e,i,n=t[15].name+"",l;return{c(){e=g("span"),i=j("#"),l=j(n),c(e,"class","tag")},m(o,r){_(o,e,r),d(e,i),d(e,l)},p(o,r){r&32&&n!==(n=o[15].name+"")&&B(l,n)},d(o){o&&p(e)}}}function le(t){let e,i,n,l,o=Q(t[12])+"",r,u,a,f=t[12].title+"",x,m,S,v,y,s=t[3]!=="true"&&te(t),b=t[12].tags.length&&ie(t);return{c(){e=g("a"),s&&s.c(),i=C(),n=g("div"),l=g("div"),r=j(o),u=C(),a=g("div"),x=j(f),m=C(),b&&b.c(),S=C(),c(l,"class","subtitle"),c(a,"class","title"),c(n,"class","content"),c(e,"href",v=t[0]+"/item/"+(t[12].slug||t[12].id)),c(e,"class","item"),c(e,"title",y=t[12].title),c(e,"target","_blank")},m(h,z){_(h,e,z),s&&s.m(e,null),d(e,i),d(e,n),d(n,l),d(l,r),d(n,u),d(n,a),d(a,x),d(n,m),b&&b.m(n,null),d(e,S)},p(h,z){h[3]!=="true"?s?s.p(h,z):(s=te(h),s.c(),s.m(e,i)):s&&(s.d(1),s=null),z&32&&o!==(o=Q(h[12])+"")&&B(r,o),z&32&&f!==(f=h[12].title+"")&&B(x,f),h[12].tags.length?b?b.p(h,z):(b=ie(h),b.c(),b.m(n,null)):b&&(b.d(1),b=null),z&33&&v!==(v=h[0]+"/item/"+(h[12].slug||h[12].id))&&c(e,"href",v),z&32&&y!==(y=h[12].title)&&c(e,"title",y)},d(h){h&&p(e),s&&s.d(),b&&b.d()}}}function we(t){let e,i,n=t[4]&&Y(t),l=t[5].length&&Z(t);return{c(){n&&n.c(),e=C(),l&&l.c(),i=ae(),this.c=w},m(o,r){n&&n.m(o,r),_(o,e,r),l&&l.m(o,r),_(o,i,r)},p(o,[r]){o[4]?n?n.p(o,r):(n=Y(o),n.c(),n.m(e.parentNode,e)):n&&(n.d(1),n=null),o[5].length?l?l.p(o,r):(l=Z(o),l.c(),l.m(i.parentNode,i)):l&&(l.d(1),l=null)},i:w,o:w,d(o){n&&n.d(o),o&&p(e),l&&l.d(o),o&&p(i)}}}function Ee(t,e,i){let{baseurl:n=""}=e,{title:l=""}=e,{maxlength:o=!1}=e,{tags:r=""}=e,{places:u=""}=e,{blob:a=""}=e,{theme:f="light"}=e,{sidebar:x="true"}=e,{external_style:m=""}=e,S=!1,v=[];function y(){console.error("sono dentro update!"),S&&fetch(`${n}/api/cohort/93`).then(s=>s.json()).then(s=>{i(5,v=s)}).catch(s=>{console.error("Error loading Blob API -> ",s)})}return ue(()=>{console.error("ma veramente ?"),S=!0,y()}),t.$$set=s=>{"baseurl"in s&&i(0,n=s.baseurl),"title"in s&&i(1,l=s.title),"maxlength"in s&&i(6,o=s.maxlength),"tags"in s&&i(7,r=s.tags),"places"in s&&i(8,u=s.places),"blob"in s&&i(9,a=s.blob),"theme"in s&&i(2,f=s.theme),"sidebar"in s&&i(3,x=s.sidebar),"external_style"in s&&i(4,m=s.external_style)},t.$$.update=()=>{t.$$.dirty&462&&y(o&&l&&u&&r&&f&&show_recurrent&&x)},[n,l,f,x,m,v,o,r,u,a]}class Se extends K{constructor(e){super(),this.shadowRoot.innerHTML=`<style>#blobShare{font-family:ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
      "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif,
      "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
      "Noto Color Emoji";overflow-x:hidden;width:100%;box-sizing:content-box;margin:0 auto;font-size:1rem;text-align:left}.nosidebar{max-width:1200px}#header{padding:1.2rem 1rem;background-color:var(--bg-odd-color)}.sidebar{max-width:500px;box-shadow:rgba(60, 64, 67, 0.4) 0px 1px 2px 0px,
      rgba(60, 64, 67, 0.25) 0px 1px 3px 1px;border-radius:5px;font-size:1rem}.item .img{width:100%;max-width:450px;max-height:250px;aspect-ratio:1.7778;flex:1 0 auto}@media screen and (max-width: 800px){.item{flex-wrap:wrap}.item .img{max-width:100%}}.item img{object-fit:cover;border-radius:15px;width:100%;height:100%;box-shadow:rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
      rgba(0, 0, 0, 0.3) 0px 3px 7px -3px}.nosidebar .item{margin-bottom:2rem}.nosidebar .content{margin-left:1rem;margin-top:5px;text-align:left}.tags{margin-top:2px}#logo{position:absolute;top:10px;right:10px;height:40px}a{text-decoration:none;color:var(--text-color);display:flex;padding:8px 20px;margin:0;line-height:1.275rem;font-weight:400;font-size:0.875rem;position:relative;transition:background-color 0.3s cubic-bezier(0.25, 0.8, 0.5, 1),
      padding 0.3s;box-sizing:content-box}a:hover .title,a:focus .title,a:active .title{text-decoration:underline}.dark{--bg-odd-color:#161616;--bg-even-color:#222;--bg-hover-color:#333;--text-color:white;--title-color:white;--line-color:rgba(120, 120, 120, 0.2)}.light{--bg-odd-color:#f5f5f5;--bg-even-color:#fafafa;--bg-hover-color:#eee;--text-color:#222;--title-color:black;--line-color:rgba(220, 220, 220, 0.9)}.sidebar a{background-color:var(--bg-even-color);border-bottom:1px solid var(--line-color)}.sidebar a:hover,.sidebar a:focus,.sidebar a:active{background-color:var(--bg-hover-color);padding-left:15px;padding-right:25px}.title{color:var(--title-color);font-weight:bold;font-size:1.3rem;line-height:1.1em}.nosidebar .title{font-size:1.9em;line-height:1.1em}.subtitle{font-size:1rem;line-height:1.1em;color:var(--title-color);opacity:0.9}.tag{margin-right:10px;display:inline-block}</style>`,xe(this,{target:this.shadowRoot,props:ce(this.attributes),customElement:!0},Ee,we,re,{baseurl:0,title:1,maxlength:6,tags:7,places:8,blob:9,theme:2,sidebar:3,external_style:4},null),e&&(e.target&&_(e.target,this,e.anchor),e.props&&(this.$set(e.props),k()))}static get observedAttributes(){return["baseurl","title","maxlength","tags","places","blob","theme","sidebar","external_style"]}get baseurl(){return this.$$.ctx[0]}set baseurl(e){this.$$set({baseurl:e}),k()}get title(){return this.$$.ctx[1]}set title(e){this.$$set({title:e}),k()}get maxlength(){return this.$$.ctx[6]}set maxlength(e){this.$$set({maxlength:e}),k()}get tags(){return this.$$.ctx[7]}set tags(e){this.$$set({tags:e}),k()}get places(){return this.$$.ctx[8]}set places(e){this.$$set({places:e}),k()}get blob(){return this.$$.ctx[9]}set blob(e){this.$$set({blob:e}),k()}get theme(){return this.$$.ctx[2]}set theme(e){this.$$set({theme:e}),k()}get sidebar(){return this.$$.ctx[3]}set sidebar(e){this.$$set({sidebar:e}),k()}get external_style(){return this.$$.ctx[4]}set external_style(e){this.$$set({external_style:e}),k()}}customElements.define("blob-share",Se)});
