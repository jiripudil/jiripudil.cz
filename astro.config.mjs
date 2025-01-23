// @ts-check
import sitemap from '@astrojs/sitemap';
import {defineConfig} from 'astro/config';
import favicons from 'astro-favicons';
import icon from 'astro-icon';
import {readFile} from 'node:fs/promises';
import lightTheme from './shiki-theme-one-light.json' with {type: 'json'};
import darkTheme from './shiki-theme-one-dark.json' with {type: 'json'};

export default defineConfig({
	site: 'https://jiripudil.cz',
	integrations: [
		icon(),
		favicons({
			name: 'Jiří Pudil',
			short_name: '',
			input: {
				favicons: await readFile('./src/images/me.jpg'),
			},
		}),
		sitemap(),
	],
	markdown: {
		shikiConfig: {
			langAlias: {
				latte: 'twig',
				neon: 'yaml',
			},
			themes: {
				light: lightTheme,
				dark: darkTheme,
			},
		},
	},
});
