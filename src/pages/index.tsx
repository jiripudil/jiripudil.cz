import {faAngleRight, faCalendarAlt} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {graphql, Link} from 'gatsby';
import React, {type FunctionComponent} from 'react';
import BlogPostBox from '../blog/components/BlogPostBox';
import Hero from '../components/Hero';
import Layout from '../components/Layout';
import Pill from '../components/Pill';
import Recipe from '../components/Recipe';
import SEO from '../components/SEO';

import * as styles from './index.module.scss';

interface IndexPageProps {
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
		},
		talks: {
			edges: {
				node: {
					title: string
					description: string
					event: string
					eventUrl?: string
					date: string
					isoDate: string
				}
			}[]
		},
	}
}

const IndexPage: FunctionComponent<IndexPageProps> = ({data}) => (
	<Layout>
		<SEO title="Home" />

		<Hero>
			<div className={styles.whoami}>
				<div className={styles.profile}>
					<div className={styles.hello}>Hello, I am Jiří Pudil</div>
					<p>I am a full-stack web developer from Brno, Czech Republic. I contribute to open-source projects, write a technical blog, and speak at meetups and conferences.</p>
				</div>

				<div className={styles.recipe}>
					<Recipe />
				</div>
			</div>

			<div className={styles.learnMore}>
				<Pill as={Link} to="/about" rightIcon={faAngleRight}>
					Learn more about me
				</Pill>
			</div>
		</Hero>

		<div className={styles.featuredWrapper}>
			<div className={styles.fromMyBlog}>
				<h2>From my blog</h2>
				{data.posts.edges.map(({node}) => (
					<BlogPostBox
						key={node.frontmatter.slug}
						title={node.frontmatter.title}
						slug={node.frontmatter.slug}
						datetime={node.frontmatter.datetime}
						perex={node.frontmatter.perex}
						timeToRead={node.timeToRead}
					/>
				))}

				<Pill
					as={Link}
					to="/blog"
					rightIcon={faAngleRight}
				>
					Discover more posts
				</Pill>
			</div>

			<div className={styles.latestTalk}>
				<h2>Latest talk</h2>
				<h3>{data.talks.edges[0].node.title}</h3>
				<p>{data.talks.edges[0].node.description}</p>
				<div className={styles.talkMetadata}>
					<div className={styles.talkEvent}>
						@ {data.talks.edges[0].node.eventUrl
						? <a href={data.talks.edges[0].node.eventUrl}>{data.talks.edges[0].node.event}</a>
						: data.talks.edges[0].node.event
					}
					</div>
					<div className={styles.talkDate}>
						<time dateTime={data.talks.edges[0].node.isoDate}>
							<FontAwesomeIcon icon={faCalendarAlt} />
							{' '}
							{data.talks.edges[0].node.date}
						</time>
					</div>
				</div>

				<Pill
					as={Link}
					to="/talks"
					rightIcon={faAngleRight}
				>
					See more talks
				</Pill>
			</div>
		</div>
	</Layout>
);

export default IndexPage;
export const query = graphql`
	query IndexPageQuery {
        posts: allMarkdownRemark(
            filter: {frontmatter: {draft: {eq: false}}},
            sort: {fields: [frontmatter___datetime], order: DESC},
            limit: 2
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

        talks: allTalksJson(
            sort: {fields: [date], order: DESC}
	        limit: 1
        ) {
            edges {
                node {
                    title
                    description
                    event
	                eventUrl
                    date(formatString: "D MMM Y")
                    isoDate: date
                }
            }
        }
	}
`;
