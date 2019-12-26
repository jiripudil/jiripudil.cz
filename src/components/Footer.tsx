import {faCreativeCommons, faCreativeCommonsBy} from '@fortawesome/free-brands-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {FunctionComponent} from 'react';

import * as styles from './Footer.module.scss';

interface FooterProps {}

const Footer: FunctionComponent<FooterProps> = (props) => (
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
);

export default Footer;
