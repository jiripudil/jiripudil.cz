import {Link} from 'gatsby';
import React, {FunctionComponent} from 'react';

import peckadesign from '../../images/timeline/peckadesign.png';
import rohlik from '../../images/timeline/rohlik.png';
import muni from '../../images/timeline/muni.png';
import grifart from '../../images/timeline/grifart.jpg';
import smartlook from '../../images/timeline/smartlook.png';
import oops from '../../images/timeline/oops.png';

import * as styles from './Timeline.module.scss';

interface TimelineProps {}

interface TimelineItem {
	readonly year: string;
	readonly company: string;
	readonly image: string;
	readonly description: React.ReactNode;
}

const timeline: TimelineItem[] = [
	{
		year: '2012',
		company: 'PeckaDesign',
		image: peckadesign,
		description: <p>I started my professional career at PeckaDesign in Brno. I spent the vast majority of my three years there working on Megapixel.cz, a leading Czech e-commerce site for photographers. I helped rethink and refactor the community gallery code, and implemented an online photolab service, handling large amounts of uploaded files via modern JavaScript (XHR2) and Nginx’s file upload module.</p>,
	},
	{
		year: '2015',
		company: 'Rohlik.cz',
		image: rohlik,
		description: <p>Rohlik.cz is a Czech startup running an electronic grocery store, delivering goods in the Czech Republic’s two largest cities, Prague and Brno. Dispatching over 1500 orders each day, the project’s codebase utilized technologies such as Elasticsearch to list products without relational database lookups, or RabbitMQ to perform various tasks asynchronously.</p>,
	},
	{
		year: '2016',
		company: 'Bachelor’s degree',
		image: muni,
		description: <>
			<p><em>Faculty of Informatics, Masaryk University in Brno</em></p>
			<p>In mid-2016, I finished writing my thesis – a single-page JavaScript chatting app, with React.js on the front end and Express and MongoDB on the back end. I implemented Google’s Web Speech API so that users could navigate the app, dictate messages and have them read, all without using the keyboard. I successfully defended the thesis, passed my state exams and got a bachelor’s degree.</p>
		</>,
	},
	{
		year: '2016',
		company: 'Grifart',
		image: grifart,
		description: <p>Since 2016 I’ve been helping Grifart, a Brno-based company organizing medicinal congresses, rebuild their registration system so that all the processes that can be automated are automated. I have also occassionally worked on React.js front-ends, and I’ve helped set up infrastructure components like Nginx-based reverse proxy or a logging server built with the Elastic stack.</p>,
	},
	{
		year: '2018',
		company: 'Smartlook',
		image: smartlook,
		description: <p>In mid-2018 I started working with Smartlook, a Czech startup providing website and mobile app analytics based on visitor recordings. With PHP being only a small part of the whole cloud-based solution, I also got in touch with React and Node.js applications written in TypeScript, and I’ve got to know Docker better.</p>,
	},
	{
		year: 'always',
		company: 'giving back to the community',
		image: oops,
		description: <p>The community has given me so much that it’s only natural that I give back to it whenever I can. I try to help people on <a href="https://forum.nette.org/cs/profile.php?id=3206">Nette forum</a>, write <Link to="/blog">this blog</Link>, give <Link to="/talks">talks at meetups</Link>, help <a href="http://people.php.net/jiripudil">keep the PHP documentation</a> up-to-date, and <a href="https://github.com/jiripudil">contribute to</a> or even create and/or maintain a number of <a href="https://github.com/o2ps">open source projects</a>.</p>,
	},
];

const Timeline: FunctionComponent<TimelineProps> = () => (
	<div className={styles.timeline}>
		<ul className={styles.list}>
			{timeline.map(({year, company, image, description}) => (
				<li key={company} className={styles.item}>
					<div className={styles.logo}>
						<img src={image} alt={company} />
					</div>

					<span className={styles.year}>{year}</span>
					<span className={styles.company}>{company}</span>
					{description}
				</li>
			))}
		</ul>
	</div>
);

export default Timeline;
