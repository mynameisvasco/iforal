import { formDataToJson } from '$lib/forms';
import { getPrismaClient } from '$lib/prisma';
import { Role } from '@prisma/client';
import { error, fail, type RequestEvent } from '@sveltejs/kit';
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
			originDateEnd: Yup.string().optional().nullable(),
			originPlace: Yup.string().required('O local de origem é obrigatório'),
			settlement: Yup.string().required('O local é obrigatório'),
			lang: Yup.string().required('A linguagem é obrigatória'),
			summary: Yup.string().required('O sumário é obrigatório'),
			encoding: Yup.string().required('A codificação é obrigatória'),
			publisher: Yup.string().required('A editora é obrigatória'),
			publisherPlace: Yup.string().required('O local de publicação é obrigatório'),
			publisherDate: Yup.string().required('A data de publicação é obrigatória'),
			license: Yup.string().required('A licença é obrigatória'),
			altIdentifier: Yup.array(),
			objectDesc: Yup.string().optional(),
			supportDesc: Yup.string().optional(),
			support: Yup.string().optional(),
			extent: Yup.string().optional(),
			height: Yup.number().optional().max(10000),
			width: Yup.number().optional().max(10000),
			layout: Yup.string().optional(),
			handDesc: Yup.string().optional(),
			decoDesc: Yup.string().optional()
		})
	);

	if (errors) {
		return fail(400, { errors });
	}

	const prisma = await getPrismaClient(event.locals.user.id);

	const document = await prisma.document.findFirst({
		select: { body: true },
		where: {
			id,
			OR: [
				event.locals.user.role !== Role.Admin
					? { userId: event.locals.user.id }
					: { userId: { gt: 0 } },
				{ permissions: { some: { userId: event.locals.user.id } } }
			]
		}
	});

	if (!document) {
		throw error(404);
	}

	if (data.title) {
		await prisma.document.update({ where: { id }, data: { title: data.title } });
	}

	await prisma.documentHeader.update({
		where: { documentId: id },
		data: {
			...data,
			originDate: parse(data.originDate, 'yyyy-MM-dd', new Date()),
			originDateEnd: data.originDateEnd
				? parse(data.originDateEnd, 'yyyy-MM-dd', new Date())
				: null,
			publisherDate: parse(data.publisherDate, 'yyyy-MM-dd', new Date()),
			editors: JSON.parse(data.editors),
			funders: JSON.parse(data.funders),
			authors: JSON.parse(data.authors),
			altIdentifier: JSON.parse(data.altIdentifier),
			extent: data.extent.toString()
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
	const documentHeader = await prisma.documentHeader.findFirst({
		where: {
			documentId: id,
			document: {
				OR: [
					{ isPublic: true },
					event.locals.user.role !== Role.Admin
						? { userId: event.locals.user.id }
						: { userId: { gt: 0 } },
					{ permissions: { some: { userId: event.locals.user.id } } }
				]
			}
		}
	});

	if (!documentHeader) {
		throw error(404);
	}

	return { documentHeader, document: { id } };
}

export const actions = { update };
