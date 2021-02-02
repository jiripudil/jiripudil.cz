import {faCoffee} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Link} from 'gatsby';
import React, {FunctionComponent} from 'react';
import {classNames} from '../utils/classNames';

import photo from '../images/me.jpg';
import * as styles from './Header.module.scss';

interface HeaderProps {
	readonly isHomepage: boolean;
}

const Header: FunctionComponent<HeaderProps> = ({isHomepage}) => {
	return (
		<Link className={styles.link} to="/">
			<header className={classNames(
				styles.header,
				!isHomepage && styles.inlineHeader,
			)}>
				<div className={styles.picture}>
					<img src={photo} alt="Jiří Pudil" />
				</div>

				<div className={styles.content}>
					<div className={styles.greeting}>
						Hello, I&nbsp;am
					</div>
					<div className={styles.name}>
						Jiří Pudil
					</div>
					<div className={styles.motto}>
						I turn <FontAwesomeIcon icon={faCoffee} /> into <code>&lt;code&gt;</code>
					</div>
				</div>
			</header>
		</Link>
	);
};

export default Header;
