import {type IconDefinition} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {type FunctionComponent, memo} from 'react';
import * as styles from './Timeline.module.scss';

interface TimelineItemProps {
	readonly year: string;
	readonly company: string;
	readonly icon: IconDefinition;
	readonly description: React.ReactNode;
	readonly isCurrent: boolean;
	readonly isLast: boolean;
}

const TimelineItem: FunctionComponent<TimelineItemProps> = memo(({year, company, icon, description, isCurrent, isLast}) => {
	let heading = (
		<h3>
			<strong>
				{year}
				<FontAwesomeIcon icon={icon} />
			</strong>
			{company}
		</h3>
	);

	if ( ! isLast) {
		heading = <summary>{heading}</summary>;
	}

	let item = (
		<>
			{heading}
			{description}
		</>
	);

	if ( ! isLast) {
		item = (<details open={isCurrent}>{item}</details>);
	}

	return (
		<li>
			{item}
		</li>
	);
});

interface TimelineProps {
	readonly items: readonly Omit<TimelineItemProps, 'isLast'>[];
}

const Timeline: FunctionComponent<TimelineProps> = ({items}) => (
	<div className={styles.timeline}>
		<ul>
			{items.map((item, index) => (
				<TimelineItem
					{...item}
					isLast={index === items.length - 1}
				/>
			))}
		</ul>
	</div>
);

export default Timeline;
