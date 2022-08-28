import type { RequestEvent, RequestHandler, ServerLoadEvent } from '@sveltejs/kit';
import * as Cookie from 'cookie';
import Jwt from 'jsonwebtoken';

type HooksHandle = {
	event: ServerLoadEvent;
	resolve: RequestHandler;
};

export async function handle({ event, resolve }: HooksHandle) {
	const cookiesHeader = event.request.headers.get('cookie');
	const cookies = Cookie.parse(cookiesHeader ?? '');

	if (cookies.accessToken) {
		event.locals.user = Jwt.verify(cookies.accessToken, '1h29r781gf987ubg198723ghd182') as any;
	}

	const isAuthed = !!event.locals.user;
	const isLoginRoute = event.url.pathname.includes('login');
	const isRegisterRoute = event.url.pathname.includes('register');
	const isLogoutRoute = event.url.pathname.includes('logout');

	if ((isLoginRoute || isRegisterRoute) && !isLogoutRoute && isAuthed) {
		return Response.redirect(`${event.url.origin}/documents`);
	}

	if (!(isLoginRoute || isRegisterRoute) && !isAuthed) {
		return Response.redirect(`${event.url.origin}/login`);
	}

	return resolve(event as any);
}

export async function getSession(event: RequestEvent) {
	return event.locals.user;
}
