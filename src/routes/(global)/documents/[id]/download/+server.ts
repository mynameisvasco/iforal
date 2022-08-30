import { getPrismaClient } from '$lib/prisma';
import { exportTei } from '$lib/tei';
import { error, type RequestEvent } from '@sveltejs/kit';

export async function GET(event: RequestEvent) {
	const id = parseInt(event.params.id ?? '');
	if (isNaN(id)) {
		throw error(404);
	}

	const prisma = await getPrismaClient(event.locals.user.id);
	const document = await prisma.document.findFirst({
		where: { id },
		include: { header: true }
	});

	if (!document) {
		throw error(404);
	}

	return new Response(await exportTei(document), {
		headers: { 'Content-Type': 'application/xml' }
	});
}
