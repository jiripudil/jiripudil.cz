import {faBars} from '@fortawesome/pro-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Link} from 'gatsby';
import React, {FunctionComponent} from 'react';

import * as styles from './MainMenu.module.scss';

interface MainMenuProps {}

const MainMenu: FunctionComponent<MainMenuProps> = (props) => (
	<nav className={styles.mainMenu}>
		<div className={styles.icon}>
			<FontAwesomeIcon icon={faBars} />
		</div>
		<ul className={styles.menu}>
			<li className={styles.menuItem}>
				<Link to="/" className={styles.link} activeClassName={styles.activeLink}>
					About me
				</Link>
			</li>

			<li className={styles.menuItem}>
				<Link to="/blog" partiallyActive={true} className={styles.link} activeClassName={styles.activeLink}>
					Blog
				</Link>
			</li>

			<li className={styles.menuItem}>
				<Link to="/talks" className={styles.link} activeClassName={styles.activeLink}>
					Talks
				</Link>
			</li>
		</ul>
	</nav>
);

export default MainMenu;
