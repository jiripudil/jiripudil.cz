import {faBars} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Link} from 'gatsby';
import React, {type FunctionComponent} from 'react';
import {classNames} from '../utils/classNames';
import * as styles from './MainMenu.module.scss';

interface MainMenuProps {
	readonly className: string;
}

const MainMenu: FunctionComponent<MainMenuProps> = ({className}) => (
	<nav className={classNames(styles.nav, className)}>
		<input type="checkbox" id="menu-toggle" className={styles.menuToggle} />
		<label htmlFor="menu-toggle" className={styles.menuToggleLabel}>
			<FontAwesomeIcon icon={faBars} />
		</label>

		<ul className={styles.menu}>
			<li className={styles.menuItem}>
				<Link to="/about" className={styles.link} activeClassName={styles.activeLink}>
					About
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
