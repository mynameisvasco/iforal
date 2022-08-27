import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
export default {
	plugins: [sveltekit()],
	ssr: { noExternal: ['vanilla-js-wheel-zoom', 'CETEIcean'] }
};
