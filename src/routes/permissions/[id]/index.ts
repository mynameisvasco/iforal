import { error, success } from '$lib/api';
import { getPrismaClient } from '$lib/prisma';
import type { RequestEvent } from '@sveltejs/kit';

export async function put(event: RequestEvent) {
	const id = parseInt(event.params.id);

	if (isNaN(id)) {
		return error(400, "Permission doesn't exist");
	}

	const body = await event.request.json();
	const prisma = await getPrismaClient(event.locals.user.id);
	await prisma.documentPermissions.update({ where: { id }, data: { type: body.type } });
	return success(null);
}
