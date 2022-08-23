import { getPrismaClient } from '$lib/server/prisma';
import { error, type RequestEvent } from '@sveltejs/kit';

export async function DELETE(event: RequestEvent) {
	const imageId = parseInt(event.params.imageId ?? '');

	if (isNaN(imageId)) {
		throw error(404, 'Image not found');
	}

	const prisma = await getPrismaClient(event.locals.user.id);
	const image = await prisma.documentImages.findUnique({ where: { id: imageId } });

	if (!image) {
		throw error(404, 'Image not found');
	}

	await prisma.documentImages.delete({ where: { id: imageId } });
	await prisma.documentImages.updateMany({
		where: { documentId: image.documentId, position: { gt: image.position } },
		data: { position: { decrement: 1 } }
	});

	return new Response();
}
