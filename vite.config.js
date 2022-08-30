import { sveltekit } from '@sveltejs/kit/vite';
import path from 'path';

/** @type {import('vite').UserConfig} */
export default {
	plugins: [sveltekit()],
	resolve: {
		alias: {
			stores: path.resolve('./src/stores')
		}
	},
	fs: {
		// Allow serving files from one level up to the project root
		allow: [path.resolve('./storage/')]
	},
	ssr: { noExternal: ['vanilla-js-wheel-zoom', 'CETEIcean'] }
};
