import { success } from '$lib/client/api';
import { getPrismaClient } from '$lib/server/prisma';
import type { RequestEvent } from '@sveltejs/kit';

export async function get(event: RequestEvent) {
	const prisma = await getPrismaClient();
	const tags = await prisma.tag.findMany();
	return success(tags);
}
