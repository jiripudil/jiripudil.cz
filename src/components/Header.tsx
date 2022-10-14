import {Link} from 'gatsby';
import React, {type FunctionComponent} from 'react';
import MainMenu from './MainMenu';
import * as styles from './Header.module.scss';

const Header: FunctionComponent = () => (
	<header className={styles.header}>
		<div className={styles.title}>
			<Link to="/">
				@jiripudil
			</Link>
		</div>

		<MainMenu className={styles.mainMenu} />
	</header>
);

export default Header;
