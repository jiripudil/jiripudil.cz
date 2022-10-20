import {faClose} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {graphql, Link, useStaticQuery} from 'gatsby';
import React, {type FunctionComponent} from 'react';
import {classNames} from '../../utils/classNames';
import * as styles from './AllTags.module.scss';

interface AllTagsQueryData {
	posts: {
		edges: {
			node: {
				frontmatter: {
					tags: string[]
				}
			}
		}[]
	}
}

interface AllTagsProps {
	readonly isOpen: boolean;
	readonly activeTag?: string;
}

export const AllTags: FunctionComponent<AllTagsProps> = ({isOpen, activeTag}) => {
	const data = useStaticQuery<AllTagsQueryData>(graphql`
		query AllTags {
			posts: allMarkdownRemark(
				filter: {frontmatter: {draft: {eq: false}}}
			) {
				edges {
					node {
						frontmatter {
							tags
						}
					}
				}
			}
		}
	`);

	const allTags = data.posts.edges.flatMap(({node}) => node.frontmatter.tags);
	allTags.sort((a, b) => a.localeCompare(b));

	const uniqueTags = new Map<string, number>();
	for (const tag of allTags) {
		const count = uniqueTags.get(tag) ?? 0
		uniqueTags.set(tag, count + 1)
	}

	return (
		<div className={classNames(styles.tags, isOpen && styles.open)}>
			<ul>
				{Array.from(uniqueTags).map(([tag, count]) => (
					<li className={classNames(tag === activeTag && styles.activeTag)}>
						<Link to={`/blog/tag/${tag}`}>
							{tag}
							<span className={styles.count}>{count}</span>
						</Link>

						{tag === activeTag && (
							<span className={styles.clear}>
								<Link to="/blog">
									<FontAwesomeIcon icon={faClose} />
								</Link>
							</span>
						)}
					</li>
				))}
			</ul>
		</div>
	);
};

export default AllTags;
