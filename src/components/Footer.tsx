import {faCreativeCommons, faCreativeCommonsBy} from '@fortawesome/free-brands-svg-icons';
import {faHeart} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {type FunctionComponent} from 'react';
import * as styles from './Footer.module.scss';
import Pill from './Pill';

const Footer: FunctionComponent = () => (
	<>
		<div className={styles.sponsorshipWrapper}>
			<div className={styles.sponsorship}>
				If you like what I do and want to support me, feel free to
				{' '}
				<Pill
					href="https://github.com/sponsors/jiripudil"
					className={styles.sponsor}
					leftIcon={faHeart}
				>
					Sponsor
				</Pill>
				{' '}
				me.
			</div>
		</div>

		<footer className={styles.footer}>
			Content licensed under
			{' '}
			<a
				href="https://creativecommons.org/licenses/by/4.0/"
				title="Creative Commons Attribution 4.0 International"
				className={styles.licenseLink}
			>
				<FontAwesomeIcon icon={faCreativeCommons} />
				<FontAwesomeIcon icon={faCreativeCommonsBy} />
			</a>
		</footer>
	</>
);

export default Footer;
