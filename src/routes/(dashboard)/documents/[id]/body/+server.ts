import { getPrismaClient } from '$lib/prisma';
import { Role } from '@prisma/client';
import { error, json, type RequestEvent } from '@sveltejs/kit';

export async function PUT(event: RequestEvent) {
	const id = parseInt(event.params.id ?? '');
	if (isNaN(id)) {
		return error(404);
	}

	const data = await event.request.json();
	const prisma = await getPrismaClient(event.locals.user.id);
	const document = await prisma.document.findFirst({
		select: { body: true },
		where: {
			id,

			OR: [
				{ isPublic: true },
				event.locals.user.role !== Role.Admin
					? { userId: event.locals.user.id }
					: { userId: { gt: 0 } },
				{ permissions: { some: { userId: event.locals.user.id } } }
			]
		}
	});

	if (!document) {
		throw error(404);
	}

	try {
		await prisma.document.update({ data: { body: data.body }, where: { id } });
		return json({});
	} catch (e) {
		return json({ error: true });
	}
}
