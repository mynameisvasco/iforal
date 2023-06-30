import { formDataToJson } from '$lib/forms.js';
import { getPrismaClient } from '$lib/prisma.js';
import { fail, type RequestEvent } from '@sveltejs/kit';
import * as Yup from 'yup';

async function create(event: RequestEvent) {
	const { data, errors } = await formDataToJson(
		await event.request.formData(),
		Yup.object().shape({
			lemma: Yup.string().min(1, 'O lema da palavra é obrigatório'),
			actual: Yup.string().min(1, 'A versão atual da palavra é obrigatório'),
			actualLemma: Yup.string().min(1, 'A versão atualizada do lema da palavra é obrigatório'),
			category: Yup.string().min(1, 'A categoria da palavra é obrigatório'),
			definição: Yup.string()
				.min(1, 'A definição da palavra é obrigatória')
				.max(255, 'A definição da palavra deve ter no máximo 255 caracteres'),
			context: Yup.string().required('O contexto da palavra é obrigatório')
		})
	);

	if (errors) {
		return fail(400, { errors });
	}

	const prisma = await getPrismaClient(event.locals.user.id);
	await prisma.glossaryEntry.create({ data });
	return {};
}

export const actions = { default: create };
