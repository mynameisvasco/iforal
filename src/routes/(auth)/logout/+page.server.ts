import { redirect, type RequestEvent } from '@sveltejs/kit';

async function logout(event: RequestEvent) {
	event.cookies.delete('accessToken');
	throw redirect(303, '/login');
}

export const actions = { default: logout };
