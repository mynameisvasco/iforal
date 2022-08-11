import { error, success } from '$lib/client/api';
import { getPrismaClient } from '$lib/server/prisma';
import type { RequestEvent } from '@sveltejs/kit';

export async function del(event: RequestEvent) {
	const imageId = parseInt(event.params.imageId);

	if (isNaN(imageId)) {
		return error(404, 'Image not found');
	}

	const prisma = await getPrismaClient(event.locals.user.id);
	const image = await prisma.documentImages.findUnique({ where: { id: imageId } });

	if (!image) {
		return error(404, 'Image not found');
	}

	await prisma.documentImages.delete({ where: { id: imageId } });
	await prisma.documentImages.updateMany({
		where: { documentId: image.documentId, position: { gt: image.position } },
		data: { position: { decrement: 1 } }
	});

	return success();
}
