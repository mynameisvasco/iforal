import { getPrismaClient } from '$lib/prisma';
import { json, type RequestEvent } from '@sveltejs/kit';

export async function GET(event: RequestEvent) {
	const title = event.url.searchParams.get('title')?.toLowerCase();
	const id = parseInt(event.url.searchParams.get('id')?.toLowerCase() ?? '0');

	const prisma = await getPrismaClient();
	const documentHeaders = await prisma.documentHeader.findMany({
		select: { documentId: true },
		where: { OR: [{ title: { contains: title, mode: 'insensitive' } }, { id }] }
	});

	const documentIds = documentHeaders.map((d) => d.documentId);
	const document = await prisma.document.findMany({
		where: { id: { in: documentIds } },
		include: { images: true }
	});

	return json(document);
}
