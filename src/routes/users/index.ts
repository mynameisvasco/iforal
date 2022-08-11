import { error, success } from '$lib/client/api';
import { getPrismaClient } from '$lib/server/prisma';
import type { RequestEvent } from '@sveltejs/kit';

export async function get(event: RequestEvent) {
	const prisma = await getPrismaClient(event.locals.user.id);
	const page = parseInt(event.url.searchParams.get('page') ?? '1');

	if (isNaN(page)) {
		return error(400);
	}

	const users = await prisma.user.findMany({
		take: 20,
		skip: (page - 1) * 20,
		select: { id: true, name: true, email: true, role: true }
	});

	return success(users);
}
