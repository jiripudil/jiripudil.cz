module.exports = {
	siteMetadata: {
		title: 'Jiří Pudil',
		description: 'A full-stack web developer from Brno',
		author: '@jiripudil',
		siteUrl: 'https://jiripudil.cz',
	},
	plugins: [
		{
			resolve: 'gatsby-plugin-manifest',
			options: {
				lang: 'en',
				start_url: '/',
				icon: './src/images/me.jpg',
			},
		},
		{
			resolve: 'gatsby-plugin-feed',
			options: {
				query: `
					{
						site {
							siteMetadata {
								title
								description
								siteUrl
								site_url: siteUrl
							}
						}
					}
				`,
				feeds: [
					{
						query: `
							{
								allMarkdownRemark(
									filter: {frontmatter: {draft: {eq: false}}},
									sort: {fields: [frontmatter___datetime], order: DESC},
									limit: 15,
								) {
									edges {
										node {
											frontmatter {
												title
												slug
												datetime
												perex
												tags
											}
										}
									}
								}
							}
						`,
						serialize: ({query: {site, allMarkdownRemark}}) => {
							return allMarkdownRemark.edges.map((edge) => {
								return Object.assign({}, edge.node.frontmatter, {
									description: edge.node.frontmatter.perex,
									date: edge.node.frontmatter.datetime,
									url: `${site.siteMetadata.siteUrl}/blog/${edge.node.frontmatter.slug}`,
									guid: `${site.siteMetadata.siteUrl}/blog/${edge.node.frontmatter.slug}`,
								});
							});
						},
						output: '/blog/rss',
						title: 'Blog – Jiří Pudil',
					},
				],
			},
		},
		{
			resolve: 'gatsby-plugin-google-fonts',
			options: {
				fonts: ['PT Sans:400,700'],
				formats: ['woff', 'woff2'],
				display: 'swap',
				encode: false,
				stats: false,
			},
		},
		'gatsby-plugin-react-helmet',
		'gatsby-plugin-sass',
		'gatsby-plugin-sharp',
		'gatsby-plugin-sitemap',
		'gatsby-plugin-typescript',
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				name: 'posts',
				path: `${__dirname}/src/blog/posts`,
			},
		},
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				name: 'images',
				path: `${__dirname}/src/images`,
			},
		},
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				name: 'data',
				path: `${__dirname}/src/data`,
			},
		},
		'gatsby-transformer-json',
		{
			resolve: 'gatsby-transformer-remark',
			options: {
				plugins: [
					'gatsby-remark-emoji',
					'gatsby-remark-images',
					'gatsby-remark-prismjs',
				],
			},
		},
		'gatsby-transformer-sharp',
	],
};
