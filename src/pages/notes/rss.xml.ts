import rss from '@astrojs/rss';
import type {APIContext} from 'astro';
import {getCollection} from 'astro:content';

export async function GET(context: APIContext) {
	const notes = await getCollection('notes');
	const sortedNotes = notes.toSorted((a, b) => (+b.data.date) - (+a.data.date));

	const pageSize = 7;

	return rss({
		title: 'Notes – Jiří Pudil',
		description: 'This is where I link to content that caught my eye on the Internet, and add my two cents to it.',
		site: context.site!,
		items: sortedNotes.map((note, index) => {
			const page = Math.floor(index / pageSize) + 1;

			return {
				title: note.data.title,
				pubDate: note.data.date,
				link: `/notes/${page > 1 ? `${page}/` : ''}#note-${note.id}`,
				customData: `<guid isPermaLink="false">${context.site}notes/#note-${note.id}</guid>`,
			};
		}),
		customData: '<language>en</language>',
		trailingSlash: false,
	});
}
