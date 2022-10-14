import {graphql} from 'gatsby';
import React, {type FunctionComponent, useState} from 'react';
import AboutMe from '../../components/AboutMe';
import Hero from '../../components/Hero';
import Layout from '../../components/Layout';
import SEO from '../../components/SEO';
import {classNames} from '../../utils/classNames';
import AllTags from '../components/AllTags';
import BlogPostBox from '../components/BlogPostBox';
import Pagination from '../components/Pagination';

import * as styles from './BlogPage.module.scss';

interface BlogPageProps {
	pageContext: {
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

const BlogPage: FunctionComponent<BlogPageProps> = (props) => {
	const [showTags, setShowTags] = useState(false);

	return (
		<Layout>
			<SEO title={'Blog'} />

			<Hero>
				<div className={styles.heading}>
					<h1 className={styles.mainHeading}>Blog</h1>
					<div className={classNames(styles.toggleTopics, showTags && styles.toggleTopicsActive)}>
						<button onClick={() => setShowTags(!showTags)}>Topics</button>
					</div>
				</div>

				{showTags && <AllTags />}
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
						linkToPage={(page) => page === 1 ? '/blog' : `/blog/${page}`}
					/>
				</div>

				<div className={styles.aboutMe}>
					<AboutMe />
				</div>
			</div>
		</Layout>
	);
};

export default BlogPage;
export const query = graphql`
	query BlogPageQuery($skip: Int!, $limit: Int!) {
		posts: allMarkdownRemark(
			filter: {frontmatter: {draft: {eq: false}}},
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
