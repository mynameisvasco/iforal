import { getPrismaClient } from '$lib/prisma';
import type { RequestEvent } from '@sveltejs/kit';

export async function load(event: RequestEvent) {
	const letter = event.url.searchParams.get('letter') ?? 'a';
	const search = event.url.searchParams.get('search');

	const prisma = await getPrismaClient(event.locals.user.id);
	const glossaryEntries = await prisma.glossaryEntry.findMany({
		where: { lemma: { startsWith: search ?? letter, mode: 'insensitive' } },
		include: {
			document: {
				select: { header: true }
			}
		},
		orderBy: { lemma: 'asc' }
	});

	return {
		glossaryEntries: glossaryEntries.map((e) => ({
			...e,
			translations: JSON.parse(e.translations?.toString() ?? '[]')
		}))
	};
}
