import {faArrowRight, faCode, faMugHot} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {type FunctionComponent} from 'react';
import me from '../images/me.jpg';
import * as styles from './Recipe.module.scss';

const Recipe: FunctionComponent = () => (
	<div className={styles.recipe}>
		<div className={styles.input}>
			<FontAwesomeIcon icon={faMugHot} />
		</div>
		<div className={styles.flow}>
			<FontAwesomeIcon icon={faArrowRight} />
		</div>
		<div className={styles.me}>
			<img src={me} alt="My photo" />
		</div>
		<div className={styles.flow}>
			<FontAwesomeIcon icon={faArrowRight} />
		</div>
		<div className={styles.output}>
			<FontAwesomeIcon icon={faCode} />
		</div>
	</div>
);

export default Recipe;
