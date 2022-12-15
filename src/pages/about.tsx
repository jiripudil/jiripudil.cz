import {faGithub, faTwitter} from '@fortawesome/free-brands-svg-icons';
import {faAddressBook, faAddressCard, faBriefcase, faBuildingColumns, faChalkboardUser, faCode, faDatabase, faDesktop, faEnvelope, faEnvelopeOpenText, faGamepad, faGraduationCap, faGuitar, faKey, faLocationDot, faMobileAlt, faPeopleGroup, faPersonBiking, faPhone, faServer, faTerminal, faVolleyball, faVolumeLow} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Link} from 'gatsby';
import React, {type FunctionComponent} from 'react';
import Hero from '../components/Hero';
import Layout from '../components/Layout';
import Pill from '../components/Pill';
import Pronounce from '../components/Pronounce';
import Recipe from '../components/Recipe';
import SEO from '../components/SEO';
import Timeline from '../components/Timeline';
import {VoiceProvider} from '../components/useVoice';
import * as styles from './about.module.scss';

const AboutPage: FunctionComponent = () => (
	<Layout>
		<SEO title="About" />

		<Hero>
			<div className={styles.whoami}>
				<div className={styles.profile}>
					<div className={styles.hello}>Hello, I am Jiří Pudil</div>
					<p>I am a full-stack web developer from Brno, Czech Republic. I contribute to open-source projects, write a technical blog, and speak at meetups and conferences.</p>
				</div>

				<div className={styles.recipe}>
					<Recipe />
				</div>
			</div>

			<div className={styles.pronunciation}>
				<div>
					<FontAwesomeIcon icon={faVolumeLow} />
				</div>
				<VoiceProvider>
					<p>
						In Czech, my name is pronounced /jɪr̝iː/<Pronounce text="Jiří" />, but good luck with that <a href="https://en.wikipedia.org/wiki/Voiced_dental,_alveolar_and_postalveolar_trills#Voiced_alveolar_fricative_trill">voiced alveolar fricative trill</a>. A&nbsp;more informal variant of the name is Jirka /jɪrka/<Pronounce text="Jirka" /> which doesn't have that sound. If you want to keep it on more formal terms, /jɪriː/<Pronounce text="Jiri" /> is a much better shot than /dʒɪriː/.
					</p>
				</VoiceProvider>
			</div>
		</Hero>

		<div className={styles.aboutMeWrapper}>
			<div className={styles.aboutMe}>
				<h1>About me</h1>
				<p>I&nbsp;started playing with PHP back in 2009 and have been developing in it professionally since 2012. I&nbsp;am most proficient with Nette Framework and Doctrine ORM. I&rsquo;ve also fallen in love with TypeScript, both client-side with React.js and server-side with Node.</p>
				<p>I&nbsp;use common sense at work and enjoy participating in the design process of web development as well. I&nbsp;strive to make websites as easy to use and navigate as possible. My primary focus is still development, though.</p>

				<h2>Timeline</h2>
				<Timeline
					items={[
						{
							year: '2012',
							company: 'PeckaDesign',
							icon: faBriefcase,
							description: <p>I&nbsp;started my professional career at <a href="https://peckadesign.cz">PeckaDesign</a> in Brno. I&nbsp;spent the vast majority of my three years there working on Megapixel.cz, a&nbsp;leading Czech e-commerce site for photographers. I&nbsp;helped rethink and refactor the community gallery code, and implemented an online photolab service, handling large amounts of uploaded files via modern JavaScript (XHR2) and Nginx’s file upload module.</p>,
						},
						{
							year: '2015',
							company: 'Rohlík.cz',
							icon: faBriefcase,
							description: <p><a href="https://www.rohlik.cz">Rohlík.cz</a> is a&nbsp;Czech startup running an electronic grocery store, at the time delivering goods in the Czech Republic’s two largest cities, Prague and Brno. Dispatching over 1500 orders each day, the project’s codebase utilized technologies such as Elasticsearch to list products without relational database lookups, or RabbitMQ to perform various tasks asynchronously.</p>,
						},
						{
							year: '2016',
							company: 'Masaryk University',
							icon: faGraduationCap,
							description: <p>In mid-2016, I&nbsp;finished writing my thesis – a&nbsp;single-page JavaScript chatting app, with React.js on the front end and Express and MongoDB on the back end. I&nbsp;implemented Google’s Web Speech API so that users could navigate the app, dictate messages and have them read, all without using the keyboard. I&nbsp;successfully defended the thesis, passed my state exams and got a&nbsp;bachelor’s degree in Social Informatics.</p>,
						},
						{
							year: '2016',
							company: 'Grifart',
							icon: faBriefcase,
							description: <p>Since 2016 I’ve been helping <a href="http://grifart.cz">Grifart</a>, a Brno-based company organizing medicinal congresses, rebuild their registration system so that all the processes that can be automated are automated. I&nbsp;have also occassionally worked on React.js front-ends, and I’ve helped set up infrastructure components like Nginx-based reverse proxy or a&nbsp;logging server built with the Elastic stack.</p>,
						},
						{
							year: '2018',
							company: 'Smartlook',
							icon: faBriefcase,
							description: <p>In mid-2018 I&nbsp;started working with <a href="https://smartlook.com">Smartlook</a>, a&nbsp;Czech startup providing website and mobile app analytics based on visitor recordings. With PHP being only a&nbsp;small part of the whole cloud-based solution, I&nbsp;also got in touch with React and Node.js applications written in TypeScript, and I’ve got to know Docker better.</p>,
						},
						{
							year: '2020',
							company: 'IVY assistant',
							icon: faBriefcase,
							description: <p>Late in 2019 I&nbsp;joined <a href="https://ivyassistant.com">IVY assistant</a>, a&nbsp;freshly born medicinal startup helping IVF patients stick to the scheduled treatment. I&nbsp;have worked on an event-sourced PHP backend, and built from scratch an administrative GUI for the clinics, written in TypeScript and React, and featuring a&nbsp;robust front-end encryption solution. I&nbsp;have also done some work on mobile apps powered by Kotlin Multiplatform Mobile.</p>,
						},
						{
							year: '2020',
							company: 'Školení nás baví',
							icon: faChalkboardUser,
							description: <p>In early 2020 I&nbsp;started giving public workshops, organized by guys at <a href="https://www.skoleninasbavi.cz/lektori/jiri-pudil/">Školení nás baví</a>. The first workshop is all about JavaScript: it explains the good old foundations, shows the shiny new features, and sets up a&nbsp;Webpack-based dev stack. More workshops and topics are to come.</p>,
						},
						{
							year: '2022',
							company: 'Superkoders',
							icon: faBriefcase,
							description: <p>In January 2022, I&nbsp;shook hands with <a href="https://superkoders.com">Superkoders</a>, a&nbsp;Brno-based digital agency, to join them as a&nbsp;software architect, helping shape the future of their in-house content management solution.</p>,
						},
						{
							year: 'always',
							company: 'giving back to the community',
							icon: faPeopleGroup,
							description: <p>The community has given me so much that it’s only natural that I&nbsp;give back to it whenever I&nbsp;can. I&nbsp;try to help people on <a href="https://forum.nette.org/cs/profile.php?id=3206">Nette forum</a>, write <Link to="/blog">this blog</Link>, <Link to="/talks">speak at meetups</Link>, help keep the <a href="http://people.php.net/jiripudil">PHP documentation up-to-date</a>, and contribute to or even create and/or maintain a&nbsp;number of <a href="https://github.com/jiripudil">open-source projects</a>.</p>,
						},
					]}
				/>
			</div>

			<div className={styles.sidebar}>
				<div className={styles.skills}>
					<h2>I&nbsp;know</h2>
					<ul>
						<li>
							<div><FontAwesomeIcon icon={faServer} /></div>
							PHP, Nette Framework, Doctrine ORM, Node.js
						</li>
						<li>
							<div><FontAwesomeIcon icon={faDesktop} /></div>
							TypeScript, React.js, Next.js
						</li>
						<li>
							<div><FontAwesomeIcon icon={faMobileAlt} /></div>
							Kotlin, Android, iOS, Swift UI
						</li>
						<li>
							<div><FontAwesomeIcon icon={faDatabase} /></div>
							PostgreSQL, MySQL, Redis, Elasticsearch, RabbitMQ
						</li>
						<li>
							<div><FontAwesomeIcon icon={faTerminal} /></div>
							UNIX, Git, Docker, zsh
						</li>
					</ul>
				</div>

				<div className={styles.languages}>
					<h2>I&nbsp;speak</h2>
					<ul>
						<li>
							<div><img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iNTEyIiB3aWR0aD0iNTEyIiBpZD0iZmxhZy1pY29uLWNzcy1jeiI+Cgk8ZGVmcz4KCQk8Y2xpcFBhdGggaWQ9ImEiPgoJCQk8cGF0aCBmaWxsLW9wYWNpdHk9Ii42NyIgZD0iTTEwMi40MiAwaDcwOC42NnY3MDguNjZIMTAyLjQyeiIvPgoJCTwvY2xpcFBhdGg+Cgk8L2RlZnM+Cgk8ZyBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcGF0aD0idXJsKCNhKSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTc0KSBzY2FsZSguNzIyKSIgc3Ryb2tlLXdpZHRoPSIxcHQiPgoJCTxwYXRoIGZpbGw9IiNlODAwMDAiIGQ9Ik0wIDBoMTA2M3Y3MDguNjZIMHoiLz4KCQk8cGF0aCBmaWxsPSIjZmZmIiBkPSJNMCAwaDEwNjN2MzU0LjMzSDB6Ii8+CgkJPHBhdGggZD0iTTAgMGw1MjkuNzMyIDM1My44OEwwIDcwNy4zVjB6IiBmaWxsPSIjMDAwMDZmIi8+Cgk8L2c+Cjwvc3ZnPgo=" alt="Czech" /></div>
							<strong>Czech</strong>
							natively
						</li>
						<li>
							<div><img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iNTEyIiB3aWR0aD0iNTEyIiBpZD0iZmxhZy1pY29uLWNzcy1nYiI+Cgk8ZGVmcz4KCQk8Y2xpcFBhdGggaWQ9ImEiPgoJCQk8cGF0aCBmaWxsLW9wYWNpdHk9Ii42NyIgZD0iTTI1MCAwaDUwMHY1MDBIMjUweiIvPgoJCTwvY2xpcFBhdGg+Cgk8L2RlZnM+Cgk8ZyBjbGlwLXBhdGg9InVybCgjYSkiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yNTYpIHNjYWxlKDEuMDI0KSI+CgkJPGcgc3Ryb2tlLXdpZHRoPSIxcHQiPgoJCQk8cGF0aCBmaWxsPSIjMDA2IiBkPSJNMCAwaDEwMDAuMDJ2NTAwLjAxSDB6Ii8+CgkJCTxwYXRoIGQ9Ik0wIDB2NTUuOTAzbDg4OC4yMTggNDQ0LjExaDExMS44MDJWNDQ0LjExTDExMS44MDIuMDAzSDB6bTEwMDAuMDIgMHY1NS45TDExMS44MDIgNTAwLjAxSDB2LTU1LjlMODg4LjIxOCAwaDExMS44MDJ6IiBmaWxsPSIjZmZmIi8+CgkJCTxwYXRoIGQ9Ik00MTYuNjc1IDB2NTAwLjAxaDE2Ni42N1YwaC0xNjYuNjd6TTAgMTY2LjY3djE2Ni42N2gxMDAwLjAyVjE2Ni42N0gweiIgZmlsbD0iI2ZmZiIvPgoJCQk8cGF0aCBkPSJNMCAyMDAuMDA0djEwMC4wMDJoMTAwMC4wMlYyMDAuMDA0SDB6TTQ1MC4wMSAwdjUwMC4wMWgxMDBWMGgtMTAwek0wIDUwMC4wMWwzMzMuMzQtMTY2LjY3aDc0LjUzNUw3NC41MzUgNTAwLjAxSDB6TTAgMGwzMzMuMzQgMTY2LjY3aC03NC41MzVMMCAzNy4yN1Ywem01OTIuMTQ1IDE2Ni42N0w5MjUuNDg1IDBoNzQuNTM1TDY2Ni42OCAxNjYuNjdoLTc0LjUzNXptNDA3Ljg3NSAzMzMuMzRMNjY2LjY4IDMzMy4zNGg3NC41MzVsMjU4LjgwNSAxMjkuNDAzdjM3LjI2N3oiIGZpbGw9IiNjMDAiLz4KCQk8L2c+Cgk8L2c+Cjwvc3ZnPgo=" alt="English" /></div>
							<strong>English</strong>
							C1
						</li>
						<li>
							<div><img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iNTEyIiB3aWR0aD0iNTEyIiBpZD0iZmxhZy1pY29uLWNzcy1kZSI+Cgk8cGF0aCBmaWxsPSIjZmZjZTAwIiBkPSJNMCAzNDEuMzM4aDUxMi4wMDV2MTcwLjY3SDB6Ii8+Cgk8cGF0aCBkPSJNMCAwaDUxMi4wMDV2MTcwLjY3SDB6Ii8+Cgk8cGF0aCBmaWxsPSIjZDAwIiBkPSJNMCAxNzAuNjdoNTEyLjAwNXYxNzAuNjY4SDB6Ii8+Cjwvc3ZnPgo=" alt="German" /></div>
							<strong>German</strong>
							A2
						</li>
						<li>
							<div><img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iNTEyIiB3aWR0aD0iNTEyIiBpZD0iZmxhZy1pY29uLWNzcy1lcyI+Cgk8cGF0aCBmaWxsPSIjYzYwYjFlIiBkPSJNMCAwaDUxMnY1MTJIMHoiLz4KCTxwYXRoIGZpbGw9IiNmZmM0MDAiIGQ9Ik0wIDEyOGg1MTJ2MjU2SDB6Ii8+Cjwvc3ZnPgo=" alt="Spanish" /></div>
							<strong>Spanish</strong>
							A1
						</li>
					</ul>
				</div>

				<div className={styles.hobbies}>
					<h2>In my free time I</h2>
					<ul>
						<li>
							<div><FontAwesomeIcon icon={faCode} /></div>
							code open-source contributions
						</li>
						<li>
							<div><FontAwesomeIcon icon={faVolleyball} /></div>
							spike a volleyball
						</li>
						<li>
							<div><FontAwesomeIcon icon={faPersonBiking} /></div>
							ride a mountain bike
						</li>
						<li>
							<div><FontAwesomeIcon icon={faGuitar} /></div>
							play one of my guitars
						</li>
						<li>
							<div><FontAwesomeIcon icon={faGamepad} /></div>
							occassionally enjoy a videogame
						</li>
					</ul>
				</div>
			</div>
		</div>

		<div className={styles.contactOuterWrapper}>
			<div className={styles.contactWrapper}>
				<div className={styles.contact}>
					<h2>Contact</h2>
					<ul>
						<li>
							<div><FontAwesomeIcon icon={faEnvelope} /></div>
							<a href="mailto:me&#64;jiripudil.cz">me&#64;jiripudil.cz</a>
						</li>
						<li>
							<div><FontAwesomeIcon icon={faPhone} /></div>
							<a href="tel:+420606351567">+420&nbsp;606&nbsp;351&nbsp;567</a>
						</li>
						<li>
							<div><FontAwesomeIcon icon={faKey} /></div>
							<a href="https://keys.openpgp.org/search?q=78A085087D1176DD9F2524B8D3344DC7AAE0703D">0xAAE0703D</a>
						</li>
						<li>
							<div><FontAwesomeIcon icon={faLocationDot} /></div>
							Brno, CZE
						</li>
						<li className={styles.twitter}>
							<div><FontAwesomeIcon icon={faTwitter} /></div>
							<a href="https://twitter.com/jiripudil">jiripudil</a>
						</li>
						<li className={styles.github}>
							<div><FontAwesomeIcon icon={faGithub} /></div>
							<a href="https://github.com/jiripudil">jiripudil</a>
						</li>
					</ul>

					<Pill href="/vcard.vcf" download={true} leftIcon={faAddressCard}>
						Download vCard
					</Pill>
				</div>

				<div className={styles.legal}>
					<h2>Legal</h2>
					<ul>
						<li>
							<div><FontAwesomeIcon icon={faAddressBook} /></div>
							<span>
								<strong>Jiří Pudil</strong><br />
								Hálkova 926<br />
								39601 Humpolec<br />
								Czech Republic
							</span>
						</li>
						<li>
							<div><FontAwesomeIcon icon={faBriefcase} /></div>
							<span>
								Registered in the Trade Register.<br />
								Reg. no. <a href="http://wwwinfo.mfcr.cz/cgi-bin/ares/darv_res.cgi?ico=04299604&jazyk=en&xml=1">04299604</a>
							</span>
						</li>
						<li>
							<div><FontAwesomeIcon icon={faBuildingColumns} /></div>
							<span>
								1018058758/5500<br />
								CZ2255000000001018058758<br />
								Raiffeisen Bank (RZBCCZPP)
							</span>
						</li>
						<li>
							<div><FontAwesomeIcon icon={faEnvelopeOpenText} /></div>
							<span>
								<a href="https://www.mojedatovaschranka.cz/sds/detail.do?dbid=hnsucky">hnsucky</a>
							</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</Layout>
);

export default AboutPage;
