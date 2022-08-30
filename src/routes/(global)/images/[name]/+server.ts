import { getPrismaClient } from '$lib/prisma';
import { error, type RequestEvent } from '@sveltejs/kit';
import * as Fs from 'fs/promises';
import * as Path from 'path';

export async function GET(event: RequestEvent) {
	const name = event.params.name;

	if (!name || name === '') {
		throw error(404, 'Image not found');
	}

	const prisma = await getPrismaClient(event.locals.user.id);

	try {
		const file = await Fs.readFile(Path.join('storage', name));

		return new Response(file, {
			headers: { 'Content-Type': `image/${name.split('.')[1]}` }
		});
	} catch (e) {
		throw error(404, 'File not found');
	}
}
