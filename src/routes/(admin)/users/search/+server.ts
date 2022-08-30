import { getPrismaClient } from '$lib/prisma';
import { json, type RequestEvent } from '@sveltejs/kit';

export async function GET(event: RequestEvent) {
	const email = event.url.searchParams.get('email')?.toLowerCase();
	const name = event.url.searchParams.get('name')?.toLowerCase();
	if (email === '' || name === '') {
		return { errors: 'Search must contain at least one parameter (email, name)' };
	}

	const prisma = await getPrismaClient(event.locals.user.id);
	const users = await prisma.user.findMany({
		where: { OR: [{ name: { contains: name ?? '' } }, { email: { contains: email ?? '' } }] }
	});

	return json(users);
}
