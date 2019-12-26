import {Link} from 'gatsby';
import React, {FunctionComponent} from 'react';
import {Helmet} from 'react-helmet';
import {classNames} from '../../utils/classNames';

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

			<ul className={styles.paginator}>
				{Array.from({length: props.numberOfPages}).map((_, index) => {
					const page = index + 1;
					const isCurrent = page === props.currentPage;
					return <li key={page} className={classNames(styles.page, isCurrent && styles.currentPage)}>
						<Link to={props.linkToPage(page)}>{page}</Link>
					</li>;
				})}
			</ul>
		</>
	);
};

export default Pagination;
