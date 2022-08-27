import { transformAllDatesToString } from '$lib/common/string';
import { PrismaClient } from '@prisma/client';
import type { Prisma } from '@prisma/client/';

const clients = new Map<number, PrismaClient>();

export async function getPrismaClient(userId: number = -1) {
	if (Object.keys(clients).length > 10) {
		clients.clear();
	}

	if (clients.has(userId)) {
		return clients.get(userId)!;
	}

	const client = new PrismaClient();
	client.$use(dateToStringMiddleware);
	clients.set(userId, client);

	if (userId !== -1) {
		await clients.get(userId)!.$executeRawUnsafe(`SET iforalapp.current_user_id = '${userId}'`);
	}

	return clients.get(userId)!;
}

async function dateToStringMiddleware(params: Prisma.MiddlewareParams, next: any) {
	if (params.action.includes('find')) {
		const data = await next(params);
		transformAllDatesToString(data);
		return data;
	}

	return next();
}
