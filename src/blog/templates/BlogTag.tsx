import {graphql} from 'gatsby';
import React, {type FunctionComponent} from 'react';
import AboutMe from '../../components/AboutMe';
import Hero from '../../components/Hero';
import Layout from '../../components/Layout';
import SEO from '../../components/SEO';
import AllTags from '../components/AllTags';
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
						title: string
						slug: string
						datetime: string
						perex: string
					}
				}
			}[]
		}
	}
}

const BlogTagTemplate: FunctionComponent<BlogTagTemplateProps> = (props) => {
	return (
		<Layout>
			<SEO title={`Topic #${props.pageContext.tag} – Blog`} />

			<Hero>
				<h1 className={styles.mainHeading}>Blog &ndash; #{props.pageContext.tag}</h1>
				<AllTags activeTag={props.pageContext.tag} />
			</Hero>

			<div className={styles.wrapper}>
				<div className={styles.posts}>
					{props.data.posts.edges.map(({node}) => (
						<BlogPostBox
							key={node.frontmatter.slug}
							title={node.frontmatter.title}
							slug={node.frontmatter.slug}
							datetime={node.frontmatter.datetime}
							perex={node.frontmatter.perex}
							timeToRead={node.timeToRead}
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

				<div className={styles.aboutMe}>
					<AboutMe />
				</div>
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
						title
						slug
						datetime
						perex
					}
				}
			}
		}
	}
`;
