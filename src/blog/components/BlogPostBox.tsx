import {faCalendarAlt, faComments} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {CommentCount} from 'disqus-react';
import {graphql, Link, useStaticQuery} from 'gatsby';
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
}

interface BlogPostBoxData {
	site: {
		siteMetadata: {
			siteUrl: string
			disqusShortname: string
		}
	}
}

const BlogPostBox: FunctionComponent<BlogPostBoxProps> = (props) => {
	const data = useStaticQuery<BlogPostBoxData>(graphql`
		query BlogPostBoxQuery {
			site {
				siteMetadata {
					siteUrl
					disqusShortname
				}
			}
		}
	`);

	return (
		<div className={styles.box}>
			<Link to={`/blog/${props.slug}`}>
				<h2 className={styles.title}>{props.title}</h2>
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

			<div className={styles.commentCount}>
				<FontAwesomeIcon icon={faComments} />
				{' '}
				<CommentCount
					shortname={data.site.siteMetadata.disqusShortname}
					config={{
						identifier: props.legacyId !== undefined ? String(props.legacyId) : props.slug,
						title: props.title,
						url: `${data.site.siteMetadata.siteUrl}/blog/${props.slug}`,
					}}
				>
					comments
				</CommentCount>
			</div>

			{props.linkToPost && <Link className={styles.more} to={`/blog/${props.slug}`}>
				Read more
			</Link>}
		</div>
	);
};

export default BlogPostBox;
