import type { HttpMethod } from '@sveltejs/kit/types/private';

export const api = {
	get: function <T>(fetch: any, url: string) {
		return request<T>(fetch, url, 'GET');
	},

	post: function <T>(fetch: any, url: string, body: any = {}) {
		return request<T>(fetch, url, 'POST', body);
	},

	delete: function <T>(fetch: any, url: string) {
		return request<T>(fetch, url, 'DELETE');
	},

	put: function <T>(fetch: any, url: string, body: any = {}) {
		return request<T>(fetch, url, 'PUT', body);
	}
};

async function request<T>(fetch: any, url: string, method: HttpMethod, body?: any) {
	const response = await fetch(url, {
		method,
		body: body ? JSON.stringify(body) : undefined,
		headers: { 'Content-Type': 'application/json', Accept: 'application/json' }
	});

	try {
		return (await response.json()) as T;
	} catch (e) {
		return null;
	}
}
