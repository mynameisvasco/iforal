import { redirect, success } from '$lib/client/api';
import * as Cookie from 'cookie';
import type { RequestEvent } from '@sveltejs/kit';

export async function get(event: RequestEvent) {
	const headers = {
		'Set-Cookie': Cookie.serialize('accessToken', '', {
			httpOnly: true,
			sameSite: 'lax',
			maxAge: 60 * 60 * 24 * 7,
			path: '/'
		})
	};

	return redirect('/auth/login', 303, headers);
}
