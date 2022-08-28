import * as Cookie from 'cookie';
import { redirect, type RequestEvent } from '@sveltejs/kit';

export async function GET(event: RequestEvent) {
	event.setHeaders({
		'Set-Cookie': Cookie.serialize('accessToken', '', {
			httpOnly: true,
			sameSite: 'lax',
			maxAge: 60 * 60 * 24 * 7,
			path: '/'
		})
	});

	throw redirect(303, '/login');
}
