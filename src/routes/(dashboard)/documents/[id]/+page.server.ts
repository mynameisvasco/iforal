import { getPrismaClient } from '$lib/prisma';
import { Role } from '@prisma/client';
import { error, type RequestEvent } from '@sveltejs/kit';

async function destroy(event: RequestEvent) {
	const id = parseInt(event.params.id ?? '');
	if (isNaN(id)) {
		throw error(404);
	}

	const prisma = await getPrismaClient(event.locals.user.id);
	await prisma.document.delete({ where: { id } });
	return {};
}

async function toggleVisible(event: RequestEvent) {
	const id = parseInt(event.params.id ?? '');

	if (isNaN(id)) {
		throw error(404);
	}

	const prisma = await getPrismaClient(event.locals.user.id);
	const document = await prisma.document.findUnique({
		where: { id },
		select: { isPublic: true }
	});

	const a = await prisma.document.updateMany({
		where: {
			id,
			OR: [
				event.locals.user.role !== Role.Admin
					? { userId: event.locals.user.id }
					: { userId: { gt: 0 } }
			]
		},
		data: { isPublic: !document?.isPublic }
	});

	return {};
}

export async function load(event: RequestEvent) {
	const id = parseInt(event.params.id ?? '');

	if (isNaN(id)) {
		throw error(404);
	}

	const searchTitle = event.url.searchParams.get('title');
	const searchFrom = event.url.searchParams.get('from');
	const searchTo = event.url.searchParams.get('to');
	const prisma = await getPrismaClient(event.locals.user.id);
	const document = await prisma.document.findFirst({
		where: {
			id,
			OR: [
				{ isPublic: true },
				event.locals.user.role !== Role.Admin
					? { userId: event.locals.user.id }
					: { userId: { gt: 0 } },
				{ permissions: { some: { userId: event.locals.user.id, documentId: id } } }
			]
		},
		include: {
			images: { orderBy: { position: 'asc' } },
			permissions: { include: { user: { select: { name: true, email: true } } } },
			user: true
		}
	});

	const documentsToCompare = searchTitle
		? await prisma.document.findMany({
				where: {
					title: {
						contains: searchTitle ?? undefined,
						mode: 'insensitive'
					},
					header: {
						originDate: {
							gte: searchFrom ? new Date(searchFrom) : undefined,
							lte: searchTo ? new Date(searchTo) : undefined
						}
					},
					OR: [
						{ isPublic: true },
						event.locals.user.role !== Role.Admin
							? { userId: event.locals.user.id }
							: { userId: { gt: 0 } },
						{ permissions: { some: { userId: event.locals.user.id } } }
					]
				},
				include: {
					header: true
				}
		  })
		: [];

	if (!document) {
		throw error(404);
	}

	const tags = await prisma.tag.findMany({ orderBy: { id: 'asc' } });
	return { document, tags, documentsToCompare };
}

export const actions = { destroy, toggleVisible };
