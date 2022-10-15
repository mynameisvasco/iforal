import { PrismaClient } from '@prisma/client';

export async function getPrismaClient(userId: number = -1) {
	return new PrismaClient();
}
