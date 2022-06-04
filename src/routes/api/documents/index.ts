import { prisma } from '$lib/util/prisma';
import type { RequestEvent } from '@sveltejs/kit';
import { parse as parseDate } from 'date-fns';
import * as Fs from 'fs/promises';
import * as Path from 'path';
import { v4 as uuidV4 } from 'uuid';
import { base64ToImage } from '$lib/util/base64';
import { error, success } from '$lib/util/api';

export async function get(event: RequestEvent) {
	const documents = await prisma.document.findMany({
		include: {
			images: {
				orderBy: { position: 'asc' }
			}
		}
	});
	return success(documents);
}

export async function post(event: RequestEvent) {
	const { images, ...data } = await event.request.json();
	const document = await prisma.document.create({
		data: {
			title: data.title,
			coverUrl: '',
			header: {
				create: { ...data, originDate: parseDate(data.originDate, 'yyyy-MM-dd', new Date()) }
			}
		}
	});

	const position = 0;

	try {
		for (const image of images) {
			const name = `${uuidV4()}.${image.name.split('.')[1]}`;
			await Fs.writeFile(Path.join('storage', name), base64ToImage(image.contents));
			await prisma.documentImages.create({
				data: {
					name,
					position,
					document: {
						connect: { id: document.id }
					}
				}
			});
		}
	} catch (e) {
		return error(400, 'Failed to store the images');
	}

	return success(document);
}
