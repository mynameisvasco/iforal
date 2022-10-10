import * as Jwt from 'jsonwebtoken';
import * as Bcrypt from 'bcrypt';
import { invalid, redirect, type RequestEvent } from '@sveltejs/kit';
import { getPrismaClient } from '$lib/prisma';
import { formDataToJson } from '$lib/forms';
import * as Yup from 'yup';
import { UserStatus } from '@prisma/client';
import { JWT_SECRET } from '$env/static/private';

async function register(event: RequestEvent) {
	const { data, errors } = await formDataToJson(
		await event.request.formData(),
		Yup.object({
			name: Yup.string().required('O nome é obrigatório'),
			email: Yup.string().required('O email é obrigatório').email('O email deve ser válido'),
			password: Yup.string().min(5, 'A palavra passe deve conter pelo menos 5 caracteres')
		})
	);

	if (errors) {
		return { errors };
	}

	const { name, email, password } = data;
	const prisma = await getPrismaClient();
	const user = await prisma.user.findUnique({ where: { email } });

	if (user?.status === UserStatus.Active) {
		return invalid(400, { errors: { email: 'O email fornecido já se encontra em uso' } });
	}

	if (!user) {
		return invalid(400, { errors: { email: 'O email fornecido não está convidado' } });
	}

	const { password: _, ...payload } = user;
	event.cookies.set('accessToken', Jwt.sign({ ...payload }, JWT_SECRET), {
		httpOnly: true,
		sameSite: 'lax',
		maxAge: 60 * 60 * 24 * 7,
		path: '/'
	});

	await prisma.user.update({
		where: { id: user.id },
		data: {
			status: UserStatus.Active,
			password: await Bcrypt.hash(password, 10),
			name
		}
	});

	throw redirect(303, '/documents');
}

export const actions = { default: register };
