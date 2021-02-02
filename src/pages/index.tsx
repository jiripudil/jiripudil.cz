import {faAddressBook, faBriefcase, faEnvelope, faEnvelopeOpenText, faKey, faMapMarkerAlt, faMoneyBill, faPhoneAlt} from '@fortawesome/free-solid-svg-icons';
import {faGithub, faTwitter} from '@fortawesome/free-brands-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {FunctionComponent} from 'react';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import Timeline from '../components/IndexPage/Timeline';
import Skills from '../components/IndexPage/Skills';
import {classNames} from '../utils/classNames';

import * as styles from './index.module.scss';

const IndexPage: FunctionComponent = () => (
	<Layout isHomepage={true}>
		<SEO title="Home" />

		<div className={styles.profile}>
			<h2 className={styles.profileHeading}>
				whoami
			</h2>

			<div className={styles.profileContent}>
				<div className={styles.bio}>
					<p>I started playing with PHP back in 2009 and have been developing in it professionally since 2012. I am most proficient with Nette Framework and Doctrine 2 ORM. I’ve also fallen in love with modern JavaScript, both client-side with React.js and server-side with Node, Express, etc. I have worked with MySQL, PostgreSQL, Elasticsearch, Redis, RabbitMQ and other exciting technologies. I also manage my own little Debian VPS that runs Nginx and PHP-FPM, as well as some of the aforementioned software.</p>
					<p>I use common sense at work and enjoy participating in the design process of web development as well. I strive to make websites as easy to use and navigate as possible. My primary focus is still development, though.</p>
					<Timeline />
				</div>

				<Skills className={styles.skills} />
			</div>
		</div>

		<div className={styles.contact}>
			<div className={styles.contactContent}>
				<div className={styles.contactContentContainer}>
					<div className={styles.contactContentContainerItem}>
						<ul className={styles.contactDirect}>
							<li>
								<FontAwesomeIcon icon={faEnvelope} fixedWidth={true} />
								{' '}
								<a href="mailto:me@jiripudil.cz">
									me&#64;jiripudil.cz
								</a>
							</li>
							<li>
								<FontAwesomeIcon icon={faPhoneAlt} fixedWidth={true} />
								{' '}
								<a href="tel:+420606351567">
									+420 606 351 567
								</a>
							</li>
							<li>
								<FontAwesomeIcon icon={faEnvelopeOpenText} fixedWidth={true} />
								{' '}
								<a href="https://www.mojedatovaschranka.cz/sds/detail.do?dbid=hnsucky">
									hnsucky
								</a>
							</li>
							<li>
								<FontAwesomeIcon icon={faMapMarkerAlt} fixedWidth={true} />
								{' '}
								Brno, CZ
							</li>
						</ul>

						<ul className={styles.contactSocial}>
							<li className={styles.contactSocialGithub}>
								<a href="https://github.com/jiripudil">
									<FontAwesomeIcon icon={faGithub} />
								</a>
							</li>
							<li className={styles.contactSocialTwitter}>
								<a href="https://twitter.com/jiripudil">
									<FontAwesomeIcon icon={faTwitter} />
								</a>
							</li>
						</ul>
					</div>

					<div className={classNames(styles.contactContentContainerItem, styles.contactMail)}>
						<div>
							<FontAwesomeIcon icon={faAddressBook} />
						</div>
						<div>
							<strong>Jiří Pudil</strong><br />
							Hálkova 926<br />
							39601 Humpolec<br />
							Czech Republic
						</div>
					</div>

					<div className={classNames(styles.contactContentContainerItem, styles.contactRegistration)}>
						<div>
							<FontAwesomeIcon icon={faBriefcase} />
						</div>
						<div>
							Registered in the Trade Register,<br />
							reg. no. <a href="http://wwwinfo.mfcr.cz/cgi-bin/ares/darv_res.cgi?ico=04299604&jazyk=en&xml=1">04299604</a>
						</div>
					</div>

					<div className={classNames(styles.contactContentContainerItem, styles.contactBank)}>
						<div>
							<FontAwesomeIcon icon={faMoneyBill} />
						</div>
						<div>
							1018058758/6100<br />
							CZ5761000000001018058758<br />
							EquaBank (EQBKCZPP)
						</div>
					</div>
				</div>

				<ul className={styles.contactKeys}>
					<li>
						<div>
							<FontAwesomeIcon icon={faKey} />
							{' '}
							GPG
						</div>
						<a href="https://keybase.io/jiripudil">
							<code>
								78A0&nbsp;8508&nbsp;7D11&nbsp;76DD&nbsp;9F25&nbsp;24B8&nbsp;D334&nbsp;4DC7&nbsp;AAE0&nbsp;703D
							</code>
						</a>
					</li>
					<li>
						<div>
							<FontAwesomeIcon icon={faKey} />
							{' '}
							SSH
						</div>
						<a href="/id_ed25519.pub">
							<code>
								SHA256:xOMSl/tT/iIjaQX58FlHrSYLzvEnrzqAS7o1WGu0pZ4
							</code>
						</a>
					</li>
				</ul>
			</div>
		</div>
	</Layout>
);

export default IndexPage;
