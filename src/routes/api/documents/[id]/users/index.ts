import { error, success } from '$lib/util/api';
import { getPrismaClient } from '$lib/util/prisma';
import type { RequestEvent } from '@sveltejs/kit';

export async function get(event: RequestEvent) {
	const prisma = await getPrismaClient(event.locals.user.id);
	const documentId = parseInt(event.params.id);

	if (isNaN(documentId)) {
		return error(400, "Document doesn't exist");
	}

	const permissions = await prisma.documentPermission.findMany({
		where: { documentId },
		include: { user: true }
	});

	return success([
		...permissions.map((p) => ({
			name: p.user.name,
			email: p.user.email,
			permission: p.type
		}))
	]);
}
