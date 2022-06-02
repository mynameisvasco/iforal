import { success } from '$lib/util/api';
import * as Cookie from 'cookie';
import type { RequestEvent } from '@sveltejs/kit';

export async function post(event: RequestEvent) {
	const headers = {
		'Set-Cookie': Cookie.serialize('accessToken', '', {
			httpOnly: true,
			sameSite: 'lax',
			maxAge: 60 * 60 * 24 * 7,
			path: '/'
		})
	};

	return success('Logout with success', undefined, headers);
}
