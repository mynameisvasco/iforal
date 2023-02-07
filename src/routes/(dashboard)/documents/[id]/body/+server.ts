import { getPrismaClient } from '$lib/prisma';
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
				{ userId: event.locals.user.id },
				{ permissions: { some: { userId: event.locals.user.id, documentId: id, type: 1 } } }
			]
		}
	});

	if (!document) {
		throw error(404);
	}

	try {
		document.body = data.body;
		await prisma.document.update({ data: { body: document.body }, where: { id } });
		return json({});
	} catch (e) {
		return json({ error: true });
	}
}
