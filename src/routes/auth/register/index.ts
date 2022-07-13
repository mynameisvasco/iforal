import { error, redirect, success } from '$lib/util/api';
import * as Bcrypt from 'bcrypt';
import * as Jwt from 'jsonwebtoken';
import * as Cookie from 'cookie';
import type { RequestEvent } from '@sveltejs/kit';
import { getPrismaClient } from '$lib/util/prisma';
import { formDataToJson } from '$lib/forms';
import * as Yup from 'yup';

export async function post(event: RequestEvent) {
	const { data, errors } = await formDataToJson(
		await event.request.formData(),
		Yup.object({
			name: Yup.string().required('O nome é obrigatório'),
			email: Yup.string().required('O email é obrigatório').email('Email deve ser válido'),
			password: Yup.string().min(5, 'A palavra passe deve conter pelo menos 5 caracteres')
		})
	);

	if (errors) {
		return error(400, errors);
	}

	const { name, email, password } = data;
	const prisma = await getPrismaClient();
	const isEmailInUse = await prisma.user.findUnique({ where: { email } });

	if (isEmailInUse) {
		return error(400, 'Email is already in use');
	}

	const user = await prisma.user.create({
		data: { name, email, password: await Bcrypt.hash(password, 10) }
	});

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
