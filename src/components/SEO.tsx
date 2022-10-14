import {graphql, useStaticQuery} from 'gatsby';
import React, {type FunctionComponent, type PropsWithChildren} from 'react';
import {Helmet} from 'react-helmet';

interface SEOProps {
	readonly title: string;
	readonly description?: string;
}

const SEO: FunctionComponent<PropsWithChildren<SEOProps>> = (props) => {
	const data = useStaticQuery(graphql`
		query SEOStaticQuery {
			site {
				siteMetadata {
					title
					description
					author
				}
			}
		}
	`);

	return <Helmet
		htmlAttributes={{lang: 'en'}}
		title={props.title}
		titleTemplate={`%s – ${data.site.siteMetadata.title}`}
	>
		<meta charSet={'utf-8'} />
		<meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1" />

		<meta name="description" content={props.description || data.site.siteMetadata.description} />

		<meta property="fb:admins" content="1625947532" />
		<meta name="google-site-verification" content="7fHBkeNq7LXO24W8IjCc37NT9MX-6RJxD3Co5F-bRQw" />

		<meta property="og:title" content={props.title} />
		<meta property="og:description" content={props.description || data.site.siteMetadata.description} />
		<meta property="og:type" content="website" />

		<meta name="twitter:dnt" content="on" />
		<meta name="twitter:card" content="summary" />
		<meta name="twitter:creator" content={data.site.siteMetadata.author} />
		<meta name="twitter:title" content={props.title} />
		<meta name="twitter:description" content={props.description || data.site.siteMetadata.description} />

		{props.children}
	</Helmet>
};

export default SEO;
