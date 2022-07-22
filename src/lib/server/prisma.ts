import { PrismaClient } from '@prisma/client';

const clients = new Map<number, PrismaClient>();

export async function getPrismaClient(userId: number = -1) {
	if (Object.keys(clients).length > 10) {
		clients.clear();
	}

	if (clients.has(userId)) {
		return clients.get(userId)!;
	}

	clients.set(userId, new PrismaClient());

	if (userId !== -1) {
		await clients.get(userId)!.$executeRawUnsafe(`SET iforalapp.current_user_id = '${userId}'`);
	}

	return clients.get(userId)!;
}
