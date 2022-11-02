import { formDataToJson } from '$lib/forms';
import { getPrismaClient } from '$lib/prisma';
import { ChangeSet, Text } from '@codemirror/state';
import { error, type RequestEvent } from '@sveltejs/kit';
import * as Yup from 'yup';

async function destroy(event: RequestEvent) {
	const id = parseInt(event.params.id ?? '');
	if (isNaN(id)) {
		throw error(404);
	}

	const prisma = await getPrismaClient(event.locals.user.id);
	await prisma.document.delete({ where: { id } });
	return {};
}

export async function update(event: RequestEvent) {
	const id = parseInt(event.params.id ?? '');
	if (isNaN(id)) {
		return error(404);
	}

	const { data } = await formDataToJson(
		await event.request.formData(),
		Yup.object({
			changes: Yup.string().required()
		})
	);

	const prisma = await getPrismaClient(event.locals.user.id);
	const document = await prisma.document.findFirst({
		select: { body: true },
		where: {
			id,
			OR: [
				{ userId: event.locals.user.id },
				{ permissions: { some: { userId: event.locals.user.id, documentId: id, type: 2 } } }
			]
		}
	});

	if (!document) {
		throw error(404);
	}

	document.body = data.changes;
	await prisma.document.update({ data: { body: document.body }, where: { id } });
	return {};
}

export async function load(event: RequestEvent) {
	const id = parseInt(event.params.id ?? '');
	if (isNaN(id)) {
		throw error(404);
	}

	const prisma = await getPrismaClient(event.locals.user.id);
	const document = await prisma.document.findFirst({
		where: {
			id,
			OR: [
				{ userId: event.locals.user.id },
				{ permissions: { some: { userId: event.locals.user.id, documentId: id } } }
			]
		},
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

export const actions = { update, destroy };
