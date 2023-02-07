import { getPrismaClient } from '$lib/prisma';
import type { RequestEvent } from '@sveltejs/kit';

export async function load(event: RequestEvent) {
	const prisma = await getPrismaClient(event.locals.user.id);
	const documents = await prisma.document.findMany({
		where: {
			OR: [
				{ userId: event.locals.user.id },
				{ permissions: { some: { userId: event.locals.user.id } } }
			]
		},
		select: {
			id: true,
			title: true,
			header: true,
			images: {
				orderBy: { position: 'asc' }
			},
			body: false
		}
	});

	return { documents };
}
