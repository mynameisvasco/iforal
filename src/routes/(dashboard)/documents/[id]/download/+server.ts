import { getPrismaClient } from '$lib/prisma';
import { exportTei } from '$lib/tei';
import { Role } from '@prisma/client';
import { error, type RequestEvent } from '@sveltejs/kit';

export async function GET(event: RequestEvent) {
	const id = parseInt(event.params.id ?? '');
	if (isNaN(id)) {
		throw error(404);
	}

	const prisma = await getPrismaClient(event.locals.user.id);
	const document = await prisma.document.findFirst({
		where: {
			id,
			OR: [
				{ isPublic: true },
				event.locals.user.role !== Role.Admin
					? { userId: event.locals.user.id }
					: { userId: { gt: 0 } },
				{ permissions: { some: { userId: event.locals.user.id } } }
			]
		},
		include: { header: true }
	});

	if (!document) {
		throw error(404);
	}

	return new Response(await exportTei(document), {
		headers: {
			'Content-Type': 'file/xml',
			'Content-Disposition': `attachment; filename="${document.title}.xml"`
		}
	});
}
