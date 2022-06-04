import type { HttpMethod } from '@sveltejs/kit/types/private';

export interface ApiResponse<T> {
	status: number;
	message: string;
	data: T;
}

export function error(status: number, message: string) {
	return { status, body: { message, status } };
}

export function success<T>(data?: T | T[], message?: string, headers?: any) {
	return { status: 200, body: { message, data, status: 200 }, headers };
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
	const response = await fetch(url, { method, body: body ? JSON.stringify(body) : undefined });
	return response.json() as ApiResponse<T>;
}
