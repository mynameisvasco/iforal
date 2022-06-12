import { error, success } from '$lib/util/api';
import * as Bcrypt from 'bcrypt';
import * as Jwt from 'jsonwebtoken';
import * as Cookie from 'cookie';
import type { RequestEvent } from '@sveltejs/kit';
import { getPrismaClient } from '$lib/util/prisma';

export async function post(event: RequestEvent) {
	const { name, email, password } = await event.request.json();
	const prisma = await getPrismaClient();

	const isEmailInUse = await prisma.user.findUnique({ where: { email } });

	if (isEmailInUse) {
		return error(400, 'Email is already in use');
	}

	const hashedPassowrd = await Bcrypt.hash(password, 10);
	const user = await prisma.user.create({ data: { name, email, password: hashedPassowrd } });
	const { password: _, ...payload } = user;
	const accessToken = Jwt.sign({ ...payload }, '1h29r781gf987ubg198723ghd182');

	const headers = {
		'Set-Cookie': Cookie.serialize('accessToken', accessToken, {
			httpOnly: true,
			sameSite: 'lax',
			maxAge: 60 * 60 * 24 * 7,
			path: '/'
		})
	};

	return success('Registered with success', undefined, headers);
}
