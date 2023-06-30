import { getPrismaClient } from '$lib/prisma';
import { json, type RequestEvent } from '@sveltejs/kit';

export async function GET(event: RequestEvent) {
	const lemma = event.params.lemma ?? '';
	const prisma = await getPrismaClient(event.locals.user.id);
	const entries = await prisma.glossaryEntry.findMany({ where: { lemma } });
	return json(entries.map((e) => ({ ...e, translations: JSON.parse(e.translations) })));
}
