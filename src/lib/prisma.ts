import { transformAllDatesToString } from '$lib/util';
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
	clients.set(userId, client);

	if (userId !== -1) {
		await clients.get(userId)!.$executeRawUnsafe(`SET iforalapp.current_user_id = '${userId}'`);
	}

	return clients.get(userId)!;
}
