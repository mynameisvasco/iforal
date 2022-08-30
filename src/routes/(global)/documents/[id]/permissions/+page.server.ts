import { formDataToJson } from '$lib/forms';
import { getPrismaClient } from '$lib/prisma';
import { error, type RequestEvent } from '@sveltejs/kit';
import * as Yup from 'yup';

export async function POST(event: RequestEvent) {
	const documentId = parseInt(event.params.id ?? '');
	const { data, errors } = await formDataToJson(
		await event.request.formData(),
		Yup.object().shape({
			email: Yup.string().required().email('O email deve ser válido')
		})
	);

	if (isNaN(documentId)) {
		throw error(400);
	}

	if (errors) {
		return { errors };
	}

	const prisma = await getPrismaClient(event.locals.user.id);
	await prisma.documentPermissions.create({
		data: {
			type: 0,
			document: { connect: { id: documentId } },
			user: { connect: { email: data.email } }
		}
	});

	return new Response();
}
