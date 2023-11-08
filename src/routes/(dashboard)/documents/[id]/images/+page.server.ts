import { getPrismaClient } from '$lib/prisma';
import * as fs from 'fs/promises';
import * as path from 'path';
import { error, fail, type RequestEvent } from '@sveltejs/kit';
import * as Yup from 'yup';
import { formDataToJson } from '$lib/forms';

async function create(event: RequestEvent) {
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

	return {};
}

async function update(event: RequestEvent) {
	const { data, errors } = await formDataToJson(
		await event.request.formData(),
		Yup.object().shape({
			image1: Yup.number().min(1).required(),
			image2: Yup.number().min(1).required()
		})
	);

	if (errors) {
		throw { errors };
	}

	const prisma = await getPrismaClient(event.locals.user.id);
	const sourceImage = await prisma.documentImages.findUnique({
		where: { id: parseInt(data.image1) }
	});

	const targetImage = await prisma.documentImages.findUnique({
		where: { id: parseInt(data.image2) }
	});

	if (!sourceImage || !targetImage) {
		return fail(400, { image1: 'Images not found' });
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

	return {};
}

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

export const actions = { create, update };
