import {faCalendarAlt, faChalkboard, faPlay} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {graphql} from 'gatsby';
import React, {type FunctionComponent, memo} from 'react';
import AboutMe from '../components/AboutMe';
import Hero from '../components/Hero';
import Layout from '../components/Layout';
import Pill from '../components/Pill';
import SEO from '../components/SEO';
import {classNames} from '../utils/classNames';
import * as styles from './talks.module.scss';

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

			<Hero>
				<h1 className={styles.heading}>Talks</h1>
			</Hero>

			<div className={styles.wrapper}>
				<div className={styles.talks}>
					{props.data.talks.edges.map(({node}) => (
						<div key={node.title} className={styles.talk}>
							<h2>{node.title}</h2>

							<div className={styles.downloads}>
								{node.videoUrl && (
									<Pill
										href={node.videoUrl}
										className={styles.downloadPill}
										leftIcon={faPlay}
									>
										Recording
										<Flag language={node.language} />
									</Pill>
								)}

								{node.slidesUrl && (
									<Pill
										href={node.slidesUrl}
										className={styles.downloadPill}
										leftIcon={faChalkboard}
									>
										Slides
									</Pill>
								)}
							</div>

							<p>{node.description}</p>

							<div className={styles.metadata}>
								<div className={styles.event}>
									@ {node.eventUrl
										? <a href={node.eventUrl}>{node.event}</a>
										: node.event
									}
								</div>
								<div className={styles.date}>
									<time dateTime={node.isoDate}>
										<FontAwesomeIcon icon={faCalendarAlt} />
										{' '}
										{node.date}
									</time>
								</div>
							</div>
						</div>
					))}
				</div>

				<div className={styles.aboutMe}>
					<AboutMe />
				</div>
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
