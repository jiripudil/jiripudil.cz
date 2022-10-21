import {faArrowRight, faCode, faMugHot} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {StaticImage} from 'gatsby-plugin-image';
import React, {type FunctionComponent} from 'react';
import * as styles from './Recipe.module.scss';

const Recipe: FunctionComponent = () => (
	<div className={styles.recipe}>
		<div className={styles.input}>
			<FontAwesomeIcon icon={faMugHot} />
		</div>
		<div className={styles.flow}>
			<FontAwesomeIcon icon={faArrowRight} />
		</div>
		<div>
			<StaticImage
				className={styles.me}
				src="../images/me.jpg"
				alt="My photo"
				width={96}
				height={96}
				placeholder="blurred"
			/>
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
