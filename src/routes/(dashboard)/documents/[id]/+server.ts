import { formDataToJson } from '$lib/forms';
import { getPrismaClient } from '$lib/prisma';
import { ChangeSet, Text } from '@codemirror/state';
import { error, json, type RequestEvent } from '@sveltejs/kit';
import * as Yup from 'yup';

export async function PUT(event: RequestEvent) {
	const id = parseInt(event.params.id ?? '');
	if (isNaN(id)) {
		return error(404);
	}

	const data = await event.request.json();
	const changes: ChangeSet[] = data.changes.map((c: any) => ChangeSet.fromJSON(c));
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

	for (const change of changes) {
		document.body = change.apply(Text.of([document.body])).toString();
	}

	await prisma.document.update({ data: { body: document.body }, where: { id } });
	return json({});
}
