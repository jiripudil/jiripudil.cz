"use strict";(self.webpackChunkjiripudil_cz=self.webpackChunkjiripudil_cz||[]).push([[49],{9116:function(e,t,a){a.r(t),a.d(t,{default:function(){return v}});var l=a(3024),n=a(9417),i=a(7814),c=a(1082),r=a(7294),o=a(3218),s=a(8520),m=a(6610);const u=(0,r.createContext)(void 0),d=e=>{let{children:t}=e;const{0:a,1:l}=(0,r.useState)();return(0,r.useEffect)((()=>{const e=e=>{const t=e.filter((e=>"cs-CZ"===e.lang));t.length>0&&l(t[0])},t=window.speechSynthesis.getVoices();t.length>0?e(t):window.speechSynthesis.addEventListener("voiceschanged",(()=>{const t=window.speechSynthesis.getVoices();e(t)}))}),[]),r.createElement(u.Provider,{value:a},t)};var p=e=>{let{text:t}=e;const a=(0,r.useContext)(u);return r.createElement("button",{className:"Pronounce-module--pronounce--28fea",disabled:void 0===a,onClick:()=>{const e=new SpeechSynthesisUtterance(t);e.lang="cs-CZ",e.voice=a,window.speechSynthesis.speak(e)}},r.createElement(i.G,{icon:n.ygb}))},h=a(5129),E=a(4690);const g=(0,r.memo)((e=>{let{year:t,company:a,icon:l,description:n,isLast:c,isLastButOne:o}=e,s=r.createElement("h3",null,r.createElement("strong",null,t,r.createElement(i.G,{icon:l})),a);c||(s=r.createElement("summary",null,s));let m=r.createElement(r.Fragment,null,s,n);return c||(m=r.createElement("details",{open:o},m)),r.createElement("li",null,m)}));var w=e=>{let{items:t}=e;return r.createElement("div",{className:"Timeline-module--timeline--cf36c"},r.createElement("ul",null,t.map(((e,a)=>r.createElement(g,Object.assign({},e,{isLastButOne:a===t.length-2,isLast:a===t.length-1}))))))};var v=()=>r.createElement(s.Z,null,r.createElement(E.Z,{title:"About"}),r.createElement(o.Z,null,r.createElement("div",{className:"about-module--whoami--f268e"},r.createElement("div",{className:"about-module--profile--0ff3b"},r.createElement("div",{className:"about-module--hello--4dfa2"},"Hello, I am Jiří Pudil"),r.createElement("p",null,"I am a full-stack web developer from Brno, Czech Republic. I contribute to open-source projects, write a technical blog, and speak at meetups and conferences.")),r.createElement("div",{className:"about-module--recipe--8fa8d"},r.createElement(h.Z,null))),r.createElement("div",{className:"about-module--pronunciation--c779f"},r.createElement("div",null,r.createElement(i.G,{icon:n.oo5})),r.createElement(d,null,r.createElement("p",null,"In Czech, my name is pronounced /jɪr̝iː/",r.createElement(p,{text:"Jiří"}),", but good luck with that ",r.createElement("a",{href:"https://en.wikipedia.org/wiki/Voiced_dental,_alveolar_and_postalveolar_trills#Voiced_alveolar_fricative_trill"},"voiced alveolar fricative trill"),". A more informal variant of the name is Jirka /jɪrka/",r.createElement(p,{text:"Jirka"})," which doesn't have that sound. If you want to keep it on more formal terms, /jɪriː/",r.createElement(p,{text:"Jiri"})," is a much better shot than /dʒɪriː/.")))),r.createElement("div",{className:"about-module--aboutMeWrapper--ed81a"},r.createElement("div",{className:"about-module--aboutMe--0b01c"},r.createElement("h1",null,"About me"),r.createElement("p",null,"I started playing with PHP back in 2009 and have been developing in it professionally since 2012. I am most proficient with Nette Framework and Doctrine ORM. I’ve also fallen in love with TypeScript, both client-side with React.js and server-side with Node."),r.createElement("p",null,"I use common sense at work and enjoy participating in the design process of web development as well. I strive to make websites as easy to use and navigate as possible. My primary focus is still development, though."),r.createElement("h2",null,"Timeline"),r.createElement(w,{items:[{year:"2012",company:"PeckaDesign",icon:n.HXv,description:r.createElement("p",null,"I started my professional career at ",r.createElement("a",{href:"https://peckadesign.cz"},"PeckaDesign")," in Brno. I spent the vast majority of my three years there working on Megapixel.cz, a leading Czech e-commerce site for photographers. I helped rethink and refactor the community gallery code, and implemented an online photolab service, handling large amounts of uploaded files via modern JavaScript (XHR2) and Nginx’s file upload module.")},{year:"2015",company:"Rohlík.cz",icon:n.HXv,description:r.createElement("p",null,r.createElement("a",{href:"https://www.rohlik.cz"},"Rohlík.cz")," is a Czech startup running an electronic grocery store, at the time delivering goods in the Czech Republic’s two largest cities, Prague and Brno. Dispatching over 1500 orders each day, the project’s codebase utilized technologies such as Elasticsearch to list products without relational database lookups, or RabbitMQ to perform various tasks asynchronously.")},{year:"2016",company:"Masaryk University",icon:n.Xf_,description:r.createElement("p",null,"In mid-2016, I finished writing my thesis – a single-page JavaScript chatting app, with React.js on the front end and Express and MongoDB on the back end. I implemented Google’s Web Speech API so that users could navigate the app, dictate messages and have them read, all without using the keyboard. I successfully defended the thesis, passed my state exams and got a bachelor’s degree in Social Informatics.")},{year:"2016",company:"Grifart",icon:n.HXv,description:r.createElement("p",null,"Since 2016 I’ve been helping ",r.createElement("a",{href:"http://grifart.cz"},"Grifart"),", a Brno-based company organizing medicinal congresses, rebuild their registration system so that all the processes that can be automated are automated. I have also occassionally worked on React.js front-ends, and I’ve helped set up infrastructure components like Nginx-based reverse proxy or a logging server built with the Elastic stack.")},{year:"2018",company:"Smartlook",icon:n.HXv,description:r.createElement("p",null,"In mid-2018 I started working with ",r.createElement("a",{href:"https://smartlook.com"},"Smartlook"),", a Czech startup providing website and mobile app analytics based on visitor recordings. With PHP being only a small part of the whole cloud-based solution, I also got in touch with React and Node.js applications written in TypeScript, and I’ve got to know Docker better.")},{year:"2020",company:"IVY assistant",icon:n.HXv,description:r.createElement("p",null,"Late in 2019 I joined ",r.createElement("a",{href:"https://ivyassistant.com"},"IVY assistant"),", a freshly born medicinal startup helping IVF patients stick to the scheduled treatment. I have worked on an event-sourced PHP backend, and built from scratch an administrative GUI for the clinics, written in TypeScript and React, and featuring a robust front-end encryption solution. I have also done some work on mobile apps powered by Kotlin Multiplatform Mobile.")},{year:"2020",company:"Školení nás baví",icon:n.TEY,description:r.createElement("p",null,"In early 2020 I started giving public workshops, organized by guys at ",r.createElement("a",{href:"https://www.skoleninasbavi.cz/lektori/jiri-pudil/"},"Školení nás baví"),". The first workshop is all about JavaScript: it explains the good old foundations, shows the shiny new features, and sets up a Webpack-based dev stack. More workshops and topics are to come.")},{year:"2022",company:"Superkoders",icon:n.HXv,description:r.createElement("p",null,"In January 2022, I shook hands with ",r.createElement("a",{href:"https://superkoders.com"},"Superkoders"),", a Brno-based digital agency, to join them as a software architect, helping shape the future of their in-house content management solution.")},{year:"always",company:"giving back to the community",icon:n.iOm,description:r.createElement("p",null,"The community has given me so much that it’s only natural that I give back to it whenever I can. I try to help people on ",r.createElement("a",{href:"https://forum.nette.org/cs/profile.php?id=3206"},"Nette forum"),", write ",r.createElement(c.Link,{to:"/blog"},"this blog"),", ",r.createElement(c.Link,{to:"/talks"},"speak at meetups"),", help keep the ",r.createElement("a",{href:"http://people.php.net/jiripudil"},"PHP documentation up-to-date"),", and contribute to or even create and/or maintain a number of ",r.createElement("a",{href:"https://github.com/jiripudil"},"open-source projects"),".")}]})),r.createElement("div",{className:"about-module--sidebar--a2a3b"},r.createElement("div",{className:"about-module--skills--40caf"},r.createElement("h2",null,"I know"),r.createElement("ul",null,r.createElement("li",null,r.createElement("div",null,r.createElement(i.G,{icon:n.xf3})),"PHP, Nette Framework, Doctrine ORM, Node.js"),r.createElement("li",null,r.createElement("div",null,r.createElement(i.G,{icon:n.tc$})),"TypeScript, React.js, Next.js"),r.createElement("li",null,r.createElement("div",null,r.createElement(i.G,{icon:n.bJI})),"Kotlin, Android, iOS, Swift UI"),r.createElement("li",null,r.createElement("div",null,r.createElement(i.G,{icon:n.t5N})),"PostgreSQL, MySQL, Redis, Elasticsearch, RabbitMQ"),r.createElement("li",null,r.createElement("div",null,r.createElement(i.G,{icon:n.Jw3})),"UNIX, Git, Docker, zsh"))),r.createElement("div",{className:"about-module--languages--bfc8a"},r.createElement("h2",null,"I speak"),r.createElement("ul",null,r.createElement("li",null,r.createElement("div",null,r.createElement("img",{src:"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iNTEyIiB3aWR0aD0iNTEyIiBpZD0iZmxhZy1pY29uLWNzcy1jeiI+Cgk8ZGVmcz4KCQk8Y2xpcFBhdGggaWQ9ImEiPgoJCQk8cGF0aCBmaWxsLW9wYWNpdHk9Ii42NyIgZD0iTTEwMi40MiAwaDcwOC42NnY3MDguNjZIMTAyLjQyeiIvPgoJCTwvY2xpcFBhdGg+Cgk8L2RlZnM+Cgk8ZyBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcGF0aD0idXJsKCNhKSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTc0KSBzY2FsZSguNzIyKSIgc3Ryb2tlLXdpZHRoPSIxcHQiPgoJCTxwYXRoIGZpbGw9IiNlODAwMDAiIGQ9Ik0wIDBoMTA2M3Y3MDguNjZIMHoiLz4KCQk8cGF0aCBmaWxsPSIjZmZmIiBkPSJNMCAwaDEwNjN2MzU0LjMzSDB6Ii8+CgkJPHBhdGggZD0iTTAgMGw1MjkuNzMyIDM1My44OEwwIDcwNy4zVjB6IiBmaWxsPSIjMDAwMDZmIi8+Cgk8L2c+Cjwvc3ZnPgo=",alt:"Czech"})),r.createElement("strong",null,"Czech"),"natively"),r.createElement("li",null,r.createElement("div",null,r.createElement("img",{src:"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iNTEyIiB3aWR0aD0iNTEyIiBpZD0iZmxhZy1pY29uLWNzcy1nYiI+Cgk8ZGVmcz4KCQk8Y2xpcFBhdGggaWQ9ImEiPgoJCQk8cGF0aCBmaWxsLW9wYWNpdHk9Ii42NyIgZD0iTTI1MCAwaDUwMHY1MDBIMjUweiIvPgoJCTwvY2xpcFBhdGg+Cgk8L2RlZnM+Cgk8ZyBjbGlwLXBhdGg9InVybCgjYSkiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yNTYpIHNjYWxlKDEuMDI0KSI+CgkJPGcgc3Ryb2tlLXdpZHRoPSIxcHQiPgoJCQk8cGF0aCBmaWxsPSIjMDA2IiBkPSJNMCAwaDEwMDAuMDJ2NTAwLjAxSDB6Ii8+CgkJCTxwYXRoIGQ9Ik0wIDB2NTUuOTAzbDg4OC4yMTggNDQ0LjExaDExMS44MDJWNDQ0LjExTDExMS44MDIuMDAzSDB6bTEwMDAuMDIgMHY1NS45TDExMS44MDIgNTAwLjAxSDB2LTU1LjlMODg4LjIxOCAwaDExMS44MDJ6IiBmaWxsPSIjZmZmIi8+CgkJCTxwYXRoIGQ9Ik00MTYuNjc1IDB2NTAwLjAxaDE2Ni42N1YwaC0xNjYuNjd6TTAgMTY2LjY3djE2Ni42N2gxMDAwLjAyVjE2Ni42N0gweiIgZmlsbD0iI2ZmZiIvPgoJCQk8cGF0aCBkPSJNMCAyMDAuMDA0djEwMC4wMDJoMTAwMC4wMlYyMDAuMDA0SDB6TTQ1MC4wMSAwdjUwMC4wMWgxMDBWMGgtMTAwek0wIDUwMC4wMWwzMzMuMzQtMTY2LjY3aDc0LjUzNUw3NC41MzUgNTAwLjAxSDB6TTAgMGwzMzMuMzQgMTY2LjY3aC03NC41MzVMMCAzNy4yN1Ywem01OTIuMTQ1IDE2Ni42N0w5MjUuNDg1IDBoNzQuNTM1TDY2Ni42OCAxNjYuNjdoLTc0LjUzNXptNDA3Ljg3NSAzMzMuMzRMNjY2LjY4IDMzMy4zNGg3NC41MzVsMjU4LjgwNSAxMjkuNDAzdjM3LjI2N3oiIGZpbGw9IiNjMDAiLz4KCQk8L2c+Cgk8L2c+Cjwvc3ZnPgo=",alt:"English"})),r.createElement("strong",null,"English"),"C1"),r.createElement("li",null,r.createElement("div",null,r.createElement("img",{src:"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iNTEyIiB3aWR0aD0iNTEyIiBpZD0iZmxhZy1pY29uLWNzcy1kZSI+Cgk8cGF0aCBmaWxsPSIjZmZjZTAwIiBkPSJNMCAzNDEuMzM4aDUxMi4wMDV2MTcwLjY3SDB6Ii8+Cgk8cGF0aCBkPSJNMCAwaDUxMi4wMDV2MTcwLjY3SDB6Ii8+Cgk8cGF0aCBmaWxsPSIjZDAwIiBkPSJNMCAxNzAuNjdoNTEyLjAwNXYxNzAuNjY4SDB6Ii8+Cjwvc3ZnPgo=",alt:"German"})),r.createElement("strong",null,"German"),"A2"),r.createElement("li",null,r.createElement("div",null,r.createElement("img",{src:"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iNTEyIiB3aWR0aD0iNTEyIiBpZD0iZmxhZy1pY29uLWNzcy1lcyI+Cgk8cGF0aCBmaWxsPSIjYzYwYjFlIiBkPSJNMCAwaDUxMnY1MTJIMHoiLz4KCTxwYXRoIGZpbGw9IiNmZmM0MDAiIGQ9Ik0wIDEyOGg1MTJ2MjU2SDB6Ii8+Cjwvc3ZnPgo=",alt:"Spanish"})),r.createElement("strong",null,"Spanish"),"A1"))),r.createElement("div",{className:"about-module--hobbies--c0752"},r.createElement("h2",null,"In my free time I"),r.createElement("ul",null,r.createElement("li",null,r.createElement("div",null,r.createElement(i.G,{icon:n.dT$})),"code open-source contributions"),r.createElement("li",null,r.createElement("div",null,r.createElement(i.G,{icon:n.VEk})),"spike a volleyball"),r.createElement("li",null,r.createElement("div",null,r.createElement(i.G,{icon:n.uYz})),"ride a mountain bike"),r.createElement("li",null,r.createElement("div",null,r.createElement(i.G,{icon:n.mCs})),"play one of my guitars"),r.createElement("li",null,r.createElement("div",null,r.createElement(i.G,{icon:n.l9D})),"occassionally enjoy a videogame"))))),r.createElement("div",{className:"about-module--contactOuterWrapper--26b9b"},r.createElement("div",{className:"about-module--contactWrapper--2a8dd"},r.createElement("div",{className:"about-module--contact--6ecb5"},r.createElement("h2",null,"Contact"),r.createElement("ul",null,r.createElement("li",null,r.createElement("div",null,r.createElement(i.G,{icon:n.FU$})),r.createElement("a",{href:"mailto:me@jiripudil.cz"},"me@jiripudil.cz")),r.createElement("li",null,r.createElement("div",null,r.createElement(i.G,{icon:n.j1w})),r.createElement("a",{href:"tel:+420606351567"},"+420 606 351 567")),r.createElement("li",null,r.createElement("div",null,r.createElement(i.G,{icon:n.DD4})),r.createElement("a",{href:"https://keys.openpgp.org/search?q=78A085087D1176DD9F2524B8D3344DC7AAE0703D"},"0xAAE0703D")),r.createElement("li",null,r.createElement("div",null,r.createElement(i.G,{icon:n.opg})),"Brno, CZE"),r.createElement("li",{className:"about-module--twitter--7714e"},r.createElement("div",null,r.createElement(i.G,{icon:l.mdU})),r.createElement("a",{href:"https://twitter.com/jiripudil"},"jiripudil")),r.createElement("li",{className:"about-module--github--d9ec2"},r.createElement("div",null,r.createElement(i.G,{icon:l.zhw})),r.createElement("a",{href:"https://github.com/jiripudil"},"jiripudil"))),r.createElement(m.Z,{href:"/vcard.vcf",download:!0,leftIcon:n.dLO},"Download vCard")),r.createElement("div",{className:"about-module--legal--5ab94"},r.createElement("h2",null,"Legal"),r.createElement("ul",null,r.createElement("li",null,r.createElement("div",null,r.createElement(i.G,{icon:n.hVn})),r.createElement("span",null,r.createElement("strong",null,"Jiří Pudil"),r.createElement("br",null),"Hálkova 926",r.createElement("br",null),"39601 Humpolec",r.createElement("br",null),"Czech Republic")),r.createElement("li",null,r.createElement("div",null,r.createElement(i.G,{icon:n.HXv})),r.createElement("span",null,"Registered in the Trade Register.",r.createElement("br",null),"Reg. no. ",r.createElement("a",{href:"http://wwwinfo.mfcr.cz/cgi-bin/ares/darv_res.cgi?ico=04299604&jazyk=en&xml=1"},"04299604"))),r.createElement("li",null,r.createElement("div",null,r.createElement(i.G,{icon:n.Bkr})),r.createElement("span",null,"1018058758/6100",r.createElement("br",null),"CZ5761000000001018058758",r.createElement("br",null),"EquaBank (EQBKCZPP)")),r.createElement("li",null,r.createElement("div",null,r.createElement(i.G,{icon:n.mSY})),r.createElement("span",null,r.createElement("a",{href:"https://www.mojedatovaschranka.cz/sds/detail.do?dbid=hnsucky"},"hnsucky"))))))))}}]);
//# sourceMappingURL=component---src-pages-about-tsx-00abb4c0ecbb46255319.js.map