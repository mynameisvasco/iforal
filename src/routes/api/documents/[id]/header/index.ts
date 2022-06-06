import { error, success } from '$lib/util/api';
import { prisma } from '$lib/util/prisma';
import type { RequestEvent } from '@sveltejs/kit';

export async function get(event: RequestEvent) {
	const documentId = parseInt(event.params.id);

	if (isNaN(documentId)) {
		return error(400, "Document doesn't exist");
	}

	const header = await prisma.documentHeader.findUnique({ where: { documentId } });

	if (!header) {
		return error(400, "Document doesn't exist");
	}

	return success(header);
}
