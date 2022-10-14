import React, {type FunctionComponent, type PropsWithChildren} from 'react';
import Header from './Header';
import Footer from './Footer';

import './Layout.module.scss';

const Layout: FunctionComponent<PropsWithChildren> = ({children}) => (
	<>
		<Header />
		{children}
		<Footer />
	</>
);

export default Layout;
