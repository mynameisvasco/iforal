import { JWT_SECRET } from '$env/static/private';
import type { RequestEvent, ResolveOptions } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import * as Cookie from 'cookie';
import Jwt from 'jsonwebtoken';

interface HandleInput {
	event: RequestEvent;
	resolve(event: RequestEvent, opts?: ResolveOptions): any;
}

export async function authentication(input: HandleInput) {
	const { event, resolve } = input;
	const cookiesHeader = event.request.headers.get('cookie');
	const cookies = Cookie.parse(cookiesHeader ?? '');

	if (cookies.accessToken) {
		event.locals.user = Jwt.verify(cookies.accessToken, JWT_SECRET) as any;
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

export const handle = sequence(authentication);
