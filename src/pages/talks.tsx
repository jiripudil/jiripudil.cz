import {faCalendarAlt, faMapMarkerAlt, faPresentation, faVideo} from '@fortawesome/pro-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {graphql} from 'gatsby';
import React, {FunctionComponent, memo} from 'react';
import Layout from '../components/Layout';
import SEO from '../components/SEO';

import * as styles from './talks.module.scss';
import {classNames} from '../utils/classNames';

interface TalksPageProps {
	data: {
		talks: {
			edges: {
				node: {
					title: string
					slidesUrl: string
					videoUrl: string
					description: string
					language: string
					event: string
					eventUrl: string
					date: string
					isoDate: string
				}
			}[]
		}
	}
}

const Flag: FunctionComponent<{language: string}> = memo(({language}) => {
	switch (language) {
		case 'cs':
			return <span className={classNames(styles.flag, styles.flagCzech)} title="Czech" />;

		case 'en':
		default:
			return <span className={classNames(styles.flag, styles.flagEnglish)} title="English" />;
	}
});

const TalksPage: FunctionComponent<TalksPageProps> = (props) => {
	return (
		<Layout>
			<SEO title={'Talks'} />

			<div className={styles.container}>
				<h1 className={styles.heading}>Talks</h1>

				<p>I have given a number of talks at meetups and conferences:</p>

				<ul className={styles.talks}>
					{props.data.talks.edges.map(({node}) => {
						return (
							<li key={node.title} className={styles.talk}>
								<div className={styles.title}>
									{node.title}
								</div>

								<p className={styles.description}>
									{node.description}
								</p>

								<div className={styles.event}>
									<FontAwesomeIcon icon={faCalendarAlt} />
									{' '}
									<time dateTime={node.isoDate}>{node.date}</time>
								</div>

								<div className={styles.event}>
									<FontAwesomeIcon icon={faMapMarkerAlt} />
									{' '}
									{node.eventUrl
										? <a href={node.eventUrl}>{node.event}</a>
										: node.event
									}
								</div>

								<div className={styles.links}>
									<span>
										<Flag language={node.language} />
									</span>

									{node.videoUrl && <a href={node.videoUrl}>
										<FontAwesomeIcon icon={faVideo} />
										{' '}
										video
									</a>}

									{node.slidesUrl && <a href={node.slidesUrl}>
										<FontAwesomeIcon icon={faPresentation} />
										{' '}
										slides
									</a>}
								</div>
							</li>
						);
					})}
				</ul>
			</div>
		</Layout>
	);
};

export default TalksPage;
export const query = graphql`
	query TalksPageQuery {
		talks: allTalksJson(
			sort: {fields: [date], order: DESC}
		) {
			edges {
				node {
					title
					slidesUrl
					videoUrl
					description
					language
					event
					eventUrl
					date(formatString: "D MMM Y")
					isoDate: date
				}
			}
		}
	}
`;
