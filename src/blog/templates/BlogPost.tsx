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

						const giscus = document.createElement('script');
						giscus.src = 'https://giscus.app/client.js';
						giscus.crossOrigin = 'anonymous';
						giscus.async = true;

						giscus.setAttribute('data-repo', 'jiripudil/jiripudil.cz');
						giscus.setAttribute('data-repo-id', 'MDEwOlJlcG9zaXRvcnkyNTI5NzY3Nw==');
						giscus.setAttribute('data-category', 'Blog discussions');
						giscus.setAttribute('data-category-id', 'DIC_kwDOAYIDDc4CAfUM');
						giscus.setAttribute('data-mapping', 'og:title');
						giscus.setAttribute('data-reactions-enabled', '1');
						giscus.setAttribute('data-emit-metadata', '0');
						giscus.setAttribute('data-theme', 'light');
						giscus.setAttribute('data-lang', 'en');

						container.appendChild(giscus);
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
