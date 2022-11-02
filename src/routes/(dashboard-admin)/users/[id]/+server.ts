import { getPrismaClient } from '$lib/prisma';
import { error, type RequestEvent } from '@sveltejs/kit';

export async function DELETE(event: RequestEvent) {
	const userId = parseInt(event.params.id ?? '');

	if (isNaN(userId)) {
		throw error(404, 'User not found');
	}

	const prisma = await getPrismaClient();
	await prisma.user.delete({ where: { id: userId } });
	return new Response();
}
