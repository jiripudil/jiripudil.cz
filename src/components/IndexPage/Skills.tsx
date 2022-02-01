import React, {FunctionComponent} from 'react';
import {classNames} from '../../utils/classNames';

import * as styles from './Skills.module.scss';

interface SkillsProps {
	readonly className: string;
}

interface Skill {
	readonly name: string;
	readonly levelClassName: string;
	readonly color: string;
}

const skills: Skill[] = [
	{name: 'php', levelClassName: styles.skillMeter5, color: '#8892bf'},
	{name: 'nettefw', levelClassName: styles.skillMeter5, color: '#3484d2'},
	{name: 'doctrine2', levelClassName: styles.skillMeter4, color: '#fc6a31'},
	{name: 'mysql', levelClassName: styles.skillMeter2, color: '#e48e00'},
	{name: 'postgresql', levelClassName: styles.skillMeter5, color: '#336791'},
	{name: 'elasticsearch', levelClassName: styles.skillMeter3, color: '#5e8830'},
	{name: 'redis', levelClassName: styles.skillMeter3, color: '#d82c20'},
	{name: 'rabbitmq', levelClassName: styles.skillMeter3, color: '#f26822'},
	{name: 'javascript', levelClassName: styles.skillMeter5, color: '#f0db4f'},
	{name: 'typescript', levelClassName: styles.skillMeter5, color: '#007acc'},
	{name: 'reactjs', levelClassName: styles.skillMeter5, color: '#61dafb'},
	{name: 'gatsbyjs', levelClassName: styles.skillMeter3, color: '#362066'},
	{name: 'nextjs', levelClassName: styles.skillMeter3, color: '#111'},
	{name: 'nodejs', levelClassName: styles.skillMeter4, color: '#689f63'},
	{name: 'kotlin', levelClassName: styles.skillMeter4, color: '#7f52ff'},
	{name: 'android', levelClassName: styles.skillMeter1, color: '#3ddc84'},
	{name: 'ios', levelClassName: styles.skillMeter1, color: '#555555'},
	{name: 'git', levelClassName: styles.skillMeter5, color: '#f14e32'},
	{name: 'linux', levelClassName: styles.skillMeter3, color: '#d70751'},
	{name: 'nginx', levelClassName: styles.skillMeter3, color: '#090'},
	{name: 'docker', levelClassName: styles.skillMeter4, color: '#56beee'},
];

const Skills: FunctionComponent<SkillsProps> = (props) => (
	<div className={props.className}>
		<ul className={styles.skillList}>
			{skills.map((skill) => (
				<li
					key={skill.name}
					className={styles.skill}
					style={{color: skill.color}}
				>
					#{skill.name}

					<div
						className={classNames(
							styles.skillMeter,
							skill.levelClassName,
						)}
					/>
				</li>
			))}
		</ul>

		<div className={styles.languages}>
			<ul>
				<li title="Czech: native speaker">
					<span className={classNames(styles.flag, styles.flagCzech)} />
					{' '}
					native
				</li>
				<li title="English: proficient (C1)">
					<span className={classNames(styles.flag, styles.flagEnglish)} />
					{' '}
					C1
				</li>
				<li title="German: lower intermediate (B1)">
					<span className={classNames(styles.flag, styles.flagGerman)} />
					{' '}
					B1
				</li>
				<li title="Spanish: beginner (A2)">
					<span className={classNames(styles.flag, styles.flagSpanish)} />
					{' '}
					A2
				</li>
			</ul>
		</div>
	</div>
);

export default Skills;
