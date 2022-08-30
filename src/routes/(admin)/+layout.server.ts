import { Role } from '@prisma/client';
import { redirect, type RequestEvent } from '@sveltejs/kit';

export async function load(event: RequestEvent) {
	if (event.locals.user.role !== Role.Admin) {
		throw redirect(303, '/documents');
	}

	return { user: event.locals.user };
}
