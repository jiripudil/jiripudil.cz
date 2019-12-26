import React, {FunctionComponent} from 'react';
import Header from './Header';
import MainMenu from './MainMenu';
import Footer from './Footer';

import './Layout.module.scss';

interface LayoutProps {
	readonly isHomepage?: boolean;
}

const Layout: FunctionComponent<LayoutProps> = ({isHomepage, children}) => (
	<>
		<Header isHomepage={!!isHomepage} />
		<MainMenu />
		{children}
		<Footer />
	</>
);

export default Layout;
