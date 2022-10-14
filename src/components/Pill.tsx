import {type IconDefinition} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {PropsWithChildren} from 'react';
import {classNames} from '../utils/classNames';
import * as styles from './Pill.module.scss';

interface PillProps<T extends React.ElementType> {
	readonly as?: T;
	readonly className?: string;
	readonly leftIcon?: IconDefinition;
	readonly rightIcon?: IconDefinition;
}

function Pill<T extends React.ElementType = 'a'>({as, children, className, leftIcon, rightIcon, ...props}: PropsWithChildren<PillProps<T>> & Omit<React.ComponentPropsWithoutRef<T>, keyof PillProps<T>>) {
	const Component = as || 'a';
	return (
		<Component {...props} className={classNames(styles.pill, className ?? false)}>
			{leftIcon !== undefined && <FontAwesomeIcon icon={leftIcon} />}
			<span>{children}</span>
			{rightIcon !== undefined && <FontAwesomeIcon icon={rightIcon} />}
		</Component>
	);
}

export default Pill;
