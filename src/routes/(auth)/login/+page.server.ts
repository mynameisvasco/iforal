import * as Bcrypt from 'bcrypt';
import Jwt from 'jsonwebtoken';
import { fail, type RequestEvent, type Actions, redirect } from '@sveltejs/kit';
import { getPrismaClient } from '$lib/prisma';
import { formDataToJson } from '$lib/forms';
import * as Yup from 'yup';
import { UserStatus } from '@prisma/client';
import { JWT_SECRET } from '$env/static/private';

async function login(event: RequestEvent) {
	const { data, errors } = await formDataToJson(
		await event.request.formData(),
		Yup.object().shape({
			email: Yup.string().required('O email é obrigatório').email('Email deve ser válido'),
			password: Yup.string().min(5, 'A palavra passe deve conter pelo menos 5 caracteres')
		})
	);

	if (errors) {
		return fail(400, { errors });
	}

	const { email, password } = data;
	const prisma = await getPrismaClient();
	const user = await prisma.user.findUnique({ where: { email } });

	if (
		!user ||
		!(await Bcrypt.compare(password, user.password)) ||
		user.status === UserStatus.Invited
	) {
		return fail(403, { errors: { password: 'A password fornecida não está correta' } });
	}

	const { password: _, ...payload } = user;
	event.cookies.set('accessToken', Jwt.sign({ ...payload }, JWT_SECRET, {}), {
		sameSite: 'lax',
		maxAge: 60 * 60 * 24 * 7,
		secure: false,
		path: '/'
	});

	throw redirect(303, '/documents');
}

export const actions = { default: login };
