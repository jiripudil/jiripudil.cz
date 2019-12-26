import React, {FunctionComponent} from 'react';
import Layout from '../components/Layout';
import SEO from '../components/SEO';

const NotFoundPage: FunctionComponent = () => (
	<Layout>
		<SEO title="Page not found" />
		<h1>Oops!</h1>
		<p>
			<strong>The requested page could not be found on this server.</strong>
			{' '}
			Please make sure you've typed the address right or clicked a correct link.
		</p>
		<p>
			The issue has been logged and – if there's something I can do about it – will be taken care of soon.
		</p>
	</Layout>
);

export default NotFoundPage;
