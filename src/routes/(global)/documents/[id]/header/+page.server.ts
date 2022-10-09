import { formDataToJson } from '$lib/forms';
import { getPrismaClient } from '$lib/prisma';
import { error, type RequestEvent } from '@sveltejs/kit';
import { parse } from 'date-fns';
import * as Yup from 'yup';

async function update(event: RequestEvent) {
	const id = parseInt(event.params.id ?? '');
	if (isNaN(id)) {
		throw error(404);
	}

	const { data, errors } = await formDataToJson(
		await event.request.formData(),
		Yup.object().shape({
			title: Yup.string().min(3, 'O título da obra deve ter pelo menos 3 caracteres'),
			editors: Yup.array().min(1, 'Os editores são obrigatórios'),
			funders: Yup.array().min(1, 'Os financiadores são obrigatórios'),
			country: Yup.string().required('O país é obrigatórios'),
			institution: Yup.string().required('A instituição é obrigatória'),
			repository: Yup.string().required('O repositório é obrigatórios'),
			authors: Yup.array().min(1, 'Os autores são obrigatórios'),
			originDate: Yup.string().required('A data de origem é obrigatória'),
			originPlace: Yup.string().required('O local de origem é obrigatório'),
			settlement: Yup.string().required('O local é obrigatório'),
			lang: Yup.string().required('A linguagem é obrigatória'),
			summary: Yup.string().required('O sumário é obrigatório'),
			encoding: Yup.string().required('A codificação é obrigatória'),
			publisher: Yup.string().required('A editora é obrigatória'),
			publisherPlace: Yup.string().required('O local de publicação é obrigatório'),
			publisherDate: Yup.string().required('A data de publicação é obrigatória'),
			license: Yup.string().required('A licença é obrigatória'),
			altIdentifier: Yup.array()
		})
	);

	if (errors) {
		return { errors };
	}

	const prisma = await getPrismaClient(event.locals.user.id);
	await prisma.documentHeader.update({
		where: { documentId: id },
		data: {
			...data,
			originDate: parse(data.originDate, 'yyyy-MM-dd', new Date()),
			publisherDate: parse(data.originDate, 'yyyy-MM-dd', new Date()),
			editors: JSON.parse(data.editors),
			funders: JSON.parse(data.funders),
			authors: JSON.parse(data.authors),
			altIdentifier: JSON.parse(data.altIdentifier)
		}
	});
	return {};
}

export async function load(event: RequestEvent) {
	const id = parseInt(event.params.id ?? '');
	if (isNaN(id)) {
		throw error(404);
	}

	const prisma = await getPrismaClient(event.locals.user.id);
	const documentHeader = await prisma.documentHeader.findFirst({ where: { documentId: id } });
	if (!documentHeader) {
		throw error(404);
	}

	return { documentHeader, document: { id } };
}

export const actions = { update };
