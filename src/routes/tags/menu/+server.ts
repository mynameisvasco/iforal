import { getPrismaClient } from '$lib/server/prisma';
import type { RequestEvent } from '@sveltejs/kit';

export async function GET(event: RequestEvent) {
	const prisma = await getPrismaClient();
	const tags = await prisma.tag.findMany({ orderBy: { id: 'asc' } });
	return new Response(JSON.stringify(tags));
}
