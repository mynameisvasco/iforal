import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		methodOverride: {
			allowed: ['PUT', 'DELETE']
		}
	},
	preprocess: preprocess({ postcss: true, typescript: true })
};

export default config;
