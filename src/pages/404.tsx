import React, {FunctionComponent} from 'react';
import Hero from '../components/Hero';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import * as styles from './404.module.scss';

const NotFoundPage: FunctionComponent = () => (
	<Layout>
		<SEO title="Page not found" />

		<Hero>
			<h1 className={styles.heading}>Oops!</h1>
		</Hero>

		<div className={styles.error}>
			<p>
				<strong>The requested page could not be found on this server.</strong>
				{' '}
				Please make sure you've typed the address right or clicked a correct link.
			</p>
			<p>
				The issue has been logged and – if there's something I can do about it – will be taken care of soon.
			</p>
		</div>
	</Layout>
);

export default NotFoundPage;
