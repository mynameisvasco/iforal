import { getPrismaClient } from '$lib/server/prisma';
import { json, type RequestEvent } from '@sveltejs/kit';

export async function GET(event: RequestEvent) {
	const prisma = await getPrismaClient();
	const tags = await prisma.tag.findMany({ orderBy: { id: 'asc' } });
	return json(tags);
}
