import {faCalendarAlt} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Link} from 'gatsby';
import React, {FunctionComponent} from 'react';
import TimeAgo from 'react-timeago';

import * as styles from './BlogPostBox.module.scss';

interface BlogPostBoxProps {
	readonly legacyId?: number
	readonly title: string
	readonly slug: string
	readonly datetime: string
	readonly perex: string
	readonly timeToRead: number
	readonly tags: string[]
	readonly linkToPost: boolean
	readonly heading?: 'h1' | 'h2'
}

const BlogPostBox: FunctionComponent<BlogPostBoxProps> = (props) => {
	const Heading = props.heading ?? 'h2';
	return (
		<div className={styles.box}>
			<Link to={`/blog/${props.slug}`}>
				<Heading className={styles.title}>{props.title}</Heading>
			</Link>

			<p className={styles.perex} dangerouslySetInnerHTML={{__html: props.perex}} />

			<ul className={styles.tags}>
				{props.tags.map((tag) => <li key={tag}>
					<Link to={`/blog/tag/${tag}`}>
						#{tag}
					</Link>
				</li>)}
			</ul>

			<div className={styles.publishedAt}>
				<FontAwesomeIcon icon={faCalendarAlt} />
				{' '}
				<time dateTime={props.datetime}>
					<TimeAgo date={props.datetime} />
				</time>
			</div>

			{props.linkToPost && <Link className={styles.more} to={`/blog/${props.slug}`}>
				Read more
			</Link>}
		</div>
	);
};

export default BlogPostBox;
