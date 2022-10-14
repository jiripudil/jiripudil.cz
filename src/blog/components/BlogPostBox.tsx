import {faAngleRight, faCalendarAlt, faClock} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Link} from 'gatsby';
import React, {FunctionComponent} from 'react';
import TimeAgo from 'react-timeago';

import * as styles from './BlogPostBox.module.scss';

interface BlogPostBoxProps {
	readonly title: string
	readonly slug: string
	readonly datetime: string
	readonly perex: string
	readonly timeToRead: number
}

const BlogPostBox: FunctionComponent<BlogPostBoxProps> = (props) => (
	<div className={styles.blogPost}>
		<Link to={`/blog/${props.slug}`}>
			<h3>{props.title}</h3>
			<p dangerouslySetInnerHTML={{__html: props.perex}} />
			<div className={styles.bottomLine}>
				<span className={styles.readMore}>
					Read more
				</span>
				<FontAwesomeIcon icon={faAngleRight} />

				<div className={styles.metadata}>
					<FontAwesomeIcon icon={faCalendarAlt} />
					<time dateTime={props.datetime}>
						<TimeAgo date={props.datetime} />
					</time>

					<FontAwesomeIcon icon={faClock} />
					{props.timeToRead} min read
				</div>
			</div>
		</Link>
	</div>
);

export default BlogPostBox;
