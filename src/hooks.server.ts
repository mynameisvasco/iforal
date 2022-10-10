import { JWT_SECRET } from '$env/static/private';
import type { RequestEvent, ResolveOptions } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { verify as verifyJwt } from 'jsonwebtoken';

interface HandleInput {
	event: RequestEvent;
	resolve(event: RequestEvent, opts?: ResolveOptions): any;
}

export async function authentication(input: HandleInput) {
	const { event, resolve } = input;
	const accessToken = event.cookies.get('accessToken');
	const isLoginRoute = event.url.pathname.includes('login');
	const isRegisterRoute = event.url.pathname.includes('register');
	const isLogoutRoute = event.url.pathname.includes('logout');

	if (accessToken && !isLoginRoute && !isRegisterRoute) {
		try {
			event.locals.user = verifyJwt(accessToken, JWT_SECRET) as any;
		} catch (e) {
			return Response.redirect(`${event.url.origin}/login`);
		}
	}

	const isAuthed = !!event.locals.user;

	if ((isLoginRoute || isRegisterRoute) && !isLogoutRoute && isAuthed) {
		return Response.redirect(`${event.url.origin}/documents`);
	}

	if (!(isLoginRoute || isRegisterRoute) && !isAuthed) {
		return Response.redirect(`${event.url.origin}/login`);
	}

	return resolve(event as any);
}

export const handle = sequence(authentication);
