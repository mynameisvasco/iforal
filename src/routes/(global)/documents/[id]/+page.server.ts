import { getPrismaClient } from '$lib/prisma';
import { ChangeSet, Text } from '@codemirror/state';
import { error, type RequestEvent } from '@sveltejs/kit';

export async function load(event: RequestEvent) {
	const id = parseInt(event.params.id ?? '');
	if (isNaN(id)) {
		throw error(404);
	}

	const prisma = await getPrismaClient(event.locals.user.id);
	const document = await prisma.document.findFirst({
		where: { id },
		include: {
			images: { orderBy: { position: 'asc' } },
			permissions: { include: { user: { select: { name: true, email: true } } } },
			user: true
		}
	});

	if (!document) {
		throw error(404);
	}

	const tags = await prisma.tag.findMany({ orderBy: { id: 'asc' } });
	return { document, tags };
}

export async function PUT(event: RequestEvent) {
	const id = parseInt(event.params.id ?? '');
	if (isNaN(id)) {
		return error(404);
	}

	const body = await event.request.json();
	const changes = body.changes as ChangeSet;
	const prisma = await getPrismaClient(event.locals.user.id);
	const document = await prisma.document.findUnique({ select: { body: true }, where: { id } });
	if (!document) {
		throw error(404);
	}

	document.body = ChangeSet.fromJSON(changes)
		.apply(Text.of([document.body]))
		.toString();

	await prisma.document.update({ data: { body: document.body }, where: { id } });
	return new Response();
}

export async function DELETE(event: RequestEvent) {
	const id = parseInt(event.params.id ?? '');
	if (isNaN(id)) {
		throw error(404);
	}

	const prisma = await getPrismaClient(event.locals.user.id);
	await prisma.document.delete({ where: { id } });
	return new Response();
}
