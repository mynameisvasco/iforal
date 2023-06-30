import { getPrismaClient } from '$lib/prisma';
import { stripTeiTags } from '$lib/tei';
import type { RequestEvent } from '@sveltejs/kit';

function convertQuerySyntax(query: string) {
	return query
		.replaceAll('/AND', '&')
		.replaceAll('/OR', '|')
		.replace(new RegExp(/\/\*([0-9]*)/g), '&');
}

function removeQuerySyntax(query: string) {
	return query
		.replaceAll('/AND', '')
		.replaceAll('/OR', '')
		.replace(new RegExp(/\/\*([0-9]*)/g), '');
}

export async function load(event: RequestEvent) {
	const searchTitle = event.url.searchParams.get('title');
	const searchFrom = event.url.searchParams.get('from');
	const searchTo = event.url.searchParams.get('to');
	const query = event.url.searchParams.get('query');
	const isContextSearch = query?.includes('/*');
	const contextSize = event.url.searchParams.get('contextSize') ?? 10;
	const words = query
		? removeQuerySyntax(query ?? '')
				.split(' ')
				.filter((w) => w !== '')
		: [];

	const prisma = await getPrismaClient(event.locals.user.id);
	let documents = [];

	try {
		documents = await prisma.document.findMany({
			where: {
				title: {
					contains: searchTitle ?? undefined,
					mode: 'insensitive'
				},
				body: {
					search: query ? convertQuerySyntax(query) : undefined
				},
				header: {
					originDate: {
						gte: searchFrom ? new Date(searchFrom) : undefined,
						lte: searchTo ? new Date(searchTo) : undefined
					}
				},
				OR: [
					{ userId: event.locals.user.id },
					{ permissions: { some: { userId: event.locals.user.id } } }
				]
			},
			orderBy: {
				title: 'asc'
			},
			select: {
				id: true,
				title: true,
				header: true,
				images: {
					orderBy: { position: 'asc' }
				},
				body: !!query
			}
		});
	} catch {
		return { documents: [] };
	}

	const highlights: any = {};

	for (const document of documents) {
		highlights[document.id] = [];

		if (isContextSearch) {
			const maxWordDistance = Number.parseInt(query!.replace(/^\D+/g, '')?.toString() ?? '1');
			const matches = stripTeiTags(document.body).match(
				new RegExp(
					`(\\S+\\s+){0,${contextSize}}${words[0]}(\\s+\\S+){0,${maxWordDistance}} ${words[1]} (\\S+\\s+){0,${contextSize}}`,
					'gi'
				)
			);

			for (const match of matches ?? []) {
				highlights[document.id] = [
					...highlights[document.id],
					match
						.replaceAll(` ${words[0]} `, ` <span class='text-orange-300'>${words[0]}</span> `)
						.replaceAll(` ${words[1]} `, ` <span class='text-orange-300'>${words[1]}</span> `)
				];
			}

			continue;
		}

		for (const word of words) {
			const capitalizedWord = word.charAt(0).toUpperCase() + word.slice(1);
			const matches =
				stripTeiTags(document.body).match(
					new RegExp(`(\\S+\\s+){0,${contextSize}}${word}(\\s+\\S+){0,${contextSize}}`, 'gi')
				) ?? [];

			for (const match of matches!) {
				if (match === word) continue;

				highlights[document.id] = [
					...highlights[document.id],
					match
						.replaceAll(
							`${word} `,
							` <span class='font-bold text-stone-900 dark:text-orange-300'>${word}</span> `
						)
						.replaceAll(
							`${word}`,
							` <span class='font-bold text-stone-900 dark:text-orange-300'>${word}</span> `
						)
						.replaceAll(
							`${capitalizedWord} `,
							`<span class='font-bold text-stone-900 dark:text-orange-300'>${capitalizedWord}</span> `
						)
						.replaceAll(
							`${capitalizedWord}`,
							`<span class='font-bold text-stone-900 dark:text-orange-300'>${capitalizedWord}</span> `
						)
				];
			}
		}
	}

	return { documents, highlights };
}
