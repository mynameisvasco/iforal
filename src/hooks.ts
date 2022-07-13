import type { RequestEvent, RequestHandler } from '@sveltejs/kit';
import * as Cookie from 'cookie';
import * as Jwt from 'jsonwebtoken';

export async function handle({ event, resolve }: { event: RequestEvent; resolve: RequestHandler }) {
	const cookiesHeader = event.request.headers.get('cookie');
	const cookies = Cookie.parse(cookiesHeader ?? '');

	if (cookies.accessToken) {
		const payload = Jwt.verify(cookies.accessToken, '1h29r781gf987ubg198723ghd182');

		if (payload) {
			event.locals.user = payload as any;
		}
	}

	return resolve(event);
}

export async function getSession(event: RequestEvent) {
	return event.locals.user;
}
