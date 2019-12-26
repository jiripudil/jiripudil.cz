const path = require('path');

exports.createPages = async ({graphql, actions}) => {
	const result = await graphql(`
		query {
			posts: allMarkdownRemark(
				filter: {frontmatter: {draft: {eq: false}}},
				limit: 10000
			) {
				edges {
					node {
						frontmatter {
							slug
						}
					}
				}
				totalCount
			}
			tagGroups: allMarkdownRemark {
				group(field: frontmatter___tags) {
					tag: fieldValue
					totalCount
				}
			}
		}
	`);

	result.data.posts.edges.forEach(({node}) => {
		const slug = node.frontmatter.slug;
		actions.createPage({
			path: `/blog/${slug}`,
			component: path.resolve('./src/blog/templates/BlogPost.tsx'),
			context: {
				slug,
			},
		});
	});

	const postsPerPage = 10;

	const numberOfPages = Math.ceil(result.data.posts.totalCount / postsPerPage);
	Array.from({length: numberOfPages}).forEach((_, index) => {
		actions.createPage({
			path: index === 0 ? `/blog` : `/blog/${index + 1}`,
			component: path.resolve('./src/blog/templates/BlogPage.tsx'),
			context: {
				limit: postsPerPage,
				skip: index * postsPerPage,
				numberOfPages,
				currentPage: index + 1,
			},
		})
	});

	result.data.tagGroups.group.forEach(({tag, totalCount}) => {
		const numberOfPages = Math.ceil(totalCount / postsPerPage);
		Array.from({length: numberOfPages}).forEach((_, index) => {
			actions.createPage({
				path: index === 0 ? `/blog/tag/${tag}` : `/blog/tag/${tag}/${index + 1}`,
				component: path.resolve('./src/blog/templates/BlogTag.tsx'),
				context: {
					tag,
					limit: postsPerPage,
					skip: index * postsPerPage,
					numberOfPages,
					currentPage: index + 1,
				},
			});
		});
	});
};
