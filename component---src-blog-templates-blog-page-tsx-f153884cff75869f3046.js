"use strict";(self.webpackChunkjiripudil_cz=self.webpackChunkjiripudil_cz||[]).push([[527],{5127:function(e,t,n){n.d(t,{Z:function(){return u}});var a=n(9417),r=n(7814),l=n(1082),o=n(7294),c=n(9951);var u=e=>{let{isOpen:t,activeTag:n}=e;const u=(0,l.useStaticQuery)("3979010140").posts.edges.flatMap((e=>{let{node:t}=e;return t.frontmatter.tags}));u.sort(((e,t)=>e.localeCompare(t)));const m=new Map;for(const a of u){var i;const e=null!==(i=m.get(a))&&void 0!==i?i:0;m.set(a,e+1)}return o.createElement("div",{className:(0,c.A)("AllTags-module--tags--10d19",t&&"AllTags-module--open--7565d")},o.createElement("ul",null,Array.from(m).map((e=>{let[t,u]=e;return o.createElement("li",{className:(0,c.A)(t===n&&"AllTags-module--activeTag--62f3e")},o.createElement(l.Link,{to:`/blog/tag/${t}`},t,o.createElement("span",{className:"AllTags-module--count--69da4"},u)),t===n&&o.createElement("span",{className:"AllTags-module--clear--49631"},o.createElement(l.Link,{to:"/blog"},o.createElement(r.G,{icon:a.YIN}))))}))))}},7095:function(e,t,n){n.d(t,{Z:function(){return u}});var a=n(9417),r=n(7814),l=n(1082),o=n(7294),c=n(904);var u=e=>o.createElement("div",{className:"BlogPostBox-module--blogPost--75b7a"},o.createElement(l.Link,{to:`/blog/${e.slug}`},o.createElement("h3",null,e.title),o.createElement("p",{dangerouslySetInnerHTML:{__html:e.perex}}),o.createElement("div",{className:"BlogPostBox-module--bottomLine--c72d6"},o.createElement("span",{className:"BlogPostBox-module--readMore--d6e9a"},"Read more",o.createElement(r.G,{icon:a.yOZ})),o.createElement("div",{className:"BlogPostBox-module--metadata--7ee72"},o.createElement(r.G,{icon:a.IV4}),o.createElement("time",{dateTime:e.datetime},o.createElement(c.Z,{date:e.datetime})),o.createElement(r.G,{icon:a.SZw}),e.timeToRead," min read"))))},1409:function(e,t,n){n.d(t,{Z:function(){return u}});var a=n(9417),r=n(1082),l=n(7294),o=n(4593),c=n(6610);var u=e=>{const t=1===e.currentPage,n=e.currentPage===e.numberOfPages;return 1===e.numberOfPages?null:l.createElement(l.Fragment,null,l.createElement(o.q,null,!t&&l.createElement("link",{rel:"prev",href:e.linkToPage(e.currentPage-1)}),!n&&l.createElement("link",{rel:"next",href:e.linkToPage(e.currentPage+1)})),l.createElement("div",{className:"Pagination-module--paginator--3a936"},!t&&l.createElement(c.Z,{as:r.Link,to:e.linkToPage(e.currentPage-1),leftIcon:a.EyR},"Newer posts"),!n&&l.createElement(c.Z,{as:r.Link,to:e.linkToPage(e.currentPage+1),rightIcon:a.yOZ},"Older posts")))}},3924:function(e,t,n){n.r(t);var a=n(7294),r=n(4969),l=n(3218),o=n(8520),c=n(4690),u=n(9951),m=n(5127),i=n(7095),s=n(1409),d=n(8753);t.default=e=>{const{0:t,1:n}=(0,a.useState)(!1);return a.createElement(o.Z,null,a.createElement(c.Z,{title:"Blog"}),a.createElement(l.Z,null,a.createElement("div",{className:d.nP},a.createElement("h1",{className:d.bF},"Blog"),a.createElement("div",{className:(0,u.A)(d.S5,t&&d.eO)},a.createElement("button",{onClick:()=>n(!t)},"Topics"))),a.createElement(m.Z,{isOpen:t})),a.createElement("div",{className:d.YS},a.createElement("div",{className:d.xu},e.data.posts.edges.map((e=>{let{node:t}=e;return a.createElement(i.Z,{key:t.frontmatter.slug,title:t.frontmatter.title,slug:t.frontmatter.slug,datetime:t.frontmatter.datetime,perex:t.frontmatter.perex,timeToRead:t.timeToRead})})),a.createElement(s.Z,{numberOfPages:e.pageContext.numberOfPages,currentPage:e.pageContext.currentPage,linkToPage:e=>1===e?"/blog":`/blog/${e}`})),a.createElement("div",{className:d.p$},a.createElement(r.Z,null))))}},4969:function(e,t,n){n.d(t,{Z:function(){return u}});var a=n(9417),r=n(1082),l=n(7294),o=n(6610),c=n(5129);var u=()=>l.createElement("div",{className:"AboutMe-module--aboutMe--9de30"},l.createElement("h2",null,"Hello, I am Jiří Pudil"),l.createElement(c.Z,null),l.createElement("p",null,"I am a full-stack web developer from Brno, Czech Republic. I contribute to open-source projects, write a technical blog, and speak at meetups and conferences."),l.createElement(o.Z,{as:r.Link,to:"/about",rightIcon:a.eFW},"Learn more about me"))},8753:function(e,t,n){n.d(t,{S5:function(){return c},YS:function(){return m},bF:function(){return l},eO:function(){return u},nP:function(){return r},p$:function(){return a},xu:function(){return o}});var a="BlogPage-module--aboutMe--6eab5",r="BlogPage-module--heading--9ed95",l="BlogPage-module--mainHeading--7be07",o="BlogPage-module--posts--dffd1",c="BlogPage-module--toggleTopics--a32c6",u="BlogPage-module--toggleTopicsActive--12cff",m="BlogPage-module--wrapper--50ddb"},904:function(e,t,n){n.d(t,{Z:function(){return g}});var a=n(7294);function r(e,t,n){return e+" "+(1!==e?t+"s":t)+" "+n}function l(e){const t=new Date(e);if(!Number.isNaN(t.valueOf()))return t;const n=String(e).match(/\d+/g);if(null==n||n.length<=2)return t;{const[e,t,...a]=n.map((e=>parseInt(e))),r=[e,t-1,...a];return new Date(Date.UTC(...r))}}function o(){return o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},o.apply(this,arguments)}const c=60,u=60*c,m=24*u,i=7*m,s=30*m,d=365*m;function g({date:e,formatter:t=r,component:n="time",live:g=!0,minPeriod:f=0,maxPeriod:p=i,title:E,now:v=(()=>Date.now()),...b}){const P=function(){const[e,t]=(0,a.useState)(0);return(0,a.useCallback)((()=>{t((e=>e+1))}),[])}();(0,a.useEffect)((()=>{if(!g)return;let t;const n=a=>{const r=l(e).valueOf();if(!r)return void console.warn("[react-timeago] Invalid Date provided");const o=v(),s=Math.round(Math.abs(o-r)/1e3),d=s<c?1e3:s<u?1e3*c:s<m?1e3*u:1e3*i,g=Math.min(Math.max(d,1e3*f),1e3*p);g&&(t&&clearTimeout(t),t=setTimeout(n,g)),a||P()};return n(!0),()=>{clearTimeout(t)}}),[e,P,g,p,f,v]);const h=n,T=l(e).valueOf();if(!T)return null;const k=v(),N=Math.round(Math.abs(k-T)/1e3),M=T<k?"ago":"from now",[Z,O]=N<c?[Math.round(N),"second"]:N<u?[Math.round(N/c),"minute"]:N<m?[Math.round(N/u),"hour"]:N<i?[Math.round(N/m),"day"]:N<s?[Math.round(N/i),"week"]:N<d?[Math.round(N/s),"month"]:[Math.round(N/d),"year"],B=void 0===E?"string"==typeof e?e:l(e).toISOString().substr(0,16).replace("T"," "):E,w="time"===h?{...b,dateTime:l(e).toISOString()}:b,x=r.bind(null,Z,O,M);return a.createElement(h,o({},w,{title:B}),t(Z,O,M,T,x,v))}}}]);
//# sourceMappingURL=component---src-blog-templates-blog-page-tsx-f153884cff75869f3046.js.map