import { formDataToJson } from '$lib/forms';
import { getPrismaClient } from '$lib/prisma';
import { error, fail, type RequestEvent } from '@sveltejs/kit';
import * as Yup from 'yup';

async function update(event: RequestEvent) {
	const tagId = parseInt(event.params.id ?? '');
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
		return fail(400, { errors });
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

	return {};
}

async function destroy(event: RequestEvent) {
	const tagId = parseInt(event.params.id ?? '');
	if (isNaN(tagId)) {
		return error(404, 'Tag not found');
	}

	const prisma = await getPrismaClient();
	await prisma.tag.delete({ where: { id: tagId } });
	return {};
}

export async function load(event: RequestEvent) {
	const tagId = parseInt(event.params.id ?? '');
	if (isNaN(tagId)) {
		throw error(404, 'Tag not found');
	}

	const prisma = await getPrismaClient();
	const tag = await prisma.tag.findUnique({ where: { id: tagId } });
	if (!tag) {
		throw error(404, 'Tag not found');
	}

	return { tag };
}

export const actions = { destroy, update };
