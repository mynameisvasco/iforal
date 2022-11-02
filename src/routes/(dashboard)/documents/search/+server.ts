import { getPrismaClient } from '$lib/prisma';
import { json, type RequestEvent } from '@sveltejs/kit';

export async function GET(event: RequestEvent) {
	const title = event.url.searchParams.get('title')?.toLowerCase();
	const prisma = await getPrismaClient();
	const document = await prisma.document.findMany({
		where: { title: { contains: title, mode: 'insensitive' } },
		include: { images: true }
	});

	return json(document);
}
