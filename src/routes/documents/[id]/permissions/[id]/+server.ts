import { getPrismaClient } from '$lib/server/prisma';
import { error, type RequestEvent } from '@sveltejs/kit';

export async function PUT(event: RequestEvent) {
	const id = parseInt(event.params.id ?? '');

	if (isNaN(id)) {
		throw error(400, 'Permission not found');
	}

	const body = await event.request.json();
	const prisma = await getPrismaClient(event.locals.user.id);
	await prisma.documentPermissions.update({ where: { id }, data: { type: body.type } });
	return new Response();
}

export async function DELETE(event: RequestEvent) {
	const id = parseInt(event.params.id ?? '');

	if (isNaN(id)) {
		throw error(400, 'Permission not found');
	}

	const prisma = await getPrismaClient(event.locals.user.id);
	await prisma.documentPermissions.delete({ where: { id } });
	return new Response();
}
