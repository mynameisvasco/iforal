import adapter from '@sveltejs/adapter-node';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({ out: 'build' }),
		alias: {
			$stores: './src/stores'
		}
	},
	preprocess: preprocess({ postcss: true, typescript: true })
};

export default config;
