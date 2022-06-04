import { error, success } from '$lib/util/api';
import { prisma } from '$lib/util/prisma';
import type { RequestEvent } from '@sveltejs/kit';

export async function get(event: RequestEvent) {
	const id = parseInt(event.params.id);

	if (isNaN(id)) {
		return error(400, "Document doesn't exist");
	}

	const document = await prisma.document.findFirst({
		where: { id },
		include: {
			images: {
				orderBy: {
					position: 'asc'
				}
			}
		}
	});

	return success(document);
}

export async function del(event: RequestEvent) {
	const id = parseInt(event.params.id);

	if (isNaN(id)) {
		return error(400, "Document doesn't exist");
	}

	await prisma.document.delete({ where: { id } });
	return success(null, 'Document deleted');
}
