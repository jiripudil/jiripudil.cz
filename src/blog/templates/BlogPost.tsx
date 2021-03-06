import {faCoffee} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {DiscussionEmbed} from 'disqus-react';
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
		site: {
			siteMetadata: {
				disqusShortname: string
				siteUrl: string
			}
		}
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
	const {post, site} = props.data;
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

				<div className={styles.cupsOfCoffee}>
					This post took
					{' '}
					<span className={styles.coffee}>
						{post.frontmatter.cupsOfCoffee} <FontAwesomeIcon icon={faCoffee} title="cups of coffee" />
					</span>
					{' '}
					to write.

					<p>
						If you liked it, feel free to buy me one!
						<div>
							<iframe src="https://github.com/sponsors/jiripudil/button" title="Sponsor jiripudil" height="35" width="116" style={{border: 0}} />
						</div>
					</p>
				</div>

				<div className={styles.typo}>
					Have you found a typo in the post?
					<br/>
					Please <a href={`https://github.com/jiripudil/jiripudil.cz/edit/master/src/blog/posts/${encodeURIComponent(post.fileAbsolutePath.split(/.*[\/|\\]/)[1])}`}>submit a pull request</a> with a fix :)
				</div>

				<div className={styles.discussion}>
					<DiscussionEmbed
						shortname={site.siteMetadata.disqusShortname}
						config={{
							identifier: !!post.frontmatter.legacyId ? String(post.frontmatter.legacyId) : post.frontmatter.slug,
							title: post.frontmatter.title,
							url: `${site.siteMetadata.siteUrl}/blog/${post.frontmatter.slug}`,
						}}
					/>
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
		site {
			siteMetadata {
				disqusShortname
				siteUrl
			}
		}
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
