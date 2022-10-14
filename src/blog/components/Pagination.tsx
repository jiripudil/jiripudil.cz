import {faAngleLeft, faAngleRight} from '@fortawesome/free-solid-svg-icons';
import {Link} from 'gatsby';
import React, {type FunctionComponent} from 'react';
import {Helmet} from 'react-helmet';
import Pill from '../../components/Pill';
import * as styles from './Pagination.module.scss';

interface PaginationProps {
	readonly numberOfPages: number
	readonly currentPage: number
	readonly linkToPage: (page: number) => string
}

const Pagination: FunctionComponent<PaginationProps> = (props) => {
	const isFirst = props.currentPage === 1;
	const isLast = props.currentPage === props.numberOfPages;

	if (props.numberOfPages === 1) {
		return null;
	}

	return (
		<>
			<Helmet>
				{!isFirst && <link rel="prev" href={props.linkToPage(props.currentPage - 1)} />}
				{!isLast && <link rel="next" href={props.linkToPage(props.currentPage + 1)} />}
			</Helmet>

			<div className={styles.paginator}>
				{!isFirst && (
					<Pill
						as={Link}
						to={props.linkToPage(props.currentPage - 1)}
						leftIcon={faAngleLeft}
					>
						Newer posts
					</Pill>
				)}

				{!isLast && (
					<Pill
						as={Link}
						to={props.linkToPage(props.currentPage + 1)}
						rightIcon={faAngleRight}
					>
						Older posts
					</Pill>
				)}
			</div>
		</>
	);
};

export default Pagination;
