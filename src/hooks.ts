import type { RequestEvent, RequestHandler } from '@sveltejs/kit';
import * as Cookie from 'cookie';
import * as Jwt from 'jsonwebtoken';

export async function handle({ event, resolve }: { event: RequestEvent; resolve: RequestHandler }) {
	const cookiesHeader = event.request.headers.get('cookie');
	const cookies = Cookie.parse(cookiesHeader ?? '');

	if (!cookies.accessToken) {
		event.locals.user = {} as any;
		event.locals.user.isAuthenticated = false;
	} else {
		const payload = Jwt.verify(cookies.accessToken, '1h29r781gf987ubg198723ghd182');

		if (payload) {
			event.locals.user = payload as any;
			event.locals.user.isAuthenticated = true;
		}
	}

	return resolve(event);
}

export async function getSession(event: RequestEvent) {
	const user = event.locals.user;
	return { ...user };
}
