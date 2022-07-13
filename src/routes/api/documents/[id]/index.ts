import { error, success } from '$lib/util/api';
import { getPrismaClient } from '$lib/util/prisma';
import type { RequestEvent } from '@sveltejs/kit';

export async function get(event: RequestEvent) {
	const id = parseInt(event.params.id);

	if (isNaN(id)) {
		return error(400, "Document doesn't exist");
	}

	const prisma = await getPrismaClient(event.locals.user.id);
	const document = await prisma.document.findFirst({
		where: { id },
		include: {
			images: {
				orderBy: {
					position: 'asc'
				}
			},
			user: true
		}
	});

	return success(document);
}

export async function put(event: RequestEvent) {
	const id = parseInt(event.params.id);

	if (isNaN(id)) {
		return error(400, "Document doesn't exist");
	}

	const body = await event.request.json();
}

export async function del(event: RequestEvent) {
	const id = parseInt(event.params.id);

	if (isNaN(id)) {
		return error(400, "Document doesn't exist");
	}

	const prisma = await getPrismaClient(event.locals.user.id);
	await prisma.document.delete({ where: { id } });
	return success(null, 'Document deleted');
}
