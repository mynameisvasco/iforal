import { getPrismaClient } from '$lib/prisma';
import { json, type RequestEvent } from '@sveltejs/kit';

export async function GET(event: RequestEvent) {
	const documentId = parseInt(event.params.id ?? '');
	if (isNaN(documentId)) {
		return { errors: 'Invalid document id' };
	}

	const email = event.url.searchParams.get('email')?.toLowerCase();
	const name = event.url.searchParams.get('name')?.toLowerCase();
	if (email === '' || name === '') {
		return { errors: 'Search must contain at least one parameter (email, name)' };
	}

	const prisma = await getPrismaClient(event.locals.user.id);
	const document = await prisma.document.findUnique({
		select: { userId: true },
		where: { id: documentId }
	});

	const permissions = await prisma.documentPermissions.findMany({
		select: { userId: true },
		where: { documentId }
	});

	const users = await prisma.user.findMany({
		where: {
			AND: [
				{ id: { notIn: permissions.map((p) => p.userId) } },
				{ id: { not: document?.userId } },
				{ id: { not: event.locals.user.id } }
			],
			OR: [{ name: { contains: name ?? '' } }, { email: { contains: email ?? '' } }]
		}
	});

	return json(users);
}
