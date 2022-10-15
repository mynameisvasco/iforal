import { getPrismaClient } from '$lib/prisma';
import { redirect, type RequestEvent } from '@sveltejs/kit';
import { parse as parseDate } from 'date-fns';
import { formDataToJson } from '$lib/forms';
import * as Yup from 'yup';

async function create(event: RequestEvent) {
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
	const document = await prisma.document.create({
		data: {
			title: data.title,
			header: {
				create: {
					...data,
					originDate: parseDate(data.originDate, 'yyyy-MM-dd', new Date()),
					publisherDate: parseDate(data.originDate, 'yyyy-MM-dd', new Date()),
					editors: JSON.parse(data.editors),
					funders: JSON.parse(data.funders),
					authors: JSON.parse(data.authors),
					altIdentifier: JSON.parse(data.altIdentifier)
				}
			},
			body: '',
			user: { connect: { id: event.locals.user.id } }
		}
	});

	throw redirect(301, `/documents/${document.id}`);
}

export async function load(event: RequestEvent) {
	const prisma = await getPrismaClient(event.locals.user.id);
	const documents = await prisma.document.findMany({
		where: {
			OR: [
				{ userId: event.locals.user.id },
				{ permissions: { some: { userId: event.locals.user.id } } }
			]
		},
		include: {
			images: {
				orderBy: { position: 'asc' }
			}
		}
	});

	return { documents };
}

export const actions = { create };
