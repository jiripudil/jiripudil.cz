(self.webpackChunkjiripudil_cz=self.webpackChunkjiripudil_cz||[]).push([[351],{7814:function(e,t,n){"use strict";n.d(t,{G:function(){return T}});var r=n(3636),o=n(5697),i=n.n(o),a=n(7294);function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function u(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(Object(n),!0).forEach((function(t){s(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e){return l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},l(e)}function s(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function f(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}function p(e){return function(e){if(Array.isArray(e))return d(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return d(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return d(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function d(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function m(e){return t=e,(t-=0)==t?e:(e=e.replace(/[\-_\s]+(.)?/g,(function(e,t){return t?t.toUpperCase():""}))).substr(0,1).toLowerCase()+e.substr(1);var t}var y=["style"];function b(e){return e.split(";").map((function(e){return e.trim()})).filter((function(e){return e})).reduce((function(e,t){var n,r=t.indexOf(":"),o=m(t.slice(0,r)),i=t.slice(r+1).trim();return o.startsWith("webkit")?e[(n=o,n.charAt(0).toUpperCase()+n.slice(1))]=i:e[o]=i,e}),{})}var h=!1;try{h=!0}catch(O){}function v(e){return e&&"object"===l(e)&&e.prefix&&e.iconName&&e.icon?e:r.Qc.icon?r.Qc.icon(e):null===e?null:e&&"object"===l(e)&&e.prefix&&e.iconName?e:Array.isArray(e)&&2===e.length?{prefix:e[0],iconName:e[1]}:"string"==typeof e?{prefix:"fas",iconName:e}:void 0}function g(e,t){return Array.isArray(t)&&t.length>0||!Array.isArray(t)&&t?s({},e,t):{}}var T=a.forwardRef((function(e,t){var n=e.icon,o=e.mask,i=e.symbol,a=e.className,c=e.title,l=e.titleId,f=e.maskId,d=v(n),m=g("classes",[].concat(p(function(e){var t,n=e.beat,r=e.fade,o=e.beatFade,i=e.bounce,a=e.shake,c=e.flash,u=e.spin,l=e.spinPulse,f=e.spinReverse,p=e.pulse,d=e.fixedWidth,m=e.inverse,y=e.border,b=e.listItem,h=e.flip,v=e.size,g=e.rotation,T=e.pull,w=(s(t={"fa-beat":n,"fa-fade":r,"fa-beat-fade":o,"fa-bounce":i,"fa-shake":a,"fa-flash":c,"fa-spin":u,"fa-spin-reverse":f,"fa-spin-pulse":l,"fa-pulse":p,"fa-fw":d,"fa-inverse":m,"fa-border":y,"fa-li":b,"fa-flip":!0===h,"fa-flip-horizontal":"horizontal"===h||"both"===h,"fa-flip-vertical":"vertical"===h||"both"===h},"fa-".concat(v),null!=v),s(t,"fa-rotate-".concat(g),null!=g&&0!==g),s(t,"fa-pull-".concat(T),null!=T),s(t,"fa-swap-opacity",e.swapOpacity),t);return Object.keys(w).map((function(e){return w[e]?e:null})).filter((function(e){return e}))}(e)),p(a.split(" ")))),y=g("transform","string"==typeof e.transform?r.Qc.transform(e.transform):e.transform),b=g("mask",v(o)),O=(0,r.qv)(d,u(u(u(u({},m),y),b),{},{symbol:i,title:c,titleId:l,maskId:f}));if(!O)return function(){var e;!h&&console&&"function"==typeof console.error&&(e=console).error.apply(e,arguments)}("Could not find icon",d),null;var E=O.abstract,A={ref:t};return Object.keys(e).forEach((function(t){T.defaultProps.hasOwnProperty(t)||(A[t]=e[t])})),w(E[0],A)}));T.displayName="FontAwesomeIcon",T.propTypes={beat:i().bool,border:i().bool,beatFade:i().bool,bounce:i().bool,className:i().string,fade:i().bool,flash:i().bool,mask:i().oneOfType([i().object,i().array,i().string]),maskId:i().string,fixedWidth:i().bool,inverse:i().bool,flip:i().oneOf([!0,!1,"horizontal","vertical","both"]),icon:i().oneOfType([i().object,i().array,i().string]),listItem:i().bool,pull:i().oneOf(["right","left"]),pulse:i().bool,rotation:i().oneOf([0,90,180,270]),shake:i().bool,size:i().oneOf(["2xs","xs","sm","lg","xl","2xl","1x","2x","3x","4x","5x","6x","7x","8x","9x","10x"]),spin:i().bool,spinPulse:i().bool,spinReverse:i().bool,symbol:i().oneOfType([i().bool,i().string]),title:i().string,titleId:i().string,transform:i().oneOfType([i().string,i().object]),swapOpacity:i().bool},T.defaultProps={border:!1,className:"",mask:null,maskId:null,fixedWidth:!1,inverse:!1,flip:!1,icon:null,listItem:!1,pull:null,pulse:!1,rotation:null,size:null,spin:!1,spinPulse:!1,spinReverse:!1,beat:!1,fade:!1,beatFade:!1,bounce:!1,shake:!1,symbol:!1,title:"",titleId:null,transform:null,swapOpacity:!1};var w=function e(t,n){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if("string"==typeof n)return n;var o=(n.children||[]).map((function(n){return e(t,n)})),i=Object.keys(n.attributes||{}).reduce((function(e,t){var r=n.attributes[t];switch(t){case"class":e.attrs.className=r,delete n.attributes.class;break;case"style":e.attrs.style=b(r);break;default:0===t.indexOf("aria-")||0===t.indexOf("data-")?e.attrs[t.toLowerCase()]=r:e.attrs[m(t)]=r}return e}),{attrs:{}}),a=r.style,c=void 0===a?{}:a,l=f(r,y);return i.attrs.style=u(u({},i.attrs.style),c),t.apply(void 0,[n.tag,u(u({},i.attrs),l)].concat(p(o)))}.bind(null,a.createElement)},4852:function(e){"use strict";e.exports=Object.assign},3518:function(e,t,n){"use strict";n.d(t,{Z:function(){return A}});var r={};n.r(r),n.d(r,{Qw:function(){return s},Fs:function(){return f},e:function(){return p},p4:function(){return d},cc:function(){return m},u2:function(){return y},uO:function(){return b}});var o=n(7294),i=n(9417),a=n(7814),c=n(1082),u=n(9951),l=n.p+"static/me-62c2c18911223f6783fdaac917f75666.jpg",s="Header-module--greeting--98be0",f="Header-module--header--dc446",p="Header-module--inlineHeader--6bbf7",d="Header-module--link--5cf4a",m="Header-module--motto--2d1bc",y="Header-module--name--949b8",b="Header-module--picture--07e61";var h=e=>{let{isHomepage:t}=e;return o.createElement(c.Link,{className:d,to:"/"},o.createElement("header",{className:(0,u.A)(f,!t&&p)},o.createElement("div",{className:b},o.createElement("img",{src:l,alt:"Jiří Pudil"})),o.createElement("div",{className:r.content},o.createElement("div",{className:s},"Hello, I am"),o.createElement("div",{className:y},"Jiří Pudil"),o.createElement("div",{className:m},"I turn ",o.createElement(a.G,{icon:i.SvR})," into ",o.createElement("code",null,"<code>")))))},v="MainMenu-module--activeLink--7f448",g="MainMenu-module--link--881d4",T="MainMenu-module--menuItem--6c9fe";var w=e=>o.createElement("nav",{className:"MainMenu-module--mainMenu--28a7e"},o.createElement("div",{className:"MainMenu-module--icon--efeb2"},o.createElement(a.G,{icon:i.xiG})),o.createElement("ul",{className:"MainMenu-module--menu--602ec"},o.createElement("li",{className:T},o.createElement(c.Link,{to:"/",className:g,activeClassName:v},"About me")),o.createElement("li",{className:T},o.createElement(c.Link,{to:"/blog",partiallyActive:!0,className:g,activeClassName:v},"Blog")),o.createElement("li",{className:T},o.createElement(c.Link,{to:"/talks",className:g,activeClassName:v},"Talks")))),O=n(3024);var E=e=>o.createElement("footer",{className:"Footer-module--footer--acb34"},"Content licensed under"," ",o.createElement("a",{href:"https://creativecommons.org/licenses/by/4.0/",title:"Creative Commons Attribution 4.0 International",className:"Footer-module--licenseLink--7146a"},o.createElement(a.G,{icon:O.Oqs}),o.createElement(a.G,{icon:O.I4w})));var A=e=>{let{isHomepage:t,children:n}=e;return o.createElement(o.Fragment,null,o.createElement(h,{isHomepage:!!t}),o.createElement(w,null),n,o.createElement(E,null))}},4690:function(e,t,n){"use strict";var r=n(1082),o=n(7294),i=n(4593);t.Z=e=>{const t=(0,r.useStaticQuery)("3504401423");return o.createElement(i.q,{htmlAttributes:{lang:"en"},title:e.title,titleTemplate:`%s – ${t.site.siteMetadata.title}`},o.createElement("meta",{charSet:"utf-8"}),o.createElement("meta",{httpEquiv:"X-UA-Compatible",content:"IE=edge,chrome=1"}),o.createElement("meta",{name:"viewport",content:"width=device-width,initial-scale=1,maximum-scale=1"}),o.createElement("meta",{name:"description",content:e.description||t.site.siteMetadata.description}),o.createElement("meta",{property:"fb:admins",content:"1625947532"}),o.createElement("meta",{name:"google-site-verification",content:"7fHBkeNq7LXO24W8IjCc37NT9MX-6RJxD3Co5F-bRQw"}),o.createElement("meta",{property:"og:title",content:e.title}),o.createElement("meta",{property:"og:description",content:e.description||t.site.siteMetadata.description}),o.createElement("meta",{property:"og:type",content:"website"}),o.createElement("meta",{name:"twitter:dnt",content:"on"}),o.createElement("meta",{name:"twitter:card",content:"summary"}),o.createElement("meta",{name:"twitter:creator",content:t.site.siteMetadata.author}),o.createElement("meta",{name:"twitter:title",content:e.title}),o.createElement("meta",{name:"twitter:description",content:e.description||t.site.siteMetadata.description}),e.children)}},9951:function(e,t,n){"use strict";n.d(t,{A:function(){return r}});const r=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return t.filter(Boolean).join(" ")}},9590:function(e){var t="undefined"!=typeof Element,n="function"==typeof Map,r="function"==typeof Set,o="function"==typeof ArrayBuffer&&!!ArrayBuffer.isView;function i(e,a){if(e===a)return!0;if(e&&a&&"object"==typeof e&&"object"==typeof a){if(e.constructor!==a.constructor)return!1;var c,u,l,s;if(Array.isArray(e)){if((c=e.length)!=a.length)return!1;for(u=c;0!=u--;)if(!i(e[u],a[u]))return!1;return!0}if(n&&e instanceof Map&&a instanceof Map){if(e.size!==a.size)return!1;for(s=e.entries();!(u=s.next()).done;)if(!a.has(u.value[0]))return!1;for(s=e.entries();!(u=s.next()).done;)if(!i(u.value[1],a.get(u.value[0])))return!1;return!0}if(r&&e instanceof Set&&a instanceof Set){if(e.size!==a.size)return!1;for(s=e.entries();!(u=s.next()).done;)if(!a.has(u.value[0]))return!1;return!0}if(o&&ArrayBuffer.isView(e)&&ArrayBuffer.isView(a)){if((c=e.length)!=a.length)return!1;for(u=c;0!=u--;)if(e[u]!==a[u])return!1;return!0}if(e.constructor===RegExp)return e.source===a.source&&e.flags===a.flags;if(e.valueOf!==Object.prototype.valueOf)return e.valueOf()===a.valueOf();if(e.toString!==Object.prototype.toString)return e.toString()===a.toString();if((c=(l=Object.keys(e)).length)!==Object.keys(a).length)return!1;for(u=c;0!=u--;)if(!Object.prototype.hasOwnProperty.call(a,l[u]))return!1;if(t&&e instanceof Element)return!1;for(u=c;0!=u--;)if(("_owner"!==l[u]&&"__v"!==l[u]&&"__o"!==l[u]||!e.$$typeof)&&!i(e[l[u]],a[l[u]]))return!1;return!0}return e!=e&&a!=a}e.exports=function(e,t){try{return i(e,t)}catch(n){if((n.message||"").match(/stack|recursion/i))return console.warn("react-fast-compare cannot handle circular refs"),!1;throw n}}},4593:function(e,t,n){"use strict";n.d(t,{q:function(){return ye}});var r,o,i,a,c=n(5697),u=n.n(c),l=n(3524),s=n.n(l),f=n(9590),p=n.n(f),d=n(7294),m=n(4852),y=n.n(m),b="bodyAttributes",h="htmlAttributes",v="titleAttributes",g={BASE:"base",BODY:"body",HEAD:"head",HTML:"html",LINK:"link",META:"meta",NOSCRIPT:"noscript",SCRIPT:"script",STYLE:"style",TITLE:"title"},T=(Object.keys(g).map((function(e){return g[e]})),"charset"),w="cssText",O="href",E="http-equiv",A="innerHTML",C="itemprop",S="name",j="property",k="rel",x="src",P="target",I={accesskey:"accessKey",charset:"charSet",class:"className",contenteditable:"contentEditable",contextmenu:"contextMenu","http-equiv":"httpEquiv",itemprop:"itemProp",tabindex:"tabIndex"},N="defaultTitle",M="defer",L="encodeSpecialCharacters",R="onChangeClientState",H="titleTemplate",F=Object.keys(I).reduce((function(e,t){return e[I[t]]=t,e}),{}),_=[g.NOSCRIPT,g.SCRIPT,g.STYLE],q="data-react-helmet",D="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},B=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},z=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),U=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},Y=function(e,t){var n={};for(var r in e)t.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n},W=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t},G=function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];return!1===t?String(e):String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")},K=function(e){var t=X(e,g.TITLE),n=X(e,H);if(n&&t)return n.replace(/%s/g,(function(){return Array.isArray(t)?t.join(""):t}));var r=X(e,N);return t||r||void 0},Q=function(e){return X(e,R)||function(){}},$=function(e,t){return t.filter((function(t){return void 0!==t[e]})).map((function(t){return t[e]})).reduce((function(e,t){return U({},e,t)}),{})},J=function(e,t){return t.filter((function(e){return void 0!==e[g.BASE]})).map((function(e){return e[g.BASE]})).reverse().reduce((function(t,n){if(!t.length)for(var r=Object.keys(n),o=0;o<r.length;o++){var i=r[o].toLowerCase();if(-1!==e.indexOf(i)&&n[i])return t.concat(n)}return t}),[])},V=function(e,t,n){var r={};return n.filter((function(t){return!!Array.isArray(t[e])||(void 0!==t[e]&&re("Helmet: "+e+' should be of type "Array". Instead found type "'+D(t[e])+'"'),!1)})).map((function(t){return t[e]})).reverse().reduce((function(e,n){var o={};n.filter((function(e){for(var n=void 0,i=Object.keys(e),a=0;a<i.length;a++){var c=i[a],u=c.toLowerCase();-1===t.indexOf(u)||n===k&&"canonical"===e[n].toLowerCase()||u===k&&"stylesheet"===e[u].toLowerCase()||(n=u),-1===t.indexOf(c)||c!==A&&c!==w&&c!==C||(n=c)}if(!n||!e[n])return!1;var l=e[n].toLowerCase();return r[n]||(r[n]={}),o[n]||(o[n]={}),!r[n][l]&&(o[n][l]=!0,!0)})).reverse().forEach((function(t){return e.push(t)}));for(var i=Object.keys(o),a=0;a<i.length;a++){var c=i[a],u=y()({},r[c],o[c]);r[c]=u}return e}),[]).reverse()},X=function(e,t){for(var n=e.length-1;n>=0;n--){var r=e[n];if(r.hasOwnProperty(t))return r[t]}return null},Z=(r=Date.now(),function(e){var t=Date.now();t-r>16?(r=t,e(t)):setTimeout((function(){Z(e)}),0)}),ee=function(e){return clearTimeout(e)},te="undefined"!=typeof window?window.requestAnimationFrame&&window.requestAnimationFrame.bind(window)||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||Z:n.g.requestAnimationFrame||Z,ne="undefined"!=typeof window?window.cancelAnimationFrame||window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame||ee:n.g.cancelAnimationFrame||ee,re=function(e){return console&&"function"==typeof console.warn&&console.warn(e)},oe=null,ie=function(e,t){var n=e.baseTag,r=e.bodyAttributes,o=e.htmlAttributes,i=e.linkTags,a=e.metaTags,c=e.noscriptTags,u=e.onChangeClientState,l=e.scriptTags,s=e.styleTags,f=e.title,p=e.titleAttributes;ue(g.BODY,r),ue(g.HTML,o),ce(f,p);var d={baseTag:le(g.BASE,n),linkTags:le(g.LINK,i),metaTags:le(g.META,a),noscriptTags:le(g.NOSCRIPT,c),scriptTags:le(g.SCRIPT,l),styleTags:le(g.STYLE,s)},m={},y={};Object.keys(d).forEach((function(e){var t=d[e],n=t.newTags,r=t.oldTags;n.length&&(m[e]=n),r.length&&(y[e]=d[e].oldTags)})),t&&t(),u(e,m,y)},ae=function(e){return Array.isArray(e)?e.join(""):e},ce=function(e,t){void 0!==e&&document.title!==e&&(document.title=ae(e)),ue(g.TITLE,t)},ue=function(e,t){var n=document.getElementsByTagName(e)[0];if(n){for(var r=n.getAttribute(q),o=r?r.split(","):[],i=[].concat(o),a=Object.keys(t),c=0;c<a.length;c++){var u=a[c],l=t[u]||"";n.getAttribute(u)!==l&&n.setAttribute(u,l),-1===o.indexOf(u)&&o.push(u);var s=i.indexOf(u);-1!==s&&i.splice(s,1)}for(var f=i.length-1;f>=0;f--)n.removeAttribute(i[f]);o.length===i.length?n.removeAttribute(q):n.getAttribute(q)!==a.join(",")&&n.setAttribute(q,a.join(","))}},le=function(e,t){var n=document.head||document.querySelector(g.HEAD),r=n.querySelectorAll(e+"["+"data-react-helmet]"),o=Array.prototype.slice.call(r),i=[],a=void 0;return t&&t.length&&t.forEach((function(t){var n=document.createElement(e);for(var r in t)if(t.hasOwnProperty(r))if(r===A)n.innerHTML=t.innerHTML;else if(r===w)n.styleSheet?n.styleSheet.cssText=t.cssText:n.appendChild(document.createTextNode(t.cssText));else{var c=void 0===t[r]?"":t[r];n.setAttribute(r,c)}n.setAttribute(q,"true"),o.some((function(e,t){return a=t,n.isEqualNode(e)}))?o.splice(a,1):i.push(n)})),o.forEach((function(e){return e.parentNode.removeChild(e)})),i.forEach((function(e){return n.appendChild(e)})),{oldTags:o,newTags:i}},se=function(e){return Object.keys(e).reduce((function(t,n){var r=void 0!==e[n]?n+'="'+e[n]+'"':""+n;return t?t+" "+r:r}),"")},fe=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Object.keys(e).reduce((function(t,n){return t[I[n]||n]=e[n],t}),t)},pe=function(e,t,n){switch(e){case g.TITLE:return{toComponent:function(){return e=t.title,n=t.titleAttributes,(r={key:e})[q]=!0,o=fe(n,r),[d.createElement(g.TITLE,o,e)];var e,n,r,o},toString:function(){return function(e,t,n,r){var o=se(n),i=ae(t);return o?"<"+e+' data-react-helmet="true" '+o+">"+G(i,r)+"</"+e+">":"<"+e+' data-react-helmet="true">'+G(i,r)+"</"+e+">"}(e,t.title,t.titleAttributes,n)}};case b:case h:return{toComponent:function(){return fe(t)},toString:function(){return se(t)}};default:return{toComponent:function(){return function(e,t){return t.map((function(t,n){var r,o=((r={key:n})[q]=!0,r);return Object.keys(t).forEach((function(e){var n=I[e]||e;if(n===A||n===w){var r=t.innerHTML||t.cssText;o.dangerouslySetInnerHTML={__html:r}}else o[n]=t[e]})),d.createElement(e,o)}))}(e,t)},toString:function(){return function(e,t,n){return t.reduce((function(t,r){var o=Object.keys(r).filter((function(e){return!(e===A||e===w)})).reduce((function(e,t){var o=void 0===r[t]?t:t+'="'+G(r[t],n)+'"';return e?e+" "+o:o}),""),i=r.innerHTML||r.cssText||"",a=-1===_.indexOf(e);return t+"<"+e+' data-react-helmet="true" '+o+(a?"/>":">"+i+"</"+e+">")}),"")}(e,t,n)}}}},de=function(e){var t=e.baseTag,n=e.bodyAttributes,r=e.encode,o=e.htmlAttributes,i=e.linkTags,a=e.metaTags,c=e.noscriptTags,u=e.scriptTags,l=e.styleTags,s=e.title,f=void 0===s?"":s,p=e.titleAttributes;return{base:pe(g.BASE,t,r),bodyAttributes:pe(b,n,r),htmlAttributes:pe(h,o,r),link:pe(g.LINK,i,r),meta:pe(g.META,a,r),noscript:pe(g.NOSCRIPT,c,r),script:pe(g.SCRIPT,u,r),style:pe(g.STYLE,l,r),title:pe(g.TITLE,{title:f,titleAttributes:p},r)}},me=s()((function(e){return{baseTag:J([O,P],e),bodyAttributes:$(b,e),defer:X(e,M),encode:X(e,L),htmlAttributes:$(h,e),linkTags:V(g.LINK,[k,O],e),metaTags:V(g.META,[S,T,E,j,C],e),noscriptTags:V(g.NOSCRIPT,[A],e),onChangeClientState:Q(e),scriptTags:V(g.SCRIPT,[x,A],e),styleTags:V(g.STYLE,[w],e),title:K(e),titleAttributes:$(v,e)}}),(function(e){oe&&ne(oe),e.defer?oe=te((function(){ie(e,(function(){oe=null}))})):(ie(e),oe=null)}),de)((function(){return null})),ye=(o=me,a=i=function(e){function t(){return B(this,t),W(this,e.apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),t.prototype.shouldComponentUpdate=function(e){return!p()(this.props,e)},t.prototype.mapNestedChildrenToProps=function(e,t){if(!t)return null;switch(e.type){case g.SCRIPT:case g.NOSCRIPT:return{innerHTML:t};case g.STYLE:return{cssText:t}}throw new Error("<"+e.type+" /> elements are self-closing and can not contain children. Refer to our API for more information.")},t.prototype.flattenArrayTypeChildren=function(e){var t,n=e.child,r=e.arrayTypeChildren,o=e.newChildProps,i=e.nestedChildren;return U({},r,((t={})[n.type]=[].concat(r[n.type]||[],[U({},o,this.mapNestedChildrenToProps(n,i))]),t))},t.prototype.mapObjectTypeChildren=function(e){var t,n,r=e.child,o=e.newProps,i=e.newChildProps,a=e.nestedChildren;switch(r.type){case g.TITLE:return U({},o,((t={})[r.type]=a,t.titleAttributes=U({},i),t));case g.BODY:return U({},o,{bodyAttributes:U({},i)});case g.HTML:return U({},o,{htmlAttributes:U({},i)})}return U({},o,((n={})[r.type]=U({},i),n))},t.prototype.mapArrayTypeChildrenToProps=function(e,t){var n=U({},t);return Object.keys(e).forEach((function(t){var r;n=U({},n,((r={})[t]=e[t],r))})),n},t.prototype.warnOnInvalidChildren=function(e,t){return!0},t.prototype.mapChildrenToProps=function(e,t){var n=this,r={};return d.Children.forEach(e,(function(e){if(e&&e.props){var o=e.props,i=o.children,a=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Object.keys(e).reduce((function(t,n){return t[F[n]||n]=e[n],t}),t)}(Y(o,["children"]));switch(n.warnOnInvalidChildren(e,i),e.type){case g.LINK:case g.META:case g.NOSCRIPT:case g.SCRIPT:case g.STYLE:r=n.flattenArrayTypeChildren({child:e,arrayTypeChildren:r,newChildProps:a,nestedChildren:i});break;default:t=n.mapObjectTypeChildren({child:e,newProps:t,newChildProps:a,nestedChildren:i})}}})),t=this.mapArrayTypeChildrenToProps(r,t)},t.prototype.render=function(){var e=this.props,t=e.children,n=Y(e,["children"]),r=U({},n);return t&&(r=this.mapChildrenToProps(t,r)),d.createElement(o,r)},z(t,null,[{key:"canUseDOM",set:function(e){o.canUseDOM=e}}]),t}(d.Component),i.propTypes={base:u().object,bodyAttributes:u().object,children:u().oneOfType([u().arrayOf(u().node),u().node]),defaultTitle:u().string,defer:u().bool,encodeSpecialCharacters:u().bool,htmlAttributes:u().object,link:u().arrayOf(u().object),meta:u().arrayOf(u().object),noscript:u().arrayOf(u().object),onChangeClientState:u().func,script:u().arrayOf(u().object),style:u().arrayOf(u().object),title:u().string,titleAttributes:u().object,titleTemplate:u().string},i.defaultProps={defer:!0,encodeSpecialCharacters:!0},i.peek=o.peek,i.rewind=function(){var e=o.rewind();return e||(e=de({baseTag:[],bodyAttributes:{},encodeSpecialCharacters:!0,htmlAttributes:{},linkTags:[],metaTags:[],noscriptTags:[],scriptTags:[],styleTags:[],title:"",titleAttributes:{}})),e},a);ye.renderStatic=ye.rewind},3524:function(e,t,n){"use strict";var r,o=n(7294),i=(r=o)&&"object"==typeof r&&"default"in r?r.default:r;function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var c=!("undefined"==typeof window||!window.document||!window.document.createElement);e.exports=function(e,t,n){if("function"!=typeof e)throw new Error("Expected reducePropsToState to be a function.");if("function"!=typeof t)throw new Error("Expected handleStateChangeOnClient to be a function.");if(void 0!==n&&"function"!=typeof n)throw new Error("Expected mapStateOnServer to either be undefined or a function.");return function(r){if("function"!=typeof r)throw new Error("Expected WrappedComponent to be a React component.");var u,l=[];function s(){u=e(l.map((function(e){return e.props}))),f.canUseDOM?t(u):n&&(u=n(u))}var f=function(e){var t,n;function o(){return e.apply(this,arguments)||this}n=e,(t=o).prototype=Object.create(n.prototype),t.prototype.constructor=t,t.__proto__=n,o.peek=function(){return u},o.rewind=function(){if(o.canUseDOM)throw new Error("You may only call rewind() on the server. Call peek() to read the current state.");var e=u;return u=void 0,l=[],e};var a=o.prototype;return a.UNSAFE_componentWillMount=function(){l.push(this),s()},a.componentDidUpdate=function(){s()},a.componentWillUnmount=function(){var e=l.indexOf(this);l.splice(e,1),s()},a.render=function(){return i.createElement(r,this.props)},o}(o.PureComponent);return a(f,"displayName","SideEffect("+function(e){return e.displayName||e.name||"Component"}(r)+")"),a(f,"canUseDOM",c),f}}}}]);
//# sourceMappingURL=commons-302ea157e53ebdb6b742.js.map