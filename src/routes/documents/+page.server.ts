import { getPrismaClient } from '$lib/server/prisma';
import type { RequestEvent } from '@sveltejs/kit';
import { parse as parseDate } from 'date-fns';
import { formDataToJson } from '$lib/client/forms';
import * as Yup from 'yup';

export async function load(event: RequestEvent) {
	const prisma = await getPrismaClient(event.locals.user.id);
	const documents = await prisma.document.findMany({
		include: {
			images: {
				orderBy: { position: 'asc' }
			}
		}
	});

	return { documents };
}

export async function POST(event: RequestEvent) {
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
	await prisma.document.create({
		data: {
			title: data.title,
			header: {
				create: {
					...data,
					originDate: parseDate(data.originDate, 'yyyy-MM-dd', new Date()),
					publisherDate: parseDate(data.originDate, 'yyyy-MM-dd', new Date())
				}
			},
			body: '',
			user: { connect: { id: event.locals.user.id } }
		}
	});

	return new Response();
}
