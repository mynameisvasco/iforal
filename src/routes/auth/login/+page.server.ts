import * as Bcrypt from 'bcrypt';
import * as Jwt from 'jsonwebtoken';
import * as Cookie from 'cookie';
import { redirect, type RequestEvent } from '@sveltejs/kit';
import { getPrismaClient } from '$lib/server/prisma';
import { formDataToJson } from '$lib/client/forms';
import * as Yup from 'yup';

export async function POST(event: RequestEvent) {
	const { data, errors } = await formDataToJson(
		await event.request.formData(),
		Yup.object().shape({
			email: Yup.string().required('O email é obrigatório').email('Email deve ser válido'),
			password: Yup.string().min(5, 'A palavra passe deve conter pelo menos 5 caracteres')
		})
	);

	if (errors) {
		return { errors };
	}

	const { email, password } = data;
	const prisma = await getPrismaClient();
	const user = await prisma.user.findUnique({ where: { email } });

	if (!user || !(await Bcrypt.compare(password, user.password))) {
		return { errors: { email: '', password: 'As credenciais fornecidas estão erradas' } };
	}

	const { password: _, ...payload } = user;
	event.setHeaders({
		'Set-Cookie': Cookie.serialize(
			'accessToken',
			Jwt.sign({ ...payload }, '1h29r781gf987ubg198723ghd182'),
			{ httpOnly: true, sameSite: 'lax', maxAge: 60 * 60 * 24 * 7, path: '/' }
		)
	});

	throw redirect(303, '/documents');
}
