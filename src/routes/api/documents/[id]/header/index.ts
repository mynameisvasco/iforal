import { error, success } from '$lib/api';
import { getPrismaClient } from '$lib/prisma';
import type { RequestEvent } from '@sveltejs/kit';

export async function get(event: RequestEvent) {
	const documentId = parseInt(event.params.id);

	if (isNaN(documentId)) {
		return error(400, "Document doesn't exist");
	}

	const prisma = await getPrismaClient(event.locals.user.id);
	const header = await prisma.documentHeader.findUnique({ where: { documentId } });

	if (!header) {
		return error(400, "Document doesn't exist");
	}

	return success(header);
}
