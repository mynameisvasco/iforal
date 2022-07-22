import type { HttpMethod } from '@sveltejs/kit/types/private';

export interface Result<T> {
	status: number;
	data: T;
	errors?: any | undefined;
}

export function error(status: number, errors?: any) {
	return { status, body: { errors } };
}

export function redirect<T>(path: string, status: number, headers?: any) {
	return { status, headers: { ...headers, location: path } };
}

export function success<T>(data?: T | T[], headers?: any) {
	return { status: 200, body: data ? { data } : undefined, headers };
}

export const api = {
	get: function <T>(fetch: any, url: string) {
		return request<T>(fetch, url, 'get');
	},

	post: function <T>(fetch: any, url: string, body: any = {}) {
		return request<T>(fetch, url, 'post', body);
	},

	delete: function <T>(fetch: any, url: string) {
		return request<T>(fetch, url, 'delete');
	},

	put: function <T>(fetch: any, url: string, body: any = {}) {
		return request<T>(fetch, url, 'put', body);
	}
};

async function request<T>(fetch: any, url: string, method: HttpMethod, body?: any) {
	const response = await fetch(url, {
		method,
		body: body ? JSON.stringify(body) : undefined,
		headers: { 'Content-Type': 'application/json', Accept: 'application/json' }
	});
	return response.json() as Result<T>;
}
