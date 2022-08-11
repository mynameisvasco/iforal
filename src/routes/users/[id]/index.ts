import { error, success } from '$lib/client/api';
import { getPrismaClient } from '$lib/server/prisma';
import type { RequestEvent } from '@sveltejs/kit';

export async function del(event: RequestEvent) {
	const userId = parseInt(event.params.id);

	if (isNaN(userId)) {
		return error(404, 'User not found');
	}

	const prisma = await getPrismaClient();
	await prisma.user.delete({ where: { id: userId } });
	return success();
}
