import { error, success } from '$lib/client/api';
import { formDataToJson } from '$lib/client/forms';
import { getPrismaClient } from '$lib/server/prisma';
import type { RequestEvent } from '@sveltejs/kit';
import * as Yup from 'yup';

export async function get(event: RequestEvent) {
	const tagId = parseInt(event.params.id);

	if (isNaN(tagId)) {
		return error(404, 'Tag not found');
	}

	const prisma = await getPrismaClient();
	const tag = await prisma.tag.findUnique({ where: { id: tagId } });
	return success(tag);
}

export async function put(event: RequestEvent) {
	const tagId = parseInt(event.params.id);

	if (isNaN(tagId)) {
		return error(404, 'Tag not found');
	}

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
		return error(400, errors);
	}

	const prisma = await getPrismaClient();
	await prisma.tag.update({
		where: { id: tagId },
		data: {
			...data,
			attributes: JSON.parse(data.attributes),
			isChildAllowed: data.isChildAllowed === 'on'
		}
	});

	return success();
}

export async function del(event: RequestEvent) {
	const tagId = parseInt(event.params.id);

	if (isNaN(tagId)) {
		return error(404, 'Tag not found');
	}

	const prisma = await getPrismaClient();
	await prisma.tag.delete({ where: { id: tagId } });
	return success();
}
