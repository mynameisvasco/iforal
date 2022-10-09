import { redirect, type RequestEvent } from '@sveltejs/kit';

export async function GET(event: RequestEvent) {
	event.cookies.set('accessToken', '', {
		httpOnly: true,
		sameSite: 'lax',
		maxAge: 60 * 60 * 24 * 7,
		path: '/'
	});

	throw redirect(303, '/login');
}
