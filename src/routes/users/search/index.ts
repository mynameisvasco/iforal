import { error, success } from '$lib/client/api';
import { getPrismaClient } from '$lib/server/prisma';
import type { RequestEvent } from '@sveltejs/kit';

export async function get(event: RequestEvent) {
	const email = event.url.searchParams.get('email')?.toLowerCase();
	const name = event.url.searchParams.get('name')?.toLowerCase();

	if (!email && !name) {
		return error(400, 'Search must contain at least one parameter (email, name)');
	}

	const prisma = await getPrismaClient(event.locals.user.id);
	const user = await prisma.user.findMany({
		where: {
			OR: [{ name: { contains: name ?? '' } }, { email: { contains: email ?? '' } }]
		}
	});

	return success(user);
}
