import {faArrowRight} from '@fortawesome/free-solid-svg-icons';
import {Link} from 'gatsby';
import React, {type FunctionComponent} from 'react';
import Pill from '../components/Pill';
import Recipe from '../components/Recipe';
import * as styles from './AboutMe.module.scss';

const AboutMe: FunctionComponent = () => (
	<div className={styles.aboutMe}>
		<h2>Hello, I am Jiří Pudil</h2>
		<Recipe />
		<p>I am a full-stack web developer from Brno, Czech Republic. I contribute to open-source projects, write a technical blog, and speak at meetups and conferences.</p>

		<Pill
			as={Link}
			to="/about"
			rightIcon={faArrowRight}
		>
			Learn more about me
		</Pill>
	</div>
);

export default AboutMe;
