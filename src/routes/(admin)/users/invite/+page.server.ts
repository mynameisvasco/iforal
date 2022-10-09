import { formDataToJson } from '$lib/forms';
import { getPrismaClient } from '$lib/prisma';
import type { RequestEvent } from '@sveltejs/kit';
import * as Yup from 'yup';
import { randomBytes } from 'crypto';
import { UserStatus } from '@prisma/client';

async function create(event: RequestEvent) {
	const { data, errors } = await formDataToJson(
		await event.request.formData(),
		Yup.object({
			name: Yup.string().min(1, 'O nome deve conter pelo menos 1 caracter'),
			email: Yup.string().required('O email é obrigatório').email('O email deve ser válido'),
			role: Yup.string().required()
		})
	);

	if (errors) {
		return { errors };
	}

	const prisma = await getPrismaClient(event.locals.user.id);
	const { name, email, role } = data;
	await prisma.user.create({
		data: {
			name,
			email,
			role,
			password: randomBytes(12).toString('hex'),
			status: UserStatus.Invited
		}
	});

	return {};
}

export const actions = { create };
