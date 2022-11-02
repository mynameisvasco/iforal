import { getPrismaClient } from '$lib/prisma';
import type { RequestEvent } from '@sveltejs/kit';

export async function load(event: RequestEvent) {
	const prisma = await getPrismaClient();
	const tags = await prisma.tag.findMany();
	return { tags };
}
