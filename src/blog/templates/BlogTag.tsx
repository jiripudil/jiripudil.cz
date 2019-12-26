import {graphql} from 'gatsby';
import React, {FunctionComponent} from 'react';
import Layout from '../../components/Layout';
import SEO from '../../components/SEO';
import BlogPostBox from '../components/BlogPostBox';
import Pagination from '../components/Pagination';

import * as styles from './BlogPage.module.scss';

interface BlogTagTemplateProps {
	pageContext: {
		tag: string
		numberOfPages: number
		currentPage: number
	}
	data: {
		posts: {
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
}

const BlogTagTemplate: FunctionComponent<BlogTagTemplateProps> = (props) => {
	return (
		<Layout>
			<SEO title={`Tag #${props.pageContext.tag} – Blog`} />

			<div className={styles.container}>
				<h1 className={styles.heading}>Blog &ndash; #{props.pageContext.tag}</h1>

				{props.data.posts.edges.map(({node}) => (
					<BlogPostBox
						key={node.frontmatter.slug}
						legacyId={node.frontmatter.legacyId}
						title={node.frontmatter.title}
						slug={node.frontmatter.slug}
						datetime={node.frontmatter.datetime}
						perex={node.frontmatter.perex}
						timeToRead={node.timeToRead}
						tags={node.frontmatter.tags}
						linkToPost={true}
					/>
				))}

				<Pagination
					numberOfPages={props.pageContext.numberOfPages}
					currentPage={props.pageContext.currentPage}
					linkToPage={(page) => page === 1
						? `/blog/tag/${props.pageContext.tag}`
						: `/blog/tag/${props.pageContext.tag}/${page}`
					}
				/>
			</div>
		</Layout>
	);
};

export default BlogTagTemplate;
export const query = graphql`
	query BlogTagQuery($tag: String!, $skip: Int!, $limit: Int!) {
		posts: allMarkdownRemark(
			filter: {frontmatter: {tags: {in: [$tag]}, draft: {eq: false}}},
			sort: {fields: [frontmatter___datetime], order: DESC},
			skip: $skip,
			limit: $limit
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
`;
