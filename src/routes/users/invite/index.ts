import { error, success } from '$lib/client/api';
import { formDataToJson } from '$lib/client/forms';
import { getPrismaClient } from '$lib/server/prisma';
import type { RequestEvent } from '@sveltejs/kit';
import * as Yup from 'yup';

export async function post(event: RequestEvent) {
	const { data, errors } = await formDataToJson(
		await event.request.formData(),
		Yup.object({
			name: Yup.string().min(1, 'O nome deve conter pelo menos 1 caracter'),
			email: Yup.string().required('O email é obrigatório').email('O email deve ser válido'),
			role: Yup.string().required()
		})
	);

	if (errors) {
		return error(400, errors);
	}

	const prisma = await getPrismaClient(event.locals.user.id);
	const { name, email, role } = data;
	await prisma.userInvite.create({
		data: {
			name,
			email,
			role,
			user: {
				connect: { id: event.locals.user.id }
			}
		}
	});

	return success();
}
