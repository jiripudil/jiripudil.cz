"use strict";(self.webpackChunkjiripudil_cz=self.webpackChunkjiripudil_cz||[]).push([[974],{7095:function(e,t,a){a.d(t,{Z:function(){return i}});var r=a(9417),n=a(7814),o=a(1082),l=a(7294),s=a(904);var i=e=>l.createElement("div",{className:"BlogPostBox-module--blogPost--75b7a"},l.createElement(o.Link,{to:`/blog/${e.slug}`},l.createElement("h3",null,e.title),l.createElement("p",{dangerouslySetInnerHTML:{__html:e.perex}}),l.createElement("div",{className:"BlogPostBox-module--bottomLine--c72d6"},l.createElement("span",{className:"BlogPostBox-module--readMore--d6e9a"},"Read more",l.createElement(n.G,{icon:r.yOZ})),l.createElement("div",{className:"BlogPostBox-module--metadata--7ee72"},l.createElement(n.G,{icon:r.IV4}),l.createElement("time",{dateTime:e.datetime},l.createElement(s.Z,{date:e.datetime})),l.createElement(n.G,{icon:r.SZw}),e.timeToRead," min read"))))},9633:function(e,t,a){a.r(t),a.d(t,{default:function(){return f}});var r=a(9417),n=a(7814),o=a(1082),l=a(7294),s=a(904),i=a(4969),m=a(3218),c=a(8520),u=a(4690),d=a(7095);var p=e=>{const t=(0,o.useStaticQuery)("3333880182").relatedPosts.edges.filter((t=>t.node.frontmatter.slug!==e.currentPost.slug)).map((t=>{let a=0;return e.currentPost.tags.forEach((e=>{t.node.frontmatter.tags.includes(e)&&a++})),{post:t.node,score:a}}));t.sort(((e,t)=>{const a=t.score-e.score;return 0!==a?a:+new Date(t.post.frontmatter.datetime)-+new Date(e.post.frontmatter.datetime)}));const a=t[0];return void 0===a||0===a.score?null:l.createElement("div",{className:"RelatedBlogPost-module--relatedPost--53e80"},l.createElement("h2",null,"More from my blog"),l.createElement(d.Z,{title:a.post.frontmatter.title,slug:a.post.frontmatter.slug,datetime:a.post.frontmatter.datetime,perex:a.post.frontmatter.perex,timeToRead:a.post.timeToRead}))};var f=e=>{const{post:t}=e.data;return l.createElement(c.Z,null,l.createElement(u.Z,{title:`${t.frontmatter.title} – Blog`}),l.createElement(m.Z,null,l.createElement("div",{className:"BlogPost-module--mainHeading--43cdf"},l.createElement(o.Link,{to:"/blog"},"Blog"))),l.createElement("div",{className:"BlogPost-module--post--aa200"},l.createElement("h1",null,t.frontmatter.title),l.createElement("div",{className:"BlogPost-module--metadata--995e2"},l.createElement("div",{className:"BlogPost-module--topics--34652"},l.createElement("ul",null,t.frontmatter.tags.map((e=>l.createElement("li",{key:e},l.createElement(o.Link,{to:`/blog/tag/${e}`},e)))))),l.createElement("div",{className:"BlogPost-module--readingTime--e0f40"},l.createElement(n.G,{icon:r.IV4})," ",l.createElement("time",{dateTime:t.frontmatter.datetime},l.createElement(s.Z,{date:t.frontmatter.datetime})),l.createElement(n.G,{icon:r.SZw})," ",t.timeToRead," min read")),l.createElement("p",{className:"BlogPost-module--lead--a2400",dangerouslySetInnerHTML:{__html:t.frontmatter.perex}}),l.createElement("div",{className:"BlogPost-module--postBody--aa3b6",dangerouslySetInnerHTML:{__html:t.html}})),l.createElement("div",{className:"BlogPost-module--discussion--81e38"},l.createElement("div",{ref:e=>{if(null===e)return;for(;null!=e&&e.firstChild;)e.removeChild(e.firstChild);const t=document.createElement("script");t.src="https://giscus.app/client.js",t.crossOrigin="anonymous",t.async=!0,t.setAttribute("data-repo","jiripudil/jiripudil.cz"),t.setAttribute("data-repo-id","MDEwOlJlcG9zaXRvcnkyNTI5NzY3Nw=="),t.setAttribute("data-category","Blog discussions"),t.setAttribute("data-category-id","DIC_kwDOAYIDDc4CAfUM"),t.setAttribute("data-mapping","og:title"),t.setAttribute("data-reactions-enabled","1"),t.setAttribute("data-emit-metadata","0"),t.setAttribute("data-theme","light"),t.setAttribute("data-lang","en"),t.setAttribute("data-loading","lazy"),e.appendChild(t)}})),l.createElement("div",{className:"BlogPost-module--typoWrapper--1376f"},l.createElement("div",{className:"BlogPost-module--typo--1ffcf"},l.createElement("strong",null,"Have you found a ",l.createElement("span",null,"tpyo")," in the post?")," ","Please ",l.createElement("a",{href:`https://github.com/jiripudil/jiripudil.cz/edit/master/src/blog/posts/${encodeURIComponent(t.fileAbsolutePath.split(/.*[\/|\\]/)[1])}`},"submit a pull request")," with a fix :)")),l.createElement("div",{className:"BlogPost-module--relatedPostWrapper--c2c27"},l.createElement("div",{className:"BlogPost-module--relatedPost--883c7"},l.createElement(p,{currentPost:{slug:t.frontmatter.slug,tags:t.frontmatter.tags}})),l.createElement("div",{className:"BlogPost-module--aboutMe--2a9a8"},l.createElement(i.Z,null))))}},4969:function(e,t,a){a.d(t,{Z:function(){return i}});var r=a(9417),n=a(1082),o=a(7294),l=a(6610),s=a(5129);var i=()=>o.createElement("div",{className:"AboutMe-module--aboutMe--9de30"},o.createElement("h2",null,"Hello, I am Jiří Pudil"),o.createElement(s.Z,null),o.createElement("p",null,"I am a full-stack web developer from Brno, Czech Republic. I contribute to open-source projects, write a technical blog, and speak at meetups and conferences."),o.createElement(l.Z,{as:n.Link,to:"/about",rightIcon:r.eFW},"Learn more about me"))},904:function(e,t,a){a.d(t,{Z:function(){return p}});var r=a(7294);function n(e,t,a){return e+" "+(1!==e?t+"s":t)+" "+a}function o(e){const t=new Date(e);if(!Number.isNaN(t.valueOf()))return t;const a=String(e).match(/\d+/g);if(null==a||a.length<=2)return t;{const[e,t,...r]=a.map((e=>parseInt(e))),n=[e,t-1,...r];return new Date(Date.UTC(...n))}}function l(){return l=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var r in a)Object.prototype.hasOwnProperty.call(a,r)&&(e[r]=a[r])}return e},l.apply(this,arguments)}const s=60,i=60*s,m=24*i,c=7*m,u=30*m,d=365*m;function p({date:e,formatter:t=n,component:a="time",live:p=!0,minPeriod:f=0,maxPeriod:g=c,title:E,now:h=(()=>Date.now()),...b}){const v=function(){const[e,t]=(0,r.useState)(0);return(0,r.useCallback)((()=>{t((e=>e+1))}),[])}();(0,r.useEffect)((()=>{if(!p)return;let t;const a=r=>{const n=o(e).valueOf();if(!n)return void console.warn("[react-timeago] Invalid Date provided");const l=h(),u=Math.round(Math.abs(l-n)/1e3),d=u<s?1e3:u<i?1e3*s:u<m?1e3*i:1e3*c,p=Math.min(Math.max(d,1e3*f),1e3*g);p&&(t&&clearTimeout(t),t=setTimeout(a,p)),r||v()};return a(!0),()=>{clearTimeout(t)}}),[e,v,p,g,f,h]);const P=a,B=o(e).valueOf();if(!B)return null;const N=h(),y=Math.round(Math.abs(N-B)/1e3),M=B<N?"ago":"from now",[w,I]=y<s?[Math.round(y),"second"]:y<i?[Math.round(y/s),"minute"]:y<m?[Math.round(y/i),"hour"]:y<c?[Math.round(y/m),"day"]:y<u?[Math.round(y/c),"week"]:y<d?[Math.round(y/u),"month"]:[Math.round(y/d),"year"],T=void 0===E?"string"==typeof e?e:o(e).toISOString().substr(0,16).replace("T"," "):E,k="time"===P?{...b,dateTime:o(e).toISOString()}:b,Z=n.bind(null,w,I,M);return r.createElement(P,l({},k,{title:T}),t(w,I,M,B,Z,h))}}}]);
//# sourceMappingURL=component---src-blog-templates-blog-post-tsx-19f6f4e99348c5460632.js.map