import{c as l,a as M,r as o,j as d,P as g,s as C,G as m,i as f,k as N}from"./index-BL-_5yDk.js";/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const z=l("BookOpen",[["path",{d:"M12 7v14",key:"1akyts"}],["path",{d:"M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",key:"ruj8y"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const F=l("CircleCheckBig",[["path",{d:"M21.801 10A10 10 0 1 1 17 3.335",key:"yps3ct"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const V=l("MapPin",[["path",{d:"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",key:"1r0f0z"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const T=l("MessageSquare",[["path",{d:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",key:"1lielz"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $=l("Search",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const G=l("Star",[["path",{d:"M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",key:"r04s7s"}]]);var p="Avatar",[j,O]=M(p),[I,y]=j(p),h=o.forwardRef((a,e)=>{const{__scopeAvatar:t,...r}=a,[n,s]=o.useState("idle");return d.jsx(I,{scope:t,imageLoadingStatus:n,onImageLoadingStatusChange:s,children:d.jsx(g.span,{...r,ref:e})})});h.displayName=p;var x="AvatarImage",A=o.forwardRef((a,e)=>{const{__scopeAvatar:t,src:r,onLoadingStatusChange:n=()=>{},...s}=a,c=y(x,t),i=R(r,s.referrerPolicy),u=C(v=>{n(v),c.onImageLoadingStatusChange(v)});return m(()=>{i!=="idle"&&u(i)},[i,u]),i==="loaded"?d.jsx(g.img,{...s,ref:e,src:r}):null});A.displayName=x;var S="AvatarFallback",k=o.forwardRef((a,e)=>{const{__scopeAvatar:t,delayMs:r,...n}=a,s=y(S,t),[c,i]=o.useState(r===void 0);return o.useEffect(()=>{if(r!==void 0){const u=window.setTimeout(()=>i(!0),r);return()=>window.clearTimeout(u)}},[r]),c&&s.imageLoadingStatus!=="loaded"?d.jsx(g.span,{...n,ref:e}):null});k.displayName=S;function R(a,e){const[t,r]=o.useState("idle");return m(()=>{if(!a){r("error");return}let n=!0;const s=new window.Image,c=i=>()=>{n&&r(i)};return r("loading"),s.onload=c("loaded"),s.onerror=c("error"),s.src=a,e&&(s.referrerPolicy=e),()=>{n=!1}},[a,e]),t}var b=h,w=A,L=k;const _=o.forwardRef(({className:a,...e},t)=>d.jsx(b,{ref:t,className:f("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",a),...e}));_.displayName=b.displayName;const E=o.forwardRef(({className:a,...e},t)=>d.jsx(w,{ref:t,className:f("aspect-square h-full w-full",a),...e}));E.displayName=w.displayName;const P=o.forwardRef(({className:a,...e},t)=>d.jsx(L,{ref:t,className:f("flex h-full w-full items-center justify-center rounded-full bg-muted",a),...e}));P.displayName=L.displayName;const B=N("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",{variants:{variant:{default:"border-transparent bg-primary text-primary-foreground hover:bg-primary/80",secondary:"border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",destructive:"border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",outline:"text-foreground"}},defaultVariants:{variant:"default"}});function H({className:a,variant:e,...t}){return d.jsx("div",{className:f(B({variant:e}),a),...t})}export{_ as A,z as B,F as C,T as M,$ as S,G as a,H as b,E as c,P as d,V as e};
