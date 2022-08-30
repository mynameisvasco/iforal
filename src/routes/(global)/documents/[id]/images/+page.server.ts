import { getPrismaClient } from '$lib/prisma';
import * as fs from 'fs/promises';
import * as path from 'path';
import { error, type RequestEvent } from '@sveltejs/kit';

export async function load(event: RequestEvent) {
	const documentId = parseInt(event.params.id ?? '');
	if (isNaN(documentId)) {
		throw error(404, 'Document not found');
	}

	const prisma = await getPrismaClient(event.locals.user.id);
	const images = await prisma.documentImages.findMany({
		where: { documentId },
		orderBy: { position: 'asc' }
	});

	return { images };
}

export async function POST(event: RequestEvent) {
	const documentId = parseInt(event.params.id ?? '');

	if (isNaN(documentId)) {
		throw error(404, 'Document not found');
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

	return new Response();
}

export async function PUT(event: RequestEvent) {
	const { image1, image2 } = await event.request.json();
	const prisma = await getPrismaClient(event.locals.user.id);
	const sourceImage = await prisma.documentImages.findUnique({ where: { id: image1 } });
	const targetImage = await prisma.documentImages.findUnique({ where: { id: image2 } });

	if (!sourceImage || !targetImage) {
		throw error(404, 'Images not found');
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

	return new Response();
}