import * as Jwt from 'jsonwebtoken';
import * as Cookie from 'cookie';
import * as Bcrypt from 'bcrypt';
import { redirect, type RequestEvent } from '@sveltejs/kit';
import { getPrismaClient } from '$lib/prisma';
import { formDataToJson } from '$lib/forms';
import * as Yup from 'yup';
import { UserStatus } from '@prisma/client';
import { JWT_SECRET } from '$env/static/private';

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
	const user = await prisma.user.findUnique({ where: { email } });

	if (user?.status === UserStatus.Active) {
		return { errors: { email: 'O email fornecido já se encontra em uso' } };
	}

	if (!user) {
		return { errors: { email: 'O email fornecido não está convidado' } };
	}

	const { password: _, ...payload } = user;
	event.setHeaders({
		'Set-Cookie': Cookie.serialize('accessToken', Jwt.sign({ ...payload }, JWT_SECRET), {
			httpOnly: true,
			sameSite: 'lax',
			maxAge: 60 * 60 * 24 * 7,
			path: '/'
		})
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
