import { requireAdminRole } from '$lib/server/access';
import { getPrismaClient } from '$lib/server/prisma';
import { error, type RequestEvent } from '@sveltejs/kit';

export async function load(event: RequestEvent) {
	requireAdminRole(event.locals.user);
	const prisma = await getPrismaClient(event.locals.user.id);
	const page = parseInt(event.url.searchParams.get('page') ?? '1');

	if (isNaN(page)) {
		throw error(404, 'User not found');
	}

	const users = await prisma.user.findMany({
		take: 20,
		skip: (page - 1) * 20,
		select: { id: true, name: true, email: true, role: true }
	});

	return { users };
}
