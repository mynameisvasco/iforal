import { prisma } from '$lib/util/prisma';
import type { RequestEvent } from '@sveltejs/kit';
import { parse as parseDate } from 'date-fns';
import * as Fs from 'fs/promises';
import * as Path from 'path';
import { base64ToImage } from '$lib/util/base64';
import { error, success } from '$lib/util/api';

export async function get(event: RequestEvent) {
	const documents = await prisma.document.findMany();
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

	try {
		for (const image of images) {
			const path = Path.resolve(`./storage/document-${document.id}`);
			await Fs.mkdir(path, { recursive: true });
			await Fs.writeFile(`${path}/${image.name}`, base64ToImage(image.contents));
		}
	} catch (e) {
		return error(400, 'Failed to store the images');
	}

	return success(document);
}
