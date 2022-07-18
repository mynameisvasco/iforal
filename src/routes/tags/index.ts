import { success } from '$lib/api';
import { getPrismaClient } from '$lib/prisma';
import type { RequestEvent } from '@sveltejs/kit';

export async function get(event: RequestEvent) {
	const prisma = await getPrismaClient();
	const tags = await prisma.tag.findMany();
	return success(tags);
}
