import { error, success } from '$lib/client/api';
import { getPrismaClient } from '$lib/server/prisma';
import * as fs from 'fs/promises';
import * as path from 'path';
import type { RequestEvent } from '@sveltejs/kit';
import { v4 as uuidV4 } from 'uuid';

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

	for (const file of files) {
		const fileExtension = file.name.split('.')[1];
		const fileName = `${uuidV4()}.${fileExtension}`;
		const filePath = path.join('storage', fileName);
		filesNames.push(fileName);
		await fs.writeFile(filePath, Buffer.from(await file.arrayBuffer()));
	}

	await prisma.documentImages.createMany({
		data: filesNames.map((fileName, i) => ({
			name: fileName,
			position: i,
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
