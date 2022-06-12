import { PrismaClient } from '@prisma/client';

let clients: { [userId: number]: PrismaClient } = {};
setInterval(() => (clients = {}), 1000 * 60 * 5);

export async function getPrismaClient(userId: number = -1) {
	if (Object.keys(clients).length > 10) {
		clients = {};
	}

	if (!clients[userId]) {
		clients[userId] = new PrismaClient();

		if (userId !== -1) {
			await clients[userId].$executeRawUnsafe(`SET iforal.current_user_id = '${userId}'`);
		}
	}

	return clients[userId];
}
