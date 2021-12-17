import {faCoffee} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {graphql} from 'gatsby';
import React, {FunctionComponent} from 'react';
import Layout from '../../components/Layout';
import SEO from '../../components/SEO';
import BlogPostBox from '../components/BlogPostBox';
import RelatedBlogPost from '../components/RelatedBlogPost';

import * as styles from './BlogPost.module.scss';

interface BlogPostTemplateProps {
	pageContext: {
		slug: string
	}
	data: {
		post: {
			html: string
			timeToRead: number
			frontmatter: {
				legacyId?: number
				title: string
				slug: string
				datetime: string
				cupsOfCoffee: number
				perex: string
				tags: string[]
			}
			fileAbsolutePath: string
		}
	}
}

const BlogPostTemplate: FunctionComponent<BlogPostTemplateProps> = (props) => {
	const {post} = props.data;
	return (
		<Layout>
			<SEO title={`${post.frontmatter.title} – Blog`} />

			<div className={styles.container}>
				<div className={styles.heading}>
					Blog
				</div>

				<BlogPostBox
					key={post.frontmatter.slug}
					title={post.frontmatter.title}
					slug={post.frontmatter.slug}
					datetime={post.frontmatter.datetime}
					perex={post.frontmatter.perex}
					timeToRead={post.timeToRead}
					tags={post.frontmatter.tags}
					linkToPost={false}
					heading={'h1'}
				/>

				<div className={styles.postBody} dangerouslySetInnerHTML={{__html: post.html}} />

				<div
					className={styles.discussion}
					ref={(container) => {
						if (container === null) {
							return;
						}

						// ensure script is loaded with correct paramts by removing cached elements remove cached children
						while (container?.firstChild) {
							container.removeChild(container.firstChild);
						}

						const utterances = document.createElement('script');
						utterances.src = 'https://utteranc.es/client.js';
						utterances.crossOrigin = 'anonymous';
						utterances.async = true;

						utterances.setAttribute('data-repo', 'jiripudil/jiripudil.cz');
						utterances.setAttribute('data-issue-term', 'og:title');
						utterances.setAttribute('data-label', '💬 blog discussion');
						utterances.setAttribute('data-theme', 'github-light');

						container.appendChild(utterances);
					}}
				/>

				<div className={styles.cupsOfCoffee}>
					This post took
					{' '}
					<span className={styles.coffee}>
						{post.frontmatter.cupsOfCoffee} <FontAwesomeIcon icon={faCoffee} title="cups of coffee" />
					</span>
					{' '}
					to write.

					<div>
						If you liked it, feel free to buy me one!
						<div>
							<iframe src="https://github.com/sponsors/jiripudil/button" title="Sponsor jiripudil" height="35" width="116" style={{border: 0}} />
						</div>
					</div>
				</div>

				<div className={styles.typo}>
					Have you found a typo in the post?
					<br/>
					Please <a href={`https://github.com/jiripudil/jiripudil.cz/edit/master/src/blog/posts/${encodeURIComponent(post.fileAbsolutePath.split(/.*[\/|\\]/)[1])}`}>submit a pull request</a> with a fix :)
				</div>

				<div className={styles.relatedPost}>
					<RelatedBlogPost currentPost={{
						slug: post.frontmatter.slug,
						tags: post.frontmatter.tags,
					}} />
				</div>
			</div>
		</Layout>
	);
};

export default BlogPostTemplate;
export const query = graphql`
	query BlogPostQuery($slug: String!) {
		post: markdownRemark(frontmatter: {slug: {eq: $slug}}) {
			html
			timeToRead
			frontmatter {
				legacyId
				title
				slug
				datetime
				cupsOfCoffee
				perex
				tags
			}
			fileAbsolutePath
		}
	}
`;
