import { success } from '$lib/client/api';
import { getPrismaClient } from '$lib/server/prisma';
import type { RequestEvent } from '@sveltejs/kit';

export async function post(event: RequestEvent) {
	const { documentId, email } = await event.request.json();
	const prisma = await getPrismaClient(event.locals.user.id);
	const permission = await prisma.documentPermissions.create({
		data: {
			type: 0,
			document: { connect: { id: documentId } },
			user: { connect: { email } }
		},
		include: {
			user: { select: { name: true, email: true } }
		}
	});

	return success(permission);
}
