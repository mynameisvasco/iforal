import { page } from '$app/stores';
import { writable } from 'svelte/store';

export interface BreadcrumbItem {
	name: string;
	url: string;
}

function createBreadcrumb() {
	const store = writable([] as BreadcrumbItem[]);
	const mapping = {
		'^/documents$': 'Documentos',
		'^/documents/create$': 'Novo',
		'^/documents/[0-9]+$': 'Editor',
		'^/documents/[0-9]+/images$': 'Imagens',
		'^/documents/[0-9]+/header$': 'Cabeçalho'
	} as any;

	function init() {
		page.subscribe((p) => {
			const tokens = p.url.pathname.split('/').filter((t: string) => t !== '');
			let tokenPath = '';

			store.set(
				tokens.map((token: string) => {
					tokenPath += `/${token}`;
					const key = Object.keys(mapping).find((k) => new RegExp(k).test(tokenPath));

					return { name: key ? mapping[key] : token, url: tokenPath };
				})
			);
		});
	}

	return { subscribe: store.subscribe, init };
}

export const breadcrumb = createBreadcrumb();
