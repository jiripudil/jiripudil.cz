import {defineCollection, z} from 'astro:content';
import {glob} from 'astro/loaders';

const posts = defineCollection({
	loader: glob({pattern: '*.md', base: './src/blog/posts'}),
	schema: z.object({
		legacyId: z.number().optional(),
		title: z.string(),
		slug: z.string(),
		datetime: z.date(),
		draft: z.boolean().default(false),
		perex: z.string(),
		tags: z.array(z.string()),
		cupsOfCoffee: z.number().default(0),
	}),
});

const talks = defineCollection({
	loader: glob({pattern: '*.json', base: './src/talks'}),
	schema: z.object({
		title: z.string(),
		annotation: z.string(),
		highlighted: z.boolean().default(false),
		sessions: z.array(z.object({
			date: z.string().date(),
			event: z.string(),
			location: z.string(),
			url: z.string().url().nullable(),
			slidesUrl: z.string().url().nullable(),
			videoUrl: z.string().url().nullable(),
			language: z.enum(['cs', 'en']),
		})).min(1),
	}),
});

const notes = defineCollection({
	loader: glob({pattern: '*.md', base: './src/notes'}),
	schema: z.object({
		title: z.string(),
		url: z.string().url(),
		date: z.date(),
		tags: z.array(z.string()).default([]),
	}),
});

export const collections = {posts, talks, notes};
