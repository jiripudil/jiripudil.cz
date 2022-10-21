import {faCalendarAlt, faClock} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {graphql, Link} from 'gatsby';
import React, {type FunctionComponent} from 'react';
import TimeAgo from 'react-timeago';
import AboutMe from '../../components/AboutMe';
import Hero from '../../components/Hero';
import Layout from '../../components/Layout';
import SEO from '../../components/SEO';
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

			<Hero>
				<div className={styles.heading}>
					<h1>{post.frontmatter.title}</h1>
					<p dangerouslySetInnerHTML={{__html: post.frontmatter.perex}}></p>
				</div>

				<div className={styles.metadata}>
					<div className={styles.topics}>
						<ul>
							{post.frontmatter.tags.map((tag) => (
								<li key={tag}>
									<Link to={`/blog/tag/${tag}`}>
										{tag}
									</Link>
								</li>
							))}
						</ul>
					</div>

					<div className={styles.readingTime}>
						<FontAwesomeIcon icon={faCalendarAlt} />
						{' '}
						<time dateTime={post.frontmatter.datetime}>
							<TimeAgo date={post.frontmatter.datetime} />
						</time>

						<FontAwesomeIcon icon={faClock} />
						{' '}
						{post.timeToRead} min read
					</div>
				</div>
			</Hero>

			<div
				className={styles.postBody}
				dangerouslySetInnerHTML={{__html: post.html}}
			/>

			<div className={styles.discussion}>
				<div
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
			</div>

			<div className={styles.typoWrapper}>
				<div className={styles.typo}>
					<strong>Have you found a <span>tpyo</span> in the post?</strong>
					{' '}
					Please <a href={`https://github.com/jiripudil/jiripudil.cz/edit/master/src/blog/posts/${encodeURIComponent(post.fileAbsolutePath.split(/.*[\/|\\]/)[1])}`}>submit a pull request</a> with a fix :)
				</div>
			</div>

			<div className={styles.relatedPostWrapper}>
				<div className={styles.relatedPost}>
					<RelatedBlogPost
						currentPost={{
							slug: post.frontmatter.slug,
							tags: post.frontmatter.tags,
						}}
					/>
				</div>

				<div className={styles.aboutMe}>
					<AboutMe />
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
