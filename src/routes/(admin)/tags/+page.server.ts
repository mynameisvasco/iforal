import { formDataToJson } from '$lib/forms';
import { getPrismaClient } from '$lib/prisma';
import * as Yup from 'yup';
import type { RequestEvent } from '@sveltejs/kit';

export async function load(event: RequestEvent) {
	const prisma = await getPrismaClient();
	const tags = await prisma.tag.findMany();
	return { tags };
}

export async function POST(event: RequestEvent) {
	const { data, errors } = await formDataToJson(
		await event.request.formData(),
		Yup.object({
			name: Yup.string().min(1, 'O nome deve conter pelo menos 1 caracter'),
			friendlyName: Yup.string().required('O nome amigável é obrigatório'),
			category: Yup.string().required('A categoria é obrigatória'),
			isChildAllowed: Yup.string().oneOf(['on', 'off']).optional(),
			attributes: Yup.array().optional()
		})
	);

	if (errors) {
		return { errors };
	}

	const prisma = await getPrismaClient();
	await prisma.tag.create({
		data: {
			...data,
			attributes: JSON.parse(data.attributes),
			isChildAllowed: data.isChildAllowed === 'on'
		}
	});

	return new Response();
}
