import type { RequestEvent, RequestHandler } from '@sveltejs/kit';
import * as Cookie from 'cookie';
import Jwt from 'jsonwebtoken';

export async function handle({ event, resolve }: { event: RequestEvent; resolve: RequestHandler }) {
	const cookiesHeader = event.request.headers.get('cookie');
	const cookies = Cookie.parse(cookiesHeader ?? '');

	if (cookies.accessToken) {
		event.locals.user = Jwt.verify(cookies.accessToken, '1h29r781gf987ubg198723ghd182') as any;
	}

	const isAuthed = !!event.locals.user;

	if (event.url.pathname.includes('auth') && !event.url.pathname.includes('logout') && isAuthed) {
		return Response.redirect(`${event.url.origin}/documents`);
	}

	if (!event.url.pathname.includes('auth') && !isAuthed) {
		return Response.redirect(`${event.url.origin}/auth/login`);
	}

	return resolve(event);
}

export async function getSession(event: RequestEvent) {
	return event.locals.user;
}
