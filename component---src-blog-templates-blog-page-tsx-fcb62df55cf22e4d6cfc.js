"use strict";(self.webpackChunkjiripudil_cz=self.webpackChunkjiripudil_cz||[]).push([[527],{7392:function(e,t,n){n.d(t,{Z:function(){return P}});var a=n(1436),r=n(7814),o=n(1597),l=n(7294);function u(e,t,n){return e+" "+(1!==e?t+"s":t)+" "+n}function i(e){const t=new Date(e);if(!Number.isNaN(t.valueOf()))return t;const n=String(e).match(/\d+/g);if(null==n||n.length<=2)return t;{const[e,t,...a]=n.map((e=>parseInt(e))),r=[e,t-1,...a];return new Date(Date.UTC(...r))}}function c(){return c=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},c.apply(this,arguments)}const m=3600,s=86400,g=7*s,d=30*s,f=365*s;function h({date:e,formatter:t=u,component:n="time",live:a=!0,minPeriod:r=0,maxPeriod:o=g,title:h,now:P=(()=>Date.now()),...p}){const E=function(){const[e,t]=(0,l.useState)(0);return(0,l.useCallback)((()=>{t((e=>e+1))}),[])}();(0,l.useEffect)((()=>{if(!a)return;let t;const n=a=>{const l=i(e).valueOf();if(!l)return void console.warn("[react-timeago] Invalid Date provided");const u=P(),c=Math.round(Math.abs(u-l)/1e3),g=c<60?1e3:c<m?6e4:c<s?36e5:6048e5,d=Math.min(Math.max(g,1e3*r),1e3*o);d&&(t&&clearTimeout(t),t=setTimeout(n,d)),a||E()};return n(!0),()=>{clearTimeout(t)}}),[e,E,a,o,r,P]);const b=n,v=i(e).valueOf();if(!v)return null;const k=P(),x=Math.round(Math.abs(k-v)/1e3),B=v<k?"ago":"from now",[T,M]=x<60?[Math.round(x),"second"]:x<m?[Math.round(x/60),"minute"]:x<s?[Math.round(x/m),"hour"]:x<g?[Math.round(x/s),"day"]:x<d?[Math.round(x/g),"week"]:x<f?[Math.round(x/d),"month"]:[Math.round(x/f),"year"],N=void 0===h?"string"==typeof e?e:i(e).toISOString().substr(0,16).replace("T"," "):h,y="time"===b?{...p,dateTime:i(e).toISOString()}:p,O=u.bind(null,T,M,B);return l.createElement(b,c({},y,{title:N}),t(T,M,B,v,O,P))}var P=e=>{var t;const n=null!==(t=e.heading)&&void 0!==t?t:"h2";return l.createElement("div",{className:"BlogPostBox-module--box--QdUYb"},l.createElement(o.Link,{to:`/blog/${e.slug}`},l.createElement(n,{className:"BlogPostBox-module--title--3IBDW"},e.title)),l.createElement("p",{className:"BlogPostBox-module--perex--4C2jN",dangerouslySetInnerHTML:{__html:e.perex}}),l.createElement("ul",{className:"BlogPostBox-module--tags--GShX2"},e.tags.map((e=>l.createElement("li",{key:e},l.createElement(o.Link,{to:`/blog/tag/${e}`},"#",e))))),l.createElement("div",{className:"BlogPostBox-module--publishedAt--FuKi3"},l.createElement(r.G,{icon:a.IV4})," ",l.createElement("time",{dateTime:e.datetime},l.createElement(h,{date:e.datetime}))),e.linkToPost&&l.createElement(o.Link,{className:"BlogPostBox-module--more--f8uro",to:`/blog/${e.slug}`},"Read more"))}},7677:function(e,t,n){n.d(t,{Z:function(){return u}});var a=n(1597),r=n(7294),o=n(4593),l=n(5199);var u=e=>{const t=1===e.currentPage,n=e.currentPage===e.numberOfPages;return 1===e.numberOfPages?null:r.createElement(r.Fragment,null,r.createElement(o.q,null,!t&&r.createElement("link",{rel:"prev",href:e.linkToPage(e.currentPage-1)}),!n&&r.createElement("link",{rel:"next",href:e.linkToPage(e.currentPage+1)})),r.createElement("ul",{className:"Pagination-module--paginator--OpNta"},Array.from({length:e.numberOfPages}).map(((t,n)=>{const o=n+1,u=o===e.currentPage;return r.createElement("li",{key:o,className:(0,l.A)("Pagination-module--page--xW2F1",u&&"Pagination-module--currentPage--xBrM+")},r.createElement(a.Link,{to:e.linkToPage(o)},o))}))))}},2484:function(e,t,n){n.r(t);var a=n(7294),r=n(3031),o=n(4472),l=n(7392),u=n(7677),i=n(6476);t.default=e=>a.createElement(r.Z,null,a.createElement(o.Z,{title:"Blog"}),a.createElement("div",{className:i.n},a.createElement("h1",{className:i.Y},"Blog"),e.data.posts.edges.map((e=>{let{node:t}=e;return a.createElement(l.Z,{key:t.frontmatter.slug,legacyId:t.frontmatter.legacyId,title:t.frontmatter.title,slug:t.frontmatter.slug,datetime:t.frontmatter.datetime,perex:t.frontmatter.perex,timeToRead:t.timeToRead,tags:t.frontmatter.tags,linkToPost:!0})})),a.createElement(u.Z,{numberOfPages:e.pageContext.numberOfPages,currentPage:e.pageContext.currentPage,linkToPage:e=>1===e?"/blog":`/blog/${e}`})))},6476:function(e,t,n){n.d(t,{Y:function(){return r},n:function(){return a}});var a="BlogPage-module--container--yi5jY",r="BlogPage-module--heading--ntle3"}}]);
//# sourceMappingURL=component---src-blog-templates-blog-page-tsx-fcb62df55cf22e4d6cfc.js.map