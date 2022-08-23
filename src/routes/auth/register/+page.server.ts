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
	const invite = await prisma.userInvite.findUnique({ where: { email } });
	const isEmailInUse = await prisma.user.findUnique({ where: { email } });

	if (isEmailInUse || !invite) {
		return { errors: { email: 'O email fornecido já se encontra em uso' } };
	}

	const user = await prisma.user.create({
		data: {
			name,
			email,
			password: await Bcrypt.hash(password, 10),
			role: invite.role
		}
	});

	const { password: _, ...payload } = user;
	event.setHeaders({
		'Set-Cookie': Cookie.serialize(
			'accessToken',
			Jwt.sign({ ...payload }, '1h29r781gf987ubg198723ghd182'),
			{ httpOnly: true, sameSite: 'lax', maxAge: 60 * 60 * 24 * 7, path: '/' }
		)
	});

	await prisma.userInvite.update({ where: { id: invite.id }, data: { acceptedAt: new Date() } });
	throw redirect(303, '/documents');
}
