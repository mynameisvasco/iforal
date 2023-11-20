import { JWT_SECRET } from '$env/static/private';
import type { RequestEvent, ResolveOptions, HttpError } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import Jwt from 'jsonwebtoken';
import type { IUser } from './app';

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
	const isImageRoute = event.url.pathname.startsWith('/images');
	const isGlossary = event.url.pathname === '/glossary';
	const isDocumentsRoute = event.url.pathname === '/documents';
	const isDocumentReadRoute = event.url.pathname.match(/\/documents\/\d*$/g)?.at(0) ?? false;
	const isDocumentHeaderRoute =
		event.url.pathname.match(/\/documents\/\d*\/header$/g)?.at(0) ?? false;

	event.locals.user = { id: 0 } as IUser;

	if (accessToken && !isLoginRoute && !isRegisterRoute) {
		try {
			event.locals.user = Jwt.verify(accessToken, JWT_SECRET) as any;
		} catch (e) {
			return Response.redirect(`${event.url.origin}/login`);
		}
	}

	const isAuthed = event.locals.user.id !== 0;

	if ((isLoginRoute || isRegisterRoute) && !isLogoutRoute && isAuthed) {
		return Response.redirect(`${event.url.origin}/documents`);
	}

	if (
		!(
			isLoginRoute ||
			isRegisterRoute ||
			isDocumentsRoute ||
			isDocumentReadRoute ||
			isImageRoute ||
			isGlossary ||
			isDocumentHeaderRoute
		) &&
		!isAuthed
	) {
		return Response.redirect(`${event.url.origin}/login`);
	}

	return resolve(event as any);
}

export const handle = sequence(authentication);
