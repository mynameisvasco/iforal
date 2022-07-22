import { error, redirect, success } from '$lib/client/api';
import * as Bcrypt from 'bcrypt';
import * as Jwt from 'jsonwebtoken';
import * as Cookie from 'cookie';
import type { RequestEvent } from '@sveltejs/kit';
import { getPrismaClient } from '$lib/server/prisma';
import { formDataToJson } from '$lib/client/forms';
import * as Yup from 'yup';

export async function post(event: RequestEvent) {
	const { data, errors } = await formDataToJson(
		await event.request.formData(),
		Yup.object().shape({
			email: Yup.string().required('O email é obrigatório').email('Email deve ser válido'),
			password: Yup.string().min(5, 'A palavra passe deve conter pelo menos 5 caracteres')
		})
	);

	if (errors) {
		return error(400, errors);
	}

	const { email, password } = data;
	const prisma = await getPrismaClient();
	const user = await prisma.user.findUnique({ where: { email } });

	if (!user || !(await Bcrypt.compare(password, user.password))) {
		return error(401, { email: '', password: 'As credenciais fornecidas estão erradas' });
	}

	const { password: _, ...payload } = user;
	const headers = {
		'Set-Cookie': Cookie.serialize(
			'accessToken',
			Jwt.sign({ ...payload }, '1h29r781gf987ubg198723ghd182'),
			{ httpOnly: true, sameSite: 'lax', maxAge: 60 * 60 * 24 * 7, path: '/' }
		)
	};

	return redirect('/documents', 303, headers);
}
