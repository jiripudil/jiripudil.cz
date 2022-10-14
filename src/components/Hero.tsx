import React, {type FunctionComponent, type PropsWithChildren} from 'react';
import * as styles from './Hero.module.scss';

const Hero: FunctionComponent<PropsWithChildren> = ({children}) => (
	<div className={styles.heroWrapper}>
		<div className={styles.hero}>
			{children}
		</div>
	</div>
);

export default Hero;
