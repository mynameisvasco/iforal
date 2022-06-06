import { error, success } from '$lib/util/api';
import { prisma } from '$lib/util/prisma';
import type { RequestEvent } from '@sveltejs/kit';

export async function get(event: RequestEvent) {
	const documentId = parseInt(event.params.id);

	if (isNaN(documentId)) {
		return error(400, "Document doesn't exist");
	}

	const images = await prisma.documentImages.findMany({
		where: { documentId },
		orderBy: { position: 'asc' }
	});

	return success(images);
}

export async function put(event: RequestEvent) {
	const { image1, image2 } = await event.request.json();

	const sourceImage = await prisma.documentImages.findUnique({ where: { id: image1 } });
	const targetImage = await prisma.documentImages.findUnique({ where: { id: image2 } });

	if (!sourceImage || !targetImage) {
		return error(404, "Images doesn't exist");
	}

	await prisma.$transaction([
		prisma.documentImages.update({
			data: { name: sourceImage.name },
			where: { id: targetImage.id }
		}),
		prisma.documentImages.update({
			data: { name: targetImage.name },
			where: { id: sourceImage.id }
		})
	]);

	return success('Images updated');
}
