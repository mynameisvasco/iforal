import { formDataToJson } from '$lib/forms';
import { getPrismaClient } from '$lib/prisma';
import { fail, type RequestEvent } from '@sveltejs/kit';
import * as Yup from 'yup';
import { serialize } from 'superjson';

async function search(event: RequestEvent) {
	const id = parseInt(event.url.searchParams.get('id')?.toLowerCase() ?? '0');
	const { data, errors } = await formDataToJson(
		await event.request.formData(),
		Yup.object().shape({
			title: Yup.string().min(3, 'O título da obra deve ter pelo menos 3 caracteres'),
			formIndex: Yup.number().min(0).max(2)
		})
	);

	if (errors) {
		return fail(400, { errors });
	}

	const prisma = await getPrismaClient();
	const documentHeaders = await prisma.documentHeader.findMany({
		select: { documentId: true },
		where: { OR: [{ title: { contains: data.title, mode: 'insensitive' } }, { id }] }
	});

	const documentIds = documentHeaders.map((d) => d.documentId);
	const documents = await prisma.document.findMany({
		where: { id: { in: documentIds } },
		select: { images: true, id: true, modifiedAt: true, createdAt: true, title: true, header: true }
	});

	return { [data.formIndex]: { documents: serialize(documents).json } };
}

export const actions = { default: search };
