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
		allow: [path.resolve('./storage/')]
	},
	ssr: { noExternal: ['vanilla-js-wheel-zoom', 'CETEIcean'] }
};
