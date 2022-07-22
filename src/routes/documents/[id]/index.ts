import { error, success } from '$lib/client/api';
import { getPrismaClient } from '$lib/server/prisma';
import { redis } from '$lib/server/redis';
import type { Update } from '@codemirror/collab';
import { ChangeSet, Text } from '@codemirror/state';
import type { RequestEvent } from '@sveltejs/kit';

export async function get(event: RequestEvent) {
	const id = parseInt(event.params.id);

	if (isNaN(id)) {
		return error(404);
	}

	const prisma = await getPrismaClient(event.locals.user.id);
	const document = await prisma.document.findFirst({
		where: { id },
		include: {
			images: { orderBy: { position: 'asc' } },
			permissions: {
				include: {
					user: { select: { name: true, email: true } }
				}
			},
			user: true
		}
	});

	if (!document) {
		return error(404);
	}

	return success({ ...document, body: document.body });
}

export async function put(event: RequestEvent) {
	const id = parseInt(event.params.id);

	if (isNaN(id)) {
		return error(404);
	}

	const body = await event.request.json();
	const changes = body.changes;
	const prisma = await getPrismaClient(event.locals.user.id);
	let document = await prisma.document.findUnique({ select: { body: true }, where: { id } });

	if (!document) {
		return error(404);
	}

	for (const change of changes) {
		document.body = ChangeSet.fromJSON(change)
			.apply(Text.of([document.body]))
			.toString();
	}

	await prisma.document.update({ data: { body: document.body }, where: { id } });
	return success();
}

export async function del(event: RequestEvent) {
	const id = parseInt(event.params.id);

	if (isNaN(id)) {
		return error(404);
	}

	const prisma = await getPrismaClient(event.locals.user.id);
	await prisma.document.delete({ where: { id } });
	return success();
}
