"use strict";(self.webpackChunkjiripudil_cz=self.webpackChunkjiripudil_cz||[]).push([[974],{7095:function(e,t,a){a.d(t,{Z:function(){return i}});var r=a(9417),n=a(7814),o=a(1082),l=a(7294),s=a(904);var i=e=>l.createElement("div",{className:"BlogPostBox-module--blogPost--75b7a"},l.createElement(o.Link,{to:`/blog/${e.slug}`},l.createElement("h3",null,e.title),l.createElement("p",{dangerouslySetInnerHTML:{__html:e.perex}}),l.createElement("div",{className:"BlogPostBox-module--bottomLine--c72d6"},l.createElement("span",{className:"BlogPostBox-module--readMore--d6e9a"},"Read more",l.createElement(n.G,{icon:r.yOZ})),l.createElement("div",{className:"BlogPostBox-module--metadata--7ee72"},l.createElement(n.G,{icon:r.IV4}),l.createElement("time",{dateTime:e.datetime},l.createElement(s.Z,{date:e.datetime})),l.createElement(n.G,{icon:r.SZw}),e.timeToRead," min read"))))},9633:function(e,t,a){a.r(t),a.d(t,{default:function(){return f}});var r=a(9417),n=a(7814),o=a(1082),l=a(7294),s=a(904),i=a(4969),c=a(3218),m=a(8520),u=a(4690),d=a(7095);var p=e=>{const t=(0,o.useStaticQuery)("3333880182").relatedPosts.edges.filter((t=>t.node.frontmatter.slug!==e.currentPost.slug)).map((t=>{let a=0;return e.currentPost.tags.forEach((e=>{t.node.frontmatter.tags.includes(e)&&a++})),{post:t.node,score:a}}));t.sort(((e,t)=>{const a=t.score-e.score;return 0!==a?a:+new Date(t.post.frontmatter.datetime)-+new Date(e.post.frontmatter.datetime)}));const a=t[0];return void 0===a||0===a.score?null:l.createElement("div",{className:"RelatedBlogPost-module--relatedPost--53e80"},l.createElement("h2",null,"More from my blog"),l.createElement(d.Z,{title:a.post.frontmatter.title,slug:a.post.frontmatter.slug,datetime:a.post.frontmatter.datetime,perex:a.post.frontmatter.perex,timeToRead:a.post.timeToRead}))};var f=e=>{const{post:t}=e.data;return l.createElement(m.Z,null,l.createElement(u.Z,{title:`${t.frontmatter.title} – Blog`}),l.createElement(c.Z,null,l.createElement("div",{className:"BlogPost-module--heading--9a3bb"},l.createElement("h1",null,t.frontmatter.title),l.createElement("p",{dangerouslySetInnerHTML:{__html:t.frontmatter.perex}})),l.createElement("div",{className:"BlogPost-module--metadata--995e2"},l.createElement("div",{className:"BlogPost-module--topics--34652"},l.createElement("ul",null,t.frontmatter.tags.map((e=>l.createElement("li",{key:e},l.createElement(o.Link,{to:`/blog/tag/${e}`},e)))))),l.createElement("div",{className:"BlogPost-module--readingTime--e0f40"},l.createElement(n.G,{icon:r.IV4})," ",l.createElement("time",{dateTime:t.frontmatter.datetime},l.createElement(s.Z,{date:t.frontmatter.datetime})),l.createElement(n.G,{icon:r.SZw})," ",t.timeToRead," min read"))),l.createElement("div",{className:"BlogPost-module--postBody--aa3b6",dangerouslySetInnerHTML:{__html:t.html}}),l.createElement("div",{className:"BlogPost-module--discussion--81e38"},l.createElement("div",{ref:e=>{if(null===e)return;for(;null!=e&&e.firstChild;)e.removeChild(e.firstChild);const t=document.createElement("script");t.src="https://giscus.app/client.js",t.crossOrigin="anonymous",t.async=!0,t.setAttribute("data-repo","jiripudil/jiripudil.cz"),t.setAttribute("data-repo-id","MDEwOlJlcG9zaXRvcnkyNTI5NzY3Nw=="),t.setAttribute("data-category","Blog discussions"),t.setAttribute("data-category-id","DIC_kwDOAYIDDc4CAfUM"),t.setAttribute("data-mapping","og:title"),t.setAttribute("data-reactions-enabled","1"),t.setAttribute("data-emit-metadata","0"),t.setAttribute("data-theme","light"),t.setAttribute("data-lang","en"),e.appendChild(t)}})),l.createElement("div",{className:"BlogPost-module--typoWrapper--1376f"},l.createElement("div",{className:"BlogPost-module--typo--1ffcf"},l.createElement("strong",null,"Have you found a ",l.createElement("span",null,"tpyo")," in the post?")," ","Please ",l.createElement("a",{href:`https://github.com/jiripudil/jiripudil.cz/edit/master/src/blog/posts/${encodeURIComponent(t.fileAbsolutePath.split(/.*[\/|\\]/)[1])}`},"submit a pull request")," with a fix :)")),l.createElement("div",{className:"BlogPost-module--relatedPostWrapper--c2c27"},l.createElement("div",{className:"BlogPost-module--relatedPost--883c7"},l.createElement(p,{currentPost:{slug:t.frontmatter.slug,tags:t.frontmatter.tags}})),l.createElement("div",{className:"BlogPost-module--aboutMe--2a9a8"},l.createElement(i.Z,null))))}},4969:function(e,t,a){a.d(t,{Z:function(){return i}});var r=a(9417),n=a(1082),o=a(7294),l=a(6610),s=a(5129);var i=()=>o.createElement("div",{className:"AboutMe-module--aboutMe--9de30"},o.createElement("h2",null,"Hello, I am Jiří Pudil"),o.createElement(s.Z,null),o.createElement("p",null,"I am a full-stack web developer from Brno, Czech Republic. I contribute to open-source projects, write a technical blog, and speak at meetups and conferences."),o.createElement(l.Z,{as:n.Link,to:"/about",rightIcon:r.eFW},"Learn more about me"))},904:function(e,t,a){a.d(t,{Z:function(){return d}});var r=a(7294);function n(e,t,a){return e+" "+(1!==e?t+"s":t)+" "+a}function o(e){const t=new Date(e);if(!Number.isNaN(t.valueOf()))return t;const a=String(e).match(/\d+/g);if(null==a||a.length<=2)return t;{const[e,t,...r]=a.map((e=>parseInt(e))),n=[e,t-1,...r];return new Date(Date.UTC(...n))}}function l(){return l=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var r in a)Object.prototype.hasOwnProperty.call(a,r)&&(e[r]=a[r])}return e},l.apply(this,arguments)}const s=3600,i=86400,c=7*i,m=30*i,u=365*i;function d({date:e,formatter:t=n,component:a="time",live:d=!0,minPeriod:p=0,maxPeriod:f=c,title:g,now:E=(()=>Date.now()),...h}){const b=function(){const[e,t]=(0,r.useState)(0);return(0,r.useCallback)((()=>{t((e=>e+1))}),[])}();(0,r.useEffect)((()=>{if(!d)return;let t;const a=r=>{const n=o(e).valueOf();if(!n)return void console.warn("[react-timeago] Invalid Date provided");const l=E(),c=Math.round(Math.abs(l-n)/1e3),m=c<60?1e3:c<s?6e4:c<i?36e5:6048e5,u=Math.min(Math.max(m,1e3*p),1e3*f);u&&(t&&clearTimeout(t),t=setTimeout(a,u)),r||b()};return a(!0),()=>{clearTimeout(t)}}),[e,b,d,f,p,E]);const v=a,P=o(e).valueOf();if(!P)return null;const B=E(),y=Math.round(Math.abs(B-P)/1e3),M=P<B?"ago":"from now",[N,w]=y<60?[Math.round(y),"second"]:y<s?[Math.round(y/60),"minute"]:y<i?[Math.round(y/s),"hour"]:y<c?[Math.round(y/i),"day"]:y<m?[Math.round(y/c),"week"]:y<u?[Math.round(y/m),"month"]:[Math.round(y/u),"year"],I=void 0===g?"string"==typeof e?e:o(e).toISOString().substr(0,16).replace("T"," "):g,T="time"===v?{...h,dateTime:o(e).toISOString()}:h,Z=n.bind(null,N,w,M);return r.createElement(v,l({},T,{title:I}),t(N,w,M,P,Z,E))}}}]);
//# sourceMappingURL=component---src-blog-templates-blog-post-tsx-9f994ffc8748c27d797b.js.map