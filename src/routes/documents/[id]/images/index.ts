import { error, success } from '$lib/client/api';
import { getPrismaClient } from '$lib/server/prisma';
import * as fs from 'fs/promises';
import * as path from 'path';
import type { RequestEvent } from '@sveltejs/kit';

export async function get(event: RequestEvent) {
	const documentId = parseInt(event.params.id);

	if (isNaN(documentId)) {
		return error(400, "Document doesn't exist");
	}

	const prisma = await getPrismaClient(event.locals.user.id);
	const images = await prisma.documentImages.findMany({
		where: { documentId },
		orderBy: { position: 'asc' }
	});

	return success(images);
}

export async function post(event: RequestEvent) {
	const documentId = parseInt(event.params.id);

	if (isNaN(documentId)) {
		return error(400, "Document doesn't exist");
	}

	const prisma = await getPrismaClient();
	const body = await event.request.formData();
	const files = body.getAll('images') as File[];
	const filesNames = [];
	const lastImage = await prisma.documentImages.findFirst({
		where: { documentId },
		select: { position: true },
		orderBy: { position: 'desc' }
	});

	for (const file of files) {
		if (!file.name) continue;
		const fileExtension = file.name.substring(file.name.lastIndexOf('.'));
		const fileName = `${crypto.randomUUID()}${fileExtension}`;
		const filePath = path.join('storage', fileName);
		filesNames.push(fileName);
		await fs.writeFile(filePath, Buffer.from(await file.arrayBuffer()));
	}

	await prisma.documentImages.createMany({
		data: filesNames.map((fileName, i) => ({
			name: fileName,
			position: (lastImage ? lastImage.position + 1 : 0) + i,
			documentId
		}))
	});

	return success();
}

export async function put(event: RequestEvent) {
	const { image1, image2 } = await event.request.json();
	const prisma = await getPrismaClient(event.locals.user.id);
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
