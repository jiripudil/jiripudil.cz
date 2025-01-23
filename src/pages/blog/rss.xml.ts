import rss from '@astrojs/rss';
import type {APIContext} from 'astro';
import {getCollection} from 'astro:content';

export async function GET(context: APIContext) {
	const posts = await getCollection('posts', ({data}) => !data.draft);
	const sortedPosts = posts.toSorted((a, b) => (+b.data.datetime) - (+a.data.datetime));

	return rss({
		title: 'Blog – Jiří Pudil',
		description: '',
		site: context.site!,
		items: sortedPosts.map((post) => ({
			title: post.data.title,
			pubDate: post.data.datetime,
			description: post.data.perex,
			link: `/blog/${post.id}`,
		})),
		customData: '<language>en</language>',
		trailingSlash: false,
	});
}
