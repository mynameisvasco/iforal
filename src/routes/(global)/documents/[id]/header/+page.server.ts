import { formDataToJson } from '$lib/forms';
import { getPrismaClient } from '$lib/prisma';
import { error, type RequestEvent } from '@sveltejs/kit';
import * as Yup from 'yup';

export async function load(event: RequestEvent) {
	const id = parseInt(event.params.id ?? '');
	if (isNaN(id)) {
		throw error(404);
	}

	const prisma = await getPrismaClient(event.locals.user.id);
	const documentHeader = await prisma.documentHeader.findFirst({
		where: { documentId: id }
	});

	if (!documentHeader) {
		throw error(404);
	}

	return { documentHeader: JSON.parse(JSON.stringify(documentHeader)) };
}

export async function PUT(event: RequestEvent) {
	const id = parseInt(event.params.id ?? '');
	if (isNaN(id)) {
		throw error(404);
	}

	const { data, errors } = await formDataToJson(
		await event.request.formData(),
		Yup.object().shape({
			title: Yup.string().min(3, 'O título da obra deve ter pelo menos 3 caracteres'),
			editors: Yup.string().required('Os editores são obrigatórios'),
			funders: Yup.string().required('Os financiadores são obrigatórios'),
			country: Yup.string().required('O país são obrigatórios'),
			institution: Yup.string().required('A instituição é obrigatória'),
			repository: Yup.string().required('O repositório é obrigatórios'),
			authors: Yup.string().required('Os autores são obrigatórios'),
			originDate: Yup.string().required('A data de origem é obrigatória'),
			lang: Yup.string().required('A linguagem é obrigatória'),
			summary: Yup.string().required('O sumário é obrigatório'),
			encoding: Yup.string().required('A codificação é obrigatória'),
			publisher: Yup.string().required('A editora é obrigatória'),
			publisherPlace: Yup.string().required('O local de publicação é obrigatório'),
			publisherDate: Yup.string().required('A data de publicação é obrigatória'),
			license: Yup.string().required('A licença é obrigatória')
		})
	);

	if (errors) {
		return { errors };
	}

	const prisma = await getPrismaClient(event.locals.user.id);
	await prisma.documentHeader.update({ where: { documentId: id }, data });
	return new Response();
}
