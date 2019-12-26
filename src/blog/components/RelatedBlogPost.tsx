import {graphql, useStaticQuery} from 'gatsby';
import React, {FunctionComponent} from 'react';
import BlogPostBox from './BlogPostBox';

import * as styles from './RelatedBlogPost.module.scss';

interface RelatedBlogPostProps {
	currentPost: {
		slug: string
		tags: string[]
	}
}

interface RelatedBlogPostQueryData {
	relatedPosts: {
		edges: {
			node: {
				timeToRead: number
				frontmatter: {
					legacyId?: number
					title: string
					slug: string
					datetime: string
					perex: string
					tags: string[]
				}
			}
		}[]
	}
}

const RelatedBlogPost: FunctionComponent<RelatedBlogPostProps> = (props) => {
	const data = useStaticQuery<RelatedBlogPostQueryData>(graphql`
		query RelatedBlogPosts {
			relatedPosts: allMarkdownRemark(
				filter: {frontmatter: {draft: {eq: false}}},
				sort: {fields: [frontmatter___datetime], order: DESC}
			) {
				edges {
					node {
						timeToRead
						frontmatter {
							legacyId
							title
							slug
							datetime
							perex
							tags
						}
					}
				}
			}
		}
	`);

	const allPosts = data.relatedPosts.edges
		.filter((post) => post.node.frontmatter.slug !== props.currentPost.slug)
		.map((post) => {
			let score = 0;
			props.currentPost.tags.forEach((tag) => {
				if (post.node.frontmatter.tags.includes(tag)) {
					score++;
				}
			});

			return {
				post: post.node,
				score,
			};
		});

	allPosts.sort((a, b) => {
		const score = b.score - a.score;
		if (score !== 0) {
			return score;
		}

		return (+new Date(b.post.frontmatter.datetime)) - (+new Date(a.post.frontmatter.datetime));
	});

	const relatedPost = allPosts[0];
	if (relatedPost === undefined || relatedPost.score === 0) {
		return null;
	}

	return (
		<div className={styles.container}>
			<div className={styles.heading}>
				More from my blog
			</div>

			<BlogPostBox
				legacyId={relatedPost.post.frontmatter.legacyId}
				title={relatedPost.post.frontmatter.title}
				slug={relatedPost.post.frontmatter.slug}
				datetime={relatedPost.post.frontmatter.datetime}
				perex={relatedPost.post.frontmatter.perex}
				timeToRead={relatedPost.post.timeToRead}
				tags={relatedPost.post.frontmatter.tags}
				linkToPost={true}
			/>
		</div>
	);
};

export default RelatedBlogPost;
